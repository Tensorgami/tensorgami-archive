"""Extract exact audited TikZ diagrams, compile standalones, emit vector SVGs.

Run with Python and the dependency in requirements.txt. A local deps folder
is supported when present. The audited LaTeX source is never modified.
"""
from __future__ import annotations
import argparse
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
from html import escape

HERE = Path(__file__).resolve().parent
SOURCE = None
TEX = Path(shutil.which("pdflatex") or "pdflatex")
MAIN = ""
INPUTS = []
FILES = []
DIAGRAM_RE = re.compile(r"\\begin\{tikzcd\}(.*?)\\end\{tikzcd\}", re.S)
ENV_RE = re.compile(r"\\begin\{([^}]+)\}")
ALTS = {
  1: ("Associativity of addition", "From V times V times V to V, adding the first two inputs then the third equals adding the last two inputs then the first. The intermediate objects are V times V."),
  2: ("The pullback square", "P maps to X by a and to Y by b; X maps to Z by f and Y maps to Z by g. The square commutes."),
  3: ("The diagonal lifting property", "The square has regular epimorphism q from X to Q on the left and monomorphism m from A to B on the right. Its top map is a, its bottom map is b, and a dashed diagonal d maps Q to A."),
  4: ("A relation and its projections", "A relation carrier M maps to X by a and to Y by b."),
  5: ("The kernel as a pullback", "The kernel of f maps into X and to the zero object. The square over f from X to Y and the zero map from zero to Y is a pullback."),
  6: ("Restricting a relation to its supports", "The carrier M maps by regular epimorphisms a and b to X-prime and Y-prime. Monomorphisms m and n include those supports into X and Y."),
  7: ("The support-quotient comparison", "M maps by regular epimorphisms a and b to the supports X-prime and Y-prime. Their quotient maps q and p reach Q and P. The isomorphism theta from Q to P makes theta q a equal p b."),
  8: ("The kernel square of a series step", "X sub i-minus-one includes into X sub i and maps to zero. The regular quotient q sub i maps X sub i to S sub i. This square is a pullback."),
  9: ("Pulling a refinement back along a quotient", "The top chain is K equals P zero, P one, through P t equals D. The bottom chain is zero equals Q zero, Q one, through Q t equals Q. Regular epimorphic vertical comparison maps make the displayed squares pullbacks."),
 10: ("The canonical comparison of a refinement cell", "The correspondence C sub i j maps regularly epimorphically to left support L sub i j by a sub i j and to right support R sub i j by b sub i j. Their quotient maps lambda and rho descend to Q of s sub j i and Q of r sub i j, joined by the isomorphism theta sub i j."),
 11: ("The group butterfly as one common quotient", "The intersection carrier C maps onto A one C modulo A one W, C modulo U W, and B one C modulo B one U. The middle quotient maps isomorphically to each outer quotient."),
 12: ("A map preserving an operator", "The square compares T from V to V with T-prime from V-prime to V-prime. Both vertical maps are f, so commutativity is f T equals T-prime f."),
 13: ("The two exact sequences of a comparison page", "First exact row: one, U sub r-plus-one of i, U sub r of i, image of d sub r i, one. Second exact row: one, image of d sub r i, V sub r of j, V sub r-plus-one of j, one."),
 14: ("The two-row differential", "The differential d sub r p maps X sub r of p in source degree one to Y sub r of p-minus-r in target degree zero."),
 15: ("Naturality in a filtered map", "X maps to Y by f and to X-prime by a. Y maps to Y-prime by b; X-prime maps to Y-prime by f-prime. The square commutes."),
 16: ("The two nonzero cancellations", "On page one, d one-three identifies k e one with M modulo k e two, from column three to two. On page three, d three-four identifies k e two with k e two, from column four to one. The rows refer to different pages."),
 17: ("A map of marked extensions", "Two exact rows run from zero through A and their middle objects E or E-prime, then B, then zero. The endpoint vertical maps are identities; the middle map h satisfies h i equals i-prime and q-prime h equals q."),
 18: ("Pulling back an extension", "The top exact row is zero, A, f-star E, P, zero; the bottom is zero, A, E, B, zero. Vertical maps are the identity on A, u on the middle objects, and f from P to B."),
 19: ("Pushing out an extension", "The top exact row is zero, A, E, B, zero; the bottom is zero, A-prime, g-star E, B, zero. Vertical maps are g on the kernels, u sub g on the middle objects, and the identity on B."),
 20: ("Naturality of evaluation at one", "Evaluation at one identifies module maps over the polynomial ring k[t] from P sub r into M with the kernel of N to the r-th power. The same identification holds for M-prime and N-prime. Postcomposition with F on the left agrees with restriction of F on the right."),
 21: ("A nilpotent chain of length three", "N sends w sub three-j-three to w sub three-j-two, then to w sub three-j-one, then to zero."),
 22: ("One flag and two intermediate objects", "The top exact row is zero, U, V, V modulo U, zero; the bottom is zero, U, E, E modulo U, zero. The left comparison is the identity on U; the other vertical comparisons are inclusions."),
 23: ("A group extension gives a homotopy fiber square", "B N maps to B G and to a point; B G maps to B Q by B p. The point maps to the basepoint of B Q, and the square is a homotopy pullback."),
 24: ("A higher normality datum", "B H maps to B G and to a point; B G maps to the pointed connected space Q. The square with the basepoint of Q is a homotopy pullback in the ambient category of spaces."),
 25: ("The proof dependency chain", "Finite limits and regular images lead to associative relation calculus, Malcev difunctionality, effective support quotients, saturated descent and refinement cells, Schreier refinement, simple-factor rigidity, Jordan-Holder, and finally basis size and additive invariants.")
}

