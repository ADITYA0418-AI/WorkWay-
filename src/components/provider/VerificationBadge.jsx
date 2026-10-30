import React from 'react';
import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react';

export const VerificationBadge = ({ level = 'level_1_basic', showDetails = false }) => {
  if (level === 'level_3_master_pro') {
    return (
      <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold shadow-sm">
        <Award className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        <span>Master Pro Level 3</span>
      </div>
    );
  }

  if (level === 'level_2_background') {
    return (
      <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Background Cleared Level 2</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-medium">
      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
      <span>Basic Verified Level 1</span>
    </div>
  );
};
