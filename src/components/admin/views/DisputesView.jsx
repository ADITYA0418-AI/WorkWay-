import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Check, 
  X, 
  MessageSquare, 
  DollarSign, 
  ShieldAlert, 
  User, 
  Clock, 
  FileText,
  ChevronDown,
  ChevronUp,
  CheckCircle2
} from 'lucide-react';
import { useBooking } from '../../../context/BookingContext';
import { formatCurrency } from '../../../lib/utils';

export const DisputesView = () => {
  const { disputes: ctxDisputes } = useBooking();
  const [activeChatDispute, setActiveChatDispute] = useState(null);
  const [toastNotice, setToastNotice] = useState(null);

  const defaultDisputes = [
    {
      id: 'disp-101',
      disputeCode: 'DIS-101',
      bookingCode: 'WW-8291',
      consumerName: 'Rahul Sharma',
      providerName: 'Rohan Mehta',
      issueType: 'Material Cost Surcharge Exceeded Estimate',
      description: 'The technician quoted ₹400 for additional copper pipe and heavy-duty wire replacement without showing the retail store invoice receipt prior to billing.',
      status: 'open',
      amountInEscrow: 1450,
      submittedAt: 'Today, 08:15 AM',
      chatLogs: [
        { sender: 'Rahul Sharma', time: '07:45 AM', text: 'Hi, you told me the wiring would be ₹800 total, but now there is a ₹400 material cost added.' },
        { sender: 'Rohan Mehta', time: '07:48 AM', text: 'Sir, the old wire was completely melted inside the conduit. I had to buy 4 meters of 2.5sqmm Finolex copper cable from the hardware store.' },
        { sender: 'Rahul Sharma', time: '07:52 AM', text: 'Can you show me the store receipt then? It was not approved in the app upfront.' },
        { sender: 'Rohan Mehta', time: '07:55 AM', text: 'I have the physical receipt, but I already installed it and completed the work safely.' },
      ]
    },
    {
      id: 'disp-102',
      disputeCode: 'DIS-102',
      bookingCode: 'WW-8104',
      consumerName: 'Kavita Sharma',
      providerName: 'Dilip Wankhede',
      issueType: 'Incomplete Assembly & Misaligned Hinges',
      description: 'The carpenter left before finishing the magnetic latch and the cabinet doors are scraping against each other.',
      status: 'open',
      amountInEscrow: 1350,
      submittedAt: 'Yesterday, 05:20 PM',
      chatLogs: [
        { sender: 'Kavita Sharma', time: '04:30 PM', text: 'Dilip ji, the top cupboard door is not closing smoothly.' },
        { sender: 'Dilip Wankhede', time: '04:35 PM', text: 'Madam the wood has swollen due to rain humidity, it will settle down in 2 days.' },
        { sender: 'Kavita Sharma', time: '04:40 PM', text: 'No, the screw holes were drilled at the wrong height. Please send someone to adjust.' },
      ]
    },
    {
      id: 'disp-103',
      disputeCode: 'DIS-103',
      bookingCode: 'WW-7940',
      consumerName: 'Priya Mehta',
      providerName: 'Suresh Dandekar',
      issueType: 'No-Show / Unreported Delay',
      description: 'Emergency plumber arrived 1 hour 45 minutes past the guaranteed 20-minute window while water was leaking.',
      status: 'resolved',
      amountInEscrow: 950,
      submittedAt: '2 days ago',
      resolution: 'Issued Full Refund to Customer (₹950)',
      chatLogs: [
        { sender: 'Priya Mehta', time: '10:00 AM', text: 'Where are you? Water is overflowing in my bathroom!' },
        { sender: 'Suresh Dandekar', time: '10:45 AM', text: 'Madam stuck in severe traffic at Silk Board junction.' },
      ]
    }
  ];

  const [disputes, setDisputes] = useState(defaultDisputes);

  const handleResolve = (disputeId, resolutionType, amount) => {
    setDisputes(prev =>
      prev.map(d => (d.id === disputeId ? { ...d, status: 'resolved', resolution: resolutionType } : d))
    );
    setToastNotice(`Dispute #${disputeId} resolved: ${resolutionType.toUpperCase()}!`);
    setTimeout(() => setToastNotice(null), 3500);
    setActiveChatDispute(null);
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
              TRUST & SAFETY
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Dispute Resolution & Escrow Settlement
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Review customer complaints, chat transcripts, disputed line-items & arbitrate escrow payouts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs font-bold text-rose-700 dark:text-rose-300 shadow-sm">
            Active Disputes: <span className="font-extrabold">{disputes.filter(d => d.status === 'open').length}</span> Cases
          </span>
        </div>
      </div>

      {/* Disputes List */}
      <div className="space-y-4">
        {disputes.map((disp) => {
          const isOpen = disp.status === 'open';
          const isChatOpen = activeChatDispute === disp.id;

          return (
            <div 
              key={disp.id} 
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400">#{disp.disputeCode}</span>
                    <span className="text-slate-400 dark:text-slate-500 font-mono text-xs">•</span>
                    <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-300">Booking #{disp.bookingCode}</span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white mt-1">
                    {disp.issueType}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Submitted on: {disp.submittedAt}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Escrow Hold</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">{formatCurrency(disp.amountInEscrow)}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${
                    isOpen
                      ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/40'
                      : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40'
                  }`}>
                    {disp.status}
                  </span>
                </div>
              </div>

              {/* Customer & Provider Parties */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Complainant (Customer)</span>
                  <span className="font-bold text-slate-900 dark:text-white block mt-0.5">{disp.consumerName}</span>
                  <span className="text-slate-500 dark:text-slate-400 block mt-0.5">Account Status: Active</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Respondent (Provider)</span>
                  <span className="font-bold text-slate-900 dark:text-white block mt-0.5">{disp.providerName}</span>
                  <span className="text-slate-500 dark:text-slate-400 block mt-0.5">Rating: 4.9 ★ • Level 3 Pro</span>
                </div>
              </div>

              {/* Complaint Description */}
              <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Complaint Summary</span>
                <p className="leading-relaxed">{disp.description}</p>
              </div>

              {/* Chat Transcript Accordion */}
              {disp.chatLogs && (
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-hidden">
                  <button
                    onClick={() => setActiveChatDispute(isChatOpen ? null : disp.id)}
                    className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                      <span>Booking In-App Chat Logs ({disp.chatLogs.length} messages)</span>
                    </div>
                    {isChatOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isChatOpen && (
                    <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2.5 max-h-60 overflow-y-auto bg-slate-100/70 dark:bg-slate-950/90 text-xs">
                      {disp.chatLogs.map((log, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/60 space-y-1 shadow-sm">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="font-bold text-indigo-600 dark:text-indigo-300">{log.sender}</span>
                            <span className="text-slate-400 dark:text-slate-500">{log.time}</span>
                          </div>
                          <p className="text-slate-800 dark:text-slate-200">{log.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Resolution Actions */}
              {isOpen ? (
                <div className="flex flex-wrap gap-2.5 pt-2">
                  <button
                    onClick={() => handleResolve(disp.id, 'Full Refund to Customer', disp.amountInEscrow)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
                  >
                    <Check className="w-4 h-4" />
                    <span>Issue Full Refund ({formatCurrency(disp.amountInEscrow)})</span>
                  </button>

                  <button
                    onClick={() => handleResolve(disp.id, 'Payout Released to Provider', disp.amountInEscrow)}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
                  >
                    <DollarSign className="w-4 h-4" />
                    <span>Release Payout to Provider</span>
                  </button>

                  <button
                    onClick={() => handleResolve(disp.id, '50/50 Split Settlement', disp.amountInEscrow / 2)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 transition-all"
                  >
                    Split 50/50 Settlement
                  </button>

                  <button
                    onClick={() => handleResolve(disp.id, 'Provider Suspended', 0)}
                    className="px-4 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-700 dark:text-rose-300 border border-rose-500/40 font-bold text-xs transition-all"
                  >
                    Suspend Provider Account
                  </button>
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  Resolution: {disp.resolution}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
