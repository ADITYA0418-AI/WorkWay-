import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  BarChart3, 
  Receipt, 
  CheckCircle2, 
  CreditCard, 
  Zap, 
  ArrowUpRight, 
  Sparkles,
  PieChart,
  Percent,
  UserCheck
} from 'lucide-react';
import { formatCurrency } from '../../../lib/utils';

export const RevenueView = () => {
  const [activePeriod, setActivePeriod] = useState('Monthly');

  const revenueBreakdown = {
    Daily: {
      grossVolume: 118400,
      netCommission: 18640,
      subscriptions: 4900,
      leadFees: 3800,
      surgeFees: 1940,
      avgOrderValue: 1420,
      trend: '+8.4%'
    },
    Weekly: {
      grossVolume: 742000,
      netCommission: 112800,
      subscriptions: 32400,
      leadFees: 24500,
      surgeFees: 11900,
      avgOrderValue: 1530,
      trend: '+12.6%'
    },
    Monthly: {
      grossVolume: 3280000,
      netCommission: 483200,
      subscriptions: 182400, // $19.99 / ₹1650 Pro plan subscriptions (110 pros)
      leadFees: 94500,
      surgeFees: 48900,
      avgOrderValue: 1610,
      trend: '+18.4%'
    }
  };

  const d = revenueBreakdown[activePeriod];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase">
              FINANCE & MONETIZATION
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Platform Revenue & Subscription Breakdown
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Gross marketplace volume, $19.99/mo Pro subscription tiers, lead fee accruals & take-rates.
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start sm:self-auto shadow-sm">
          {['Daily', 'Weekly', 'Monthly'].map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activePeriod === period
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Revenue Banner */}
      <div className="relative p-6 rounded-3xl border border-emerald-500/30 overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-white dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Gross Marketplace Volume ({activePeriod})
            </span>
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                {formatCurrency(d.grossVolume)}
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" /> {d.trend} vs previous
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              Includes escrow payments, materials additions & platform commission fees.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Net Commission</span>
              <span className="font-heading text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
                {formatCurrency(d.netCommission)}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">10% Platform Cut</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Pro Subscriptions</span>
              <span className="font-heading text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1 block">
                {formatCurrency(d.subscriptions)}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">$19.99/mo (₹1,650) Plan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Stream Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">110 Active Pros</span>
          </div>
          <div>
            <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">WorkWay Pro ($19.99/mo)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Unlimited emergency leads, priority ranking badge & verified badge showcase.</p>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="font-heading text-2xl font-bold text-indigo-600 dark:text-indigo-400">{formatCurrency(d.subscriptions)}</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Recurring Monthly ARR</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Percent className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">10-15% Take-Rate</span>
          </div>
          <div>
            <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">Direct Booking Commission</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Automatic platform fee deducted upon customer completion OTP verification.</p>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="font-heading text-2xl font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(d.netCommission)}</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Completed Jobs Commission</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Pay-Per-Lead</span>
          </div>
          <div>
            <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">Non-Subscribed Lead Fees</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">₹49 - ₹99 per lead unlock fee for standard pay-as-you-go tradespeople.</p>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="font-heading text-2xl font-bold text-amber-600 dark:text-amber-400">{formatCurrency(d.leadFees)}</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Lead Generation Accrual</span>
          </div>
        </div>
      </div>

      {/* Visual Revenue Performance Bar Chart Mockup */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">Revenue Growth History (Last 6 Months)</h2>
          </div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">+42% 6-Month Trajectory</span>
        </div>

        <div className="grid grid-cols-6 gap-3 items-end h-48 pt-6">
          {[
            { month: 'Mar', val: 1840000, height: '56%' },
            { month: 'Apr', val: 2120000, height: '64%' },
            { month: 'May', val: 2480000, height: '72%' },
            { month: 'Jun', val: 2750000, height: '80%' },
            { month: 'Jul', val: 2980000, height: '88%' },
            { month: 'Aug (Cur)', val: 3280000, height: '100%' },
          ].map((bar, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                ₹{(bar.val / 100000).toFixed(1)}L
              </span>
              <div 
                className={`w-full rounded-2xl transition-all duration-500 ${
                  idx === 5 
                    ? 'bg-gradient-to-t from-emerald-600 to-teal-400 shadow-lg shadow-emerald-500/20' 
                    : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
                style={{ height: bar.height }}
              />
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">{bar.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
