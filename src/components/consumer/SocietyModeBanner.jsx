import React, { useState, useRef } from 'react';
import { Building2, Star, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const SocietyModeBanner = ({ societyName = 'Green Valley Apartments', onSelectProvider }) => {
  const { providers } = useBooking();
  const societyProviders = providers.filter(p => p.societyJobsCompleted > 0);
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items to ensure a continuous seamless horizontal marquee movement loop
  const displayProviders = societyProviders.length > 0
    ? [...societyProviders, ...societyProviders, ...societyProviders]
    : [];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/60 border border-slate-800 my-6 overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 text-xs font-bold text-sky-400">
          <Building2 className="w-4 h-4 text-sky-400" />
          <span className="uppercase tracking-wider">Society Community Hub</span>
        </div>

        {/* Horizontal Movement & Scroll Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1 px-2 border border-slate-700/50"
            title={isPaused ? "Resume Auto-move" : "Pause Auto-move"}
          >
            {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3 text-amber-400" />}
            <span className="text-[10px] hidden sm:inline">{isPaused ? 'Paused' : 'Auto-moving'}</span>
          </button>
          <button
            type="button"
            onClick={() => scroll('left')}
            className="p-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/50"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="p-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/50"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="font-heading text-base font-bold text-white flex items-center gap-1.5">
            <span>{societyName}</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px]">
              Verified Resident Hub
            </span>
          </h3>
          <p className="text-xs text-slate-300">
            Top rated service providers hired and trusted by your apartment neighbours.
          </p>
        </div>
      </div>

      {/* Horizontal Marquee / Continuous Scroll Container */}
      <div className="relative overflow-hidden rounded-xl">
        <div
          ref={scrollRef}
          className="overflow-x-auto pb-2 scrollbar-none scroll-smooth"
        >
          <div
            className={`gap-3 ${!isPaused ? 'animate-marquee-horizontal' : 'flex'}`}
          >
            {displayProviders.map((p, idx) => (
              <div
                key={`${p.id}-${idx}`}
                onClick={() => onSelectProvider(p)}
                className="w-56 shrink-0 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 cursor-pointer transition-all hover:scale-[1.02] group shadow-md"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <img
                    src={p.avatar}
                    alt={`${p.name}'s profile avatar`}
                    className="w-9 h-9 rounded-xl object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=300';
                    }}
                  />
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors truncate">{p.name}</h4>
                    <p className="text-[10px] text-sky-400 capitalize truncate">{p.trade}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-300 pt-2 border-t border-slate-800/80">
                  <span className="flex items-center text-amber-400 font-bold">
                    <Star className="w-3 h-3 fill-amber-400 mr-1" />
                    {p.rating}
                  </span>
                  <span className="text-slate-400">
                    <strong>{p.societyJobsCompleted}</strong> jobs here
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

