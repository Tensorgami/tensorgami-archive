import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';
const work=path.dirname(fileURLToPath(import.meta.url));
if(!process.argv[2])throw Error('Usage: node render-full-web.mjs <audited-tex-directory-with-aux> [output-directory]');
const input=path.resolve(process.argv[2]);
const output=path.resolve(process.argv[3]||work);
let require=createRequire(import.meta.url);
try{require.resolve('mathjax-full/package.json');}catch{
 if(!process.env.TENSORGAMI_MATHJAX_ROOT)throw Error('Install mathjax-full or set TENSORGAMI_MATHJAX_ROOT to a directory containing node_modules/mathjax-full.');
 require=createRequire(pathToFileURL(path.join(process.env.TENSORGAMI_MATHJAX_ROOT,'_loader.cjs')));
}
const {mathjax}=require('mathjax-full/js/mathjax.js');
const {TeX}=require('mathjax-full/js/input/tex.js');
const {SVG}=require('mathjax-full/js/output/svg.js');
const {liteAdaptor}=require('mathjax-full/js/adaptors/liteAdaptor.js');
const {RegisterHTMLHandler}=require('mathjax-full/js/handlers/html.js');
const {AllPackages}=require('mathjax-full/js/input/tex/AllPackages.js');
const adaptor=liteAdaptor();RegisterHTMLHandler(adaptor);
const macros={id:'\\mathrm{id}',kk:'k',nml:'\\trianglelefteq',iso:'\\xrightarrow{\\sim}',Ker:'\\operatorname{ker}',im:'\\operatorname{im}',Span:'\\operatorname{span}',Hom:'\\operatorname{Hom}',Ext:'\\operatorname{Ext}',Aut:'\\operatorname{Aut}',rank:'\\operatorname{rank}'};
// Unknown commands must become errors, not red fallback text that evades validation.
const doc=mathjax.document('',{InputJax:new TeX({packages:AllPackages.filter(name=>name!=='noundefined'),macros}),OutputJax:new SVG({fontCache:'local'})});
const sha=s=>createHash('sha256').update(s).digest('hex');
const read=p=>fs.readFileSync(p,'utf8').replaceAll('\r\n','\n');
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const main=read(path.join(input,'main.tex'));
const aux=read(path.join(input,'quotients-and-reconstruction.aux'));
const labels=new Map([...aux.matchAll(/\\newlabel\{([^}]+)\}\{\{([^}]+)\}/g)].map(m=>[m[1],m[2]]));
const citations=new Map([...aux.matchAll(/\\bibcite\{([^}]+)\}\{([^}]+)\}/g)].map(m=>[m[1],m[2]]));
const sourceFiles=[{file:'main.tex',sha256:sha(fs.readFileSync(path.join(input,'main.tex')))}];
const flattened=main.replace(/\\input\{([^}]+)\}/g,(_m,name)=>{const file=name+'.tex';const s=read(path.join(input,file));sourceFiles.push({file,sha256:sha(fs.readFileSync(path.join(input,file)))});return '\n% BEGIN INPUT '+file+'\n'+s+'\n% END INPUT '+file+'\n';});
const sourceHash=sha(flattened);
let body=flattened.slice(flattened.indexOf('\\begin{abstract}'),flattened.lastIndexOf('\\end{document}'));
body=body.replace(/(^|[^\\])%[^\n]*/g,'$1').replace(/\\clearpage/g,'').replace(/\\begingroup\\setlength\{\\parskip\}\{0pt\}\\tableofcontents\\endgroup/g,'');
const seenLabels=[], references=[], equations=[], headings=[], statements=[], proofs=[], diagrams=[], paragraphs=[], tables=[];
let sectionIndex=0,section='0',subsection=0,theorem=0,equationCounter=0,part=0,appendix=false,diagramIndex=0;
let html='',paragraph='',lastContext=null;
const stack=[];
function group(s,pos,open='{',close='}'){
 while(/\s/.test(s[pos]||'')&&pos<s.length)pos++;
 if(s[pos]!==open)throw Error('Expected '+open+' near '+s.slice(pos,pos+100));
 let level=1,i=pos+1;
 for(;i<s.length;i++){if(s[i]==='\\'){i++;continue;}if(s[i]===open)level++;if(s[i]===close&&!--level)return {value:s.slice(pos+1,i),end:i+1};}
 throw Error('Unclosed group near '+s.slice(pos,pos+100));
}
function recordLabel(label,number=null){
 if(seenLabels.includes(label))throw Error('Duplicate source label '+label);
 if(!labels.has(label))throw Error('Label absent from audited AUX: '+label);
 if(number!==null&&labels.get(label)!==number)throw Error(`Number differs from PDF for ${label}: ${number} vs ${labels.get(label)}`);
 seenLabels.push(label);return `<span id="${esc(label)}" class="qrr-anchor"></span>`;
}
function refValue(label){if(!labels.has(label))throw Error('Missing reference '+label);references.push(label);return labels.get(label);}
function textRender(s){
 let out='',plain='';
 const flushPlain=()=>{out+=esc(plain.replace(/\s+/g,' ').replaceAll('---','—').replaceAll('--','–').replaceAll('``','“').replaceAll("''",'”'));plain='';};
 for(let i=0;i<s.length;){
  if(s.startsWith('\\(',i)||s[i]==='$'){flushPlain();const paren=s.startsWith('\\(',i),start=i+(paren?2:1),close=paren?'\\)':'$',j=s.indexOf(close,start);if(j<0)throw Error('Unclosed inline math');out+=renderMath(s.slice(start,j),false);i=j+close.length;continue;}
  if(s[i]==='~'){plain+='\u00a0';i++;continue;}
  if(s[i]!=='\\'){plain+=s[i++];continue;}
  flushPlain();const m=/^\\([A-Za-z]+|.)/.exec(s.slice(i));const cmd=m[1];i+=m[0].length;
  if(['"',"'",'`','v'].includes(cmd)){
   const accent={'"':'\u0308',"'":'\u0301','`':'\u0300',v:'\u030c'}[cmd];let c=s[i];if(c==='{'){const g=group(s,i);c=g.value;i=g.end;}else i++;out+=esc((c+accent).normalize('NFC'));continue;
  }
  if(['%','&','_','#','{','}'].includes(cmd)){out+=esc(cmd);continue;}
  if(cmd==='S'){out+='§';continue;}
  if([' ',',',';','!'].includes(cmd)){out+=' ';continue;}
  if(cmd==='label'){const g=group(s,i);out+=recordLabel(g.value,lastContext?.number??null);i=g.end;continue;}
  if(['emph','textit','textbf','texttt'].includes(cmd)){const g=group(s,i),tag=cmd==='textbf'?'strong':cmd==='texttt'?'code':'em';out+=`<${tag}>${textRender(g.value)}</${tag}>`;i=g.end;continue;}
  if(cmd==='texorpdfstring'){const a=group(s,i),b=group(s,a.end);out+=textRender(a.value);i=b.end;continue;}
  if(cmd==='url'){const g=group(s,i);out+=`<a href="${esc(g.value)}">${esc(g.value)}</a>`;i=g.end;continue;}
  if(cmd==='href'){const a=group(s,i),b=group(s,a.end);out+=`<a href="${esc(a.value)}">${textRender(b.value)}</a>`;i=b.end;continue;}
  if(cmd==='ref'||cmd==='eqref'){const g=group(s,i);out+=`<a href="#${esc(g.value)}">${cmd==='eqref'?'(':''}${esc(refValue(g.value))}${cmd==='eqref'?')':''}</a>`;i=g.end;continue;}
  if(cmd==='cite'){let option='';if(s[i]==='['){const g=group(s,i,'[',']');option=g.value;i=g.end;}const g=group(s,i),keys=g.value.split(',').map(x=>x.trim());out+='['+keys.map(key=>{if(!citations.has(key))throw Error('Missing citation '+key);return `<a href="#reference-${esc(key)}">${citations.get(key)}</a>`;}).join(', ')+(option?', '+textRender(option):'')+']';i=g.end;continue;}
  throw Error('Unsupported text command \\'+cmd+' near '+s.slice(Math.max(0,i-70),i+100));
 }
 flushPlain();return out;
}
function splitRows(s){
 const rows=[];let level=0,start=0;
 for(let i=0;i<s.length;i++){if(s[i]==='\\'){if(s[i+1]==='\\'&&level===0){rows.push(s.slice(start,i));i++;if(s[i+1]==='['){const g=group(s,i+1,'[',']');i=g.end-1;}start=i+1;}else i++;continue;}if(s[i]==='{')level++;if(s[i]==='}')level--;}
 rows.push(s.slice(start));return rows.filter(x=>x.trim());
}
function renderMath(raw,display,environment=null){
 let tex=raw.trim(),anchors='',numbers=[];
 if(tex.includes('\\begin{tikzcd}')){
  const found=[...tex.matchAll(/\\begin\{tikzcd\}[\s\S]*?\\end\{tikzcd\}/g)];if(found.length!==1)throw Error('Expected one diagram per display');
  const diagram=found[0][0],id=++diagramIndex,tail=tex.replace(diagram,'').trim();let tag='';
  if(tail){if(!tail.startsWith('\\tag{'))throw Error('Unexpected text around diagram '+tail);const g=group(tail,4);if(g.end!==tail.length)throw Error('Trailing diagram material');tag=textRender(g.value);}
  const padded=String(id).padStart(2,'0');diagrams.push({id,file:`diagram-${padded}.svg`,tex:diagram,texSha256:sha(diagram),tag:tag.replace(/<[^>]+>/g,'')});
  return `<figure id="diagram-${padded}" class="qrr-diagram" data-diagram="${id}"><div class="qrr-diagram-scroll" tabindex="0"><img src="/assets/expositions/quotients-and-reconstruction/diagram-${padded}.svg" alt="DIAGRAM_ALT_${padded}" width="DIAGRAM_WIDTH_${padded}" height="DIAGRAM_HEIGHT_${padded}"></div>${tag?`<figcaption class="equation-number">(${tag})</figcaption>`:''}</figure>`;
 }
 const sourceLabels=[...tex.matchAll(/\\label\{([^}]+)\}/g)].map(m=>m[1]);
 if(environment==='align'){
  tex=splitRows(tex).map(row=>{const ls=[...row.matchAll(/\\label\{([^}]+)\}/g)].map(m=>m[1]);const n=String(++equationCounter);numbers.push(n);for(const label of ls)anchors+=recordLabel(label,n);return row.replace(/\\label\{[^}]+\}/g,'')+'\\tag{'+n+'}';}).join('\\\\');
  tex='\\begin{align}'+tex+'\\end{align}';
 }else{
  const number=environment==='equation'?String(++equationCounter):null;if(number)numbers.push(number);
  for(const label of sourceLabels)anchors+=recordLabel(label,number);
  tex=tex.replace(/\\label\{[^}]+\}/g,'');
  if(environment==='align*')tex='\\begin{aligned}'+tex+'\\end{aligned}';
 }
 tex=tex.replace(/\\(eqref|ref)\{([^}]+)\}/g,(_m,cmd,label)=>(cmd==='eqref'?'(':'')+refValue(label)+(cmd==='eqref'?')':''));
 // Preserve native TeX and annotations; use MathJax's supported inclusion-arrow glyph.
 const renderTex=tex.replace(/\\lhook\s*\\joinrel\s*\\longrightarrow/g,'\\hookrightarrow');
 const svg=adaptor.outerHTML(doc.convert(renderTex,{display})).replaceAll('MJX-','QRR-MJX-');
 if(/data-mjx-error|data-mml-node="merror"|<merror/.test(svg))throw Error('MathJax error in '+tex+'\n'+svg.match(/data-mjx-error[^>]+/)?.[0]);
 const entry={id:equations.length+1,raw,tex,display,environment,labels:sourceLabels,numbers};equations.push(entry);
 const wide=!display&&Number(svg.match(/width="([\d.]+)ex"/)?.[1])>32;
 const tag=display?'div':'span',number=environment==='equation'?numbers[0]:null;
 return anchors+`<${tag} class="${display?'math-display':'math-inline'+(wide?' math-inline-wide':'')}" role="img" aria-label="${esc(tex)}" data-tex="${esc(tex)}" data-qrr-math="${entry.id}"${display?' tabindex="0"':''}>${svg}${number?`<span class="equation-number">(${number})</span>`:''}</${tag}>`;
}
function flush(){
 if(paragraph.trim()){
  const raw=paragraph.trim(),id=paragraphs.length+1;
  const leadingLabels=raw.match(/^(?:\\label\{[^}]+\}\s*)+/)?.[0]||'';
  const attachKey=lastContext?.attachKey;
  let remaining=raw,attached='';
  if(leadingLabels&&attachKey){
   attached=textRender(leadingLabels);
   const marker=`<!--QRR_LABELS:${attachKey}-->`;
   if(!html.includes(marker))throw Error('Missing heading attachment marker '+attachKey);
   html=html.replace(marker,attached+marker);
   remaining=raw.slice(leadingLabels.length).trim();
  }
  const rendered=textRender(remaining),anchorOnly=!!leadingLabels&&!remaining;
  if(remaining)html+=`<p data-source-paragraph="${id}">`+rendered+'</p>\n';
  paragraphs.push({id,raw,anchorOnly,labelTarget:attached?attachKey:null,htmlSha256:sha(rendered)});
  if(lastContext)lastContext.attachKey=null;
 }
 paragraph='';
}
for(let i=0;i<body.length;){
 if(body.startsWith('\\[',i)){flush();const j=body.indexOf('\\]',i+2);if(j<0)throw Error('Unclosed display');html+=renderMath(body.slice(i+2,j),true)+'\n';i=j+2;continue;}
 const mathEnv=/^\\begin\{(equation|align\*?)\}/.exec(body.slice(i));
 if(mathEnv){flush();const env=mathEnv[1],end='\\end{'+env+'}',j=body.indexOf(end,i+mathEnv[0].length);if(j<0)throw Error('Unclosed math env');html+=renderMath(body.slice(i+mathEnv[0].length,j),true,env)+'\n';i=j+end.length;continue;}
 if(body.startsWith('\\appendix',i)){flush();appendix=true;sectionIndex=0;i+='\\appendix'.length;continue;}
 if(body.startsWith('\\addcontentsline{',i)){flush();let g=group(body,i+'\\addcontentsline'.length);g=group(body,g.end);g=group(body,g.end);i=g.end;continue;}
 const heading=/^\\(part|section\*?|subsection)\{/.exec(body.slice(i));
 if(heading){flush();const g=group(body,i+heading[0].length-1),kind=heading[1];let number,id,level;
  if(kind==='part'){part++;number=['I','II','III','IV'][part-1];id='part-'+part;level='p';}
  else if(kind==='section*'){number='';id='how-to-read';level='h2';}
  else if(kind==='section'){sectionIndex++;section=appendix?String.fromCharCode(64+sectionIndex):String(sectionIndex);subsection=0;theorem=0;number=section;id='section-'+section;level='h2';lastContext={number,attachKey:id};}
  else {subsection++;number=section+'.'+subsection;id='section-'+number.replaceAll('.','-');level='h3';lastContext={number,attachKey:id};}
  const title=textRender(g.value);headings.push({kind,number,id,titleTex:g.value,titleHTML:title});
  const legacy=kind==='section'?{'1':'first-reading','2':'one-comparison','5':'comparison-pages','8':'factors-and-extensions','12':'higher-quotients'}[number]:null;
  if(legacy)html+=`<span id="${legacy}" class="legacy-anchor" aria-hidden="true"></span>\n`;
  html+=`<${level} id="${id}"${kind==='part'?' class="qrr-part"':''}>${lastContext?.attachKey===id?`<!--QRR_LABELS:${id}-->`:''}${number?esc((kind==='part'?'Part ':'')+number)+' · ':''}${title}</${level}>\n`;i=g.end;continue;
 }
 if(body.startsWith('\\begin{tabular}',i)){
  flush();const g=group(body,i+'\\begin{tabular}'.length),end='\\end{tabular}',j=body.indexOf(end,g.end);if(j<0)throw Error('Unclosed table');const raw=body.slice(g.end,j);const rows=splitRows(raw.replace(/\\(?:toprule|midrule|bottomrule)/g,''));
  const cells=rows.map(row=>row.split('&').map(cell=>textRender(cell.trim())));tables.push({raw,rows:cells.length,columns:cells[0].length});
  html+='<div class="table-scroll" role="region" aria-label="Nilpotent operator probe measurements" tabindex="0"><table><thead><tr>'+cells[0].map(c=>'<th scope="col">'+c+'</th>').join('')+'</tr></thead><tbody>'+cells.slice(1).map(row=>'<tr>'+row.map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>\n';i=j+end.length;continue;
 }
 const env=/^\\(begin|end)\{([a-zA-Z]+)\}/.exec(body.slice(i));
 if(env){flush();i+=env[0].length;const name=env[2];
  if(env[1]==='begin'){
   if(name==='abstract'){html+='<div class="qrr-abstract">\n';stack.push({name,tag:'div'});continue;}
   if(name==='center'){stack.push({name,tag:null});continue;}
   if(name==='enumerate'){html+='<ol>\n';stack.push({name,tag:'ol',item:false});continue;}
   if(name==='thebibliography'){const g=group(body,i);i=g.end;html+='<h2 id="references">References</h2>\n<ol class="references">\n';headings.push({kind:'references',id:'references',titleHTML:'References'});stack.push({name,tag:'ol',item:false});continue;}
   if(name==='proof'){let title='Proof';if(body[i]==='['){const g=group(body,i,'[',']');title=textRender(g.value);i=g.end;}const n=proofs.length+1;proofs.push({id:n,section});html+=`<div class="proof" data-proof="${n}"><p><strong>${title}.</strong></p>\n`;stack.push({name,tag:'div'});continue;}
   if(['theorem','proposition','lemma','corollary','definition','example','remark'].includes(name)){
    theorem++;let option='';if(body[i]==='['){const g=group(body,i,'[',']');option=g.value;i=g.end;}const number=section+'.'+theorem;lastContext={number,attachKey:'statement-'+number};statements.push({kind:name,number,titleTex:option});
    html+=`<div class="theorem ${name}" id="statement-${number}"><p class="theorem-title"><strong><!--QRR_LABELS:statement-${number}-->${name[0].toUpperCase()+name.slice(1)} ${number}${option?' ('+textRender(option)+')':''}.</strong></p>\n`;stack.push({name,tag:'div'});continue;
   }
   throw Error('Unsupported environment '+name);
  }
  const top=stack.pop();if(top?.name!==name)throw Error('Environment mismatch '+name+' / '+top?.name);if(top.item)html+='</li>\n';if(name==='proof')html+='<p class="proof-end" aria-label="End of proof">□</p>';if(top.tag)html+='</'+top.tag+'>\n';continue;
 }
 if(body.startsWith('\\item',i)){flush();const top=stack.at(-1);if(top?.name!=='enumerate')throw Error('Item outside enumerate');if(top.item)html+='</li>\n';html+='<li>';top.item=true;i+='\\item'.length;continue;}
 if(body.startsWith('\\bibitem{',i)){flush();const g=group(body,i+8),top=stack.at(-1);if(top?.name!=='thebibliography')throw Error('Bibitem outside bibliography');if(top.item)html+='</li>\n';html+=`<li id="reference-${esc(g.value)}">`;top.item=true;i=g.end;continue;}
 if(body.startsWith('\\(',i)||body[i]==='$'){const paren=body.startsWith('\\(',i),start=i+(paren?2:1),close=paren?'\\)':'$',j=body.indexOf(close,start);if(j<0)throw Error('Inline math delimiter');paragraph+=body.slice(i,j+close.length);i=j+close.length;continue;}
 if(body.startsWith('\n\n',i)){flush();i+=2;continue;}
 paragraph+=body[i++];
}
flush();if(stack.length)throw Error('Unclosed environments');
html=html.replace(/<!--QRR_LABELS:[^>]+-->/g,'');
if(diagrams.length!==25||proofs.length!==55||statements.length!==70||equationCounter!==36)throw Error('Inventory count differs: '+JSON.stringify({diagrams:diagrams.length,proofs:proofs.length,statements:statements.length,equationCounter}));
const missingLabels=[...labels.keys()].filter(label=>!seenLabels.includes(label));if(missingLabels.length)throw Error('Unconverted labels '+missingLabels.join(','));
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);const duplicates=ids.filter((x,i)=>ids.indexOf(x)!==i);if(duplicates.length)throw Error('Duplicate HTML ids '+duplicates.join(','));
const missingAnchors=[...html.matchAll(/(?<!:)href="#([^"]+)"/g)].map(m=>m[1]).filter(id=>!ids.includes(id));if(missingAnchors.length)throw Error('Missing anchors '+missingAnchors.join(','));
fs.mkdirSync(output,{recursive:true});
let htmlOut=`<!-- source-sha256:${sourceHash} -->\n<!-- Full reading edition generated from all 16 audited TeX inputs. -->\n${html}`;
const diagramInventoryPath=path.join(output,'diagrams/diagram-inventory.json');
const diagramAssets=[];
if(fs.existsSync(diagramInventoryPath)){
 const assetInventory=JSON.parse(read(diagramInventoryPath));
 if(assetInventory.diagrams.length!==diagrams.length)throw Error('Diagram asset count differs');
 for(const diagram of diagrams){
  const asset=assetInventory.diagrams.find(d=>d.number===diagram.id);
  if(!asset||asset.tex_sha256!==diagram.texSha256)throw Error('Diagram source differs: '+diagram.id);
  const svgPath=path.join(output,'diagrams',asset.svg),svgBytes=fs.readFileSync(svgPath),svg=svgBytes.toString('utf8');
  if(sha(svgBytes)!==asset.svg_sha256)throw Error('Diagram SVG hash differs: '+asset.svg);
  if(/<image\b/i.test(svg))throw Error('Diagram contains raster image: '+asset.svg);
  const svgIds=[...svg.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  if(new Set(svgIds).size!==svgIds.length)throw Error('Duplicate internal SVG id: '+asset.svg);
  for(const m of svg.matchAll(/(?:xlink:)?href="#([^"]+)"/g))if(!svgIds.includes(m[1]))throw Error('Unresolved SVG reference '+m[1]);
  const padded=String(diagram.id).padStart(2,'0');
  const displayScale=1.2,width=Math.ceil(asset.width_css_px*displayScale),height=Math.ceil(asset.height_css_px*displayScale);
  htmlOut=htmlOut.replace(`DIAGRAM_ALT_${padded}`,esc(asset.alt)).replace(`DIAGRAM_WIDTH_${padded}`,String(width)).replace(`DIAGRAM_HEIGHT_${padded}`,String(height));
  diagramAssets.push({id:diagram.id,svg:asset.svg,svgSha256:asset.svg_sha256,alt:asset.alt,naturalWidth:asset.width_css_px,naturalHeight:asset.height_css_px,displayScale,width,height});
 }
 if(/DIAGRAM_(?:ALT|WIDTH|HEIGHT)_/.test(htmlOut))throw Error('Unresolved diagram placeholder');
 fs.writeFileSync(path.join(output,'quotients-and-reconstruction.html'),htmlOut);
}else fs.writeFileSync(path.join(output,'quotients-and-reconstruction.unresolved-diagrams.html'),htmlOut);
fs.writeFileSync(path.join(output,'Quotients_Refinement_and_Reconstruction.tex'),flattened);
fs.writeFileSync(path.join(output,'equation-inventory.json'),JSON.stringify(equations,null,2)+'\n');
fs.writeFileSync(path.join(output,'paragraph-inventory.json'),JSON.stringify(paragraphs,null,2)+'\n');
const inventory={sourceSha256:sourceHash,sourceFiles,mathjaxVersion:require('mathjax-full/package.json').version,headings,statements,proofs,equationCount:equations.length,displayCount:equations.filter(e=>e.display).length,numberedEquations:equationCounter,paragraphs:paragraphs.length,tables,labels:Object.fromEntries(labels),seenLabels,references,citations:Object.fromEntries(citations),diagrams,diagramAssets,unresolvedDiagramAssets:diagramAssets.length!==25};
fs.writeFileSync(path.join(output,'conversion-inventory.json'),JSON.stringify(inventory,null,2)+'\n');
console.log(JSON.stringify({sourceFiles:sourceFiles.length,headings:headings.length,statements:statements.length,proofs:proofs.length,math:equations.length,displays:inventory.displayCount,diagrams:diagrams.length,labels:seenLabels.length,paragraphs:paragraphs.length,sourceSha256:sourceHash,output},null,2));
