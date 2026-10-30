import React, { useState } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  ShieldAlert, 
  Ban, 
  CheckCircle2, 
  Lock, 
  Smartphone, 
  MapPin, 
  Clock, 
  Zap, 
  Eye, 
  X
} from 'lucide-react';

export const FraudRiskView = () => {
  const [toastNotice, setToastNotice] = useState(null);

  const [flaggedEvents, setFlaggedEvents] = useState([
    {
      id: 'FR-801',
      user: 'Ramesh K. (Provider #p-104)',
      role: 'Provider (Electrician)',
      severity: 'CRITICAL',
      riskScore: '92/100',
      reason: 'Off-Platform Payment Solicitation in Chat',
      details: 'Detected phone number exchange and keywords: "Pay via GPay directly to save GST/app fees" in booking #WW-9014.',
      detectedAt: '24 mins ago',
      status: 'active_flag',
      ip: '157.48.21.90 (Bangalore)'
    },
    {
      id: 'FR-802',
      user: 'Karan Malhotra (Customer #c-204)',
      role: 'Customer',
      severity: 'HIGH',
      riskScore: '84/100',
      reason: 'Concurrent Multi-Geo Login & Device Mismatch',
      details: 'Account logged in simultaneously from Mumbai (IP: 103.21.24.1) and Bangalore (IP: 49.37.112.5) within 4 minutes.',
      detectedAt: '1 hour ago',
      status: 'active_flag',
      ip: '103.21.24.1 (Mumbai) / 49.37.112.5 (Bangalore)'
    },
    {
      id: 'FR-803',
      user: 'Mohan R. (Provider #p-108)',
      role: 'Provider (Electrician)',
      severity: 'MEDIUM',
      riskScore: '71/100',
      reason: 'Rapid Lead Cancellation Surge',
      details: 'Declined 8 consecutive emergency dispatch leads within 30 minutes while showing active duty status.',
      detectedAt: '3 hours ago',
      status: 'active_flag',
      ip: '117.195.4.12'
    },
    {
      id: 'FR-804',
      user: 'Vikram Rao (Customer #c-310)',
      role: 'Customer',
      severity: 'MEDIUM',
      riskScore: '65/100',
      reason: 'Material Cost Outlier Flag',
      details: 'Booking #WW-8291 requested material cost (₹260) exceeds 35% of standard labor estimate for Solapur zone.',
      detectedAt: '5 hours ago',
      status: 'dismissed',
      ip: '106.51.84.22'
    }
  ]);

  const handleAction = (id, actionType) => {
    setFlaggedEvents(prev =>
      prev.map(item => item.id === id ? { ...item, status: actionType === 'suspend' ? 'suspended' : 'dismissed' } : item)
    );
    setToastNotice(actionType === 'suspend' ? `Account ${id} has been suspended immediately!` : `Security flag ${id} dismissed.`);
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
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30 text-[10px] font-bold uppercase">
              TRUST & SAFETY
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              Heuristic AI Active
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Rule-Based Fraud & Security Risk Engine
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time detection of off-platform transactions, GPS location spoofing, and rogue account behavior.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-xs font-bold text-purple-700 dark:text-purple-300 shadow-sm">
            Critical Flags: <span className="font-extrabold">{flaggedEvents.filter(f => f.status === 'active_flag' && f.severity === 'CRITICAL').length}</span>
          </span>
        </div>
      </div>

      {/* Flagged Accounts List */}
      <div className="space-y-4">
        {flaggedEvents.map((event) => {
          const isCritical = event.severity === 'CRITICAL';
          const isHigh = event.severity === 'HIGH';
          const isSuspended = event.status === 'suspended';
          const isDismissed = event.status === 'dismissed';

          return (
            <div 
              key={event.id}
              className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border space-y-4 transition-all shadow-sm ${
                isSuspended 
                  ? 'border-rose-500/30 opacity-75' 
                  : isDismissed 
                  ? 'border-slate-200 dark:border-slate-800 opacity-60' 
                  : isCritical 
                  ? 'border-rose-300 dark:border-rose-500/40 hover:border-rose-400 dark:hover:border-rose-500/60' 
                  : 'border-amber-300 dark:border-amber-500/40 hover:border-amber-400 dark:hover:border-amber-500/60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl ${isCritical ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400' : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'}`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                        isCritical ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/40' : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40'
                      }`}>
                        {event.severity} RISK
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">#{event.id}</span>
                    </div>
                    <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white mt-1">
                      {event.reason}
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Risk Score</span>
                  <span className={`font-mono text-sm font-extrabold ${isCritical ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    {event.riskScore}
                  </span>
                </div>
              </div>

              {/* Event Details Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-2">
                  <div>
                    <span className="text-slate-500 font-bold uppercase text-[10px]">Target Account:</span>{' '}
                    <span className="font-bold text-slate-900 dark:text-white">{event.user}</span>{' '}
                    <span className="text-slate-500 dark:text-slate-400 font-medium">({event.role})</span>
                  </div>
                  <span className="text-slate-400 dark:text-slate-500 text-[11px] font-mono">Detected {event.detectedAt}</span>
                </div>

                <p className="text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                  <strong>Trigger Reason:</strong> {event.details}
                </p>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1 font-mono">
                  <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Client IP / Device Fingerprint: {event.ip}</span>
                </div>
              </div>

              {/* Triggers */}
              {event.status === 'active_flag' && (
                <div className="flex flex-wrap gap-2.5 pt-1">
                  <button
                    onClick={() => handleAction(event.id, 'suspend')}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/20 flex items-center gap-1.5 transition-all"
                  >
                    <Ban className="w-4 h-4" />
                    <span>Suspend User Immediately</span>
                  </button>

                  <button
                    onClick={() => handleAction(event.id, 'dismiss')}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-slate-700 transition-all"
                  >
                    Dismiss False Positive
                  </button>

                  <button
                    onClick={() => setToastNotice(`Requested 2FA biometric re-verification for ${event.user}`)}
                    className="px-4 py-2 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 font-bold text-xs transition-all"
                  >
                    Enforce 2FA Biometric Re-Auth
                  </button>
                </div>
              )}

              {isSuspended && (
                <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs font-bold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                  <Ban className="w-4 h-4" />
                  <span>User Account Has Been Suspended & Sessions Terminated.</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
