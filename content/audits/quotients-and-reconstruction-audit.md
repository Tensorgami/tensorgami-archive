# Notes on proofs, dependencies, and revisions

These notes accompany [Quotients, Refinement, and Reconstruction](https://tensorgami.com/notes/quotients-and-reconstruction.html). They collect a few points about the proofs that are useful when moving between the elementary examples, the categorical comparison, and the higher chapters. For a first reading, [Six Elements, One Comparison](https://tensorgami.com/notes/six-elements-one-comparison.html) follows the argument through the cyclic group of order six.

## Elementary maneuvers and associativity
In [§1.1](https://tensorgami.com/notes/quotients-and-reconstruction.html#section-1-1), solving *a = b + c* for *b* means applying the inverse of translation by *c*. Translation is a bijection of underlying sets; it need not preserve zero. Distributing a scalar over a difference uses a different property: scalar multiplication preserves addition. Keeping invertibility and preservation distinct explains which rearrangements remain available when the objects change.

Associativity has several roles in the exposition. For the original group operation it is an axiom, expressed as equality of two composite maps. For composition of relations it is a theorem: either bracketing takes the image of the same triples of matching witnesses. For Hall multiplication, either bracketing counts the same flags. The diagrams organize these arguments, but the common data and the maps out of them establish the equality.

The categorical witness calculations use [regular-epimorphism covers](https://tensorgami.com/notes/quotients-and-reconstruction.html#f:local-calculus). A witness may exist only after such a cover; equalities then descend because the cover is an epimorphism. This is why the element-like notation does not require global elements to detect maps.

## Why supports and quotient maps stay visible
A relation from *X* to *Y* may involve only part of either object. Its supports record those parts. In [the comparison theorem](https://tensorgami.com/notes/quotients-and-reconstruction.html#d:comparison), two supported inputs are identified when they share an output, and two supported outputs are identified when they share an input. The Mal’cev condition makes these equivalence relations; exactness supplies their quotient objects.

The relation need not determine a map from the input support to the output support. An input can have several related outputs. After passing to the two quotients, the ambiguity disappears: the relation determines a canonical isomorphism. This is the comparison used in every cell of the refinement rectangle.

[Saturation](https://tensorgami.com/notes/quotients-and-reconstruction.html#d:saturated-descent) answers the next question: when does a relation descend through specified quotient maps? Its membership must be unchanged when either coordinate is replaced by an equivalent one. Pulling a relation back from the quotients and pushing a saturated relation down are inverse operations. Applied to a series, this ensures that an inserted refinement really comes from the original quotient.

This compatibility matters in the general setting. A kernel alone need not determine the quotient map. The argument therefore retains the chosen quotient and its full kernel pair. The classical exact Mal’cev refinement construction is described in [Knop, Appendix B2](https://arxiv.org/pdf/math/0610552).

## From refinement to invariant basis size
[The rectangle](https://tensorgami.com/notes/quotients-and-reconstruction.html#section-3-3) gives a refinement of each supplied series and matches their factors. It does not give one chain containing both original chains: two distinct lines in a plane already prevent that.

Simplicity then removes the extra freedom. A nonzero object is quotient-simple when every regular epimorphism out of it is an isomorphism or has zero codomain. Every finite normal series of such an object has exactly one nonzero factor, isomorphic to that object. Applying this observation to the matched refinements proves Jordan–Hölder for two given finite composition series. Their existence is a separate question.

For [dimension](https://tensorgami.com/notes/quotients-and-reconstruction.html#e:dimension), each given basis supplies a flag of successive spans. The map sending a scalar *a* to the class of *avᵢ* identifies each successive quotient with the field: spanning gives surjectivity, and independence gives injectivity. The field is simple as a module because any nonzero scalar is invertible. Jordan–Hölder therefore compares the two basis lengths before dimension has been defined. The later finite-dimensional tools use this result and do not enter its proof.

## What the pages and the later invariants add
[The module spectral argument](https://tensorgami.com/notes/quotients-and-reconstruction.html#section-7-4) puts two composition series on opposite ends of a filtered identity map. A nonzero differential between surviving simple entries is an isomorphism, so it pairs and removes them. The finite-filtration calculation eventually leaves zero, pairing every original factor. Its convergence proof uses kernels, images, and quotient maps, without counting dimensions or assuming factor multiplicities are already invariant. For the general filtered-complex construction, see the [Stacks Project](https://stacks.math.columbia.edu/tag/012K).

The nonabelian page calculation has a narrower scope. It uses composition-series input and proves the required normality of differential images. It does not supply a spectral sequence for arbitrary filtered groups.

Factor lists leave attachments unresolved. [Marked extensions](https://tensorgami.com/notes/quotients-and-reconstruction.html#section-9) retain the endpoint maps; the nilpotent probes of [Chapter 10](https://tensorgami.com/notes/quotients-and-reconstruction.html#section-10) recover information from spaces of maps; Hall multiplication counts actual subobjects. These are different records of a filtered object. An invariant additive on short exact sequences gives the same value for an extension and the split extension with the same endpoints.

## Reading the higher chapters
[Chapter 12](https://tensorgami.com/notes/quotients-and-reconstruction.html#section-12) asks what a quotient retains when identifications have automorphisms and coherence data. Action groupoids retain stabilizers and transport. In spaces or another specified ∞-topos, effective groupoid quotients and universal colimits make these quotient descriptions compatible with change of base. These foundations come from [Higher Topos Theory](https://www.math.ias.edu/~lurie/papers/HTT.pdf); the category of algebraic theory models is not assumed to be an ∞-topos.

[Chapter 13](https://tensorgami.com/notes/quotients-and-reconstruction.html#section-13) develops linear coefficients over a retained base, derived extensions, and cotangent calculations, using the stated foundations from [Higher Algebra](https://www.math.ias.edu/~lurie/papers/HA.pdf) and derived-category theory. These inputs support the later deductions; they are not premises of the ordinary Jordan–Hölder proof. A possible obstruction group is a target in which an obstruction may lie, not evidence that a particular obstruction is nonzero.

Higher normality likewise retains specified quotient and compatibility data; see [Beardsley and Fox](https://arxiv.org/html/2407.21210v3). The exposition makes no unrestricted higher Jordan–Hölder claim. Its higher chapters study information beyond the ordinary factor list.

## Revisions
On 22 October 2026, explanatory passages were expanded to describe the scaled shear in §1.1, distinguish the representative correction from the canonical page map in §7.2, and specify the ambient assumptions in §12.4. The web text and PDF contain these clarifications.

A subsequent web correction repaired the inclusion arrows in the normal-series formula of Definition 3.1, where unsupported commands had appeared as text. The mathematical text, PDF, and TeX sources were unaffected.

This page replaces the audit report referenced in Appendix A.5 of the PDF; the original report is retained in the author’s local records. The exposition and its downloadable files are unchanged.
