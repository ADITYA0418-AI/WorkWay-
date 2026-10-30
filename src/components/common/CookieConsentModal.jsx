import React, { useState, useEffect } from 'react';
import { useCookieConsent } from '../../context/CookieConsentContext';
import { ShieldCheck, Cookie, Check, X, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookieConsentModal = () => {
  const { consent, isModalOpen, closeSettings, saveConsent, acceptAll, acceptEssentialOnly } = useCookieConsent();

  const [preferences, setPreferences] = useState({
    functional: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    if (consent) {
      setPreferences({
        functional: !!consent.functional,
        analytics: !!consent.analytics,
        marketing: !!consent.marketing,
      });
    }
  }, [consent, isModalOpen]);

  if (!isModalOpen) return null;

  const handleSaveCustom = () => {
    saveConsent({
      essential: true,
      functional: preferences.functional,
      analytics: preferences.analytics,
      marketing: preferences.marketing,
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-3xl bg-surface border border-border shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 dark:bg-teal-400/20 text-[#0F766E] dark:text-teal-400 flex items-center justify-center border border-teal-500/20">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-theme-text">Cookie &amp; Privacy Preferences</h3>
              <p className="text-xs text-theme-text-secondary">Customize how WorkWay uses cookies and local storage.</p>
            </div>
          </div>
          <button
            onClick={closeSettings}
            className="p-1.5 rounded-xl text-theme-text-muted hover:text-theme-text hover:bg-surface-secondary transition-colors"
            aria-label="Close cookie modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Intro */}
        <div className="py-4 text-xs text-theme-text-secondary leading-relaxed space-y-2">
          <p>
            WorkWay uses cookies and browser local storage to provide safe, reliable, and hyperlocal on-demand service experiences. Some cookies are essential for security and login, while others help personalize technician matching and improve marketplace performance.
          </p>
          <p>
            Learn more in our full{' '}
            <Link to="/cookie-policy" onClick={closeSettings} className="text-[#0284C7] underline hover:text-sky-400 font-semibold">
              Cookie Policy
            </Link>{' '}
            and{' '}
            <Link to="/privacy-policy" onClick={closeSettings} className="text-[#0284C7] underline hover:text-sky-400 font-semibold">
              Privacy Policy
            </Link>.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-3.5 my-2">
          
          {/* Strictly Necessary / Essential */}
          <div className="p-4 rounded-2xl bg-surface-secondary border border-border flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-theme-text">Strictly Necessary Cookies</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Always Active
                </span>
              </div>
              <p className="text-[11px] text-theme-text-muted leading-relaxed">
                Required for core security, authenticated sessions (JWT), CSRF defense, and database sync. The marketplace cannot function without these.
              </p>
            </div>
            <div className="shrink-0 pt-0.5">
              <div className="w-10 h-6 bg-teal-600/60 rounded-full flex items-center justify-end px-1 cursor-not-allowed opacity-90">
                <div className="w-4 h-4 bg-white rounded-full shadow flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-teal-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Functional & Geolocation */}
          <div className="p-4 rounded-2xl bg-surface-secondary border border-border flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-theme-text">Functional &amp; Geolocation Preferences</span>
              </div>
              <p className="text-[11px] text-theme-text-muted leading-relaxed">
                Saves your pinned GPS coordinates, chosen search radius (e.g. 5km), light/dark theme preference, and society apartment filters.
              </p>
            </div>
            <div className="shrink-0 pt-0.5">
              <button
                type="button"
                onClick={() => setPreferences(p => ({ ...p, functional: !p.functional }))}
                className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${
                  preferences.functional ? 'bg-[#0F766E] justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                }`}
              >
                <div className="w-4 h-4 bg-white rounded-full shadow" />
              </button>
            </div>
          </div>

          {/* Analytics & Performance */}
          <div className="p-4 rounded-2xl bg-surface-secondary border border-border flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-theme-text">Analytics &amp; Performance</span>
              </div>
              <p className="text-[11px] text-theme-text-muted leading-relaxed">
                Helps us monitor real-time WebSocket connection latency, optimize service provider search speeds, and debug marketplace crashes.
              </p>
            </div>
            <div className="shrink-0 pt-0.5">
              <button
                type="button"
                onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${
                  preferences.analytics ? 'bg-[#0F766E] justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                }`}
              >
                <div className="w-4 h-4 bg-white rounded-full shadow" />
              </button>
            </div>
          </div>

          {/* Marketing & Partner Offers */}
          <div className="p-4 rounded-2xl bg-surface-secondary border border-border flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-theme-text">Marketing &amp; Promotional Announcements</span>
              </div>
              <p className="text-[11px] text-theme-text-muted leading-relaxed">
                Allows relevant neighbourhood service promotions, seasonal discount banners (e.g. AC servicing discounts), and partner offers.
              </p>
            </div>
            <div className="shrink-0 pt-0.5">
              <button
                type="button"
                onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${
                  preferences.marketing ? 'bg-[#0F766E] justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                }`}
              >
                <div className="w-4 h-4 bg-white rounded-full shadow" />
              </button>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-5 border-t border-border flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
          <button
            onClick={acceptEssentialOnly}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-border hover:bg-surface-secondary text-theme-text-secondary text-xs font-semibold transition-all text-center"
          >
            Essential Only
          </button>
          
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={handleSaveCustom}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-[#0F766E]/40 text-[#0F766E] dark:text-teal-400 hover:bg-[#0F766E]/10 text-xs font-bold transition-all text-center"
            >
              Save Choices
            </button>
            <button
              onClick={acceptAll}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold shadow-md shadow-[#0F766E]/20 transition-all text-center"
            >
              Accept All
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
