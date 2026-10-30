import React, { useState } from 'react';
import { formatCurrency } from '../../lib/utils';
import { TrendingUp, Calendar, DollarSign, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const TREND_DATA = {
  daily: [
    { label: 'Mon', date: 'Aug 12', amount: 1400, jobs: 1 },
    { label: 'Tue', date: 'Aug 13', amount: 2800, jobs: 2 },
    { label: 'Wed', date: 'Aug 14', amount: 1900, jobs: 2 },
    { label: 'Thu', date: 'Aug 15', amount: 2200, jobs: 2 },
    { label: 'Fri', date: 'Aug 16', amount: 3100, jobs: 3 },
    { label: 'Sat', date: 'Aug 17', amount: 4200, jobs: 4 },
    { label: 'Sun', date: 'Aug 18 (Today)', amount: 2800, jobs: 2 }
  ],
  weekly: [
    { label: 'Week 1', date: 'Jul 22 - Jul 28', amount: 8200, jobs: 8 },
    { label: 'Week 2', date: 'Jul 29 - Aug 04', amount: 9100, jobs: 9 },
    { label: 'Week 3', date: 'Aug 05 - Aug 11', amount: 11500, jobs: 12 },
    { label: 'Week 4', date: 'Aug 12 - Aug 18', amount: 9650, jobs: 10 }
  ],
  monthly: [
    { label: 'Mar', date: 'March 2026', amount: 34200, jobs: 34 },
    { label: 'Apr', date: 'April 2026', amount: 36800, jobs: 36 },
    { label: 'May', date: 'May 2026', amount: 35000, jobs: 33 },
    { label: 'Jun', date: 'June 2026', amount: 39100, jobs: 38 },
    { label: 'Jul', date: 'July 2026', amount: 33700, jobs: 31 },
    { label: 'Aug', date: 'August 2026', amount: 38450, jobs: 37 }
  ]
};

export const EarningsTrendChart = () => {
  const [period, setPeriod] = useState('daily'); // 'daily' | 'weekly' | 'monthly'
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const data = TREND_DATA[period];
  const maxAmount = Math.max(...data.map(d => d.amount));
  const totalPeriodAmount = data.reduce((acc, curr) => acc + curr.amount, 0);

  // SVG dimensions
  const svgWidth = 640;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - (d.amount / (maxAmount * 1.15)) * (svgHeight - paddingY * 2);
    return { ...d, x, y };
  });

  const pathD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x},${p.y}`;
    // Smooth bezier curve control points
    const prev = points[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} C ${cx},${prev.y} ${cx},${p.y} ${p.x},${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x},${svgHeight - paddingY} L ${points[0].x},${svgHeight - paddingY} Z`;

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
      
      {/* Header with Period Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
              Earnings Trend
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
              +14.2% Growth
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track your daily revenue velocity, customer volume, and performance peaks.
          </p>
        </div>

        {/* Daily | Weekly | Monthly Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold self-start sm:self-auto">
          <button
            onClick={() => { setPeriod('daily'); setHoveredPoint(null); }}
            className={`px-4 py-1.5 rounded-xl transition-all ${
              period === 'daily'
                ? 'bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => { setPeriod('weekly'); setHoveredPoint(null); }}
            className={`px-4 py-1.5 rounded-xl transition-all ${
              period === 'weekly'
                ? 'bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => { setPeriod('monthly'); setHoveredPoint(null); }}
            className={`px-4 py-1.5 rounded-xl transition-all ${
              period === 'monthly'
                ? 'bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Quick Summary Pill Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 font-bold uppercase block">Selected Period Total</span>
          <span className="font-heading text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5 block">{formatCurrency(totalPeriodAmount)}</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 font-bold uppercase block">Peak Revenue</span>
          <span className="font-heading text-lg font-black text-slate-900 dark:text-white mt-0.5 block">{formatCurrency(maxAmount)}</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 font-bold uppercase block">Avg Per Booking</span>
          <span className="font-heading text-lg font-black text-sky-600 dark:text-sky-400 mt-0.5 block">{formatCurrency(1240)}</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 font-bold uppercase block">Payout Reliability</span>
          <span className="font-heading text-lg font-black text-purple-600 dark:text-purple-400 mt-0.5 block">Escrow Protected</span>
        </div>
      </div>

      {/* SVG Interactive Chart */}
      <div className="relative w-full overflow-hidden pt-2">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-56 sm:h-64 overflow-visible"
        >
          <defs>
            <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="currentColor" strokeDasharray="4 4" className="text-slate-300 dark:text-slate-700 opacity-40" />
          <line x1={paddingX} y1={svgHeight / 2} x2={svgWidth - paddingX} y2={svgHeight / 2} stroke="currentColor" strokeDasharray="4 4" className="text-slate-300 dark:text-slate-700 opacity-40" />
          <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="currentColor" className="text-slate-300 dark:text-slate-700 opacity-70" />

          {/* Area fill */}
          <path d={areaD} fill="url(#earningsGradient)" />

          {/* Glowing line */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#strokeGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Interactive Data Points */}
          {points.map((p, index) => {
            const isHovered = hoveredPoint?.label === p.label;
            return (
              <g key={index} className="cursor-pointer">
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? '7' : '4.5'}
                  fill={isHovered ? '#38bdf8' : '#10b981'}
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-white dark:text-slate-900 transition-all duration-150"
                  onMouseEnter={() => setHoveredPoint(p)}
                />
                {/* X-axis Label */}
                <text
                  x={p.x}
                  y={svgHeight - 8}
                  textAnchor="middle"
                  fill="currentColor"
                  className="text-slate-500 dark:text-slate-400"
                  fontSize="11"
                  fontWeight="600"
                >
                  {p.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Box */}
        {hoveredPoint && (
          <div className="absolute top-2 right-4 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl backdrop-blur-xl text-xs space-y-1 animate-in fade-in">
            <div className="flex items-center justify-between space-x-3">
              <span className="font-bold text-slate-900 dark:text-white">{hoveredPoint.date}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-black">{formatCurrency(hoveredPoint.amount)}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {hoveredPoint.jobs} jobs completed • ₹{Math.round(hoveredPoint.amount / hoveredPoint.jobs)} avg
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
