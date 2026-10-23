import {readFileSync, mkdirSync, copyFileSync} from 'node:fs';

export function renderAuditPages({save, esc}) {
  mkdirSync('dist/audits',{recursive:true});
  for (const format of ['json','md']) copyFileSync(`content/audits/quotients-and-reconstruction-audit.${format}`,`dist/audits/quotients-and-reconstruction-audit.${format}`);
  const body=readFileSync('content/audits/quotients-and-reconstruction-audit.html','utf8');
  if (/<(?:html|head|body|main|script)\b/i.test(body)) throw Error('Proof notes must be a script-free article fragment');
  const sections=[...body.matchAll(/<h2 id="([^"]+)">([^<]+)<\/h2>/g)];
  const contents=`<ol>${sections.map(([,id,title])=>`<li><a href="#${esc(id)}">${esc(title)}</a></li>`).join('')}</ol>`;
  save('/notes/quotients-and-reconstruction-audit.html',
    'Notes on proofs, dependencies, and revisions',
    'Supplementary notes on quotient comparisons, proof dependencies, and revisions to Quotients, Refinement, and Reconstruction.',
    'Expositions',
    `<header class="page-heading exposition-heading"><p class="eyebrow"><a href="/notes/quotients-and-reconstruction.html">Quotients, Refinement, and Reconstruction</a> / Notes</p><h1>Notes on proofs, dependencies, and revisions</h1><p class="exposition-subtitle">Quotients, Refinement, and Reconstruction</p><p class="byline">Henry Shin · October 2026</p><div class="text-links"><a href="/notes/quotients-and-reconstruction.html">Read the exposition</a><a href="/pdfs/algebra/Quotients_Refinement_and_Reconstruction.pdf">Exposition PDF</a></div></header>
    <div class="exposition-layout"><aside class="exposition-sidebar"><nav aria-label="Proof notes contents"><h2>In these notes</h2>${contents}</nav><a class="back-link" href="/notes/quotients-and-reconstruction.html">Back to the exposition</a></aside><div class="exposition-main"><details class="exposition-mobile-contents"><summary>In these notes</summary><nav aria-label="Proof notes contents on small screens">${contents}</nav></details><article class="exposition-reader proof-notes" aria-label="Notes on proofs, dependencies, and revisions">${body}</article><footer class="exposition-end"><p><a href="/notes/quotients-and-reconstruction.html">Return to the exposition</a> · <a href="/expositions.html">All expositions</a></p></footer></div></div>`);
}
