import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Shield, FileText, Cookie, RefreshCw, ArrowLeft, CheckCircle2, Lock, ExternalLink, Settings } from 'lucide-react';
import { useCookieConsent } from '../../context/CookieConsentContext';

export const LegalPageLayout = ({
  title,
  subtitle,
  lastUpdated = 'October 15, 2026',
  children,
}) => {
  const { openSettings } = useCookieConsent();

  const legalNavItems = [
    { to: '/privacy-policy', label: 'Privacy Policy', icon: Shield, aliases: ['/privacy'] },
    { to: '/terms', label: 'Terms & Conditions', icon: FileText, aliases: ['/terms-and-conditions'] },
    { to: '/cookie-policy', label: 'Cookie Policy', icon: Cookie, aliases: ['/cookies'] },
    { to: '/refund-policy', label: 'Refund & Cancellation', icon: RefreshCw, aliases: ['/refunds'] },
  ];

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Breadcrumb & Back */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-theme-text-muted hover:text-[#0F766E] dark:hover:text-teal-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>

        <div className="flex items-center space-x-2 text-xs text-theme-text-muted">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span>Last revised: {lastUpdated}</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-border mb-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 text-[#0F766E] dark:text-teal-400 text-xs font-bold border border-teal-500/20 mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>WorkWay Trust &amp; Transparency Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-theme-text tracking-tight mb-2">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-theme-text-secondary leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Main Grid: Sidebar Navigation + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Nav */}
        <div className="lg:col-span-3">
          <div className="sticky top-20 space-y-4">
            
            <div className="glass-panel p-4 rounded-2xl border border-border space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-theme-text-muted px-2 py-1 block">
                Legal Documents
              </span>
              <nav className="space-y-1">
                {legalNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-[#0F766E] text-white shadow-sm'
                            : 'text-theme-text-secondary hover:text-theme-text hover:bg-surface-secondary'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            {/* Quick Actions Card */}
            <div className="glass-panel p-4 rounded-2xl border border-border space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-theme-text-muted block">
                User Privacy Controls
              </span>
              <button
                onClick={openSettings}
                className="w-full py-2.5 px-3 rounded-xl bg-surface-secondary hover:bg-surface-tertiary border border-border text-theme-text text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <span className="flex items-center space-x-2">
                  <Settings className="w-3.5 h-3.5 text-[#0F766E] dark:text-teal-400" />
                  <span>Cookie Settings</span>
                </span>
                <span className="text-[10px] text-theme-text-muted uppercase">Manage</span>
              </button>

            </div>

            {/* Corporate Entity Card */}
            <div className="glass-panel p-4 rounded-2xl border border-border space-y-2 text-[11px] text-theme-text-muted">
              <span className="text-[10px] font-bold uppercase tracking-wider text-theme-text block">
                Corporate Entity
              </span>
              <p className="font-semibold text-theme-text text-xs leading-tight">
                WorkWay Hyperlocal Technologies Pvt. Ltd.
              </p>
              <p>CIN: <span className="font-mono text-[10px]">U72900KA2024PTC189421</span></p>
              <p>GSTIN: <span className="font-mono text-[10px]">29AABCW9871P1ZX</span></p>
              <div className="pt-1.5 border-t border-border/80 text-[10px] space-y-1">
                <p><strong className="text-theme-text">Grievance Officer:</strong> Priya R.</p>
                <a
                  href="mailto:grievance@workway.app"
                  className="text-[#0284C7] hover:underline font-semibold block"
                >
                  grievance@workway.app
                </a>
              </div>
            </div>

            {/* Compliance Badge */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-[11px] text-emerald-800 dark:text-emerald-300 space-y-1">
              <div className="flex items-center space-x-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Verified Statutory Compliance</span>
              </div>
              <p className="text-theme-text-secondary text-[11px] leading-snug">
                Aligned with the Digital Personal Data Protection (DPDP) Act 2023, IT Act 2000, and Consumer Protection (E-Commerce) Rules 2020.
              </p>
            </div>

          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-border space-y-8 shadow-sm">
            {children}
          </div>
        </div>

      </div>

    </div>
  );
};
