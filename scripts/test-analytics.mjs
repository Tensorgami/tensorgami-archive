import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const analytics=readFileSync('assets/analytics.js','utf8');
const controls=readFileSync('assets/privacy-controls.js','utf8');
const optOutKey='tensorgami_analytics_optout';
function storage(values=new Map(),blocked=false){return {
  getItem:key=>{if(blocked)throw new Error('Storage blocked');return values.get(key)??null;},
  setItem:(key,value)=>{if(blocked)throw new Error('Storage blocked');values.set(key,String(value));},
  removeItem:key=>{if(blocked)throw new Error('Storage blocked');values.delete(key);},
  values
};}
function eventTarget(){const handlers=new Map();return {
  addEventListener(name,callback){if(!handlers.has(name))handlers.set(name,[]);handlers.get(name).push(callback);},
  dispatchEvent(event){for(const callback of handlers.get(event.type)||[])callback(event);},
  emit(type,detail={}){this.dispatchEvent({type,...detail});}
};}
function browser(options={}){
  const requests=[],timers=[];
  const location=new URL(options.url||'https://tensorgami.com/papers.html?not-sent=1#not-sent');
  const window=eventTarget();
  const elements={
    'analytics-preference-status':{textContent:''},
    'analytics-opt-out':{...eventTarget(),disabled:false},
    'analytics-opt-in':{...eventTarget(),disabled:false}
  };
  const preference={dataset:{analyticsEnabled:options.enabled===false?'false':'true'},hidden:true};
  const document={...eventTarget(),visibilityState:options.visibility||'visible',referrer:'https://example.org/private?secret=1#fragment',
    currentScript:{getAttribute:()=>options.marker===false?null:'v1'},
    querySelector(selector){
      if(selector==='meta[name="robots"]')return {content:options.robots||'index,follow'};
      if(selector==='link[rel="canonical"]')return options.canonical===null?null:{href:options.canonical||'https://tensorgami.com/papers.html'};
      if(selector==='[data-tensorgami-privacy]')return preference;
      return null;
    },
    getElementById:id=>elements[id]
  };
  const navigator={...options.navigator};
  const localStorage=options.localStorage||storage();
  const sessionStorage=options.sessionStorage||storage();
  let now=1700000000000,uuid=0;
  class Clock extends Date { static now(){return now;} }
  const context=vm.createContext({window,document,navigator,localStorage,sessionStorage,location,URL,Date:Clock,
    crypto:{randomUUID:()=>`00000000-0000-4000-8000-${String(++uuid).padStart(12,'0')}`},
    CustomEvent:class {constructor(type){this.type=type;}},
    fetch:async (url,init)=>{requests.push({url,...init,payload:JSON.parse(init.body)});return options.fetch?options.fetch(requests.length):{status:204};},
    setTimeout:callback=>timers.push(callback)
  });
  return {context,window,document,navigator,localStorage,sessionStorage,requests,timers,elements,preference,
    run:()=>vm.runInContext(analytics,context),runControls:()=>vm.runInContext(controls,context),
    advance:ms=>{now+=ms;},
    async flush(){await Promise.resolve();await Promise.resolve();},
    async retry(){await this.flush();for(const callback of timers.splice(0))callback();await this.flush();},
    click(href,other={}){document.emit(other.type||'click',{button:0,defaultPrevented:false,target:{closest:()=>({href})},...other});}
  };
}

test('direct exclusion link prevents even the initial privacy-page count',async()=>{
  const b=browser({url:'https://tensorgami.com/privacy.html#exclude',canonical:'https://tensorgami.com/privacy.html'});
  b.runControls(); b.run(); await b.flush();
  assert.equal(b.localStorage.getItem(optOutKey),'1');
  assert.equal(b.requests.length,0);
  assert.match(b.elements['analytics-preference-status'].textContent,/excluded/);
});

test('one canonical page event, minimized referrer, no credentials or navigation blocking',async()=>{
  const b=browser();b.run();b.run();await b.flush();
  assert.equal(b.requests.length,1);
  const request=b.requests[0];
  assert.deepEqual(request.payload,{id:'00000000-0000-4000-8000-000000000001',type:'pageview',host:'tensorgami.com',path:'/papers.html',referrer:'https://example.org'});
  assert.equal(request.url,'https://dry-term-82db.hkshin.workers.dev/track');
  assert.equal(request.keepalive,true);assert.equal(request.credentials,'omit');assert.equal(request.referrerPolicy,'no-referrer');
  assert.equal(b.localStorage.values.size,0,'no browser visitor identifier is written');
  assert.deepEqual([...b.sessionStorage.values.values()],['1700000000000']);
});

