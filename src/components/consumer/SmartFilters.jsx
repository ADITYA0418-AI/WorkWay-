import React, { useState } from 'react';
import { 
  Filter, 
  MapPin, 
  DollarSign, 
  Star, 
  Zap, 
  ShieldCheck, 
  Award, 
  Calendar, 
  MessageSquare, 
  X, 
  SlidersHorizontal,
  RotateCcw,
  Check,
  ChevronDown,
  ArrowUpDown
} from 'lucide-react';

export const SORT_OPTIONS = [
  { id: 'best_match', label: 'Best Match', icon: Award, desc: 'WorkWay multi-factor algorithm' },
  { id: 'nearest', label: 'Nearest', icon: MapPin, desc: 'Closest distance to you' },
  { id: 'lowest_price', label: 'Lowest Price', icon: DollarSign, desc: 'Lowest hourly rate first' },
  { id: 'highest_rated', label: 'Highest Rated', icon: Star, desc: 'Top consumer ratings first' },
  { id: 'fastest_response', label: 'Fastest Response', icon: MessageSquare, desc: 'Quickest reply times' },
  { id: 'most_experienced', label: 'Most Experienced', icon: ShieldCheck, desc: 'Highest completed jobs' }
];

export const DISTANCE_OPTIONS = [
  { value: 1, label: '1 km' },
  { value: 3, label: '3 km' },
  { value: 5, label: '5 km' },
  { value: 10, label: '10 km' },
  { value: null, label: 'Any distance' }
];

export const RATING_OPTIONS = [
  { value: 0, label: 'Any Rating' },
  { value: 4.0, label: '4.0+ ⭐' },
  { value: 4.5, label: '4.5+ ⭐' }
];

export const DEFAULT_FILTERS = {
  distance: null, // 1, 3, 5, 10 or null (any)
  minPrice: 0,
  maxPrice: 1000,
  minRating: 0, // 0, 4.0, 4.5
  availableNow: false,
  emergencyAvailable: false,
  backgroundVerified: false,
  masterPro: false,
  availableToday: false,
  fastResponse: false
};

