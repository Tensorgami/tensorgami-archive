import {readFileSync} from 'node:fs';

const arxivId=p=>p.arxiv||(/^\d{4}\.\d{4,5}$/.test(p.id)?p.id:null);
const primaryUrl=p=>p.page||p.repositoryUrl||(p.doi?'https://doi.org/'+p.doi:'https://arxiv.org/abs/'+arxivId(p));

export function paperLinks(p,esc,{about=true,allVersions=false}={}) {
  const arxiv=arxivId(p),links=[];
  if(about&&p.page)links.push(`<a href="${esc(p.page)}">About the paper</a>`);
  if(p.repositoryUrl) {
    if(p.pdf)links.push(`<a href="${esc(p.pdf)}" aria-label="PDF${p.pageCount?`, ${p.pageCount} pages`:''}: ${esc(p.title)}">PDF${p.pageCount?` · ${p.pageCount} pages`:''}</a>`);
    links.push(`<a href="${esc(p.repositoryUrl)}">${esc(p.repositoryLabel||'Repository')}</a>`);
  } else {
    if(p.doi)links.push(`<a href="https://doi.org/${esc(p.doi)}">${esc(p.doiLabel||'Journal article')}</a>`);
    if(arxiv)links.push(`<a href="https://arxiv.org/abs/${esc(arxiv)}">arXiv:${esc(arxiv)}</a>`);
    if(p.pdf||arxiv)links.push(`<a href="${esc(p.pdf||'https://arxiv.org/pdf/'+arxiv)}">PDF</a>`);
  }
  if(allVersions&&p.allVersionsUrl)links.push(`<a href="${esc(p.allVersionsUrl)}">All versions</a>`);
  if(p.oeis)links.push(`<a href="https://oeis.org/${esc(p.oeis)}">OEIS ${esc(p.oeis)}</a>`);
  return `<div class="text-links">${links.join('')}</div>`;
}

export function currentResearchFeature(papers,esc) {
  if(!papers.length)return '';
  return `<section class="home-current-research" aria-labelledby="current-research-title"><div class="section-head"><h2 id="current-research-title">Current research</h2><a href="/papers.html">Research papers</a></div>${papers.map(p=>`<article class="research-feature"><p class="meta">${esc(p.status)} · Representation theory · October ${p.year}</p><h3><a href="${esc(p.page)}">${esc(p.title)}</a></h3><p>${esc(p.description)}</p>${paperLinks(p,esc)}</article>`).join('')}</section>`;
}

export function renderResearchPages({save,heading,esc,papers,selection,selectedPapers}) {
  const current=(selection.currentResearch||[]).map(id=>{
    const paper=papers.find(p=>p.id===id);
    if(!paper||paper.status!=='Preprint'||!paper.page)throw Error(`Current research needs review: ${id}`);
    return paper;
  });
  const earlier=[{id:'featured',title:'Selected preprints',label:'Selected preprints',description:'Group theory and additive combinatorics.',papers:selectedPapers},...selection.paperSections.map(section=>({
    ...section,papers:section.papers.map(id=>{
      const paper=papers.find(p=>p.id===id);
      if(!paper||paper.status!==section.status)throw new Error(`Research section needs review: ${section.id} / ${id}`);
      return paper;
    })
  }))];
  const sections=[...(current.length?[{id:'current-research',title:'Current research',label:'Current research',description:'Representation spheres, cohomology, and tensor-triangular geometry.',papers:current}]:[]),...earlier];
  const ids=sections.flatMap(section=>section.papers.map(p=>p.id));
  if(ids.length!==papers.length||new Set(ids).size!==papers.length)throw new Error('Research sections must include each paper exactly once');
  const paperHTML=p=>`<article class="paper" id="${esc(p.anchor||'arxiv-'+p.id)}"><div class="paper-year">${p.year}</div><div><p class="meta">${esc(p.status)}${p.topic?' · '+esc(p.topic):''}</p><h3><a href="${esc(primaryUrl(p))}">${esc(p.title)}</a></h3>${p.authors!=='Henry Shin'?`<p class="authors">${esc(p.authors)}</p>`:''}${p.journal?`<p><em>${esc(p.journal)}</em></p>`:''}<p>${esc(p.description)}</p>${paperLinks(p,esc)}${p.correction?`<div class="correction"><a href="https://arxiv.org/abs/${esc(p.correction)}">Correction to this article</a><br><span class="muted">Bennett Chow, Michael H. Freedman, Henry Shin, Yongjia Zhang. Correction preprint, 2025; revised 2026.</span></div>`:''}</div></article>`;
  const sectionHTML=s=>`<section class="paper-section" id="${s.id}"><h2>${esc(s.title)}</h2><p class="collection-description">${esc(s.description)}</p>${s.papers.map(paperHTML).join('')}</section>`;
  const description='Current research and earlier papers in representation theory, algebra, combinatorics, geometry, and analysis, with versions, publication details, and corrections.';
  save('/papers.html','Research papers',description,'',
    heading('Papers &amp; preprints','Research papers',description)+
    `<nav class="collection-nav" aria-label="Research sections">${sections.map(s=>`<a href="#${s.id}">${esc(s.label)}</a>`).join('')}</nav>`+
    sections.filter(s=>s.id==='current-research').map(sectionHTML).join('')+
    `<div id="earlier-research">${earlier.map(sectionHTML).join('')}</div>`);
  for(const p of current) {
    const body=readFileSync(p.body,'utf8');
    if(/<(?:html|head|body|main|script)\b/i.test(body))throw Error(`Invalid research body: ${p.id}`);
    const date=new Date(p.versionDate+'T12:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
    save(p.page,p.title,p.description,'',`<article class="research-reading"><header class="page-heading research-heading"><p class="eyebrow"><a href="/papers.html#current-research">Research</a> / Preprint</p><h1>${esc(p.title)}</h1><p class="research-byline">${esc(p.authors)} · Version ${esc(p.version)}, <time datetime="${esc(p.versionDate)}">${date}</time></p>${paperLinks(p,esc,{about:false,allVersions:true})}</header><div class="prose research-body">${body}<section aria-labelledby="citation"><h2 id="citation">Citation</h2><p>${esc(p.authors)}, <em>${esc(p.title)}</em>, version ${esc(p.version)}, Zenodo, ${date}. <a href="${esc(p.repositoryUrl)}">doi:${esc(p.doi)}</a>.</p></section><p class="back-link"><a href="/papers.html">Research papers</a> · <a href="/mechanisms.html#current-research">Reading paths into the paper</a></p></div></article>`);
  }
}
