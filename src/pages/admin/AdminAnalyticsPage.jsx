import React from 'react';
import { BarChart2, TrendingUp, Users, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

export const AdminAnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-20 p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">Marketplace Conversion & Growth Analytics</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Search-to-booking funnel conversion, repeat hiring rate & peak request hours.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Search → Booking Funnel</span>
          <span className="font-heading text-2xl font-bold text-sky-600 dark:text-sky-400 block">34.2%</span>
          <p className="text-xs text-slate-500 dark:text-slate-400">High conversion driven by WorkWay Match Score</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Repeat Hiring Rate</span>
          <span className="font-heading text-2xl font-bold text-emerald-600 dark:text-emerald-400 block">42.8%</span>
          <p className="text-xs text-slate-500 dark:text-slate-400">Consumers re-booking preferred providers</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Peak Customer Request Window</span>
          <span className="font-heading text-xl font-bold text-amber-600 dark:text-amber-400 block">6:00 PM – 9:00 PM</span>
          <p className="text-xs text-slate-500 dark:text-slate-400">Evening post-work peak demand hours</p>
        </div>
      </div>
    </div>
  );
};
