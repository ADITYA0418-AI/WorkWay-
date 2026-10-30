import React, { createContext, useContext, useState, useEffect } from 'react';
import { initAnalytics, revokeAnalytics } from '../lib/tracking';

const COOKIE_STORAGE_KEY = 'workway_cookie_consent_v1';

const defaultConsent = {
  essential: true, // Always required for authentication, CSRF, and core functionality
  functional: false, // Saves user location, theme preference, UI settings
  analytics: false, // Performance tracking, error diagnostics
  marketing: false, // Promotional notifications, partner offers
  timestamp: null,
};

const CookieConsentContext = createContext(null);

export const CookieConsentProvider = ({ children }) => {
  const [consent, setConsent] = useState(() => {
    try {
      const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Unable to access localStorage for cookie consent:', e);
    }
    return null;
  });

  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Show banner only if user hasn't made a choice yet
    if (!consent) {
      // Small delay for smooth entry animation
      const timer = setTimeout(() => setIsBannerVisible(true), 800);
      return () => clearTimeout(timer);
    } else {
      setIsBannerVisible(false);
    }
  }, [consent]);

  const saveConsent = (newConsent) => {
    const fullConsent = {
      ...newConsent,
      essential: true, // Always locked to true
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(fullConsent));
    } catch (e) {
      console.error('Failed to save cookie consent to localStorage:', e);
    }
    setConsent(fullConsent);
    setIsBannerVisible(false);
    setIsModalOpen(false);

    // Sync Google Analytics with consent decision
    if (fullConsent.analytics) {
      initAnalytics();
    } else {
      revokeAnalytics();
    }
  };

  const acceptAll = () => {
    saveConsent({
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
  };

  const acceptEssentialOnly = () => {
    saveConsent({
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    });
  };

  const openSettings = () => {
    setIsModalOpen(true);
  };

  const closeSettings = () => {
    setIsModalOpen(false);
  };

  const hasConsent = (category) => {
    if (category === 'essential') return true;
    if (!consent) return false;
    return !!consent[category];
  };

  const resetConsent = () => {
    try {
      localStorage.removeItem(COOKIE_STORAGE_KEY);
    } catch (e) {
      // ignore
    }
    setConsent(null);
    setIsBannerVisible(true);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consent: consent || defaultConsent,
        hasAnswered: !!consent,
        isBannerVisible,
        isModalOpen,
        acceptAll,
        acceptEssentialOnly,
        saveConsent,
        openSettings,
        closeSettings,
        hasConsent,
        resetConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};
