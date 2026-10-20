import {readFileSync,readdirSync,statSync,existsSync} from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {origin,indexable,analyticsEnabled,pageRobots,redirectRobots,robotsText} from './site-config.mjs';
import {groupCurrentEssays} from './essay-groups.mjs';
const root=path.resolve('dist');
const walk=d=>readdirSync(d).flatMap(n=>{const p=path.join(d,n);return statSync(p).isDirectory()?walk(p):[p];});
const files=walk(root),html=files.filter(p=>p.endsWith('.html')),errors=[];let checked=0;
// Read JPEG marker boundaries, including progressive scans, without decoding pixels.
// APP1 is allowed only for the exact minimal TIFF containing one Orientation tag.
function jpegMetadataErrors(data){
  const issues=[];let offset=2,sawScan=false,sawEnd=false,exifCount=0;
  const reject=message=>issues.push(message);
  if(data.length<4||data.readUInt16BE(0)!==0xffd8)return ['invalid JPEG header'];
  function minimalOrientation(payload){
    if(payload.length!==32||payload.subarray(0,6).toString('binary')!=='Exif\0\0')return false;
    const tiff=payload.subarray(6),order=tiff.subarray(0,2).toString('ascii');
    if(order!=='II'&&order!=='MM')return false;
    const u16=i=>order==='II'?tiff.readUInt16LE(i):tiff.readUInt16BE(i);
    const u32=i=>order==='II'?tiff.readUInt32LE(i):tiff.readUInt32BE(i);
    return u16(2)===42&&u32(4)===8&&u16(8)===1&&u16(10)===274&&u16(12)===3&&u32(14)===1&&u16(18)>=1&&u16(18)<=8&&u16(20)===0&&u32(22)===0;
  }
  while(offset<data.length){
    if(data[offset]!==0xff){reject('invalid JPEG marker boundary');break;}
    while(offset<data.length&&data[offset]===0xff)offset++;
    if(offset>=data.length){reject('truncated JPEG marker');break;}
    const marker=data[offset++];
    if(marker===0xd9){sawEnd=true;if(offset!==data.length)reject('unexpected data after JPEG end');break;}
    if(marker===0||marker===0xd8){reject('invalid JPEG marker');break;}
    if(marker===0x01||(marker>=0xd0&&marker<=0xd7))continue;
    if(offset+2>data.length){reject('truncated JPEG segment');break;}
    const length=data.readUInt16BE(offset),end=offset+length;
    if(length<2||end>data.length){reject('invalid JPEG segment length');break;}
    const payload=data.subarray(offset+2,end);offset=end;
    if(marker===0xfe)reject('JPEG comments are not public metadata');
    if(marker>=0xe0&&marker<=0xef){
      if(marker===0xe1){
        exifCount++;
        if(exifCount>1||!minimalOrientation(payload))reject('EXIF/XMP must contain only minimal Orientation metadata');
      }else if(marker===0xe0){
        if(payload.length!==14||payload.subarray(0,5).toString('binary')!=='JFIF\0'||payload[12]!==0||payload[13]!==0)reject('unexpected APP0 metadata or thumbnail');
      }else if(marker===0xe2){
        if(payload.length<14||payload.subarray(0,12).toString('binary')!=='ICC_PROFILE\0'||payload[12]===0||payload[12]>payload[13])reject('APP2 must contain an ICC color profile');
      }else if(marker===0xee){
        if(payload.length!==12||payload.subarray(0,5).toString('ascii')!=='Adobe')reject('APP14 must contain Adobe color information');
      }else reject('unexpected APP metadata (including IPTC)');
    }
    if(marker===0xda){
      sawScan=true;
      // FF00 is an escaped image-data byte; FFD0..FFD7 are restart markers.
      // Stop only at a real following marker, so later scans/metadata are checked.
      while(offset<data.length){
        const candidate=data.indexOf(0xff,offset);
        if(candidate<0){offset=data.length;break;}
        let next=candidate+1;while(next<data.length&&data[next]===0xff)next++;
        if(next>=data.length){offset=data.length;break;}
        if(data[next]===0||(data[next]>=0xd0&&data[next]<=0xd7)){offset=next+1;continue;}
        offset=candidate;break;
      }
    }
  }
  if(!sawScan||!sawEnd)reject('incomplete JPEG image');
  return [...new Set(issues)];
}
const essayArchives=JSON.parse(readFileSync('content/essay-archives.json','utf8'));
const archiveByRoute=new Map(essayArchives.map(item=>[item.page,item]));
if(essayArchives.length!==2||['mathematical-understanding-in-the-age-of-ai','the-culture-of-mathematical-judgment'].some(slug=>essayArchives.filter(item=>item.slug===slug).length!==1))errors.push('Expected both predecessor essay archives exactly once');
if(archiveByRoute.size!==essayArchives.length)errors.push('Duplicate essay archive routes');
const canonicalPages=[];
const anchorCache=new Map();
function anchors(filename){
  if(!anchorCache.has(filename))anchorCache.set(filename,new Set([...readFileSync(filename,'utf8').matchAll(/\bid="([^"]+)"/g)].map(match=>match[1])));
  return anchorCache.get(filename);
}
for(const file of html){
  const source=readFileSync(file,'utf8');
  const relative=path.relative(root,file).split(path.sep).join('/');
  const route=relative==='index.html'?'/':'/'+relative;
  const redirect=source.match(/<meta http-equiv="refresh" content="0;url=([^"]+)"/);
  const archive=archiveByRoute.get(route);
  const archiveMarker=source.match(/<meta name="tensorgami-archive-target" content="([^"]+)"/)?.[1];
  if(archiveMarker!==(archive?.target))errors.push(`${relative}: unregistered or incorrect essay archive marker`);
  const canonical=source.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const expectedCanonical=origin+(redirect?redirect[1].split('#')[0]:(archive?.target||route));
  const robots=source.match(/<meta name="robots" content="([^"]+)"/)?.[1];
  if(!source.includes('<title>'))errors.push(`${relative}: missing title`);
  if(canonical!==expectedCanonical)errors.push(`${relative}: canonical URL does not match ${expectedCanonical}`);
  if(robots!==(redirect||archive?redirectRobots:pageRobots(route)))errors.push(`${relative}: incorrect robots directive`);
  if(!redirect){
    if(source.match(/<meta property="og:url" content="([^"]+)"/)?.[1]!==expectedCanonical)errors.push(`${relative}: Open Graph URL does not match canonical`);
    if(route!=='/404.html'&&!archive)canonicalPages.push(expectedCanonical);
  }
  const allowedScripts=[];
  if(route==='/notes/what-a-derivative-retains.html'&&!redirect)allowedScripts.push('<script defer src="/assets/derivative-exposition.js" data-tensorgami-derivative="v1"></script>');
  if(route==='/'&&!redirect)allowedScripts.push('<script defer src="/assets/reading-entry.js" data-tensorgami-reading-entry="v1"></script>');
  if(route==='/privacy.html'&&!redirect)allowedScripts.push('<script defer src="/assets/privacy-controls.js" data-tensorgami-privacy-controls="v1"></script>');
  if(analyticsEnabled&&!redirect&&!archive&&route!=='/404.html')allowedScripts.push('<script defer src="/assets/analytics.js" data-tensorgami-analytics="v1"></script>');
  const actualScripts=[...source.matchAll(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi)].map(match=>match[0]);
  if(JSON.stringify(actualScripts)!==JSON.stringify(allowedScripts)||/<script\b/i.test(source.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi,'')))errors.push(`${relative}: unexpected or missing authored script`);
  if(/dry-term-82db|deploy-state|RESEND_API_KEY/.test(source))errors.push(`${relative}: operational data in page markup`);
  for(const m of source.matchAll(/(?:href|src)="([^"]+)"/g)){
    const href=m[1];if(/^(https?:|mailto:|data:)/.test(href))continue;
    const [pathname,fragment]=href.split('#');
    let dest=pathname.startsWith('/')?path.join(root,decodeURIComponent(pathname)):path.resolve(path.dirname(file),decodeURIComponent(pathname||path.basename(file)));
    if(existsSync(dest)&&statSync(dest).isDirectory())dest=path.join(dest,'index.html');
    checked++;
    if(!existsSync(dest)){errors.push(`${relative}: missing ${href}`);continue;}
    if(fragment&&dest.endsWith('.html')&&!anchors(dest).has(fragment))errors.push(`${relative}: missing anchor ${href}`);
  }
}
if(readFileSync(path.join(root,'robots.txt'),'utf8')!==robotsText)errors.push('robots.txt does not match site indexing configuration');
for(const name of ['analytics.js','privacy-controls.js','reading-entry.js'])if(!readFileSync(path.join(root,'assets',name)).equals(readFileSync(path.join('assets',name))))errors.push(`${name}: generated script differs from source`);
if(!readFileSync(path.join(root,'assets','analytics.js'),'utf8').includes('tensorgami-analytics-v1'))errors.push('Analytics script lacks its version marker');
const sitemap=readFileSync(path.join(root,'sitemap.xml'),'utf8');
const sitemapUrls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);
if(!sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')||new Set(sitemapUrls).size!==sitemapUrls.length||JSON.stringify([...sitemapUrls].sort())!==JSON.stringify([...canonicalPages].sort()))errors.push('Sitemap must list every ordinary canonical page exactly once, excluding redirects and 404');
if(JSON.parse(readFileSync(path.join(root,'portfolio.json'),'utf8')).person.website!==origin)errors.push('Portfolio website origin does not match site configuration');
const discovery=readFileSync(path.join(root,'llms.txt'),'utf8');
if(!discovery.includes(`${origin}/papers.html`)||/https:\/\/[^\s)]+\.chatgpt\.site/.test(discovery))errors.push('llms.txt contains an incorrect site origin');
const notes=JSON.parse(readFileSync('content/notes.json','utf8'));const papers=JSON.parse(readFileSync('content/papers.json','utf8'));
const allEssays=JSON.parse(readFileSync('content/essays.json','utf8'));
const essays=allEssays.filter(essay=>essay.published!==false);
try {
  const groups=groupCurrentEssays(essays);
  const collection=readFileSync(path.join(root,'essays.html'),'utf8');
  for(const group of groups.filter(group=>group.essays.length)){
    const block=collection.match(new RegExp(`<section class="essay-group" aria-labelledby="${group.headingId}">([\\s\\S]*?)</section>`))?.[1]||'';
    const cards=[...block.matchAll(/<h3><a href="([^"]+)">/g)].map(match=>match[1]);
    const expected=group.essays.map(essay=>essay.page||`/essays/${essay.slug}.html`);
    if(JSON.stringify(cards)!==JSON.stringify(expected))errors.push(`Essay group cards or order differ: ${group.id}`);
  }
} catch(error) { errors.push(error.message); }
if(essays.some(e=>archiveByRoute.has(e.page)))errors.push('Archived essay remains in current collection');
for(const essay of allEssays.filter(essay=>essay.published===false)){
  for(const route of [essay.page||`/essays/${essay.slug}.html`,essay.pdf,essay.source].filter(Boolean)){
    if(existsSync(path.join(root,route)))errors.push(`${essay.slug}: unpublished output remains at ${route}`);
  }
  for(const file of files){
    if(path.relative(root,file).includes(essay.slug))errors.push(`${essay.slug}: unpublished filename remains in dist`);
    if(/\.(html|json|xml|txt|md|tex|js)$/i.test(file)){
      const text=readFileSync(file,'utf8');
      if(text.includes(essay.slug)||text.includes(essay.title))errors.push(`${essay.slug}: unpublished reference remains in ${path.relative(root,file)}`);
    }
  }
}

