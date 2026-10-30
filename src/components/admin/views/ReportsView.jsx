import React, { useState } from 'react';
import { 
  FileBarChart2, 
  Download, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  Layers,
  DollarSign,
  ShieldCheck,
  Users
} from 'lucide-react';

export const ReportsView = () => {
  const [toastNotice, setToastNotice] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  const reportsList = [
    {
      id: 'rep-01',
      title: 'Monthly Marketplace Financial & GMV Statement',
      category: 'Financial',
      description: 'Gross merchandise value, platform commission take, payment gateway fees & Pro subscription revenue.',
      period: 'August 2026',
      size: '2.4 MB PDF / 480 KB CSV',
      icon: DollarSign,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-500/15'
    },
    {
      id: 'rep-02',
      title: 'Provider Payout & Tax Deducted at Source (TDS) Report',
      category: 'Tax & Compliance',
      description: 'Detailed breakdown of worker earnings, weekly disbursements, bank account details & 1% Section 194M TDS withholdings.',
      period: 'August 2026',
      size: '1.8 MB CSV',
      icon: FileText,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-500/15'
    },
    {
      id: 'rep-03',
      title: 'Trust, Safety & Dispute Arbitrations Audit',
      category: 'Security & Trust',
      description: 'Summary of customer disputes, refund amounts issued, fraudulent pattern detection logs and provider suspensions.',
      period: 'August 2026',
      size: '1.2 MB PDF',
      icon: ShieldCheck,
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-500/15'
    },
    {
      id: 'rep-04',
      title: 'Customer Cohort Retention & Lifetime Spend',
      category: 'Growth & Marketing',
      description: 'Repeat hiring frequency, average order values by society hub, and net promoter score (NPS) cohorts.',
      period: 'Q2 / Q3 2026',
      size: '3.1 MB CSV',
      icon: Users,
      color: 'text-sky-600 dark:text-sky-400',
      bg: 'bg-sky-500/15'
    }
  ];

  const handleDownload = (report, type) => {
    setDownloadingId(report.id + '-' + type);
    setTimeout(() => {
      setDownloadingId(null);
      setToastNotice(`Downloaded "${report.title}" (${type.toUpperCase()})`);
      setTimeout(() => setToastNotice(null), 3500);
    }, 1200);
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
            <span className="px-2.5 py-0.5 rounded-full bg-violet-500/15 text-violet-700 dark:text-violet-300 border border-violet-500/30 text-[10px] font-bold uppercase">
              ANALYTICS & EXPORTS
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Data Exports & Financial Statements
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Generate and export monthly financial statements, worker TDS returns & platform audit packages.
          </p>
        </div>
      </div>

      {/* Reports List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reportsList.map((r) => {
          const Icon = r.icon;
          const isDownloadingPdf = downloadingId === r.id + '-pdf';
          const isDownloadingCsv = downloadingId === r.id + '-csv';

          return (
            <div 
              key={r.id} 
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-2xl ${r.bg} ${r.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">{r.category}</span>
                      <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white leading-snug">{r.title}</h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed min-h-[40px]">
                  {r.description}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Reporting Period: <strong className="text-slate-900 dark:text-slate-300">{r.period}</strong></span>
                  <span>{r.size}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => handleDownload(r, 'csv')}
                  disabled={isDownloadingCsv}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{isDownloadingCsv ? 'Generating CSV...' : 'Download CSV'}</span>
                </button>

                <button
                  onClick={() => handleDownload(r, 'pdf')}
                  disabled={isDownloadingPdf}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-1.5 transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{isDownloadingPdf ? 'Generating PDF...' : 'Download PDF'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
