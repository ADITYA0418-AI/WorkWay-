import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';
import { Cookie, Check, X, Settings, ShieldCheck, HelpCircle } from 'lucide-react';
import { useCookieConsent } from '../../context/CookieConsentContext';
import { useSeo } from '../../lib/useSeo';

export const CookiePolicyPage = () => {
  const { consent, hasAnswered, openSettings, resetConsent } = useCookieConsent();
  useSeo({
    title: 'Cookie Policy — WorkWay',
    description: 'WorkWay Cookie Policy: what cookies we use, why, and how to manage your preferences for analytics, essential, and functional cookies.',
    canonical: '/cookie-policy',
  });

  return (
    <LegalPageLayout
      title="Cookie Policy"
      subtitle="How WorkWay uses cookies, browser storage, and related technologies to ensure smooth, secure, and personalized service delivery."
      lastUpdated="October 15, 2026"
    >
      {/* Interactive Cookie Status Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-surface-secondary border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-theme-text uppercase tracking-wider">Your Current Preferences:</span>
            {hasAnswered ? (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Customized by You
              </span>
            ) : (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                Default / Pending
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-theme-text-secondary">
            <span className="inline-flex items-center space-x-1">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>Essential (Active)</span>
            </span>
            <span className="text-theme-text-muted">•</span>
            <span className="inline-flex items-center space-x-1">
              {consent?.functional ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <X className="w-3.5 h-3.5 text-rose-500" />}
              <span>Functional ({consent?.functional ? 'Enabled' : 'Disabled'})</span>
            </span>
            <span className="text-theme-text-muted">•</span>
            <span className="inline-flex items-center space-x-1">
              {consent?.analytics ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <X className="w-3.5 h-3.5 text-rose-500" />}
              <span>Analytics ({consent?.analytics ? 'Enabled' : 'Disabled'})</span>
            </span>
            <span className="text-theme-text-muted">•</span>
            <span className="inline-flex items-center space-x-1">
              {consent?.marketing ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <X className="w-3.5 h-3.5 text-rose-500" />}
              <span>Marketing ({consent?.marketing ? 'Enabled' : 'Disabled'})</span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={openSettings}
            className="px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Manage Preferences</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="space-y-8 text-xs sm:text-sm text-theme-text-secondary leading-relaxed pt-2">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">1.</span>
            <span>What Are Cookies &amp; Local Storage?</span>
          </h2>
          <p>
            Cookies are small text files placed on your browser or device by web servers when you visit websites. Local storage (such as HTML5 `localStorage` and `sessionStorage`) performs a similar function, allowing client-side applications to store structured key-value data persistently on your device without transmitting it with every single network request.
          </p>
          <p>
            WorkWay uses both HTTP cookies and local storage tokens to recognize you across sessions, remember your location preferences for finding nearby technicians, maintain your chosen color theme, and secure platform transactions.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">2.</span>
            <span>Categories of Cookies We Use</span>
          </h2>
          <div className="space-y-4">
            
            <div className="p-4 rounded-2xl bg-surface-secondary border border-border space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-theme-text text-sm">A. Strictly Necessary &amp; Security Cookies</strong>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  Mandatory
                </span>
              </div>
              <p className="text-xs text-theme-text-muted">
                These are essential for the marketplace to function. They authenticate user logins (JWT tokens), protect forms against cross-site request forgery (CSRF), and verify active booking sessions. They cannot be disabled.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-secondary border border-border space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-theme-text text-sm">B. Functional &amp; Geolocation Cookies</strong>
                <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider bg-teal-500/10 px-2 py-0.5 rounded-full">
                  Optional
                </span>
              </div>
              <p className="text-xs text-theme-text-muted">
                These remember your customized settings, such as your pinned apartment location or radius slider (1 km, 2 km, 5 km), so you do not have to pick your locality every time you visit.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-secondary border border-border space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-theme-text text-sm">C. Analytics &amp; Telemetry Cookies</strong>
                <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider bg-sky-500/10 px-2 py-0.5 rounded-full">
                  Optional
                </span>
              </div>
              <p className="text-xs text-theme-text-muted">
                Collect aggregated, anonymized metrics on page load times, WebSocket message latency for live technician tracking, and frontend error telemetry.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-secondary border border-border space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-theme-text text-sm">D. Promotional &amp; Marketing Cookies</strong>
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded-full">
                  Optional
                </span>
              </div>
              <p className="text-xs text-theme-text-muted">
                Used to deliver relevant announcements, seasonal repair vouchers, and partner promotions based on your general neighborhood.
              </p>
            </div>

          </div>
        </section>

        {/* Section 3: Inventory Table */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">3.</span>
            <span>Detailed Inventory of Storage Items</span>
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-surface-secondary border-b border-border text-theme-text font-bold">
                  <th className="p-3">Key / Cookie Name</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Lifespan</th>
                  <th className="p-3">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-3 font-mono text-[11px] text-[#0F766E] dark:text-teal-400">workway_token</td>
                  <td className="p-3">Storage / Cookie</td>
                  <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">Essential</td>
                  <td className="p-3 text-theme-text-muted">7 Days</td>
                  <td className="p-3 text-theme-text-secondary">Maintains authenticated session security and role claims.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[11px] text-[#0F766E] dark:text-teal-400">workway_cookie_consent_v1</td>
                  <td className="p-3">Local Storage</td>
                  <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">Essential</td>
                  <td className="p-3 text-theme-text-muted">1 Year</td>
                  <td className="p-3 text-theme-text-secondary">Stores your consent choices and custom cookie configuration.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[11px] text-[#0F766E] dark:text-teal-400">workway_theme</td>
                  <td className="p-3">Local Storage</td>
                  <td className="p-3 font-semibold text-teal-600 dark:text-teal-400">Functional</td>
                  <td className="p-3 text-theme-text-muted">Persistent</td>
                  <td className="p-3 text-theme-text-secondary">Remembers your preference for Dark or Light theme display.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[11px] text-[#0F766E] dark:text-teal-400">workway_coords</td>
                  <td className="p-3">Local Storage</td>
                  <td className="p-3 font-semibold text-teal-600 dark:text-teal-400">Functional</td>
                  <td className="p-3 text-theme-text-muted">30 Days</td>
                  <td className="p-3 text-theme-text-secondary">Caches chosen neighborhood coordinates for fast provider discovery.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[11px] text-[#0F766E] dark:text-teal-400">_workway_telemetry</td>
                  <td className="p-3">Session Storage</td>
                  <td className="p-3 font-semibold text-sky-600 dark:text-sky-400">Analytics</td>
                  <td className="p-3 text-theme-text-muted">Session</td>
                  <td className="p-3 text-theme-text-secondary">Monitors WebSocket dispatch connection stability &amp; latency.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">4.</span>
            <span>How to Control &amp; Withdraw Consent</span>
          </h2>
          <p>
            You have full autonomy over non-essential cookies. You can modify your preferences at any time by clicking the{' '}
            <button
              onClick={openSettings}
              className="text-[#0284C7] underline hover:text-sky-400 font-semibold focus-visible:ring-2 focus-visible:ring-sky-500 rounded"
            >
              Manage Preferences button
            </button>{' '}
            or the "Cookie Settings" link located in our footer.
          </p>
          <p>
            Additionally, all modern browsers allow you to block or delete cookies across all websites. Please refer to your browser documentation (Google Chrome, Mozilla Firefox, Apple Safari, or Microsoft Edge) for instructions on clearing cookies and site data.
          </p>
        </section>

        {/* Section 5: Third-Party Embeds & Services */}
        <section className="space-y-3 p-5 rounded-2xl bg-surface-secondary border border-border">
          <h3 className="text-sm font-heading font-bold text-theme-text">5. Third-Party Embeds &amp; External Scripts</h3>
          <p className="text-xs text-theme-text-secondary">
            WorkWay utilizes the following verified third-party embeds for platform functionality:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-theme-text-muted">
            <li><strong>OpenStreetMap &amp; Leaflet:</strong> Interactive maps for visualizing technician proximity and tracking service routes. Tiles are governed by OpenStreetMap's privacy and attribution terms.</li>
            <li><strong>Razorpay:</strong> PCI-DSS certified payment gateway SDK loaded securely for online checkout transactions.</li>
            <li><strong>Google Generative Language API (Gemini):</strong> Cloud API for automated AI problem diagnosis when requested by the consumer.</li>
          </ul>
        </section>

      </div>
    </LegalPageLayout>
  );
};
