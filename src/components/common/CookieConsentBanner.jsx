import React from 'react';
import { useCookieConsent } from '../../context/CookieConsentContext';
import { Cookie, Settings, ShieldCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookieConsentBanner = () => {
  const { isBannerVisible, acceptAll, acceptEssentialOnly, openSettings } = useCookieConsent();

  if (!isBannerVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-lg z-[9990] animate-slideUp"
    >
      <div className="p-5 sm:p-6 rounded-3xl bg-surface/95 backdrop-blur-xl border border-border shadow-2xl space-y-4">
        
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-2xl bg-teal-500/10 dark:bg-teal-400/20 text-[#0F766E] dark:text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/20">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-theme-text">Cookie &amp; Privacy Notice</h4>
              <span className="text-[11px] text-theme-text-muted flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                WorkWay respects your privacy &amp; data choices
              </span>
            </div>
          </div>
          <button
            onClick={acceptEssentialOnly}
            className="text-theme-text-muted hover:text-theme-text p-1 rounded-lg transition-colors"
            title="Dismiss with essential cookies only"
            aria-label="Dismiss cookie notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message */}
        <p className="text-xs text-theme-text-secondary leading-relaxed">
          We use cookies and local storage for authentication, geolocation radius matching, and performance analytics. 
          By clicking <strong className="text-theme-text">"Accept All"</strong>, you consent to our use of cookies as detailed in our{' '}
          <Link to="/cookie-policy" className="text-[#0284C7] underline hover:text-sky-400 font-medium">
            Cookie Policy
          </Link>{' '}
          and{' '}
          <Link to="/privacy-policy" className="text-[#0284C7] underline hover:text-sky-400 font-medium">
            Privacy Policy
          </Link>.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border">
          <button
            onClick={openSettings}
            className="flex items-center space-x-1.5 text-xs text-theme-text-secondary hover:text-[#0F766E] dark:hover:text-teal-400 font-semibold py-1.5 px-2 rounded-lg transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={acceptEssentialOnly}
              className="px-3 py-2 rounded-xl border border-border hover:bg-surface-secondary text-theme-text-secondary text-xs font-semibold transition-all"
            >
              Essential Only
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold shadow-md shadow-[#0F766E]/20 transition-all"
            >
              Accept All
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
