import {readFileSync,readdirSync,statSync,writeFileSync} from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
const walk=directory=>readdirSync(directory).flatMap(name=>{
  const file=path.join(directory,name);
  return statSync(file).isDirectory()?walk(file):[file];
});
const files=walk(root);
const pages=files.filter(file=>file.endsWith('.html')).flatMap(file=>{
  const html=readFileSync(file,'utf8');
  if(/http-equiv="refresh"|name="robots" content="noindex/.test(html))return [];
  const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  return canonical?[new URL(canonical).pathname]:[];
});
const pdfs=files.filter(file=>/\.pdf$/i.test(file)).map(file=>'/'+path.relative(root,file).split(path.sep).join('/'));
const manifest=JSON.stringify({pages:[...new Set(pages)].sort(),pdfs:[...new Set(pdfs)].sort()},null,2)+'\n';
if(process.argv[2])writeFileSync(process.argv[2],manifest);else process.stdout.write(manifest);
