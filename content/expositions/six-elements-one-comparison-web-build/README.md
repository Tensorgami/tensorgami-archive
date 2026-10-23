# Companion web conversion

The mathematical and prose inputs are the four TeX files in
`../six-elements-one-comparison-pdf/`. The public source ZIP contains these
files and their publication README. The 14-page PDF is built from the same sources.

To reproduce the fragment, use Node.js with `mathjax-full` 3.2.2 available to
the renderer (or set `TENSORGAMI_MATHJAX_ROOT` to the directory containing its
`node_modules`). From the repository root, run:

```sh
node scripts/render-c6-companion.mjs content/expositions/six-elements-one-comparison-pdf content/expositions/six-elements-one-comparison-web-build
```

The checked-in `diagrams/` directory supplies four vector SVGs compiled from
the exact inventoried TikZ bodies using standalone PDF output and PyMuPDF.
The inventory records their source hashes, SVG hashes, labels, and mixed-display
prefixes. Without this directory, the renderer intentionally produces an
unresolved-diagrams file rather than a publishable fragment.

Copy the generated HTML and flattened web-source TeX to their names in
`content/expositions/`, and copy the four SVGs to
`assets/expositions/six-elements-one-comparison/`. Then run
`node scripts/render.mjs` and `node scripts/check.mjs` to build and check the site.

The inventories account for all 12 sections, 504 math expressions, 10 tables,
4 diagrams, 18 callouts, 7 exercises, and 7 worked answers. The title, subtitle
and date are supplied by the surrounding page template. Print page references are retained;
the web introduction explains that these refer to PDF pagination.

The renderer rejects unknown TeX commands and MathJax error output. The four
mathematical diagram SVGs retain the exact TikZ bodies recorded in their inventory.
