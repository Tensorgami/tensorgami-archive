# Tensorgami public archive

Henry Shin's public mathematical writing, website and available sources, preserved from [Tensorgami](https://tensorgami.com).

[Immutable edition 2026-10-29.1](https://github.com/Tensorgami/tensorgami-archive/releases/tag/2026-10-29.1) · [Previous edition](https://github.com/Tensorgami/tensorgami-archive/releases/tag/2026-10-23.2) · [Site ZIP](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/tensorgami-site-2026-10-29.1.zip) · [Public source ZIP](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/tensorgami-source-2026-10-29.1.zip) · [Checksums](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/SHA256SUMS.txt)

This edition preserves the complete current public website, Sites version 128: 44 HTML pages, 23 PDFs, eight source or Lean ZIP downloads, seven current essays, 11 research records, and public interests pages and images. The release also supplies 27 individual work packages and the available editable manuscripts and six Lean projects. All six earlier immutable releases remain intact.

## Twisted cohomology

*Finite generation of permutation twisted cohomology* is included as the exact 47-page Zenodo v2 PDF, together with its Tensorgami research page and version metadata.

- [Paper PDF](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/finite-generation-permutation-twisted-cohomology-v2.pdf) · [Version DOI](https://doi.org/10.5281/zenodo.23749631) · [Tensorgami page](https://tensorgami.com/papers/finite-generation-permutation-twisted-cohomology)
- SHA-256: `21f2e427c9ae38320d6f4c0c4d385dfe58c601931f8fa5dc022583e6a8346caf` (606,692 bytes).
- The earlier [v1 DOI](https://doi.org/10.5281/zenodo.23697586) and [immutable v1 release](https://github.com/Tensorgami/finite-generation-permutation-twisted-cohomology/releases/tag/v1.0.0) remain distinct earlier records. This archive preserves v2; it does not reset those publication records.

Other research papers remain linked to their authoritative hosts where their manuscripts are not part of the website. No corresponding editable TeX source is claimed for the v2 paper.

## Read and rebuild

The site ZIP contains the preserved website in `site/`. The source ZIP and repository contain build inputs and `dist/`. Use a recent Node.js version:

```sh
npm run build
npm run check
npm run preview
```

The site build has no npm package dependencies. It renders pages and copies retained assets; it does not regenerate PDFs, re-typeset mathematical fragments or compile Lean projects. Converters have their separate documented MathJax, Python, TeX and font requirements. The sanitized source rebuild reproduces all 189 served build files exactly. The live host may inject its challenge script into HTML and normalize historical alias URLs; `archive/verification.json` distinguishes raw live responses, that identified hosting insertion, and the preserved redirect stubs.

Editable sources are in `public/tex/`, `content/expositions/`, `content/essays/` and `public/formalizations/`. Some older PDFs lack complete editable source. The previous Quotients README corrections are carried forward in the loose native README and `archive/reader-sources/quotients-and-reconstruction/`. The [reader-source ZIP](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/Quotients_Refinement_and_Reconstruction-archival-source-2026-10-29.1.zip) differs from the [original website ZIP](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/Quotients_Refinement_and_Reconstruction.zip) only in its README; all 16 TeX inputs are identical. The original website ZIP remains unchanged in the site, source and work package.

The website's Archived editions page is preserved as it appears in version 128, including its earlier edition references. This README identifies the new GitHub edition. No website edit or redeployment was performed for this archive.

## Verification and citation

`MANIFEST.sha256` covers every repository file except itself. `SHA256SUMS.txt` covers every attached asset except itself. The release includes explicit site and source ZIP assets that can be cryptographically verified:

```sh
gh release verify 2026-10-29.1 --repo Tensorgami/tensorgami-archive
gh release verify-asset 2026-10-29.1 tensorgami-source-2026-10-29.1.zip --repo Tensorgami/tensorgami-archive
gh release verify-asset 2026-10-29.1 finite-generation-permutation-twisted-cohomology-v2.pdf --repo Tensorgami/tensorgami-archive
```

GitHub's immutable release protects its tag and uploaded assets. Its signed attestation binds their hashes to the release and commit and supplies a verified timestamp; the title and notes remain editable. GitHub's `published_at` is the public release time. Edition dates use UTC. These records document availability of identified files, without independently establishing exclusive priority, originality or mathematical correctness.

Whole-corpus citation: Henry Shin, *Tensorgami: complete public corpus snapshot*, archival edition 2026-10-29.1, https://github.com/Tensorgami/tensorgami-archive/releases/tag/2026-10-29.1. For the paper, cite its version-specific DOI. `archive/works.json` records individual works and their packages.

## Scope and rights

This public snapshot excludes private canonical Git history, internal maintenance and continuity records, the former private full audit, unpublished material, hidden personal collections and metadata, credentials and runtime caches. Source-only filters, portable dependency lookups and archival documentation changes are recorded in `archive/source-adaptations.json`; generated website files are preserved exactly.

Existing [rights notices](LICENSE.md) and the separate [MathJax license](assets/mathjax-LICENSE.txt) remain in force. No new general reuse license is granted. Third-party artwork and interfaces remain the property of their owners.

Author: Henry Shin · [ORCID](https://orcid.org/0009-0000-6453-6865) · hkshin@alumni.harvard.edu

## Individual work packages

- [Fourier, Symmetry, and Reconstruction](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/fourier-symmetry-and-reconstruction-2026-10-29.1.zip)
- [What a Boundary Map Can Prove](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/what-a-boundary-map-can-prove-2026-10-29.1.zip)
- [What a Derivative Retains](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/what-a-derivative-retains-2026-10-29.1.zip)
- [When a Formal Logarithm Fails](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/when-a-formal-logarithm-fails-2026-10-29.1.zip)
- [Quotients, Refinement, and Reconstruction](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/quotients-and-reconstruction-2026-10-29.1.zip)
- [Six Elements, One Comparison](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/six-elements-one-comparison-2026-10-29.1.zip)
- [A Weighting Argument for Pointwise Convergence to Convergence in Measure](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/pointwise-weighting-convergence-in-measure-2026-10-29.1.zip)
- [IBM Ponder This July 2010](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/ibm-ponder-this-2010-2026-10-29.1.zip)
- [Divisibility of Separated Polynomials](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/separated-polynomial-divisibility-2026-10-29.1.zip)
- [A Galois-Theoretic and Frobenius-Descent Viewpoint on a Polynomial Composition Law](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/galois-frobenius-composition-law-2026-10-29.1.zip)
- [Normality, Coherent Extension, Tensor Operations, and Affineness](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/hartshorne-ii-5-14-18-2026-10-29.1.zip)
- [Extracting the First Prime Greater than m](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/extracting-first-prime-2026-10-29.1.zip)
- [A Note on Disjoint Decompositions of \[0,1) into Closed Sets](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/disjoint-decompositions-2026-10-29.1.zip)
- [Lebesgue's Criterion for Riemann Integrability](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/lebesgue-riemann-integrability-2026-10-29.1.zip)
- [Products Preserve Riemann Integrability](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/products-preserve-riemann-integrability-2026-10-29.1.zip)
- [Selected Problems in Discrete Mathematics and Analysis](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/selected-problems-discrete-mathematics-analysis-2026-10-29.1.zip)
- [Mathematical Life in the Age of AI](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/mathematical-life-in-the-age-of-ai-2026-10-29.1.zip)
- [When Accountability Stops Being Reciprocal](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/when-accountability-stops-being-reciprocal-2026-10-29.1.zip)
- [The Performance of Depth](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/the-performance-of-depth-2026-10-29.1.zip)
- [What a New Proof Makes Possible](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/what-a-new-proof-makes-possible-2026-10-29.1.zip)
- [When a Description Becomes a Verdict](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/when-a-description-becomes-a-verdict-2026-10-29.1.zip)
- [The Authority of a Vision](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/the-authority-of-a-vision-2026-10-29.1.zip)
- [What Sustains Mathematical Expertise](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/what-sustains-mathematical-expertise-2026-10-29.1.zip)
- [Finite generation of permutation twisted cohomology](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/finite-generation-permutation-twisted-cohomology-2026-10-29.1.zip)
- [Mathematical Understanding in the Age of AI](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/mathematical-understanding-in-the-age-of-ai-2026-10-29.1.zip)
- [The Culture of Mathematical Judgment](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/the-culture-of-mathematical-judgment-2026-10-29.1.zip)
- [A Tree Is a Discrete Poincaré Lemma](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-29.1/a-tree-is-a-discrete-poincare-lemma-2026-10-29.1.zip)
