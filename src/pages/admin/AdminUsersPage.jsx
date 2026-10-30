import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Users, Shield, Lock, AlertTriangle } from 'lucide-react';

export const AdminUsersPage = () => {
  const { providers } = useBooking();

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-20 p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">User & Provider Account Management</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">View user risk scores, suspension flags, and marketplace account statuses.</p>
      </div>

      <div className="space-y-3">
        {providers.map((p) => (
          <div key={p.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700" />
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">{p.name}</h3>
                <span className="text-[11px] text-sky-600 dark:text-sky-400 capitalize font-medium">{p.trade} • {p.jobsCompleted} Jobs</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                Low Risk (0.02)
              </span>
              <button
                onClick={() => alert(`Suspended user ${p.name}`)}
                className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-700 dark:text-rose-300 border border-rose-500/40 text-xs font-bold transition-colors"
              >
                Suspend Account
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
