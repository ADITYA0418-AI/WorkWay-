import React, { useState } from 'react';
import { Sparkles, Info, Check } from 'lucide-react';

export const WorkWayMatchBadge = ({ matchData }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const score = matchData?.score || 95;

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-sky-600/30 to-blue-600/30 border border-sky-500/40 text-sky-300 text-xs font-bold shadow-md transition-all hover:scale-105"
      >
        <Sparkles className="w-3.5 h-3.5 text-sky-400 fill-sky-300 animate-pulse" />
        <span>{score}% WorkWay Match</span>
        <Info className="w-3 h-3 text-sky-400/80 ml-0.5" />
      </button>

      {showTooltip && (
        <div className="absolute top-8 left-0 z-30 w-64 bg-slate-900 border border-sky-500/40 rounded-xl p-3 shadow-2xl animate-in fade-in zoom-in-95">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-sky-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Why this {score}% Match?</span>
          </div>
          <div className="space-y-1.5">
            {matchData?.breakdown?.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
