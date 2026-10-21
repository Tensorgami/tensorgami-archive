import {readFileSync} from 'node:fs';
import {expositionReadingRoutes,companionReadingLinks,connectedExpositions,entryReadingPaths} from './reading-guides.mjs';
import {readingGuideIndex,essayExpositionPaths,expositionEssayLinks,widerReading} from './collection-reading.mjs';
import {currentExpositions} from './current-expositions.mjs';

export function renderLibraryPages({save,heading,esc,notes,essays,featuredNotes,noteLinks,readingPaths,redirect,formalizationProjects}) {
  const groups=[['algebra-geometry','Algebra & geometry'],['number-theory','Number theory'],['analysis','Analysis & topology'],['problems','Problems']];
  const paths=readingPaths.map(route=>({...route,notes:route.notes.map(slug=>{
    const note=notes.find(n=>n.slug===slug);
    if(!note)throw new Error(`Reading path ${route.id} refers to missing exposition: ${slug}`);
    return note;
  })}));
  if(new Set(paths.map(p=>p.id)).size!==paths.length)throw new Error('Duplicate reading path');
  for(const route of paths)if(route.companionPath&&!paths.some(p=>p.id===route.companionPath))throw Error(`Missing companion reading path: ${route.companionPath}`);
  const count=kind=>notes.filter(n=>n.kind===kind).length;
  const featuredSlugs=new Set(featuredNotes.map(n=>n.slug));
  const pdfLabel=n=>`PDF${n.pageCount?` · ${n.pageCount} pages`:''}`;
  const catalogueBackground=n=>`<p class="catalogue-background">${n.catalogueBackground?esc(n.catalogueBackground):`<strong>Background:</strong> ${esc(n.background)}`}${n.readingGuide?` <a href="${n.readingGuide}">Reading routes</a>`:''}</p>`;
  const revisionDetails=n=>{
    if(!n.revision)return '';
    if(!n.revisionDates?.length)throw Error(`Missing revision dates: ${n.slug}`);
    const dates=n.revisionDates.map(date=>{
      if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||new Date(date+'T00:00:00Z').toISOString().slice(0,10)!==date)throw Error(`Invalid revision date: ${n.slug}`);
      const label=new Intl.DateTimeFormat('en-US',{year:'numeric',month:'long',day:'numeric',timeZone:'UTC'}).format(new Date(date+'T00:00:00Z'));
      return `<time datetime="${date}">${label}</time>`;
    });
    return `<details class="note-revision"><summary>Revision history · ${dates.join('; ')}</summary><p class="muted revision-note">${esc(n.revision)}</p></details>`;
  };
  const downloads=n=>`<div class="text-links">${n.pdf?`<a href="${n.pdf}">${pdfLabel(n)}</a>`:''}${n.manuscript?`<a href="${n.manuscript}" download>Markdown manuscript</a>`:''}${n.tex?`<a href="${n.tex}">TeX source</a>`:''}</div>`;
  save('/expositions.html','Expositions','Notes, proofs, and problems in algebra, geometry, number theory, and analysis.','Expositions',
    heading('The mathematical library','Expositions','This library follows familiar calculations into the structures they retain. Choose a current study, a connected reading route, or a subject.')+
    `<nav class="text-links landing-reading-choices" aria-label="Ways into the mathematical library"><a href="#current-expositions-title">Roots, graphs and calculus</a><a href="#other-exposition-routes">Other mathematical routes</a><a href="#full-catalogue">Full catalogue</a><a href="/mechanisms.html#essays-and-expositions">Expositions and essays</a></nav>`+
    currentExpositions({featuredNotes,esc,entryGuidance:true})+
    `<section class="landing-other-routes" aria-labelledby="other-exposition-routes"><div class="section-head"><h2 id="other-exposition-routes">Other mathematical routes</h2></div><p class="collection-description">Follow a formal identity into an obstruction, compare two polynomial proofs, choose an arithmetic construction, or begin with an analysis argument. The guide connects the notes within each route.</p><div class="landing-route-grid">${paths.filter(route=>!route.notes.some(n=>featuredSlugs.has(n.slug))).map(route=>`<article class="landing-route"><h3><a href="/mechanisms.html#${route.id}">${esc(route.title)}</a></h3><p>${esc(route.description)}</p></article>`).join('')}</div></section>`+
    `<div class="section-head"><h2 id="full-catalogue">Full catalogue</h2><a href="/mechanisms.html">Reading paths</a></div><p class="collection-description catalogue-format-note">Some notes offer a full web edition; others introduce a PDF argument. Each entry states its background and links to the available reading edition and downloads.</p>`+
    `<div class="library"><aside class="sidenote"><nav aria-label="Exposition subjects"><h2>Browse by subject</h2><ul>${groups.map(([id,label])=>`<li><a href="#${id}">${esc(label)}</a></li>`).join('')}</ul></nav><p>${count('Exposition')} expositions<br>${count('Problem set')} problem set</p><nav class="library-tools" aria-label="Reading guides and sources"><h2>With the notes</h2><ul><li><a href="/mechanisms.html">Reading paths</a></li><li><a href="/verification.html">Supplementary sources</a></li></ul></nav></aside><div class="library-list">${groups.map(([id,label])=>`<section id="${id}"><div class="section-head"><h2>${esc(label)}</h2></div>${notes.filter(n=>n.group===id).map(n=>`<article class="writing"><p class="meta">${esc(n.topic)} · ${esc(n.kind)}</p><h3><a href="${n.page}">${esc(n.title)}</a></h3>${featuredSlugs.has(n.slug)?'':`<p>${esc(n.summary)}</p>`}${catalogueBackground(n)}${noteLinks(n,true)}</article>`).join('')}</section>`).join('')}</div></div>`);
  for(const n of notes) {
    const project=formalizationProjects.get(n.slug);
    if(n.source&&!project)throw Error(`Missing formalization project: ${n.slug}`);
    const route=paths.find(p=>p.notes.some(note=>note.slug===n.slug));
    const related=route?.notes.filter(note=>note.slug!==n.slug)||[];
    if(n.readingBody){
      const body=readFileSync(n.readingBody,'utf8');
      if(/<(?:html|head|body|main|script)\b/i.test(body))throw new Error(`Reading edition must be a script-free article fragment: ${n.slug}`);
      const sections=[...body.matchAll(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/g)].map(match=>{
        const id=match[1].match(/\bid="([^"]+)"/)?.[1];
        if(!id)throw new Error(`Reading edition section lacks an anchor: ${n.slug}`);
        return {id,title:match[2].replace(/<[^>]+>/g,'')};
      });
      if(!sections.length)throw new Error(`Reading edition has no sections: ${n.slug}`);
      if(n.slug==='what-a-derivative-retains'){
        const jumps=sections.filter(s=>s.id!=='notes-and-sources').map((s,i)=>`<li><button type="button" class="contents-jump" data-jump="${esc(s.id)}">${i+1}. ${s.title.replace(/^\d+ · /,'')}</button></li>`).join('');
        save(n.page,n.title,n.summary,'Expositions',`
          <header class="exposition-heading"><p class="eyebrow"><a href="/expositions.html">Expositions</a> / October 2026</p><h1>${esc(n.title)}</h1><p class="lead">${esc(n.subtitle)}</p><p class="description">Explicit calculations in calculus, algebraic geometry, formal deformation theory, and homotopy theory.</p><p class="byline">Henry Shin</p>${downloads(n)}<p class="reader-background">${esc(n.catalogueBackground||n.background)}</p>${expositionReadingRoutes(n.slug)}</header>
          <div class="exposition-layout"><aside class="exposition-sidebar" aria-label="Contents"><h2>Contents</h2><ol>${jumps}<li><button type="button" class="contents-jump" data-jump="notes-and-sources">Notes and sources</button></li></ol><button type="button" class="contents-jump back-link" data-jump="top">Back to opening</button><a class="back-link" href="/expositions.html">All expositions</a></aside><div class="exposition-main"><details class="exposition-mobile-contents"><summary>Contents · ${sections.length-1} sections</summary><nav aria-label="Mobile contents"><ol>${jumps}<li><button type="button" class="contents-jump" data-jump="notes-and-sources">Notes and sources</button></li></ol></nav></details><article id="reading" class="exposition-reader">${body}</article><footer class="exposition-end"><p>Henry Shin · ${esc(n.kind)}</p>${downloads(n)}${companionReadingLinks(n.slug,notes,esc)}${expositionEssayLinks(n.slug,essays,esc)}<p><a href="/expositions.html">All expositions</a></p></footer></div></div>`);
        continue;
      }
      const contents=`<ol>${sections.map(section=>`<li><a href="#${esc(section.id)}">${section.title}</a></li>`).join('')}</ol>`;
      save(n.page,n.title,n.summary,'Expositions',`
        <header class="page-heading exposition-heading"><p class="eyebrow"><a href="/expositions.html">Expositions</a> / ${esc(n.topic)}</p><h1>${esc(n.title)}</h1>${n.subtitle?`<p class="exposition-subtitle">${esc(n.subtitle)}</p>`:''}<p class="byline">Henry Shin${n.edition?` · ${esc(n.edition)}`:''}</p>${downloads(n)}<p class="reader-background">${esc(n.background)}</p>${expositionReadingRoutes(n.slug)}</header>
        <div class="exposition-layout"><aside class="exposition-sidebar"><nav aria-label="Exposition contents"><h2>In this exposition</h2>${contents}</nav><a class="back-link" href="/expositions.html">All expositions</a></aside>
          <div class="exposition-main"><details class="exposition-mobile-contents"><summary>In this exposition</summary><nav aria-label="Exposition contents on small screens">${contents}</nav></details><article class="exposition-reader" aria-label="${esc(n.title)}">${body}</article>
            <footer class="exposition-end"><p>Henry Shin · ${esc(n.kind)}</p>${downloads(n)}${companionReadingLinks(n.slug,notes,esc)||(related.length?`<section class="reader-related" aria-label="Related expositions"><h2>Continue reading</h2><ul>${related.map(other=>`<li><a href="${other.page}">${esc(other.title)}</a></li>`).join('')}</ul><p><a href="/mechanisms.html#${route.id}">Follow this reading path</a></p></section>`:'')}${expositionEssayLinks(n.slug,essays,esc)}<p><a href="/expositions.html#${n.group}">More ${esc(groups.find(([id])=>id===n.group)[1].toLowerCase())}</a> <span aria-hidden="true">·</span> <a href="/expositions.html">All expositions</a></p></footer>
          </div>
        </div>`);
      for(const legacy of n.legacyPages||[])redirect(legacy,n.page,n.title);
      continue;
    }
    const excerpt=n.readingExcerpt?readFileSync(n.readingExcerpt.body,'utf8'):'';
    if(excerpt&&(/<(?:html|head|body|main|script)\b/i.test(excerpt)||!/<h2 id="[^"]+">/.test(excerpt)))throw Error(`Invalid reading excerpt: ${n.slug}`);
    const excerptId=excerpt.match(/<h2 id="([^"]+)">/)?.[1];
    const problems=n.group==='problems'?readFileSync('content/problem-statements.html','utf8'):'';
    save(n.page,n.title,n.summary,'Expositions',
      `<header class="page-heading"><p class="eyebrow"><a href="/expositions.html">Expositions</a> / ${esc(n.topic)}</p><h1>${esc(n.title)}</h1><p class="lead">${esc(n.summary)}</p></header><div class="article-grid"><article class="article-body">${excerpt?'':`<p>${esc(n.body)}</p>`}<h2>Background</h2><p>${esc(n.background)}</p>${excerpt?`<section class="note-excerpt" aria-labelledby="${excerptId}">${excerpt}</section><h2>Continue with the full exposition</h2><p>The <a href="${n.pdf}">full exposition</a> develops the oscillation lemma, includes diagrams, and extends the method to other Lipschitz constructions.</p>`:problems?`<h2>The problems</h2>${problems}`:`<h2>Read the full ${n.kind.toLowerCase()}</h2><p>The complete argument is available as a <a href="${n.pdf}">PDF</a>.</p>`}${revisionDetails(n)}${n.references?.length?`<section class="note-sources"><h2>Original sources</h2>${n.references.map(ref=>`<p><a href="${esc(ref.url)}">${esc(ref.label)}</a>${ref.description?`<br>${esc(ref.description)}`:''}</p>`).join('')}</section>`:''}${related.length?`<section class="related-reading" aria-label="Related reading"><h2>Read alongside</h2><ul>${related.map(other=>`<li><a href="${other.page}">${esc(other.title)}</a></li>`).join('')}</ul><a class="back-link" href="/mechanisms.html#${route.id}">This reading path</a></section>`:''}<p class="back-link"><a href="/expositions.html#${n.group}">More ${esc(groups.find(([id])=>id===n.group)[1].toLowerCase())}</a> <span aria-hidden="true">·</span> <a href="/expositions.html">All expositions</a></p></article><aside class="reading-links"><h2>${n.kind==='Problem set'?'The problem set':'The full text'}</h2><a class="pill-link" href="${n.pdf}">Open PDF</a>${n.tex?`<a href="${n.tex}">TeX source</a>`:''}${n.source?`<a href="${n.source}">Supplementary Lean source</a><a href="/verification.html#${project.id}">Project and build notes</a>`:''}<p>Henry Shin · ${n.kind}</p></aside></div>`);
    for(const legacy of n.legacyPages||[])redirect(legacy,n.page,n.title);
  }
  save('/verification.html','Supplementary sources','Supplementary formalization files accompanying selected mathematical notes.','Expositions',
    heading('<a href="/expositions.html">Expositions</a> / Supplementary material','Supplementary sources','Lean files accompanying selected notes, collected here alongside the full mathematical texts.')+
    `<div class="narrow"><p>Each project download includes its Lean sources, pinned toolchain, dependency manifest, and project notes. The notes describe the formal statements and their relationship to the exposition.</p><p><a href="/formalizations/README.md">Formalization scope and source notes</a></p><details id="build-instructions"><summary>Build a project</summary><p>With Lean’s <a href="https://github.com/leanprover/elan">elan toolchain manager</a> installed, unpack a project and run the following from its directory. Its <code>lean-toolchain</code> file selects the required Lean version.</p><pre><code>lake exe cache get
lake build</code></pre></details>${notes.filter(n=>n.source).map(n=>{const project=formalizationProjects.get(n.slug);return `<article class="writing" id="${project.id}"><h2><a href="${n.page}">${esc(n.title)}</a></h2><div class="text-links"><a href="${project.archive}">Download project (ZIP)</a><a href="${project.readme}">Project notes</a><a href="${n.source}">Lean source</a><a href="${n.pdf}">PDF</a></div></article>`;}).join('')}<p class="back-link"><a href="/expositions.html">Back to expositions</a></p></div>`);
  save('/mechanisms.html','Reading paths','Reading paths through mathematical expositions and essays on understanding, judgment, and intellectual life.','Expositions',
    heading('<a href="/expositions.html">Expositions</a> &amp; <a href="/essays.html">Essays</a> / Reading guide','Reading paths','Choose a calculation or a question, then follow connected expositions and essays.')+
    `<div class="narrow reading-paths">${readingGuideIndex}${connectedExpositions}${essayExpositionPaths(essays,notes,esc)}${entryReadingPaths}${paths.map(route=>`<section class="reading-path" id="${route.id}"><h2>${esc(route.title)}</h2><p>${esc(route.description)}</p><ol>${route.notes.map(n=>`<li><a href="${n.page}">${esc(n.title)}</a></li>`).join('')}</ol>${route.companionPath?`<p>For two shorter companion proofs, follow <a href="#${route.companionPath}">${esc(paths.find(p=>p.id===route.companionPath).title)}</a>.</p>`:''}</section>`).join('')}${widerReading}<p class="back-link"><a href="/expositions.html">Browse all subjects</a> <span aria-hidden="true">·</span> <a href="/verification.html">Supplementary sources</a></p></div>`);
}
