// Cross-collection guidance stays outside the authored essays and expositions.
const essayPage=slug=>`/essays/${slug}.html`;
const notePage=slug=>`/notes/${slug}.html`;
const proof='what-a-new-proof-makes-possible';
const verdict='when-a-description-becomes-a-verdict';
const life='mathematical-life-in-the-age-of-ai';
const expertise='what-sustains-mathematical-expertise';
const accountability='when-accountability-stops-being-reciprocal';
const performance='the-performance-of-depth';
const dune='the-authority-of-a-vision';
const fourier='fourier-symmetry-and-reconstruction';
const boundary='what-a-boundary-map-can-prove';
const derivative='what-a-derivative-retains';

export const readingGuideIndex=`<nav class="reading-guide-index text-links" aria-label="Reading guide sections"><a href="#connected-expositions">Start with mathematics</a><a href="#essays-and-expositions">Expositions and essays</a><a href="#fourier-routes-title">Fourier routes</a><a href="#boundary-map-routes-title">Boundary Map routes</a><a href="#derivative-routes-title">Derivative routes</a><a href="#quotients-and-reconstruction">Quotients and factors</a><a href="#current-research">Current research</a><a href="#wider-reading">Other routes</a></nav>`;

export function essayExpositionPaths(essays,notes,esc) {
  const essayLink=(slug,anchor='',label='')=>{
    const e=essays.find(e=>e.slug===slug);
    if(!e)throw Error(`Missing reading-guide essay: ${slug}`);
    return `<a href="${essayPage(slug)}${anchor?'#'+anchor:''}"><em>${esc(label||e.title)}</em></a>`;
  };
  for(const slug of [fourier,boundary,derivative])if(!notes.some(n=>n.slug===slug))throw Error(`Missing reading-guide exposition: ${slug}`);
  return `<section class="reading-path collection-connections" aria-labelledby="essays-and-expositions"><h2 id="essays-and-expositions">From mathematical examples to understanding and judgment</h2>
    <p>The expositions develop the calculations. This route moves from mathematical comparisons to the conditions of inquiry and its institutions. Each essay can be read independently.</p>
    <ol class="essay-reading-sequence">
      <li>${essayLink(proof)} asks what another proof makes possible when its conclusion is already known: a procedure, an estimate, a generalization, or a reusable mechanism.</li>
      <li>${essayLink(verdict)} asks whether a description retains enough information for the particular conclusion drawn from it. Its mathematical comparisons prepare a discussion of explanation, expertise, and the scope of judgment.</li>
      <li>${essayLink(life)} asks how understanding is cultivated and sustained, and how assistance, institutions, credit, and shared work affect the freedom to inquire. Its account of intellectual life develops its own evidence and arguments.</li>
      <li>${essayLink(expertise)} asks what continuing human understanding can support in paid roles and institutions, and how independent expertise is renewed when fewer experts are needed in individual encounters.</li>
      <li>${essayLink(accountability)} asks what happens when challenging a moral judgment becomes evidence against the challenger, and what permits scrutiny and correction. It draws on institutional cases, organizing testimony, and research on accountability.</li>
      <li>${essayLink(performance)} traces how credentials, performance measures, prestige, and research incentives acquire institutional force, and how they can reproduce intellectual conformity over time. Its historical argument distinguishes the movement of research resources from the movement of independent judgment.</li>
    </ol>
    <h3>Follow a specific example</h3>
    <div id="projection-and-resistance"><h4>A projection that measures the error</h4><p>In ${essayLink(proof,'what-the-connection-between-proofs-reveals','What the connection between proofs reveals')}, the proof essay retains the orthogonal residual behind Cauchy–Schwarz and least squares. <a href="${notePage(boundary)}#the-inverse-measures-resistance">Boundary Map §3.4</a> uses orthogonality to identify the minimum energy of a current and the residual energy of another feasible current. The bridge uses linear algebra and inner products.</p></div>
    <div id="descriptions-and-retained-operations"><h4>Ask what the description determines</h4><p><a href="${essayPage(verdict)}#enough-for-which-question">Description §2</a> compares the identity and a shear: equal eigenvalues answer some questions and leave others undecided. <a href="${notePage(fourier)}#section-12-3">Fourier §12.3</a> continues that exact example with the nilpotent module structure retained by the circle transform. <a href="${essayPage(verdict)}#what-the-arrangement-does">Description §3</a> adds a different test involving induced maps. For an optional advanced comparison, <a href="${notePage(derivative)}#higher-operations">Derivative §11</a> gives equal pointwise tangent complexes with different higher operations; it uses graded algebra and characteristic-zero formal deformation theory.</p><p><a href="/notes/quotients-and-reconstruction.html#factors-and-extensions">Quotients, Refinement, and Reconstruction</a> supplies an algebraic route into the same question: equal simple-factor lists can conceal different extensions. Its probe calculations recover nilpotent chain lengths, giving a companion to the Fourier example.</p></div>
    <div id="an-inquiry-and-its-examples"><h4>Choose a workable next calculation</h4><p><a href="${essayPage(life)}#becoming-capable">Mathematical Life’s account of becoming capable</a> considers the means to understand and test an argument. The <a href="#connected-expositions">four mathematical entries above</a> and their individual routes give prerequisites and stopping points. To examine a retained extension directly, <a href="${essayPage(life)}#an-inquiry-with-somewhere-to-go">its concluding section</a> computes a relative logarithm. An advanced continuation is <a href="${notePage(boundary)}#the-attachment-point-changes-the-motivic-symmetry-group">Boundary Map §9.3</a>: an elliptic attachment changes reconstructed symmetry. The two extensions have different pure pieces, and the attachment calculation uses its stated motivic comparison hypotheses.</p></div>
    <div class="film-reading" id="film-and-intellectual-life"><h3>Film and interpretation</h3><p>${essayLink(dune)} asks how learned competence, knowledge, and collective hope become claims to command in Villeneuve’s <em>Dune</em>. It follows a related question about knowledge and authority through the films’ characters and form. Its companion ${essayLink(life)} considers the purposes and conditions of inquiry. The film essay is an independent route and contains spoilers for both films.</p></div>
  </section>`;
}

