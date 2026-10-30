import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  Activity, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  Zap, 
  CalendarClock, 
  Clock, 
  ChevronRight, 
  Receipt, 
  BarChart3, 
  BellRing,
  RefreshCw,
  Send,
  Eye
} from 'lucide-react';
import { useBooking } from '../../../context/BookingContext';
import { formatCurrency } from '../../../lib/utils';

export const OverviewView = ({ setActiveTab }) => {
  const { verificationQueue, disputes, providers, bookings } = useBooking();
  const [quickActionNotice, setQuickActionNotice] = useState(null);

  const pendingVerificationCount = verificationQueue?.filter(v => v.status === 'pending').length || 4;
  const openDisputesCount = disputes?.filter(d => d.status === 'open').length || 2;
  const activeProvidersCount = providers?.filter(p => p.dutyStatus === 'available').length || 42;
  const totalBookingsCount = bookings?.length ? bookings.length + 1280 : 1284;

  const showNotification = (msg) => {
    setQuickActionNotice(msg);
    setTimeout(() => setQuickActionNotice(null), 3500);
  };

  const activityFeed = [
    { id: 1, type: 'verification', title: 'Level 2 Background check submitted', actor: 'Vikram Joshi (Plumber)', time: '2 mins ago', icon: ShieldCheck, color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-500/15' },
    { id: 2, type: 'dispute', title: 'New dispute raised for booking #WW-8291', actor: 'Priya Mehta vs Suresh D.', time: '14 mins ago', icon: AlertTriangle, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/15' },
    { id: 3, type: 'payout', title: 'Instant payout processed: ₹3,400', actor: 'Rohan Mehta (Master Pro)', time: '28 mins ago', icon: DollarSign, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/15' },
    { id: 4, type: 'booking', title: 'Emergency Electrician dispatch confirmed', actor: 'Solapur North Zone', time: '41 mins ago', icon: Zap, color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-500/15' },
    { id: 5, type: 'fraud', title: 'Off-platform payment flag detected', actor: 'Provider #p-104', time: '1 hour ago', icon: Activity, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/15' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Notice */}
      {quickActionNotice && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-violet-500/40 text-slate-900 dark:text-white shadow-2xl shadow-violet-500/20 animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-5 h-5 text-violet-500 animate-spin" />
          <span className="text-xs font-semibold">{quickActionNotice}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/40 text-[10px] font-bold uppercase tracking-wider">
              RESTRICTED ADMIN SUITE
            </span>
            <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Marketplace Sync
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            WorkWay Platform Control Center
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Hyperlocal marketplace health, verification queue, disputes & risk engine analytics.
          </p>
        </div>

        {/* Quick Top Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab('verification')}
            className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all shadow-lg shadow-violet-600/20 flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify Queue</span>
          </button>
          <button 
            onClick={() => setActiveTab('disputes')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-300 dark:border-slate-700 transition-all flex items-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4 text-rose-500 dark:text-rose-400" />
            <span>Disputes ({openDisputesCount})</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => setActiveTab('revenue')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all space-y-1 group shadow-sm"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Total Revenue</span>
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <span className="font-heading text-2xl font-bold text-emerald-600 dark:text-emerald-400 block">{formatCurrency(148200)}</span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% month-over-month
          </span>
        </div>

        <div 
          onClick={() => setActiveTab('bookings')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500/40 cursor-pointer transition-all space-y-1 group shadow-sm"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Active Bookings</span>
            <div className="p-2 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform">
              <CalendarClock className="w-4 h-4" />
            </div>
          </div>
          <span className="font-heading text-2xl font-bold text-slate-900 dark:text-white block">214 In Progress</span>
          <span className="text-[10px] text-sky-600 dark:text-sky-400 font-semibold">{totalBookingsCount.toLocaleString()} Total Today</span>
        </div>

        <div 
          onClick={() => setActiveTab('providers')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 cursor-pointer transition-all space-y-1 group shadow-sm"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Total Providers</span>
            <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <span className="font-heading text-2xl font-bold text-slate-900 dark:text-white block">360 Skilled Pros</span>
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">{activeProvidersCount} Currently On Duty</span>
        </div>

        <div 
          onClick={() => setActiveTab('verification')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all space-y-1 group shadow-sm"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Pending Verifications</span>
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <span className="font-heading text-2xl font-bold text-amber-600 dark:text-amber-400 block">{pendingVerificationCount} Requests</span>
          <span className="text-[10px] text-sky-600 dark:text-sky-400 font-bold group-hover:underline flex items-center gap-1">
            Review Queue →
          </span>
        </div>
      </div>

      {/* Quick Action Triggers & Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions Panel */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-amber-500" />
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">Admin Quick Actions</h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Execute essential platform triggers with one click.</p>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            <button
              onClick={() => {
                showNotification('Approved Next Pending Provider in Queue');
                setActiveTab('verification');
              }}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 text-left transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Approve Provider</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Inspect & advance pending KYC</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </button>

            <button
              onClick={() => {
                showNotification('Navigating to Open Dispute Resolution Center');
                setActiveTab('disputes');
              }}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-rose-500/30 text-left transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">Resolve Dispute</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Issue refund / release payout</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-sky-500/30 text-left transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400">
                  <BellRing className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">Broadcast Notification</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Send push alert to users/pros</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </button>

            <button
              onClick={() => setActiveTab('payouts')}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 text-left transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Process Payout Batch</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Release weekly worker earnings</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">Live Activity Feed</h2>
            </div>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              Streaming live
            </span>
          </div>

          <div className="space-y-3">
            {activityFeed.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${item.bg} ${item.color} flex-shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.actor}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono whitespace-nowrap">{item.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Intelligence & Demand Spikes */}
      <div className="relative overflow-hidden rounded-3xl border p-6 group bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-[#0c0a1e] dark:to-[#0a1628] border-violet-200 dark:border-violet-800/25">
        <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }} />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-5">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30 bg-gradient-to-br from-violet-600 to-indigo-600">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 border border-violet-300 dark:border-violet-500/35">
                WorkWay Intelligence Signal
              </span>
              <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                Active Recommendation
              </span>
            </div>

            <div>
              <h3 className="font-heading text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
                Demand Surge in Solapur North (+34% Electricians)
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                Monsoon moisture issues triggered sudden spike in short circuit diagnostics. Recommend temporary 1.25x surge dispatch.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button 
                onClick={() => {
                  showNotification('⚡ Activated 8 Standby Electricians in Solapur North');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/20 transition-all flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Activate 8 Standby Pros</span>
              </button>
              <button 
                onClick={() => setActiveTab('marketplace')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-all"
              >
                View Heatmap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
