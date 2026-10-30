import React, { useState } from 'react';
import { formatCurrency } from '../../lib/utils';
import { EarningsTrendChart } from '../../components/provider/EarningsTrendChart';
import { PayoutManagementSection } from '../../components/provider/PayoutManagementSection';
import { 
  DollarSign, 
  Zap, 
  Check, 
  ShieldCheck, 
  ArrowRight, 
  CreditCard, 
  History, 
  Wallet, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  Building2,
  Calendar,
  Lock,
  TrendingUp
} from 'lucide-react';

const RECENT_TRANSACTIONS = [
  { id: 'TX-901', date: 'Today, 2:15 PM', service: 'AC Installation & High-Load Point', customer: 'Rahul S.', amount: 2500, status: 'completed', payoutMethod: 'WorkWay Escrow -> Bank' },
  { id: 'TX-902', date: 'Today, 10:45 AM', service: 'Kitchen Wiring & MCB Upgrade', customer: 'Meera D.', amount: 1800, status: 'completed', payoutMethod: 'Instant UPI Payout' },
  { id: 'TX-903', date: 'Yesterday', service: 'Water Heater Geyser Fitting', customer: 'Priya N.', amount: 850, status: 'completed', payoutMethod: 'Bank Transfer (IMPS)' },
  { id: 'TX-904', date: 'Aug 16, 2026', service: 'Full House Electrical Safety Audit', customer: 'Siddharth M.', amount: 3100, status: 'completed', payoutMethod: 'Bank Transfer (IMPS)' },
  { id: 'TX-905', date: 'Aug 15, 2026', service: 'Emergency Inverter Short Circuit Fix', customer: 'Ananya K.', amount: 1400, status: 'pending', payoutMethod: 'Escrow Verification' }
];

