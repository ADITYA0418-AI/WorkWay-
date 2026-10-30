import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPageView } from './tracking';

/**
 * useAnalytics — initializes Google Analytics on mount and
 * sends a page_view event on every React Router route change.
 * All events are consent-guarded via the tracking module.
 */
export function useAnalytics() {
  const location = useLocation();
  const isFirstRender = useRef(true);

  // Initialize GA once on mount (consent-guarded internally)
  useEffect(() => {
    initAnalytics();
  }, []);

  // Track page views on route changes
  useEffect(() => {
    // Skip the very first render — the initial page view is handled by initAnalytics
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Still track the initial page view
      trackPageView(location.pathname);
      return;
    }
    trackPageView(location.pathname);
  }, [location.pathname]);
}
