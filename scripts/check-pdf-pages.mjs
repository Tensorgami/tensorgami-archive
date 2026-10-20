import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';

// Requires Poppler's pdfinfo on PATH. Run after any catalogue PDF revision.
const notes=JSON.parse(readFileSync('content/notes.json','utf8'));
const pdfNotes=notes.filter(note=>note.pdf);
for(const note of pdfNotes){
  const info=execFileSync('pdfinfo',[`public${note.pdf}`],{encoding:'utf8'});
  const pages=Number(info.match(/^Pages:\s+(\d+)\s*$/m)?.[1]);
  assert.ok(Number.isInteger(pages)&&pages>0,`No page count found: ${note.pdf}`);
  assert.equal(note.pageCount,pages,`Stale pageCount metadata: ${note.slug}`);
}
console.log(`Verified PDF page counts for all ${pdfNotes.length} catalogue PDFs.`);
