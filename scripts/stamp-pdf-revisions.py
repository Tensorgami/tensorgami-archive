"""Check or add the recorded revision dates without reflowing seven PDFs.

From the website checkout, after compiling a corresponding public/tex source to
its public/pdfs destination: python scripts/stamp-pdf-revisions.py
Dependencies: pypdf and reportlab. The overlay is deterministic for identical
input bytes and library versions; an already stamped PDF is left untouched.
Only the first page receives new content. Existing dates, metadata, links,
mathematical content, page boxes, and page count are retained.
"""

from __future__ import annotations

import argparse
from io import BytesIO
import json
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
MARKER = "Revised September 22, 2026"
REVISION_DATES = {
    "analysis/Lebesgue_s_Criterion_for_Riemann_Integrability.pdf": "Revised October 7, 2026",
    "analysis/Products_Preserve_Riemann_Integrability.pdf": "Revised October 7, 2026",
}
PDFS = (
    "analysis/A_Weighting_Argument_for_Pointwise_Convergence_to_Convergence_in_Measure.pdf",
    "algebra/A_Divisibility_Criterion_for_Separated_Polynomial_Differences.pdf",
    "algebra/A_Galois_Theoretic_and_Frobenius_Descent_Viewpoint_on_a_Polynomial_Composition_Law.pdf",
    "algebraic-geometry/Notes_on_Hartshorne_Algebraic_Geometry_Chapter_II_Section_5_Exercises_14_18.pdf",
    "analysis/A_Note_on_Disjoint_Decompositions_of_0_1_into_Closed_Sets.pdf",
    "analysis/Lebesgue_s_Criterion_for_Riemann_Integrability.pdf",
    "analysis/Products_Preserve_Riemann_Integrability.pdf",
)


def revised_bytes(original: bytes, marker: str = MARKER) -> bytes:
    reader = PdfReader(BytesIO(original))
    first = reader.pages[0]
    if marker in (first.extract_text() or ""):
        return original
    if list(first.mediabox) != [0, 0, 612, 792] or first.rotation != 0:
        raise ValueError("Review the first-page geometry before stamping this PDF")

    overlay_stream = BytesIO()
    overlay = canvas.Canvas(overlay_stream, pagesize=(612, 792), invariant=1)
    overlay.setFont("Helvetica", 8)
    overlay.setFillColorRGB(0.35, 0.35, 0.35)
    overlay.drawCentredString(306, 22, marker)
    overlay.save()
    overlay_stream.seek(0)

    writer = PdfWriter(clone_from=reader)
    writer.pages[0].merge_page(PdfReader(overlay_stream).pages[0])
    output = BytesIO()
    writer.write(output)
    return output.getvalue()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Check dates without modifying PDFs")
    args = parser.parse_args()
    results = []
    for relative in PDFS:
        path = ROOT / "public" / "pdfs" / relative
        original = path.read_bytes()
        marker = REVISION_DATES.get(relative, MARKER)
        already_stamped = marker in (PdfReader(BytesIO(original)).pages[0].extract_text() or "")
        if args.check:
            results.append({"pdf": relative, "revision_present": already_stamped})
            continue
        revised = revised_bytes(original, marker)
        if revised != original:
            temporary = path.with_suffix(".revision.tmp")
            temporary.write_bytes(revised)
            temporary.replace(path)
        results.append({"pdf": relative, "status": "unchanged" if already_stamped else "stamped"})
    print(json.dumps(results, indent=2))
    if args.check and not all(item["revision_present"] for item in results):
        raise SystemExit(1)


if __name__ == "__main__":
    main()
