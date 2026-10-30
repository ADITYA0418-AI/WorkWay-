import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Award, 
  Building2, 
  CheckCircle2, 
  Star, 
  HelpCircle,
  PhoneCall,
  UserCheck,
  CreditCard,
  ChevronDown,
  MessageSquare
} from 'lucide-react';
import { INITIAL_CATEGORIES } from '../data/mockData';
import { useCookieConsent } from '../context/CookieConsentContext';
import { BUSINESS_DETAILS } from '../data/businessDetails';
import { useSeo } from '../lib/useSeo';
import { CustomerReviews } from '../components/common/CustomerReviews';

const LANDING_FAQS = [
  { q: 'How do I book a service?', a: 'Select your category, share your location, and WorkWay shows verified providers within 1–5 km. Send a job request and track the provider live on the map.' },
  { q: 'Are providers background verified?', a: 'Yes. All providers pass a 3-level check: Aadhaar ID, police clearance certificate, and trade skill assessment before appearing on the platform.' },
  { q: 'How are payments handled?', a: 'Payments are held in escrow and released only after you confirm the job is complete. We support UPI, Credit/Debit Cards, and Net Banking.' },
  { q: 'What if I need to cancel?', a: 'Free cancellation up to 30 minutes before the scheduled slot. See our Refund Policy for full details.' },
];

