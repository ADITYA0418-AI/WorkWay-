import React from 'react';
import { cn } from '../../lib/utils';

export const Badge = ({ children, variant = 'default', className }) => {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    primary: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    danger: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variants[variant] || variants.default,
        className
      )}
    >
      {children}
    </span>
  );
};
