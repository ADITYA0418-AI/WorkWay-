import React, { useState } from 'react';
import { 
  Wrench, 
  Search, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  Phone, 
  Mail, 
  Award,
  Zap,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { useBooking } from '../../../context/BookingContext';
import { formatCurrency } from '../../../lib/utils';

export const ProvidersView = () => {
  const { providers, toggleProviderDuty } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');
  const [tradeFilter, setTradeFilter] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [toastNotice, setToastNotice] = useState(null);

  const defaultProvidersList = [
    {
      id: 'p-101',
      name: 'Rohan Mehta',
      trade: 'electrician',
      tradeLabel: 'Master Electrician',
      avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=300',
      radius: '6.5 km',
      location: 'Indiranagar / MG Road',
      hourlyRate: 550,
      rating: 4.9,
      reviewCount: 142,
      jobsCompleted: 312,
      dutyStatus: 'available',
      verificationLevel: 'level_3_master_pro',
      phone: '+91 98450 12345',
      experienceYears: 8
    },
    {
      id: 'p-102',
      name: 'Suresh Dandekar',
      trade: 'plumber',
      tradeLabel: 'Master Plumber & Pipe Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      radius: '5.0 km',
      location: 'Koramangala 4th Block',
      hourlyRate: 480,
      rating: 4.8,
      reviewCount: 98,
      jobsCompleted: 245,
      dutyStatus: 'available',
      verificationLevel: 'level_2_background_checked',
      phone: '+91 98450 23456',
      experienceYears: 6
    },
    {
      id: 'p-103',
      name: 'Dilip Wankhede',
      trade: 'carpenter',
      tradeLabel: 'Senior Modular Wood Specialist',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
      radius: '8.0 km',
      location: 'Jayanagar 9th Block',
      hourlyRate: 520,
      rating: 4.9,
      reviewCount: 84,
      jobsCompleted: 190,
      dutyStatus: 'busy',
      verificationLevel: 'level_3_master_pro',
      phone: '+91 98450 34567',
      experienceYears: 10
    },
    {
      id: 'p-104',
      name: 'Sunita Gaikwad',
      trade: 'housemaid',
      tradeLabel: 'Sanitization & Deep Cleaning Lead',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
      radius: '4.5 km',
      location: 'HSR Layout Sector 1',
      hourlyRate: 400,
      rating: 4.7,
      reviewCount: 65,
      jobsCompleted: 140,
      dutyStatus: 'offline',
      verificationLevel: 'level_2_background_checked',
      phone: '+91 98450 45678',
      experienceYears: 4
    },
    {
      id: 'p-105',
      name: 'Anil Shinde',
      trade: 'handyman',
      tradeLabel: 'Multi-Skilled Home Repair Expert',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
      radius: '7.2 km',
      location: 'Whitefield IT Corridor',
      hourlyRate: 450,
      rating: 4.6,
      reviewCount: 52,
      jobsCompleted: 110,
      dutyStatus: 'available',
      verificationLevel: 'level_1_id_verified',
      phone: '+91 98450 56789',
      experienceYears: 5
    }
  ];

  const currentProviders = providers && providers.length > 0 ? providers : defaultProvidersList;

  const handleDutyToggle = (providerId, currentStatus) => {
    const nextStatus = currentStatus === 'available' ? 'offline' : 'available';
    if (toggleProviderDuty) {
      toggleProviderDuty(providerId, nextStatus);
    }
    setToastNotice(`Provider ${providerId} status switched to ${nextStatus.toUpperCase()}`);
    setTimeout(() => setToastNotice(null), 3000);
  };

  const filteredProviders = currentProviders.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.trade.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (p.location && p.location.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTrade = tradeFilter === 'all' ? true : p.trade.toLowerCase() === tradeFilter.toLowerCase();
    return matchesSearch && matchesTrade;
  });

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
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 text-[10px] font-bold uppercase">
              OPERATIONS
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Registered Tradespeople & Providers
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Monitor active work status, trade ratings, service radiuses & professional badges.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm">
            Total Active Pros: <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{filteredProviders.length}</span>
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search provider name, trade, area..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Trade Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['all', 'electrician', 'plumber', 'carpenter', 'housemaid', 'handyman'].map((tr) => (
            <button
              key={tr}
              onClick={() => setTradeFilter(tr)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap capitalize transition-all ${
                tradeFilter === tr
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-900'
              }`}
            >
              {tr}
            </button>
          ))}
        </div>
      </div>

      {/* Providers Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
              <tr>
                <th className="px-5 py-3.5">Provider</th>
                <th className="px-5 py-3.5">Trade & Level</th>
                <th className="px-5 py-3.5">Coverage Radius</th>
                <th className="px-5 py-3.5">Rating & Jobs</th>
                <th className="px-5 py-3.5">Rate</th>
                <th className="px-5 py-3.5 text-center">Online Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredProviders.map((p) => {
                const isOnline = p.dutyStatus === 'available';
                return (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={p.avatar || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150'} 
                          alt={p.name} 
                          className="w-9 h-9 rounded-xl object-cover border border-slate-200 dark:border-slate-700" 
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-xs">{p.name}</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">ID: {p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-1">
                        <span className="capitalize px-2.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 text-[11px] font-bold inline-block">
                          {p.trade}
                        </span>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">
                          {p.verificationLevel === 'level_3_master_pro' ? '⭐ Master Pro (L3)' : p.verificationLevel === 'level_2_background_checked' ? '🛡️ Background (L2)' : '✓ ID Verified (L1)'}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                        <span>{p.radius || '5.0 km'}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">{p.location || 'Bangalore Central'}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 font-bold text-amber-500 dark:text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400" />
                        <span>{p.rating || 4.9}</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">({p.reviewCount || 98})</span>
                      </div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{p.jobsCompleted || 120} jobs done</span>
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">
                      ₹{p.hourlyRate || 500}/hr
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => handleDutyToggle(p.id, p.dutyStatus)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                          isOnline
                            ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/25'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {isOnline ? '● Online' : '○ Offline'}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedProvider(p)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 ml-auto transition-all"
                      >
                        <Eye className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                        <span>View Profile</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provider Profile Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedProvider.avatar} 
                  alt={selectedProvider.name} 
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700" 
                />
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">{selectedProvider.name}</h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold capitalize">{selectedProvider.tradeLabel || selectedProvider.trade}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedProvider(null)}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedProvider.bio || 'Experienced certified trade technician serving residential & commercial properties with guaranteed quality workmanship.'}
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Hourly Rate</span>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">₹{selectedProvider.hourlyRate}/hr</p>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Rating & Reviews</span>
                  <p className="font-bold text-amber-500 dark:text-amber-400 text-sm mt-0.5">★ {selectedProvider.rating} ({selectedProvider.reviewCount} reviews)</p>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Experience</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">{selectedProvider.experienceYears || 7} Years</p>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Jobs Completed</span>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{selectedProvider.jobsCompleted || 240} Jobs</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Contact Info</span>
                  <p className="text-slate-900 dark:text-white font-medium mt-0.5">{selectedProvider.phone || '+91 98450 12345'}</p>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Location Hub</span>
                  <p className="text-slate-700 dark:text-slate-300 mt-0.5">{selectedProvider.location || 'Indiranagar, Bangalore'}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  handleDutyToggle(selectedProvider.id, selectedProvider.dutyStatus);
                  setSelectedProvider(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20"
              >
                Toggle Availability
              </button>
              <button
                onClick={() => setSelectedProvider(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