const essayReturns={
  [fourier]:{slug:verdict,anchor:'enough-for-which-question',description:'Return to the identity-and-shear example and ask which conclusions an eigenvalue list determines. The essay distinguishes an adequate description from an unsupported further judgment.'},
  [boundary]:{slug:proof,anchor:'what-the-connection-between-proofs-reveals',description:'Compare the orthogonal residual in least squares with the minimum-energy calculation in §3.4 here. The essay asks what a proof makes available beyond its conclusion.'},
  [derivative]:{slug:verdict,anchor:'enough-for-which-question',description:'Ask what a first-order account determines and what requires additional operations. The essay’s adequacy test provides a way to assess that distinction while keeping each reconstruction problem’s hypotheses visible.'}
};

export function expositionEssayLinks(slug,essays,esc) {
  const item=essayReturns[slug];
  if(!item)return '';
  const essay=essays.find(e=>e.slug===item.slug);
  if(!essay)throw Error(`Missing essay companion: ${item.slug}`);
  return `<section class="reader-essay-related" aria-label="Essay companion"><h2>On understanding and judgment</h2><h3><a href="${essayPage(item.slug)}#${item.anchor}">${esc(essay.title)}</a></h3><p>${esc(item.description)}</p><p><a href="/mechanisms.html#essays-and-expositions">Reading between expositions and essays</a></p></section>`;
}

export const widerReading=`<section class="reading-path" aria-labelledby="wider-reading"><h2 id="wider-reading">Other routes through the site</h2><ul>
  <li><a href="/expositions.html">Browse the full mathematical library</a>, or follow the shorter paths through <a href="#polynomial-structure">polynomial composition</a>, <a href="#exact-arithmetic">exact arithmetic</a>, and <a href="#controlling-exceptional-sets">analysis</a>.</li>
  <li><a href="/verification.html">Supplementary sources</a> collect formalization files and their scope notes. The <a href="/papers.html">research papers</a> include current work in permutation twisted cohomology and earlier papers, with versions, publication details, and corrections.</li>
  <li><a href="/interests.html">Interests</a> offers personal pursuits, with its own entries and photographs. These can be explored independently of the mathematical and essay routes.</li>
  <li><a href="/about.html">About</a> introduces the current inquiry, writing, background, and correspondence.</li>
  </ul></section>`;

export const currentResearchPath=`<section class="reading-path" id="current-research"><p class="eyebrow">Current research</p><h2>A cyclic entry point</h2><p>Begin with the cyclic example in <a href="/papers/finite-generation-permutation-twisted-cohomology.html#reading-the-paper"><em>Finite generation of permutation twisted cohomology</em></a> and <a href="/pdfs/finite-generation-permutation-twisted-cohomology-v2.pdf#page=19">Example 6.4</a>. <a href="/notes/quotients-and-reconstruction.html#section-10">Quotients §10</a> studies nilpotent operators; <a href="/notes/what-a-derivative-retains.html#arithmetic-derivative">Derivative §6</a> gives a companion calculation with a derived fiber. The full paper uses modular representation theory and tensor-triangular geometry.</p></section>`;
