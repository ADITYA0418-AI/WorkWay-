import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Zap, Wrench, Hammer, Sparkles, ShieldCheck,
  CheckCircle2, ArrowRight, Star, Clock, CreditCard,
  MapPin, ChevronRight
} from 'lucide-react';
import { INITIAL_CATEGORIES, INITIAL_SERVICES_CATALOG } from '../../data/mockData';
import { useSeo } from '../../lib/useSeo';

const ICON_MAP = {
  Zap, Wrench, Hammer, Sparkles, ShieldCheck,
};

const CATEGORY_META = {
  electrician: {
    color: 'text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/20',
    gradient: 'from-sky-500 to-blue-600',
    heroDesc:
      'WorkWay connects you with government-ID verified, background-cleared electricians within 1–5 km of your home. From fan installation to emergency short-circuit fixes — fast, safe, and transparent pricing.',
    benefits: [
      'Licensed and background-verified electricians only',
      'Transparent fixed and hourly rates shown upfront',
      'Real-time technician tracking on live map',
      'Digital invoice with itemized material costs',
    ],
    faqs: [
      { q: 'How fast can an electrician arrive?', a: 'Most requests are matched within minutes. Average arrival time is 30–60 minutes during peak hours.' },
      { q: 'Are your electricians licensed?', a: 'Yes. Every electrician on WorkWay completes government ID verification, address proof, and trade skill assessment.' },
      { q: 'What if I\'m not happy with the work?', a: 'We offer a 48-hour workmanship guarantee. Contact support and we\'ll arrange a re-visit at no extra charge.' },
    ],
  },
  plumber: {
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    gradient: 'from-blue-500 to-cyan-600',
    heroDesc:
      'Stop that drip or drain blockage fast. WorkWay plumbers are Aadhaar-verified, nearby, and bring their own tools. Get transparent pricing and live tracking from booking to job completion.',
    benefits: [
      'Aadhaar-verified plumbers with local address proof',
      'Flat-rate and hourly pricing shown before booking',
      'Own tools — no extra equipment charges',
      '48-hour workmanship guarantee on all jobs',
    ],
    faqs: [
      { q: 'Do plumbers bring their own tools?', a: 'Yes. All WorkWay plumbers carry standard plumbing tools. Material costs (pipes, fittings) are shown for your approval before purchase.' },
      { q: 'Can I book for the same day?', a: 'Yes, same-day bookings are available subject to provider availability in your area.' },
      { q: 'What is the cancellation policy?', a: 'Free cancellation up to 30 minutes before the scheduled slot. See our Refund Policy for details.' },
    ],
  },
  carpenter: {
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    gradient: 'from-amber-500 to-orange-600',
    heroDesc:
      'Assemble furniture, fix cabinets, install curtain rods, or repair door locks. WorkWay carpenters are skilled trade professionals verified with government ID and real customer ratings.',
    benefits: [
      'Trade-skill tested carpenters for wood and modular work',
      'Material approval before purchase — full cost transparency',
      'Society Mode: see carpenters trusted by your neighbours',
      'Digital invoice for every job',
    ],
    faqs: [
      { q: 'Can carpenters handle modular furniture assembly?', a: 'Yes. WorkWay carpenters are tested on flat-pack and modular furniture assembly from brands like IKEA, HomeTown, and Urban Ladder.' },
      { q: 'How is material cost handled?', a: 'The carpenter will quote material costs on-site. You approve before any purchase — no surprises.' },
      { q: 'Do you offer full home carpentry projects?', a: 'For large projects, contact support to arrange an assessment visit and custom quote.' },
    ],
  },
  housemaid: {
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    gradient: 'from-emerald-500 to-teal-600',
    heroDesc:
      'From deep home cleaning to daily maid services, kitchen sanitation to move-in scrubbing — WorkWay housemaids are trusted, verified, and reviewed by families in your building.',
    benefits: [
      'ID-verified female staff with police clearance (Level 2+)',
      'Society-reviewed — see ratings from your apartment complex',
      'Flexible hourly or per-visit pricing',
      'Escrow-protected payments released after job completion',
    ],
    faqs: [
      { q: 'Are the housemaids female staff?', a: 'Yes, all housemaid services on WorkWay are fulfilled by verified female staff for home safety and comfort.' },
      { q: 'Can I book a recurring daily service?', a: 'Yes. After a one-time booking, you can discuss recurring arrangements directly with your matched provider.' },
      { q: 'What cleaning supplies are used?', a: 'Providers bring standard cleaning supplies. Premium product requests can be arranged at an additional material cost.' },
    ],
  },
  handyman: {
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
    gradient: 'from-purple-500 to-indigo-600',
    heroDesc:
      'TV wall mounting, drilling, geyser installation, curtain rods, and minor home repairs — WorkWay handymen handle the odd jobs you\'ve been putting off. Fast, affordable, and verified.',
    benefits: [
      'Multi-skilled handymen for varied small-to-medium tasks',
      'Transparent hourly and fixed pricing',
      'Live job tracking from acceptance to completion',
      '48-hour workmanship guarantee',
    ],
    faqs: [
      { q: 'What kind of tasks can a handyman do?', a: 'TV mounting, curtain rod fitting, geyser installation, wall drilling, furniture assembly, minor plumbing, and general repairs.' },
      { q: 'How is the handyman priced?', a: 'Most handyman tasks are priced at a fixed rate. Multi-hour jobs use an hourly rate shown upfront in the app.' },
      { q: 'Can I list multiple tasks for one visit?', a: 'Yes. When booking, describe all tasks and the handyman will assess feasibility and time on-site.' },
    ],
  },
};

