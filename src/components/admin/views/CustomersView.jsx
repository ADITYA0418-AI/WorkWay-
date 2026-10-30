import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  DollarSign, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Ban, 
  Mail, 
  Phone, 
  Eye, 
  X,
  Sparkles
} from 'lucide-react';
import { formatCurrency } from '../../../lib/utils';

export const CustomersView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [toastNotice, setToastNotice] = useState(null);

  const [customers, setCustomers] = useState([
    {
      id: 'c-201',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '+91 98201 54321',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      location: 'Prestige Lakeview, Flat 402, Bangalore',
      totalBookings: 14,
      totalSpend: 18450,
      status: 'active', // active, flagged, suspended
      joinedDate: '12 Jan 2026',
      lastBookingDate: 'Yesterday, 04:30 PM',
      riskScore: 'Low (0.01)'
    },
    {
      id: 'c-202',
      name: 'Priya Mehta',
      email: 'priya.mehta@example.com',
      phone: '+91 98202 65432',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      location: 'Sobha Lavender, Indiranagar, Bangalore',
      totalBookings: 8,
      totalSpend: 9800,
      status: 'active',
      joinedDate: '03 Feb 2026',
      lastBookingDate: 'Today, 09:30 AM',
      riskScore: 'Low (0.02)'
    },
    {
      id: 'c-203',
      name: 'Arjun Patil',
      email: 'arjun.patil@example.com',
      phone: '+91 98203 76543',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      location: 'Godrej Woodsman, Hebbal, Bangalore',
      totalBookings: 22,
      totalSpend: 34200,
      status: 'active',
      joinedDate: '28 Nov 2025',
      lastBookingDate: 'Today, 10:15 AM',
      riskScore: 'Low (0.00)'
    },
    {
      id: 'c-204',
      name: 'Karan Malhotra',
      email: 'karan.m@example.com',
      phone: '+91 98204 87654',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      location: 'Palm Meadows, Whitefield, Bangalore',
      totalBookings: 3,
      totalSpend: 3100,
      status: 'flagged',
      joinedDate: '15 Jul 2026',
      lastBookingDate: '3 days ago',
      riskScore: 'Medium (0.45)'
    },
    {
      id: 'c-205',
      name: 'Ananya Reddy',
      email: 'ananya.reddy@example.com',
      phone: '+91 98205 98765',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      location: 'Brigade Gateway, Malleshwaram, Bangalore',
      totalBookings: 19,
      totalSpend: 26800,
      status: 'active',
      joinedDate: '10 Oct 2025',
      lastBookingDate: '4 days ago',
      riskScore: 'Low (0.01)'
    },
    {
      id: 'c-206',
      name: 'Rajat Verma',
      email: 'rajat.v@example.com',
      phone: '+91 98206 09876',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
      location: 'Bhartiya City, Thanisandra, Bangalore',
      totalBookings: 2,
      totalSpend: 1500,
      status: 'suspended',
      joinedDate: '01 Aug 2026',
      lastBookingDate: '10 days ago',
      riskScore: 'High (0.89)'
    }
  ]);

  const handleToggleStatus = (customerId, currentStatus) => {
    const nextStatus = currentStatus === 'suspended' ? 'active' : 'suspended';
    setCustomers(prev =>
      prev.map(c => c.id === customerId ? { ...c, status: nextStatus } : c)
    );
    setToastNotice(`Customer ${customerId} status updated to ${nextStatus.toUpperCase()}`);
    setTimeout(() => setToastNotice(null), 3000);
    if (selectedCustomer && selectedCustomer.id === customerId) {
      setSelectedCustomer({ ...selectedCustomer, status: nextStatus });
    }
  };

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' ? true : c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notice */}
      {toastNotice && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 shadow-2xl shadow-emerald-500/20 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span className="text-xs font-semibold">{toastNotice}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30 text-[10px] font-bold uppercase">
              OPERATIONS
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Registered Customers & Homeowners
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Consumer directory, lifetime booking metrics, gross spend & account health.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm">
            Active Accounts: <span className="text-slate-900 dark:text-white font-extrabold">{customers.filter(c => c.status === 'active').length}</span>
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client name, email, society..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['all', 'active', 'flagged', 'suspended'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap capitalize transition-all ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-900'
              }`}
            >
              {st === 'all' ? 'All Customers' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Customers Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
              <tr>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Contact Details</th>
                <th className="px-5 py-3.5">Society / Address</th>
                <th className="px-5 py-3.5">Total Bookings</th>
                <th className="px-5 py-3.5">Total Spend</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={c.avatar} 
                        alt={c.name} 
                        className="w-9 h-9 rounded-xl object-cover border border-slate-200 dark:border-slate-700" 
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-xs">{c.name}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">ID: {c.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 space-y-0.5">
                    <p className="text-slate-700 dark:text-slate-300 font-medium">{c.email}</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{c.phone}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
                      <span className="truncate max-w-[200px]">{c.location}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-bold text-slate-900 dark:text-white px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      {c.totalBookings} Bookings
                    </span>
                  </td>
                  <td className="px-5 py-4 font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    {formatCurrency(c.totalSpend)}
                  </td>
                  <td className="px-5 py-4">
                    {c.status === 'active' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    ) : c.status === 'flagged' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                        <AlertTriangle className="w-3 h-3" /> Flagged
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                        <Ban className="w-3 h-3" /> Suspended
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedCustomer(c)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-700 flex items-center gap-1 transition-all"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => handleToggleStatus(c.id, c.status)}
                        className={`px-2 py-1 rounded-lg text-xs font-bold border transition-all ${
                          c.status === 'suspended'
                            ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25'
                            : 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/25'
                        }`}
                        title={c.status === 'suspended' ? 'Re-activate Account' : 'Suspend Account'}
                      >
                        {c.status === 'suspended' ? 'Activate' : 'Suspend'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedCustomer.avatar} 
                  alt={selectedCustomer.name} 
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700" 
                />
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">{selectedCustomer.name}</h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{selectedCustomer.email}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Total Bookings</span>
                  <p className="font-bold text-slate-900 dark:text-white text-base mt-0.5">{selectedCustomer.totalBookings} Orders</p>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Lifetime Spend</span>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 text-base mt-0.5">{formatCurrency(selectedCustomer.totalSpend)}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Member Since</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">{selectedCustomer.joinedDate}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Risk Score</span>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{selectedCustomer.riskScore}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold uppercase text-[10px]">Primary Delivery Address</span>
                <p className="text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
                  {selectedCustomer.location}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  handleToggleStatus(selectedCustomer.id, selectedCustomer.status);
                  setSelectedCustomer(null);
                }}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all ${
                  selectedCustomer.status === 'suspended'
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-rose-600 hover:bg-rose-500 text-white'
                }`}
              >
                {selectedCustomer.status === 'suspended' ? 'Re-activate Account' : 'Suspend Account'}
              </button>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
