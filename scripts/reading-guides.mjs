const fourier='/notes/fourier-symmetry-and-reconstruction.html';

export const reconstructionExample = `
    <details class="featured-example">
      <summary id="a-reconstruction-example">A short example: equal eigenvalues, different behavior</summary>
      <div class="example-copy">
        <p>The reconstruction question already arises for two simple linear transformations of the plane:</p>
        <div class="example-equations"><span><var>I</var>(<var>x</var>, <var>y</var>) = (<var>x</var>, <var>y</var>)</span><span><var>J</var>(<var>x</var>, <var>y</var>) = (<var>x</var> + <var>y</var>, <var>y</var>)</span></div>
        <p>Both have eigenvalues 1, 1. Yet after <var>n</var> iterations, for any integer <var>n</var> ≥ 0,</p>
        <div class="example-equations"><span><var>I</var><sup><var>n</var></sup>(0, 1) = (0, 1)</span><span><var>J</var><sup><var>n</var></sup>(0, 1) = (<var>n</var>, 1)</span></div>
        <p>Under <var>J</var>, each step adds the unchanged second coordinate to the first. The eigenvalue list has lost the information that distinguishes a fixed vector from a growing sequence. The full operator retains it.</p>
        <p>This small distinction leads to a larger reconstruction question: what must a description preserve to recover the object and its behavior?</p>
        <p class="example-continuation">Continue with the <a href="${fourier}#circle:section">circle construction and transform (§12)</a>, or go directly to the <a href="${fourier}#section-12-3">comparison (§12.3)</a>. The continuation uses Laurent-polynomial modules and two-term complexes.</p>
      </div>
    </details>`;

const sections={1:'sec:reconstruction',2:'cover:section',3:'fourier:section',10:'section-10',12:'circle:section',13:'categorical:section',14:'fermat:section',15:'estimate:section'};
const fourierRoutes=[
  {
    id:'polynomial-calculations',label:'Polynomial calculations',heading:'Through the polynomial calculations',
    sections:[[1,'§1'],[3,'§§3–9'],[2,'§2'],[10,'§10']],
    itinerary:([start,calculations,cover,radicals])=>`${start} → ${calculations}. Return to ${cover} and ${radicals} for the covering-space construction and radical choices.`,
    guide:([start,calculations,cover,radicals])=>`Begin with ${start}, then follow the character projectors and polynomial calculations in ${calculations}. These use linear algebra, polynomial rings, finite group actions, and basic Galois theory. Stop after the <a href="${fourier}#cardano:section">cubic (§5)</a>, continue through the <a href="${fourier}#section-8">two quartics (§8)</a>, or take the special high-degree family in §9. The calculations can be followed first in labelled roots; ${cover} and ${radicals} supply the covering-space construction and explain the radical choices. To see these projectors act on integrals, <a href="${fourier}#geometry:genus-two">§11</a> uses two quotient maps to split genus-two differentials into elliptic differentials. Its later Jacobian statement is an isogeny with an integral-lattice qualification.`
  },
  {
    id:'matrix-calculation',label:'Matrices and extensions',heading:'Through a matrix calculation',
    sections:[[12,'§12'],[13,'§13']],
    itinerary:([circle,categorical])=>`${circle} → ${categorical}. Begin with the circle calculation, then continue to Fourier–Mukai reconstruction.`,
    guide:([circle,categorical])=>`${circle} begins with an invertible matrix and asks what its eigenvalues forget. Its explicit transform uses modules over Laurent polynomials and two-term complexes. The calculation prepares the extension and specialization phenomena in the Fourier–Mukai theory of ${categorical}. The <a href="/#a-reconstruction-example">homepage's expandable example</a> introduces the distinction using two linear maps. For the characteristic-zero qualification on the logarithmic coordinate in §12.4, <a href="/notes/when-a-formal-logarithm-fails.html">When a Formal Logarithm Fails</a> calculates the obstruction in characteristic three.`
  },
  {
    id:'arithmetic-and-estimates',label:'Arithmetic and estimates',heading:'Through arithmetic and estimates',
    sections:[[14,'§14'],[15,'§15']],
    itinerary:([arithmetic,estimates])=>`${arithmetic} → ${estimates}. Follow the finite-field character calculation into point counts, then the exponential-sum estimate.`,
    guide:([arithmetic,estimates])=>`${arithmetic} begins with a finite-field character calculation and follows it into point counts, periods, and motives. ${estimates} explains the constant and square-root scale in a Kloosterman-sum bound. The later arguments use cohomology, ramification, and weight theorems, identified where they enter.`
  }
];
const routeSections=(route,prefix)=>route.sections.map(([number,label])=>`<a href="${prefix}#${sections[number]}">${label}</a>`);

