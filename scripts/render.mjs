import {renderAuditPages} from './audit-pages.mjs';
import {renderEssayArchives} from './essay-archives.mjs';
import {renderArchivePage} from './archive-page.mjs';
import {renderResearchPages} from './research-pages.mjs';
import {renderLibraryPages} from './library-pages.mjs';
import {renderPersonalPages} from './personal-pages.mjs';
import {renderPlayPages} from './play-pages.mjs';
import {renderInterestsPages} from './interests-pages.mjs';
import {packageFormalizationProjects} from './formalization-projects.mjs';
import {readFileSync,writeFileSync,mkdirSync,cpSync,existsSync,unlinkSync} from 'node:fs';
import path from 'node:path';
import {origin,indexable,analyticsEnabled,pageRobots,redirectRobots,robotsText} from './site-config.mjs';
const notes=JSON.parse(readFileSync('content/notes.json','utf8'));
const papers=JSON.parse(readFileSync('content/papers.json','utf8'));
const allEssays=JSON.parse(readFileSync('content/essays.json','utf8'));
const essays=allEssays.filter(essay=>essay.published!==false);
const essayArchives=JSON.parse(readFileSync('content/essay-archives.json','utf8'));
const archiveByRoute=new Map(essayArchives.map(item=>[item.page,item]));
const allGaming=JSON.parse(readFileSync('content/gaming.json','utf8'));
const gaming=allGaming.filter(game=>game.published!==false);
const puzzles=JSON.parse(readFileSync('content/puzzles.json','utf8'));
const allInterests=JSON.parse(readFileSync('content/interests.json','utf8'));
const interests={
  ...(allInterests.youtube?.published===true?{youtube:allInterests.youtube}:{}),
  ...(allInterests.broodWar?.published===true?{broodWar:allInterests.broodWar}:{}),
  ...(allInterests.overwatch?.published===true?{overwatch:allInterests.overwatch}:{}),
  ...(allInterests.fashion?.published===true?{fashion:allInterests.fashion,profileUrl:allInterests.profileUrl}:{}),
  ...(allInterests.car?.published===true?{car:allInterests.car}:{})
};
const readingPaths=JSON.parse(readFileSync('content/reading-paths.json','utf8'));
const selection=JSON.parse(readFileSync('content/selection.json','utf8'));
const selectedPapers=selection.papers.map(id=>{
  const paper=papers.find(p=>p.id===id);
  if(!paper||paper.status!=='Preprint')throw new Error(`Featured preprint is missing or needs its status reviewed: ${id}`);
  return paper;
});
const currentResearch=(selection.currentResearch||[]).map(id=>{const p=papers.find(p=>p.id===id);if(!p?.page)throw Error(`Missing current research: ${id}`);return p;});
const selectedLibraryNotes=selection.expositions.map(slug=>{
  const note=notes.find(n=>n.slug===slug);
  if(!note)throw new Error(`Featured exposition is missing: ${slug}`);
  return note;
});
const featuredNotes=selection.featuredExpositions.map(slug=>{
  const note=notes.find(n=>n.slug===slug);
  if(!note?.readingBody)throw new Error(`Current exposition has no reading edition: ${slug}`);
  return note;
});
if(new Set(selection.papers).size!==selection.papers.length||new Set(selection.expositions).size!==selection.expositions.length||new Set(selection.featuredExpositions).size!==selection.featuredExpositions.length)throw new Error('Duplicate featured content');
const selectedNotes=[...new Map([...featuredNotes,...selectedLibraryNotes].map(n=>[n.slug,n])).values()];
mkdirSync('dist',{recursive:true});
cpSync('public','dist',{recursive:true});
cpSync('assets','dist/assets',{recursive:true});
cpSync('assets/styles.css','dist/styles.css');
// Withdrawn content must not survive an incremental build as a page or download.
// Keep originals locally so setting published=true restores the relevant section.
const unpublishedRoutes=allEssays.filter(essay=>essay.published===false).flatMap(essay=>[
  essay.page||`/essays/${essay.slug}.html`,essay.pdf,essay.source
].filter(Boolean));
if(!essays.length)unpublishedRoutes.push('/essays.html');
if(!gaming.length)unpublishedRoutes.push('/gaming.html');
const interestScreenshotRoutes=new Set((interests.overwatch?.images||[]).map(im=>im.src));
unpublishedRoutes.push(...allGaming.filter(game=>game.published===false).flatMap(game=>game.images.filter(im=>!interestScreenshotRoutes.has(im.src)).map(im=>im.src)));
if(allInterests.fashion?.published===false)unpublishedRoutes.push('/interests/style.html',...(allInterests.fashion.images||[]).map(im=>im.src));
if(allInterests.car?.published===false)unpublishedRoutes.push('/interests/bmw-x6.html',...(allInterests.car.images||[]).map(im=>im.src));
const distRoot=path.resolve('dist');
for(const route of unpublishedRoutes){
  if(!route.startsWith('/')||route.includes('\\'))throw new Error(`Invalid unpublished output route: ${route}`);
  const output=path.resolve(distRoot,'.'+route);
  if(!output.startsWith(distRoot+path.sep))throw new Error(`Unpublished output escapes dist: ${route}`);
  if(existsSync(output))unlinkSync(output);
}
const sitemapRoutes=[];
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#25313c" d="M3 4h26L17 28z"/><path fill="#9b7a48" d="M3 4l14 24 1-16z"/></svg>';
const nav=[['Expositions','/expositions.html'],...(essays.length?[['Essays','/essays.html']]:[]),['About','/about.html'],['Interests','/interests.html']];
const researchMetadata=route=>{const p=papers.find(p=>p.page===route);return p?`<meta name="citation_title" content="${esc(p.title)}"><meta name="citation_author" content="${esc(p.authors)}"><meta name="citation_publication_date" content="${esc(p.versionDate.replaceAll('-','/'))}"><meta name="citation_pdf_url" content="${origin}${esc(p.pdf)}"><meta name="citation_doi" content="${esc(p.doi)}">`:'';};
const head=(title,description,route)=>`<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${researchMetadata(route)}<title>${esc(title)} — Tensorgami</title><meta name="description" content="${esc(description)}"><meta name="robots" content="${archiveByRoute.has(route)?redirectRobots:pageRobots(route)}">${archiveByRoute.has(route)?`<meta name="tensorgami-archive-target" content="${esc(archiveByRoute.get(route).target)}">`:""}<meta name="theme-color" content="#f7f5f0"><link rel="canonical" href="${origin}${archiveByRoute.get(route)?.target||route}"><meta property="og:title" content="${esc(title)} — Tensorgami"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="${route.startsWith('/essays/')||papers.some(p=>p.page===route)||notes.some(n=>(n.readingBody||n.readingExcerpt)&&n.page===route)?'article':'website'}"><meta property="og:url" content="${origin}${archiveByRoute.get(route)?.target||route}"><link rel="icon" type="image/svg+xml" href="data:image/svg+xml,${encodeURIComponent(icon)}"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/assets/personal.css"><link rel="stylesheet" href="/assets/interests.css"><link rel="stylesheet" href="/assets/expositions.css">${['/notes/quotients-and-reconstruction.html','/notes/six-elements-one-comparison.html'].includes(route)?'<link rel="stylesheet" href="/assets/quotients-exposition.css">':''}${route==='/notes/six-elements-one-comparison.html'?'<link rel="stylesheet" href="/assets/c6-companion.css">':''}${route==='/notes/quotients-and-reconstruction-audit.html'?'<link rel="stylesheet" href="/assets/quotients-audit.css">':''}${(notes.some(n=>(n.readingBody||n.readingExcerpt)&&n.page===route)||essays.some(e=>e.staticMath&&e.page===route))?'<link rel="stylesheet" href="/assets/math-typeset.css">':''}${route==='/notes/what-a-derivative-retains.html'?'<link rel="stylesheet" href="/assets/derivative-exposition.css"><meta name="manuscript-sha256" content="'+notes.find(n=>n.page===route).manuscriptSha256+'">':''}`;
const header=active=>`<a class="skip" href="#main">Skip to content</a><div class="wrap"><header class="masthead"><a class="brand" href="/" aria-label="Tensorgami home">${icon.replace('xmlns="http://www.w3.org/2000/svg"','aria-hidden="true"')}Tensorgami</a><nav class="nav" aria-label="Main navigation">${nav.map(([title,url])=>`<a href="${url}"${title===active?' aria-current="page"':''}>${title}</a>`).join('')}</nav></header>`;
const footer=`<footer class="footer"><p>© 2026 Henry Shin · Tensorgami</p><div><a href="/mechanisms.html">Reading paths</a><a href="/papers.html">Research papers</a><a href="/editions.html">Editions</a><a href="mailto:hkshin@alumni.harvard.edu">Email</a><a href="/privacy.html">Privacy</a><a href="/license.html">Reuse</a></div></footer></div>`;
const derivativeRoute='/notes/what-a-derivative-retains.html';
const pageScripts=route=>archiveByRoute.has(route)?'<script src="/assets/archive-fragments.js" defer></script>':(route===derivativeRoute?'<script defer src="/assets/derivative-exposition.js" data-tensorgami-derivative="v1"></script>':'')+(route==='/'?'<script defer src="/assets/reading-entry.js" data-tensorgami-reading-entry="v1"></script>':'')+(route==='/privacy.html'?'<script defer src="/assets/privacy-controls.js" data-tensorgami-privacy-controls="v1"></script>':'')+(analyticsEnabled&&route!=='/404.html'&&!archiveByRoute.has(route)?'<script defer src="/assets/analytics.js" data-tensorgami-analytics="v1"></script>':'');
function save(route,title,description,active,body){const filename=path.join('dist',route==='/'?'index.html':route);mkdirSync(path.dirname(filename),{recursive:true});writeFileSync(filename,`<!doctype html>\n<html lang="en"><head>${head(title,description,route)}${pageScripts(route)}</head><body${route===derivativeRoute?' id="top"':''}>${header(active)}<main id="main">${body}</main>${footer}</body></html>\n`);if(route!=='/404.html'&&!archiveByRoute.has(route))sitemapRoutes.push(route);}
function redirect(route,target,title){const filename=path.join('dist',route.endsWith('/')?route+'index.html':route);mkdirSync(path.dirname(filename),{recursive:true});writeFileSync(filename,`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="${redirectRobots}"><link rel="canonical" href="${origin}${esc(target.split('#')[0])}"><meta http-equiv="refresh" content="0;url=${esc(target)}"><title>${esc(title)}</title></head><body><a href="${esc(target)}">${esc(title)}</a></body></html>\n`);}
const heading=(eyebrow,title,lead)=>`<header class="page-heading"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="lead">${lead}</p></header>`;
const noteLinks=(n,showPageCount=false)=>`<div class="text-links"><a href="${n.page}">${n.readingFormat==='guide'?'Reading guide and PDF':`Read ${n.kind==='Problem set'?'the problems':'the exposition'}`}</a>${n.pdf?`<a href="${n.pdf}" aria-label="PDF${showPageCount?`, ${n.pageCount} pages`:''}: ${esc(n.title)}">PDF${showPageCount?` · ${n.pageCount} pages`:''}</a>`:''}${n.manuscript?`<a href="${n.manuscript}">Markdown manuscript</a>`:''}${n.source?`<a href="/verification.html#${formalizationProjects.get(n.slug).id}">Sources and verification</a>`:''}</div>`;
renderResearchPages({save,heading,esc,papers,selection,selectedPapers});
const formalizationProjects=packageFormalizationProjects(notes);
renderLibraryPages({save,heading,esc,notes,essays,featuredNotes,noteLinks,readingPaths,redirect,formalizationProjects});
renderAuditPages({save,esc});
save('/privacy.html','Privacy','Privacy information for Tensorgami.','',heading('Site information','Privacy','')+`<div class="narrow prose">${analyticsEnabled?`<p>This site uses a small, cookieless visitor counter to understand which writing people read. The author receives a private daily summary of estimated visitors, page views, and clicks on PDF links. There are no advertising or analytics cookies, and no visitor identifier is saved in your browser.</p><p>The counter receives the page or PDF path and the referring site’s domain, without URL queries or fragments. It briefly processes your IP address and browser information to produce a secret-keyed identifier that changes each day; the reporting database does not store the raw IP address or browser information. Pseudonymous visit details are aggregated after about three days, with scheduled daily cleanup. Daily aggregate counts are retained for about sixty days. Random request IDs used to prevent duplicate counts are also kept for about sixty days. Reporting uses Cloudflare infrastructure, and summaries are delivered through Resend.</p><p>The counts are estimates, not a count of identifiable people. Shared connections and changing browsers can affect the visitor estimate. Recognized bots, automated checks, and quick repeated views are filtered, but these filters are imperfect. Visits with JavaScript disabled or blocked are not counted. PDF-link clicks do not confirm downloads, and opening a PDF directly is not recorded by this counter.</p>`:`<p>Visitor analytics are currently disabled. This site does not use advertising or analytics cookies.</p>`}<h2>Your choice</h2><p>Do Not Track and Global Privacy Control signals are respected. You can also exclude your visits using the preference below. The preference is saved in local browser storage; a short-lived timestamp in session storage prevents quick refreshes from being counted repeatedly. Neither is a visitor identifier.</p><div class="privacy-preferences" data-tensorgami-privacy data-analytics-enabled="${analyticsEnabled}" hidden><p id="analytics-preference-status" role="status" aria-live="polite"></p><div class="privacy-actions"><button type="button" id="analytics-opt-out">Exclude my visits</button><button type="button" id="analytics-opt-in">Allow aggregate counting</button></div></div><noscript><p>JavaScript is disabled, so this visitor counter does not run.</p></noscript><p>This setting applies to this browser on this domain. If you use both tensorgami.com and www.tensorgami.com, set it separately on each. Clearing browser storage removes the preference. Changing this setting does not remove counts already recorded.</p><h2>Hosting and external links</h2><p>The hosting provider may process ordinary request information to deliver the pages. It may also use security scripts and cookies to distinguish ordinary visits from automated traffic. Following an external link takes you to that service and its privacy practices.</p><p>For questions, contact <a href="mailto:hkshin@alumni.harvard.edu">hkshin@alumni.harvard.edu</a>.</p></div>`);
save('/license.html','Reuse and attribution','Copyright and reuse information for Tensorgami.','',heading('Site information','Reuse & attribution','')+`<div class="narrow prose"><p>Unless a file states otherwise, the writing, PDFs, TeX sources, site text, metadata, formalizations, and site source are copyright © 2026 Henry Shin. All rights reserved.</p><p>Short quotations with attribution, ordinary scholarly citation, and links to these pages are welcome. For other reuse, please <a href="mailto:hkshin@alumni.harvard.edu">get in touch</a>. Separate notices in individual files continue to apply. Third-party artwork, names, and interface elements remain the property of their respective owners.</p><p><a href="/LICENSE.md">Full repository notice</a></p></div>`);
save('/404.html','Page not found','Find mathematical expositions, essays, and research papers by Henry Shin.','',heading('Page not found','Let’s find your way back.','This address does not match a page in the current collection.')+`<div class="narrow"><p><a href="/expositions.html">Browse the expositions</a> or <a href="/papers.html">visit the research papers</a>.</p></div>`);
renderPersonalPages({save,heading,esc,notes,selectedNotes,featuredNotes,selectedPapers,papers,currentResearch,essays,gaming,noteLinks,interests});
renderEssayArchives({save,heading,esc,archives:essayArchives});
renderArchivePage({save,heading,esc});
renderPlayPages({save,heading,esc,puzzles,redirect,gaming});
renderInterestsPages({save,heading,esc,interests,puzzles,gaming});
redirect('/about/index.html','/about.html','About Henry Shin');
writeFileSync('dist/favicon.svg',icon);
writeFileSync('dist/robots.txt',robotsText);
writeFileSync('dist/portfolio.json',JSON.stringify({person:originalPerson(),selection,readingPaths,expositions:notes,papers,essays,gaming,puzzles,personalInterests:interests},null,2)+'\n');
function originalPerson(){return {name:'Henry Shin',website:origin,email:'hkshin@alumni.harvard.edu',orcid:'https://orcid.org/0009-0000-6453-6865',interests:['Motivic mathematics','Tannakian and motivic Galois theory','Cohomology','Periods'],currentMathematicalFocus:['Motivic mathematics','Transport','Descent','Reconstruction','Permutation twisted cohomology','Tensor-triangular geometry'],mathematicalPractice:['Study','Explicit calculation','Exposition','Research'],researchBackground:['Group theory','Algebra','Additive combinatorics','Geometric analysis'],researchPapers:origin+'/papers.html',researchArchive:origin+'/papers.html'};}
writeFileSync('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapRoutes.map(route=>`<url><loc>${origin}${route}</loc></url>`).join('')}</urlset>`);
writeFileSync('dist/llms.txt','# Tensorgami — Henry Shin\n\nA developing inquiry into motivic mathematics through study, explicit calculation, and exposition. Current interests include Tannakian and motivic Galois theory, cohomology, periods, transport, descent, and reconstruction. The site also contains a wider library of expositions in algebra, geometry, number theory, and analysis, and essays on understanding, independent inquiry, and the scope of authority. Current research includes finite generation of permutation twisted cohomology and the tensor-triangular geometry of permutation complexes. Research papers collect this work and earlier papers, with versions, publication status, and corrections stated individually.\n\n## Selected expositions\n\n'+selectedNotes.map(n=>`- [${n.title}](${origin}${n.page}) — ${n.summary}`).join('\n')+'\n\n## Current research\n\n'+currentResearch.map(p=>`- [${p.title}](${origin}${p.page}) — ${p.description}`).join('\n')+'\n\n## Explore\n\n- [Current inquiry]('+origin+'/)\n- [Expositions]('+origin+'/expositions.html)\n- [Reading paths]('+origin+'/mechanisms.html)\n'+(essays.length?'- [Essays]('+origin+'/essays.html)\n- [Mathematical Life in the Age of AI]('+origin+'/essays/mathematical-life-in-the-age-of-ai.html)\n':'')+'- [About Henry Shin]('+origin+'/about.html)\n- [Interests]('+origin+'/interests.html)\n- [Research papers]('+origin+'/papers.html)\n- [Supplementary sources]('+origin+'/verification.html)\n');
console.log(JSON.stringify({origin,indexable,analyticsEnabled,notes:notes.length,papers:papers.length,essays:essays.length,gaming:gaming.length,puzzles:puzzles.length,corrections:1,rendered:true}));