export const SmartFilters = ({
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
  totalResultsCount,
  onResetFilters
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'distance' | 'price' | 'rating' | 'sort' | null

  // Count active non-default filters
  const activeFiltersCount = [
    filters.distance !== null,
    filters.minPrice > 0 || filters.maxPrice < 1000,
    filters.minRating > 0,
    filters.availableNow,
    filters.emergencyAvailable,
    filters.backgroundVerified,
    filters.masterPro,
    filters.availableToday,
    filters.fastResponse
  ].filter(Boolean).length;

  const handleToggle = (key) => {
    onFilterChange({
      ...filters,
      [key]: !filters[key]
    });
  };

  const handleDistanceSelect = (dist) => {
    onFilterChange({
      ...filters,
      distance: dist
    });
    setOpenDropdown(null);
  };

  const handleRatingSelect = (rating) => {
    onFilterChange({
      ...filters,
      minRating: rating
    });
    setOpenDropdown(null);
  };

  const handlePricePreset = (min, max) => {
    onFilterChange({
      ...filters,
      minPrice: min,
      maxPrice: max
    });
    setOpenDropdown(null);
  };

  return (
    <div className="space-y-3 my-4">
      {/* Top Filter & Sort Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        
        {/* Quick Filter Buttons / Scrollable Container */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-1 max-w-full">
          
          {/* Main "All Filters" Button with Active Counter */}
          <button
            onClick={() => setIsModalOpen(true)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center space-x-1.5 transition-all shadow-sm shrink-0 ${
              activeFiltersCount > 0
                ? 'bg-[#0F766E] text-white shadow-[#0F766E]/20'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-white text-[#0F766E] dark:bg-white dark:text-[#0F766E] text-[10px] font-black">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* 📍 Distance Filter Dropdown Button */}
          <div className="relative shrink-0">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'distance' ? null : 'distance')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center space-x-1 border transition-all ${
                filters.distance !== null
                  ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-300 dark:border-sky-700 text-sky-700 dark:text-sky-300 font-bold'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-sky-500" />
              <span>{filters.distance ? `Within ${filters.distance} km` : 'Distance'}</span>
              <ChevronDown className="w-3 h-3 ml-0.5 opacity-60" />
            </button>

            {openDropdown === 'distance' && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setOpenDropdown(null)} />
                <div className="absolute left-0 mt-2 w-44 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-30 space-y-1 animate-in fade-in zoom-in-95">
                  <div className="px-2 py-1 text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">Max Distance</div>
                  {DISTANCE_OPTIONS.map((opt) => (
                    <button
                      key={String(opt.value)}
                      onClick={() => handleDistanceSelect(opt.value)}
                      className={`w-full px-3 py-1.5 rounded-lg text-xs font-medium text-left flex items-center justify-between transition-colors ${
                        filters.distance === opt.value
                          ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {filters.distance === opt.value && <Check className="w-3.5 h-3.5 text-sky-500" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* 💰 Price Range Dropdown Button */}
          <div className="relative shrink-0">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'price' ? null : 'price')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center space-x-1 border transition-all ${
                filters.minPrice > 0 || filters.maxPrice < 1000
                  ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-300 dark:border-sky-700 text-sky-700 dark:text-sky-300 font-bold'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
              <span>
                {filters.minPrice > 0 || filters.maxPrice < 1000
                  ? `₹${filters.minPrice} - ₹${filters.maxPrice}`
                  : 'Price'}
              </span>
              <ChevronDown className="w-3 h-3 ml-0.5 opacity-60" />
            </button>

            {openDropdown === 'price' && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setOpenDropdown(null)} />
                <div className="absolute left-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-3 z-30 space-y-2 animate-in fade-in zoom-in-95">
                  <div className="px-1 text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">Hourly Rate</div>
                  <div className="space-y-1">
                    <button
                      onClick={() => handlePricePreset(0, 1000)}
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      All Rates (₹0 - ₹1,000+)
                    </button>
                    <button
                      onClick={() => handlePricePreset(0, 400)}
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Under ₹400 / hr (Budget)
                    </button>
                    <button
                      onClick={() => handlePricePreset(400, 600)}
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      ₹400 - ₹600 / hr (Standard)
                    </button>
                    <button
                      onClick={() => handlePricePreset(600, 1000)}
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      ₹600+ / hr (Premium)
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ⭐ Rating Filter Dropdown Button */}
          <div className="relative shrink-0">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'rating' ? null : 'rating')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center space-x-1 border transition-all ${
                filters.minRating > 0
                  ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 font-bold'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{filters.minRating > 0 ? `${filters.minRating}+ ⭐` : 'Rating'}</span>
              <ChevronDown className="w-3 h-3 ml-0.5 opacity-60" />
            </button>

            {openDropdown === 'rating' && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setOpenDropdown(null)} />
                <div className="absolute left-0 mt-2 w-40 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-30 space-y-1 animate-in fade-in zoom-in-95">
                  <div className="px-2 py-1 text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">Minimum Rating</div>
                  {RATING_OPTIONS.map((opt) => (
                    <button
                      key={String(opt.value)}
                      onClick={() => handleRatingSelect(opt.value)}
                      className={`w-full px-3 py-1.5 rounded-lg text-xs font-medium text-left flex items-center justify-between transition-colors ${
                        filters.minRating === opt.value
                          ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {filters.minRating === opt.value && <Check className="w-3.5 h-3.5 text-amber-500" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Quick Toggle Chips */}
          <button
            onClick={() => handleToggle('availableNow')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center space-x-1.5 border transition-all shrink-0 ${
              filters.availableNow
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300 font-bold'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Available Now</span>
          </button>

          <button
            onClick={() => handleToggle('emergencyAvailable')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center space-x-1.5 border transition-all shrink-0 ${
              filters.emergencyAvailable
                ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 dark:border-rose-600 text-rose-700 dark:text-rose-300 font-bold'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-rose-500" />
            <span>⚡ Emergency</span>
          </button>

          <button
            onClick={() => handleToggle('backgroundVerified')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center space-x-1.5 border transition-all shrink-0 ${
              filters.backgroundVerified
                ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-400 dark:border-sky-600 text-sky-700 dark:text-sky-300 font-bold'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
            <span>🛡️ Verified</span>
          </button>

          <button
            onClick={() => handleToggle('masterPro')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center space-x-1.5 border transition-all shrink-0 ${
              filters.masterPro
                ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-400 dark:border-amber-600 text-amber-700 dark:text-amber-300 font-bold'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>🏆 Master Pro</span>
          </button>

          <button
            onClick={() => handleToggle('availableToday')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center space-x-1.5 border transition-all shrink-0 ${
              filters.availableToday
                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 dark:border-indigo-600 text-indigo-700 dark:text-indigo-300 font-bold'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
            <span>🗓️ Today</span>
          </button>

          <button
            onClick={() => handleToggle('fastResponse')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center space-x-1.5 border transition-all shrink-0 ${
              filters.fastResponse
                ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-400 dark:border-cyan-600 text-cyan-700 dark:text-cyan-300 font-bold'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-cyan-500" />
            <span>💬 &lt; 15 min Response</span>
          </button>

        </div>

        {/* Sort By Dropdown */}
        <div className="relative shrink-0">
          <button
            onClick={() => setOpenDropdown(openDropdown === 'sort' ? null : 'sort')}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center space-x-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-sky-500" />
            <span>Sort:</span>
            <strong className="text-slate-900 dark:text-white font-bold">
              {SORT_OPTIONS.find(s => s.id === sortBy)?.label || 'Best Match'}
            </strong>
            <ChevronDown className="w-3 h-3 ml-0.5 opacity-60" />
          </button>

          {openDropdown === 'sort' && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setOpenDropdown(null)} />
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-30 space-y-1 animate-in fade-in zoom-in-95">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">Sort Providers By</div>
                {SORT_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  const isSelected = sortBy === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        onSortChange(option.id);
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-3 py-2 rounded-xl text-xs text-left flex items-start space-x-2.5 transition-colors ${
                        isSelected
                          ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{option.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />}
                        </div>
                        <p className="text-[10px] text-slate-600 dark:text-slate-400 font-normal leading-tight mt-0.5">{option.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

      </div>

      {/* Active Filter Chips Bar */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mr-1">Active filters:</span>
          
          {filters.distance !== null && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 text-xs font-medium">
              <span>Within {filters.distance} km</span>
              <button onClick={() => onFilterChange({ ...filters, distance: null })} className="hover:text-sky-950 dark:hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {(filters.minPrice > 0 || filters.maxPrice < 1000) && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
              <span>₹{filters.minPrice} - ₹{filters.maxPrice}/hr</span>
              <button onClick={() => onFilterChange({ ...filters, minPrice: 0, maxPrice: 1000 })} className="hover:text-emerald-950 dark:hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.minRating > 0 && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-medium">
              <span>{filters.minRating}+ ⭐</span>
              <button onClick={() => onFilterChange({ ...filters, minRating: 0 })} className="hover:text-amber-950 dark:hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.availableNow && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
              <span>🟢 Available Now</span>
              <button onClick={() => onFilterChange({ ...filters, availableNow: false })} className="hover:text-emerald-950 dark:hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.emergencyAvailable && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-xs font-medium">
              <span>⚡ Emergency Ready</span>
              <button onClick={() => onFilterChange({ ...filters, emergencyAvailable: false })} className="hover:text-rose-950 dark:hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.backgroundVerified && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 text-xs font-medium">
              <span>🛡️ Verified</span>
              <button onClick={() => onFilterChange({ ...filters, backgroundVerified: false })} className="hover:text-sky-950 dark:hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.masterPro && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-medium">
              <span>🏆 Master Pro</span>
              <button onClick={() => onFilterChange({ ...filters, masterPro: false })} className="hover:text-amber-950 dark:hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.availableToday && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-xs font-medium">
              <span>🗓️ Today</span>
              <button onClick={() => onFilterChange({ ...filters, availableToday: false })} className="hover:text-indigo-950 dark:hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.fastResponse && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 text-xs font-medium">
              <span>💬 &lt; 15 min</span>
              <button onClick={() => onFilterChange({ ...filters, fastResponse: false })} className="hover:text-cyan-950 dark:hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={onResetFilters}
            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset all</span>
          </button>
        </div>
      )}

      {/* Comprehensive Smart Filter Modal / Panel */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                    Smart Filters & Preferences
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Refine providers by distance, rate, credentials, and real-time availability
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-900 dark:text-slate-100">
              
              {/* 1. Distance Filter */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-500" />
                  <span>📍 Maximum Distance</span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {DISTANCE_OPTIONS.map((opt) => (
                    <button
                      key={String(opt.value)}
                      onClick={() => onFilterChange({ ...filters, distance: opt.value })}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
                        filters.distance === opt.value
                          ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/20'
                          : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Hourly Price Range */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                    <span>💰 Hourly Rate Range</span>
                  </label>
                  <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
                    ₹{filters.minPrice} — ₹{filters.maxPrice} / hr
                  </span>
                </div>

                <div className="space-y-3">
                  <input
                    type="range"
                    min="200"
                    max="1000"
                    step="50"
                    value={filters.maxPrice}
                    onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />
                  <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                    <span>Min: ₹200</span>
                    <span>Max: ₹1,000+</span>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => onFilterChange({ ...filters, minPrice: 0, maxPrice: 400 })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                      filters.minPrice === 0 && filters.maxPrice === 400
                        ? 'bg-emerald-500 text-white border-emerald-500'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Budget (&lt; ₹400)
                  </button>
                  <button
                    onClick={() => onFilterChange({ ...filters, minPrice: 400, maxPrice: 600 })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                      filters.minPrice === 400 && filters.maxPrice === 600
                        ? 'bg-emerald-500 text-white border-emerald-500'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Standard (₹400 - ₹600)
                  </button>
                  <button
                    onClick={() => onFilterChange({ ...filters, minPrice: 600, maxPrice: 1000 })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                      filters.minPrice === 600 && filters.maxPrice === 1000
                        ? 'bg-emerald-500 text-white border-emerald-500'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Premium (₹600+)
                  </button>
                  <button
                    onClick={() => onFilterChange({ ...filters, minPrice: 0, maxPrice: 1000 })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                      filters.minPrice === 0 && filters.maxPrice === 1000
                        ? 'bg-slate-700 text-white border-slate-700'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Any Price
                  </button>
                </div>
              </div>

              {/* 3. Rating Selection */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>⭐ Customer Rating</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {RATING_OPTIONS.map((opt) => (
                    <button
                      key={String(opt.value)}
                      onClick={() => onFilterChange({ ...filters, minRating: opt.value })}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                        filters.minRating === opt.value
                          ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20'
                          : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Real-time Availability & Response */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  ⚡ Availability & Timing
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 cursor-pointer hover:border-emerald-500 transition-colors">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block">Available Now</span>
                        <span className="text-[10px] text-slate-600 dark:text-slate-400">Ready to accept jobs immediately</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={filters.availableNow}
                      onChange={() => handleToggle('availableNow')}
                      className="rounded bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-emerald-600 focus:ring-0 w-4 h-4"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 cursor-pointer hover:border-rose-500 transition-colors">
                    <div className="flex items-center space-x-2.5">
                      <Zap className="w-4 h-4 text-rose-500" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block">Emergency Available</span>
                        <span className="text-[10px] text-slate-600 dark:text-slate-400">24x7 immediate dispatch ready</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={filters.emergencyAvailable}
                      onChange={() => handleToggle('emergencyAvailable')}
                      className="rounded bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-rose-600 focus:ring-0 w-4 h-4"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 cursor-pointer hover:border-indigo-500 transition-colors">
                    <div className="flex items-center space-x-2.5">
                      <Calendar className="w-4 h-4 text-indigo-500" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block">Available Today</span>
                        <span className="text-[10px] text-slate-600 dark:text-slate-400">Same-day appointment slots</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={filters.availableToday}
                      onChange={() => handleToggle('availableToday')}
                      className="rounded bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-0 w-4 h-4"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 cursor-pointer hover:border-cyan-500 transition-colors">
                    <div className="flex items-center space-x-2.5">
                      <MessageSquare className="w-4 h-4 text-cyan-500" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block">Fast Response</span>
                        <span className="text-[10px] text-slate-600 dark:text-slate-400">Under 15 mins reply time</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={filters.fastResponse}
                      onChange={() => handleToggle('fastResponse')}
                      className="rounded bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-cyan-600 focus:ring-0 w-4 h-4"
                    />
                  </label>

                </div>
              </div>

              {/* 5. Trust & Verification Level */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  🛡️ Trust & Credentials
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 cursor-pointer hover:border-sky-500 transition-colors">
                    <div className="flex items-center space-x-2.5">
                      <ShieldCheck className="w-4 h-4 text-sky-500" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block">Background Verified</span>
                        <span className="text-[10px] text-slate-600 dark:text-slate-400">Govt ID & police checked</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={filters.backgroundVerified}
                      onChange={() => handleToggle('backgroundVerified')}
                      className="rounded bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-sky-600 focus:ring-0 w-4 h-4"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 cursor-pointer hover:border-amber-500 transition-colors">
                    <div className="flex items-center space-x-2.5">
                      <Award className="w-4 h-4 text-amber-500" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block">Master Pro</span>
                        <span className="text-[10px] text-slate-600 dark:text-slate-400">Trade certified & insured</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={filters.masterPro}
                      onChange={() => handleToggle('masterPro')}
                      className="rounded bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-amber-600 focus:ring-0 w-4 h-4"
                    />
                  </label>

                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
              <button
                onClick={onResetFilters}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All</span>
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold shadow-lg shadow-[#0F766E]/25 transition-all hover:scale-105"
              >
                Apply Filters ({totalResultsCount} Results)
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
