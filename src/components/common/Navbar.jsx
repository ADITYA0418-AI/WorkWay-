import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from '../../context/LocationContext';
import { useNotifications } from '../../context/NotificationContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Zap, 
  MapPin, 
  Bell, 
  User, 
  ShieldAlert, 
  LogOut, 
  Sparkles,
  ChevronDown,
  Briefcase,
  Sun,
  Moon,
  Check
} from 'lucide-react';

import { WorkWayLogo } from './WorkWayLogo';

const ROLE_CONFIGS = {
  consumer: {
    id: 'consumer',
    name: 'Consumer',
    buttonLabel: '🟢 Consumer View',
    pillColor: 'text-emerald-700 dark:text-emerald-300',
    pillBg: 'bg-emerald-50 dark:bg-emerald-950/50',
    pillBorder: 'border-emerald-200 dark:border-emerald-800/80',
    indicatorDot: 'bg-emerald-500',
    description: 'Homeowner: Search & Hire Pros',
    route: '/consumer'
  },
  provider: {
    id: 'provider',
    name: 'Provider',
    buttonLabel: '🔵 Provider View',
    pillColor: 'text-sky-700 dark:text-sky-300',
    pillBg: 'bg-sky-50 dark:bg-sky-950/50',
    pillBorder: 'border-sky-200 dark:border-sky-800/80',
    indicatorDot: 'bg-sky-500',
    description: 'Tradesperson: Leads & Duty Jobs',
    route: '/provider'
  },
  admin: {
    id: 'admin',
    name: 'Admin',
    buttonLabel: '🟣 Admin View',
    pillColor: 'text-purple-700 dark:text-purple-300',
    pillBg: 'bg-purple-50 dark:bg-purple-950/50',
    pillBorder: 'border-purple-200 dark:border-purple-800/80',
    indicatorDot: 'bg-purple-500',
    description: 'Platform Control & Operations',
    route: '/admin'
  }
};

export const Navbar = ({ onOpenEmergency, onOpenLocationModal, onToggleChat, onReplayIntro }) => {
  const { user, role, switchDemoRole, logout } = useAuth();
  const { coords, radiusKm } = useLocation();
  const { unreadCount } = useNotifications();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const roleDropdownRef = useRef(null);

  const activeRole = role || 'consumer';
  const currentConfig = ROLE_CONFIGS[activeRole] || ROLE_CONFIGS.consumer;

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target)) {
        setShowRoleDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRoleSelect = (targetRole) => {
    switchDemoRole(targetRole);
    setShowRoleDropdown(false);
    const targetRoute = ROLE_CONFIGS[targetRole]?.route || '/consumer';
    navigate(targetRoute);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Slogan */}
          <div className="flex items-center space-x-2.5">
            <Link to={role === 'admin' ? '/admin' : role === 'provider' ? '/provider' : '/consumer'} className="group">
              <WorkWayLogo variant="full" size="md" taglineText="Your Career. Your Journey." />
            </Link>

            {/* Quick Demo Role Switcher Pill */}
            <div className="relative" ref={roleDropdownRef}>
              <button
                type="button"
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all shadow-sm ${currentConfig.pillBg} ${currentConfig.pillBorder} ${currentConfig.pillColor} hover:scale-105 active:scale-95`}
                aria-expanded={showRoleDropdown}
                aria-label="Switch Role View"
              >
                <span className="text-xs">{currentConfig.buttonLabel.split(' ')[0]}</span>
                <span className="hidden sm:inline">{currentConfig.buttonLabel.substring(2).trim()}</span>
                <span className="sm:hidden">{currentConfig.name}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${showRoleDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showRoleDropdown && (
                <div className="absolute top-10 left-0 w-60 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3.5 py-1.5 text-[10px] uppercase font-extrabold text-slate-400 dark:text-slate-500 tracking-wider flex items-center justify-between">
                    <span>SWITCH VIEW</span>
                    <span className="text-[9px] font-mono lowercase text-slate-400">demo mode</span>
                  </div>

                  <div className="p-1 space-y-1">
                    {Object.values(ROLE_CONFIGS).map((cfg) => {
                      const isSelected = activeRole === cfg.id;
                      return (
                        <button
                          key={cfg.id}
                          type="button"
                          onClick={() => handleRoleSelect(cfg.id)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all group ${
                            isSelected
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <span className="text-sm">{cfg.buttonLabel.split(' ')[0]}</span>
                            <div>
                              <p className="font-bold leading-tight">{cfg.name} View</p>
                              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">{cfg.description}</p>
                            </div>
                          </div>
                          {isSelected && (
                            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 font-extrabold flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center Location Picker Pill (Consumer view) */}
          {role === 'consumer' && (
            <button
              onClick={onOpenLocationModal}
              className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span className="font-medium max-w-[200px] truncate">{coords.label || coords.addressLine}</span>
              <span className="bg-sky-100 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 px-1.5 py-0.5 rounded text-[10px] font-bold">
                {radiusKm} km
              </span>
            </button>
          )}

          {/* Right Actions */}
          <div className="flex items-center space-x-3">

            {/* Emergency Mode Button (Consumer View) */}
            {role === 'consumer' && (
              <button
                type="button"
                onClick={onOpenEmergency}
                aria-label="Activate Emergency Mode"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-600/20 hover:bg-rose-100 dark:hover:bg-rose-600/30 border border-rose-200 dark:border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs font-semibold shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none"
              >
                <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400 animate-bounce" aria-hidden="true" />
                <span className="hidden sm:inline">Emergency</span>
              </button>
            )}

            {/* Intro Animation Replay Trigger */}
            <button
              type="button"
              onClick={onReplayIntro}
              aria-label="Replay futuristic loading animation"
              className="px-2.5 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-600 dark:text-sky-400 text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-sm group focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
              title="Watch Futuristic Loading Intro"
            >
              <Sparkles className="w-4 h-4 text-sky-500 group-hover:rotate-12 transition-transform" aria-hidden="true" />
              <span className="hidden sm:inline">Intro</span>
            </button>

            {/* Theme Toggle (Light / Dark) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-indigo-400" aria-hidden="true" />
              ) : (
                <Sun className="w-5 h-5 text-amber-500" aria-hidden="true" />
              )}
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={onToggleChat}
                aria-label={`Notifications and messages${unreadCount(role) > 0 ? ` (${unreadCount(role)} unread)` : ''}`}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
                title="Notifications & Messages"
              >
                <Bell className="w-5 h-5" aria-hidden="true" />
                {unreadCount(role) > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" aria-hidden="true"></span>
                )}
              </button>
            </div>

            {/* Profile Avatar / User */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Link
                  to={role === 'provider' ? '/provider/profile' : '/consumer/profile'}
                  className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
                  aria-label={`View ${user.full_name || user.name}'s profile`}
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'}
                    alt={`${user.full_name || user.name || 'User'} profile avatar`}
                    className="w-8 h-8 rounded-full border border-sky-500/40 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100';
                    }}
                  />
                  <span className="hidden lg:inline text-xs font-medium text-slate-800 dark:text-slate-200">
                    {user.full_name || user.name}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-slate-500 hover:text-rose-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-medium text-xs shadow-md shadow-[#0F766E]/20 transition-all"
              >
                Sign In
              </Link>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