def digest(data: str | bytes) -> str:
    return hashlib.sha256(data.encode("utf-8") if isinstance(data, str) else data).hexdigest()

def inventory():
    diagram_records = []
    file_records = []
    total_env = Counter()
    labels = []
    refs = []
    cites = []
    for file in FILES:
        source = file.read_text(encoding="utf-8")
        env = Counter(ENV_RE.findall(source))
        total_env.update(env)
        file_records.append({"file":file.name, "sha256":digest(file.read_bytes()),
            "bytes":len(file.read_bytes()), "lines":len(source.splitlines()),
            "environments":dict(env), "bracket_display_count":source.count(r"\["),
            "inline_dollar_count":len(re.findall(r"(?<!\\)\$",source)),
            "section_count":len(re.findall(r"\\section(?:\*)?\{",source)),
            "subsection_count":len(re.findall(r"\\subsection(?:\*)?\{",source))})
        for pattern, collection, key in [
            (r"\\label\{([^}]+)\}", labels, "label"),
            (r"\\(?:eqref|ref|autoref|pageref)\{([^}]+)\}", refs, "target"),
            (r"\\cite(?:\[[^\]]*\])*\{([^}]+)\}", cites, "keys")]:
            for match in re.finditer(pattern,source):
                collection.append({"file":file.name,"line":source[:match.start()].count("\n")+1,key:match.group(1)})
        for match in DIAGRAM_RE.finditer(source):
            raw = match.group(0)
            n = len(diagram_records)+1
            diagram_records.append({"number":n,"file":file.name,
                "line":source[:match.start()].count("\n")+1,
                "tex_sha256":digest(raw),"raw_tex":raw,
                "svg":f"diagram-{n:02}.svg","tex":f"diagram-{n:02}.tex",
                "title":ALTS[n][0],"alt":ALTS[n][1]})
    inv = {"source":str(SOURCE),"source_pdf_sha256":digest((SOURCE/"quotients-and-reconstruction.pdf").read_bytes()),
           "main_sha256":digest((SOURCE/"main.tex").read_bytes()),"ordered_inputs":INPUTS,
           "files":file_records,"environment_counts":dict(total_env),"labels":labels,
           "references":refs,"citations":cites,"diagrams":diagram_records,
           "counts":{"files":len(FILES),"diagrams":len(diagram_records),
                     "labels":len(labels),"reference_occurrences":len(refs),
                     "citation_occurrences":len(cites),
                     "bracket_displays":sum(f["bracket_display_count"] for f in file_records),
                     "inline_dollar_delimiters":sum(f["inline_dollar_count"] for f in file_records),
                     "sections":sum(f["section_count"] for f in file_records),
                     "subsections":sum(f["subsection_count"] for f in file_records)}}
    (HERE/"source-inventory.json").write_text(json.dumps(inv,indent=2,ensure_ascii=False),encoding="utf-8")
    return inv

PREAMBLE = r"""\documentclass[11pt,border=3pt]{standalone}
\usepackage[T1]{fontenc}
\usepackage{lmodern}
\usepackage{amsmath,amssymb,amsthm,amscd,mathtools}
\usepackage{tikz-cd}
\usetikzlibrary{arrows.meta,positioning,calc}
\usepackage{xcolor}
\definecolor{linkink}{HTML}{735632}
\definecolor{softink}{HTML}{5E675D}
\newcommand{\id}{\mathrm{id}}
\newcommand{\kk}{k}
\newcommand{\nml}{\trianglelefteq}
\newcommand{\iso}{\xrightarrow{\sim}}
\DeclareMathOperator{\Ker}{ker}
\DeclareMathOperator{\im}{im}
\DeclareMathOperator{\Span}{span}
\DeclareMathOperator{\Hom}{Hom}
\DeclareMathOperator{\Ext}{Ext}
\DeclareMathOperator{\Aut}{Aut}
\DeclareMathOperator{\rank}{rank}
\begin{document}
"""

