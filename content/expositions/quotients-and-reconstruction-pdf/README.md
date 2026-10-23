# Quotients, Refinement, and Reconstruction

From exact Mal’cev categories to homotopy and linearization  
Henry Shin · October 2026 · Tensorgami

These are the 16 TeX inputs for the published 82-page PDF. The complete
exposition is also available as a web reading edition:
https://tensorgami.com/notes/quotients-and-reconstruction.html.

Mathematical text: clarification edition of 22 October 2026.
Archive documentation updated for edition 2026-10-23.2 on 23 October 2026.
This README update corrects the reading instructions and PDF identification;
the mathematical text, diagrams, numbering and published PDF are unchanged.

Build from this directory with a current TeX Live or MiKTeX installation:

    pdflatex -interaction=nonstopmode -halt-on-error -jobname=quotients-and-reconstruction main.tex
    pdflatex -interaction=nonstopmode -halt-on-error -jobname=quotients-and-reconstruction main.tex

The main file declares its package dependencies, including AMS packages,
Latin Modern, microtype, TikZ/tikz-cd, hyperref and bookmark. Repeat the second
pass if the compiler reports changed cross-references. Fonts and TeX versions
may affect pagination or PDF bytes; the site provides the published PDF:
https://tensorgami.com/pdfs/algebra/Quotients_Refinement_and_Reconstruction.pdf.

Published PDF SHA-256:
dcc9120795b78e227b0711f5b72139e326e6c3b8d75595d6c14c5ec5922a50bb

[Notes on proofs, dependencies, and revisions](https://tensorgami.com/notes/quotients-and-reconstruction-audit.html)
accompany the exposition at the address already used in Appendix A.5.

Copyright © 2026 Henry Shin. All rights reserved.
See https://tensorgami.com/license.html for reuse information.
