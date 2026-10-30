import React, { useState } from 'react';
import {
  LayoutDashboard, CalendarDays, Wrench, Users, Store,
  ShieldCheck, AlertTriangle, Activity,
  DollarSign, CreditCard, ArrowDownCircle, RefreshCcw,
  BarChart3, TrendingUp, FileBarChart2,
  Bell, UserCog, Settings, ScrollText,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import { WorkWaySvgLogo } from '../../components/common/WorkWayLogo';

// ─── View imports ───────────────────────────────────────────────────────────
import { OverviewView }               from '../../components/admin/views/OverviewView';
import { BookingsView }               from '../../components/admin/views/BookingsView';
import { ProvidersView }              from '../../components/admin/views/ProvidersView';
import { CustomersView }              from '../../components/admin/views/CustomersView';
import { ServicesView }               from '../../components/admin/views/ServicesView';
import { VerificationView }           from '../../components/admin/views/VerificationView';
import { DisputesView }               from '../../components/admin/views/DisputesView';
import { FraudRiskView }              from '../../components/admin/views/FraudRiskView';
import { RevenueView }                from '../../components/admin/views/RevenueView';
import { PaymentsView }               from '../../components/admin/views/PaymentsView';
import { PayoutsView }                from '../../components/admin/views/PayoutsView';
import { RefundsView }                from '../../components/admin/views/RefundsView';
import { MarketplaceAnalyticsView }   from '../../components/admin/views/MarketplaceAnalyticsView';
import { PerformanceView }            from '../../components/admin/views/PerformanceView';
import { ReportsView }                from '../../components/admin/views/ReportsView';
import { NotificationsView }          from '../../components/admin/views/NotificationsView';
import { AdminUsersView }             from '../../components/admin/views/AdminUsersView';
import { SettingsView }               from '../../components/admin/views/SettingsView';
import { AuditLogsView }              from '../../components/admin/views/AuditLogsView';

// ─── Navigation Config ───────────────────────────────────────────────────────
const NAV_GROUPS = [
  {
    items: [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    ],
  },
  {
    heading: 'OPERATIONS',
    items: [
      { id: 'bookings',  label: 'Bookings',  icon: CalendarDays },
      { id: 'providers', label: 'Providers', icon: Wrench       },
      { id: 'customers', label: 'Customers', icon: Users        },
      { id: 'services',  label: 'Services',  icon: Store        },
    ],
  },
  {
    heading: 'TRUST & SAFETY',
    items: [
      { id: 'verification', label: 'Verification', icon: ShieldCheck   },
      { id: 'disputes',     label: 'Disputes',     icon: AlertTriangle },
      { id: 'fraud',        label: 'Fraud & Risk', icon: Activity      },
    ],
  },
  {
    heading: 'FINANCE',
    items: [
      { id: 'revenue',  label: 'Revenue',  icon: DollarSign     },
      { id: 'payments', label: 'Payments', icon: CreditCard      },
      { id: 'payouts',  label: 'Payouts',  icon: ArrowDownCircle },
      { id: 'refunds',  label: 'Refunds',  icon: RefreshCcw      },
    ],
  },
  {
    heading: 'ANALYTICS',
    items: [
      { id: 'marketplace',  label: 'Marketplace',  icon: BarChart3     },
      { id: 'performance',  label: 'Performance',  icon: TrendingUp    },
      { id: 'reports',      label: 'Reports',      icon: FileBarChart2 },
    ],
  },
  {
    heading: 'SYSTEM',
    items: [
      { id: 'notifications', label: 'Notifications', icon: Bell      },
      { id: 'admin-users',   label: 'Admin Users',   icon: UserCog   },
      { id: 'settings',      label: 'Settings',      icon: Settings  },
      { id: 'audit',         label: 'Audit Logs',    icon: ScrollText},
    ],
  },
];

// ─── View Map ─────────────────────────────────────────────────────────────────
const VIEW_MAP = {
  overview:      OverviewView,
  bookings:      BookingsView,
  providers:     ProvidersView,
  customers:     CustomersView,
  services:      ServicesView,
  verification:  VerificationView,
  disputes:      DisputesView,
  fraud:         FraudRiskView,
  revenue:       RevenueView,
  payments:      PaymentsView,
  payouts:       PayoutsView,
  refunds:       RefundsView,
  marketplace:   MarketplaceAnalyticsView,
  performance:   PerformanceView,
  reports:       ReportsView,
  notifications: NotificationsView,
  'admin-users': AdminUsersView,
  settings:      SettingsView,
  audit:         AuditLogsView,
};

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const Sidebar = ({ activeTab, setActiveTab, collapsed, onToggle }) => (
  <aside
    className="relative flex flex-col h-full transition-all duration-300 ease-in-out select-none flex-shrink-0 bg-white dark:bg-[#0f1629] border-r border-slate-200 dark:border-indigo-500/12 shadow-sm"
    style={{
      width: collapsed ? '64px' : '220px',
      minWidth: collapsed ? '64px' : '220px',
    }}
  >
    {/* Logo Header — Clickable to route back to Overview */}
    <button
      type="button"
      onClick={() => setActiveTab('overview')}
      className="flex items-center gap-2.5 px-3.5 py-4 overflow-hidden border-b border-slate-200 dark:border-slate-800/60 text-left w-full hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer"
      title="WorkWay Admin Overview"
    >
      <div className="flex-shrink-0 group-hover:scale-105 transition-transform drop-shadow-md">
        <WorkWaySvgLogo width={36} height={36} className="rounded-xl shadow-lg shadow-blue-500/20" />
      </div>
      {!collapsed && (
        <div className="overflow-hidden whitespace-nowrap">
          <p className="font-heading font-extrabold text-sm text-slate-900 dark:text-white tracking-wide leading-none group-hover:text-violet-600 dark:group-hover:text-sky-300 transition-colors">WORKWAY</p>
          <p className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold tracking-widest mt-0.5">ADMIN SUITE</p>
        </div>
      )}
    </button>

    {/* Navigation */}
    <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 scrollbar-none">
      {NAV_GROUPS.map((group, gi) => (
        <div key={gi} className="mb-1">
          {group.heading && !collapsed && (
            <p className="px-4 pt-3 pb-1 text-[9px] font-bold tracking-[0.15em] text-slate-400 dark:text-slate-500 uppercase">
              {group.heading}
            </p>
          )}
          {group.heading && collapsed && (
            <div className="mx-3 my-2 border-t border-slate-200 dark:border-slate-800/60" />
          )}

          {group.items.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={collapsed ? item.label : undefined}
                className={`
                  relative w-full flex items-center gap-3 mx-0 px-3 py-2 mb-0.5 text-[13px] font-medium
                  transition-all duration-150 group overflow-hidden text-left
                  ${active
                    ? 'bg-violet-100 dark:bg-violet-600/20 text-violet-800 dark:text-violet-300 border-r-4 border-violet-600 dark:border-violet-500 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 border-r-4 border-transparent'
                  }
                `}
                style={{ paddingLeft: collapsed ? '20px' : '12px' }}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-violet-600 dark:bg-violet-400" />
                )}
                <item.icon
                  className={`w-4 h-4 flex-shrink-0 transition-colors ${active ? 'text-violet-600 dark:text-violet-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'}`}
                />
                {!collapsed && <span className="truncate">{item.label}</span>}

                {/* Tooltip for collapsed sidebar */}
                {collapsed && (
                  <span className="
                    absolute left-full ml-3 px-2.5 py-1 rounded-lg
                    bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-semibold whitespace-nowrap
                    opacity-0 group-hover:opacity-100 pointer-events-none
                    transition-opacity duration-150 z-50 shadow-xl border border-slate-200 dark:border-slate-700
                  ">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </nav>

    {/* Collapse Toggle */}
    <div className="p-3 border-t border-slate-200 dark:border-slate-800/60">
      <button
        onClick={onToggle}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="flex items-center justify-center w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-150 text-xs font-semibold gap-2"
      >
        {collapsed
          ? <ChevronRight className="w-4 h-4" />
          : (<><ChevronLeft className="w-4 h-4" /><span>Collapse</span></>)
        }
      </button>
    </div>
  </aside>
);

// ─── Main Admin Dashboard Shell ───────────────────────────────────────────────
export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [collapsed, setCollapsed] = useState(false);

  const ActiveView = VIEW_MAP[activeTab] || OverviewView;

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-[#F6F8FC] dark:bg-[#05091a] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
      />

      {/* Main scrollable content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#F6F8FC] dark:bg-[#05091a] transition-colors duration-200">
        <div className="p-4 sm:p-6 max-w-7xl mx-auto">
          <ActiveView setActiveTab={setActiveTab} />
        </div>
      </main>
    </div>
  );
};
