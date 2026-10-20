import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.pdf':'application/pdf','.json':'application/json','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.tex':'text/plain; charset=utf-8','.lean':'text/plain; charset=utf-8','.toml':'text/plain; charset=utf-8','.md':'text/plain; charset=utf-8'};
http.createServer(async(req,res)=>{
  try {
    const url=new URL(req.url,'http://localhost');
    const decoded=decodeURIComponent(url.pathname);
    let file=path.resolve(root,'.'+decoded);
    if(file!==root&&!file.startsWith(root+path.sep)){
      res.writeHead(403);
      return res.end('Forbidden');
    }
    if((await stat(file)).isDirectory())file=path.join(file,'index.html');
    const body=await readFile(file);
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(body);
  } catch(error) {
    if(error instanceof URIError){
      res.writeHead(400,{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-store'});
      return res.end('Invalid address');
    }
    try {
      const body=await readFile(path.join(root,'404.html'));
      res.writeHead(404,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});
      res.end(body);
    } catch {
      res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-store'});
      res.end('Not found');
    }
  }
}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173/'));
