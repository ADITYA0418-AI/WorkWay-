import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  X, 
  Eye, 
  AlertCircle, 
  FileText, 
  User, 
  Calendar, 
  Sparkles,
  ExternalLink,
  Award
} from 'lucide-react';
import { useBooking } from '../../../context/BookingContext';

export const VerificationView = () => {
  const { verificationQueue: ctxQueue, updateVerificationStatus } = useBooking();
  const [activeFilter, setActiveFilter] = useState('all');
  const [inspectDoc, setInspectDoc] = useState(null);
  const [toastNotice, setToastNotice] = useState(null);

  // Realistic mock data if context has few
  const defaultQueue = [
    {
      id: 'VER-401',
      providerName: 'Vikram Joshi',
      trade: 'electrician',
      targetLevel: 'level_3_master_pro',
      targetLabel: 'Level 3: Master Pro License',
      documentType: 'State Electrical Contractor License & Wireman Cert',
      documentUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
      submittedDate: '24 Aug 2026, 08:30 AM',
      status: 'pending',
      riskScore: 'Very Low (0.02)',
      experienceYears: '9 Years',
      aadhaarVerified: true
    },
    {
      id: 'VER-402',
      providerName: 'Sunita Gaikwad',
      trade: 'housemaid',
      targetLevel: 'level_2_background_checked',
      targetLabel: 'Level 2: Police Background Clearance',
      documentType: 'City Police Verification & Character Certificate',
      documentUrl: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&q=80&w=800',
      submittedDate: '24 Aug 2026, 09:15 AM',
      status: 'pending',
      riskScore: 'Low (0.05)',
      experienceYears: '5 Years',
      aadhaarVerified: true
    },
    {
      id: 'VER-403',
      providerName: 'Mohsin Khan',
      trade: 'plumber',
      targetLevel: 'level_1_id_verified',
      targetLabel: 'Level 1: Govt ID Verification',
      documentType: 'Aadhaar Card + Pan Card Verification',
      documentUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
      submittedDate: '23 Aug 2026, 06:40 PM',
      status: 'pending',
      riskScore: 'Low (0.08)',
      experienceYears: '3 Years',
      aadhaarVerified: true
    },
    {
      id: 'VER-404',
      providerName: 'Rohan Mehta',
      trade: 'electrician',
      targetLevel: 'level_3_master_pro',
      targetLabel: 'Level 3: Master Pro License',
      documentType: 'Master Electrician Board Certificate',
      documentUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
      submittedDate: '20 Aug 2026',
      status: 'approved',
      riskScore: 'Clean (0.00)',
      experienceYears: '8 Years',
      aadhaarVerified: true
    },
    {
      id: 'VER-405',
      providerName: 'Dinesh Kumar',
      trade: 'carpenter',
      targetLevel: 'level_2_background_checked',
      targetLabel: 'Level 2: Police Background Clearance',
      documentType: 'Police Clearance Document',
      documentUrl: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&q=80&w=800',
      submittedDate: '19 Aug 2026',
      status: 'rejected',
      riskScore: 'High (0.75)',
      experienceYears: '2 Years',
      aadhaarVerified: false
    }
  ];

  const [queue, setQueue] = useState(defaultQueue);

  const handleAuditAction = (reqId, actionStatus) => {
    if (updateVerificationStatus) {
      updateVerificationStatus(reqId, actionStatus);
    }
    setQueue(prev =>
      prev.map(q => q.id === reqId ? { ...q, status: actionStatus } : q)
    );
    setToastNotice(`Verification request #${reqId} ${actionStatus.toUpperCase()}! Audit logged.`);
    setTimeout(() => setToastNotice(null), 3000);
  };

  const filteredQueue = queue.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'pending') return item.status === 'pending';
    if (activeFilter === 'approved') return item.status === 'approved';
    if (activeFilter === 'rejected') return item.status === 'rejected';
    if (activeFilter === 'level_1') return item.targetLevel.includes('level_1');
    if (activeFilter === 'level_2') return item.targetLevel.includes('level_2');
    if (activeFilter === 'level_3') return item.targetLevel.includes('level_3');
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notice */}
      {toastNotice && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 shadow-2xl shadow-emerald-500/20 animate-in fade-in slide-in-from-top-4">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <span className="text-xs font-semibold">{toastNotice}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-violet-500/15 text-violet-700 dark:text-violet-300 border border-violet-500/30 text-[10px] font-bold uppercase">
              TRUST & SAFETY
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Provider Verification Audit Queue
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Inspect submitted government IDs, police clearances & Master Pro skill trade licenses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs font-bold text-amber-700 dark:text-amber-300 shadow-sm">
            Pending Review: <span className="font-extrabold">{queue.filter(q => q.status === 'pending').length}</span>
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Requests' },
          { id: 'pending', label: 'Pending Audit' },
          { id: 'level_1', label: 'Level 1 (Govt ID)' },
          { id: 'level_2', label: 'Level 2 (Background)' },
          { id: 'level_3', label: 'Level 3 (Master Pro)' },
          { id: 'approved', label: 'Approved' },
          { id: 'rejected', label: 'Rejected' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeFilter === tab.id
                ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Verification Cards Queue */}
      <div className="space-y-4">
        {filteredQueue.map((item) => {
          const isPending = item.status === 'pending';
          const isApproved = item.status === 'approved';
          const isRejected = item.status === 'rejected';

          return (
            <div 
              key={item.id} 
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-violet-600 dark:text-violet-400">#{item.id}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-[10px] font-bold uppercase">
                      {item.trade}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {item.providerName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Submitted on: <span className="text-slate-700 dark:text-slate-300 font-medium">{item.submittedDate}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${
                    isApproved
                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40'
                      : isRejected
                      ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/40'
                      : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Document details box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block mb-1">Target Badge</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-300 block">
                    {item.targetLabel || item.targetLevel.replace(/_/g, ' ')}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">Exp: {item.experienceYears}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block mb-1">Document Attachment</span>
                  <span className="font-semibold text-slate-900 dark:text-white block">{item.documentType}</span>
                  <button
                    onClick={() => setInspectDoc(item)}
                    className="inline-flex items-center space-x-1 text-xs text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-bold mt-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Document Proof</span>
                  </button>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block mb-1">AI Risk Assessment</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block">{item.riskScore}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">Aadhaar OCR Match: 100%</span>
                </div>
              </div>

              {/* Actions */}
              {isPending && (
                <div className="flex flex-wrap gap-2.5 pt-1">
                  <button
                    onClick={() => handleAuditAction(item.id, 'approved')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve & Grant Badge</span>
                  </button>
                  <button
                    onClick={() => handleAuditAction(item.id, 'rejected')}
                    className="px-5 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-700 dark:text-rose-300 border border-rose-500/40 font-bold text-xs flex items-center gap-1.5 transition-all"
                  >
                    <X className="w-4 h-4" />
                    <span>Reject Application</span>
                  </button>
                  <button
                    onClick={() => setInspectDoc(item)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-slate-700 transition-all"
                  >
                    Inspect Full Proof
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Document Inspection Modal */}
      {inspectDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">Document Inspector</span>
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  {inspectDoc.providerName} — {inspectDoc.documentType}
                </h3>
              </div>
              <button 
                onClick={() => setInspectDoc(null)}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Document Preview Image */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 max-h-[380px] flex items-center justify-center">
              <img 
                src={inspectDoc.documentUrl} 
                alt="Document proof" 
                className="w-full h-full object-cover max-h-[380px]"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Security Stamp: Verified Digital Signature</span>
              <span>Aadhaar Match: OK</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  handleAuditAction(inspectDoc.id, 'approved');
                  setInspectDoc(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20"
              >
                Approve Document Proof
              </button>
              <button
                onClick={() => {
                  handleAuditAction(inspectDoc.id, 'rejected');
                  setInspectDoc(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-700 dark:text-rose-300 border border-rose-500/40 font-bold text-xs"
              >
                Reject Proof
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
