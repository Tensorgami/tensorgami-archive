/* Open earlier links when a reader arrives at a bookmarked section or note. */
(() => {
  const archive = document.querySelector('[data-essay-archive]');
  if (!archive) return;

  const reveal = (hash) => {
    let id;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
    if (!id) return;
    const target = document.getElementById(id);
    if (!target || !archive.contains(target)) return;
    const disclosure = target.closest('details.archive-links');
    if (!disclosure) return;
    disclosure.open = true;
    target.scrollIntoView({ block: 'start', behavior: 'instant' });
  };

  reveal(window.location.hash);
  window.addEventListener('hashchange', () => reveal(window.location.hash));
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const destination = new URL(link.href, window.location.href);
    if (destination.origin === window.location.origin && destination.pathname === window.location.pathname && destination.search === window.location.search) reveal(destination.hash);
  });
})();
