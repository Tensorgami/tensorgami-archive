export const essayGroupDefinitions = [
  {id:'mathematics-and-intellectual-life',headingId:'mathematics-essays',label:'Mathematics and intellectual life'},
  {id:'film-and-interpretation',headingId:'interpretation-essays',label:'Film and interpretation'}
];

// Subject labels describe an individual essay; explicit groups organize the collection.
export function groupCurrentEssays(essays) {
  const known = new Set(essayGroupDefinitions.map(group=>group.id));
  const slots = new Set();
  for (const essay of essays) {
    if (!known.has(essay.group)) throw new Error(`Essay needs an explicit collection group: ${essay.slug}`);
    if (!Number.isInteger(essay.order) || essay.order < 1) throw new Error(`Essay needs a positive collection order: ${essay.slug}`);
    const slot = `${essay.group}:${essay.order}`;
    if (slots.has(slot)) throw new Error(`Duplicate essay collection order: ${slot}`);
    slots.add(slot);
  }
  return essayGroupDefinitions.map(group=>({
    ...group,
    essays:essays.filter(essay=>essay.group===group.id).sort((a,b)=>a.order-b.order)
  }));
}
