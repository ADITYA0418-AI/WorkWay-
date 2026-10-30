import React, { useState } from 'react';
import { ScrollText, Search, Shield, Clock, User, Globe, ChevronDown, Filter } from 'lucide-react';

export const AuditLogsView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const logs = [
    { id: 'LOG-5001', adminId: 'adm-001', adminName: 'Vaibhavi Sardeshmukh', action: 'Approved Provider Verification Badge (Level 3 Master Pro)', category: 'verification', ip: '157.48.24.10', location: 'Pune, MH', timestamp: '24 Aug 2026, 10:14:32 AM', severity: 'info' },
    { id: 'LOG-5002', adminId: 'adm-002', adminName: 'Arjun Kapoor', action: 'Suspended Customer Account #c-206 (Rajat Verma) — Fraud Flag FR-802', category: 'security', ip: '157.48.24.11', location: 'Bangalore, KA', timestamp: '24 Aug 2026, 09:58:11 AM', severity: 'critical' },
    { id: 'LOG-5003', adminId: 'adm-001', adminName: 'Vaibhavi Sardeshmukh', action: 'Issued Full Refund ₹950 for Dispute DIS-103 (Priya Mehta vs Suresh D.)', category: 'finance', ip: '157.48.24.10', location: 'Pune, MH', timestamp: '24 Aug 2026, 09:41:05 AM', severity: 'warning' },
    { id: 'LOG-5004', adminId: 'adm-004', adminName: 'Rohit Verma', action: 'Processed Instant Payout ₹12,450 → Rohan Mehta (HDFC ••4912)', category: 'finance', ip: '103.21.44.19', location: 'Mumbai, MH', timestamp: '24 Aug 2026, 09:30:00 AM', severity: 'info' },
    { id: 'LOG-5005', adminId: 'adm-001', adminName: 'Vaibhavi Sardeshmukh', action: 'Sent Global Broadcast Notification to 360 Providers — Monsoon Surge Alert', category: 'notification', ip: '157.48.24.10', location: 'Pune, MH', timestamp: '24 Aug 2026, 08:00:22 AM', severity: 'info' },
    { id: 'LOG-5006', adminId: 'adm-001', adminName: 'Vaibhavi Sardeshmukh', action: 'Updated Platform Commission Rate: 10% → 12% for Painting category', category: 'settings', ip: '157.48.24.10', location: 'Pune, MH', timestamp: '23 Aug 2026, 06:15:45 PM', severity: 'warning' },
    { id: 'LOG-5007', adminId: 'adm-003', adminName: 'Sneha Patel', action: 'Rejected Verification Request VER-405 (Dinesh Kumar) — Forged Document Suspected', category: 'verification', ip: '106.51.84.21', location: 'Bangalore, KA', timestamp: '23 Aug 2026, 05:30:12 PM', severity: 'critical' },
    { id: 'LOG-5008', adminId: 'adm-002', adminName: 'Arjun Kapoor', action: 'Dismissed Fraud Flag FR-804 — Confirmed False Positive after Internal Review', category: 'security', ip: '157.48.24.11', location: 'Bangalore, KA', timestamp: '23 Aug 2026, 02:10:08 PM', severity: 'info' }
  ];

  const CATEGORY_MAP = {
    all: { label: 'All Events' },
    verification: { label: 'Verification', color: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-500/15', border: 'border-amber-500/30' },
    security: { label: 'Security', color: 'text-rose-700 dark:text-rose-300', bg: 'bg-rose-500/15', border: 'border-rose-500/30' },
    finance: { label: 'Finance', color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30' },
    notification: { label: 'Notification', color: 'text-indigo-700 dark:text-indigo-300', bg: 'bg-indigo-500/15', border: 'border-indigo-500/30' },
    settings: { label: 'Settings', color: 'text-slate-700 dark:text-slate-300', bg: 'bg-slate-500/15', border: 'border-slate-500/30' },
  };

  const SEVERITY_MAP = {
    info:     { dot: 'bg-sky-500', label: 'Info' },
    warning:  { dot: 'bg-amber-500', label: 'Warning' },
    critical: { dot: 'bg-rose-500', label: 'Critical' }
  };

  const filtered = logs.filter(l => {
    const matchSearch = l.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        l.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = categoryFilter === 'all' ? true : l.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[10px] font-bold uppercase">SYSTEM</span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Security Audit Logs</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Immutable record of all admin actions — approvals, suspensions, payouts, broadcasts & config changes.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm">
            Total Events: <span className="text-slate-900 dark:text-white font-extrabold">{filtered.length}</span>
          </span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search action, admin name, log ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {Object.entries(CATEGORY_MAP).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setCategoryFilter(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                categoryFilter === key
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-900'
              }`}
            >
              {val.label}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
              <tr>
                <th className="px-5 py-3.5">Log ID</th>
                <th className="px-5 py-3.5">Admin</th>
                <th className="px-5 py-3.5">Action Performed</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">IP Address / Location</th>
                <th className="px-5 py-3.5 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filtered.map((log) => {
                const cat = CATEGORY_MAP[log.category] || CATEGORY_MAP.settings;
                const sev = SEVERITY_MAP[log.severity] || SEVERITY_MAP.info;
                return (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4 font-mono font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${sev.dot}`} />
                        {log.id}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-bold text-slate-900 dark:text-white">{log.adminName}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{log.adminId}</p>
                    </td>
                    <td className="px-5 py-4 max-w-xs">
                      <p className="text-slate-800 dark:text-slate-200 leading-snug line-clamp-2">{log.action}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${cat.bg || 'bg-slate-100 dark:bg-slate-800'} ${cat.color || 'text-slate-700 dark:text-slate-300'} ${cat.border || 'border-slate-200 dark:border-slate-700'}`}>
                        {cat.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-slate-600 dark:text-slate-400 text-[11px]">
                      <p>{log.ip}</p>
                      <p className="text-slate-400 dark:text-slate-500">{log.location}</p>
                    </td>
                    <td className="px-5 py-4 text-right text-slate-500 dark:text-slate-400 font-mono text-[11px] whitespace-nowrap">
                      {log.timestamp}
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
