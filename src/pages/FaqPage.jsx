import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, ArrowRight, Search } from 'lucide-react';
import { useSeo } from '../lib/useSeo';

const FAQ_DATA = [
  {
    category: 'Booking & Finding Providers',
    items: [
      {
        q: 'How do I book a service on WorkWay?',
        a: 'Select your service category, allow location access (or enter your address manually), and WorkWay instantly shows verified providers within 1–5 km sorted by distance, rating, and availability. Tap a provider to view their profile and send a job request.',
      },
      {
        q: 'How quickly can a provider arrive?',
        a: 'Most bookings are matched within a few minutes. Average arrival time for standard requests is 30–60 minutes. Emergency requests are fast-tracked and typically arrive faster, subject to provider availability in your area.',
      },
      {
        q: 'Can I schedule a service in advance?',
        a: 'Yes. When placing a job request, you can select a future date and time slot. Your booking is confirmed once a nearby provider accepts the request.',
      },
      {
        q: 'What is the Society Mode feature?',
        a: 'Society Mode lets you filter and see providers who have been hired and rated by residents within your apartment complex or gated community. This builds a trusted, community-curated shortlist of local workers.',
      },
    ],
  },
  {
    category: 'Provider Verification & Trust',
    items: [
      {
        q: 'How are providers verified on WorkWay?',
        a: 'All providers go through a 3-level verification process: Level 1 (Aadhaar ID + mobile OTP + live selfie match), Level 2 (local address proof + police clearance certificate + trade skill assessment), and Level 3 (Master Pro — 100+ completed jobs, 4.8+ rating, and active liability insurance).',
      },
      {
        q: 'Can I see a provider\'s ID before they arrive?',
        a: 'Yes. Every provider\'s profile shows their verification badge, government ID status, and approval date. You can also view their rating, review count, and past job history.',
      },
      {
        q: 'What happens if a provider behaves inappropriately?',
        a: 'WorkWay has a strict zero-tolerance policy. You can report an issue in-app during or after a job. Our safety team reviews reports within 24 hours and may suspend or permanently remove the provider pending investigation.',
      },
    ],
  },
  {
    category: 'Pricing & Payments',
    items: [
      {
        q: 'How is pricing determined?',
        a: 'WorkWay shows indicative price ranges for each service type upfront. The provider confirms the final price before beginning work. For material costs, you must approve the quote before any purchase is made — no surprises.',
      },
      {
        q: 'What payment methods are accepted?',
        a: 'WorkWay supports UPI (GPay, PhonePe, Paytm), Debit/Credit Cards, and Net Banking via our payment partner. Cash payments are not supported on the platform.',
      },
      {
        q: 'Is my payment held in escrow?',
        a: 'Yes. Payments are held in escrow and only released to the provider after you confirm the job is complete. If there\'s a dispute, our support team reviews it and may hold or refund the amount.',
      },
      {
        q: 'Are there any platform or service fees?',
        a: 'WorkWay charges a small platform convenience fee on each booking which is shown transparently at checkout before you confirm payment.',
      },
    ],
  },
  {
    category: 'Cancellations & Refunds',
    items: [
      {
        q: 'Can I cancel a booking?',
        a: 'Yes. You can cancel for free up to 30 minutes before the scheduled slot. Late cancellations (within 30 minutes) or no-shows may incur a nominal cancellation fee to compensate the provider for their time.',
      },
      {
        q: 'How do I get a refund?',
        a: 'Refunds for eligible cancellations are processed within 5–7 business days to your original payment method. For work quality disputes, contact support within 48 hours of job completion.',
      },
      {
        q: 'Is there a workmanship guarantee?',
        a: 'Yes. WorkWay offers a 48-hour workmanship guarantee. If there is a defect in the work done, contact support and we\'ll arrange a free re-visit by the same (or another) provider.',
      },
    ],
  },
  {
    category: 'Becoming a Provider',
    items: [
      {
        q: 'How do I register as a service provider on WorkWay?',
        a: 'Click "Get Work (Become a Provider)" on the homepage or visit workway.app/auth?role=provider. Complete the registration form, upload your government ID and trade certificate, and our team will review your application within 48–72 hours.',
      },
      {
        q: 'How much does WorkWay charge providers?',
        a: 'WorkWay charges a competitive commission on each completed job. The exact rate depends on your service category and verification level. There are no monthly fees or upfront charges to join.',
      },
      {
        q: 'How do I get paid?',
        a: 'Earnings from completed jobs are credited to your WorkWay wallet weekly and transferred to your registered bank account via NEFT/IMPS. You can also request early payouts from the provider dashboard.',
      },
    ],
  },
];

export const FaqPage = () => {
  const [openItems, setOpenItems] = useState({});
  const [search, setSearch] = useState('');

  useSeo({
    title: 'FAQ — Frequently Asked Questions | WorkWay Home Services',
    description:
      'Answers to common questions about WorkWay: how to book a service, provider verification, payments, cancellation policy, refunds, and how to become a provider.',
    canonical: '/faq',
  });

  const toggle = (key) =>
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));

  const filtered = search.trim()
    ? FAQ_DATA.map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (i) =>
            i.q.toLowerCase().includes(search.toLowerCase()) ||
            i.a.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter((cat) => cat.items.length > 0)
    : FAQ_DATA;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Hero */}
      <section className="relative pt-16 pb-20 px-4 border-b border-slate-800/60 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help Centre</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Everything you need to know about booking services, payments, provider verification, and more.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions…"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            />
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 px-4 max-w-3xl mx-auto space-y-12">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <HelpCircle className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No results found for "{search}"</p>
          </div>
        )}

        {filtered.map((cat) => (
          <div key={cat.category}>
            <h2 className="font-heading text-lg font-bold text-white mb-5 pb-2 border-b border-slate-800">
              {cat.category}
            </h2>
            <div className="space-y-3">
              {cat.items.map((item, idx) => {
                const key = `${cat.category}-${idx}`;
                const isOpen = openItems[key];
                return (
                  <div
                    key={key}
                    className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => toggle(key)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-white hover:text-teal-300 transition-colors"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 shrink-0 ml-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-4">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Still need help */}
      <section className="py-14 px-4 bg-slate-900/60 border-t border-slate-800 text-center">
        <h2 className="font-heading text-xl font-bold text-white mb-2">Still have questions?</h2>
        <p className="text-sm text-slate-400 mb-6">
          Our support team responds within 24 hours on business days.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:support@workway.app"
            className="px-6 py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-sm flex items-center space-x-2 shadow-lg transition-all hover:scale-105"
          >
            <span>Email Support</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            to="/about"
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition-all"
          >
            About WorkWay
          </Link>
        </div>
      </section>
    </div>
  );
};
