import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../lib/utils';
import { calculateHaversineDistance, calculateWorkWayMatchScore } from '../../lib/geo';
import { RatingStars } from '../common/RatingStars';
import { VerificationBadge } from '../provider/VerificationBadge';
import { WorkWayMatchBadge } from '../provider/WorkWayMatchBadge';
import { 
  X, 
  Check, 
  ArrowRight, 
  Star, 
  MapPin, 
  Clock, 
  Briefcase, 
  DollarSign, 
  ShieldCheck, 
  Zap, 
  Building2, 
  Award,
  Sparkles,
  Layers
} from 'lucide-react';

export const CompareProsModal = ({ 
  isOpen, 
  onClose, 
  selectedProviders = [], 
  userCoords, 
  onSelectBooking,
  onRemoveProvider 
}) => {
  if (!isOpen || selectedProviders.length === 0) return null;

  // Compute best values for highlight indicators
  const bestRating = Math.max(...selectedProviders.map(p => p.rating || 0));
  const minPrice = Math.min(...selectedProviders.map(p => p.hourlyRate || 9999));
  const minResponse = Math.min(...selectedProviders.map(p => p.responseTimeMinutes || 999));
  const maxJobs = Math.max(...selectedProviders.map(p => p.jobsCompleted || 0));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Compare Service Professionals
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-xs font-bold">
                  {selectedProviders.length} Selected
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Side-by-side breakdown of distance, rates, verification credentials, and response speed
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Matrix Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-slate-900 dark:text-slate-100 space-y-6">
          
          {/* Main Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse min-w-[620px]">
              
              {/* Table Header: Provider Profile Columns */}
              <thead>
                <tr className="bg-slate-50/90 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
                  <th className="p-4 w-44 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Criteria
                  </th>
                  {selectedProviders.map((p) => {
                    const match = calculateWorkWayMatchScore(p, userCoords);
                    return (
                      <th key={p.id} className="p-4 text-center align-top relative">
                        {selectedProviders.length > 2 && (
                          <button
                            onClick={() => onRemoveProvider(p.id)}
                            className="absolute top-2 right-2 p-1 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Remove from comparison"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <div className="flex flex-col items-center space-y-2">
                          <div className="relative">
                            <img
                              src={p.avatar}
                              alt={`${p.name}'s profile avatar`}
                              className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-500 shadow-md"
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=300';
                              }}
                            />
                            <span
                              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 ${
                                p.dutyStatus === 'available' ? 'bg-emerald-500' : 'bg-amber-500'
                              }`}
                            />
                          </div>

                          <div>
                            <h4 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                              {p.name}
                            </h4>
                            <p className="text-xs font-medium text-sky-600 dark:text-sky-400 capitalize">
                              {p.tradeLabel || p.trade}
                            </p>
                          </div>

                          <WorkWayMatchBadge matchData={match} />
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              {/* Table Rows */}
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                
                {/* 1. Rating */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-slate-600 dark:text-slate-400 flex items-center space-x-1.5">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>Customer Rating</span>
                  </td>
                  {selectedProviders.map((p) => {
                    const isBest = p.rating === bestRating;
                    return (
                      <td key={p.id} className="p-4 text-center">
                        <div className="inline-flex items-center space-x-1 font-bold text-slate-900 dark:text-white text-sm">
                          <span className="text-amber-500">⭐ {p.rating}</span>
                          <span className="text-slate-400 text-xs font-normal">({p.reviewCount})</span>
                        </div>
                        {isBest && (
                          <div className="mt-1">
                            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                              Top Rated ★
                            </span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* 2. Distance */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-slate-600 dark:text-slate-400 flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-sky-500" />
                    <span>Distance from You</span>
                  </td>
                  {selectedProviders.map((p) => {
                    const dist = calculateHaversineDistance(userCoords.lat, userCoords.lng, p.latitude, p.longitude);
                    return (
                      <td key={p.id} className="p-4 text-center font-bold text-slate-900 dark:text-white text-sm">
                        <span>{dist} km</span>
                        <p className="text-[10px] text-slate-500 font-normal truncate mt-0.5">{p.approxAddress}</p>
                      </td>
                    );
                  })}
                </tr>

                {/* 3. Response Time */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-slate-600 dark:text-slate-400 flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span>Avg Response Time</span>
                  </td>
                  {selectedProviders.map((p) => {
                    const isFastest = p.responseTimeMinutes === minResponse;
                    return (
                      <td key={p.id} className="p-4 text-center">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">
                          ~{p.responseTimeMinutes} mins
                        </span>
                        {isFastest && (
                          <div className="mt-1">
                            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              ⚡ Fastest Reply
                            </span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* 4. Jobs Completed */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-slate-600 dark:text-slate-400 flex items-center space-x-1.5">
                    <Briefcase className="w-4 h-4 text-purple-500" />
                    <span>Jobs Completed</span>
                  </td>
                  {selectedProviders.map((p) => {
                    const isMostExp = p.jobsCompleted === maxJobs;
                    return (
                      <td key={p.id} className="p-4 text-center">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">
                          {p.jobsCompleted}+ jobs
                        </span>
                        {isMostExp && (
                          <div className="mt-1">
                            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                              Most Experienced 🏆
                            </span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* 5. Hourly Rate */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-slate-600 dark:text-slate-400 flex items-center space-x-1.5">
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                    <span>Hourly Rate</span>
                  </td>
                  {selectedProviders.map((p) => {
                    const isCheapest = p.hourlyRate === minPrice;
                    return (
                      <td key={p.id} className="p-4 text-center">
                        <span className="font-black text-slate-900 dark:text-white text-base">
                          {formatCurrency(p.hourlyRate)}
                          <span className="text-xs font-normal text-slate-500">/hr</span>
                        </span>
                        {isCheapest && (
                          <div className="mt-1">
                            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              Best Value 💰
                            </span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* 6. Verification Level */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-slate-600 dark:text-slate-400 flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-sky-500" />
                    <span>Verification Level</span>
                  </td>
                  {selectedProviders.map((p) => (
                    <td key={p.id} className="p-4 text-center">
                      <div className="inline-flex justify-center">
                        <VerificationBadge level={p.verificationLevel} />
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 7. Insurance & Security */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-slate-600 dark:text-slate-400 flex items-center space-x-1.5">
                    <Award className="w-4 h-4 text-indigo-500" />
                    <span>Insurance Coverage</span>
                  </td>
                  {selectedProviders.map((p) => (
                    <td key={p.id} className="p-4 text-center">
                      {p.insuranceVerified ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-bold">
                          <Check className="w-4 h-4" />
                          <span>₹50,000 Insured</span>
                        </span>
                      ) : (
                        <span className="text-slate-400">Standard WorkWay Guarantee</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* 8. Emergency Availability */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-slate-600 dark:text-slate-400 flex items-center space-x-1.5">
                    <Zap className="w-4 h-4 text-rose-500" />
                    <span>Emergency 24x7</span>
                  </td>
                  {selectedProviders.map((p) => (
                    <td key={p.id} className="p-4 text-center">
                      {p.emergencyAvailable ? (
                        <span className="inline-flex items-center space-x-1 text-rose-600 dark:text-rose-400 font-bold px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-[11px]">
                          <Zap className="w-3.5 h-3.5 fill-rose-500" />
                          <span>24x7 Immediate Ready</span>
                        </span>
                      ) : (
                        <span className="text-slate-400">Standard Hours</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* 9. Society Reputation */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-slate-600 dark:text-slate-400 flex items-center space-x-1.5">
                    <Building2 className="w-4 h-4 text-sky-500" />
                    <span>Society / Local Trust</span>
                  </td>
                  {selectedProviders.map((p) => (
                    <td key={p.id} className="p-4 text-center">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {p.societyJobsCompleted || 0} local apartment jobs
                      </span>
                      <p className="text-[10px] text-slate-500 mt-0.5">{p.societyName}</p>
                    </td>
                  ))}
                </tr>

              </tbody>

              {/* Table Footer: Choose Provider Actions */}
              <tfoot>
                <tr className="bg-slate-50/90 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800">
                  <td className="p-4 font-bold text-slate-500 uppercase text-xs">
                    Selection Action
                  </td>
                  {selectedProviders.map((p) => (
                    <td key={p.id} className="p-4 text-center">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectBooking(p);
                        }}
                        className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-sky-600/25 flex items-center justify-center space-x-2 transition-all hover:scale-105"
                      >
                        <span>Choose {p.name.split(' ')[0]}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </td>
                  ))}
                </tr>
              </tfoot>

            </table>
          </div>

        </div>

      </div>
    </div>
  );
};

export const CompareFloatingBar = ({
  selectedProviders = [],
  onOpenCompare,
  onClearCompare,
  onRemoveProvider
}) => {
  if (selectedProviders.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 animate-in fade-in slide-in-from-bottom-6 duration-300">
      <div className="glass-card rounded-2xl p-3 sm:p-4 bg-white/95 dark:bg-slate-900/95 border border-[#0F766E]/40 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3 text-slate-900 dark:text-white">
        
        {/* Left: Selected Pros Avatar Stack */}
        <div className="flex items-center space-x-3 min-w-0">
          <div className="flex -space-x-3 overflow-hidden">
            {selectedProviders.map((p) => (
              <div key={p.id} className="relative group">
                <img
                  src={p.avatar}
                  alt={`${p.name}'s profile avatar`}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-900 shadow-md"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=300';
                  }}
                />
                <button
                  onClick={() => onRemoveProvider(p.id)}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="min-w-0">
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {selectedProviders.map(p => p.name.split(' ')[0]).join(', ')}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#0284C7]/15 text-[#0284C7] border border-[#0284C7]/30">
                {selectedProviders.length}/3
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              {selectedProviders.length < 2
                ? 'Select 1 more pro to compare'
                : 'Ready to compare side-by-side'}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={onClearCompare}
            className="px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Clear
          </button>

          <button
            onClick={onOpenCompare}
            disabled={selectedProviders.length < 2}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
              selectedProviders.length >= 2
                ? 'bg-[#0F766E] hover:bg-[#115E59] text-white shadow-lg shadow-[#0F766E]/30 hover:scale-105'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Compare ({selectedProviders.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
