import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
// Use the project's own packages where installed. Environment overrides allow
// retained edition sources to be reproduced on another machine without edits.
let require=createRequire(import.meta.url);
try { require.resolve('mathjax-full/package.json'); }
catch (error) {
  if(!process.env.TENSORGAMI_MATHJAX_ROOT) throw new Error('Install mathjax-full locally or set TENSORGAMI_MATHJAX_ROOT to a package directory.', {cause:error});
  require=createRequire(pathToFileURL(path.join(process.env.TENSORGAMI_MATHJAX_ROOT,'_loader.cjs')));
}
let markedModule=process.env.TENSORGAMI_MARKED_MODULE;
if(!markedModule) markedModule=require.resolve('marked');
const {marked}=await import(pathToFileURL(markedModule));
const {mathjax}=require('mathjax-full/js/mathjax.js');
const {TeX}=require('mathjax-full/js/input/tex.js');
const {SVG}=require('mathjax-full/js/output/svg.js');
const {liteAdaptor}=require('mathjax-full/js/adaptors/liteAdaptor.js');
const {RegisterHTMLHandler}=require('mathjax-full/js/handlers/html.js');
const {AllPackages}=require('mathjax-full/js/input/tex/AllPackages.js');
const [input,output,report]=process.argv.slice(2);
if(!input||!output||!report)throw Error('Usage: node render-article.mjs manuscript.md article.html compiled.json');
const source=fs.readFileSync(input,'utf8').replaceAll('\r\n','\n');
const sourceHash=crypto.createHash('sha256').update(source).digest('hex');
const title=source.match(/^# (.+)$/m)?.[1];
if(!title)throw Error('Missing manuscript title');
let body=source.replace(/^# .+\n+/,'');
const bylineOpening=body.match(/^([^\n]+)\n+Henry Shin\n+/);
const subtitle=bylineOpening?bylineOpening[1].replace(/^\*|\*$/g,''):(body.match(/^\*([^\n]+)\*\n/)?.[1]||'');
if(bylineOpening)body=body.slice(bylineOpening[0].length);
else if(subtitle)body=body.replace(/^\*[^\n]+\*\n+/,'');
const definitions=new Map();
body=body.replace(/^\[\^([a-z0-9-]+)\]:[ \t]*(.*(?:\n(?:[ \t]{2,}[^\n]*|(?=\n\s{2,})\n))*)/gm,(_m,key,text)=>{if(definitions.has(key))throw Error('Duplicate note '+key);definitions.set(key,text.replace(/\n\s+/g,' ').trim());return '';});
body=body.replace(/^## (?:\d+[ .·-]*)?Notes and sources(?: \{#notes-and-sources\})?\s*$/m,'').trim();
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const adaptor=liteAdaptor();RegisterHTMLHandler(adaptor);
const doc=mathjax.document('',{InputJax:new TeX({packages:AllPackages}),OutputJax:new SVG({fontCache:'local'})});
const equations=[];
function math(text){return text.replace(/\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g,(_m,display,inline)=>{
 const tex=(display??inline).trim(),isDisplay=display!==undefined,index=equations.length;
 let svg=adaptor.outerHTML(doc.convert(tex,{display:isDisplay}));
 if(/data-mjx-error|data-mml-node="merror"|<merror/.test(svg))throw Error('Invalid TeX: '+tex);
 svg=svg.replaceAll('MJX-','FORMAL-LOG-MJX-');
 const tag=isDisplay?'div':'span';
 equations.push({tex,display:isDisplay,html:`<${tag} class="math-${isDisplay?'display':'inline'}" role="img" aria-label="${esc(tex)}" data-tex="${esc(tex)}"${isDisplay?' tabindex="0"':''}>${svg}</${tag}>`});
 return `<${tag} data-equation="${index}"></${tag}>`;
});}
const restore=html=>html.replace(/<(?:span|div) data-equation="(\d+)"><\/(?:span|div)>(-[A-Za-z]+)?/g,(_m,id,suffix)=>suffix&&!equations[+id].display?`<span class="math-word">${equations[+id].html}${suffix}</span>`:equations[+id].html+(suffix||''));
const uses=new Map(),noteOrder=[],sections=[];
let prepared=math(body).replace(/\[\^([a-z0-9-]+)\]/g,(_m,key)=>{
 if(!definitions.has(key))throw Error('Undefined note '+key);
 if(!uses.has(key)){uses.set(key,[]);noteOrder.push(key);}
 const list=uses.get(key),id=`citation-${key}-${list.length+1}`,number=noteOrder.indexOf(key)+1;list.push(id);
 return `<sup id="${id}"><a href="#note-${key}" role="doc-noteref" aria-label="Note ${number}">${number}</a></sup>`;
});
prepared=prepared.replace(/^(#{2,4}) (.+?) \{#([a-z0-9:-]+)\}\s*$/gm,(_m,hash,heading,id)=>{
 const level=hash.length,plain=heading.replace(/^\d+(?:\.\d+)*[ .·-]+/,'');
 const label=level===2?`${sections.filter(s=>s.level===2).length+1} · ${plain}`:plain;
 sections.push({id,title:plain,level});return `<h${level} id="${id}">${esc(label)}</h${level}>`;
});
let html=`<!-- source-sha256:${sourceHash} -->\n`+restore(marked.parse(prepared,{gfm:true})).replace(/<table>([\s\S]*?)<\/table>/g,'<div class="table-scroll formal-logarithm-table" role="region" aria-label="Successive lifting obstructions" tabindex="0"><table>$1</table></div>');
if(noteOrder.length){
 html+='<section class="sources" role="doc-endnotes"><h2 id="notes-and-sources">Notes and sources</h2><ol>';
 for(const key of noteOrder){const back=uses.get(key).map((id,i)=>`<a href="#${id}" role="doc-backlink" aria-label="Return to citation ${i+1}">↩</a>`).join(' ');html+=`<li id="note-${key}">${restore(marked.parseInline(math(definitions.get(key))))} <span class="backlinks">${back}</span></li>`;}
 html+='</ol></section>\n';
}
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
const duplicates=ids.filter((x,i)=>ids.indexOf(x)!==i);
const missing=[...html.matchAll(/href="#([^"]+)"/g)].map(m=>m[1]).filter(x=>!ids.includes(x));
if(duplicates.length||missing.length||/data-equation=|\[\^|\{#[^}]+\}/.test(html))throw Error(JSON.stringify({duplicates,missing,unresolvedMarkup:true}));
if(/<h[234](?:>|\s(?![^>]*\bid=))/.test(html))throw Error('Every heading must have an explicit {#anchor}');
for(const file of [output,report])fs.mkdirSync(path.dirname(path.resolve(file)),{recursive:true});
fs.writeFileSync(output,html);
const result={title,subtitle,source:input,source_sha256:sourceHash,article_sha256:crypto.createHash('sha256').update(html).digest('hex'),sections,notes:noteOrder,unused_notes:[...definitions.keys()].filter(k=>!uses.has(k)),equation_count:equations.length,display_count:equations.filter(e=>e.display).length,reference_uses:[...uses.values()].reduce((a,x)=>a+x.length,0),duplicate_ids:duplicates,missing_internal_anchors:missing,equations:equations.map(({tex,display})=>({tex,display}))};
fs.writeFileSync(report,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({title,sections:sections.length,math:result.equation_count,displays:result.display_count,notes:noteOrder.length,unused_notes:result.unused_notes,bytes:Buffer.byteLength(html)}));
