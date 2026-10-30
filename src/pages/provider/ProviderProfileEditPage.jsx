import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { User, DollarSign, Briefcase, Plus, Save } from 'lucide-react';

export const ProviderProfileEditPage = () => {
  const { user } = useAuth();
  const { providers } = useBooking();
  const provider = providers.find(p => p.name === (user?.full_name || user?.name)) || providers[0];

  const [bio, setBio] = useState(provider.bio);
  const [hourlyRate, setHourlyRate] = useState(provider.hourlyRate);
  const [serviceRadius, setServiceRadius] = useState(5);

  const handleSave = (e) => {
    e.preventDefault();
    alert('Provider profile settings updated!');
  };

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text pb-20 p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">Provider Profile Settings</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Configure your trade bio, hourly rate, and service radius.</p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Professional Bio
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Hourly Rate (₹)
            </label>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Service Radius (km)
            </label>
            <input
              type="number"
              value={serviceRadius}
              onChange={(e) => setServiceRadius(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-bold"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs shadow-lg shadow-[#0F766E]/20 flex items-center space-x-1.5"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  );
};
