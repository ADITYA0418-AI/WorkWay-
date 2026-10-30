import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Star, 
  AlertTriangle, 
  BarChart2, 
  Award,
  Zap,
  Activity
} from 'lucide-react';

export const PerformanceView = () => {
  const metrics = [
    { label: 'Avg Worker Response Time', value: '8.4 Mins', target: 'SLA Target: < 15 mins', status: 'optimal', icon: Clock, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/15' },
    { label: 'Job Completion Rate', value: '96.8%', target: 'Target: > 95%', status: 'optimal', icon: CheckCircle2, color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-500/15' },
    { label: 'Customer CSAT Score', value: '4.86 / 5.0', target: 'Based on 4,280 reviews', status: 'optimal', icon: Star, color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-500/15' },
    { label: 'First-Time Resolution', value: '91.4%', target: 'No re-work required', status: 'optimal', icon: Award, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-500/15' },
  ];

  const topPerformers = [
    { name: 'Rohan Mehta', trade: 'Electrician', jobs: 312, rating: 4.98, time: '6.2 mins', earnings: '₹1,42,000' },
    { name: 'Suresh Dandekar', trade: 'Plumber', jobs: 245, rating: 4.92, time: '7.5 mins', earnings: '₹1,18,000' },
    { name: 'Dilip Wankhede', trade: 'Carpenter', jobs: 190, rating: 4.89, time: '8.1 mins', earnings: '₹98,500' },
    { name: 'Sunita Gaikwad', trade: 'Deep Cleaning', jobs: 140, rating: 4.85, time: '9.0 mins', earnings: '₹76,000' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30 text-[10px] font-bold uppercase">
            ANALYTICS
          </span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Worker Performance & SLA Operations
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Response times, job completion fidelity, customer satisfaction ratings & operational benchmarks.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{m.label}</span>
                <div className={`p-2 rounded-xl ${m.bg} ${m.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <span className="font-heading text-2xl font-extrabold text-slate-900 dark:text-white block">{m.value}</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block">{m.target}</span>
            </div>
          );
        })}
      </div>

      {/* Response Time Distribution & Completion Curves */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">Emergency Response Time Distribution</h2>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">92% within 10 mins</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { bracket: '< 5 Mins (Hyper-fast)', count: 540, percent: 42, color: 'bg-emerald-500' },
              { bracket: '5 – 10 Mins (Optimal)', count: 642, percent: 50, color: 'bg-sky-500' },
              { bracket: '10 – 15 Mins (Standard SLA)', count: 82, percent: 6, color: 'bg-amber-500' },
              { bracket: '> 15 Mins (SLA Breach)', count: 20, percent: 2, color: 'bg-rose-500' },
            ].map((b, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{b.bracket}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{b.count} jobs ({b.percent}%)</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden">
                  <div className={`h-full rounded-full ${b.color}`} style={{ width: `${b.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Worker Leaderboard */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">Top Rated Trade Technicians</h2>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">Bangalore & Pune Hubs</span>
          </div>

          <div className="space-y-2.5">
            {topPerformers.map((p, i) => (
              <div key={i} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{p.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{p.trade} • {p.jobs} jobs</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-amber-500 dark:text-amber-400 block">★ {p.rating}</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">Avg: {p.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
