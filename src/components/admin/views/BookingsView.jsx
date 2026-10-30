import React, { useState } from 'react';
import { 
  CalendarDays, 
  Search, 
  Filter, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertCircle, 
  Eye, 
  MapPin, 
  User, 
  Phone, 
  DollarSign, 
  FileText,
  X
} from 'lucide-react';
import { useBooking } from '../../../context/BookingContext';
import { formatCurrency } from '../../../lib/utils';

export const BookingsView = () => {
  const { bookings, updateBookingStatus } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [actionNotice, setActionNotice] = useState(null);

  // Extend with realistic seed bookings if context has few
  const defaultBookings = [
    { id: 'WW-9021', bookingCode: 'WW-9021', consumerName: 'Priya Mehta', providerName: 'Ramesh K.', trade: 'electrician', serviceName: 'Emergency MCB Trip & Wiring', bookingStatus: 'completed', estimatedAmount: 1800, paymentStatus: 'paid', date: 'Today, 09:30 AM', address: 'Indiranagar 12th Main, Bangalore' },
    { id: 'WW-9020', bookingCode: 'WW-9020', consumerName: 'Arjun Patil', providerName: 'Suresh D.', trade: 'plumber', serviceName: 'Kitchen Sink & Drain Fix', bookingStatus: 'in_progress', estimatedAmount: 950, paymentStatus: 'escrowed', date: 'Today, 10:15 AM', address: 'Koramangala 4th Block, Bangalore' },
    { id: 'WW-9019', bookingCode: 'WW-9019', consumerName: 'Sneha Joshi', providerName: 'Mohan R.', trade: 'electrician', serviceName: 'AC Power Point Installation', bookingStatus: 'completed', estimatedAmount: 2400, paymentStatus: 'paid', date: 'Yesterday, 04:00 PM', address: 'HSR Layout Sector 2, Bangalore' },
    { id: 'WW-9018', bookingCode: 'WW-9018', consumerName: 'Rahul Singh', providerName: 'Unassigned (Broadcast)', trade: 'carpenter', serviceName: 'Door Frame & Lock Replacement', bookingStatus: 'pending', estimatedAmount: 1200, paymentStatus: 'pending', date: 'Today, 11:00 AM', address: 'Whitefield Palm Meadows, Bangalore' },
    { id: 'WW-9017', bookingCode: 'WW-9017', consumerName: 'Kavita Sharma', providerName: 'Dilip W.', trade: 'carpenter', serviceName: 'Modular Kitchen Hinge Repair', bookingStatus: 'in_progress', estimatedAmount: 1350, paymentStatus: 'escrowed', date: 'Today, 08:45 AM', address: 'Jayanagar 9th Block, Bangalore' },
    { id: 'WW-9016', bookingCode: 'WW-9016', consumerName: 'Amit Desai', providerName: 'Ganesh B.', trade: 'housemaid', serviceName: 'Full 3BHK Deep Cleaning', bookingStatus: 'completed', estimatedAmount: 3200, paymentStatus: 'paid', date: '2 days ago', address: 'Prestige Lakeside Habitat, Bangalore' },
    { id: 'WW-9015', bookingCode: 'WW-9015', consumerName: 'Pooja Nair', providerName: 'N/A', trade: 'handyman', serviceName: 'Curtain Rods & Geyser Mount', bookingStatus: 'cancelled', estimatedAmount: 800, paymentStatus: 'refunded', date: '3 days ago', address: 'Malleshwaram 15th Cross, Bangalore' },
    { id: 'WW-8291', bookingCode: 'WW-8291', consumerName: 'Rahul Sharma', providerName: 'Rohan Mehta', trade: 'electrician', serviceName: 'Main Board Sparking / Emergency', bookingStatus: 'in_progress', estimatedAmount: 1450, paymentStatus: 'escrowed', date: 'Today, 07:15 AM', address: 'Brigade Millennium, Bangalore' }
  ];

  const allBookings = bookings && bookings.length > 0 ? bookings : defaultBookings;

  const filteredBookings = allBookings.filter(b => {
    const code = b.bookingCode || b.id || '';
    const customer = b.consumerName || b.customer || '';
    const provider = b.providerName || b.provider || '';
    const service = b.serviceName || b.service || b.trade || '';
    const matchesSearch = code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const status = b.bookingStatus || b.status || 'pending';
    const matchesStatus = statusFilter === 'all' ? true : status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (bookingId, newStatus) => {
    if (updateBookingStatus) {
      updateBookingStatus(bookingId, newStatus);
    }
    setActionNotice(`Booking ${bookingId} status updated to: ${newStatus.toUpperCase()}`);
    setTimeout(() => setActionNotice(null), 3000);
    if (selectedBooking && (selectedBooking.id === bookingId || selectedBooking.bookingCode === bookingId)) {
      setSelectedBooking({ ...selectedBooking, bookingStatus: newStatus });
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"><CheckCircle2 className="w-3 h-3" /> Completed</span>;
      case 'in_progress':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30"><Clock className="w-3 h-3 animate-spin" /> In Progress</span>;
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"><AlertCircle className="w-3 h-3" /> Pending</span>;
      case 'cancelled':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30"><XCircle className="w-3 h-3" /> Cancelled</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 capitalize">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notice */}
      {actionNotice && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 shadow-2xl shadow-emerald-500/20 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span className="text-xs font-semibold">{actionNotice}</span>
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
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Bookings Dispatch & Management</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Live booking activity, status overrides, escrow inspection & assignment controls.</p>
        </div>

        {/* Status Counters */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm">
            Total: <span className="text-slate-900 dark:text-white font-extrabold">{filteredBookings.length}</span>
          </span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Booking ID, Client, Pro..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Status Tab Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['all', 'pending', 'in_progress', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-900'
              }`}
            >
              {st === 'all' ? 'All Bookings' : st.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Interactive Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
              <tr>
                <th className="px-5 py-3.5">Booking ID</th>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Provider</th>
                <th className="px-5 py-3.5">Service Category</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredBookings.map((b) => {
                const id = b.bookingCode || b.id;
                const customer = b.consumerName || b.customer || 'Rahul Sharma';
                const provider = b.providerName || b.provider || 'Rohan Mehta';
                const service = b.serviceName || b.service || b.trade || 'General Repair';
                const amount = b.estimatedAmount || b.amount || 1200;
                const status = b.bookingStatus || b.status || 'pending';

                return (
                  <tr key={id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {id}
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                      {customer}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300 font-medium">
                      {provider}
                    </td>
                    <td className="px-5 py-4">
                      <span className="capitalize text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px]">
                        {service}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(amount)}
                    </td>
                    <td className="px-5 py-4">
                      {getStatusBadge(status)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-700 flex items-center gap-1 transition-all"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </button>
                        {status !== 'completed' && (
                          <button
                            onClick={() => handleStatusChange(id, 'completed')}
                            className="px-2 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 font-semibold text-xs transition-all"
                            title="Mark Completed"
                          >
                            ✓
                          </button>
                        )}
                        {status !== 'cancelled' && (
                          <button
                            onClick={() => handleStatusChange(id, 'cancelled')}
                            className="px-2 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-700 dark:text-rose-400 border border-rose-500/30 font-semibold text-xs transition-all"
                            title="Cancel Booking"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Booking Details</span>
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  #{selectedBooking.bookingCode || selectedBooking.id}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedBooking(null)}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Customer</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">{selectedBooking.consumerName || selectedBooking.customer || 'Rahul Sharma'}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Provider Assigned</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">{selectedBooking.providerName || selectedBooking.provider || 'Rohan Mehta'}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Service</span>
                  <p className="text-slate-700 dark:text-slate-300 mt-0.5 capitalize">{selectedBooking.serviceName || selectedBooking.trade}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Amount & Escrow</span>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{formatCurrency(selectedBooking.estimatedAmount || 1200)}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold uppercase text-[10px]">Address & Coordinates</span>
                <p className="text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
                  {selectedBooking.address || 'MG Road / Koramangala Hub, Bangalore'}
                </p>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Current Status</span>
                <div>{getStatusBadge(selectedBooking.bookingStatus || selectedBooking.status)}</div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  handleStatusChange(selectedBooking.id || selectedBooking.bookingCode, 'completed');
                  setSelectedBooking(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20"
              >
                Mark Completed
              </button>
              <button
                onClick={() => {
                  handleStatusChange(selectedBooking.id || selectedBooking.bookingCode, 'cancelled');
                  setSelectedBooking(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-700 dark:text-rose-300 border border-rose-500/40 font-bold text-xs"
              >
                Cancel & Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