def compile_one(record):
    target = HERE / record["tex"]
    target.write_text(PREAMBLE+record["raw_tex"]+"\n\\end{document}\n",encoding="utf-8")
    result = subprocess.run([str(TEX),"-interaction=nonstopmode","-halt-on-error","-file-line-error",target.name],
                            cwd=HERE,capture_output=True,text=True)
    (HERE/(target.stem+".compile.txt")).write_text(result.stdout+result.stderr,encoding="utf-8")
    if result.returncode:
        raise RuntimeError(f"Compilation failed: {target.name}: see .compile.txt")
    return record

def svg_one(record, pymupdf):
    document = pymupdf.open(HERE/(Path(record["tex"]).stem+".pdf"))
    assert len(document)==1, (record["number"],len(document))
    page = document[0]
    assert len(page.get_images())==0, "Unexpected raster image in diagram PDF"
    svg = page.get_svg_image(text_as_path=True)
    assert "<image" not in svg, "SVG contains raster image"
    n=record["number"]
    svg=re.sub(r"<svg\b",f'<svg role="img" aria-labelledby="diagram-title-{n:02} diagram-desc-{n:02}"',svg,count=1)
    start=svg.find(">",svg.find("<svg"))+1
    svg=svg[:start]+f'<title id="diagram-title-{n:02}">{escape(record["title"])}</title><desc id="diagram-desc-{n:02}">{escape(record["alt"])}</desc>'+svg[start:]
    output = HERE / record["svg"]
    output.write_text(svg,encoding="utf-8")
    page.get_pixmap(matrix=pymupdf.Matrix(2,2),alpha=False).save(HERE/(output.stem+".png"))
    record.update({"width_pt":page.rect.width,"height_pt":page.rect.height,
                   "width_css_px":page.rect.width*96/72,"height_css_px":page.rect.height*96/72,
                   "svg_sha256":digest(output.read_bytes()),"svg_bytes":output.stat().st_size,
                   "vector_only":True,"pdf_text":page.get_text()})
    document.close()

def main():
    global HERE, SOURCE, TEX, MAIN, INPUTS, FILES
    ap=argparse.ArgumentParser()
    ap.add_argument("--inventory-only",action="store_true")
    ap.add_argument("--source-dir",type=Path,required=True,help="Audited source directory containing main.tex, its inputs, and matching PDF")
    ap.add_argument("--output-dir",type=Path,default=HERE,help="Directory for standalone TeX, PDF, SVG, PNG, logs, and inventory")
    ap.add_argument("--pdflatex",type=Path,default=TEX,help="Path to the pdflatex executable; defaults to PATH when available")
    args=ap.parse_args()
    SOURCE=args.source_dir.resolve()
    HERE=args.output_dir.resolve()
    HERE.mkdir(parents=True,exist_ok=True)
    TEX=args.pdflatex
    MAIN=(SOURCE/"main.tex").read_text(encoding="utf-8")
    INPUTS=re.findall(r"\\input\{([^}]+)\}",MAIN)
    FILES=[SOURCE/(name+".tex") for name in INPUTS]
    inv=inventory()
    print(json.dumps(inv["counts"]))
    print(json.dumps(inv["environment_counts"]))
    if args.inventory_only:
        for d in inv["diagrams"]:
            print(f"\nDIAGRAM {d['number']:02} {d['file']}:{d['line']}\n{d['raw_tex']}")
        return
    sys.path.insert(0,str(HERE/"deps"))
    import pymupdf
    with ThreadPoolExecutor(max_workers=3) as pool:
        list(pool.map(compile_one,inv["diagrams"]))
    for record in inv["diagrams"]:
        svg_one(record,pymupdf)
    inv["pipeline"]={"latex":str(TEX),"pymupdf":pymupdf.VersionBind,
                     "rendering":"Exact TikZ body compiled to standalone PDF; SVG glyph paths and vector drawing, no raster images.",
                     "source_unchanged":all(digest((SOURCE/f["file"]).read_bytes())==f["sha256"] for f in inv["files"])}
    (HERE/"diagram-inventory.json").write_text(json.dumps(inv,indent=2,ensure_ascii=False),encoding="utf-8")
    print(f"Generated {len(inv['diagrams'])} vector SVG diagrams.")

if __name__=="__main__":
    main()
