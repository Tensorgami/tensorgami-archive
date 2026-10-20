export function renderInterestsPages({save,heading,esc,interests,puzzles,gaming}) {
  const {overwatch}=interests;
  const pursuits=['Cube patterns',...(gaming.length||overwatch?['games']:[])];
  const description=new Intl.ListFormat('en',{style:'long',type:'conjunction'}).format(pursuits);
  const introduction=overwatch?'A few things I’ve made, played, and learned along the way.':'I make patterns on twisty cubes'+(gaming.length?' and play competitive games':'')+'. Here are a few things I’ve made and learned along the way.';
  const cube=puzzles[0],game=gaming[0];
  const paragraphs=text=>String(text).split(/\n\s*\n/).map(p=>`<p>${esc(p)}</p>`).join('');
  const previewImage=(im,url,label,loading='lazy')=>`<a class="interest-photo" href="${esc(url)}" aria-label="${esc(label)}"><img src="${esc(im.src)}" width="${im.width}" height="${im.height}" alt="${esc(im.alt)}" loading="${loading}" decoding="async"></a>`;


  save('/interests.html','Interests',description+': a few of Henry Shin’s other pursuits.','Interests',
    heading('Other pursuits','Interests',introduction)+`
    
    <div class="interests-reading">
    <section class="interests-section" aria-labelledby="puzzles-and-games">
      <div class="interests-index">
      <article class="interest-entry">
        <h2 id="puzzles-and-games"><a href="${esc(cube.page)}">${esc(cube.title)}</a></h2>
        ${previewImage(cube.images[0],cube.page,`Explore ${cube.title}`,'eager')}
        ${paragraphs(cube.body)}
        <a class="inline-link" href="${esc(cube.page)}">See the photographs <span aria-hidden="true">↗</span></a>
      </article>
      ${game?`<article class="interest-entry">
        ${previewImage(game.images[0],'/gaming.html','Explore Overwatch milestones')}
        <p class="eyebrow">Competitive games</p>
        <h3><a href="/gaming.html">Overwatch</a></h3>
        <p>A few solo-queue milestones, learning tank and support along the way. My in-game name is <span class="handle">RiemannRoch</span>.</p>
        <a class="inline-link" href="/gaming.html">A few milestones <span aria-hidden="true">↗</span></a>
      </article>`:''}
      </div>
    </section>
    ${overwatch?`<section class="interest-note" aria-labelledby="overwatch"><h2 id="overwatch">${esc(overwatch.title)}</h2>${paragraphs(overwatch.body)}${overwatch.images?.length?`<details class="interest-screenshots"><summary>Screenshots</summary><div class="interest-evidence">${overwatch.images.map(im=>`<figure><a href="${esc(im.src)}" aria-label="Open full image: ${esc(im.alt)}"><img src="${esc(im.src)}" width="${im.width}" height="${im.height}" alt="${esc(im.alt)}" loading="lazy" decoding="async"></a><figcaption>${esc(im.caption)}</figcaption></figure>`).join('')}</div></details>`:''}</section>`:''}
    </div>
    `);

}
