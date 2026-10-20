/* Stores only a browser preference, never a visitor identifier. */
(() => {
  'use strict';
  const container = document.querySelector('[data-tensorgami-privacy]');
  if (!container) return;
  const key = 'tensorgami_analytics_optout';
  const status = document.getElementById('analytics-preference-status');
  const optOut = document.getElementById('analytics-opt-out');
  const optIn = document.getElementById('analytics-opt-in');
  function browserExcludes() {
    return navigator.globalPrivacyControl === true || [navigator.doNotTrack, window.doNotTrack, navigator.msDoNotTrack].some(v => v === '1' || v === 'yes');
  }
  function show(storageAvailable = true) {
    let disabled = Boolean(window.__tensorgamiAnalyticsOptOut);
    try { disabled ||= localStorage.getItem(key) === '1'; } catch { storageAvailable = false; }
    const browser = browserExcludes();
    status.textContent = !storageAvailable
      ? 'Browser storage is unavailable. Visits from this page are excluded, but a preference cannot be saved.'
      : disabled
        ? 'Your visits are excluded in this browser on this domain.'
        : browser
          ? 'Your browser’s privacy signal excludes your visits, regardless of this preference.'
          : container.dataset.analyticsEnabled === 'true'
            ? 'Your visits may be included in aggregate counts.'
            : 'Visitor analytics are currently disabled. Your preference will apply if they are enabled.';
    optOut.disabled = storageAvailable && disabled;
    optIn.disabled = storageAvailable && !disabled;
  }
  function choose(disabled) {
    window.__tensorgamiAnalyticsOptOut = disabled;
    try {
      if (disabled) localStorage.setItem(key, '1'); else localStorage.removeItem(key);
    } catch { window.__tensorgamiAnalyticsOptOut = true; show(false); return; }
    show();
    window.dispatchEvent(new CustomEvent('tensorgami:privacy'));
  }
  optOut.addEventListener('click', () => choose(true));
  optIn.addEventListener('click', () => choose(false));
  window.addEventListener('storage', event => { if (event.key === key) { window.__tensorgamiAnalyticsOptOut = false; show(); } });
  // A direct exclusion link sets the preference before the deferred counter runs.
  if (location.hash === '#exclude') choose(true);
  else show();
  container.hidden = false;
})();
