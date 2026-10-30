import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cookie, Scale, RefreshCw, FileText, Heart, MapPin, Settings, Building, PhoneCall, Mail } from 'lucide-react';
import { WorkWaySvgLogo } from './WorkWayLogo';
import { useCookieConsent } from '../../context/CookieConsentContext';
import { BUSINESS_DETAILS } from '../../data/businessDetails';

export const Footer = () => {
  const { openSettings } = useCookieConsent();

  return (
    <footer className="mt-auto border-t border-border bg-surface/80 backdrop-blur-md pb-24 md:pb-8 pt-10 px-4 sm:px-6 lg:px-8 text-xs text-theme-text-secondary transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-3 md:col-span-1">
            <Link to="/" className="inline-flex items-center space-x-2.5 group focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg">
              <WorkWaySvgLogo width={32} height={32} className="group-hover:scale-105 transition-transform" />
              <span className="font-heading font-extrabold text-base text-theme-text tracking-tight">WORKWAY</span>
            </Link>
            <p className="text-xs text-theme-text-muted leading-relaxed font-medium">
              "{BUSINESS_DETAILS.tagline}"
            </p>
            <p className="text-[11px] text-theme-text-muted leading-relaxed">
              Hyperlocal skilled trade marketplace connecting verified Electricians, Plumbers, Carpenters, and Handymen with nearby homes and societies.
            </p>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              <span>3-Level Verified Marketplace</span>
            </div>
            
            <div className="text-[10px] text-theme-text-muted space-y-0.5 pt-1">
              <p><strong className="text-theme-text font-semibold">{BUSINESS_DETAILS.legalName}</strong></p>
              <p>CIN: <span className="font-mono text-[9.5px]">{BUSINESS_DETAILS.cin}</span></p>
              <p>GSTIN: <span className="font-mono text-[9.5px]">{BUSINESS_DETAILS.gstin}</span></p>
            </div>
          </div>

          {/* Platform Views */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-theme-text block">
              Marketplace
            </span>
            <ul className="space-y-2">
              <li>
                <Link to="/consumer" className="hover:text-[#0F766E] dark:hover:text-teal-400 transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 rounded">
                  Consumer Marketplace
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#0F766E] dark:hover:text-teal-400 transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 rounded">
                  Browse All Services
                </Link>
              </li>
              <li>
                <Link to="/consumer/bookings" className="hover:text-[#0F766E] dark:hover:text-teal-400 transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 rounded">
                  Track My Bookings
                </Link>
              </li>
              <li>
                <Link to="/provider" className="hover:text-[#0F766E] dark:hover:text-teal-400 transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 rounded">
                  Provider Dashboard
                </Link>
              </li>
              <li>
                <Link to="/provider/verification" className="hover:text-[#0F766E] dark:hover:text-teal-400 transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 rounded">
                  Provider Verification Hub
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#0F766E] dark:hover:text-teal-400 transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 rounded">
                  About WorkWay
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#0F766E] dark:hover:text-teal-400 transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 rounded">
                  FAQ / Help Centre
                </Link>
              </li>
            </ul>
          </div>


          {/* Legal & Policies */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-theme-text block">
              Trust &amp; Legal Policies
            </span>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="flex items-center space-x-1.5 hover:text-[#0F766E] dark:hover:text-teal-400 transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 rounded">
                  <ShieldCheck className="w-3.5 h-3.5 text-theme-text-muted" aria-hidden="true" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="flex items-center space-x-1.5 hover:text-[#0F766E] dark:hover:text-teal-400 transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 rounded">
                  <FileText className="w-3.5 h-3.5 text-theme-text-muted" aria-hidden="true" />
                  <span>Terms and Conditions</span>
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="flex items-center space-x-1.5 hover:text-[#0F766E] dark:hover:text-teal-400 transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 rounded">
                  <Cookie className="w-3.5 h-3.5 text-theme-text-muted" aria-hidden="true" />
                  <span>Cookie Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="flex items-center space-x-1.5 hover:text-[#0F766E] dark:hover:text-teal-400 transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 rounded">
                  <RefreshCw className="w-3.5 h-3.5 text-theme-text-muted" aria-hidden="true" />
                  <span>Refund &amp; Cancellation</span>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openSettings}
                  className="flex items-center space-x-1.5 text-left hover:text-[#0F766E] dark:hover:text-teal-400 transition-colors text-theme-text-secondary focus-visible:ring-2 focus-visible:ring-sky-500 rounded"
                >
                  <Settings className="w-3.5 h-3.5 text-theme-text-muted" aria-hidden="true" />
                  <span>Manage Cookie Preferences</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Registered Office & Grievance */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-theme-text block">
              Registered Office &amp; Redressal
            </span>
            <div className="space-y-2 text-[11px] text-theme-text-muted">
              <p className="flex items-start space-x-1.5 leading-snug">
                <Building className="w-3.5 h-3.5 text-theme-text-muted shrink-0 mt-0.5" aria-hidden="true" />
                <span>{BUSINESS_DETAILS.registeredOffice.fullAddress}</span>
              </p>
              <p className="flex items-center space-x-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-sky-500 shrink-0" aria-hidden="true" />
                <span>Toll-Free Helpline: {BUSINESS_DETAILS.support.tollFree}</span>
              </p>
              <p className="flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-teal-500 shrink-0" aria-hidden="true" />
                <span>Support: <a href={`mailto:${BUSINESS_DETAILS.support.email}`} className="text-[#0284C7] hover:underline">{BUSINESS_DETAILS.support.email}</a></span>
              </p>
              <div className="p-2 rounded-xl bg-surface-secondary border border-border text-[10px] space-y-0.5">
                <p><strong className="text-theme-text font-semibold">Grievance Officer:</strong> {BUSINESS_DETAILS.grievanceRedressal.officerName}</p>
                <p>Email: <a href={`mailto:${BUSINESS_DETAILS.grievanceRedressal.email}`} className="text-[#0284C7] hover:underline">{BUSINESS_DETAILS.grievanceRedressal.email}</a></p>
                <p>Response SLA: {BUSINESS_DETAILS.grievanceRedressal.acknowledgmentSla}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Image & Open Source Copyright Attribution */}
        <div className="pt-4 border-t border-border/60 text-[10.5px] text-theme-text-muted space-y-1">
          <p>
            <strong className="text-theme-text">Intellectual Property &amp; Image Copyright:</strong> {BUSINESS_DETAILS.copyrightAttribution.brandCopyright}{' '}
            {BUSINESS_DETAILS.copyrightAttribution.thirdPartyPhotos}{' '}
            {BUSINESS_DETAILS.copyrightAttribution.mapAttribution}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-theme-text-muted">
          <div>
            <span>{BUSINESS_DETAILS.copyrightAttribution.brandCopyright}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-theme-text transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-theme-text transition-colors">Terms</Link>
            <Link to="/cookie-policy" className="hover:text-theme-text transition-colors">Cookies</Link>
            <Link to="/refund-policy" className="hover:text-theme-text transition-colors">Refunds</Link>
            <button onClick={openSettings} className="hover:text-theme-text transition-colors">Cookie Settings</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
