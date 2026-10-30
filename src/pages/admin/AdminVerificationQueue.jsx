import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Check, X, ShieldCheck, Eye, AlertCircle } from 'lucide-react';

export const AdminVerificationQueue = () => {
  const { verificationQueue, updateVerificationStatus } = useBooking();

  const handleAction = (reqId, actionStatus) => {
    updateVerificationStatus(reqId, actionStatus);
    alert(`Verification request ${actionStatus.toUpperCase()}! Audit log created.`);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-20 p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">Provider Verification Audit Queue</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Manually inspect submitted government IDs, police clearance proofs, and skill certificates.</p>
      </div>

      <div className="space-y-4">
        {verificationQueue.map((item) => (
          <div key={item.id} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400">REQUEST #{item.id}</span>
                <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white mt-0.5">{item.providerName}</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">{item.trade} • Submitted: {item.submittedDate}</span>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase ${
                item.status === 'approved'
                  ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                  : item.status === 'rejected'
                  ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30'
                  : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30'
              }`}>
                {item.status}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block mb-1">Document Submitted</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">{item.documentType}</span>
                <span className="text-xs text-amber-600 dark:text-amber-400 block mt-1 font-semibold">Target Level: {item.targetLevel.replace(/_/g, ' ')}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block mb-1">Document Attachment</span>
                <a
                  href={item.documentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-sky-600 dark:text-sky-400 hover:underline font-semibold"
                >
                  <Eye className="w-4 h-4" />
                  <span>Inspect Document Proof</span>
                </a>
              </div>
            </div>

            {/* Audit Actions */}
            {item.status === 'pending' && (
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleAction(item.id, 'approved')}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
                >
                  Approve Verification Level
                </button>
                <button
                  onClick={() => handleAction(item.id, 'rejected')}
                  className="flex-1 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-700 dark:text-rose-300 border border-rose-500/40 font-bold text-xs transition-colors"
                >
                  Reject Verification
                </button>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};
