export function renderResearchPages({save,heading,esc,papers,selection,selectedPapers}) {
  const sections=[{id:'featured',title:'Selected preprints',label:'Selected preprints',description:'Group theory and additive combinatorics.',papers:selectedPapers},...selection.paperSections.map(section=>({
    ...section,papers:section.papers.map(id=>{
      const paper=papers.find(p=>p.id===id);
      if(!paper||paper.status!==section.status)throw new Error(`Research section needs review: ${section.id} / ${id}`);
      return paper;
    })
  }))];
  const ids=sections.flatMap(section=>section.papers.map(p=>p.id));
  if(ids.length!==papers.length||new Set(ids).size!==papers.length)throw new Error('Research sections must include each paper exactly once');
  const paperHTML=p=>`<article class="paper" id="arxiv-${p.id}"><div class="paper-year">${p.year}</div><div><p class="meta">${p.status}${p.topic?' · '+esc(p.topic):''}</p><h3><a href="${p.doi?'https://doi.org/'+p.doi:'https://arxiv.org/abs/'+p.id}">${esc(p.title)}</a></h3>${p.authors!=='Henry Shin'?`<p class="authors">${esc(p.authors)}</p>`:''}${p.journal?`<p><em>${esc(p.journal)}</em></p>`:''}<p>${esc(p.description)}</p><div class="text-links">${p.doi?`<a href="https://doi.org/${p.doi}">Journal article</a>`:''}<a href="https://arxiv.org/abs/${p.id}">arXiv:${p.id}</a><a href="https://arxiv.org/pdf/${p.id}">PDF</a>${p.oeis?`<a href="https://oeis.org/${esc(p.oeis)}">OEIS ${esc(p.oeis)}</a>`:''}</div>${p.correction?`<div class="correction"><a href="https://arxiv.org/abs/${p.correction}">Correction to this article</a><br><span class="muted">Bennett Chow, Michael H. Freedman, Henry Shin, Yongjia Zhang. Correction preprint, 2025; revised 2026.</span></div>`:''}</div></article>`;
  save('/papers.html','Research archive','Papers and preprints from Henry Shin’s earlier research in algebra, combinatorics, geometry, and analysis, with publication details and corrections.','',
    heading('Papers &amp; preprints','Research archive','These papers grew out of earlier lines of research in algebra, combinatorics, geometry, and analysis. My present inquiry centers on <a href="/about.html#current-direction">motivic mathematics</a>, pursued through study, calculation, and exposition.')+
    `<nav class="collection-nav" aria-label="Research sections">${sections.map(s=>`<a href="#${s.id}">${esc(s.label)}</a>`).join('')}</nav>`+
    sections.map(s=>`<section class="paper-section" id="${s.id}"><h2>${esc(s.title)}</h2><p class="collection-description">${esc(s.description)}</p>${s.papers.map(paperHTML).join('')}</section>`).join(''));
}