export const ProviderEarningsPage = () => {
  const [currentPlan, setCurrentPlan] = useState('pro_unlimited');
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  const handleRequestPayout = () => {
    setPayoutSuccess(true);
    setTimeout(() => setPayoutSuccess(false), 5000);
  };

  const handleSelectPlan = (planId) => {
    setCurrentPlan(planId);
    alert(`Subscribed to ${planId === 'pro_unlimited' ? 'Pro Unlimited Plan (₹1,650/mo)' : 'Pay Per Lead Plan'}`);
  };

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text pb-20 p-4 sm:p-6 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Earnings & Business Hub
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time revenue metrics, escrow balances, payout clearance, and growth trends.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Bank Account Verified (HDFC Bank •••• 4092)</span>
          </span>
        </div>
      </div>

      {/* Payout Success Toast */}
      {payoutSuccess && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span>Payout request of ₹35,250 submitted successfully! Funds transferred to your HDFC Bank account via IMPS within minutes.</span>
          </div>
          <button onClick={() => setPayoutSuccess(false)} className="text-white/80 hover:text-white font-bold ml-4">
            ✕
          </button>
        </div>
      )}

      {/* 💰 Primary Earnings Overview Card */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
          
          {/* Main Month Earnings Display */}
          <div>
            <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider block">
              Earnings Overview • This Month
            </span>
            <div className="flex items-baseline space-x-3 mt-1">
              <span className="font-heading text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                {formatCurrency(38450)}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +14.2% vs last month
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Based on 37 completed service appointments across Bangalore.
            </p>
          </div>

          {/* Wallet Payout Box: Pending vs Available */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-3 min-w-[280px]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-500" />
                <span>Pending Clearance:</span>
              </span>
              <span className="font-bold text-amber-600 dark:text-amber-400 text-sm">{formatCurrency(3200)}</span>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200 dark:border-slate-800">
              <span className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Available Payout:</span>
              </span>
              <span className="font-black text-emerald-600 dark:text-emerald-400 text-base">{formatCurrency(35250)}</span>
            </div>

            <button
              onClick={handleRequestPayout}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02] flex items-center justify-center space-x-1.5"
            >
              <span>Request Instant Payout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* 4-Column Period Breakdown: Today | This Week | This Month | Lifetime */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Today</span>
              <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            </div>
            <span className="font-heading text-2xl font-black text-slate-900 dark:text-white block">
              {formatCurrency(2800)}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">2 jobs completed</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>This Week</span>
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="font-heading text-2xl font-black text-emerald-600 dark:text-emerald-400 block">
              {formatCurrency(9650)}
            </span>
            <span className="text-[10px] text-emerald-600/80 dark:text-emerald-500/80 mt-1 block font-medium">10 jobs completed</span>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-slate-950/80 border border-sky-400/50 dark:border-sky-500/30 ring-1 ring-sky-400/20 dark:ring-sky-500/20">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="text-sky-700 dark:text-sky-300 font-bold">This Month</span>
              <DollarSign className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            </div>
            <span className="font-heading text-2xl font-black text-sky-700 dark:text-sky-300 block">
              {formatCurrency(38450)}
            </span>
            <span className="text-[10px] text-sky-600/80 dark:text-sky-400/80 mt-1 block font-semibold">37 jobs completed</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Lifetime</span>
              <Building2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="font-heading text-2xl font-black text-purple-700 dark:text-purple-300 block">
              {formatCurrency(482600)}
            </span>
            <span className="text-[10px] text-purple-600/80 dark:text-purple-400/80 mt-1 block font-medium">312 total jobs</span>
          </div>

        </div>

      </div>

      {/* 📈 Revenue Graph: Earnings Trend */}
      <EarningsTrendChart />

      {/* 💰 Payout Management Section */}
      <PayoutManagementSection />

      {/* Recent Payout Transactions History */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">Recent Settlements & Invoices</h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">All transactions secured by WorkWay Escrow</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <th className="pb-3 font-semibold">Tx ID & Date</th>
                <th className="pb-3 font-semibold">Service Description</th>
                <th className="pb-3 font-semibold">Customer</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Payout Channel</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {RECENT_TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 font-mono">
                    <span className="text-sky-600 dark:text-sky-400 font-bold block">{tx.id}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{tx.date}</span>
                  </td>
                  <td className="py-3 text-slate-800 dark:text-slate-200 font-medium">{tx.service}</td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">{tx.customer}</td>
                  <td className="py-3 font-bold text-emerald-600 dark:text-emerald-400 font-mono text-sm">{formatCurrency(tx.amount)}</td>
                  <td className="py-3 text-slate-500 dark:text-slate-400">{tx.payoutMethod}</td>
                  <td className="py-3 text-right">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize border ${
                      tx.status === 'completed'
                        ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subscriptions Section */}
      <div className="space-y-4">
        <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white">WorkWay Provider Subscription Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Pay Per Lead Plan */}
          <div className={`p-6 rounded-3xl border transition-all shadow-sm ${
            currentPlan === 'pay_per_lead'
              ? 'bg-white dark:bg-slate-900 border-sky-500 shadow-xl shadow-sky-500/10'
              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">PAY PER LEAD</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Pay only when you accept a job lead</p>
              </div>
              <span className="font-heading text-xl font-bold text-slate-900 dark:text-white">₹125 – ₹250 <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ lead</span></span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 mb-6">
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /><span>Pay per accepted lead</span></li>
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /><span>Standard search positioning</span></li>
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /><span>Standard payout clearance window (24h)</span></li>
            </ul>

            <button
              onClick={() => handleSelectPlan('pay_per_lead')}
              className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                currentPlan === 'pay_per_lead'
                  ? 'bg-sky-100 dark:bg-slate-800 text-sky-700 dark:text-sky-400 border border-sky-500/40'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {currentPlan === 'pay_per_lead' ? 'Current Active Plan' : 'Switch to Pay Per Lead'}
            </button>
          </div>

          {/* Pro Unlimited Plan */}
          <div className={`p-6 rounded-3xl border transition-all shadow-sm ${
            currentPlan === 'pro_unlimited'
              ? 'bg-white dark:bg-slate-900 border-sky-500 shadow-xl shadow-sky-500/10 ring-2 ring-sky-500/20'
              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-[10px] uppercase mb-1 inline-block">
                  RECOMMENDED FOR HIGH EARNERS
                </span>
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">PRO UNLIMITED</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Unlimited leads, top ranking & instant payouts</p>
              </div>
              <span className="font-heading text-xl font-bold text-sky-700 dark:text-sky-400">₹1,650 <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ mo</span></span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 mb-6">
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /><span><strong>Unlimited leads</strong> with 0 per-lead fee</span></li>
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /><span><strong>Priority positioning</strong> at top of search & radar map</span></li>
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /><span><strong>Instant IMPS/UPI Payouts</strong> with zero wait time</span></li>
            </ul>

            <button
              onClick={() => handleSelectPlan('pro_unlimited')}
              className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                currentPlan === 'pro_unlimited'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'bg-gradient-to-r from-sky-600 to-blue-600 text-white hover:from-sky-500 shadow-lg'
              }`}
            >
              {currentPlan === 'pro_unlimited' ? 'Current Active Plan (Subscribed)' : 'Upgrade to Pro Unlimited (₹1,650)'}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
