/* tensorgami-analytics-v1: first-party, cookieless aggregate visit reporting. */
(() => {
  'use strict';
  const script = document.currentScript;
  if (script?.getAttribute('data-tensorgami-analytics') !== 'v1' || window.__tensorgamiAnalyticsV1) return;
  window.__tensorgamiAnalyticsV1 = true;
  const endpoint = 'https://dry-term-82db.hkshin.workers.dev/track';
  const optOutKey = 'tensorgami_analytics_optout';
  const productionHosts = ['tensorgami.com', 'www.tensorgami.com'];
  if (location.protocol !== 'https:' || !productionHosts.includes(location.hostname)) return;
  if (document.querySelector('meta[name="robots"]')?.content.split(',').map(v => v.trim()).includes('noindex')) return;
  let canonical;
  try { canonical = new URL(document.querySelector('link[rel="canonical"]').href); } catch { return; }
  if (canonical.origin !== 'https://tensorgami.com' || canonical.pathname === '/404.html') return;

  function excluded() {
    if (navigator.webdriver || navigator.globalPrivacyControl === true || window.__tensorgamiAnalyticsOptOut) return true;
    if ([navigator.doNotTrack, window.doNotTrack, navigator.msDoNotTrack].some(v => v === '1' || v === 'yes')) return true;
    try { return localStorage.getItem(optOutKey) === '1'; } catch { return true; }
  }
  function recent(type, path) {
    const key = 'tensorgami_analytics_recent:' + type + ':' + path;
    const now = Date.now();
    try {
      const previous = Number(sessionStorage.getItem(key));
      if (previous > 0 && now >= previous && now - previous < 30000) return true;
      sessionStorage.setItem(key, String(now));
    } catch { /* The server also suppresses repeated events. */ }
    return false;
  }
  function referrerOrigin() {
    try { return new URL(document.referrer).origin; } catch { return ''; }
  }
  function record(type, path) {
    if (excluded() || document.visibilityState !== 'visible' || typeof crypto.randomUUID !== 'function' || recent(type, path)) return;
    const body = JSON.stringify({id: crypto.randomUUID(), type, host: location.hostname, path, referrer: referrerOrigin()});
    async function send(retry) {
      if (excluded()) return;
      try {
        const response = await fetch(endpoint, {method: 'POST', mode: 'cors', credentials: 'omit', referrerPolicy: 'no-referrer', headers: {'Content-Type': 'application/json'}, body, keepalive: true});
        if (response.status < 500) return;
      } catch { /* A failed first attempt may have reached the server. Reuse its ID. */ }
      if (!retry) setTimeout(() => send(true), 1500);
    }
    void send(false);
  }

  let pageRecorded = false;
  function pageview() {
    if (pageRecorded || document.visibilityState !== 'visible' || excluded()) return;
    pageRecorded = true;
    record('pageview', canonical.pathname);
  }
  pageview();
  document.addEventListener('visibilitychange', pageview);
  // An opt-in can start collection on this page; opting out also cancels queued retries.
  window.addEventListener('tensorgami:privacy', pageview);
  function pdfClick(event) {
    if (event.defaultPrevented || (event.button !== undefined && event.button !== 0 && event.button !== 1)) return;
    const anchor = event.target.closest?.('a[href]');
    if (!anchor) return;
    let target;
    try { target = new URL(anchor.href, location.href); } catch { return; }
    if (target.origin !== location.origin || !/\.pdf$/i.test(target.pathname)) return;
    record('pdf_click', target.pathname);
  }
  document.addEventListener('click', pdfClick);
  document.addEventListener('auxclick', pdfClick);
})();
