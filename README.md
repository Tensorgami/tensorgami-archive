# Tensorgami public source archive

Writing, mathematical expositions, essays, research records, and other public material by Henry Shin, preserved from [Tensorgami](https://tensorgami.com).

This source snapshot preserves the public website and the editable public manuscripts available with it. The archive includes six current essays, thirteen current mathematical expositions, one problem set, two superseded essay editions, a retained predecessor exposition, six Lean projects, ten research records, and the public interests pages and images. Research paper records point to arXiv and, where applicable, the journal and correction; their paper bodies are hosted there.

The current publication dates and revision descriptions remain as stated by the source. The archival deposit date records when this snapshot was preserved; it does not authenticate an earlier date for the same bytes or establish originality relative to earlier work.

## Read and rebuild

The complete generated website is in `dist/`. Run these commands with a recent Node.js version:

```sh
npm run build
npm run check
npm run preview
```

Open the local address printed by the preview server. The website uses absolute paths, so serving the directory is more reliable than opening HTML files directly. The build has no npm package dependencies. It copies retained documents and assets and renders the website from `content/` and `scripts/`. It does not compile the mathematical PDFs or re-render the already typeset article bodies.

The formal-logarithm companion retains its Markdown, HTML, standalone TeX and PDF editions, and its conversion tools plus edition hashes in `content/expositions/when-a-formal-logarithm-fails-source/`. The conversion tools have portable dependency lookup in this public snapshot; machine-specific fallback paths have been removed. Their README lists the separate package, XeLaTeX and font requirements.

Editable mathematics is in `public/tex/`, formalizations in `public/formalizations/`, essay manuscripts in `content/essays/`, and the derivative manuscript in `assets/expositions/`. The derivative PDF's two TeX sources and edition metadata are in `content/expositions/what-a-derivative-retains-pdf/`. Its README describes the separate XeLaTeX and font requirements. Each Lean project includes its own toolchain, dependency manifest, and build instructions. Other retained PDFs are supplied as their published files; three older expositions have no complete editable TeX source in this collection.

The historical essay notices retain their public downloads and section mappings. The predecessor tree exposition retains its PDF and TeX; its former web route redirects to the expanded boundary-map exposition. Historical source bodies are preserved for inspection where present.

## Scope and rights

This archive begins with a clean public snapshot. Internal maintenance records, unpublished drafts and personal collections, private infrastructure, and the earlier local Git history are not included. Build metadata and inactive template branches have been reduced accordingly. All generated public files are verified against the source snapshot used for this archive.

The writing, site source, images, metadata, and formalizations remain subject to [the existing rights notice](public/LICENSE.md). No new general reuse license is granted. MathJax's separate [Apache 2.0 license](assets/mathjax-LICENSE.txt) is retained, and third-party artwork and interface elements remain the property of their owners.

Website: https://tensorgami.com  
Author: Henry Shin  
ORCID: https://orcid.org/0009-0000-6453-6865  
Correspondence: hkshin@alumni.harvard.edu

## Archival edition 2026-10-21.1

[Immutable release and publication record](https://github.com/Tensorgami/tensorgami-archive/releases/tag/2026-10-21.1) · [Previous fixed edition](https://github.com/Tensorgami/tensorgami-archive/releases/tag/2026-10-20.1)

This edition preserves the complete version-109 public website: 141 served files,
including 39 HTML pages and 18 PDFs, plus the available editable public source.
Its 23 individual work packages include *When a Formal Logarithm Fails* and the
updated Derivative and Fourier editions. The complete source and site ZIPs,
`EDITION.json`, `WORKS.json` and `SHA256SUMS.txt` are attached to the release.

`MANIFEST.sha256` covers every repository snapshot file except itself. Each work
package includes its own file hashes. The frozen release preserves the Archived
editions page as it appeared on the current site; that page still describes the
previous edition. This README and `archive/works.json` identify this new release.
The earlier release, tag and assets remain preserved. The main branch may advance;
cite the specific release or tag for exact-edition evidence.

The edition date uses UTC. Public availability is recorded by GitHub's release
publication time and signed attestation; dates printed in manuscripts are separate.
Immutability protects the tag and attached assets, not editable release notes.

Whole-corpus citation: Henry Shin, *Tensorgami: complete public corpus snapshot*,
archival edition 2026-10-21.1, https://github.com/Tensorgami/tensorgami-archive/releases/tag/2026-10-21.1.

### Individual works

- [Fourier, Symmetry, and Reconstruction](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/fourier-symmetry-and-reconstruction-2026-10-21.1.zip)
- [What a Boundary Map Can Prove](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/what-a-boundary-map-can-prove-2026-10-21.1.zip)
- [What a Derivative Retains](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/what-a-derivative-retains-2026-10-21.1.zip)
- [When a Formal Logarithm Fails](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/when-a-formal-logarithm-fails-2026-10-21.1.zip)
- [A Weighting Argument for Pointwise Convergence to Convergence in Measure](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/pointwise-weighting-convergence-in-measure-2026-10-21.1.zip)
- [IBM Ponder This July 2010](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/ibm-ponder-this-2010-2026-10-21.1.zip)
- [Divisibility of Separated Polynomials](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/separated-polynomial-divisibility-2026-10-21.1.zip)
- [A Galois-Theoretic and Frobenius-Descent Viewpoint on a Polynomial Composition Law](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/galois-frobenius-composition-law-2026-10-21.1.zip)
- [Normality, Coherent Extension, Tensor Operations, and Affineness](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/hartshorne-ii-5-14-18-2026-10-21.1.zip)
- [Extracting the First Prime Greater than m](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/extracting-first-prime-2026-10-21.1.zip)
- [A Note on Disjoint Decompositions of [0,1) into Closed Sets](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/disjoint-decompositions-2026-10-21.1.zip)
- [Lebesgue's Criterion for Riemann Integrability](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/lebesgue-riemann-integrability-2026-10-21.1.zip)
- [Products Preserve Riemann Integrability](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/products-preserve-riemann-integrability-2026-10-21.1.zip)
- [Selected Problems in Discrete Mathematics and Analysis](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/selected-problems-discrete-mathematics-analysis-2026-10-21.1.zip)
- [Mathematical Life in the Age of AI](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/mathematical-life-in-the-age-of-ai-2026-10-21.1.zip)
- [When Accountability Stops Being Reciprocal](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/when-accountability-stops-being-reciprocal-2026-10-21.1.zip)
- [The Performance of Depth](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/the-performance-of-depth-2026-10-21.1.zip)
- [What a New Proof Makes Possible](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/what-a-new-proof-makes-possible-2026-10-21.1.zip)
- [When a Description Becomes a Verdict](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/when-a-description-becomes-a-verdict-2026-10-21.1.zip)
- [The Authority of a Vision](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/the-authority-of-a-vision-2026-10-21.1.zip)
- [Mathematical Understanding in the Age of AI](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/mathematical-understanding-in-the-age-of-ai-2026-10-21.1.zip)
- [The Culture of Mathematical Judgment](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/the-culture-of-mathematical-judgment-2026-10-21.1.zip)
- [A Tree Is a Discrete Poincaré Lemma](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-21.1/a-tree-is-a-discrete-poincare-lemma-2026-10-21.1.zip)

### Verify this edition

```sh
gh release verify 2026-10-21.1 --repo Tensorgami/tensorgami-archive
gh release verify-asset 2026-10-21.1 tensorgami-source-2026-10-21.1.zip --repo Tensorgami/tensorgami-archive
```

The source ZIP named above is an explicit attached asset. It is distinct from
GitHub's automatically generated source downloads. The signed record binds the
commit and attached asset hashes. It does not establish originality or exclusive
priority against earlier literature.
