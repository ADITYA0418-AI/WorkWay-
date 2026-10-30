import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { AlertTriangle, Check, X, Shield, DollarSign, MessageSquare } from 'lucide-react';

export const AdminDisputeCenter = () => {
  const { disputes } = useBooking();

  const handleResolve = (disputeId, resolutionType) => {
    alert(`Dispute ${disputeId} resolved: ${resolutionType.toUpperCase()}!`);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-20 p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">Dispute Resolution Management</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Review customer complaints, overcharging disputes, evidence, and issue refunds.</p>
      </div>

      <div className="space-y-4">
        {disputes.map((disp) => (
          <div key={disp.id} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400">DISPUTE #{disp.disputeCode}</span>
                <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white mt-0.5">Booking #{disp.bookingCode}</h3>
                <span className="text-xs text-slate-400 dark:text-slate-500">Submitted on: {disp.submittedAt}</span>
              </div>

              <span className="px-3 py-1 rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 text-xs font-bold uppercase">
                {disp.status.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Customer</span>
                <span className="font-bold text-slate-900 dark:text-white block mt-0.5">{disp.consumerName}</span>
                <span className="text-rose-600 dark:text-rose-400 font-semibold block mt-1">Issue: {disp.issueType}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Service Provider</span>
                <span className="font-bold text-slate-900 dark:text-white block mt-0.5">{disp.providerName}</span>
                <span className="text-slate-500 dark:text-slate-400 block mt-1 font-mono">Original Est: ₹{disp.estimatedAmount || 800}</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <strong>Complaint details:</strong> {disp.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => handleResolve(disp.id, 'Issue Full Refund to Customer')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
              >
                Issue Full Refund
              </button>
              <button
                onClick={() => handleResolve(disp.id, 'Approve Provider Payout')}
                className="px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs shadow-md"
              >
                Approve Provider Payout
              </button>
              <button
                onClick={() => handleResolve(disp.id, 'Suspend Account')}
                className="px-4 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-700 dark:text-rose-300 border border-rose-500/40 font-bold text-xs"
              >
                Suspend Provider
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
