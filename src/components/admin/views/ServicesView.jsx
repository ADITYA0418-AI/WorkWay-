import React, { useState } from 'react';
import { 
  Store, 
  Zap, 
  Wrench, 
  Hammer, 
  Sparkles, 
  ShieldCheck, 
  Tv, 
  Paintbrush, 
  Bug, 
  Plus, 
  CheckCircle2, 
  ToggleLeft, 
  ToggleRight, 
  Sliders, 
  Edit2, 
  X,
  TrendingUp
} from 'lucide-react';

export const ServicesView = () => {
  const [toastNotice, setToastNotice] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const [categories, setCategories] = useState([
    {
      id: 'electrician',
      name: 'Electrician',
      icon: Zap,
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-500/15',
      border: 'border-amber-500/30',
      description: 'Wiring, MCB, fan installation, switch replacement & short circuit diagnostics',
      minRate: 300,
      maxRate: 800,
      enabled: true,
      activePros: 114,
      avgBooking: 1450,
      commissionPercent: 10
    },
    {
      id: 'plumber',
      name: 'Plumber',
      icon: Wrench,
      color: 'text-sky-600 dark:text-sky-400',
      bg: 'bg-sky-500/15',
      border: 'border-sky-500/30',
      description: 'Pipe leakage, tap repair, drain cleaning, water tank & sanitary installation',
      minRate: 250,
      maxRate: 750,
      enabled: true,
      activePros: 88,
      avgBooking: 1100,
      commissionPercent: 10
    },
    {
      id: 'carpenter',
      name: 'Carpenter',
      icon: Hammer,
      color: 'text-orange-500 dark:text-orange-400',
      bg: 'bg-orange-500/15',
      border: 'border-orange-500/30',
      description: 'Furniture assembly, modular kitchen work, door locks & woodwork repairs',
      minRate: 350,
      maxRate: 900,
      enabled: true,
      activePros: 62,
      avgBooking: 1650,
      commissionPercent: 10
    },
    {
      id: 'maid',
      name: 'Housemaid & Cleaning',
      icon: Sparkles,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-500/15',
      border: 'border-purple-500/30',
      description: 'Deep home cleaning, daily maid service, kitchen & bathroom sanitation',
      minRate: 300,
      maxRate: 650,
      enabled: true,
      activePros: 54,
      avgBooking: 2200,
      commissionPercent: 12
    },
    {
      id: 'handyman',
      name: 'Handyman & Mounting',
      icon: ShieldCheck,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-500/15',
      border: 'border-emerald-500/30',
      description: 'TV wall mount, curtain rods, drilling work & minor fixtures installation',
      minRate: 250,
      maxRate: 600,
      enabled: true,
      activePros: 42,
      avgBooking: 850,
      commissionPercent: 10
    },
    {
      id: 'painting',
      name: 'Home Painting',
      icon: Paintbrush,
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-500/15',
      border: 'border-rose-500/30',
      description: 'Interior wall painting, waterproof coating & decorative texture work',
      minRate: 400,
      maxRate: 1200,
      enabled: true,
      activePros: 28,
      avgBooking: 4800,
      commissionPercent: 15
    },
    {
      id: 'pest_control',
      name: 'Pest Control',
      icon: Bug,
      color: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-500/15',
      border: 'border-teal-500/30',
      description: 'Termite inspection, herbal pest repellent & cockpit eradication',
      minRate: 450,
      maxRate: 1000,
      enabled: false,
      activePros: 16,
      avgBooking: 1500,
      commissionPercent: 12
    }
  ]);

  const handleToggleCategory = (id) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id === id) {
          const nextState = !cat.enabled;
          setToastNotice(`${cat.name} category is now ${nextState ? 'ENABLED' : 'DISABLED'}`);
          setTimeout(() => setToastNotice(null), 3000);
          return { ...cat, enabled: nextState };
        }
        return cat;
      })
    );
  };

  const handleSaveRates = (e) => {
    e.preventDefault();
    if (!editingCategory) return;
    setCategories(prev =>
      prev.map(c => c.id === editingCategory.id ? editingCategory : c)
    );
    setToastNotice(`Hourly bounds for ${editingCategory.name} updated successfully!`);
    setTimeout(() => setToastNotice(null), 3000);
    setEditingCategory(null);
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
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase">
              OPERATIONS
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Service Categories & Rate Bounds
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Define pricing guardrails, commission percentages & marketplace category availability.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm">
            Active Categories: <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{categories.filter(c => c.enabled).length}</span> / {categories.length}
          </span>
        </div>
      </div>

      {/* Categories Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div 
              key={cat.id} 
              className={`p-5 rounded-3xl bg-white dark:bg-slate-900 border transition-all flex flex-col justify-between space-y-4 shadow-sm ${
                cat.enabled 
                  ? 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700' 
                  : 'border-slate-200/60 dark:border-slate-800/40 opacity-60 bg-slate-50 dark:bg-slate-950/60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-2xl ${cat.bg} ${cat.color} border ${cat.border}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">{cat.name}</h3>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">{cat.activePros} Pros Active</p>
                    </div>
                  </div>

                  {/* Enable/Disable Toggle */}
                  <button
                    onClick={() => handleToggleCategory(cat.id)}
                    className={`p-1.5 rounded-xl transition-all ${
                      cat.enabled 
                        ? 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10' 
                        : 'text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    title={cat.enabled ? 'Disable Category' : 'Enable Category'}
                  >
                    {cat.enabled ? (
                      <ToggleRight className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-7 h-7 text-slate-400 dark:text-slate-600" />
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed min-h-[36px]">
                  {cat.description}
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                {/* Rate Bounds & Commission */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Hourly Rate Bounds</span>
                    <span className="font-bold text-slate-900 dark:text-white text-xs mt-0.5 block">
                      ₹{cat.minRate} – ₹{cat.maxRate}/hr
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Take Rate %</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 text-xs mt-0.5 block">
                      {cat.commissionPercent}% Commission
                    </span>
                  </div>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => setEditingCategory({ ...cat })}
                  className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Sliders className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  <span>Configure Rate Bounds</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <form onSubmit={handleSaveRates} className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Configure Guardrails</span>
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mt-0.5">{editingCategory.name}</h3>
              </div>
              <button 
                type="button"
                onClick={() => setEditingCategory(null)}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] mb-1">Min Hourly Rate (₹)</label>
                  <input
                    type="number"
                    value={editingCategory.minRate}
                    onChange={(e) => setEditingCategory({ ...editingCategory, minRate: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] mb-1">Max Hourly Rate (₹)</label>
                  <input
                    type="number"
                    value={editingCategory.maxRate}
                    onChange={(e) => setEditingCategory({ ...editingCategory, maxRate: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] mb-1">Platform Take Rate (%)</label>
                <input
                  type="number"
                  value={editingCategory.commissionPercent}
                  onChange={(e) => setEditingCategory({ ...editingCategory, commissionPercent: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] mb-1">Service Description</label>
                <textarea
                  rows="3"
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditingCategory(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-slate-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