export const LandingPage = () => {
  const navigate = useNavigate();
  const { openSettings } = useCookieConsent();
  const [openFaq, setOpenFaq] = useState(null);

  useSeo({
    title: 'WorkWay — Trusted Hyperlocal Home Services | Electrician, Plumber & More',
    description:
      'WorkWay connects you with background-verified electricians, plumbers, carpenters, housemaids, and handymen within 1–5 km of your home. Fast, safe, transparent pricing.',
    canonical: '/landing',
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      


      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 overflow-hidden border-b border-slate-800/60">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0F766E]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0F766E]/15 border border-[#0F766E]/30 text-teal-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Hyperlocal On-Demand Skilled Service Marketplace</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Trusted help. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-teal-300 via-sky-400 to-[#0284C7] bg-clip-text text-transparent">
              Right around you.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Connect instantly with background-verified electricians, plumbers, carpenters, housemaids, and handymen within 1–5 km of your home.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/consumer')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-sm shadow-xl shadow-[#0F766E]/30 flex items-center justify-center space-x-2 transition-all hover:scale-105"
            >
              <span>Get Work Done</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/auth?role=provider')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center space-x-2 transition-all"
            >
              <span>Get Work (Become Provider)</span>
            </button>
          </div>

          {/* Key Value Props Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-slate-300">
            <div className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <MapPin className="w-4 h-4 text-sky-400" />
              <span>Hyperlocal Geolocation</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>3-Level Verification</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Fast-Track Emergency Dispatch</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <CreditCard className="w-4 h-4 text-purple-400" />
              <span>Transparent Price Estimates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Skilled Services Available Near You
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Select a service category to find verified local providers with real-time distance calculations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {INITIAL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/consumer?category=${cat.id}`)}
              className="glass-card rounded-2xl p-5 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center mx-auto mb-3 text-sky-400 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {cat.description}
              </p>
              <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-sky-400 mt-3">
                <span>Browse Providers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* How WorkWay Works */}
      <section className="py-16 px-4 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Simple 4-Step Process</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
              How WorkWay Delivers Speed & Trust
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'GPS Location', desc: 'Select your home address or let browser GPS locate nearby technicians within 1-5 km.' },
              { step: '02', title: 'WorkWay Match', desc: 'Our multi-factor algorithm scores providers by distance, rating, experience, and speed.' },
              { step: '03', title: 'Live Job Lifecycle', desc: 'Track provider status live on the map from acceptance to start of work.' },
              { step: '04', title: 'Digital Invoice', desc: 'Approve material costs, receive itemized invoice, and pay securely via UPI/Card.' },
            ].map((s) => (
              <div key={s.step} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-left relative">
                <span className="text-3xl font-heading font-extrabold text-sky-500/30 block mb-2">{s.step}</span>
                <h3 className="font-heading text-base font-bold text-white mb-1">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & 3 Verification Levels */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Verified Marketplace Standards</span>
            <h2 className="font-heading text-3xl font-extrabold text-white mt-1 mb-4">
              Our 3-Level Provider Verification Standard
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              We enforce a transparent, multi-level verification standard so you can easily review each technician's government ID, trade skills, and background clearance.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Level 1 — Basic Verified</h4>
                  <p className="text-xs text-slate-400">Mobile OTP verification + Government Aadhaar ID + live profile selfie match.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Level 2 — Background Cleared</h4>
                  <p className="text-xs text-slate-400">Local address proof + police clearance certificate + trade skills test.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start space-x-3">
                <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Level 3 — Master Pro</h4>
                  <p className="text-xs text-slate-400">100+ completed jobs, 4.8+ rating, customer endorsements & active liability insurance.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl text-center border border-slate-800">
            <Building2 className="w-12 h-12 text-sky-400 mx-auto mb-4" />
            <h3 className="font-heading text-xl font-bold text-white mb-2">Society & Apartment Hubs</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Belong to Green Valley Apartments or Prestige Ozone? See technicians trusted and hired by your neighbours.
            </p>
            <button
              onClick={() => navigate('/consumer')}
              className="px-6 py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs shadow-lg shadow-[#0F766E]/20 transition-all"
            >
              Explore Society Hub
            </button>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 px-4 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Real Customers, Real Results</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
              What Our Customers Say
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Verified reviews from homeowners across Bengaluru, Mumbai, and Hyderabad.
            </p>
          </div>
          <CustomerReviews limit={3} />
          <div className="text-center mt-8">
            <Link
              to="/consumer"
              className="inline-flex items-center space-x-2 text-sm font-bold text-amber-400 hover:underline"
            >
              <span>Book a service and leave your review</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Got Questions?</span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {LANDING_FAQS.map((f, i) => (
            <div key={i} className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-white hover:text-teal-300 transition-colors"
                aria-expanded={openFaq === i}
              >
                <span>{f.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 ml-4 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-4">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/faq" className="inline-flex items-center space-x-1.5 text-sm font-bold text-sky-400 hover:underline">
            <HelpCircle className="w-4 h-4" />
            <span>View all FAQs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Startup Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-10 px-4">
        <div className="max-w-7xl mx-auto space-y-6 text-xs text-slate-400">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="font-heading font-bold text-white text-base block">WORKWAY</span>
              <span>"To GET WORK &amp; TO GET WORK DONE"</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link to="/consumer" className="hover:text-white transition-colors">Marketplace</Link>
              <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
              <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
              <Link to="/provider" className="hover:text-white transition-colors">For Providers</Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
              <Link to="/privacy-policy" className="hover:text-sky-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-sky-400 transition-colors">Terms &amp; Conditions</Link>
              <Link to="/cookie-policy" className="hover:text-sky-400 transition-colors">Cookie Policy</Link>
              <Link to="/refund-policy" className="hover:text-sky-400 transition-colors">Refund Policy</Link>
              <button onClick={openSettings} className="hover:text-sky-400 transition-colors">Cookie Settings</button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <div>
              <p className="text-slate-400 font-semibold">{BUSINESS_DETAILS.legalName}</p>
              <p>CIN: <span className="font-mono">{BUSINESS_DETAILS.cin}</span> | GSTIN: <span className="font-mono">{BUSINESS_DETAILS.gstin}</span></p>
            </div>
            <div className="text-right">
              <span>{BUSINESS_DETAILS.copyrightAttribution.brandCopyright}</span>
              <p className="text-[10px] text-slate-600">Photography via Unsplash License | Maps © OpenStreetMap contributors</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
