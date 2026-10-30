import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export const CUSTOMER_REVIEWS = [
  {
    id: 1,
    name: 'Meera Nair',
    location: 'Koramangala, Bengaluru',
    service: 'Electrician',
    category: 'electrician',
    rating: 5,
    date: 'October 2026',
    review:
      'Rohan came within 40 minutes to fix our main switch board that had a short circuit. He was polite, explained the issue clearly, and finished the job neatly. The digital invoice was a nice touch — no cash haggling!',
    avatar: 'MN',
    color: 'from-sky-500 to-blue-600',
    verified: true,
  },
  {
    id: 2,
    name: 'Karthik Subramanian',
    location: 'Indiranagar, Bengaluru',
    service: 'Plumber',
    category: 'plumber',
    rating: 5,
    date: 'September 2026',
    review:
      'Had a major bathroom pipe leak late evening. WorkWay matched a Level 2 verified plumber in under 15 minutes. He fixed the pipe, showed me the material cost before buying anything, and the escrow payment was smooth. Highly recommend.',
    avatar: 'KS',
    color: 'from-blue-500 to-cyan-600',
    verified: true,
  },
  {
    id: 3,
    name: 'Anjali Reddy',
    location: 'Banjara Hills, Hyderabad',
    service: 'Deep Home Cleaning',
    category: 'housemaid',
    rating: 5,
    date: 'October 2026',
    review:
      'Booked a deep home clean for our 3BHK before Diwali. The team was punctual, thorough, and used decent products. The Society Mode feature helped me pick a cleaner already trusted by 12 other families in my building — that gave me real confidence.',
    avatar: 'AR',
    color: 'from-emerald-500 to-teal-600',
    verified: true,
  },
  {
    id: 4,
    name: 'Suresh Menon',
    location: 'Andheri West, Mumbai',
    service: 'Carpenter',
    category: 'carpenter',
    rating: 4,
    date: 'August 2026',
    review:
      'Got my IKEA wardrobe assembled and two curtain rods fitted. The carpenter knew exactly what he was doing and was done in 90 minutes. Minor delay in arrival but the app live-tracking meant I knew exactly when he\'d show up.',
    avatar: 'SM',
    color: 'from-amber-500 to-orange-600',
    verified: true,
  },
  {
    id: 5,
    name: 'Divya Krishnamurthy',
    location: 'HSR Layout, Bengaluru',
    service: 'Handyman',
    category: 'handyman',
    rating: 5,
    date: 'October 2026',
    review:
      'Had a list of 5 small tasks — TV mounting, two leaky tap repairs, a curtain rod, and geyser installation. The handyman handled all of them efficiently in one visit. The WorkWay Match AI seems to genuinely know which provider suits which job.',
    avatar: 'DK',
    color: 'from-purple-500 to-indigo-600',
    verified: true,
  },
  {
    id: 6,
    name: 'Rahul Agarwal',
    location: 'Viman Nagar, Pune',
    service: 'Electrician',
    category: 'electrician',
    rating: 5,
    date: 'September 2026',
    review:
      'Best service app I\'ve used in India for home repairs. The 3-level verified badge actually means something — I saw the technician\'s Aadhaar number and police clearance status before he entered my home. That\'s real trust.',
    avatar: 'RA',
    color: 'from-rose-500 to-pink-600',
    verified: true,
  },
];

const StarRating = ({ rating, size = 'sm' }) => {
  const s = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';
  return (
    <div className="flex items-center space-x-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${s} ${i <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`}
        />
      ))}
    </div>
  );
};

/**
 * CustomerReviews — standalone section component.
 * Props:
 *   limit: max number of reviews to show (default: all)
 *   showCarousel: show arrow navigation (default: false, shows grid)
 */
export const CustomerReviews = ({ limit, showCarousel = false }) => {
  const reviews = limit ? CUSTOMER_REVIEWS.slice(0, limit) : CUSTOMER_REVIEWS;
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(reviews.length / perPage);
  const visible = showCarousel
    ? reviews.slice(page * perPage, page * perPage + perPage)
    : reviews;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((r) => (
          <div
            key={r.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col space-y-4 hover:border-slate-600 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {r.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{r.name}</p>
                  <p className="text-[11px] text-slate-500">{r.location}</p>
                </div>
              </div>
              <Quote className="w-5 h-5 text-slate-700 shrink-0" />
            </div>

            {/* Rating + Service */}
            <div className="flex items-center justify-between">
              <StarRating rating={r.rating} />
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                {r.service}
              </span>
            </div>

            {/* Review text */}
            <p className="text-xs text-slate-400 leading-relaxed flex-1">"{r.review}"</p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-[10px] text-slate-600">{r.date}</span>
              {r.verified && (
                <span className="text-[10px] font-semibold text-emerald-400 flex items-center space-x-1">
                  <span>✓</span>
                  <span>Verified Booking</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {showCarousel && totalPages > 1 && (
        <div className="flex items-center justify-center space-x-4 pt-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 disabled:opacity-30 transition-all"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs text-slate-500">{page + 1} / {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 disabled:opacity-30 transition-all"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
