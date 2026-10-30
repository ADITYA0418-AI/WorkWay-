import React, { useState } from 'react';
import { 
  UserCog, 
  Shield, 
  Key, 
  CheckCircle2, 
  Edit2, 
  Trash2, 
  Plus, 
  X, 
  Lock, 
  Eye, 
  EyeOff
} from 'lucide-react';

export const AdminUsersView = () => {
  const [toastNotice, setToastNotice] = useState(null);
  const [showAddModal, setShowAddModal] = useState(null);

  const [admins, setAdmins] = useState([
    {
      id: 'adm-001',
      name: 'Vaibhavi Sardeshmukh',
      email: 'vaibhavi@workway.app',
      role: 'super_admin',
      permissions: ['all'],
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      status: 'active',
      lastLogin: 'Today, 10:14 AM',
      mfa: true
    },
    {
      id: 'adm-002',
      name: 'Arjun Kapoor',
      email: 'arjun.ops@workway.app',
      role: 'ops_manager',
      permissions: ['bookings', 'providers', 'disputes'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      status: 'active',
      lastLogin: 'Today, 09:52 AM',
      mfa: true
    },
    {
      id: 'adm-003',
      name: 'Sneha Patel',
      email: 'sneha.support@workway.app',
      role: 'support_agent',
      permissions: ['bookings', 'disputes', 'refunds'],
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      status: 'active',
      lastLogin: 'Yesterday, 06:20 PM',
      mfa: false
    },
    {
      id: 'adm-004',
      name: 'Rohit Verma',
      email: 'rohit.finance@workway.app',
      role: 'finance_analyst',
      permissions: ['revenue', 'payments', 'payouts', 'refunds'],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      status: 'active',
      lastLogin: '2 days ago',
      mfa: true
    }
  ]);

  const ROLE_MAP = {
    super_admin:    { label: 'Super Admin',     color: 'text-rose-700 dark:text-rose-300', bg: 'bg-rose-500/15', border: 'border-rose-500/30' },
    ops_manager:    { label: 'Ops Manager',     color: 'text-indigo-700 dark:text-indigo-300', bg: 'bg-indigo-500/15', border: 'border-indigo-500/30' },
    support_agent:  { label: 'Support Agent',   color: 'text-sky-700 dark:text-sky-300', bg: 'bg-sky-500/15', border: 'border-sky-500/30' },
    finance_analyst:{ label: 'Finance Analyst', color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30' }
  };

  const handleDeactivate = (id) => {
    setAdmins(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'active' ? 'inactive' : 'active' } : a));
    setToastNotice(`Admin account toggled successfully.`);
    setTimeout(() => setToastNotice(null), 3000);
  };

  const permissionLabels = {
    all: 'Full Platform Access',
    bookings: 'Bookings',
    providers: 'Providers',
    disputes: 'Disputes',
    refunds: 'Refunds',
    revenue: 'Revenue',
    payments: 'Payments',
    payouts: 'Payouts'
  };

  return (
    <div className="space-y-6 pb-12">
      {toastNotice && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 shadow-2xl shadow-emerald-500/20 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span className="text-xs font-semibold">{toastNotice}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 text-[10px] font-bold uppercase">
            SYSTEM
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Admin Team & Role Management</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Manage internal admin roles, granular module permissions and MFA enforcement.</p>
        </div>
        <button
          onClick={() => setToastNotice('Invite admin modal — coming soon!')}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Invite Admin User</span>
        </button>
      </div>

      {/* Admin Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {admins.map((admin) => {
          const roleInfo = ROLE_MAP[admin.role] || ROLE_MAP.support_agent;
          return (
            <div key={admin.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm">
              <div className="flex items-center gap-4">
                <img src={admin.avatar} alt={admin.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">{admin.name}</h3>
                    {admin.status !== 'active' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 font-bold">INACTIVE</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{admin.email}</p>
                  <span className={`inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${roleInfo.bg} ${roleInfo.color} ${roleInfo.border}`}>
                    {roleInfo.label}
                  </span>
                </div>
              </div>

              {/* Permissions */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">Module Access Permissions</span>
                <div className="flex flex-wrap gap-1.5">
                  {admin.permissions.map((perm) => (
                    <span key={perm} className="px-2.5 py-0.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 font-semibold">
                      {permissionLabels[perm] || perm}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer row */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/70 text-xs">
                <div className="space-y-0.5">
                  <p className="text-slate-500">Last Login: <span className="text-slate-700 dark:text-slate-300 font-medium">{admin.lastLogin}</span></p>
                  <p className={`font-bold ${admin.mfa ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    {admin.mfa ? '🔐 MFA Enabled' : '⚠️ MFA Not Enrolled'}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  {!admin.mfa && (
                    <button
                      onClick={() => { setAdmins(prev => prev.map(a => a.id === admin.id ? { ...a, mfa: true } : a)); setToastNotice('MFA enforced on ' + admin.name); setTimeout(() => setToastNotice(null), 3000); }}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-bold text-xs transition-all"
                    >
                      Enforce MFA
                    </button>
                  )}
                  <button
                    onClick={() => handleDeactivate(admin.id)}
                    className={`px-2.5 py-1 rounded-lg font-bold text-xs border transition-all ${
                      admin.status === 'active'
                        ? 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-700 dark:text-rose-400 border-rose-500/30'
                        : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
                    }`}
                  >
                    {admin.status === 'active' ? 'Deactivate' : 'Re-activate'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
