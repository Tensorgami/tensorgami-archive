# Tensorgami public source archive

The public Tensorgami website and available editable manuscripts by Henry Shin, preserved from [Tensorgami](https://tensorgami.com). This snapshot corresponds to Sites version 121.

The generated reading site in `dist/` preserves the published files byte for byte. It includes 6 current essays, 15 mathematical expositions, 1 problem set, 2 historical essay notices and their retained downloads, the predecessor tree exposition, six Lean projects with downloadable archives, 10 research records, and the public interests pages and images. Research records link to paper hosts; those externally hosted paper bodies are not copied into this site snapshot.

## Read and rebuild

In the complete source ZIP, the generated site is in `dist/` and the build commands below apply. In the complete site ZIP, served files are in `site/`; serve that directory with a static HTTP server. The build tools are supplied in the source ZIP.

Use a recent Node.js version:

```sh
npm run build
npm run check
npm run preview
```

Open the local address printed by the preview server. Absolute website links require serving the directory rather than opening HTML files directly. The site build has no npm package dependencies. It copies the retained documents and assets and renders the website from `content/` and `scripts/`. It does not compile every PDF or re-typeset the checked-in mathematical reading fragments.

Editable mathematical sources are in `public/tex/` and `content/expositions/`, Lean projects in `public/formalizations/`, and essay manuscripts in `content/essays/`. The published PDF files and TeX ZIPs for *Quotients, Refinement, and Reconstruction* and *Six Elements, One Comparison* are retained unchanged. Native manuscript inputs and web-conversion sources are also included. The stable exposition's numbering auxiliary is retained because the web converter uses it as an explicit numbering input. The source-directory README now identifies the full web edition and current published PDF hash. In the complete source ZIP or repository, `archive/reader-sources/quotients-and-reconstruction/` contains the same TeX inputs with an updated README. A separately named ZIP of these reader sources is linked below. The original website source ZIP remains preserved byte for byte in the live snapshot and its build inputs.

The mathematical converters have separate requirements, described in their nearby READMEs: MathJax, Python packages, TeX installations, and some fonts. Font files and dependency caches are not bundled. Machine-specific fallback dependency paths in the formal-logarithm converter have been replaced with portable installed-package or explicit environment lookup. Every published reading file remains unchanged. Three older mathematical PDFs lack complete editable TeX sources in this collection.

## Scope and rights

This snapshot contains public material only. Internal continuity and maintenance records, the former full private proof audit, unpublished drafts, hidden personal collections and photographs, credentials, runtime caches and the canonical checkout's earlier private Git history are excluded. Public proof notes are retained at their existing URL. Archive dates establish availability of this snapshot; source date labels do not independently authenticate earlier availability or establish originality or mathematical correctness.

The writing, site source, images, metadata and formalizations remain subject to [the existing rights notice](LICENSE.md). No new general reuse license is granted. MathJax's separate [Apache 2.0 license](https://github.com/Tensorgami/tensorgami-archive/blob/2026-10-23.2/assets/mathjax-LICENSE.txt) is retained; third-party artwork and interfaces remain the property of their owners.

Website: https://tensorgami.com  
Author: Henry Shin  
ORCID: https://orcid.org/0009-0000-6453-6865  
Correspondence: hkshin@alumni.harvard.edu

## Archival edition 2026-10-23.2

[Fixed release and publication record](https://github.com/Tensorgami/tensorgami-archive/releases/tag/2026-10-23.2) · [Previous fixed edition](https://github.com/Tensorgami/tensorgami-archive/releases/tag/2026-10-23.1)

This documentation revision preserves the version-121 website and mathematical
editions. The native-source README now identifies the complete web exposition
and current PDF hash. The native-source ZIP linked below uses the current title
*Notes on proofs, dependencies, and revisions* at the existing URL.

### Quotients native sources

- [Native sources with the revised README](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/Quotients_Refinement_and_Reconstruction-archival-source-2026-10-23.2.zip) — the same 16 TeX inputs, with only README.md changed inside the ZIP.
- [Original website source ZIP](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/Quotients_Refinement_and_Reconstruction.zip) — the unmodified live download, retained as part of the exact website snapshot.
- [Published PDF](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/Quotients_Refinement_and_Reconstruction.pdf) — unchanged.
- [Notes on proofs, dependencies, and revisions](https://tensorgami.com/notes/quotients-and-reconstruction-audit.html).

The revised native sources are also in
`archive/reader-sources/quotients-and-reconstruction/` in the complete source ZIP
and this repository, and in `reader-source/quotients-and-reconstruction/` in the
individual exposition package. Its existing loose native-source README is
corrected as well. The mathematical text, theorem numbering, diagrams, PDF,
web exposition and original published source ZIP are unchanged. The original
website ZIP remains in `public/tex/`, `dist/` and the work package's web snapshot,
so an ordinary site rebuild still reproduces the live site exactly.

### Complete edition

The release contains 59 assets: complete site and public source ZIPs, 25 work
packages, the 20 original PDFs and eight original source or Lean ZIPs, the revised
native-source ZIP, `EDITION.json`, `WORKS.json` and `SHA256SUMS.txt`. All 183 served
files match the live website. The additional native-source ZIP is an explicitly
documented archival variant; it does not replace the original live download.
`archive/downloads.json` distinguishes the two, and
`archive/documentation-revision.json` records the exact README-only difference.

The site ZIP contains `site/`; the public source ZIP contains the build inputs and
`dist/`. The corrected loose README is an archive-only documentation change.
The website has not been edited or redeployed. Its Archived editions page is
retained exactly as it appeared in version 121 and continues to describe its
earlier edition; this README identifies the new archival release.

`MANIFEST.sha256` covers every repository file except itself.
`SHA256SUMS.txt` covers every attached asset except itself. GitHub's immutable
release binds the tag, commit and assets; its title and notes remain editable.
All five preceding immutable releases, including 2026-10-23.1, remain
unchanged. Cite this release or tag for this exact documentation edition.

Whole-corpus citation: Henry Shin, *Tensorgami: complete public corpus snapshot*,
archival edition 2026-10-23.2, https://github.com/Tensorgami/tensorgami-archive/releases/tag/2026-10-23.2.

### Individual works

- [Fourier, Symmetry, and Reconstruction](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/fourier-symmetry-and-reconstruction-2026-10-23.2.zip)
- [What a Boundary Map Can Prove](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/what-a-boundary-map-can-prove-2026-10-23.2.zip)
- [What a Derivative Retains](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/what-a-derivative-retains-2026-10-23.2.zip)
- [When a Formal Logarithm Fails](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/when-a-formal-logarithm-fails-2026-10-23.2.zip)
- [Quotients, Refinement, and Reconstruction](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/quotients-and-reconstruction-2026-10-23.2.zip)
- [Six Elements, One Comparison](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/six-elements-one-comparison-2026-10-23.2.zip)
- [A Weighting Argument for Pointwise Convergence to Convergence in Measure](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/pointwise-weighting-convergence-in-measure-2026-10-23.2.zip)
- [IBM Ponder This July 2010](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/ibm-ponder-this-2010-2026-10-23.2.zip)
- [Divisibility of Separated Polynomials](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/separated-polynomial-divisibility-2026-10-23.2.zip)
- [A Galois-Theoretic and Frobenius-Descent Viewpoint on a Polynomial Composition Law](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/galois-frobenius-composition-law-2026-10-23.2.zip)
- [Normality, Coherent Extension, Tensor Operations, and Affineness](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/hartshorne-ii-5-14-18-2026-10-23.2.zip)
- [Extracting the First Prime Greater than m](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/extracting-first-prime-2026-10-23.2.zip)
- [A Note on Disjoint Decompositions of \[0,1) into Closed Sets](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/disjoint-decompositions-2026-10-23.2.zip)
- [Lebesgue's Criterion for Riemann Integrability](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/lebesgue-riemann-integrability-2026-10-23.2.zip)
- [Products Preserve Riemann Integrability](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/products-preserve-riemann-integrability-2026-10-23.2.zip)
- [Selected Problems in Discrete Mathematics and Analysis](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/selected-problems-discrete-mathematics-analysis-2026-10-23.2.zip)
- [Mathematical Life in the Age of AI](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/mathematical-life-in-the-age-of-ai-2026-10-23.2.zip)
- [When Accountability Stops Being Reciprocal](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/when-accountability-stops-being-reciprocal-2026-10-23.2.zip)
- [The Performance of Depth](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/the-performance-of-depth-2026-10-23.2.zip)
- [What a New Proof Makes Possible](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/what-a-new-proof-makes-possible-2026-10-23.2.zip)
- [When a Description Becomes a Verdict](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/when-a-description-becomes-a-verdict-2026-10-23.2.zip)
- [The Authority of a Vision](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/the-authority-of-a-vision-2026-10-23.2.zip)
- [Mathematical Understanding in the Age of AI](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/mathematical-understanding-in-the-age-of-ai-2026-10-23.2.zip)
- [The Culture of Mathematical Judgment](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/the-culture-of-mathematical-judgment-2026-10-23.2.zip)
- [A Tree Is a Discrete Poincaré Lemma](https://github.com/Tensorgami/tensorgami-archive/releases/download/2026-10-23.2/a-tree-is-a-discrete-poincare-lemma-2026-10-23.2.zip)

### Verify this edition

```sh
gh release verify 2026-10-23.2 --repo Tensorgami/tensorgami-archive
gh release verify-asset 2026-10-23.2 tensorgami-source-2026-10-23.2.zip --repo Tensorgami/tensorgami-archive
```

The named source ZIP is an explicit release asset, separate from GitHub's automatic
source downloads. The edition date uses UTC. The record documents disclosure of
these files; it does not certify mathematical correctness, originality, exclusive
priority or earlier availability of these exact bytes.
