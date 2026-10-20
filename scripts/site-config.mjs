import {readFileSync} from 'node:fs';

const site=JSON.parse(readFileSync('content/site.json','utf8'));
const url=new URL(site.origin);
if(url.protocol!=='https:'||url.origin!==site.origin||url.username||url.password)throw new Error('Site origin must be an HTTPS origin without a trailing slash, path, or credentials');
if(typeof site.indexable!=='boolean')throw new Error('Site indexable must be a boolean');
if(typeof site.analyticsEnabled!=='boolean')throw new Error('Site analyticsEnabled must be a boolean');

export const origin=site.origin;
export const indexable=site.indexable&&!process.argv.includes('--preview');
export const analyticsEnabled=site.analyticsEnabled&&indexable;
export const pageRobots=route=>indexable&&route!=='/404.html'?'index,follow':indexable?'noindex,follow':'noindex,nofollow';
export const redirectRobots=indexable?'noindex,follow':'noindex,nofollow';
export const robotsText=indexable?`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n';
