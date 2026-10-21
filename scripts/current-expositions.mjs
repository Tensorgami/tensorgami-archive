const homeEntries = {
  'fourier-symmetry-and-reconstruction': {
    topic:'Polynomials · Symmetry',
    subtitle:'From roots and radicals to geometric reconstruction',
    summary:'Character projectors separate a polynomial’s root coordinates. Multiplication shows how the pieces fit together, producing compatible cubic and quartic radicals. Later sections follow reconstruction into geometry and arithmetic.',
    anchor:'sec:reconstruction', label:'Start with polynomial roots (§1)',
    background:'The labelled-root calculations in §§3–5 use linear algebra, polynomial rings, finite group actions and basic Galois theory. Stop after the cubic; return to §2 for the cover construction.'
  },
  'what-a-boundary-map-can-prove': {
    topic:'Graphs · Linear algebra',
    subtitle:'From cycles and tree counts to gluing and motives',
    summary:'A graph’s boundary map detects cycles. Laplacian calculations count spanning trees and measure resistance. Later sections retain lattices, torsion, Hodge structure and attachment data.',
    anchor:'the-starting-complex', label:'Start with the tree criterion (§1)',
    background:'Start with §1, then the worked counts and resistance in §3 using graphs and linear algebra. Take the matrix-tree formula as given on a first pass; §2 develops the determinant-line mechanism used in its proof.'
  },
  'what-a-derivative-retains': {
    topic:'Calculus · Infinitesimal geometry',
    subtitle:'From rectangle strips to higher derivatives',
    summary:'The rectangle’s extra side strips explain the product rule. First-order probes lead to Kähler differentials. Further calculations study equations, lifting obstructions and higher operations, before two separate branches in homotopy theory.',
    anchor:'rectangle', label:'Start with the rectangle (§1)',
    background:'Begin with calculus. Polynomial rings and modules enter in §§4–5; section 5 is a useful first-order stopping point.'
  }
};

export function currentExpositions({featuredNotes,esc,showCatalogueLink=false,homepage=false,entryGuidance=false}) {
  if(!featuredNotes.length)return '';
  return `<section class="current-expositions${homepage?' home-entry-expositions':''}${entryGuidance?' catalogue-entry-expositions':''}" aria-labelledby="current-expositions-title">
    <div class="section-head"><h2 id="current-expositions-title">Current expositions</h2>${showCatalogueLink?'<a href="/expositions.html">All expositions</a>':''}</div>
    <p class="collection-description">${homepage?'Begin with polynomial roots, a graph, or the product rule. Each study develops a familiar calculation into a question about the structure it retains.':'Root covers, graph complexes, and derivatives provide starting points for following familiar calculations into geometry, arithmetic, and reconstruction.'}</p>
    <p class="collection-reading-guide"><a href="/mechanisms.html#connected-expositions">Choose an entry point and follow the connections between the three studies</a></p>
    <div class="current-exposition-grid">${featuredNotes.map(n=>{const entry=homepage?homeEntries[n.slug]:null;const landingEntry=entryGuidance?homeEntries[n.slug]:null;if(homepage&&!entry)throw Error(`Missing homepage entry: ${n.slug}`);if(entryGuidance&&!landingEntry)throw Error(`Missing catalogue entry: ${n.slug}`);return `<article class="current-exposition${entry?' home-entry-exposition':''}">
      <p class="meta">${esc(entry?.topic||n.topic)}</p><h3><a href="${n.page}">${esc(n.title)}</a></h3>
      ${landingEntry?`<div class="catalogue-entry-route"><p><a href="${n.page}#${landingEntry.anchor}">${esc(landingEntry.label)}</a></p><p>${esc(landingEntry.background)}</p></div>`:''}${(entry?.subtitle||n.subtitle)?`<p class="feature-subtitle">${esc(entry?.subtitle||n.subtitle)}</p>`:''}<p>${esc(entry?.summary||n.summary)}</p>
      ${entry?`<div class="home-entry-route"><p><a href="${n.page}#${entry.anchor}">${esc(entry.label)}</a></p><p>${esc(entry.background)}</p></div>`:n.featureDetail?`<p class="feature-detail">${esc(n.featureDetail)}</p>`:''}
      <div class="text-links"><a href="${n.page}">Read the exposition</a>${n.pdf?`<a href="${n.pdf}" aria-label="PDF, ${n.pageCount} pages: ${esc(n.title)}">PDF · ${n.pageCount} pages</a>`:''}${n.manuscript&&!homepage?`<a href="${n.manuscript}" aria-label="Markdown manuscript: ${esc(n.title)}">Markdown manuscript</a>`:''}${n.tex?`<a href="${n.tex}" aria-label="TeX source: ${esc(n.title)}">TeX source</a>`:''}</div>
      ${n.readingGuide?`<p class="feature-route"><a href="${n.readingGuide}">Background and reading routes</a></p>`:''}${homepage&&n.slug==='what-a-derivative-retains'?'\n      <p class="feature-route"><a href="/notes/when-a-formal-logarithm-fails.html">Companion: When a Formal Logarithm Fails</a><br>A quadratic correction and a cubic obstruction in characteristic three.</p>':''}
    </article>`;}).join('')}</div>
  </section>`;
}
