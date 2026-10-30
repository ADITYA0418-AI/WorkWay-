import React, { useState } from 'react';
import { 
  BarChart3, 
  MapPin, 
  Flame, 
  TrendingUp, 
  Users, 
  Zap, 
  ShieldAlert, 
  CheckCircle2, 
  Layers
} from 'lucide-react';

export const MarketplaceAnalyticsView = () => {
  const [toastNotice, setToastNotice] = useState(null);

  const zones = [
    {
      zipcode: '560038',
      name: 'Indiranagar / CMH Road',
      demandLevel: 'VERY HIGH',
      fillRate: '98.2%',
      activePros: 48,
      avgResponseMin: '7.4 mins',
      surgeActive: false,
      topTrade: 'Electrician & AC Servicing',
      densityColor: 'bg-emerald-500'
    },
    {
      zipcode: '560034',
      name: 'Koramangala 4th & 5th Block',
      demandLevel: 'VERY HIGH',
      fillRate: '94.8%',
      activePros: 64,
      avgResponseMin: '8.1 mins',
      surgeActive: false,
      topTrade: 'Plumbing & Kitchen Fix',
      densityColor: 'bg-emerald-500'
    },
    {
      zipcode: '560066',
      name: 'Whitefield IT Corridor',
      demandLevel: 'HIGH',
      fillRate: '88.5%',
      activePros: 36,
      avgResponseMin: '11.2 mins',
      surgeActive: false,
      topTrade: 'Carpentry & Modular Repair',
      densityColor: 'bg-sky-500'
    },
    {
      zipcode: '560102',
      name: 'HSR Layout Sectors 1-6',
      demandLevel: 'HIGH',
      fillRate: '96.0%',
      activePros: 32,
      avgResponseMin: '8.6 mins',
      surgeActive: false,
      topTrade: 'House Cleaning & Maid',
      densityColor: 'bg-emerald-500'
    },
    {
      zipcode: '560041',
      name: 'Jayanagar 4th & 9th Block',
      demandLevel: 'MEDIUM',
      fillRate: '97.5%',
      activePros: 28,
      avgResponseMin: '9.0 mins',
      surgeActive: false,
      topTrade: 'General Handyman & Mount',
      densityColor: 'bg-emerald-500'
    },
    {
      zipcode: '413001',
      name: 'Solapur North Zone',
      demandLevel: 'SURGE DEFICIT (+34%)',
      fillRate: '74.2%',
      activePros: 14,
      avgResponseMin: '16.5 mins',
      surgeActive: true,
      topTrade: 'Emergency Short Circuit Fix',
      densityColor: 'bg-rose-500'
    }
  ];

  const handleToggleSurge = (zoneName) => {
    setToastNotice(`Surge multiplier toggled for ${zoneName}! Standby workers notified.`);
    setTimeout(() => setToastNotice(null), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notice */}
      {toastNotice && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 shadow-2xl shadow-emerald-500/20 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span className="text-xs font-semibold">{toastNotice}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-violet-500/15 text-violet-700 dark:text-violet-300 border border-violet-500/30 text-[10px] font-bold uppercase">
              ANALYTICS
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Marketplace Demand vs Supply Heat Map
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Neighborhood density, fill rates by zipcode & automated surge pricing triggers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm">
            Monitored Zones: <span className="text-slate-900 dark:text-white font-extrabold">{zones.length} Zipcodes</span>
          </span>
        </div>
      </div>

      {/* Zone Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {zones.map((zone) => {
          const isSurge = zone.surgeActive;

          return (
            <div 
              key={zone.zipcode}
              className={`p-5 rounded-3xl bg-white dark:bg-slate-900 border space-y-4 transition-all flex flex-col justify-between shadow-sm ${
                isSurge 
                  ? 'border-rose-300 dark:border-rose-500/50 bg-rose-50/40 dark:bg-slate-900/90 shadow-lg shadow-rose-500/10' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-4 h-4 ${isSurge ? 'text-rose-600 dark:text-rose-400' : 'text-sky-600 dark:text-sky-400'}`} />
                    <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">PIN: {zone.zipcode}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                    isSurge 
                      ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/40 animate-pulse' 
                      : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40'
                  }`}>
                    {zone.demandLevel}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white leading-tight">
                    {zone.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Dominant category: <span className="text-slate-900 dark:text-slate-200 font-semibold">{zone.topTrade}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Fill Rate</span>
                    <span className={`font-bold text-sm mt-0.5 block ${isSurge ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {zone.fillRate}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Active Pros</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm mt-0.5 block">
                      {zone.activePros} Pros On Duty
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleSurge(zone.name)}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isSurge 
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20' 
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{isSurge ? 'Dispatch Standby Reserve' : 'Toggle 1.2x Surge'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
