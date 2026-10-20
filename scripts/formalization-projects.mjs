import {readFileSync,readdirSync,mkdirSync,writeFileSync} from 'node:fs';
import {deflateRawSync} from 'node:zlib';
import path from 'node:path';

// Small deterministic ZIP archives keep the static site and its build dependency-free.
const crcTable=Array.from({length:256},(_,value)=>{
  for(let bit=0;bit<8;bit++)value=(value>>>1)^((value&1)?0xedb88320:0);
  return value>>>0;
});
function crc32(data){
  let value=0xffffffff;
  for(const byte of data)value=(value>>>8)^crcTable[(value^byte)&255];
  return (value^0xffffffff)>>>0;
}
function zip(entries){
  const bodies=[],directory=[];
  let offset=0;
  for(const [filename,data] of entries){
    const name=Buffer.from(filename),packed=deflateRawSync(data),crc=crc32(data);
    const local=Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50,0);local.writeUInt16LE(20,4);
    local.writeUInt16LE(0x800,6);local.writeUInt16LE(8,8);
    local.writeUInt16LE(33,12); // Fixed DOS date: 1980-01-01.
    local.writeUInt32LE(crc,14);local.writeUInt32LE(packed.length,18);
    local.writeUInt32LE(data.length,22);local.writeUInt16LE(name.length,26);
    const central=Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50,0);central.writeUInt16LE(20,4);
    central.writeUInt16LE(20,6);central.writeUInt16LE(0x800,8);
    central.writeUInt16LE(8,10);central.writeUInt16LE(33,14);
    central.writeUInt32LE(crc,16);central.writeUInt32LE(packed.length,20);
    central.writeUInt32LE(data.length,24);central.writeUInt16LE(name.length,28);
    central.writeUInt32LE(offset,42);
    bodies.push(local,name,packed);directory.push(central,name);
    offset+=local.length+name.length+packed.length;
  }
  const index=Buffer.concat(directory),end=Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50,0);end.writeUInt16LE(entries.length,8);
  end.writeUInt16LE(entries.length,10);end.writeUInt32LE(index.length,12);
  end.writeUInt32LE(offset,16);
  return Buffer.concat([...bodies,index,end]);
}
function projectFiles(root,relative=''){
  return readdirSync(path.join(root,relative),{withFileTypes:true}).sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0).flatMap(entry=>{
    if(entry.isSymbolicLink()||entry.name.startsWith('.'))throw Error(`Non-source project entry: ${entry.name}`);
    const name=path.posix.join(relative,entry.name);
    if(entry.isDirectory())return projectFiles(root,name);
    if(!entry.isFile()||!(/\.(lean|md|toml|json)$/.test(entry.name)||entry.name==='lean-toolchain'))throw Error(`Unexpected formalization file: ${name}`);
    return [name];
  });
}
const sourceBytes=file=>Buffer.from(readFileSync(file,'utf8').replaceAll('\r\n','\n'));

export function packageFormalizationProjects(notes){
  const projects=new Map(),overview=sourceBytes('public/formalizations/README.md');
  mkdirSync('dist/formalizations/packages',{recursive:true});
  for(const note of notes.filter(note=>note.source)){
    const match=note.source.match(/^\/formalizations\/([a-z0-9-]+)\/(.+\.lean)$/);
    if(!match)throw Error(`Invalid formalization source: ${note.source}`);
    const [,id,entrypoint]=match,root=path.join('public/formalizations',id),files=projectFiles(root);
    for(const required of [entrypoint,'README.md','lean-toolchain','lake-manifest.json','lakefile.toml']){
      if(!files.includes(required))throw Error(`Incomplete Lean project ${id}: ${required}`);
    }
    const archive=`/formalizations/packages/${id}.zip`;
    writeFileSync(path.join('dist',archive),zip([
      ...files.map(file=>[`${id}/${file}`,sourceBytes(path.join(root,file))]),
      [`${id}/FORMALIZATIONS.md`,overview]
    ]));
    projects.set(note.slug,{id,archive,readme:`/formalizations/${id}/README.md`});
  }
  return projects;
}
