export function renderInterestsPages({save,heading,esc,interests,puzzles,gaming}) {
  const {overwatch,broodWar,youtube}=interests;
  const car=undefined,fashion=undefined;
  const hasCollection=Boolean(fashion||car);
  const collectionLabel=fashion?(car?'Clothes &amp; cars':'Clothes &amp; style'):'Cars';
  const pursuits=['Cube patterns',...(gaming.length||overwatch||broodWar?['games']:[]),...(fashion?['wardrobe notes']:[]),...(car?['cars']:[])];
  const description=new Intl.ListFormat('en',{style:'long',type:'conjunction'}).format(pursuits);
  const puzzleLabel=gaming.length?'Puzzles &amp; games':'Puzzles &amp; patterns';
  const introduction=hasCollection
    ? 'I make patterns on twisty cubes'+(gaming.length?', play competitive games,':'')+' and enjoy '+(fashion?(car?'clothes and cars':'clothes'):'cars')+'. Here are a few things I’ve made, learned, and collected along the way.'
    : overwatch||broodWar?'A few things I’ve made, played, and learned along the way.':'I make patterns on twisty cubes'+(gaming.length?' and play competitive games':'')+'. Here are a few things I’ve made and learned along the way.';
  const cube=puzzles[0],game=gaming[0];
  const paragraphs=(text,links=[])=>{
    let markup=String(text).split(/\n\s*\n/).map(p=>`<p>${esc(p)}</p>`).join('');
    for(const link of links){
      const label=esc(link.text);
      if(!label||markup.split(label).length!==2)throw new Error(`Interest link text must occur once: ${link.text}`);
      markup=markup.replace(label,`<a href="${esc(link.href)}">${label}</a>`);
    }
    return markup;
  };
  const previewImage=(im,url,label,loading='lazy')=>`<a class="interest-photo" href="${esc(url)}" aria-label="${esc(label)}"><img src="${esc(im.src)}" width="${im.width}" height="${im.height}" alt="${esc(im.alt)}" loading="${loading}" decoding="async"></a>`;
  const photograph=(im,index)=>`<figure><a href="${esc(im.src)}" aria-label="View full-size photograph: ${esc(im.alt)}"><img src="${esc(im.src)}" width="${im.width}" height="${im.height}" alt="${esc(im.alt)}" loading="${index===0?'eager':'lazy'}" decoding="async"></a><figcaption>${esc(im.caption)} <a href="${esc(im.src)}">View full-size image</a></figcaption></figure>`;


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
    ${broodWar?`<section class="interest-note" aria-labelledby="brood-war"><h2 id="brood-war">${esc(broodWar.title)}</h2>${paragraphs(broodWar.body,broodWar.bodyLinks)}<p><a class="inline-link" href="${esc(broodWar.recordingsUrl)}">Watch the Brood War recordings on YouTube <span aria-hidden="true">↗</span></a></p></section>`:''}
    ${overwatch?`<section class="interest-note" aria-labelledby="overwatch"><h2 id="overwatch">${esc(overwatch.title)}</h2>${paragraphs(overwatch.body)}${overwatch.images?.length?`<details class="interest-screenshots"><summary>Screenshots</summary><div class="interest-evidence">${overwatch.images.map(im=>`<figure><a href="${esc(im.src)}" aria-label="Open full image: ${esc(im.alt)}"><img src="${esc(im.src)}" width="${im.width}" height="${im.height}" alt="${esc(im.alt)}" loading="lazy" decoding="async"></a><figcaption>${esc(im.caption)}</figcaption></figure>`).join('')}</div></details>`:''}</section>`:''}
    ${youtube?`<p><a class="inline-link" href="${esc(youtube.url)}">${esc(youtube.label)} <span aria-hidden="true">↗</span></a></p>`:''}
    </div>
    `);

}
