# Reproducing the complete Quotients web edition

The static article preserves the complete audited native manuscript, including
all proofs, formulas, references and 25 original TikZ diagrams. The printed
title page and table of contents are replaced by the site's title and contents.

Requirements: Node, MathJax 3.2.2 (`mathjax-full`), and Python for validation.
Install MathJax where Node can resolve it, or set `TENSORGAMI_MATHJAX_ROOT` to
a directory containing `node_modules/mathjax-full`. Work in a temporary output
directory outside `dist`. Let `<out>` stand for that directory below.

1. Create `<out>/diagrams`; copy this folder's `diagram-inventory.json` and
   the 25 SVG files from `assets/expositions/quotients-and-reconstruction/`
   into it. These assets preserve the original TikZ geometry and outlined glyphs.
2. From the repository root, run:

       node scripts/render-quotients-exposition.mjs content/expositions/quotients-and-reconstruction-pdf <out>

3. Copy `validate-fidelity.py` beside the generated files and run it there.
   It independently checks all 2,731 math bodies, 767 prose paragraphs and
   31 heading-anchor units. Review the generated inventories and browser layout.
4. Copy `<out>/quotients-and-reconstruction.html` to the matching path under
   `content/expositions/`; copy `<out>/Quotients_Refinement_and_Reconstruction.tex`
   to `content/expositions/quotients-and-reconstruction-web-source.tex`.
5. Run the normal site build, link checks, PDF-page check and reading-entry tests.

The converter requires the audited `.aux` as an explicit numbering input and
fails on unknown constructs, missing labels, changed numbering or MathJax errors.
It emits only a clearly named unresolved draft if diagram assets are absent.
Do not publish a draft. All 138 source labels and the former guide's five route
aliases are retained. Numbering matches the PDF, including diagram tag (3.1a).
Diagrams use their original aspect ratios at 1.2 times PDF-to-CSS dimensions;
wide diagrams and formulas scroll within the article on narrow screens.

## Rebuilding diagrams after an approved manuscript revision

Copy the native TeX sources and exact matching PDF into a temporary input folder.
The PDF filename must be `quotients-and-reconstruction.pdf`. Install the pinned
Python requirement and supply a LaTeX installation with `pdflatex`, `standalone`,
Latin Modern, AMS packages and TikZ-CD, then run:

    python -m pip install -r scripts/quotients-web/requirements.txt
    python scripts/quotients-web/build_diagrams.py --source-dir <input> --output-dir <out>/diagrams --pdflatex <pdflatex>

Inspect every SVG against its source before replacing published assets. Keep
dependencies, intermediate TeX/PDF/PNG files and logs outside the public tree.
Only the 25 SVGs are public assets. The inventory binds them to source hashes.
This pipeline does not revise the mathematical manuscript or certify its proofs.