export const fourierRouteLinks = `<nav class="reader-route-links" aria-label="Reading routes through the exposition">${fourierRoutes.map(route=>`<p><strong>${route.label}:</strong> ${route.itinerary(routeSections(route,''))}</p>`).join('')}<p class="route-guide"><a href="/mechanisms.html#fourier-routes-title">Full reading guide and background</a></p></nav>`;

const boundaryMap='/notes/what-a-boundary-map-can-prove.html';
const boundaryMapRoutes=[
  {label:'Trees, torsion, and probability',anchor:'the-starting-complex',sections:'§§1–6',itinerary:'Begin with §1 and the worked calculations in §3; return to §2 for the determinant-line and derived gluing mechanisms.',guide:'For a first pass with graphs and linear algebra, read the tree criterion in §1, then the worked determinant, resistance, and probability calculations in <a href="/notes/what-a-boundary-map-can-prove.html#the-same-boundary-map-counts-conducts-and-correlates">§3</a>. Take the matrix-tree and transfer-current formulas as given on this pass; their proofs use the determinant-line and exterior-power constructions in <a href="/notes/what-a-boundary-map-can-prove.html#a-graph-as-a-derived-gluing-problem">§2</a>. Stop after the examples, or return to those constructions for the proof mechanism. The derived gluing discussion in §2 uses complexes and exact triangles. §4 retains the integral lattice and graph Jacobian; §§5–6 extend the count and probability law to higher cells, where torsion matters.'},
  {label:'Chromatic inequalities',anchor:'when-higher-intersection-theory-proves-a-graph-inequality',sections:'§7',itinerary:'Follow coloring cohomology into a Hodge-theoretic coefficient inequality.',guide:'A hyperplane arrangement turns graph coloring into cohomology. The matroid Chow ring then supplies the intersection pairing that proves log-concavity of the reduced chromatic coefficients. The section constructs the graph-to-arrangement bridge and states the Hodge theorem used in the proof.'},
  {label:'Reconstructed symmetry',anchor:'transport-and-reconstructed-symmetry',sections:'§§8–9',itinerary:'Pass from local systems to attachment data and an explicit motivic Galois group.',guide:'Transport gives representations of the graph fundamental group. Normalization then adds component curves and their attachment points. On the chosen non-CM elliptic curve, torsion and nontorsion attachments have the same graph and graded cohomology, but motivic Galois groups of dimensions four and six. The proof develops the attachment 1-motive and uses tensor reconstruction and the comparison theorem stated in §9.'},
  {label:'Graph polynomials and periods',anchor:'the-tree-determinant-becomes-a-graph-hypersurface',sections:'§§10–11',itinerary:'Return to the tree determinant and follow it into graph hypersurfaces and period pairings.',guide:'The earlier determinant becomes a graph polynomial. Its hypersurface and coordinate boundary define the relative cohomology in which a graph integral becomes a period. Concrete examples connect the determinant calculation to the arithmetic of periods.'}
];
const boundaryMapSection=(route,prefix)=>`<a href="${prefix}#${route.anchor}">${route.sections}</a>`;
export const boundaryMapRouteLinks=`<nav class="reader-route-links" aria-label="Reading routes through the exposition">${boundaryMapRoutes.map(route=>`<p><strong>${route.label}:</strong> ${boundaryMapSection(route,'')}. ${route.itinerary}</p>`).join('')}<p class="route-guide"><a href="/mechanisms.html#boundary-map-routes-title">Full reading guide and background</a></p></nav>`;

