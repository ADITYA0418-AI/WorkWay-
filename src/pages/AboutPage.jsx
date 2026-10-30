import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Users, Zap, MapPin, Award, Heart,
  CheckCircle2, ArrowRight, Building2, Star,
  TrendingUp, Globe, PhoneCall, Mail, ChevronDown
} from 'lucide-react';
import { useSeo } from '../lib/useSeo';
import { BUSINESS_DETAILS } from '../data/businessDetails';

const TEAM = [
  {
    name: 'Arjun Kapoor',
    role: 'Co-Founder & CEO',
    bio: 'Ex-Swiggy engineering lead with 8 years in hyperlocal logistics and marketplace infrastructure.',
    initials: 'AK',
    color: 'from-sky-500 to-blue-600',
  },
  {
    name: 'Priya R.',
    role: 'Co-Founder & COO',
    bio: 'Former UrbanClap ops lead who scaled 50+ city expansions. Heads provider quality and grievance redressal.',
    initials: 'PR',
    color: 'from-teal-500 to-emerald-600',
  },
  {
    name: 'Vikram Nair',
    role: 'CTO',
    bio: 'Distributed systems engineer with prior stints at Zepto and CRED. Architected WorkWay\'s real-time matching engine.',
    initials: 'VN',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    name: 'Sneha Desai',
    role: 'Head of Trust & Safety',
    bio: 'Former police verification specialist turned tech safety leader. Leads 3-level provider verification standards.',
    initials: 'SD',
    color: 'from-amber-500 to-orange-600',
  },
];

const MILESTONES = [
  { year: '2023', event: 'WorkWay founded in Bengaluru. Pilot with 50 providers in Koramangala.' },
  { year: 'Mar 2024', event: 'Incorporated as WorkWay Hyperlocal Technologies Pvt. Ltd. (CIN: U72900KA2024PTC189421).' },
  { year: 'Jul 2024', event: 'Expanded to 3 cities. 1,000+ verified providers onboarded.' },
  { year: 'Oct 2024', event: 'Launched Society Mode — apartment-level reputation network.' },
  { year: '2025', event: 'AI Problem Diagnosis, Escrow-protected payments, and real-time job tracking go live.' },
  { year: '2026', event: 'Active across Bengaluru, Mumbai, and Hyderabad with 10,000+ completed jobs.' },
];

const VALUES = [
  {
    icon: Shield,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    title: 'Trust by Default',
    desc: 'Every provider must pass 3-level verification — Aadhaar, background check, and trade skill assessment — before they appear on the platform.',
  },
  {
    icon: MapPin,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/20',
    title: 'Truly Hyperlocal',
    desc: 'We match you with skilled workers within 1–5 km of your home, not the next neighbourhood or city.',
  },
  {
    icon: Users,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
    title: 'Provider Prosperity',
    desc: 'We charge transparent, fair commissions. Providers keep the majority of every job earning, with weekly direct bank payouts.',
  },
  {
    icon: Heart,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/20',
    title: 'Community First',
    desc: 'Society Mode lets neighbours share trusted providers. Local trust networks make the platform stronger for everyone.',
  },
];