for(const archive of essayArchives){
  const file=path.join(root,archive.page),source=readFileSync(file,'utf8');
  if(archive.target!=='/essays/mathematical-life-in-the-age-of-ai.html'||!['mathematical-understanding-in-the-age-of-ai','the-culture-of-mathematical-judgment'].includes(archive.slug))errors.push('Unexpected essay archive registration');
  if(archive.page!=='/essays/'+archive.slug+'.html')errors.push('Incorrect essay archive path');
  if(!source.includes('data-essay-archive="'+archive.slug+'"')||source.includes('class="essay-body')||source.includes('class="math-display'))errors.push(archive.slug+': archive notice missing or old full essay still rendered');
  for(const id of archive.requiredAnchors)if(!anchors(file).has(id))errors.push(archive.slug+': former anchor missing '+id);
  for(const item of [...archive.sectionLinks,...archive.noteLinks,...archive.extraLinks])if(!source.includes('href="'+item.target+'"'))errors.push(archive.slug+': fragment continuation missing '+item.target);
  for(const item of archive.downloads){const asset=path.join(root,item.href);if(!existsSync(asset)||createHash('sha256').update(readFileSync(asset)).digest('hex')!==item.sha256)errors.push(archive.slug+': archived download changed '+item.href);}
}
const allGaming=JSON.parse(readFileSync('content/gaming.json','utf8'));
const gaming=allGaming.filter(game=>game.published!==false);
const puzzles=JSON.parse(readFileSync('content/puzzles.json','utf8'));
const interests=JSON.parse(readFileSync('content/interests.json','utf8'));
const compactOverwatch=interests.overwatch?.published===true?interests.overwatch:null;
const escapeInterestText=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const compactOverwatchMarkup=compactOverwatch?`<section class="interest-note" aria-labelledby="overwatch"><h2 id="overwatch">${escapeInterestText(compactOverwatch.title)}</h2>${compactOverwatch.body.split(/\n\s*\n/).map(p=>`<p>${escapeInterestText(p)}</p>`).join('')}`:'';
const compactSignposts=new Map([
  ['index.html','<p>Patterns on large twisty cubes and a few notes on playing Overwatch.</p>'],
  ['about.html','<p>I make <a href="/play/cube-patterns.html">patterns on large twisty cubes</a>, working out move sequences with commutators. My <a href="/interests.html">Interests page</a> also includes a few notes on playing Overwatch.</p>']
]);
if(compactOverwatch)for(const [file,markup] of compactSignposts)if(!readFileSync(path.join(root,file),'utf8').includes(markup))errors.push('Interest signpost missing: '+file);
if(compactOverwatch&&!readFileSync(path.join(root,'interests.html'),'utf8').includes(compactOverwatchMarkup))errors.push('Compact Overwatch entry missing from Interests');
const compactScreenshots=compactOverwatch?.images||[];
const screenshotRoutes=new Set(compactScreenshots.map(im=>im.src));
const permittedScreenshots=new Set(['/assets/gaming/overwatch-riemannroch-master-3508.jpg','/assets/gaming/overwatch-2-diamond-5-support.jpg']);
for(const im of compactScreenshots){
  const publicScreenshotMetadata=[{"src":"/assets/gaming/overwatch-riemannroch-master-3508.jpg","width":3024,"height":4032,"alt":"Overwatch profile for RIEMANNROCH showing Master at 3508 SR for both current rank and season high, with Zarya leading the hero playtime chart."},{"src":"/assets/gaming/overwatch-2-diamond-5-support.jpg","width":1024,"height":640,"alt":"Overwatch 2 rank-progression screen showing Diamond 5 in Support after a victory, with Kiriko visible on the right."}];
  const original=publicScreenshotMetadata.find(image=>image.src===im.src);
  if(!permittedScreenshots.has(im.src)||!original||['width','height','alt'].some(key=>im[key]!==original[key]))errors.push('Unapproved or altered interest screenshot: '+im.src);
  const asset=path.join(root,im.src);
  if(!existsSync(asset)||!readFileSync(asset).equals(readFileSync(im.src.slice(1))))errors.push('Interest screenshot differs from its preserved source: '+im.src);
}
if(screenshotRoutes.size!==compactScreenshots.length)errors.push('Duplicate interest screenshot');
if(compactScreenshots.length&&!readFileSync(path.join(root,'interests.html'),'utf8').includes('<details class="interest-screenshots"><summary>Screenshots</summary>'))errors.push('Screenshots must begin in a closed native disclosure');
const hiddenInterestRoutes=[],hiddenInterestReferences=[];
for(const game of allGaming.filter(game=>game.published===false)){
  hiddenInterestRoutes.push(...game.images.filter(im=>!screenshotRoutes.has(im.src)).map(im=>im.src));
  hiddenInterestReferences.push(game.game,game.slug);
  for(const im of game.images)if(!existsSync(im.src.slice(1)))errors.push(`${game.slug}: hidden source image missing`);
}
if(!gaming.length){
  hiddenInterestRoutes.push('/gaming.html');
  hiddenInterestReferences.push('Overwatch','solo queue','solo-queue');
}
if(interests.fashion?.published===false){
  hiddenInterestRoutes.push('/interests/style.html',...(interests.fashion.images||[]).map(im=>im.src));
  hiddenInterestReferences.push('wardrobe','Zegna','Il Conte','Oasi Cashmere',interests.profileUrl,...interests.fashion.notes.map(note=>note.reviewUrl));
}
if(interests.car?.published===false){
  hiddenInterestRoutes.push('/interests/bmw-x6.html',...(interests.car.images||[]).map(im=>im.src));
  hiddenInterestReferences.push('bmw-x6','BMW X6');
}
for(const route of hiddenInterestRoutes)if(existsSync(path.join(root,route)))errors.push(`Unpublished interest output remains: ${route}`);
const hiddenReferences=[...hiddenInterestRoutes,...hiddenInterestReferences].filter(Boolean).map(text=>text.toLowerCase());
const compactGameVocabulary=new Set(['overwatch','overwatch 1','overwatch 2','solo queue','solo-queue']);
for(const file of files.filter(file=>/\.(html|json|xml|txt|md|tex|js)$/i.test(file))){
  let source=readFileSync(file,'utf8');
  const originalText=source.toLowerCase();
  const relative=path.relative(root,file).replaceAll('\\','/');
  // Only approved signposts, the Interests note and its structured copy may name the
  // withdrawn game records. Only the two selected images may accompany it.
  if(compactOverwatch&&compactSignposts.has(relative))source=source.replace(compactSignposts.get(relative),'');
  if(compactOverwatch&&relative==='interests.html'){
    source=source.replace(compactOverwatchMarkup,'');
    for(const im of compactScreenshots)source=source.replaceAll(escapeInterestText(im.alt),'').replaceAll(escapeInterestText(im.caption),'').replaceAll(im.src,'');
  }
  if(compactOverwatch&&relative==='portfolio.json'){
    const portfolio=JSON.parse(source);
    if(JSON.stringify(portfolio.personalInterests?.overwatch)!==JSON.stringify(compactOverwatch))errors.push('Compact Overwatch metadata differs from its source');
    delete portfolio.personalInterests.overwatch;
    source=JSON.stringify(portfolio);
  }
  const text=source.toLowerCase();
  for(const reference of hiddenReferences)if((compactGameVocabulary.has(reference)?text:originalText).includes(reference))errors.push(`${path.relative(root,file)}: unpublished interest reference remains: ${reference}`);
}
const pdfs=files.filter(p=>p.endsWith('.pdf'));
for(const p of pdfs){if(readFileSync(p).subarray(0,5).toString()!=='%PDF-')errors.push(`${p}: invalid PDF header`);}
for(const file of html){
  const source=readFileSync(file,'utf8');
  const ids=[...source.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  if(new Set(ids).size!==ids.length)errors.push(`${file}: duplicate anchor IDs`);
  for(const m of source.matchAll(/<img\b[^>]+>/g)){
    if(!/\balt="[^"]+"/.test(m[0])||!/\bwidth="\d+"/.test(m[0])||!/\bheight="\d+"/.test(m[0]))errors.push(`${file}: image lacks description or dimensions`);
  }
}
for(const n of notes.filter(n=>n.readingBody&&n.readingSource)){
  const manuscript=readFileSync(n.readingSource,'utf8').replaceAll('\r\n','\n');
  const fragment=readFileSync(n.readingBody,'utf8');
  const hash=createHash('sha256').update(manuscript).digest('hex');
  const page=readFileSync(path.join(root,n.page),'utf8');
  if(!fragment.includes(`<!-- source-sha256:${hash} -->`))errors.push(`${n.slug}: reading edition needs typesetting after a source change`);
  if(!page.includes(fragment))errors.push(`${n.slug}: reading edition differs from its typeset source`);
  if(/data-mjx-error|data-mml-node="merror"|<merror/.test(fragment))errors.push(`${n.slug}: invalid typeset mathematics`);
}
for(const n of notes.filter(n=>n.readingExcerpt)){
  const manuscript=readFileSync(n.readingExcerpt.manuscript,'utf8').replaceAll('\r\n','\n');
  const fragment=readFileSync(n.readingExcerpt.body,'utf8');
  const hash=createHash('sha256').update(manuscript).digest('hex');
  const page=readFileSync(path.join(root,n.page),'utf8');
  if(!fragment.includes(`<!-- source-sha256:${hash} -->`))errors.push(`${n.slug}: reading excerpt needs typesetting after a manuscript change`);
  if(!page.includes(fragment))errors.push(`${n.slug}: reading excerpt differs from its typeset source`);
  const mathCount=[...manuscript.matchAll(/\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g)].length;
  if([...fragment.matchAll(/\bdata-tex="/g)].length!==mathCount||/data-mjx-error|<merror/.test(fragment))errors.push(`${n.slug}: invalid or missing typeset mathematics`);
}
for(const e of essays){
  const page=readFileSync(path.join(root,e.page),'utf8');
  if(e.source){
    const tex=readFileSync(path.join(root,e.source),'utf8');
    const keys=[...tex.matchAll(/\\bibitem(?:\[[^\]]*\])?\{([^}]+)\}/g)].map(m=>m[1]);
    for(const key of keys)if(!page.includes(`id="source-${key}"`))errors.push(`${e.slug}: missing reference ${key}`);
  }
  if(e.manuscript){
    const manuscript=readFileSync(e.manuscript,'utf8');
    for(const match of manuscript.matchAll(/\]\((https?:\/\/[^)]+)\)/g)){
      const href=match[1].replaceAll('&','&amp;').replaceAll('"','&quot;');
      if(!page.includes(`href="${href}"`))errors.push(`${e.slug}: missing manuscript citation ${match[1]}`);
    }
    const mathCount=[...manuscript.matchAll(/\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g)].length;
    if([...page.matchAll(/\bdata-tex="/g)].length!==mathCount)errors.push(`${e.slug}: mathematical expression count differs from manuscript`);
  }
  for(const section of e.sections)if(!page.includes(`id="${section.id}"`))errors.push(`${e.slug}: missing section ${section.id}`);
}
for(const g of [...gaming,...puzzles,...(interests.car?.published===true?[{slug:'bmw-x6',images:interests.car.images}]:[])])for(const im of g.images){
  const file=path.join(root,im.src);
  const sourceAsset=im.src.slice(1);
  if(!existsSync(file)||!existsSync(sourceAsset)||!readFileSync(file).equals(readFileSync(sourceAsset)))errors.push(`${g.slug}: built image differs from website source asset`);
}
const publicPhotos=['assets/gaming','assets/puzzles','assets/interests','dist/assets/gaming','dist/assets/puzzles','dist/assets/interests'].flatMap(dir=>existsSync(dir)?walk(dir).filter(file=>/\.jpe?g$/i.test(file)):[]);
for(const file of publicPhotos)for(const issue of jpegMetadataErrors(readFileSync(file)))errors.push(`${file}: ${issue}`);
const publicAssets=existsSync('public')?walk('public'):[];
if(!publicAssets.length)errors.push('Missing retained public assets');
for(const sourceAsset of publicAssets){
  const relative=path.relative('public',sourceAsset),top=relative.split(path.sep)[0];
  if(!['pdfs','tex','formalizations','LICENSE.md'].includes(top)||/\.html?$/i.test(relative))errors.push(`${sourceAsset}: generated site content does not belong in public`);
  const builtAsset=path.join(root,relative);
  if(!existsSync(builtAsset)||!readFileSync(builtAsset).equals(readFileSync(sourceAsset)))errors.push(`${sourceAsset}: retained asset missing or changed in build`);
}
for(const note of notes)for(const url of [note.pdf,note.tex,note.source].filter(Boolean)){
  if(/^\/(pdfs|tex|formalizations)\//.test(url)&&!existsSync(path.join('public',url)))errors.push(`${note.slug}: retained asset has no public source: ${url}`);
}
if(notes.length!==13||papers.filter(p=>p.status==='Preprint').length!==9||papers.filter(p=>p.status==='Published').length!==1)errors.push('Unexpected content counts');
const banned=files.filter(p=>/(?:\.lake|node_modules|deploy-state|\.env|\.git)(?:[\\/]|$)/.test(p));if(banned.length)errors.push('Non-public paths in dist');
console.log(JSON.stringify({origin,indexable,htmlPages:html.length,sitemapPages:sitemapUrls.length,localReferences:checked,pdfFiles:pdfs.length,papers:papers.length,essays:essays.length,gaming:gaming.length,puzzles:puzzles.length,publicPhotoFiles:publicPhotos.length,retainedPublicAssets:publicAssets.length,errors},null,2));if(errors.length)process.exit(1);
