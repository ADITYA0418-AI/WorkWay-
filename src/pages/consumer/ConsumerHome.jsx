import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { useLocation } from '../../context/LocationContext';
import { calculateWorkWayMatchScore, calculateHaversineDistance } from '../../lib/geo';
import { fetchNearbyProviders } from '../../lib/api';
import { ProviderCard } from '../../components/provider/ProviderCard';
import { MapView } from '../../components/map/MapView';
import { EmergencyModeBanner } from '../../components/consumer/EmergencyModeBanner';
import { SocietyModeBanner } from '../../components/consumer/SocietyModeBanner';
import { AIProblemDiagnosisModal } from '../../components/consumer/AIProblemDiagnosisModal';
import { SmartJobRequestModal } from '../../components/consumer/SmartJobRequestModal';
import { LocationPickerModal } from '../../components/map/LocationPickerModal';
import { SmartFilters, DEFAULT_FILTERS } from '../../components/consumer/SmartFilters';
import { CompareProsModal, CompareFloatingBar } from '../../components/consumer/CompareProsModal';
import { INITIAL_CATEGORIES } from '../../data/mockData';
import { 
  Search, 
  MapPin, 
  Filter, 
  Grid, 
  Map as MapIcon, 
  Sparkles, 
  SlidersHorizontal,
  Zap,
  Building2,
  RotateCcw,
  Layers
} from 'lucide-react';
import { useSeo } from '../../lib/useSeo';