export const AboutPage = () => {
  useSeo({
    title: 'About WorkWay — India\'s Trusted Hyperlocal Service Marketplace',
    description:
      'Learn about WorkWay Hyperlocal Technologies — our mission to connect homes with verified skilled workers within 5 km, our founding story, team, and values.',
    canonical: '/about',
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Hero */}
      <section className="relative pt-20 pb-24 px-4 overflow-hidden border-b border-slate-800/60">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-teal-600/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5" />
            <span>Our Story</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Built to make skilled help{' '}
            <span className="bg-gradient-to-r from-teal-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              trustworthy and nearby.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            WorkWay is India's hyperlocal on-demand marketplace for home services. We connect homeowners and renters
            with background-verified electricians, plumbers, carpenters, housemaids, and handymen — all within 1–5 km.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to="/consumer"
              className="px-6 py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-sm flex items-center space-x-2 transition-all hover:scale-105 shadow-lg shadow-[#0F766E]/20"
            >
              <span>Find a Service</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition-all"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 px-4 bg-slate-900/60 border-b border-slate-800/60">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '10,000+', label: 'Jobs Completed', icon: CheckCircle2, color: 'text-emerald-400' },
            { value: '1,200+', label: 'Verified Providers', icon: Shield, color: 'text-sky-400' },
            { value: '3 Cities', label: 'Active Markets', icon: MapPin, color: 'text-purple-400' },
            { value: '4.7★', label: 'Avg Provider Rating', icon: Star, color: 'text-amber-400' },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <Icon className={`w-6 h-6 mx-auto mb-2 ${s.color}`} />
                <div className={`text-2xl font-heading font-extrabold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-slate-400 mt-1">{s.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mission / Values */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">What We Stand For</span>
          <h2 className="font-heading text-3xl font-bold text-white mt-1">Our Core Values</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className={`p-6 rounded-2xl border ${v.bg} text-left space-y-3`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${v.bg} border`}>
                  <Icon className={`w-5 h-5 ${v.color}`} />
                </div>
                <h3 className="text-sm font-bold text-white">{v.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-slate-900/60 border-y border-slate-800/60">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">How We Got Here</span>
            <h2 className="font-heading text-3xl font-bold text-white mt-1">Our Journey</h2>
          </div>
          <div className="relative border-l-2 border-slate-800 pl-8 space-y-8">
            {MILESTONES.map((m) => (
              <div key={m.year} className="relative">
                <div className="absolute -left-[2.6rem] top-0.5 w-4 h-4 rounded-full bg-[#0F766E] border-2 border-slate-900 shadow-md" />
                <div className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">{m.year}</div>
                <p className="text-sm text-slate-300 mt-0.5 leading-relaxed">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">The People Building WorkWay</span>
          <h2 className="font-heading text-3xl font-bold text-white mt-1">Leadership Team</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((t) => (
            <div key={t.name} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-center">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center mx-auto text-white font-bold text-xl`}>
                {t.initials}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{t.name}</h3>
                <p className="text-xs text-teal-400 font-semibold mt-0.5">{t.role}</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{t.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Legal Entity */}
      <section className="py-12 px-4 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <Building2 className="w-8 h-8 text-sky-400 mx-auto" />
          <h2 className="font-heading text-lg font-bold text-white">Registered Corporate Entity</h2>
          <p className="text-sm font-semibold text-slate-300">{BUSINESS_DETAILS.legalName}</p>
          <p className="text-xs text-slate-400 font-mono">CIN: {BUSINESS_DETAILS.cin} | GSTIN: {BUSINESS_DETAILS.gstin}</p>
          <p className="text-xs text-slate-500">{BUSINESS_DETAILS.registeredOffice.fullAddress}</p>
          <div className="flex flex-wrap justify-center gap-4 pt-3 text-xs">
            <a href={`tel:${BUSINESS_DETAILS.support.tollFree}`} className="flex items-center space-x-1.5 text-sky-400 hover:underline">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{BUSINESS_DETAILS.support.tollFree}</span>
            </a>
            <a href={`mailto:${BUSINESS_DETAILS.support.email}`} className="flex items-center space-x-1.5 text-teal-400 hover:underline">
              <Mail className="w-3.5 h-3.5" />
              <span>{BUSINESS_DETAILS.support.email}</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center max-w-2xl mx-auto">
        <TrendingUp className="w-10 h-10 text-teal-400 mx-auto mb-4" />
        <h2 className="font-heading text-2xl font-bold text-white mb-3">Ready to experience the difference?</h2>
        <p className="text-sm text-slate-400 mb-6">Book a verified service pro near you in under 2 minutes.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/consumer"
            className="px-7 py-3.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-sm shadow-lg shadow-[#0F766E]/30 flex items-center space-x-2 transition-all hover:scale-105"
          >
            <span>Book a Service</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/faq"
            className="px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition-all"
          >
            Read our FAQ
          </Link>
        </div>
      </section>
    </div>
  );
};
