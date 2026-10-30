import React, { useState } from 'react';
import { 
  ArrowDownCircle, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Building, 
  DollarSign, 
  RefreshCw, 
  Sparkles,
  Check,
  Search
} from 'lucide-react';
import { formatCurrency } from '../../../lib/utils';

export const PayoutsView = () => {
  const [toastNotice, setToastNotice] = useState(null);

  const [payouts, setPayouts] = useState([
    {
      id: 'PAY-701',
      providerName: 'Rohan Mehta',
      trade: 'Master Electrician',
      avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=200',
      bankDetails: 'HDFC Bank •• 4912 (UPI: rohan@okhdfcbank)',
      jobsCompletedWeek: 14,
      pendingBalance: 12450,
      payoutStatus: 'ready', // ready, processing, paid
      batchCycle: 'Weekly Batch #34 (18-24 Aug)'
    },
    {
      id: 'PAY-702',
      providerName: 'Suresh Dandekar',
      trade: 'Plumbing Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      bankDetails: 'ICICI Bank •• 8821 (UPI: suresh@okicici)',
      jobsCompletedWeek: 11,
      pendingBalance: 8900,
      payoutStatus: 'ready',
      batchCycle: 'Weekly Batch #34 (18-24 Aug)'
    },
    {
      id: 'PAY-703',
      providerName: 'Dilip Wankhede',
      trade: 'Master Carpenter',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      bankDetails: 'SBI Bank •• 1045 (UPI: dilipw@oksbi)',
      jobsCompletedWeek: 9,
      pendingBalance: 7650,
      payoutStatus: 'ready',
      batchCycle: 'Weekly Batch #34 (18-24 Aug)'
    },
    {
      id: 'PAY-704',
      providerName: 'Sunita Gaikwad',
      trade: 'Deep Cleaning Lead',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      bankDetails: 'Axis Bank •• 6710 (UPI: sunita@okaxis)',
      jobsCompletedWeek: 8,
      pendingBalance: 6200,
      payoutStatus: 'paid',
      batchCycle: 'Weekly Batch #34 (18-24 Aug)'
    },
    {
      id: 'PAY-705',
      providerName: 'Anil Shinde',
      trade: 'Handyman Expert',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      bankDetails: 'Kotak Bank •• 3341 (UPI: anil@kotak)',
      jobsCompletedWeek: 6,
      pendingBalance: 4100,
      payoutStatus: 'ready',
      batchCycle: 'Weekly Batch #34 (18-24 Aug)'
    }
  ]);

  const totalPendingAmount = payouts
    .filter(p => p.payoutStatus === 'ready')
    .reduce((acc, curr) => acc + curr.pendingBalance, 0);

  const handleInstantPayout = (id, providerName, amount) => {
    setPayouts(prev =>
      prev.map(p => (p.id === id ? { ...p, payoutStatus: 'paid' } : p))
    );
    setToastNotice(`⚡ Instant Payout of ${formatCurrency(amount)} transferred to ${providerName}!`);
    setTimeout(() => setToastNotice(null), 3500);
  };

  const handleBatchPayAll = () => {
    setPayouts(prev =>
      prev.map(p => ({ ...p, payoutStatus: 'paid' }))
    );
    setToastNotice(`🚀 Batch Payout of ${formatCurrency(totalPendingAmount)} Dispatched to All Workers!`);
    setTimeout(() => setToastNotice(null), 4000);
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
              FINANCE
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Worker Payouts & Automated Disbursements
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Weekly automated batch runs, instant UPI settlements & TDS reconciliation.
          </p>
        </div>

        {totalPendingAmount > 0 && (
          <button
            onClick={handleBatchPayAll}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all"
          >
            <Zap className="w-4 h-4" />
            <span>Batch Pay All ({formatCurrency(totalPendingAmount)})</span>
          </button>
        )}
      </div>

      {/* Payout Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Pending Queue Total</span>
          <span className="font-heading text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 block">{formatCurrency(totalPendingAmount)}</span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">{payouts.filter(p => p.payoutStatus === 'ready').length} Tradespeople Ready</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Scheduled Run Date</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 dark:text-white block">Monday, 04:00 AM</span>
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">Automated Direct Bank ACH</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">TDS / Withholding Rate</span>
          <span className="font-heading text-2xl font-extrabold text-indigo-600 dark:text-indigo-300 block">1.0% Sec 194M</span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Compliant Tax Deduction</span>
        </div>
      </div>

      {/* Payouts Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
              <tr>
                <th className="px-5 py-3.5">Provider</th>
                <th className="px-5 py-3.5">Bank / UPI Destination</th>
                <th className="px-5 py-3.5">Jobs Completed</th>
                <th className="px-5 py-3.5">Net Payout Amount</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {payouts.map((p) => {
                const isReady = p.payoutStatus === 'ready';

                return (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={p.avatar} 
                          alt={p.providerName} 
                          className="w-9 h-9 rounded-xl object-cover border border-slate-200 dark:border-slate-700" 
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-xs">{p.providerName}</p>
                          <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">{p.trade}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono text-slate-700 dark:text-slate-300 text-xs">
                      {p.bankDetails}
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
                        {p.jobsCompletedWeek} Jobs this week
                      </span>
                    </td>
                    <td className="px-5 py-4 font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                      {formatCurrency(p.pendingBalance)}
                    </td>
                    <td className="px-5 py-4">
                      {isReady ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                          <Clock className="w-3 h-3" /> Ready
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" /> Paid
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      {isReady ? (
                        <button
                          onClick={() => handleInstantPayout(p.id, p.providerName, p.pendingBalance)}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-1.5 ml-auto transition-all"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>Process Instant Payout</span>
                        </button>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500 text-xs font-semibold">Settled</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