export const ConsumerHome = ({ onOpenChat }) => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const { providers } = useBooking();
  const { coords, radiusKm } = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'map', 'split'
  const [selectedProviderId, setSelectedProviderId] = useState(null);
  const [sortBy, setSortBy] = useState('best_match'); // 'best_match', 'nearest', 'lowest_price', 'highest_rated', 'fastest_response', 'most_experienced'
  
  // Smart Filters State
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  useSeo({
    title: selectedCategory !== 'all' 
      ? `Find Verified ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}s Near You | WorkWay`
      : 'Find Verified Hyper-Local Service Pros Near You | WorkWay',
    description: 'Browse verified electricians, plumbers, appliance technicians, and home service pros near you. Instant booking with escrow safety and live GPS matching.',
  });

  // Compare Pros State (2-3 selected providers)
  const [compareList, setCompareList] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Modals state
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedProviderForBooking, setSelectedProviderForBooking] = useState(null);

  const [apiProviders, setApiProviders] = useState(null); // null = not loaded yet
  const [backendOnline, setBackendOnline] = useState(false);

  // Fetch live providers from backend (PostGIS) whenever location/radius/category changes
  useEffect(() => {
    if (!coords?.lat || !coords?.lng) return;

    const load = async () => {
      try {
        const rows = await fetchNearbyProviders({
          lat: coords.lat,
          lng: coords.lng,
          radius_km: radiusKm,
          category: selectedCategory !== 'all' ? selectedCategory : null
        });
        if (rows && rows.length > 0) {
          setApiProviders(rows);
          setBackendOnline(true);
        }
      } catch (err) {
        console.warn('Backend provider fetch failed, using mock data:', err);
        setBackendOnline(false);
      }
    };

    load();
  }, [coords?.lat, coords?.lng, radiusKm, selectedCategory]);

  // Use backend providers if available, normalized with fallback mock details
  const displayProviders = (backendOnline && apiProviders && apiProviders.length > 0)
    ? apiProviders.map(apiP => {
        const base = providers.find(p => p.id === apiP.id) || {};
        return {
          ...base,
          ...apiP,
          name: apiP.name || apiP.full_name || base.name || 'Service Pro',
          trade: apiP.trade || apiP.category || base.trade || 'handyman',
          tradeLabel: apiP.tradeLabel || base.tradeLabel || (apiP.trade ? apiP.trade.charAt(0).toUpperCase() + apiP.trade.slice(1) : 'Professional'),
          hourlyRate: Number(apiP.hourlyRate || apiP.hourly_rate || base.hourlyRate || 400),
          avatar: apiP.avatar || apiP.avatar_url || base.avatar || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=300',
          rating: Number(apiP.rating || base.rating || 4.8),
          reviewCount: Number(apiP.reviewCount || base.reviewCount || 25),
          dutyStatus: apiP.dutyStatus || (apiP.is_online ? 'available' : 'busy') || base.dutyStatus || 'available',
          latitude: typeof apiP.latitude === 'number' ? apiP.latitude : (typeof apiP.current_latitude === 'number' ? apiP.current_latitude : base.latitude),
          longitude: typeof apiP.longitude === 'number' ? apiP.longitude : (typeof apiP.current_longitude === 'number' ? apiP.current_longitude : base.longitude),
        };
      })
    : providers;

  const resetAllFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handleToggleCompare = (provider) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === provider.id);
      if (exists) {
        return prev.filter((p) => p.id !== provider.id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 professionals at a time.');
        return prev;
      }
      return [...prev, provider];
    });
  };

  const handleRemoveFromCompare = (providerId) => {
    setCompareList((prev) => prev.filter((p) => p.id !== providerId));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  // Filter & Sort Providers
  const filteredProviders = displayProviders.filter((p) => {
    // 1. Distance / Radius Filter (only filter if valid coordinates exist)
    const hasCoords = typeof p.latitude === 'number' && typeof p.longitude === 'number' && !isNaN(p.latitude) && !isNaN(p.longitude);
    if (hasCoords) {
      const dist = calculateHaversineDistance(coords.lat, coords.lng, p.latitude, p.longitude);
      const maxAllowedDist = filters.distance !== null ? filters.distance : radiusKm;
      if (dist > maxAllowedDist) return false;
    }

    // 2. Category Filter
    if (selectedCategory !== 'all' && p.trade !== selectedCategory) return false;

    // 3. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = p.name.toLowerCase().includes(q);
      const tradeMatch = p.trade.toLowerCase().includes(q);
      const tradeLabelMatch = p.tradeLabel?.toLowerCase().includes(q);
      const bioMatch = p.bio.toLowerCase().includes(q);
      const badgeMatch = p.badges?.some(b => b.toLowerCase().includes(q));
      if (!nameMatch && !tradeMatch && !tradeLabelMatch && !bioMatch && !badgeMatch) return false;
    }

    // 4. Price range filter (Hourly rate)
    if (p.hourlyRate < filters.minPrice || p.hourlyRate > filters.maxPrice) return false;

    // 5. Rating filter (4+ or 4.5+)
    if (filters.minRating > 0 && (p.rating || 0) < filters.minRating) return false;

    // 6. Available now toggle
    if (filters.availableNow && p.dutyStatus !== 'available') return false;

    // 7. Emergency Available toggle
    if (filters.emergencyAvailable && !p.emergencyAvailable && !p.badges?.includes('Emergency 24x7')) return false;

    // 8. Background Verified toggle
    if (
      filters.backgroundVerified &&
      p.verificationLevel !== 'level_2_background' &&
      p.verificationLevel !== 'level_3_master_pro' &&
      !p.badges?.includes('Background Cleared')
    ) {
      return false;
    }

    // 9. Master Pro toggle
    if (
      filters.masterPro &&
      p.verificationLevel !== 'level_3_master_pro' &&
      !p.badges?.includes('Master Pro')
    ) {
      return false;
    }

    // 10. Available Today toggle
    if (filters.availableToday && (p.availableToday === false || p.dutyStatus === 'offline')) return false;

    // 11. Fast Response (< 15 mins) toggle
    if (filters.fastResponse && (p.responseTimeMinutes || 99) > 15) return false;

    return true;
  }).sort((a, b) => {
    const distA = calculateHaversineDistance(coords.lat, coords.lng, a.latitude, a.longitude);
    const distB = calculateHaversineDistance(coords.lat, coords.lng, b.latitude, b.longitude);

    if (sortBy === 'nearest') {
      return distA - distB;
    }
    if (sortBy === 'lowest_price') {
      return a.hourlyRate - b.hourlyRate;
    }
    if (sortBy === 'highest_rated') {
      return b.rating - a.rating;
    }
    if (sortBy === 'fastest_response') {
      return (a.responseTimeMinutes || 99) - (b.responseTimeMinutes || 99);
    }
    if (sortBy === 'most_experienced') {
      return (b.jobsCompleted || 0) - (a.jobsCompleted || 0);
    }

    // Default: 'best_match' - Sort by WorkWay Match score
    const scoreA = calculateWorkWayMatchScore(a, coords, selectedCategory).score;
    const scoreB = calculateWorkWayMatchScore(b, coords, selectedCategory).score;
    return scoreB - scoreA;
  });

  return (
    <div className="min-h-screen bg-[#F3F4F6] dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-24 transition-colors duration-200">
      
      {/* Hero Header & Search Section */}
      <section className="relative pt-8 pb-8 px-4 bg-gradient-to-b from-teal-50/70 via-[#F3F4F6] to-[#F3F4F6] dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto space-y-5">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Get work done, right around you.
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                Find trusted, verified skilled service providers within {filters.distance ? `${filters.distance} km` : `${radiusKm} km`} of your location.
              </p>
            </div>

            {/* AI Diagnosis CTA Pill */}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 dark:hover:bg-teal-900/40 border border-teal-200 dark:border-teal-700/50 text-[#0F766E] dark:text-teal-300 text-xs font-bold shadow-sm flex items-center space-x-2 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-[#0F766E] dark:text-teal-400 fill-teal-200 dark:fill-teal-300 animate-pulse" />
              <span>Describe Problem with AI</span>
            </button>
          </div>

          {/* Search Bar Input */}
          <div className="relative max-w-3xl">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search for an electrician, plumber, carpenter, housemaid, or specific repair..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] shadow-sm dark:shadow-xl"
            />
          </div>

          {/* Category Shortcuts Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              All Categories
            </button>

            {INITIAL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/20'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-4">
        
        {/* Emergency Service & Society Banners */}
        <EmergencyModeBanner onTriggerEmergency={() => setSelectedProviderForBooking(filteredProviders[0] || providers[0])} />
        <SocietyModeBanner onSelectProvider={(p) => setSelectedProviderForBooking(p)} />

        {/* Smart Filters & Sort System */}
        <SmartFilters
          filters={filters}
          onFilterChange={setFilters}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResultsCount={filteredProviders.length}
          onResetFilters={resetAllFilters}
        />

        {/* Results Counter & View Switcher Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-semibold">
              Showing <strong className="text-slate-900 dark:text-white">{filteredProviders.length}</strong> {filteredProviders.length === 1 ? 'provider' : 'providers'}
              {filters.distance ? ` within ${filters.distance} km` : ` within ${radiusKm} km`}
            </span>
            {compareList.length > 0 && (
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-sky-100 dark:bg-sky-950 text-[#0284C7] dark:text-sky-300 font-bold hover:underline"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Comparing {compareList.length} pros</span>
              </button>
            )}
          </div>

          {/* List | Map | Split View Mode Switcher */}
          <div className="flex items-center space-x-1 p-1 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start sm:self-auto shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="List View"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>List View</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                viewMode === 'map'
                  ? 'bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Map View"
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map View</span>
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                viewMode === 'split'
                  ? 'bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="List + Map View"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>List + Map</span>
            </button>
          </div>
        </div>

        {/* View Content: List (Grid), Map, or Split */}
        {filteredProviders.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 max-w-md mx-auto my-8 space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center mx-auto">
              <Filter className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-1">
                No matching providers found
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Try widening your distance, adjusting the price range, or clearing some filters.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
              <button
                onClick={resetAllFilters}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs shadow-lg shadow-[#0F766E]/20 flex items-center justify-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs"
              >
                Change Location
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          /* Mode 1: List View (Map hidden completely) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <div 
                key={provider.id}
                onClick={() => setSelectedProviderId(provider.id)}
              >
                <ProviderCard
                  provider={provider}
                  selectedCategory={selectedCategory}
                  isSelected={selectedProviderId === provider.id}
                  isComparing={compareList.some(p => p.id === provider.id)}
                  onToggleCompare={handleToggleCompare}
                  onSelectBooking={(p) => setSelectedProviderForBooking(p)}
                />
              </div>
            ))}
          </div>
        ) : viewMode === 'split' ? (
          /* Mode 2: List + Map View (Side by side on desktop, stacked on mobile) */
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Synchronized List */}
            <div className="w-full lg:col-span-6 space-y-4 lg:max-h-[720px] lg:overflow-y-auto pr-1 scrollbar-thin order-2 lg:order-1">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold px-1 pb-1 flex items-center justify-between">
                <span>{filteredProviders.length} providers available</span>
                <span className="text-[11px] text-sky-600 dark:text-sky-400 font-bold">
                  Click a card or marker to synchronize
                </span>
              </div>
              {filteredProviders.map((provider) => (
                <div
                  key={provider.id}
                  id={`provider-card-${provider.id}`}
                  onClick={() => setSelectedProviderId(provider.id)}
                  className="cursor-pointer transition-transform"
                >
                  <ProviderCard
                    provider={provider}
                    selectedCategory={selectedCategory}
                    isSelected={selectedProviderId === provider.id}
                    isComparing={compareList.some(p => p.id === provider.id)}
                    onToggleCompare={handleToggleCompare}
                    onSelectBooking={(p) => setSelectedProviderForBooking(p)}
                  />
                </div>
              ))}
            </div>

            {/* Right Column: Sticky Interactive Map */}
            <div className="w-full lg:col-span-6 sticky top-20 z-10 order-1 lg:order-2">
              <MapView
                providers={filteredProviders}
                userCoords={coords}
                selectedProviderId={selectedProviderId}
                onSelectProvider={(p) => {
                  setSelectedProviderId(p.id);
                  const el = document.getElementById(`provider-card-${p.id}`);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }
                }}
                onBookProvider={(p) => setSelectedProviderForBooking(p)}
                height="650px"
              />
            </div>
          </div>
        ) : (
          /* Mode 3: Map View (Full Interactive Map) */
          <MapView
            providers={filteredProviders}
            userCoords={coords}
            selectedProviderId={selectedProviderId}
            onSelectProvider={(p) => setSelectedProviderId(p.id)}
            onBookProvider={(p) => setSelectedProviderForBooking(p)}
            height="650px"
          />
        )}

      </main>

      {/* Floating Compare Action Bar */}
      <CompareFloatingBar
        selectedProviders={compareList}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onClearCompare={handleClearCompare}
        onRemoveProvider={handleRemoveFromCompare}
      />

      {/* Side-by-Side Compare Matrix Modal */}
      <CompareProsModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        selectedProviders={compareList}
        userCoords={coords}
        onRemoveProvider={handleRemoveFromCompare}
        onSelectBooking={(provider) => {
          setIsCompareModalOpen(false);
          setSelectedProviderForBooking(provider);
        }}
      />

      {/* Modals */}
      <AIProblemDiagnosisModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      <LocationPickerModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />

      <SmartJobRequestModal
        isOpen={!!selectedProviderForBooking}
        onClose={() => setSelectedProviderForBooking(null)}
        selectedProvider={selectedProviderForBooking}
      />

    </div>
  );
};