const derivative='/notes/what-a-derivative-retains.html';
const derivativeRoutes=[
  {label:'From calculus to infinitesimal points',anchor:'rectangle',sections:'§§1–5',itinerary:'Follow strips, boundaries, and the diagonal to the familiar derivative.',guide:'Begin with calculus and the product rule. Oriented boundaries introduce degrees and signs; polynomial rings and modules enter with Kähler differentials. §5 returns to tangent probes, the chain rule, and the analytic derivative. Stop here for a complete first-order route.'},
  {label:'Arithmetic and invisible directions',anchor:'arithmetic-derivative',sections:'§§6–7',itinerary:'Change the coefficients and see what first-order measurements detect. Continue with <a href="/notes/when-a-formal-logarithm-fails.html">a formal logarithm obstruction</a> in characteristic three.',guide:'The Gaussian integers make ramification visible in a differential and its derived fiber. Frobenius and Artin–Schreier then separate topological behavior from infinitesimal behavior. Use §§4–5 first; §6 introduces a two-term complex, and §8 develops its general construction. The companion <a href="/notes/when-a-formal-logarithm-fails.html">When a Formal Logarithm Fails</a> turns successive corrections into a filtered complex and computes its first nonzero obstruction. It introduces the spectral sequence needed for the calculation.'},
  {label:'Equations, intersections, and higher operations',anchor:'cotangent-complex',sections:'§§8–11',itinerary:'Retain a constraint, test its lifts, and recover its nonlinear equation.',guide:'The cotangent complex and the node make a failed lift explicit in §§8–9; this is a useful stopping point after the elementary algebra. §10 is an optional geometric branch using projective geometry and normal bundles. §11 returns to the local equation, using graded algebra and characteristic-zero formal deformation theory to recover equations from higher operations. Equal pointwise tangent complexes alone leave those equations undecided.'},
  {label:'Spectra and functors of spaces',anchor:'spectral-differentiation',sections:'§§12–13',itinerary:'Follow coherent multiplication and gluing into two homotopical calculi.',guide:'§12 assumes stable homotopy theory and studies infinitesimal responses of commutative ring spectra, with MU and KU calculations. <a href="/notes/what-a-derivative-retains.html#goodwillie-derivatives">§13</a> studies Goodwillie approximations of functors of based spaces, using a product-cell boundary and its Whitehead attaching map. These are separate advanced branches. §14 gathers the reconstruction question and its limits.'}
];
const derivativeSection=(route,prefix)=>`<a href="${prefix}#${route.anchor}">${route.sections}</a>`;
const derivativeRouteLinks=`<nav class="reader-route-links" aria-label="Reading routes through the exposition">${derivativeRoutes.map(route=>`<p><strong>${route.label}:</strong> ${derivativeSection(route,'')}. ${route.itinerary}</p>`).join('')}<p class="route-guide"><a href="/mechanisms.html#derivative-routes-title">Full reading guide and background</a></p></nav>`;


const quotients='/notes/quotients-and-reconstruction.html';
const c6Companion='/notes/six-elements-one-comparison.html';
const c6Entry=`<p class="reader-background"><strong>A concrete first route:</strong> <a href="${c6Companion}">Six Elements, One Comparison</a> carries C₆ through the comparison rectangle, with seven exercises, worked answers, and a guide back to the general argument. Begin with subgroups and cosets.</p>`;
const c6Routes=`<nav class="reader-route-links" aria-label="Reading routes through the teaching companion"><p><strong>First pass:</strong> read <a href="#section-1">§§1–8</a> in order, following the same six elements through the constructions. Pause at each check before continuing.</p><p><strong>Try the maps:</strong> work through the <a href="#section-10">seven exercises (§10)</a>, then compare the <a href="#section-11">worked answers (§11)</a>.</p><p><strong>Continue when ready:</strong> <a href="#section-9">§9</a> computes the optional spectral comparison; <a href="#section-12">§12</a> gives prerequisites and starting points for the higher chapters.</p><p><strong>The general argument:</strong> return to <a href="${quotients}#f:begin">main §§1–4.5</a> for the exact Mal’cev framework, Jordan–Hölder, and invariance of dimension.</p></nav>`;
const quotientRoutes=[
  {label:'First reading: invariant layers',anchor:'f:begin',sections:'§§1–4.5',guide:'Invertible elementary maneuvers lead to relations, the common quotient comparison, and Jordan–Hölder for groups and modules. <a href="'+quotients+'#e:butterfly-dictionary">§4.3</a> spells out the group butterfly; <a href="'+quotients+'#e:dimension">§4.5</a> proves equality of finite basis sizes. Stop there for a complete first route. The relation notation is introduced in §§1–2.'},
  {label:'Comparison pages',anchor:'m:section',sections:'§§5–7',guide:'Section 5 supplies module tools. <a href="'+quotients+'#p:chapter">§6</a> constructs comparison pages for groups with operators, including the normality checks; <a href="'+quotients+'#s:chapter">§7</a> develops filtered module maps and pairs simple factors through actual differentials. The categorical proof is already complete. These calculations have their stated group and module hypotheses.'},
  {label:'Factors, extensions, and probes',anchor:'k:section',sections:'§§8–11',guide:'The universal additive invariant of finite-length modules retains simple-factor multiplicities. <a href="'+quotients+'#x:extensions">§9</a> keeps the maps that attach the layers. Stop after its explicit extension and lifting calculations, or continue to <a href="'+quotients+'#p:probes">nilpotent reconstruction in §10</a>. <a href="'+quotients+'#hall:chapter">§11</a> counts flags of nilpotent modules over finite fields to prove associativity of Hall multiplication. This route uses the module constructions of §5.'},
  {label:'Coherent quotients and linearization',anchor:'h:chapter',sections:'§§12–13',guide:'Retain the ways points are identified, then follow descent, coefficient categories, derived extensions, and cotangent information. This advanced continuation uses spaces, derived categories, and explicitly imported higher foundations. It does not assert an unrestricted higher Jordan–Hölder theorem. The <a href="'+quotients+'#a:dependencies">appendix</a> records hypotheses and dependency boundaries.'}
];
const quotientRouteLinks=`<nav class="reader-route-links" aria-label="Reading routes through the exposition"><p class="route-intro">Four routes, with useful stopping points:</p>${quotientRoutes.map(r=>`<p><strong>${r.label}:</strong> <a href="#${r.anchor}">${r.sections}</a>. ${r.guide}</p>`).join('')}<p class="route-guide"><a href="/mechanisms.html#quotients-and-reconstruction">Connections with the other studies</a></p></nav>`;

