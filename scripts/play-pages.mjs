export function renderPlayPages({save,heading,esc,puzzles,redirect,gaming}) {
  const photograph = (im,loading='lazy') => `<figure><a href="${im.src}" aria-label="Open full photograph: ${esc(im.alt)}"><img src="${im.src}" width="${im.width}" height="${im.height}" alt="${esc(im.alt)}" loading="${loading}" decoding="async"></a><figcaption>${esc(im.caption)} <a href="${im.src}">View full-size image</a></figcaption></figure>`;

  const puzzleLabel=gaming.length?'Puzzles &amp; games':'Puzzles &amp; patterns';
  redirect('/play.html','/interests.html#puzzles-and-games',gaming.length?'Puzzles & games':'Puzzles & patterns');

  for (const p of puzzles) {
    save(p.page,p.title,p.summary,'Interests',
      heading('<a href="/interests.html">Interests</a> / Puzzles &amp; patterns',esc(p.title),'A little algebra, in color.')+`
      <div class="puzzle-intro prose"><p>${esc(p.galleryIntro||p.body)}</p></div>
      <div class="puzzle-gallery" aria-label="Cube patterns">${p.images.slice(0,2).map((im,i)=>photograph(im,i===0?'eager':'lazy')).join('')}</div>
      ${p.images.length>2?`<details class="more-photos puzzle-angles"><summary>Two more views</summary><div class="puzzle-gallery">${p.images.slice(2).map(im=>photograph(im)).join('')}</div></details>`:''}
      <p class="play-back"><a href="/interests.html#puzzles-and-games">${puzzleLabel}</a>${gaming.length?' <span aria-hidden="true">·</span> <a href="/gaming.html">Overwatch milestones</a>':''}</p>`);
  }
}
