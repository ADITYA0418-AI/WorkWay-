// CONSENT-GUARDED TELEMETRY & TRACKING SYSTEM FOR WORKWAY
// Enforces that no telemetry or analytical metrics are collected without explicit cookie consent
// Integrates Google Analytics 4 (gtag.js) behind consent gate

const CONSENT_STORAGE_KEY = 'workway_cookie_consent_v1';

/**
 * Checks whether user has explicitly consented to analytics tracking.
 */
export function hasAnalyticsConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed && parsed.analytics);
  } catch (err) {
    return false;
  }
}

// ─── Google Analytics 4 Integration ─────────────────────────────────────────

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

let gaLoaded = false;

/**
 * Dynamically injects the Google Analytics gtag.js script.
 * Only called when analytics consent is granted AND a valid Measurement ID exists.
 */
function loadGAScript() {
  if (gaLoaded || !GA_MEASUREMENT_ID) return;

  // 1. Inject the gtag.js loader script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // 2. Initialize the dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());

  // Configure with consent mode defaults — deny until explicitly granted
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });

  // Now grant analytics since we only load when consent is true
  window.gtag('consent', 'update', {
    analytics_storage: 'granted',
  });

  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We send page views manually on route changes
    anonymize_ip: true,
  });

  gaLoaded = true;
}

/**
 * Initializes GA if consent is granted. Call once on app mount.
 * Also re-checks on consent changes (e.g. user updates cookie preferences).
 */
export function initAnalytics() {
  if (hasAnalyticsConsent() && GA_MEASUREMENT_ID) {
    loadGAScript();
  }
}

/**
 * Revokes GA consent and stops further tracking.
 * Called when user withdraws analytics consent.
 */
export function revokeAnalytics() {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
    });
  }
}

// ─── Event & Page View Tracking ─────────────────────────────────────────────

/**
 * Tracks a user event if analytics consent is granted.
 * Sends to both GA4 and the internal WorkWay analytics queue.
 */
export function trackEvent(eventName, eventData = {}) {
  if (!hasAnalyticsConsent()) {
    // Suppress tracking silently when consent is not granted
    return false;
  }

  const payload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    url: window.location.pathname,
    ...eventData,
  };

  // Send to GA4 if loaded
  if (typeof window.gtag === 'function' && GA_MEASUREMENT_ID) {
    window.gtag('event', eventName, eventData);
  }

  // Internal analytics queue (for future self-hosted analytics)
  if (typeof window !== 'undefined' && window.__WORKWAY_ANALYTICS_QUEUE__) {
    window.__WORKWAY_ANALYTICS_QUEUE__.push(payload);
  }

  return true;
}

/**
 * Tracks a page navigation event if analytics consent is granted.
 * Sends to GA4 as a page_view event.
 */
export function trackPageView(pagePath) {
  const path = pagePath || window.location.pathname;

  if (!hasAnalyticsConsent()) return false;

  // GA4 page view
  if (typeof window.gtag === 'function' && GA_MEASUREMENT_ID) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: document.title,
      page_location: window.location.href,
    });
  }

  return trackEvent('page_view', { path });
}
