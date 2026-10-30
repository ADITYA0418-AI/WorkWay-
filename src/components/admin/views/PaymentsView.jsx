import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  DollarSign, 
  Receipt,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { formatCurrency } from '../../../lib/utils';

export const PaymentsView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toastNotice, setToastNotice] = useState(null);

  const transactions = [
    { id: 'TXN-99401', bookingId: 'WW-9021', customer: 'Priya Mehta', provider: 'Ramesh K.', amount: 1800, method: 'UPI (GPay)', gatewayFee: 0, platformCut: 180, date: 'Today, 09:35 AM', status: 'success' },
    { id: 'TXN-99402', bookingId: 'WW-9020', customer: 'Arjun Patil', provider: 'Suresh D.', amount: 950, method: 'Razorpay Escrow', gatewayFee: 19, platformCut: 95, date: 'Today, 10:15 AM', status: 'pending' },
    { id: 'TXN-99403', bookingId: 'WW-9019', customer: 'Sneha Joshi', provider: 'Mohan R.', amount: 2400, method: 'Credit Card (Visa)', gatewayFee: 48, platformCut: 240, date: 'Yesterday, 04:10 PM', status: 'success' },
    { id: 'TXN-99404', bookingId: 'WW-9018', customer: 'Rahul Singh', provider: 'Unassigned', amount: 1200, method: 'UPI (PhonePe)', gatewayFee: 0, platformCut: 120, date: 'Today, 11:00 AM', status: 'pending' },
    { id: 'TXN-99405', bookingId: 'WW-9017', customer: 'Kavita Sharma', provider: 'Dilip W.', amount: 1350, method: 'NetBanking (HDFC)', gatewayFee: 25, platformCut: 135, date: 'Today, 08:50 AM', status: 'success' },
    { id: 'TXN-99406', bookingId: 'WW-8910', customer: 'Ananya Reddy', provider: 'Sunita G.', amount: 3200, method: 'Debit Card (Mastercard)', gatewayFee: 64, platformCut: 320, date: '2 days ago', status: 'success' },
    { id: 'TXN-99407', bookingId: 'WW-8840', customer: 'Karan M.', provider: 'Rohan M.', amount: 1450, method: 'UPI (Paytm)', gatewayFee: 0, platformCut: 145, date: '3 days ago', status: 'failed' },
    { id: 'TXN-99408', bookingId: 'WW-8799', customer: 'Pooja Nair', provider: 'Anil S.', amount: 800, method: 'Razorpay Wallet', gatewayFee: 16, platformCut: 80, date: '4 days ago', status: 'refunded' }
  ];

  const filtered = transactions.filter(t => {
    const matchesSearch = t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' ? true : t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'success':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"><CheckCircle2 className="w-3 h-3" /> Success</span>;
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"><Clock className="w-3 h-3" /> Pending</span>;
      case 'failed':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30"><XCircle className="w-3 h-3" /> Failed</span>;
      case 'refunded':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30"><DollarSign className="w-3 h-3" /> Refunded</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 capitalize">{status}</span>;
    }
  };

  const handleExportCSV = () => {
    setToastNotice('Transaction Ledger Exported (CSV Download Complete)');
    setTimeout(() => setToastNotice(null), 3000);
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
            Complete Payments & Transaction Ledger
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time escrow captures, gateway fees, payout releases & reconciliation records.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-all shadow-sm"
        >
          <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Export Ledger (CSV)</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search TXN ID, Booking #, Payer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['all', 'success', 'pending', 'failed', 'refunded'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap capitalize transition-all ${
                statusFilter === st
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-900'
              }`}
            >
              {st === 'all' ? 'All Transactions' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
              <tr>
                <th className="px-5 py-3.5">Transaction ID</th>
                <th className="px-5 py-3.5">Booking Ref</th>
                <th className="px-5 py-3.5">Customer & Provider</th>
                <th className="px-5 py-3.5">Payment Method</th>
                <th className="px-5 py-3.5">Gross Amount</th>
                <th className="px-5 py-3.5">Platform Cut</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {t.id}
                  </td>
                  <td className="px-5 py-4 font-mono text-slate-700 dark:text-slate-300 font-semibold">
                    #{t.bookingId}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-bold text-slate-900 dark:text-white text-xs">{t.customer}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Pro: {t.provider}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-medium text-slate-700 dark:text-slate-300 text-[11px]">
                      {t.method}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-bold text-slate-900 dark:text-white text-sm">
                    {formatCurrency(t.amount)}
                  </td>
                  <td className="px-5 py-4 font-bold text-emerald-600 dark:text-emerald-400">
                    +{formatCurrency(t.platformCut)}
                  </td>
                  <td className="px-5 py-4">
                    {getStatusBadge(t.status)}
                  </td>
                  <td className="px-5 py-4 text-right text-slate-400 dark:text-slate-500 font-mono text-[11px]">
                    {t.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
