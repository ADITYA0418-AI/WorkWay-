import React, { useState } from 'react';
import { 
  RefreshCcw, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  DollarSign, 
  AlertTriangle, 
  Eye, 
  X,
  Sparkles
} from 'lucide-react';
import { formatCurrency } from '../../../lib/utils';

export const RefundsView = () => {
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [toastNotice, setToastNotice] = useState(null);

  const [refundRequests, setRefundRequests] = useState([
    {
      id: 'REF-501',
      bookingId: 'WW-9015',
      customer: 'Pooja Nair',
      provider: 'Anil Shinde (Handyman)',
      amount: 800,
      reason: 'Provider was delayed by 2 hours and customer had to leave for work',
      requestedAt: '24 Aug 2026, 07:45 AM',
      status: 'pending',
      originalPaymentMethod: 'UPI (PhonePe)',
      platformFeeReversed: 80
    },
    {
      id: 'REF-502',
      bookingId: 'WW-8924',
      customer: 'Amit Desai',
      provider: 'Suresh Dandekar (Plumber)',
      amount: 950,
      reason: 'Duplicate payment charged due to bank network timeout',
      requestedAt: '23 Aug 2026, 03:15 PM',
      status: 'pending',
      originalPaymentMethod: 'Razorpay Escrow (HDFC NetBanking)',
      platformFeeReversed: 95
    },
    {
      id: 'REF-503',
      bookingId: 'WW-8712',
      customer: 'Karan Malhotra',
      provider: 'Dilip Wankhede (Carpenter)',
      amount: 1350,
      reason: 'Damaged wood panel during hinge assembly',
      requestedAt: '21 Aug 2026',
      status: 'approved',
      originalPaymentMethod: 'Credit Card (Visa)',
      platformFeeReversed: 135
    }
  ]);

  const handleAuditRefund = (id, decision) => {
    setRefundRequests(prev =>
      prev.map(r => r.id === id ? { ...r, status: decision } : r)
    );
    setToastNotice(`Refund #${id} ${decision.toUpperCase()}! ${decision === 'approved' ? 'Funds returned to customer UPI.' : 'Request dismissed.'}`);
    setTimeout(() => setToastNotice(null), 3500);
    setSelectedRefund(null);
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
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 text-[10px] font-bold uppercase">
              FINANCE
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Customer Refund Claims & Reversals
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Escrow cancellation reversals, duplicate payment refunds & customer satisfaction approvals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs font-bold text-amber-700 dark:text-amber-300 shadow-sm">
            Pending Claims: <span className="font-extrabold">{refundRequests.filter(r => r.status === 'pending').length}</span>
          </span>
        </div>
      </div>

      {/* Refunds Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
              <tr>
                <th className="px-5 py-3.5">Claim ID</th>
                <th className="px-5 py-3.5">Booking Ref</th>
                <th className="px-5 py-3.5">Customer & Provider</th>
                <th className="px-5 py-3.5">Claim Reason</th>
                <th className="px-5 py-3.5">Refund Amount</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {refundRequests.map((r) => {
                const isPending = r.status === 'pending';
                const isApproved = r.status === 'approved';

                return (
                  <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4 font-mono font-bold text-rose-600 dark:text-rose-400">
                      {r.id}
                    </td>
                    <td className="px-5 py-4 font-mono text-slate-700 dark:text-slate-300 font-semibold">
                      #{r.bookingId}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-bold text-slate-900 dark:text-white text-xs">{r.customer}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">{r.provider}</p>
                    </td>
                    <td className="px-5 py-4 max-w-xs">
                      <p className="text-slate-700 dark:text-slate-300 truncate text-xs">{r.reason}</p>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">{r.requestedAt}</span>
                    </td>
                    <td className="px-5 py-4 font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                      {formatCurrency(r.amount)}
                    </td>
                    <td className="px-5 py-4">
                      {isPending ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      ) : isApproved ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" /> Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                          <XCircle className="w-3 h-3" /> Rejected
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedRefund(r)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 ml-auto transition-all"
                      >
                        <Eye className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                        <span>Review Claim</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Refund Approval Modal */}
      {selectedRefund && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Refund Authorization</span>
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  Claim #{selectedRefund.id}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedRefund(null)}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Customer</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">{selectedRefund.customer}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Original Payment Method</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">{selectedRefund.originalPaymentMethod}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Refund Total</span>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 text-base mt-0.5">{formatCurrency(selectedRefund.amount)}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Platform Fee Reversal</span>
                  <p className="font-bold text-indigo-600 dark:text-indigo-300 mt-0.5">{formatCurrency(selectedRefund.platformFeeReversed)}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold uppercase text-[10px]">Customer Claim Rationale</span>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{selectedRefund.reason}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => handleAuditRefund(selectedRefund.id, 'approved')}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20"
              >
                Approve & Execute Refund
              </button>
              <button
                onClick={() => handleAuditRefund(selectedRefund.id, 'rejected')}
                className="flex-1 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-700 dark:text-rose-300 border border-rose-500/40 font-bold text-xs"
              >
                Decline Claim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
