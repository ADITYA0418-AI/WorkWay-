import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount || 0);
}

export function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function getStatusBadgeStyle(status) {
  switch (status) {
    case 'pending':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'accepted':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'on_the_way':
      return 'bg-sky-500/10 text-sky-400 border-sky-500/20 animate-pulse';
    case 'in_progress':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    case 'completed':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'cancelled':
      return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    case 'disputed':
      return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    default:
      return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
}