export function expositionReadingRoutes(slug) {
  if(slug==='six-elements-one-comparison')return `<details class="reader-route-disclosure"><summary>Ways through this companion</summary>${c6Routes}</details>`;
  const routes={'quotients-and-reconstruction':quotientRouteLinks,'fourier-symmetry-and-reconstruction':fourierRouteLinks,'what-a-boundary-map-can-prove':boundaryMapRouteLinks,'what-a-derivative-retains':derivativeRouteLinks};
  return routes[slug]?`${slug==='quotients-and-reconstruction'?c6Entry:''}<details class="reader-route-disclosure"><summary>Ways through this exposition</summary>${routes[slug]}</details>`:'';
}

const companions={
  'quotients-and-reconstruction':[
    {slug:'six-elements-one-comparison',anchor:'section-1',section:'Teaching companion',description:'Follow the same six elements through the comparison rectangle, try seven exercises with worked answers, and choose a route into the higher chapters.'},
    {slug:'fourier-symmetry-and-reconstruction',anchor:'section-12-3',section:'§12.3',description:'Compare nilpotent chain data with the split and nonsplit spectral modules that distinguish equal eigenvalue lists.'},
    {slug:'what-a-boundary-map-can-prove',anchor:'the-attachment-point-changes-the-motivic-symmetry-group',section:'§9.3',description:'Follow attachment data into a geometric reconstruction problem, under the stated Hodge and motivic comparison hypotheses.'},
    {slug:'what-a-derivative-retains',anchor:'cotangent-complex',section:'§8',description:'Continue the cotangent construction through an explicit equation and its lifting obstructions.'},
    {slug:'when-a-formal-logarithm-fails',anchor:'second-differential',section:'The second differential',description:'Work through a shorter nonzero spectral differential arising from a failed cubic correction in characteristic three. This is a different filtered complex from the composition-series comparison.'}
  ],
  'when-a-formal-logarithm-fails':[
    {slug:'what-a-derivative-retains',anchor:'frobenius-and-artin-schreier',section:'§7',description:'Recover the distinction between higher Taylor coefficients and homological information about constraints.'},
    {slug:'fourier-symmetry-and-reconstruction',anchor:'section-12-4',section:'§12.4',description:'See the logarithmic coordinate turn tensor products into addition in characteristic zero.'},
    {slug:'what-a-boundary-map-can-prove',anchor:'removing-an-edge-produces-an-obstruction-map',section:'§2.2',description:'Compare the lifting tower with a connecting map that measures the obstruction to gluing across an edge.'}
  ],
  'fourier-symmetry-and-reconstruction':[
    {slug:'quotients-and-reconstruction',anchor:'p:probes',section:'§10',description:'Recover nilpotent chain lengths from spaces of maps, with the chain-basis construction proved explicitly. §§8–9 first distinguish factor multiplicities from extension data.'},
    {slug:'what-a-boundary-map-can-prove',anchor:'symmetry-turns-eigenvalues-into-concrete-counts',section:'§3.3',description:'Apply the finite abelian character projectors to cube and cycle Laplacians, then turn their eigenvalues into spanning-tree counts.'},
    {slug:'what-a-derivative-retains',anchor:'arithmetic-derivative',section:'§6',description:'Compare the exceptional derived fiber of the circle transform with a cotangent complex at a ramified prime. Both computations retain a two-term complex before specialization.'}
  ],
  'what-a-boundary-map-can-prove':[
    {slug:'fourier-symmetry-and-reconstruction',anchor:'circle:section',section:'§12',description:'Compare the graph’s two-term holonomy complex with the circle transform, where nilpotent monodromy distinguishes equal eigenvalues.'},
    {slug:'what-a-derivative-retains',anchor:'node-and-smoothing',section:'§9',description:'Study the local node and its smoothing before returning to normalization and attachment data in §9 here. Local infinitesimal behavior and global gluing retain different information.'}
  ],
  'what-a-derivative-retains':[
    {slug:'quotients-and-reconstruction',anchor:'section-13-6',section:'§13.6',description:'See cotangent objects in the broader passage from quotients to coefficient categories and derived extensions, with the higher foundations distinguished from the ordinary comparison.'},
    {slug:'fourier-symmetry-and-reconstruction',anchor:'section-12-5',section:'§12.5',description:'See a derived fiber recover cohomology lost by ordinary specialization of the circle transform. Its Tor calculation provides another use of the operation introduced here.'},
    {slug:'what-a-boundary-map-can-prove',anchor:'the-normalization-triangle',section:'§9.1',description:'Continue from the local node to a global nodal curve. Normalization retains its component curves and attachment maps; §9.3 then shows what an attachment extension changes.'}
  ]
};

