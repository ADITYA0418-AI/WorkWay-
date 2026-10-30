import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { updateProviderStatus } from '../../lib/api';
import { formatCurrency } from '../../lib/utils';
import { TodayScheduleSection } from '../../components/provider/TodayScheduleSection';
import { IncomingLeadsSection } from '../../components/provider/IncomingLeadsSection';
import { 
  Power, 
  DollarSign, 
  Send, 
  CheckCircle2, 
  Star, 
  Clock, 
  TrendingUp, 
  Award,
  ArrowRight,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

export const ProviderDashboard = ({ onOpenChat }) => {
  const { user } = useAuth();
  const { providers, bookings, toggleProviderDuty, updateBookingStatus } = useBooking();
  const { socket, jobRequests } = useSocket();
  const navigate = useNavigate();

  const provider = providers.find(p => p.name === (user?.full_name || user?.name)) || providers[0];
  const isOnDuty = provider.dutyStatus === 'available';

  // Join provider WebSocket room on mount so real-time job alerts are received
  useEffect(() => {
    if (socket && provider?.id) {
      socket.emit('join_provider_room', provider.id);
    }
  }, [socket, provider?.id]);

  // Handle duty toggle: update local state + sync to backend
  const handleDutyToggle = async () => {
    const newStatus = isOnDuty ? 'offline' : 'available';
    toggleProviderDuty(provider.id, newStatus);
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          await updateProviderStatus({
            is_online: !isOnDuty,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        });
      } else {
        await updateProviderStatus({ is_online: !isOnDuty, lat: null, lng: null });
      }
    } catch (err) {
      console.warn('Backend duty status update failed:', err);
    }
  };

  const myBookings = bookings.filter(b => b.providerId === provider.id || b.providerName === provider.name);
  const activeJobs = myBookings.filter(b => b.bookingStatus !== 'completed' && b.bookingStatus !== 'cancelled');

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text pb-20 p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      
      {/* On Duty Header Toggle */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">Welcome back, {provider.name}</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold capitalize">
              {provider.tradeLabel || provider.trade}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Toggle your Duty status to receive hyperlocal job leads around your current location.
          </p>
        </div>

        <button
          onClick={handleDutyToggle}
          className={`px-6 py-3 rounded-2xl font-bold text-xs shadow-xl flex items-center space-x-2 transition-all hover:scale-105 ${
            isOnDuty
              ? 'bg-emerald-600 text-white shadow-emerald-600/30'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Power className="w-4 h-4" />
          <span>{isOnDuty ? 'ON DUTY (Receiving Leads)' : 'OFF DUTY (Offline)'}</span>
        </button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div 
          onClick={() => navigate('/provider/earnings')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-slate-900/90 cursor-pointer transition-all hover:scale-[1.02] group shadow-sm"
          title="Click to view Detailed Earnings Dashboard & Revenue Graph"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors font-medium">This Month Earnings</span>
            <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-heading text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
              {formatCurrency(38450)}
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold group-hover:underline">View Hub →</span>
          </div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-1">+14% vs last month</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Acceptance Rate</span>
            <TrendingUp className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          </div>
          <span className="font-heading text-xl font-bold text-slate-900 dark:text-white">{provider.acceptanceRatePercent || 99}%</span>
          <span className="text-[10px] text-sky-600 dark:text-sky-400 font-semibold block mt-1">High conversion</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Jobs Completed</span>
            <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <span className="font-heading text-xl font-bold text-slate-900 dark:text-white">{provider.jobsCompleted}</span>
          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold block mt-1">312 Total Lifetime</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Rating Score</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 dark:text-amber-400 dark:fill-amber-400" />
          </div>
          <span className="font-heading text-xl font-bold text-slate-900 dark:text-white">{provider.rating} ★</span>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold block mt-1">{provider.reviewCount} Reviews</span>
        </div>
      </div>

      {/* 📥 Incoming Leads Section */}
      <IncomingLeadsSection />

      {/* Active Jobs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            <span>Active Jobs ({activeJobs.length})</span>
          </h2>
          <button onClick={() => navigate('/provider/jobs')} className="text-xs text-sky-600 dark:text-sky-400 font-bold flex items-center gap-1 hover:underline">
            <span>Manage All Jobs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {activeJobs.map((b) => (
            <div key={b.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400">BOOKING #{b.bookingCode}</span>
                <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white mt-0.5">{b.serviceTitle}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Customer: {b.consumerName} • {b.addressLine}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigate('/provider/jobs')}
                  className="px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs shadow-lg shadow-[#0F766E]/20"
                >
                  Manage Job Lifecycle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 Today's Schedule Module */}
      <TodayScheduleSection onOpenChat={onOpenChat} />

      {/* Verification Level Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 dark:via-slate-900 to-amber-500/10 border border-amber-500/30 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Award className="w-8 h-8 text-amber-500 dark:text-amber-400 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Level 3 Master Pro Status</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">You have completed all verification steps including background check & insurance.</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/provider/verification')}
          className="px-4 py-2 rounded-xl bg-amber-100 dark:bg-slate-800 hover:bg-amber-200 dark:hover:bg-slate-700 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-transparent font-bold text-xs"
        >
          View Badge Progress
        </button>
      </div>

    </div>
  );
};
