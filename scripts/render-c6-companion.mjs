import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';

// Convert the companion TeX to a complete static reading fragment.
// Native TeX is the source of mathematical/prose content; diagrams are separately
// compiled from the exact inventoried TikZ bodies, not recreated by hand.
const here=path.dirname(fileURLToPath(import.meta.url));
if(!process.argv[2])throw Error('Usage: node render-c6-companion.mjs <companion-tex-directory> [output-directory]');
const input=path.resolve(process.argv[2]);
const output=path.resolve(process.argv[3]||here);
let require=createRequire(import.meta.url);
try{require.resolve('mathjax-full/package.json');}catch{
 if(!process.env.TENSORGAMI_MATHJAX_ROOT)throw Error('Install mathjax-full or set TENSORGAMI_MATHJAX_ROOT to the directory containing node_modules/mathjax-full.');
 require=createRequire(pathToFileURL(path.join(process.env.TENSORGAMI_MATHJAX_ROOT,'_loader.cjs')));
}
const {mathjax}=require('mathjax-full/js/mathjax.js');
const {TeX}=require('mathjax-full/js/input/tex.js');
const {SVG}=require('mathjax-full/js/output/svg.js');
const {liteAdaptor}=require('mathjax-full/js/adaptors/liteAdaptor.js');
const {RegisterHTMLHandler}=require('mathjax-full/js/handlers/html.js');
const {AllPackages}=require('mathjax-full/js/input/tex/AllPackages.js');
const adaptor=liteAdaptor();RegisterHTMLHandler(adaptor);
const macros={Z:'\\mathbb Z',id:'\\mathrm{id}',op:'\\mathrm{op}',nml:'\\trianglelefteq',Hom:'\\operatorname{Hom}'};
const doc=mathjax.document('',{InputJax:new TeX({packages:AllPackages.filter(name=>name!=='noundefined'),macros}),OutputJax:new SVG({fontCache:'local'})});
const sha=s=>createHash('sha256').update(s).digest('hex');
const read=p=>fs.readFileSync(p,'utf8').replaceAll('\r\n','\n');
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const main=read(path.join(input,'main.tex'));
const sourceFiles=[{file:'main.tex',sha256:sha(fs.readFileSync(path.join(input,'main.tex')))}];
const inputs=[...main.matchAll(/\\input\{([^}]+)\}/g)].map(m=>m[1]+'.tex');
if(inputs.join('|')!=='01-concrete-route.tex|02-exercises.tex|03-higher-guide.tex')throw Error('Unexpected source input list');
const parts=inputs.map(file=>{const source=read(path.join(input,file));sourceFiles.push({file,sha256:sha(fs.readFileSync(path.join(input,file)))});return source;});
const fullBody=parts.join('\n');
const flattened=main.replace(/\\input\{([^}]+)\}/g,(_m,name)=>'\n% BEGIN INPUT '+name+'.tex\n'+read(path.join(input,name+'.tex'))+'\n% END INPUT '+name+'.tex\n');
const sourceHash=sha(flattened);
const labels=new Map();
let sec=0;
for(const match of fullBody.matchAll(/\\section\{[^}]+\}\\label\{([^}]+)\}/g))labels.set(match[1],String(++sec));
if(labels.size!==12)throw Error('Expected exactly 12 section labels');
const headings=[],equations=[],paragraphs=[],diagrams=[],tables=[],references=[],externalLinks=[],callouts=[],exercises=[],answers=[],seenLabels=[];
let section=0,html='',paragraph='',exerciseNumber=0;
const stack=[];
const headerEnd=fullBody.indexOf('\n\n');
const header=fullBody.slice(0,headerEnd);
const expectedHeader='{\\LARGE\\bfseries Six Elements, One Comparison}\\par\n{\\large A teaching companion to \\emph{Quotients, Refinement and Reconstruction}}\\par\n{\\small October 2026}';
if(header!==expectedHeader)throw Error('Companion header changed; review conversion');
const headerMetadata={title:'Six Elements, One Comparison',subtitle:'A teaching companion to Quotients, Refinement and Reconstruction',edition:'October 2026',raw:header,disposition:{title:'page shell h1',subtitle:'page shell subtitle',edition:'page shell byline'}};
// The page shell supplies title, subtitle and date.
const body=fullBody.slice(headerEnd).replace(/(^|[^\\])%[^\n]*/g,'$1');
function group(s,pos,open='{',close='}'){
 while(pos<s.length&&/\s/.test(s[pos]))pos++;
 if(s[pos]!==open)throw Error('Expected '+open+' near '+s.slice(pos,pos+100));
 let level=1;
 for(let i=pos+1;i<s.length;i++){
  if(s[i]==='\\'){i++;continue;}
  if(s[i]===open)level++;
  if(s[i]===close&&!--level)return {value:s.slice(pos+1,i),end:i+1};
 }
 throw Error('Unclosed group near '+s.slice(pos,pos+100));
}
function recordLabel(label){
 if(seenLabels.includes(label)||labels.get(label)!==String(section))throw Error('Unexpected section label '+label);
 seenLabels.push(label);return '<span id="'+esc(label)+'" class="qrr-anchor"></span>';
}
function refValue(label){if(!labels.has(label))throw Error('Missing reference '+label);references.push(label);return labels.get(label);}
function renderMath(raw,display){
 const tex=raw.trim();
 if(!tex) return '';
 const svg=adaptor.outerHTML(doc.convert(tex,{display})).replaceAll('MJX-','C6-MJX-');
 if(/data-mjx-error|data-mml-node="merror"|<merror|fill="red"|color="red"/.test(svg))throw Error('MathJax error: '+tex+'\n'+svg);
 const entry={id:equations.length+1,raw,tex,display,section};equations.push(entry);
 const wide=!display&&Number(svg.match(/width="([\d.]+)ex"/)?.[1])>32;
 const tag=display?'div':'span';
 return `<${tag} class="${display?'math-display':'math-inline'+(wide?' math-inline-wide':'')}" role="img" aria-label="${esc(tex)}" data-tex="${esc(tex)}" data-c6-math="${entry.id}"${display?' tabindex="0"':''}>${svg}</${tag}>`;
}
function textRender(s){
 let out='',plain='';
 const flush=()=>{out+=esc(plain.replace(/\s+/g,' ').replaceAll('---','—').replaceAll('--','–').replaceAll('``','“').replaceAll("''",'”'));plain='';};
 for(let i=0;i<s.length;){
  if(s.startsWith('\\(',i)||s[i]==='$'){
   flush();const paren=s.startsWith('\\(',i),start=i+(paren?2:1),close=paren?'\\)':'$',j=s.indexOf(close,start);
   if(j<0)throw Error('Unclosed inline math');out+=renderMath(s.slice(start,j),false);i=j+close.length;continue;
  }
  if(s[i]==='~'){plain+='\u00a0';i++;continue;}
  if(s[i]!=='\\'){plain+=s[i++];continue;}
  flush();const m=/^\\([A-Za-z]+|.)/.exec(s.slice(i));const cmd=m[1];i+=m[0].length;
  if(['%','&','_','#','{','}'].includes(cmd)){out+=esc(cmd);continue;}
  if(cmd==='S'){out+='§';continue;}
  if([' ',',',';','!'].includes(cmd)){out+=' ';continue;}
  if(['emph','textit','textbf','texttt'].includes(cmd)){
   const g=group(s,i),tag=cmd==='textbf'?'strong':cmd==='texttt'?'code':'em';out+=`<${tag}>${textRender(g.value)}</${tag}>`;i=g.end;continue;
  }
  if(cmd==='ref'){const g=group(s,i);out+=`<a href="#${esc(g.value)}">${refValue(g.value)}</a>`;i=g.end;continue;}
  if(cmd==='mainref'){
   const a=group(s,i),b=group(s,a.end),url='https://tensorgami.com/notes/quotients-and-reconstruction.html#section-'+a.value;
   externalLinks.push(url);out+=`<a href="${esc(url)}">${textRender(b.value)}</a>`;i=b.end;continue;
  }
  if(cmd==='href'){
   const a=group(s,i),b=group(s,a.end),url=a.value.replaceAll('\\#','#');externalLinks.push(url);out+=`<a href="${esc(url)}">${textRender(b.value)}</a>`;i=b.end;continue;
  }
  throw Error('Unsupported text command \\'+cmd+' near '+s.slice(Math.max(0,i-60),i+100));
 }
 flush();return out;
}
function flush(){
 if(paragraph.trim()){
  const raw=paragraph.trim(),id=paragraphs.length+1;
  let prefix='';
  if(section===11){const m=/^\\textbf\{([1-7])\. ([^}]+)\}/.exec(raw);if(m){prefix=` id="answer-${m[1]}"`;answers.push({number:Number(m[1]),title:m[2],paragraph:id});}}
  const rendered=textRender(raw);html+=`<p${prefix} data-source-paragraph="${id}">${rendered}</p>\n`;paragraphs.push({id,section,raw,htmlSha256:sha(rendered)});
 }
 paragraph='';
}
function splitRows(s){
 const rows=[];let level=0,start=0;
 for(let i=0;i<s.length;i++){
  if(s[i]==='\\'){
   if(s[i+1]==='\\'&&level===0){rows.push(s.slice(start,i));i++;if(s[i+1]==='['){const g=group(s,i+1,'[',']');i=g.end-1;}start=i+1;}
   else i++;
   continue;
  }
  if(s[i]==='{')level++;if(s[i]==='}')level--;
 }
 rows.push(s.slice(start));return rows.filter(x=>x.trim());
}
function splitCells(row){
 const cells=[];let depth=0,start=0;
 for(let i=0;i<row.length;i++){if(row[i]==='\\'){i++;continue;}if(row[i]==='{')depth++;if(row[i]==='}')depth--;if(row[i]==='&'&&!depth){cells.push(row.slice(start,i));start=i+1;}}
 cells.push(row.slice(start));return cells;
}
function renderTable(raw,columns,mode){
 const rows=splitRows(raw.replace(/\\(?:hline|toprule|midrule|bottomrule)/g,''));
 const textMode=mode==='tabular'||/p\{/.test(columns);
 const cells=rows.map(row=>splitCells(row).map(cell=>cell.trim()));
 if(cells.some(row=>row.length!==cells[0].length))throw Error('Unequal table row lengths');
 const id=tables.length+1;
 const entry={id,section,mode,columns,raw,rows:cells.length,columnCount:cells[0].length,cells,textMode};tables.push(entry);
 const renderCell=cell=>cell?(textMode?textRender(cell):renderMath(cell,false)):'';
 const label=section===12?'Higher-chapter reading routes':section===5?'Categorical structures and their roles':`Comparison table ${id}`;
 const result='<div class="table-scroll c6-table" role="region" aria-label="'+label+'" tabindex="0"><table data-source-table="'+id+'"><thead><tr>'+cells[0].map(cell=>'<th scope="col">'+renderCell(cell)+'</th>').join('')+'</tr></thead><tbody>'+cells.slice(1).map(row=>'<tr>'+row.map((cell,i)=>i===0?'<th scope="row">'+renderCell(cell)+'</th>':'<td>'+renderCell(cell)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
 entry.htmlSha256=sha(result);return result;
}
function renderDiagram(tex){
 const id=diagrams.length+1,padded=String(id).padStart(2,'0');
 diagrams.push({id,number:id,section,file:'diagram-'+padded+'.svg',tex,texSha256:sha(tex)});
 return `<figure id="diagram-${padded}" class="qrr-diagram" data-diagram="${id}"><div class="qrr-diagram-scroll" tabindex="0"><img src="/assets/expositions/six-elements-one-comparison/diagram-${padded}.svg" alt="DIAGRAM_ALT_${padded}" width="DIAGRAM_WIDTH_${padded}" height="DIAGRAM_HEIGHT_${padded}"></div></figure>`;
}
function renderDisplay(raw){
 const tikz=[...raw.matchAll(/\\begin\{tikzcd\}[\s\S]*?\\end\{tikzcd\}/g)];
 if(tikz.length){
  if(tikz.length!==1)throw Error('Expected exactly one diagram per display');
  const m=tikz[0],before=raw.slice(0,m.index),after=raw.slice(m.index+m[0].length);
  const leading=before.replace(/\\qquad\s*$/,'').trim(),trailing=after.trim();
  return (leading?renderMath(leading,true)+'\n':'')+renderDiagram(m[0])+(trailing?'\n'+renderMath(trailing,true):'');
 }
 if(raw.includes('\\begin{array}')){
  let result='',i=0,count=0;
  for(;;){
   const start=raw.indexOf('\\begin{array}',i);
   if(start<0){if(raw.slice(i).trim())throw Error('Unexpected text after arrays '+raw.slice(i));break;}
   const between=raw.slice(i,start).trim();if(between&&!/^\\qquad$/.test(between))throw Error('Unexpected text around array '+between);
   const cols=group(raw,start+'\\begin{array}'.length),end=raw.indexOf('\\end{array}',cols.end);if(end<0)throw Error('Unclosed array');
   result+=renderTable(raw.slice(cols.end,end),cols.value,'array');count++;i=end+'\\end{array}'.length;
  }
  return count>1?'<div class="c6-table-pair">'+result+'</div>':result;
 }
 return renderMath(raw,true);
}
for(let i=0;i<body.length;){
 if(body.startsWith('\\[',i)){
  flush();const j=body.indexOf('\\]',i+2);if(j<0)throw Error('Unclosed display');html+=renderDisplay(body.slice(i+2,j))+'\n';i=j+2;continue;
 }
 if(body.startsWith('\\section{',i)){
  flush();const g=group(body,i+'\\section'.length);section++;const title=textRender(g.value),id='section-'+section;
  headings.push({kind:'section',number:String(section),id,titleTex:g.value,titleHTML:title});
  html+=`<h2 id="${id}">${section} · ${title}</h2>\n`;i=g.end;continue;
 }
 if(body.startsWith('\\label{',i)){
  if(paragraph.trim())throw Error('Label in prose');const g=group(body,i+'\\label'.length);html+=recordLabel(g.value);i=g.end;continue;
 }
 const callout=/^\\(pausehere|route)\{/.exec(body.slice(i));
 if(callout){
  flush();const kind=callout[1],g=group(body,i+callout[0].length-1),id=callouts.length+1,content=textRender(g.value);
  callouts.push({id,section,kind,raw:g.value,htmlSha256:sha(content)});
  html+=kind==='pausehere'?`<aside class="c6-pause" data-callout="${id}"><p><strong>Pause and check.</strong> ${content}</p></aside>\n`:`<p class="c6-route" data-callout="${id}">${content}</p>\n`;i=g.end;continue;
 }
 if(body.startsWith('\\begin{tabular}',i)){
  flush();const g=group(body,i+'\\begin{tabular}'.length),j=body.indexOf('\\end{tabular}',g.end);if(j<0)throw Error('Unclosed tabular');
  html+=renderTable(body.slice(g.end,j),g.value,'tabular')+'\n';i=j+'\\end{tabular}'.length;continue;
 }
 const env=/^\\(begin|end)\{(enumerate|center)\}/.exec(body.slice(i));
 if(env){
  flush();const name=env[2];i+=env[0].length;
  if(env[1]==='begin'){stack.push({name,item:false});if(name==='enumerate')html+='<ol class="c6-exercises">\n';}
  else {const top=stack.pop();if(top?.name!==name)throw Error('Environment mismatch');if(top.item)html+='</li>\n';if(name==='enumerate')html+='</ol>\n';}
  continue;
 }
 if(body.startsWith('\\item',i)){
  flush();const top=stack.at(-1);if(top?.name!=='enumerate')throw Error('Item outside enumerate');if(top.item)html+='</li>\n';top.item=true;exerciseNumber++;
  const title=/^\s*\\textbf\{([^}]+)\}/.exec(body.slice(i+'\\item'.length));if(!title)throw Error('Exercise title missing');
  exercises.push({number:exerciseNumber,section,title:title[1]});html+=`<li id="exercise-${exerciseNumber}">`;i+='\\item'.length;continue;
 }
 const spacing=/^\\(clearpage|medskip|small)\b/.exec(body.slice(i));
 if(spacing){flush();i+=spacing[0].length;continue;}
 if(body.startsWith('\\(',i)||body[i]==='$'){
  const paren=body.startsWith('\\(',i),start=i+(paren?2:1),close=paren?'\\)':'$',j=body.indexOf(close,start);if(j<0)throw Error('Unclosed inline delimiter');paragraph+=body.slice(i,j+close.length);i=j+close.length;continue;
 }
 if(body.startsWith('\n\n',i)){flush();i+=2;continue;}
 paragraph+=body[i++];
}
flush();
if(stack.length)throw Error('Unclosed environments');
if(section!==12||diagrams.length!==4||tables.length!==10||exerciseNumber!==7||answers.length!==7)throw Error('Inventory mismatch '+JSON.stringify({section,diagrams:diagrams.length,tables:tables.length,exerciseNumber,answers:answers.length}));
if(seenLabels.length!==labels.size)throw Error('Missing section labels');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
if(new Set(ids).size!==ids.length)throw Error('Duplicate HTML ids');
const missingAnchors=[...html.matchAll(/(?<!:)href="#([^"]+)"/g)].map(m=>m[1]).filter(id=>!ids.includes(id));
if(missingAnchors.length)throw Error('Missing anchors '+missingAnchors.join(','));
fs.mkdirSync(output,{recursive:true});
let htmlOut=`<!-- source-sha256:${sourceHash} -->\n<!-- Complete reading edition from the companion's four TeX inputs. -->\n${html}`;
const diagramAssets=[];
const diagramInventoryPath=path.join(output,'diagrams','diagram-inventory.json');
if(fs.existsSync(diagramInventoryPath)){
 const assets=JSON.parse(read(diagramInventoryPath));
 if(assets.diagrams.length!==4)throw Error('Expected four diagram assets');
 for(const diagram of diagrams){
  const asset=assets.diagrams.find(d=>d.number===diagram.id);
  if(!asset||asset.tex_sha256!==diagram.texSha256)throw Error('Diagram source differs: '+diagram.id);
  const svgPath=path.join(output,'diagrams',asset.svg),bytes=fs.readFileSync(svgPath),svg=bytes.toString('utf8');
  if(sha(bytes)!==asset.svg_sha256)throw Error('Diagram SVG hash differs');
  if(/<image\b/i.test(svg))throw Error('Raster image in diagram');
  const padded=String(diagram.id).padStart(2,'0'),scale=1.2,width=Math.ceil(asset.width_css_px*scale),height=Math.ceil(asset.height_css_px*scale);
  htmlOut=htmlOut.replace('DIAGRAM_ALT_'+padded,esc(asset.alt)).replace('DIAGRAM_WIDTH_'+padded,String(width)).replace('DIAGRAM_HEIGHT_'+padded,String(height));
  diagramAssets.push({id:diagram.id,svg:asset.svg,svgSha256:asset.svg_sha256,alt:asset.alt,width,height});
 }
 if(/DIAGRAM_(?:ALT|WIDTH|HEIGHT)_/.test(htmlOut))throw Error('Unresolved diagram placeholders');
 fs.writeFileSync(path.join(output,'six-elements-one-comparison.html'),htmlOut);
}else fs.writeFileSync(path.join(output,'six-elements-one-comparison.unresolved-diagrams.html'),htmlOut);
fs.writeFileSync(path.join(output,'six-elements-one-comparison-web-source.tex'),flattened);
fs.writeFileSync(path.join(output,'equation-inventory.json'),JSON.stringify(equations,null,2)+'\n');
fs.writeFileSync(path.join(output,'paragraph-inventory.json'),JSON.stringify(paragraphs,null,2)+'\n');
const inventory={sourceSha256:sourceHash,sourceFiles,headerMetadata,mathjaxVersion:require('mathjax-full/package.json').version,headings,equationCount:equations.length,displayCount:equations.filter(e=>e.display).length,paragraphs:paragraphs.length,callouts,tables,labels:Object.fromEntries(labels),seenLabels,references,externalLinks:[...new Set(externalLinks)],externalLinkOccurrences:externalLinks.length,exercises,answers,diagrams,diagramAssets,unresolvedDiagramAssets:diagramAssets.length!==4};
fs.writeFileSync(path.join(output,'conversion-inventory.json'),JSON.stringify(inventory,null,2)+'\n');
console.log(JSON.stringify({sourceFiles:sourceFiles.length,headings:headings.length,math:equations.length,displays:inventory.displayCount,diagrams:diagrams.length,tables:tables.length,exercises:exercises.length,answers:answers.length,labels:seenLabels.length,paragraphs:paragraphs.length,callouts:callouts.length,externalLinks:inventory.externalLinks.length,sourceSha256:sourceHash,output},null,2));