test('production host, indexing, consent and automation exclusions',async()=>{
  for(const options of [
    {url:'http://tensorgami.com/papers.html'}, {url:'http://127.0.0.1:4173/papers.html'},
    {url:'https://tensorgami-henry-shin.tensorgami.chatgpt.site/papers.html'},
    {robots:'noindex,follow'}, {marker:false}, {canonical:null},
    {canonical:'https://other.test/papers.html'}, {canonical:'https://tensorgami.com/404.html'},
    {navigator:{webdriver:true}}, {navigator:{doNotTrack:'1'}}, {navigator:{doNotTrack:'yes'}},
    {navigator:{msDoNotTrack:'1'}}, {navigator:{globalPrivacyControl:true}},
    {localStorage:storage(new Map([[optOutKey,'1']]))}, {localStorage:storage(new Map(),true)}
  ]){
    const b=browser(options);b.run();b.click('https://tensorgami.com/pdfs/paper.pdf');await b.flush();
    assert.equal(b.requests.length,0,JSON.stringify(options));
  }
  const www=browser({url:'https://www.tensorgami.com/papers?query=1'});www.run();
  assert.equal(www.requests[0].payload.host,'www.tensorgami.com');
  assert.equal(www.requests[0].payload.path,'/papers.html');
  const windowDnt=browser();windowDnt.window.doNotTrack='1';windowDnt.run();assert.equal(windowDnt.requests.length,0);
});

test('hidden tabs count only their first visible visit',()=>{
  const b=browser({visibility:'hidden'});b.run();assert.equal(b.requests.length,0);
  b.document.visibilityState='visible';b.document.emit('visibilitychange');assert.equal(b.requests.length,1);
  b.advance(60000);b.document.visibilityState='hidden';b.document.emit('visibilitychange');
  b.document.visibilityState='visible';b.document.emit('visibilitychange');assert.equal(b.requests.length,1);
});

test('refresh deduplication is per path and expires after thirty seconds',()=>{
  const sessionStorage=storage();
  const first=browser({sessionStorage});first.run();assert.equal(first.requests.length,1);
  const refresh=browser({sessionStorage});refresh.run();assert.equal(refresh.requests.length,0);
  const different=browser({sessionStorage,canonical:'https://tensorgami.com/about.html'});different.run();assert.equal(different.requests.length,1);
  const later=browser({sessionStorage});later.advance(30000);later.run();assert.equal(later.requests.length,1);
});

test('PDF events count same-origin link activation, not unrelated or canceled clicks',()=>{
  const b=browser();b.run();
  b.click('https://arxiv.org/pdf/2608.08533');
  b.click('/about.html');
  b.click('/pdfs/canceled.pdf',{defaultPrevented:true});
  b.click('/pdfs/right-click.pdf',{button:2,type:'auxclick'});
  assert.equal(b.requests.length,1);
  b.click('/pdfs/paper.pdf?not-stored=1#page=2');
  assert.equal(b.requests.length,2);assert.equal(b.requests[1].payload.type,'pdf_click');assert.equal(b.requests[1].payload.path,'/pdfs/paper.pdf');
  b.click('/pdfs/paper.pdf');assert.equal(b.requests.length,2);
  b.click('/pdfs/middle.pdf',{button:1,type:'auxclick'});assert.equal(b.requests.length,3);
});

test('network and server failures retry once with the identical event ID and body',async()=>{
  for(const failure of ['network','server']){
    const b=browser({fetch:()=>{if(failure==='network')throw new Error('network');return {status:503};}});
    b.run();await b.retry();await b.retry();
    assert.equal(b.requests.length,2);assert.equal(b.requests[0].body,b.requests[1].body);
  }
  for(const status of [200,204,400,403,429]){
    const b=browser({fetch:()=>({status})});b.run();await b.retry();assert.equal(b.requests.length,1,`${status} must not retry`);
  }
});

test('opting out cancels a queued retry and all later PDF collection',async()=>{
  const b=browser({fetch:()=>({status:503})});b.run();await b.flush();
  b.runControls();b.elements['analytics-opt-out'].emit('click');await b.retry();
  b.click('/pdfs/paper.pdf');
  assert.equal(b.requests.length,1);assert.equal(b.localStorage.getItem(optOutKey),'1');
  assert.match(b.elements['analytics-preference-status'].textContent,/excluded/);
});

test('preference controls persist exclusion before activation and re-enable an eligible page',()=>{
  const b=browser({enabled:false});b.runControls();
  assert.equal(b.preference.hidden,false);assert.match(b.elements['analytics-preference-status'].textContent,/currently disabled/);
  b.elements['analytics-opt-out'].emit('click');b.run();assert.equal(b.requests.length,0);
  b.elements['analytics-opt-in'].emit('click');assert.equal(b.localStorage.getItem(optOutKey),null);assert.equal(b.requests.length,1);
  const gpc=browser({navigator:{globalPrivacyControl:true}});gpc.runControls();gpc.run();
  gpc.elements['analytics-opt-in'].emit('click');assert.equal(gpc.requests.length,0);
  assert.match(gpc.elements['analytics-preference-status'].textContent,/privacy signal/);
  const unavailable=browser({localStorage:storage(new Map(),true)});unavailable.runControls();unavailable.run();
  unavailable.elements['analytics-opt-in'].emit('click');assert.equal(unavailable.requests.length,0);
  assert.match(unavailable.elements['analytics-preference-status'].textContent,/cannot be saved/);
});
