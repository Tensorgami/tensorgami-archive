# Tensorgami public source archive

Writing, mathematical expositions, essays, research records, and other public material by Henry Shin, preserved from [Tensorgami](https://tensorgami.com).

This source snapshot preserves the public website and the editable public manuscripts available with it. The archive includes six current essays, twelve current mathematical expositions, one problem set, two superseded essay editions, a retained predecessor exposition, six Lean projects, ten research records, and the public interests pages and images. Research paper records point to arXiv and, where applicable, the journal and correction; their paper bodies are hosted there.

The current publication dates and revision descriptions remain as stated by the source. The archival deposit date records when this snapshot was preserved; it does not authenticate an earlier date for the same bytes or establish originality relative to earlier work.

## Read and rebuild

The complete generated website is in `dist/`. Run these commands with a recent Node.js version:

```sh
npm run build
npm run check
npm run preview
```

Open the local address printed by the preview server. The website uses absolute paths, so serving the directory is more reliable than opening HTML files directly. The build has no npm package dependencies. It copies retained documents and assets and renders the website from `content/` and `scripts/`. It does not compile the mathematical PDFs or re-render the already typeset article bodies.

Editable mathematics is in `public/tex/`, formalizations in `public/formalizations/`, essay manuscripts in `content/essays/`, and the derivative manuscript in `assets/expositions/`. The derivative PDF's two TeX sources and edition metadata are in `content/expositions/what-a-derivative-retains-pdf/`. Its README describes the separate XeLaTeX and font requirements. Each Lean project includes its own toolchain, dependency manifest, and build instructions. Other retained PDFs are supplied as their published files; three older expositions have no complete editable TeX source in this collection.

The historical essay notices retain their public downloads and section mappings. The predecessor tree exposition retains its PDF and TeX; its former web route redirects to the expanded boundary-map exposition. Historical source bodies are preserved for inspection where present.

## Scope and rights

This archive begins with a clean public snapshot. Internal maintenance records, unpublished drafts and personal collections, private infrastructure, and the earlier local Git history are not included. Build metadata and inactive template branches have been reduced accordingly. All generated public files are verified against the source snapshot used for this archive.

The writing, site source, images, metadata, and formalizations remain subject to [the existing rights notice](public/LICENSE.md). No new general reuse license is granted. MathJax's separate [Apache 2.0 license](assets/mathjax-LICENSE.txt) is retained, and third-party artwork and interface elements remain the property of their owners.

Website: https://tensorgami.com  
Author: Henry Shin  
ORCID: https://orcid.org/0009-0000-6453-6865  
Correspondence: hkshin@alumni.harvard.edu


## Archival edition 2026-10-20.1

[Published release and publication timestamp](https://github.com/Tensorgami/tensorgami-archive/releases/tag/2026-10-20.1) · [Website](https://tensorgami.com)

The release contains the complete site ZIP, the complete reviewed source ZIP, and 22 individual work ZIPs.
The attached `SHA256SUMS.txt` identifies the exact release files. Within this repository,
`MANIFEST.sha256` identifies all snapshot files except that manifest itself.
GitHub's immutable release locks the associated commit/tag and attached files; the
release title and notes are not themselves immutable. The repository's working
branch may later advance, so cite this edition's tag or release.

For the whole snapshot: Henry Shin, *Tensorgami: complete public corpus snapshot*,
archival edition 2026-10-20.1, https://github.com/Tensorgami/tensorgami-archive/releases/tag/2026-10-20.1.
Individual citations and file hashes are in `archive/works.json`.
The archive date is distinct from any earlier date transcribed from the manuscripts.

The independent live comparison covers all 136 public files: 99 non-HTML files
matched exactly, and all 37 authored HTML byte sequences matched after removing
only the observed hosting-provider script. Two additional zero-byte build
placeholders are retained in the source. Details are in `archive/verification.json`.

### Individual works

- [Fourier, Symmetry, and Reconstruction](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/fourier-symmetry-and-reconstruction-archive-1-2026-10-20.zip)
- [What a Boundary Map Can Prove](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/what-a-boundary-map-can-prove-archive-1-2026-10-20.zip)
- [What a Derivative Retains](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/what-a-derivative-retains-archive-1-2026-10-20.zip)
- [A Weighting Argument for Pointwise Convergence to Convergence in Measure](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/pointwise-weighting-convergence-in-measure-archive-1-2026-10-20.zip)
- [IBM Ponder This July 2010](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/ibm-ponder-this-2010-archive-1-2026-10-20.zip)
- [Divisibility of Separated Polynomials](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/separated-polynomial-divisibility-archive-1-2026-10-20.zip)
- [A Galois-Theoretic and Frobenius-Descent Viewpoint on a Polynomial Composition Law](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/galois-frobenius-composition-law-archive-1-2026-10-20.zip)
- [Normality, Coherent Extension, Tensor Operations, and Affineness](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/hartshorne-ii-5-14-18-archive-1-2026-10-20.zip)
- [Extracting the First Prime Greater than m](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/extracting-first-prime-archive-1-2026-10-20.zip)
- [A Note on Disjoint Decompositions of [0,1) into Closed Sets](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/disjoint-decompositions-archive-1-2026-10-20.zip)
- [Lebesgue's Criterion for Riemann Integrability](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/lebesgue-riemann-integrability-archive-1-2026-10-20.zip)
- [Products Preserve Riemann Integrability](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/products-preserve-riemann-integrability-archive-1-2026-10-20.zip)
- [Selected Problems in Discrete Mathematics and Analysis](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/selected-problems-discrete-mathematics-analysis-archive-1-2026-10-20.zip)
- [Mathematical Life in the Age of AI](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/mathematical-life-in-the-age-of-ai-archive-1-2026-10-20.zip)
- [When Accountability Stops Being Reciprocal](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/when-accountability-stops-being-reciprocal-archive-1-2026-10-20.zip)
- [The Performance of Depth](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/the-performance-of-depth-archive-1-2026-10-20.zip)
- [What a New Proof Makes Possible](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/what-a-new-proof-makes-possible-archive-1-2026-10-20.zip)
- [When a Description Becomes a Verdict](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/when-a-description-becomes-a-verdict-archive-1-2026-10-20.zip)
- [The Authority of a Vision](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/the-authority-of-a-vision-archive-1-2026-10-20.zip)
- [Mathematical Understanding in the Age of AI](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/mathematical-understanding-in-the-age-of-ai-archive-1-2026-10-20.zip)
- [The Culture of Mathematical Judgment](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/the-culture-of-mathematical-judgment-archive-1-2026-10-20.zip)
- [A Tree Is a Discrete Poincaré Lemma](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-20.1/a-tree-is-a-discrete-poincare-lemma-archive-1-2026-10-20.zip)

### Verify a release

With GitHub CLI installed:

```sh
gh release verify 2026-10-20.1 --repo Tensorgami/tensorgami-archive
gh release verify-asset 2026-10-20.1 tensorgami-source-2026-10-20.1.zip --repo Tensorgami/tensorgami-archive
```

These checks establish the release/file binding. They do not certify the
mathematical claims or determine originality against earlier literature.
