import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  Search, 
  Calendar, 
  MessageSquare, 
  User, 
  LayoutDashboard, 
  Send, 
  Briefcase, 
  DollarSign, 
  CheckCircle, 
  AlertTriangle,
  BarChart2
} from 'lucide-react';

export const BottomNav = () => {
  const { role } = useAuth();

  const consumerLinks = [
    { to: '/consumer', label: 'Home', icon: Home },
    { to: '/consumer/search', label: 'Search', icon: Search },
    { to: '/consumer/bookings', label: 'Bookings', icon: Calendar },
    { to: '/consumer/messages', label: 'Messages', icon: MessageSquare },
    { to: '/consumer/profile', label: 'Profile', icon: User },
  ];

  const providerLinks = [
    { to: '/provider', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/provider/leads', label: 'Leads', icon: Send },
    { to: '/provider/jobs', label: 'Jobs', icon: Briefcase },
    { to: '/provider/earnings', label: 'Earnings', icon: DollarSign },
    { to: '/provider/profile', label: 'Profile', icon: User },
  ];

  const adminLinks = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/verification', label: 'Verification', icon: CheckCircle },
    { to: '/admin/disputes', label: 'Disputes', icon: AlertTriangle },
    { to: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
  ];

  const links = role === 'admin' ? adminLinks : role === 'provider' ? providerLinks : consumerLinks;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/consumer' || link.to === '/provider' || link.to === '/admin'}
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
                  isActive
                    ? 'text-[#0F766E] dark:text-teal-400 font-bold scale-105'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">{link.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
