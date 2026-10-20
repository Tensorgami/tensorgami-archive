/* Reveal the optional example only when a reader follows its fragment link. */
(() => {
  const summary = document.getElementById('a-reconstruction-example');
  const disclosure = summary?.closest('details');
  if (!disclosure) return;

  const reveal = (hash) => {
    let id;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
    if (id !== summary.id) return;
    disclosure.open = true;
    summary.scrollIntoView({ block: 'start', behavior: 'instant' });
  };

  reveal(window.location.hash);
  window.addEventListener('hashchange', () => reveal(window.location.hash));
  // A repeated link to the current fragment does not fire hashchange.
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const destination = new URL(link.href, window.location.href);
    if (destination.origin === window.location.origin && destination.pathname === window.location.pathname && destination.search === window.location.search) reveal(destination.hash);
  });
})();
