import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  UserCheck,
  Wrench,
  ShieldCheck,
  AlertTriangle,
  Activity,
  DollarSign,
  CreditCard,
  ArrowDownCircle,
  RefreshCcw,
  BarChart3,
  TrendingUp,
  FileBarChart2,
  Store,
  Bell,
  UserCog,
  Settings,
  ScrollText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { WorkWaySvgLogo } from '../common/WorkWayLogo';

const NAV_GROUPS = [
  {
    items: [
      { label: 'Overview', icon: LayoutDashboard, to: '/admin' },
    ],
  },
  {
    heading: 'OPERATIONS',
    items: [
      { label: 'Bookings',  icon: CalendarDays,  to: '/admin/bookings'  },
      { label: 'Providers', icon: Wrench,         to: '/admin/providers' },
      { label: 'Customers', icon: Users,           to: '/admin/customers' },
      { label: 'Services',  icon: Store,           to: '/admin/services'  },
    ],
  },
  {
    heading: 'TRUST & SAFETY',
    items: [
      { label: 'Verification', icon: ShieldCheck,    to: '/admin/verification' },
      { label: 'Disputes',     icon: AlertTriangle,  to: '/admin/disputes'     },
      { label: 'Fraud & Risk', icon: Activity,       to: '/admin/fraud'        },
    ],
  },
  {
    heading: 'FINANCE',
    items: [
      { label: 'Revenue',  icon: DollarSign,      to: '/admin/revenue'   },
      { label: 'Payments', icon: CreditCard,       to: '/admin/payments'  },
      { label: 'Payouts',  icon: ArrowDownCircle,  to: '/admin/payouts'   },
      { label: 'Refunds',  icon: RefreshCcw,       to: '/admin/refunds'   },
    ],
  },
  {
    heading: 'ANALYTICS',
    items: [
      { label: 'Marketplace', icon: BarChart3,      to: '/admin/analytics'    },
      { label: 'Performance', icon: TrendingUp,     to: '/admin/performance'  },
      { label: 'Reports',     icon: FileBarChart2,  to: '/admin/reports'      },
    ],
  },
  {
    heading: 'SYSTEM',
    items: [
      { label: 'Notifications', icon: Bell,     to: '/admin/notifications' },
      { label: 'Admin Users',   icon: UserCog,  to: '/admin/users'         },
      { label: 'Settings',      icon: Settings, to: '/admin/settings'      },
      { label: 'Audit Logs',    icon: ScrollText, to: '/admin/audit'       },
    ],
  },
];

export const AdminSidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();

  const isActive = (to) => {
    if (to === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(to);
  };

  return (
    <aside
      className="relative flex flex-col h-full transition-all duration-300 ease-in-out select-none"
      style={{
        width: collapsed ? '64px' : '220px',
        minWidth: collapsed ? '64px' : '220px',
      }}
    >
      {/* Sidebar background — theme-aware */}
      <div
        className="absolute inset-0 bg-slate-50 dark:bg-[#0a0f1e] border-r border-slate-200 dark:border-indigo-500/12"
        style={{ zIndex: 0 }}
      />

      {/* Logo — Clickable to route to /admin */}
      <Link
        to="/admin"
        className="relative z-10 flex items-center gap-2.5 px-3.5 py-4 overflow-hidden border-b border-slate-200 dark:border-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors group"
        title="WorkWay Admin Overview"
      >
        <div className="flex-shrink-0 group-hover:scale-105 transition-transform drop-shadow-md">
          <WorkWaySvgLogo width={36} height={36} className="rounded-xl shadow-lg shadow-blue-500/20" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden whitespace-nowrap">
            <p className="font-heading font-extrabold text-sm text-slate-900 dark:text-white tracking-wide leading-none group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">WORKWAY</p>
            <p className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold tracking-widest mt-0.5">ADMIN SUITE</p>
          </div>
        )}
      </Link>

      {/* Nav Groups */}
      <nav className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden py-3 scrollbar-none">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className="mb-1">
            {/* Section Heading */}
            {group.heading && !collapsed && (
              <p className="px-4 pt-3 pb-1 text-[9px] font-bold tracking-[0.15em] text-slate-400 dark:text-slate-600 uppercase">
                {group.heading}
              </p>
            )}
            {group.heading && collapsed && (
              <div className="mx-3 my-2 border-t border-slate-200 dark:border-slate-800/60" />
            )}

            {group.items.map((item) => {
              const active = isActive(item.to);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/admin'}
                  title={collapsed ? item.label : undefined}
                  className={`
                    relative flex items-center gap-3 mx-2 px-3 py-2 rounded-xl mb-0.5 text-[13px] font-medium
                    transition-all duration-150 group overflow-hidden
                    ${active
                      ? 'bg-violet-100 dark:bg-violet-600/20 text-violet-700 dark:text-violet-300'
                      : 'text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                    }
                  `}
                >
                  {/* Active indicator bar */}
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-violet-500 dark:bg-violet-400" />
                  )}
                  <item.icon
                    className={`w-4 h-4 flex-shrink-0 transition-colors ${active ? 'text-violet-600 dark:text-violet-400' : 'text-slate-400 dark:text-slate-600 group-hover:text-slate-700 dark:group-hover:text-slate-300'}`}
                  />
                  {!collapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                  {/* Tooltip when collapsed */}
                  {collapsed && (
                    <span className="
                      absolute left-full ml-3 px-2.5 py-1 rounded-lg
                      bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-semibold whitespace-nowrap
                      opacity-0 group-hover:opacity-100 pointer-events-none
                      transition-opacity duration-150 z-50 shadow-xl
                      border border-slate-200 dark:border-slate-700
                    ">
                      {item.label}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="relative z-10 p-3 border-t border-slate-200 dark:border-slate-800/60">
        <button
          onClick={onToggle}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className={`
            flex items-center justify-center w-full py-2 rounded-xl
            bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/60
            text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200
            transition-all duration-150 text-xs font-semibold gap-2
          `}
        >
          {collapsed
            ? <ChevronRight className="w-4 h-4" />
            : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse</span>
              </>
            )
          }
        </button>
      </div>
    </aside>
  );
};