export const ServicePage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const category = INITIAL_CATEGORIES.find((c) => c.id === categoryId);
  const meta = CATEGORY_META[categoryId];
  const services = INITIAL_SERVICES_CATALOG[categoryId] || [];

  useSeo({
    title: category
      ? `${category.name} Services Near You — WorkWay`
      : 'Service Not Found — WorkWay',
    description: meta?.heroDesc || 'Find verified home service providers near you on WorkWay.',
    canonical: `/services/${categoryId}`,
  });

  if (!category || !meta) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">Service Not Found</h1>
          <Link to="/services" className="text-teal-400 hover:underline text-sm">
            Browse all services →
          </Link>
        </div>
      </div>
    );
  }

  const Icon = ICON_MAP[category.icon] || Zap;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Breadcrumb */}
      <div className="px-4 pt-6 pb-2 max-w-7xl mx-auto">
        <nav className="flex items-center space-x-1.5 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-300 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/services" className="hover:text-slate-300 transition-colors">Services</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className={`font-semibold ${meta.color}`}>{category.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative pt-10 pb-20 px-4 overflow-hidden border-b border-slate-800/60">
        <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-gradient-to-r ${meta.gradient} opacity-10 rounded-full blur-3xl pointer-events-none`} />
        <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className={`inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full border ${meta.bg} text-xs font-bold`}>
              <Icon className={`w-4 h-4 ${meta.color}`} />
              <span className={meta.color}>{category.name} Services</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Verified {category.name}s{' '}
              <span className={`bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent`}>
                Near You
              </span>
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">{meta.heroDesc}</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate(`/consumer?category=${categoryId}`)}
                className={`px-6 py-3 rounded-xl bg-gradient-to-r ${meta.gradient} text-white font-bold text-sm flex items-center space-x-2 shadow-lg transition-all hover:scale-105`}
              >
                <span>Find a {category.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/about"
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition-all"
              >
                How Verification Works
              </Link>
            </div>
          </div>

          {/* Key value props */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: ShieldCheck, label: '3-Level Verified', sub: 'ID, background & trade' },
              { icon: MapPin, label: 'Within 1–5 km', sub: 'Hyperlocal matching' },
              { icon: Clock, label: 'Fast Dispatch', sub: 'Average 30–60 min' },
              { icon: CreditCard, label: 'Transparent Pricing', sub: 'No hidden charges' },
            ].map((p) => {
              const PIcon = p.icon;
              return (
                <div key={p.label} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <PIcon className={`w-5 h-5 ${meta.color}`} />
                  <p className="text-xs font-bold text-white">{p.label}</p>
                  <p className="text-[11px] text-slate-500">{p.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Pricing Table */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className={`text-xs font-bold uppercase tracking-wider ${meta.color}`}>Pricing Guide</span>
          <h2 className="font-heading text-2xl font-bold text-white mt-1">
            Common {category.name} Services &amp; Rates
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            Prices are indicative. Final quote confirmed by provider before work begins.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <div key={s.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between group hover:border-slate-600 transition-all">
              <div>
                <p className="text-sm font-semibold text-white">{s.name}</p>
                <span className={`text-[11px] font-bold uppercase ${meta.color} mt-0.5 block`}>
                  {s.type === 'fixed' ? 'Fixed Rate' : s.type === 'hourly' ? 'Hourly' : 'Range'}
                </span>
              </div>
              <div className="text-right">
                <p className={`text-base font-extrabold font-heading ${meta.color}`}>{s.priceRange}</p>
                <button
                  onClick={() => navigate(`/consumer?category=${categoryId}`)}
                  className="text-[11px] text-slate-500 hover:text-slate-200 transition-colors mt-0.5 flex items-center space-x-1 ml-auto"
                >
                  <span>Book now</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 px-4 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="font-heading text-2xl font-bold text-white">Why Book {category.name}s on WorkWay?</h2>
        </div>
        <ul className="max-w-2xl mx-auto space-y-3">
          {meta.benefits.map((b) => (
            <li key={b} className="flex items-start space-x-3 text-sm text-slate-300">
              <CheckCircle2 className={`w-5 h-5 ${meta.color} shrink-0 mt-0.5`} />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className={`text-xs font-bold uppercase tracking-wider ${meta.color}`}>Common Questions</span>
          <h2 className="font-heading text-2xl font-bold text-white mt-1">
            {category.name} FAQs
          </h2>
        </div>
        <div className="space-y-4">
          {meta.faqs.map((f) => (
            <details key={f.q} className="group p-5 rounded-2xl bg-slate-900 border border-slate-800 cursor-pointer">
              <summary className="flex items-center justify-between text-sm font-semibold text-white list-none">
                <span>{f.q}</span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-open:rotate-90 transition-transform shrink-0 ml-3" />
              </summary>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/faq" className={`text-sm font-semibold ${meta.color} hover:underline flex items-center justify-center space-x-1`}>
            <span>See all FAQs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Other services */}
      <section className="py-12 px-4 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-lg font-bold text-white text-center mb-6">Explore Other Services</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {INITIAL_CATEGORIES.filter((c) => c.id !== categoryId).map((c) => (
              <Link
                key={c.id}
                to={`/services/${c.id}`}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-500 transition-all flex items-center space-x-1.5"
              >
                <span>{c.name}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
