import React from 'react';
import { Link } from 'react-router-dom';
import { RatingStars } from '../common/RatingStars';
import { VerificationBadge } from './VerificationBadge';
import { WorkWayMatchBadge } from './WorkWayMatchBadge';
import { useLocation } from '../../context/LocationContext';
import { calculateWorkWayMatchScore } from '../../lib/geo';
import { formatCurrency } from '../../lib/utils';
import { MapPin, Clock, CheckCircle2, Shield, ArrowRight, Building2, CheckSquare, Square } from 'lucide-react';

export const ProviderCard = ({ 
  provider, 
  onSelectBooking, 
  selectedCategory,
  isComparing = false,
  isSelected = false,
  onToggleCompare
}) => {
  const { coords } = useLocation();
  const matchData = calculateWorkWayMatchScore(provider, coords, selectedCategory);

  const isAvailable = provider.dutyStatus === 'available';

  return (
    <div className={`glass-card rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 bg-white dark:bg-slate-900/80 border ${
      isSelected
        ? 'border-sky-500 ring-2 ring-sky-500/70 shadow-xl shadow-sky-500/15 bg-sky-50/40 dark:bg-sky-950/30'
        : isComparing 
          ? 'border-[#0F766E] ring-2 ring-[#0F766E]/40 shadow-lg shadow-[#0F766E]/10' 
          : 'border-slate-200 dark:border-slate-800'
    }`}>
      <div>
        {/* Top Header: Avatar, Name, Match Score, Compare Checkbox */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start space-x-3">
            <div className="relative">
              <img
                src={provider.avatar}
                alt={`${provider.name}'s profile avatar`}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 group-hover:border-[#0F766E]/50 transition-colors"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=300';
                }}
              />
              <span
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 ${
                  isAvailable ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                title={isAvailable ? 'Available Now' : 'Busy'}
              ></span>
            </div>
            <div>
              <h3 className="font-heading text-base font-semibold text-slate-900 dark:text-white group-hover:text-[#0F766E] dark:group-hover:text-teal-400 transition-colors flex items-center gap-1.5">
                {provider.name}
                {provider.insuranceVerified && (
                  <Shield className="w-3.5 h-3.5 text-[#0284C7] dark:text-sky-400" title="Insurance Verified" />
                )}
              </h3>
              <p className="text-xs text-[#0284C7] dark:text-sky-400 font-semibold capitalize">{provider.tradeLabel || provider.trade}</p>
              <div className="mt-1">
                <RatingStars rating={provider.rating} reviewCount={provider.reviewCount} size="xs" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-1.5">
            <WorkWayMatchBadge matchData={matchData} />
            {onToggleCompare && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleCompare(provider);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center space-x-1 transition-all ${
                  isComparing
                    ? 'bg-[#0F766E] text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-[#0F766E] dark:hover:text-white'
                }`}
                title={isComparing ? 'Remove from compare' : 'Add to compare (max 3)'}
              >
                {isComparing ? (
                  <CheckSquare className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Square className="w-3.5 h-3.5" />
                )}
                <span>Compare</span>
              </button>
            )}
          </div>
        </div>

        {/* Verification & Badges */}
        <div className="flex flex-wrap items-center gap-1.5 my-2.5">
          <VerificationBadge level={provider.verificationLevel} />
          {provider.emergencyAvailable && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-bold text-[#E11D48] dark:text-rose-400">
              <span>⚡ Emergency Ready</span>
            </span>
          )}
          {provider.responseTimeMinutes <= 10 && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-600 dark:text-cyan-400">
              <span>💬 Fast Reply</span>
            </span>
          )}
          {provider.societyJobsCompleted > 0 && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-medium text-slate-700 dark:text-slate-300">
              <Building2 className="w-3 h-3 text-[#0284C7] dark:text-sky-400" />
              <span>{provider.societyJobsCompleted} jobs nearby</span>
            </span>
          )}
        </div>

        {/* Bio snippet */}
        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
          {provider.bio}
        </p>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-xs mb-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Distance</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[#0284C7] dark:text-sky-400" />
              {matchData.distance} km
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Response</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              ~{provider.responseTimeMinutes}m
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Completed</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3 h-3 text-purple-600 dark:text-purple-400" />
              {provider.jobsCompleted}+
            </span>
          </div>
        </div>

        {/* 🏅 Why this pro? Highlights Box */}
        <div className="mb-4 p-3 rounded-xl bg-teal-50/50 dark:bg-slate-900/70 border border-teal-100 dark:border-slate-800 text-xs">
          <div className="flex items-center space-x-1.5 font-bold text-slate-900 dark:text-slate-200 text-[11px] mb-2">
            <span>🏅</span>
            <span className="uppercase tracking-wider font-extrabold text-[10px] text-[#0F766E] dark:text-teal-400">Why this pro?</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-2 text-[11px] text-slate-700 dark:text-slate-300">
            <div className="flex items-center space-x-1.5">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>{provider.experienceYears || 5}+ years experience</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>{provider.completionRatePercent || 98}% jobs completed</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>{provider.repeatCustomersCount || 40} repeat customers</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>Responds within ~{provider.responseTimeMinutes || 10} min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Pricing & CTA */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold block">Rate</span>
          <span className="font-heading text-lg font-bold text-slate-900 dark:text-white">
            {formatCurrency(provider.hourlyRate)}
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/hr</span>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to={`/consumer/providers/${provider.id}`}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            Profile
          </Link>
          <button
            onClick={() => onSelectBooking(provider)}
            className="px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold shadow-md shadow-[#0F766E]/20 flex items-center space-x-1.5 transition-all group-hover:scale-[1.02]"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
