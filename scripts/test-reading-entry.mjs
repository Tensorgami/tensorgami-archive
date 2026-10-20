import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const source=readFileSync(new URL('../assets/reading-entry.js',import.meta.url),'utf8');
const fragment='#a-reconstruction-example';
function page(hash=''){
  const disclosure={open:false};
  const scrolls=[];
  const summary={id:fragment.slice(1),closest:()=>disclosure,scrollIntoView:options=>scrolls.push({open:disclosure.open,...options})};
  const listeners={};
  const window={location:new URL(`https://tensorgami.com/${hash}`),addEventListener:(type,fn)=>listeners[type]=fn};
  const document={getElementById:()=>summary,addEventListener:(type,fn)=>listeners[type]=fn};
  runInNewContext(source,{window,document,URL});
  return {disclosure,scrolls,window,hashchange:hash=>{window.location.hash=hash;listeners.hashchange();},click:(href,options={})=>{
    const link={href,target:'',hasAttribute:()=>false,...options.link};
    listeners.click({button:0,target:{closest:()=>link},...options.event});
  }};
}

test('ordinary visits leave the disclosure closed and do not scroll',()=>{
  for(const hash of ['', '#unrelated', '#%invalid']){
    const p=page(hash);assert.equal(p.disclosure.open,false);assert.equal(p.scrolls.length,0);
  }
});
test('direct and encoded fragment arrivals open before scrolling',()=>{
  for(const hash of [fragment,'#%61-reconstruction-example']){
    const p=page(hash);assert.equal(p.disclosure.open,true);assert.equal(p.scrolls.length,1);assert.equal(p.scrolls[0].open,true);
  }
});
test('hash navigation reveals the example and manual closing remains possible',()=>{
  const p=page();p.hashchange(fragment);assert.equal(p.disclosure.open,true);
  p.disclosure.open=false;p.hashchange('#unrelated');assert.equal(p.disclosure.open,false);
});
test('following the same fragment again reopens a manually closed example',()=>{
  const p=page(fragment);p.disclosure.open=false;p.click(fragment);
  assert.equal(p.disclosure.open,true);assert.equal(p.scrolls.length,2);
});
test('unrelated destinations, new tabs, downloads and modified clicks do not reveal',()=>{
  const scenarios=[
    ['https://example.com/'+fragment,{}],['/mechanisms.html'+fragment,{}],['/?other=1'+fragment,{}],['#unrelated',{}],
    [fragment,{event:{defaultPrevented:true}}],[fragment,{event:{button:1}}],
    ...['ctrlKey','metaKey','shiftKey','altKey'].map(key=>[fragment,{event:{[key]:true}}]),
    [fragment,{link:{target:'_blank'}}],[fragment,{link:{hasAttribute:()=>true}}]
  ];
  for(const [href,options] of scenarios){const p=page();p.click(href,options);assert.equal(p.disclosure.open,false,href);assert.equal(p.scrolls.length,0);}
});
test('a page without the disclosure remains inert',()=>{
  assert.doesNotThrow(()=>runInNewContext(source,{document:{getElementById:()=>null}}));
});