export function companionReadingLinks(slug,notes,esc) {
  if(!companions[slug])return '';
  return `<section class="reader-related" aria-label="Related expositions"><h2>${slug==='when-a-formal-logarithm-fails'?'Related calculations':'Continue across the studies'}</h2>${companions[slug].map(item=>{
    const note=notes.find(n=>n.slug===item.slug);
    if(!note)throw Error(`Missing companion exposition: ${item.slug}`);
    return `<div><h3><a href="${note.page}#${item.anchor}">${esc(note.title)} · ${item.section}</a></h3><p>${esc(item.description)}</p></div>`;
  }).join('')}<p><a href="/mechanisms.html#connected-expositions">How the four studies connect</a></p></section>`;
}

export const connectedExpositions=`
    <section class="reading-path connected-expositions" aria-labelledby="connected-expositions"><h2 id="connected-expositions">Four studies of retained structure</h2>
      <p>A root algebra, a graph complex, an infinitesimal probe, and a quotient comparison turn familiar data into objects with operations. The four expositions ask what a simpler description retains, what it leaves undecided, and which additional structure makes reconstruction possible. Each has an independent entry point.</p>
      <ul class="reading-starts">
        <li><strong>Start with calculus.</strong> <a href="${derivative}#rectangle"><em>What a Derivative Retains</em>, §§1–5</a> follows rectangle strips and oriented boundaries to Kähler differentials and tangent probes. Calculus, polynomial rings, and modules suffice for this first-order route; §5 is a useful stopping point.</li>
        <li><strong>Start with graphs.</strong> <a href="${boundaryMap}#the-starting-complex"><em>What a Boundary Map Can Prove</em>, §1</a> begins with the tree criterion. Continue to <a href="${boundaryMap}#the-same-boundary-map-counts-conducts-and-correlates">§3</a> for worked counts, resistance, and probabilities using graphs and linear algebra, taking the matrix-tree and transfer-current formulas as given on a first pass. Return to §2 for the determinant-line and exterior-power constructions used in their proofs.</li>
        <li><strong>Start with polynomials.</strong> <a href="${fourier}#sec:reconstruction"><em>Fourier, Symmetry, and Reconstruction</em>, §1</a> poses the root-reconstruction problem; <a href="${fourier}#fourier:section">§§3–9</a> develop character projectors and explicit radicals. This route uses linear algebra, polynomial rings, finite group actions, and basic Galois theory. §§2 and 10 supply the cover and radical-choice geometry.</li>
        <li><strong>Start with algebra.</strong> <a href="${quotients}#f:begin"><em>Quotients, Refinement, and Reconstruction</em>, §§1–4.5</a> begins with elementary maneuvers and constructs one quotient comparison for groups and modules. It proves Jordan–Hölder and equality of finite basis sizes. Begin with groups, vector spaces, and their maps; §4.5 is a useful stopping point. The later routes study extensions, nilpotent probes, and coherent quotients.</li>
      </ul>
      <h3>Connections worth following</h3>
      <div id="projectors-and-counts"><h4>One projector operation, two calculations</h4><p><a href="${fourier}#fourier:section">Fourier §3</a> separates root coordinates by finite abelian character projectors. <a href="${boundaryMap}#symmetry-turns-eigenvalues-into-concrete-counts">Boundary Map §3.3</a> uses those projectors for cube, cycle, and periodic-grid Laplacians. Multiplication imposes compatible radicals in the first setting; the matrix-tree determinant converts the Laplacian spectrum into counts in the second.</p></div>
      <div id="complexes-and-fibres"><h4>Keep the complex through restriction</h4><p><a href="${boundaryMap}#a-graph-as-a-derived-gluing-problem">Boundary Map §2</a> retains solutions and obstructions to gluing in a complex. <a href="${fourier}#section-12-5">Fourier §12.5</a> computes a derived fiber of the circle transform; <a href="${derivative}#arithmetic-derivative">Derivative §6</a> computes one at a ramified prime. Derived restriction retains cohomology that ordinary specialization loses. <a href="${derivative}#derived-self-intersections">Derivative §10</a> continues the derived-tensor calculation into self-intersection. The incidence, transform, and cotangent differentials act on different objects.</p></div>
      <div id="beyond-invariants"><h4>Equal invariants can leave different structures</h4><p>In <a href="${fourier}#section-12-3">Fourier §12.3</a>, equal eigenvalues conceal nilpotent monodromy. In <a href="${boundaryMap}#the-attachment-point-changes-the-motivic-symmetry-group">Boundary Map §9.3</a>, the same graph and weight-graded cohomology conceal an attachment extension. In <a href="${derivative}#higher-operations">Derivative §11</a>, equal pointwise tangent complexes conceal different higher deformation operations. The attachment extension lives in mixed-Hodge or motivic structure; the higher operations specify a formal deformation problem. Each section states the category and comparison hypotheses its reconstruction uses.</p><p><a href="${quotients}#x:extensions">Quotients §9</a> keeps extension maps that a simple-factor list forgets, and <a href="${quotients}#p:probes">§10</a> recovers nilpotent chain lengths from spaces of maps. These give an algebraic continuation of the equal-eigenvalue example in Fourier §12.3. The attachment extensions and deformation operations in the other studies live in different categories and retain different data.</p></div>
      <p class="advanced-reading">The advanced branches use different further backgrounds: algebraic geometry for derived intersections and bundles; Hodge theory and motives for the geometric branches; étale cohomology for finite-field counts and estimates; graded algebra for formal deformation theory; and stable homotopy theory for spectral calculations. <a href="${fourier}#higher:section">Fourier §16</a> constructs spectral duals and localized Galois classifications; <a href="${derivative}#spectral-differentiation">Derivative §12</a> measures infinitesimal responses of commutative ring spectra. Their coherent coefficients serve different questions and hypotheses.</p>
      <p class="text-links"><a href="#fourier-routes-title">Fourier routes</a><a href="#boundary-map-routes-title">Boundary Map routes</a><a href="#derivative-routes-title">Derivative routes</a><a href="#quotients-and-reconstruction">Quotients routes</a></p>
    </section>`;

export const entryReadingPaths = `
    <section class="reading-path exposition-routes" aria-labelledby="fourier-routes-title"><h2 id="fourier-routes-title">Ways through <em>Fourier, Symmetry, and Reconstruction</em></h2>
      ${fourierRoutes.map(route=>`<div id="${route.id}"><h3>${route.heading}</h3><p>${route.guide(routeSections(route,fourier))}</p></div>`).join('\n      ')}
    </section>
    <section class="reading-path exposition-routes" aria-labelledby="boundary-map-routes-title"><h2 id="boundary-map-routes-title">Ways through <em>What a Boundary Map Can Prove</em></h2>
      ${boundaryMapRoutes.map(route=>`<div><h3>${route.label}</h3><p>${boundaryMapSection(route,boundaryMap)}. ${route.guide}</p></div>`).join('\n      ')}
    </section>
    <section class="reading-path exposition-routes" aria-labelledby="derivative-routes-title"><h2 id="derivative-routes-title">Ways through <em>What a Derivative Retains</em></h2>
      ${derivativeRoutes.map(route=>`<div><h3>${route.label}</h3><p>${derivativeSection(route,derivative)}. ${route.guide}</p></div>`).join('\n      ')}
    </section>`;
