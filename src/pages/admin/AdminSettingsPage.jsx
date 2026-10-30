import React, { useState } from 'react';
import { Settings, Save, Shield, Layers } from 'lucide-react';

export const AdminSettingsPage = () => {
  const [platformFee, setPlatformFee] = useState('49');
  const [proSubFee, setProSubFee] = useState('1650');
  const [radiusDefault, setRadiusDefault] = useState('5');

  const handleSave = (e) => {
    e.preventDefault();
    alert('Platform settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-20 p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">Marketplace Configuration Settings</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Configure platform fees, default search radius & provider subscription prices.</p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Platform Service Fee (₹)
            </label>
            <input
              type="number"
              value={platformFee}
              onChange={(e) => setPlatformFee(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Pro Unlimited Plan (₹/mo)
            </label>
            <input
              type="number"
              value={proSubFee}
              onChange={(e) => setProSubFee(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Default Search Radius (km)
            </label>
            <input
              type="number"
              value={radiusDefault}
              onChange={(e) => setRadiusDefault(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-bold"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs shadow-lg shadow-[#0F766E]/20 flex items-center space-x-1.5"
        >
          <Save className="w-4 h-4" />
          <span>Save Marketplace Settings</span>
        </button>
      </form>
    </div>
  );
};
