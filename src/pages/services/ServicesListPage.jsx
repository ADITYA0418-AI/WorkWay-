import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Wrench, Hammer, Sparkles, ShieldCheck, ArrowRight, ChevronRight } from 'lucide-react';
import { INITIAL_CATEGORIES } from '../../data/mockData';
import { useSeo } from '../../lib/useSeo';

const ICON_MAP = { Zap, Wrench, Hammer, Sparkles, ShieldCheck };

const CAT_COLORS = {
  electrician: { color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' },
  plumber:     { color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  carpenter:   { color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  housemaid:   { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  handyman:    { color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
};

export const ServicesListPage = () => {
  useSeo({
    title: 'Home Services Near You — Electrician, Plumber, Carpenter & More | WorkWay',
    description:
      'Browse all WorkWay home services: electrician, plumber, carpenter, housemaid, and handyman. Verified providers within 1–5 km. Transparent pricing, live tracking.',
    canonical: '/services',
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Hero */}
      <section className="relative pt-16 pb-20 px-4 border-b border-slate-800/60 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>All Services — Verified Providers</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Every Home Service,{' '}
            <span className="bg-gradient-to-r from-teal-300 to-sky-400 bg-clip-text text-transparent">
              Right Near You
            </span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            From emergency electrical fixes to deep home cleaning — WorkWay connects you with
            background-verified skilled workers within 1–5 km of your home.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Zap;
            const style = CAT_COLORS[cat.id] || { color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' };
            return (
              <Link
                key={cat.id}
                to={`/services/${cat.id}`}
                className="group p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1 flex flex-col space-y-4"
              >
                <div className={`w-12 h-12 rounded-2xl ${style.bg} border flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${style.color}`} />
                </div>
                <div>
                  <h2 className="text-lg font-heading font-bold text-white group-hover:text-teal-300 transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{cat.description}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Popular Services</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.popularServices.slice(0, 3).map((s) => (
                      <span key={s} className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${style.bg} ${style.color}`}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={`flex items-center space-x-1 text-xs font-bold ${style.color} mt-auto`}>
                  <span>View {cat.name} Services</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 px-4 bg-slate-900/60 border-t border-slate-800 text-center">
        <h2 className="font-heading text-2xl font-bold text-white mb-3">Not sure which service you need?</h2>
        <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">
          Use our AI Problem Diagnosis to describe the issue and let WorkWay recommend the right skilled worker.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/consumer"
            className="px-7 py-3.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-sm flex items-center space-x-2 shadow-lg shadow-[#0F766E]/20 transition-all hover:scale-105"
          >
            <span>Go to Marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/faq"
            className="px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition-all"
          >
            FAQs
          </Link>
        </div>
      </section>
    </div>
  );
};
