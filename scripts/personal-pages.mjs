import {readFileSync} from 'node:fs';
import {reconstructionExample} from './reading-guides.mjs';
import {currentExpositions} from './current-expositions.mjs';
import {currentResearchFeature} from './research-pages.mjs';
import {groupCurrentEssays} from './essay-groups.mjs';

export function renderPersonalPages({save,heading,esc,notes,selectedNotes,featuredNotes,selectedPapers,papers,currentResearch,essays,gaming,noteLinks,interests={}}) {
  const published = papers.filter(p=>p.status==='Published');
  const compactOverwatch = interests.overwatch?.published===true;
  const broodWar = interests.broodWar?.published===true;
  const games = [broodWar?'Brood War':null,compactOverwatch?'Overwatch':null].filter(Boolean);
  const gameList = new Intl.ListFormat('en',{style:'long',type:'conjunction'}).format(games);
  const pursuitDescription = interests.fashion
    ? (interests.car?'Puzzles, games, clothes, and cars':'Puzzles, games, and clothes')
    : (interests.car?'Puzzles, games, and cars':'Puzzles and games');
  const otherPursuits = [
    interests.fashion?'<a href="/interests/style.html">wardrobe notes</a>':null,
    interests.car?'a small <a href="/interests/bmw-x6.html">car gallery</a>':null
  ].filter(Boolean);
  const otherPursuitsLine = otherPursuits.length
    ? ' There '+(interests.fashion?'are also ':'is also ')+otherPursuits.join(' and ')+'.'
    : '';
  const practiceEssay = essays.find(e=>e.slug==='mathematical-life-in-the-age-of-ai');
  const accountabilityEssay = essays.find(e=>e.slug==='when-accountability-stops-being-reciprocal');
  const performanceEssay = essays.find(e=>e.slug==='the-performance-of-depth');
  const proofEssay = essays.find(e=>e.slug==='what-a-new-proof-makes-possible');
  const verdictEssay = essays.find(e=>e.slug==='when-a-description-becomes-a-verdict');

  const visionEssay = essays.find(e=>e.slug==='the-authority-of-a-vision');
  const essayPath = e => e.page || `/essays/${e.slug}.html`;
  const essayText = e => readFileSync(e.body,'utf8');
  const readingMinutes = e => Math.ceil(essayText(e).split(/<section[^>]+(?:class="essay-(?:notes|sources)"|role="doc-(?:endnotes|bibliography)")/)[0].replace(/<[^>]+>/g,' ').split(/\s+/).filter(Boolean).length/230);
  const dateLine = e => e.date ? ` · <time datetime="${esc(e.date)}">${new Date(e.date+'T12:00:00Z').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'UTC'})}</time>` : '';
  const essayCard = (e,level='h2',summary=e.summary) => `<article class="essay-card"><p class="meta">${esc(e.subject||'Essay')} · ${readingMinutes(e)} min read${dateLine(e)}</p><${level}><a href="${essayPath(e)}">${esc(e.title)}</a></${level}><p class="essay-subtitle">${esc(e.subtitle)}</p><p>${esc(summary)}</p><a class="inline-link" href="${essayPath(e)}">Read the essay</a></article>`;

  const essayGroups = groupCurrentEssays(essays);
  const orderedEssays = essayGroups.flatMap(group=>group.essays);
  const introductoryEssay = orderedEssays[0];
  const featuredEssay = proofEssay || practiceEssay || introductoryEssay;
  const essayCompanion = e => '<article class="essay-companion'+(e===visionEssay?' essay-companion-film':'')+'"><p class="meta">'+esc(e.subject)+' · '+readingMinutes(e)+' min read</p><h3><a href="'+essayPath(e)+'">'+esc(e.title)+'</a></h3><p>'+esc(e.summary)+'</p></article>';

  const widerNotes = selectedNotes.filter(n=>!featuredNotes.some(featured=>featured.slug===n.slug));
  save('/','Motives, symmetry, and reconstruction','Mathematical expositions and essays by Henry Shin: what calculations retain, what explanations make possible, and what supports a judgment.','',`
    <section class="exposition-intro">
      <p class="eyebrow">Mathematical writing by Henry Shin</p>
      <h1>Motives, symmetry, <br>and reconstruction</h1>
      <p class="lead">What do symmetries reveal about a mathematical object, and what else is needed to recover it?</p>
      <p class="home-purpose">The expositions follow familiar calculations into the structures they retain. The essays ask what explanations make possible, what supports a judgment, and what helps an inquiry continue.</p>
      <nav class="text-links home-entry-links" aria-label="Choose where to begin"><a href="#current-expositions-title">Start with a calculation</a><a href="#home-essays">Start with an essay</a><a href="/mechanisms.html">Choose a reading path</a></nav>
    </section>
    <div class="home-reconstruction-example">${reconstructionExample}</div>
    ${currentExpositions({featuredNotes,esc,showCatalogueLink:true,homepage:true})}
    ${currentResearchFeature(currentResearch,esc)}
${essays.length?`<section class="home-essay" id="home-essays" aria-label="Essays on understanding and judgment"><div class="feature-label"><p class="eyebrow">Understanding<br>and judgment</p><a class="inline-link" href="/essays.html">Essays</a></div><div class="home-essay-copy"><p class="home-essay-orientation">Begin with a comparison of familiar proofs, then choose a companion essay on understanding, judgment, or intellectual life.</p><p class="collection-reading-guide"><a href="/mechanisms.html#essays-and-expositions">Reading between the expositions and essays</a></p><p class="eyebrow essay-feature-label">Featured essay</p>${essayCard(featuredEssay)}<div class="essay-companions" aria-label="Companion essays"><p class="eyebrow">Companion essays</p>${orderedEssays.filter(e=>e!==featuredEssay).map(essayCompanion).join('')}</div></div></section>`:''}
    <section class="expositions-preview" aria-labelledby="selected-writing"><div class="section-head"><h2 id="selected-writing">The wider mathematical library</h2><a href="/expositions.html">All expositions</a></div>
      <p class="collection-description home-library-intro">Proofs, constructions, and worked examples across algebra, geometry, number theory, and analysis.</p>
      <div class="home-writing home-expositions">${widerNotes.map(n=>`<article class="writing"><p class="meta">${esc(n.topic)}</p><h3><a href="${n.page}">${esc(n.title)}</a></h3><p>${esc(n.summary)}</p>${noteLinks(n)}</article>`).join('')}</div>
    </section>
    <section class="reading-invitation"><div><h2>Find a route through the writing.</h2><p>Follow the shared examples between expositions and essays, or choose a shorter path through polynomial composition, exact arithmetic and analysis. The four main exposition routes state their background and useful stopping points.</p></div><a href="/mechanisms.html">Explore the reading paths</a></section>
    <section class="home-secondary" aria-label="About, research, and interests">
      <div><h2><a href="/about.html">About Henry Shin</a></h2><p>Current studies, mathematical practice, and correspondence.</p></div>
      <div><h2><a href="/papers.html">Research papers</a></h2><p>Current research and earlier papers, with versions, publication details, and corrections.</p></div>
      <div><h2><a href="/interests.html">Other interests</a></h2><p>${broodWar?`Patterns on large twisty cubes and notes on playing ${esc(gameList)}.`:compactOverwatch?'Patterns on large twisty cubes and a few notes on playing Overwatch.':'Patterns on large twisty cubes, built from commutators and move sequences.'}</p></div>
    </section>
  `);

  save('/about.html','About Henry Shin','Henry Shin’s mathematical background, independent work, current studies in motivic mathematics, and essays on understanding and intellectual life.','About',
    heading('About','Hello, I’m Henry.','I live in San Diego. Tensorgami brings together mathematical work, essays on understanding and interpretation, and other interests.')+`
    <div class="about-layout"><div class="prose">
      <p>I studied mathematics at Harvard with <a href="https://virtualmath1.stanford.edu/~rltaylor/students.html">Richard Taylor</a> and now work independently.</p>
      <h2 id="current-direction">Current direction</h2>
      <p>The current <a href="/expositions.html">expositions</a> follow questions of <strong>transport, descent, and reconstruction</strong> through coverings, cohomology, and motives.</p>
      <p>A useful starting point is the family <span class="math">w<sup>3</sup> − 3w = t</span>. Moving around its branch points permutes its roots, bringing monodromy into contact with Galois theory. Tannakian and motivic Galois theory provide a wider setting for these questions, connecting symmetry with cohomology, periods, and differential equations.</p>
      <p><a href="/notes/fourier-symmetry-and-reconstruction.html"><em>Fourier, Symmetry, and Reconstruction</em></a> follows one route through this territory, from the classical cubic and quartic formulas to categorical Fourier duality.</p>
      <p><a href="/notes/what-a-boundary-map-can-prove.html"><em>What a Boundary Map Can Prove</em></a> follows another, from a graph’s boundary map to derived gluing, Hodge inequalities, and the motivic Galois symmetries of an elliptic attachment.</p>
      <p><a href="/notes/what-a-derivative-retains.html"><em>What a Derivative Retains</em></a> begins with rectangle strips and oriented boundaries, then asks what infinitesimal geometry and homotopical calculus retain.</p>
      <p><a href="/notes/quotients-and-reconstruction.html"><em>Quotients, Refinement, and Reconstruction</em></a> begins with elementary algebraic maneuvers, derives composition-factor invariance from a common comparison construction, and asks what extension data a list of factors forgets. The <a href="/mechanisms.html#connected-expositions">shared reading guide</a> connects the four studies through specific calculations and their prerequisites.</p>
      <p><a href="/papers/finite-generation-permutation-twisted-cohomology.html"><em>Finite generation of permutation twisted cohomology</em></a> proves a finite-module theorem for representation-sphere section rings and applies it to the geometry of permutation complexes.</p>
      <h2>Earlier research</h2>
      <p>The <a href="/papers.html#earlier-research">research collection</a> also includes earlier work in group theory, algebra, additive combinatorics, and geometric analysis, with papers, preprints, publication details, and corrections.</p>
      ${essays.length?'<h2 id="writing-and-intellectual-life">Writing and intellectual life</h2>':''}
      ${proofEssay?`<p><a href="${essayPath(proofEssay)}"><em>${esc(proofEssay.title)}</em></a> compares what different arguments make available: constructions, quantitative bounds, and routes to further questions.</p>`:''}
      ${verdictEssay?`<p><a href="${essayPath(verdictEssay)}"><em>${esc(verdictEssay.title)}</em></a> asks what a comparison must preserve to support a judgment about a contribution.</p>`:''}
      ${practiceEssay?`<p><a href="${essayPath(practiceEssay)}"><em>${esc(practiceEssay.title)}</em></a> follows understanding from mathematical examples into the assistance, judgment, credit, and shared work that sustain an inquiry.</p>`:''}

      ${accountabilityEssay?`<p><a href="${essayPath(accountabilityEssay)}"><em>${esc(accountabilityEssay.title)}</em></a> examines what happens when a consequential moral judgment is challenged, and what keeps institutional authority open to correction.</p>`:''}

      ${performanceEssay?`<p><a href="${essayPath(performanceEssay)}"><em>${esc(performanceEssay.title)}</em></a> traces how academic incentives and evaluation reproduce professional authority, and how the conditions of inquiry have changed.</p>`:''}

      <p>The expositions follow what calculations retain; the essays examine what explanations and judgments warrant, and how people acquire the means to continue an inquiry. The <a href="/mechanisms.html#essays-and-expositions">reading paths</a> connect their specific examples and questions.</p>
      ${visionEssay?`<p>The <a href="/essays.html">essays</a> also include film interpretation. <a href="${essayPath(visionEssay)}"><em>${esc(visionEssay.title)}</em></a> examines the relationship between knowledge, belief, and political allegiance in Villeneuve’s <em>Dune</em>.</p>`:''}
      <h2>Other pursuits</h2>
      <p>I make <a href="/play/cube-patterns.html">patterns on large twisty cubes</a>, working out move sequences with commutators. ${broodWar?`I also play StarCraft: ${esc(gameList)}. My <a href="/interests.html">Interests page</a> brings together photographs, game recordings, and a few notes on what I enjoy about these pursuits.`:compactOverwatch?'My <a href="/interests.html">Interests page</a> also includes a few notes on playing Overwatch.':'Photographs are collected in the <a href="/play/cube-patterns.html">cube gallery</a>.'}</p>
      <h2>Correspondence</h2><p>If something here connects with your work—or if you spot a point that could be clearer—I’d be glad to hear from you.</p><p><a href="mailto:hkshin@gmail.com">hkshin@gmail.com</a></p>
    </div><aside class="about-links"><h2>Elsewhere</h2><ul><li><a href="https://orcid.org/0009-0000-6453-6865">ORCID</a></li><li><a href="https://math.stackexchange.com/users/268083/henry-shin">Mathematics Stack Exchange</a></li>${interests.youtube?`<li><a href="${esc(interests.youtube.url)}">YouTube · cube patterns and games</a></li>`:''}</ul></aside></div>`);

  if(essays.length)save('/essays.html','Essays','Essays by Henry Shin on understanding, independent inquiry, and the scope of authority, from mathematics in the age of AI to Villeneuve’s Dune.','Essays',
    heading('Understanding and judgment','Essays','What knowledge makes possible, what authority it warrants, and how people remain free to choose their purposes.')+
    `<p class="landing-orientation">Each essay can be read independently. The sequence begins with mathematical arguments and moves toward the conditions and institutions of inquiry. Film interpretation offers a separate route.</p><nav class="text-links landing-reading-choices" aria-label="Ways into the essays"><a href="#mathematics-essays">Mathematics and intellectual life</a><a href="#interpretation-essays">Film and interpretation</a><a href="/mechanisms.html#essays-and-expositions">Reading paths through essays and expositions</a></nav>`+
    `<div class="essay-library">${essayGroups.filter(group=>group.essays.length).map(group=>`<section class="essay-group" aria-labelledby="${group.headingId}"><h2 id="${group.headingId}" class="essay-group-label">${esc(group.label)}</h2>${group.essays.map(e=>essayCard(e,'h3')).join('')}</section>`).join('')}</div>`);
  for (const e of essays) {
    const body = essayText(e);
    const sections = [...body.matchAll(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/g)].map(m=>{
      const ownId = m[1].match(/id="([^"]+)"/)?.[1];
      const previousSection = body.slice(0,m.index).match(/<section\b[^>]*id="([^"]+)"[^>]*>[^<]*$/)?.[1];
      return {id:ownId || previousSection,title:m[2].replace(/<[^>]+>/g,'').replace(/^[IVX]+\.\s*/, '')};
    }).filter(s=>s.id);
    const contents = e.parts ? `<ol class="contents-parts">${e.parts.map(part=>`<li><a class="contents-part-title" href="#${part.id}">${esc(part.number)}. ${esc(part.title)}</a><ol>${e.sections.filter(s=>s.part===part.id).map(s=>`<li><a href="#${s.id}">${esc(s.number)}. ${esc(s.title)}</a></li>`).join('')}</ol></li>`).join('')}<li class="contents-sources"><a href="#notes-and-sources">Notes and sources</a></li></ol>` : `<ol>${sections.map(s=>`<li><a href="#${s.id}">${s.title}</a></li>`).join('')}</ol>`;
    const downloadLinks = `${e.pdf?`<a href="${e.pdf}">Download PDF</a>`:''}${e.source?`<a href="${e.source}">${esc(e.sourceLabel||'TeX source')}</a>`:''}`;
    const downloads = downloadLinks?`<div class="text-links">${downloadLinks}</div>`:'';
    const relatedGroup = kind => (e.related||[]).filter(item=>(item.kind==='exposition'?'exposition':'essay')===kind).map(item=>{
      const exposition=item.kind==='exposition';
      const companion=(exposition?notes:essays).find(candidate=>candidate.slug===item.slug);
      if(!companion)throw new Error(`Missing related reading: ${item.slug}`);
      if(item.anchor&&!/^[a-zA-Z0-9:._-]+$/.test(item.anchor))throw Error(`Invalid reading target: ${item.anchor}`);
      const href=(exposition?companion.page:essayPath(companion))+(item.anchor?'#'+item.anchor:'');
      return `<div><h3><a href="${href}">${esc(companion.title)}</a></h3><p>${esc(item.description)}</p></div>`;
    }).join('');
    const relatedEssays=relatedGroup('essay');
    const relatedExpositions=relatedGroup('exposition');
    save(essayPath(e),e.title,e.summary,'Essays',`
      <header class="page-heading essay-heading"><p class="eyebrow"><a href="/essays.html">Essays</a> / ${esc(e.subject||'Intellectual life')}</p><h1>${esc(e.title)}</h1><p class="essay-deck">${esc(e.subtitle)}</p><p class="byline">Henry Shin · ${readingMinutes(e)} min read${dateLine(e)}</p>${e.contentNote?`<p class="essay-notice">${esc(e.contentNote)}</p>`:''}${downloads}</header>
      <div class="essay-layout"><aside class="essay-sidebar"><nav aria-label="Essay contents"><h2>In this essay</h2>${contents}</nav><a class="back-link" href="/essays.html">All essays</a></aside>
        <div class="essay-main"><details class="mobile-contents"><summary>In this essay</summary><nav aria-label="Essay contents on small screens">${contents}</nav></details><article class="essay-body prose" aria-label="${esc(e.title)}">${body}</article>
          ${relatedEssays?`<section class="essay-related" aria-label="Related essays"><h2>Related essays</h2>${relatedEssays}</section>`:''}${relatedExpositions?`<section class="essay-related" aria-label="Worked mathematical companions"><h2>Worked mathematical companions</h2>${relatedExpositions}</section>`:''}
          <footer class="essay-end"><p>Henry Shin</p><p><a href="/about.html">About the author</a> · <a href="mailto:hkshin@alumni.harvard.edu">Correspondence</a></p>${downloads}<p><a href="/mechanisms.html#essays-and-expositions">Reading between expositions and essays</a></p><a class="back-link" href="/essays.html">Back to essays</a></footer>
        </div>
      </div>`);
  }

  const photo = (im,loading='lazy')=>`<figure><a href="${im.src}" aria-label="Open full photograph: ${esc(im.alt)}"><img src="${im.src}" width="${im.width}" height="${im.height}" alt="${esc(im.alt)}" loading="${loading}" decoding="async"></a><figcaption>${esc(im.caption)} <a href="${im.src}">View full-size image</a></figcaption></figure>`;
  if(gaming.length)save('/gaming.html','Gaming','Competitive Overwatch milestones from Henry Shin: Master in the original Overwatch and Diamond 5 in Overwatch 2 Support.','Interests',
    heading('<a href="/interests.html">Interests</a> / Competitive games','In the queue.','A few milestones from competitive Overwatch, under the name RiemannRoch.')+`
    <div class="gaming-intro prose"><p>I enjoy the process of learning a role and improving through solo queue. In the original Overwatch I primarily played Zarya and other tanks; in Overwatch 2, I’ve been practicing Support.</p></div>
    <div class="gaming-collection">${gaming.map((g,i)=>`<article class="game-record" id="${g.slug}"><div class="game-story"><p class="eyebrow">${esc(g.game)}</p><h2>${esc(g.achievement)}</h2>${g.score?`<p class="game-score">${esc(g.score)}</p>`:''}<p>${esc(g.body)}</p><dl class="game-facts"><div><dt>Queue</dt><dd>${esc(g.mode)}</dd></div><div><dt>Role</dt><dd>${esc(g.role)}</dd></div>${g.season?`<div><dt>Season</dt><dd>${esc(g.season)}</dd></div>`:''}${g.date?`<div><dt>Date</dt><dd>${esc(g.date)}</dd></div>`:''}</dl></div><div class="game-media">${photo(g.images[0],i===0?'eager':'lazy')}${g.images.length>1?`<details class="more-photos"><summary>Another view of the season record</summary>${g.images.slice(1).map(im=>photo(im)).join('')}</details>`:''}</div></article>`).join('')}</div>
    <p class="gaming-close"><a href="/interests.html#puzzles-and-games">Puzzles &amp; games</a> <span aria-hidden="true">·</span> <a href="/play/cube-patterns.html">Cube patterns</a></p>`);
}
