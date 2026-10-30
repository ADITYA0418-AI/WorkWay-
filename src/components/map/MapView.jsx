import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { calculateHaversineDistance } from '../../lib/geo';
import { formatCurrency } from '../../lib/utils';
import { 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  X, 
  Navigation, 
  ChevronLeft, 
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export const MapView = ({ 
  providers = [], 
  userCoords, 
  selectedProviderId = null,
  onSelectProvider, 
  onBookProvider,
  height = '620px',
  initialSelectedId = null
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const resizeObserverRef = useRef(null);

  // Safe fallback coordinates (MG Road, Bangalore)
  const userLat = (typeof userCoords?.lat === 'number' && !isNaN(userCoords.lat)) ? userCoords.lat : 12.9716;
  const userLng = (typeof userCoords?.lng === 'number' && !isNaN(userCoords.lng)) ? userCoords.lng : 77.5946;

  // Filter only providers with valid numeric coordinates
  const validProviders = useMemo(() => {
    return providers.filter(p => 
      typeof p?.latitude === 'number' && !isNaN(p.latitude) &&
      typeof p?.longitude === 'number' && !isNaN(p.longitude)
    );
  }, [providers]);

  // Selected Provider state
  const [selectedProvider, setSelectedProvider] = useState(null);

  // Sync selected provider when external selectedProviderId or providers change
  useEffect(() => {
    const targetId = selectedProviderId || initialSelectedId;
    if (targetId) {
      const match = validProviders.find(p => p.id === targetId);
      if (match) {
        setSelectedProvider(match);
        return;
      }
    }
    // Default to first valid provider if current selection is invalid
    if (validProviders.length > 0) {
      if (!selectedProvider || !validProviders.some(p => p.id === selectedProvider.id)) {
        setSelectedProvider(validProviders[0]);
      }
    } else {
      setSelectedProvider(null);
    }
  }, [selectedProviderId, initialSelectedId, validProviders]);

  // Initialize and maintain the Leaflet map instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Handle container reuse cleanup safely
    if (mapContainerRef.current._leaflet_id && !mapInstanceRef.current) {
      delete mapContainerRef.current._leaflet_id;
    }

    // Initialize map if not yet created
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: true,
        scrollWheelZoom: true
      }).setView([userLat, userLng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.control.zoom({ position: 'topright' }).addTo(map);
      mapInstanceRef.current = map;

      // Handle container resizing (e.g. split view toggles, window resize)
      if (window.ResizeObserver) {
        resizeObserverRef.current = new ResizeObserver(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        });
        resizeObserverRef.current.observe(mapContainerRef.current);
      }
    } else {
      mapInstanceRef.current.setView([userLat, userLng]);
    }

    const map = mapInstanceRef.current;

    // Force size invalidation shortly after mount to prevent grey tile bug
    const sizeTimer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 150);

    // Clear previous markers
    Object.values(markersRef.current).forEach(m => {
      try {
        map.removeLayer(m);
      } catch (e) {
        // ignore
      }
    });
    markersRef.current = {};

    // 1. Add User Location Marker 🔵 "You"
    const userIcon = L.divIcon({
      className: 'custom-user-marker',
      html: `
        <div class="relative flex items-center justify-center">
          <span class="absolute w-10 h-10 rounded-full bg-[#0284C7]/30 animate-ping"></span>
          <span class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0284C7] to-cyan-500 border-2 border-white shadow-xl flex items-center justify-center text-white text-[11px] font-black">
            You
          </span>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    const userMarker = L.marker([userLat, userLng], { icon: userIcon })
      .bindPopup(`
        <div style="font-family: inherit; font-size: 12px; padding: 2px;">
          <strong style="color: #0284C7;">Your Location</strong><br/>
          <span>${userCoords?.addressLine || 'Current Search Anchor'}</span>
        </div>
      `)
      .addTo(map);
    
    markersRef.current['user'] = userMarker;

    // 2. Add Provider Markers
    validProviders.forEach(p => {
      const isSelected = selectedProvider?.id === p.id;
      const isAvailable = p.dutyStatus === 'available';
      const firstName = (p.name || 'Pro').split(' ')[0];
      const rate = p.hourlyRate ? `₹${p.hourlyRate}` : '';

      const providerIcon = L.divIcon({
        className: `custom-provider-marker-${p.id}`,
        html: `
          <div class="cursor-pointer group flex items-center space-x-1.5 px-3 py-1.5 rounded-full shadow-2xl transition-all duration-300 ${
            isSelected
              ? 'bg-slate-900 text-white ring-4 ring-[#0F766E] scale-110 -translate-y-1 z-30'
              : 'bg-white text-slate-900 border border-slate-200 hover:scale-105 hover:-translate-y-0.5 z-10'
          }">
            <span class="w-2.5 h-2.5 rounded-full shrink-0 ${isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}"></span>
            <span class="text-xs font-black tracking-tight whitespace-nowrap">${firstName}</span>
            ${rate ? `<span class="text-[11px] font-bold text-slate-500">${rate}</span>` : ''}
          </div>
        `,
        iconSize: [110, 36],
        iconAnchor: [55, 18]
      });

      const pMarker = L.marker([p.latitude, p.longitude], { icon: providerIcon })
        .addTo(map);

      // Popup content
      const popupHtml = `
        <div style="font-family: inherit; font-size: 13px; line-height: 1.4; padding: 4px; min-width: 180px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <img src="${p.avatar || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=100'}" 
                 style="width: 36px; height: 36px; border-radius: 10px; object-fit: cover;" />
            <div>
              <strong style="display: block; font-size: 13px;">${p.name}</strong>
              <span style="font-size: 11px; color: #0F766E; font-weight: 600;">${p.tradeLabel || p.trade}</span>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 6px; color: #475569;">
            <span>⭐ ${p.rating || 4.8} (${p.reviewCount || 20})</span>
            <strong>₹${p.hourlyRate || 400}/hr</strong>
          </div>
        </div>
      `;
      pMarker.bindPopup(popupHtml);

      pMarker.on('click', () => {
        setSelectedProvider(p);
        onSelectProvider?.(p);
        map.panTo([p.latitude, p.longitude], { animate: true, duration: 0.6 });
      });

      markersRef.current[p.id] = pMarker;
    });

    // Cleanup on component unmount
    return () => {
      clearTimeout(sizeTimer);
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [validProviders, userLat, userLng]);

  // Handle selectedProvider changes (pan & open popup)
  useEffect(() => {
    if (!selectedProvider || !mapInstanceRef.current) return;
    const marker = markersRef.current[selectedProvider.id];
    if (marker && selectedProvider.latitude && selectedProvider.longitude) {
      mapInstanceRef.current.panTo([selectedProvider.latitude, selectedProvider.longitude], {
        animate: true,
        duration: 0.5
      });
    }
  }, [selectedProvider?.id]);

  // Recenter map to user
  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([userLat, userLng], 14, { duration: 0.8 });
    }
  };

  // Next / Previous Provider Navigation
  const currentIndex = selectedProvider ? validProviders.findIndex(p => p.id === selectedProvider.id) : -1;
  
  const handleNext = () => {
    if (validProviders.length === 0) return;
    const nextIdx = (currentIndex + 1) % validProviders.length;
    const nextP = validProviders[nextIdx];
    setSelectedProvider(nextP);
    onSelectProvider?.(nextP);
  };

  const handlePrev = () => {
    if (validProviders.length === 0) return;
    const prevIdx = (currentIndex - 1 + validProviders.length) % validProviders.length;
    const prevP = validProviders[prevIdx];
    setSelectedProvider(prevP);
    onSelectProvider?.(prevP);
  };

  const handleBookingClick = (provider) => {
    if (onBookProvider) {
      onBookProvider(provider);
    } else if (onSelectProvider) {
      onSelectProvider(provider);
    }
  };

  return (
    <div 
      className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-900 w-full" 
      style={{ height, minHeight: '360px' }}
    >
      {/* Top Map Header Banner */}
      <div className="absolute top-4 left-4 z-[400] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 sm:px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg flex items-center space-x-2 sm:space-x-3 max-w-[calc(100%-80px)]">
        <div className="flex items-center space-x-2 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping"></span>
          <span className="font-heading text-xs font-bold text-slate-900 dark:text-white tracking-wider uppercase">
            WORKWAY MAP
          </span>
        </div>
        <span className="text-[11px] text-slate-400">|</span>
        <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 truncate">
          {validProviders.length} {validProviders.length === 1 ? 'pro on map' : 'pros on map'}
        </span>
      </div>

      {/* Map Recenter & Status Floating Controls */}
      <div className="absolute top-4 right-3 z-[400] flex items-center space-x-2">
        <button
          onClick={handleRecenter}
          className="p-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 shadow-lg transition-all hover:scale-105"
          title="Recenter to You"
          aria-label="Recenter map"
        >
          <Navigation className="w-4 h-4" />
        </button>

        <div className="hidden sm:flex bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 text-[11px] font-semibold items-center space-x-3 text-slate-700 dark:text-slate-300 shadow-lg">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Busy
          </span>
        </div>
      </div>

      {/* Leaflet Map DOM Element */}
      <div ref={mapContainerRef} className="w-full h-full z-0" tabIndex={0} />

      {/* No Geocoded Providers Notice */}
      {validProviders.length === 0 && (
        <div className="absolute inset-0 z-[399] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-6 text-center">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-sm space-y-3 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
              No Providers with Map Coordinates
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              There are no service professionals with coordinates matching the current filters. Switch to <strong>List View</strong> to see all available services.
            </p>
          </div>
        </div>
      )}

      {/* Floating Selected Provider Mini-Card */}
      {selectedProvider && (
        <div className="absolute bottom-4 left-3 right-3 sm:left-auto sm:right-4 sm:w-96 z-[400] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="glass-card rounded-3xl p-4 sm:p-5 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 shadow-2xl backdrop-blur-xl space-y-3">
            
            {/* Top Row: Navigation Controls & Dismiss */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <span>Provider {currentIndex + 1} of {validProviders.length}</span>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={handlePrev}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                  title="Previous Provider"
                  aria-label="Previous provider"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                  title="Next Provider"
                  aria-label="Next provider"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedProvider(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1"
                  title="Close Card"
                  aria-label="Close card"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Provider Details Body */}
            <div className="flex items-start space-x-3.5">
              <div className="relative shrink-0">
                <img
                  src={selectedProvider.avatar || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=300'}
                  alt={selectedProvider.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-sky-500 shadow-md"
                />
                <span
                  className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 ${
                    selectedProvider.dutyStatus === 'available' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-heading text-base font-bold text-slate-900 dark:text-white truncate flex items-center gap-1.5">
                  {selectedProvider.name}
                  {selectedProvider.insuranceVerified && (
                    <ShieldCheck className="w-4 h-4 text-sky-500 shrink-0" title="Verified & Insured" />
                  )}
                </h4>

                <div className="flex items-center gap-2 mt-0.5 text-xs">
                  <span className="text-amber-500 font-bold flex items-center gap-0.5">
                    ⭐ {selectedProvider.rating || 4.8}
                  </span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-0.5 truncate">
                    <MapPin className="w-3 h-3 text-sky-500 shrink-0" />
                    {calculateHaversineDistance(userLat, userLng, selectedProvider.latitude, selectedProvider.longitude)} km away
                  </span>
                </div>

                <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold capitalize mt-0.5 truncate">
                  {selectedProvider.tradeLabel || selectedProvider.trade}
                </p>
              </div>
            </div>

            {/* Price & Action Row */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block leading-none">
                  Rate
                </span>
                <span className="font-heading text-base font-black text-slate-900 dark:text-white mt-0.5 block">
                  {formatCurrency(selectedProvider.hourlyRate || 400)}
                  <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400">/hr</span>
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Link
                  to={`/consumer/providers/${selectedProvider.id}`}
                  className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={() => handleBookingClick(selectedProvider)}
                  className="px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold shadow-lg shadow-[#0F766E]/25 flex items-center space-x-1.5 transition-all hover:scale-105"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Bottom Horizontal Quick Provider Strip for fast switching */}
      {validProviders.length > 0 && (
        <div className="hidden md:flex absolute bottom-4 left-4 z-[400] items-center gap-2 overflow-x-auto max-w-[calc(100%-420px)] p-1.5 rounded-2xl bg-slate-950/75 backdrop-blur-md border border-slate-800 scrollbar-none">
          {validProviders.map((p) => {
            const isSelected = selectedProvider?.id === p.id;
            const dist = calculateHaversineDistance(userLat, userLng, p.latitude, p.longitude);
            return (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedProvider(p);
                  onSelectProvider?.(p);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center space-x-2 transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[#0F766E] text-white shadow-lg shadow-[#0F766E]/30 scale-105'
                    : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${p.dutyStatus === 'available' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span className="font-bold">{(p.name || 'Pro').split(' ')[0]}</span>
                <span className="text-[10px] opacity-80">{dist}km</span>
              </button>
            );
          })}
        </div>
      )}

    </div>
  );
};
