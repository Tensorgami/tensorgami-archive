import {readFileSync} from 'node:fs';

export function renderArchivePage({save,heading,esc}){
  const {edition,works}=JSON.parse(readFileSync('content/archive-edition.json','utf8'));
  const release=`https://github.com/Tensorgami/tensorgami-archive/releases/tag/${edition}`;
  const download=`https://github.com/Tensorgami/tensorgami-archive/releases/download/${edition}/`;
  const group=(title,id,items)=>`<section id="${id}"><h2>${title}</h2><ul>${items.map(work=>`<li><a href="${esc(work.archive_url)}">${esc(work.title)}</a>${work.historical_edition?` <span class="muted">— ${esc(work.historical_edition)}</span>`:''}</li>`).join('')}</ul></section>`;
  save('/editions.html','Archived editions and citation','Dated archival editions, sources, and citation information for Tensorgami.','',
    heading('Publication record','Archived editions','Fixed editions of the writing, sources, and public website.')+
    `<div class="narrow prose"><section><h2>20 October 2026 · Edition ${esc(edition)}</h2><p>This edition preserves the public collection, including the essays, mathematical expositions, interactive examples, available editable sources, and retained earlier editions. The research records retain their original arXiv and journal links.</p><p><a href="${release}">View the dated release on GitHub</a> · <a href="https://github.com/Tensorgami/tensorgami-archive">Browse the source archive</a></p><ul><li><a href="${download}tensorgami-site-${edition}.zip">Complete website snapshot</a></li><li><a href="${download}tensorgami-source-${edition}.zip">Complete public source</a></li><li><a href="${download}WORKS.json">Individual-work catalogue and citations</a> · <a href="${download}SHA256SUMS.txt">File checksums</a></li></ul><p>GitHub records the release publication time and provides immutable release files. Dates of first publication and revision retained in individual works are distinct from the date of this archival edition.</p></section>`+
    `<section id="citation"><h2>Citing an edition</h2><p>For an individual work, cite Henry Shin, the work’s title, Tensorgami archival edition ${esc(edition)}, and the archived file linked below. Add a section or page number when referring to a particular argument. The current reading editions remain available through <a href="/expositions.html">Expositions</a> and <a href="/essays.html">Essays</a>.</p><p>For the whole collection: Henry Shin, <cite>Tensorgami: complete public corpus snapshot</cite>, archival edition ${esc(edition)}, <a href="${release}">GitHub release</a>.</p><p>Research papers retain their original authorship, publication status, and <a href="/papers.html">arXiv or journal citations</a>. The existing <a href="/license.html">reuse terms</a> apply to the archived material.</p></section>`+
    group('Essays','essays',works.filter(w=>w.kind==='essay'))+
    group('Mathematical expositions and problems','expositions',works.filter(w=>w.kind==='exposition'||w.kind==='problem-set'))+
    group('Earlier editions','earlier-editions',works.filter(w=>w.kind.startsWith('historical-')))+
    `</div>`);
}
