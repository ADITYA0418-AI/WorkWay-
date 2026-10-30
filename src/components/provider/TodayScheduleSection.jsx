import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../lib/utils';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Navigation, 
  MessageSquare, 
  CheckCircle2, 
  Circle, 
  Play, 
  ArrowRight, 
  Check, 
  DollarSign, 
  ExternalLink, 
  ShieldCheck, 
  X, 
  Compass, 
  AlertCircle 
} from 'lucide-react';

export const INITIAL_TODAY_SCHEDULE = [
  {
    id: 'sched-1',
    time: '09:00 AM',
    title: 'Kitchen Wiring & MCB Upgrade',
    category: 'electrician',
    customerName: 'Meera Deshmukh',
    customerPhone: '+91 98765 44332',
    location: 'Flat 402, Green Valley Apartments, Indiranagar',
    distance: '0.4 km away',
    price: '₹1,800',
    priceValue: 1800,
    status: 'completed', // completed, in_progress, upcoming
    notes: 'Installed heavy-duty 32A MCB box and concealed conduit wire.'
  },
  {
    id: 'sched-2',
    time: '01:30 PM',
    title: 'AC Installation & High-Load Point',
    category: 'electrician',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    location: 'Tower B, Prestige Ozone, Koramangala',
    distance: '2.4 km away',
    price: '₹2,500',
    priceValue: 2500,
    status: 'in_progress',
    notes: '2-ton split AC dedicated outdoor wiring + 16A socket.'
  },
  {
    id: 'sched-3',
    time: '06:00 PM',
    title: 'Electrical Repair & Inverter Diagnostic',
    category: 'electrician',
    customerName: 'Ananya K.',
    customerPhone: '+91 98765 11223',
    location: 'Embassy Golf Links Business Park, Domlur',
    distance: '1.1 km away',
    price: '₹900 – ₹1,200',
    priceValue: 1050,
    status: 'upcoming',
    notes: 'Frequent tripping on inverter backup mode.'
  }
];

export const TodayScheduleSection = ({ onOpenChat }) => {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState(INITIAL_TODAY_SCHEDULE);
  const [navigationTarget, setNavigationTarget] = useState(null);
  const [callingCustomer, setCallingCustomer] = useState(null);

  const handleUpdateStatus = (id, newStatus) => {
    setSchedule(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Calendar className="w-5 h-5" />
            </div>
            <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
              📅 Today's Schedule
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              3 Bookings Today
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time daily schedule with instant customer contact, GPS navigation, and lifecycle controls.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            <span className="text-slate-500 font-bold block text-[10px] uppercase">Est. Day Earnings</span>
            <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">₹5,200 – ₹5,500</span>
          </div>
        </div>
      </div>

      {/* Schedule Timeline List */}
      <div className="space-y-4">
        {schedule.map((item, idx) => {
          const isCompleted = item.status === 'completed';
          const isInProgress = item.status === 'in_progress';
          const isUpcoming = item.status === 'upcoming';

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all ${
                isInProgress
                  ? 'bg-white dark:bg-slate-900/90 border-sky-500/60 ring-2 ring-sky-500/20 shadow-md'
                  : isCompleted
                  ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 opacity-90'
                  : 'bg-white dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Left: Time, Indicator & Job Info */}
                <div className="flex items-start space-x-4">
                  
                  {/* Time Badge with Status Indicator */}
                  <div className="flex flex-col items-center min-w-[76px]">
                    <span className="font-heading text-sm font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {item.time}
                    </span>
                    
                    <div className="mt-1 flex items-center justify-center">
                      {isCompleted && (
                        <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-bold text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Done</span>
                        </div>
                      )}
                      {isInProgress && (
                        <div className="flex items-center space-x-1.5 text-sky-600 dark:text-sky-400 font-bold text-xs bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/30">
                          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                          <span>Active</span>
                        </div>
                      )}
                      {isUpcoming && (
                        <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400 font-medium text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                          <Circle className="w-3 h-3" />
                          <span>Pending</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Vertical Divider */}
                  <div className="w-[1px] h-14 bg-slate-200 dark:bg-slate-800 self-center hidden sm:block"></div>

                  {/* Title & Customer Location */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold border border-slate-200 dark:border-transparent">
                        {item.price}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 dark:text-slate-300">
                      <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                        <span>{item.location}</span>
                      </span>
                      <span className="text-slate-400 dark:text-slate-500">•</span>
                      <span className="text-sky-600 dark:text-sky-400 font-semibold">{item.distance}</span>
                      <span className="text-slate-400 dark:text-slate-500">•</span>
                      <span className="text-slate-500 dark:text-slate-400">Customer: <strong className="text-slate-900 dark:text-white">{item.customerName}</strong></span>
                    </div>

                    {item.notes && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-0.5">
                        "{item.notes}"
                      </p>
                    )}
                  </div>

                </div>

                {/* Right: Interactive Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 self-end lg:self-auto">
                  
                  {/* Start Job / Status Transition Buttons */}
                  {isUpcoming && (
                    <button
                      onClick={() => handleUpdateStatus(item.id, 'in_progress')}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-sky-600/25 flex items-center space-x-1.5 transition-all hover:scale-105"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Start Job →</span>
                    </button>
                  )}

                  {isInProgress && (
                    <button
                      onClick={() => handleUpdateStatus(item.id, 'completed')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 flex items-center space-x-1.5 transition-all hover:scale-105"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Complete Job ✓</span>
                    </button>
                  )}

                  {isCompleted && (
                    <button
                      onClick={() => alert(`Invoice #INV-${item.id.toUpperCase()} (₹${item.priceValue}) generated and credited to your WorkWay wallet.`)}
                      className="px-3 py-2 rounded-xl bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 font-semibold text-xs border border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-slate-700 transition-colors flex items-center space-x-1"
                    >
                      <span>Invoice Paid</span>
                    </button>
                  )}

                  {/* Navigate Button */}
                  <button
                    onClick={() => setNavigationTarget(item)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-semibold text-xs border border-slate-200 dark:border-slate-700 flex items-center space-x-1.5 transition-colors"
                    title="Get turn-by-turn navigation"
                  >
                    <Navigation className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    <span>Navigate →</span>
                  </button>

                  {/* Contact Customer Button */}
                  <button
                    onClick={() => setCallingCustomer(item)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-semibold text-xs border border-slate-200 dark:border-slate-700 flex items-center space-x-1.5 transition-colors"
                    title="Call or message customer"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Contact Customer →</span>
                  </button>

                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* GPS Navigation Modal */}
      {navigationTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 space-y-4 p-6">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2.5 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  <Compass className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">Live GPS Route</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Destination: {navigationTarget.location}</p>
                </div>
              </div>
              <button
                onClick={() => setNavigationTarget(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Route Stats Banner */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500 font-bold text-[10px] uppercase block">Estimated Arrival</span>
                <span className="font-heading text-lg font-bold text-emerald-600 dark:text-emerald-400">8 mins (Fastest route)</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 font-bold text-[10px] uppercase block">Distance</span>
                <span className="font-bold text-slate-900 dark:text-white">{navigationTarget.distance}</span>
              </div>
            </div>

            {/* Turn-by-Turn Steps */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start space-x-3">
                <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-700 dark:text-sky-400 font-bold text-[10px]">1</span>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Head north on 100 Feet Rd toward Indiranagar</p>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">800 m</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start space-x-3">
                <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-700 dark:text-sky-400 font-bold text-[10px]">2</span>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Turn right at Sony Signal onto Koramangala 80ft Rd</p>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">1.4 km</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start space-x-3">
                <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold text-[10px]">3</span>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Arrive at {navigationTarget.location}</p>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Gate security entry code: <strong className="text-slate-900 dark:text-white">#4402</strong></span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <button
                onClick={() => {
                  window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(navigationTarget.location)}`, '_blank');
                  setNavigationTarget(null);
                }}
                className="flex-1 px-4 py-3 rounded-2xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold shadow-lg shadow-[#0F766E]/30 flex items-center justify-center space-x-2 transition-all"
              >
                <span>Launch in Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Customer Contact Prompt Modal */}
      {callingCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-sm overflow-hidden shadow-2xl p-6 text-center space-y-4 animate-in zoom-in-95">
            
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <Phone className="w-8 h-8 animate-bounce" />
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                Contact {callingCustomer.customerName}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Connected via WorkWay Masked Call Protection
              </p>
              <p className="text-sm font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-2">
                {callingCustomer.customerPhone}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center space-x-2 text-left">
              <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
              <span>Your personal number is masked to protect provider privacy.</span>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  alert(`Calling ${callingCustomer.customerName} (${callingCustomer.customerPhone})...`);
                  setCallingCustomer(null);
                }}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now (Masked Call)</span>
              </button>

              <button
                onClick={() => {
                  setCallingCustomer(null);
                  if (onOpenChat) onOpenChat();
                }}
                className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-transparent font-bold text-xs flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Send Chat Message</span>
              </button>

              <button
                onClick={() => setCallingCustomer(null)}
                className="w-full py-2 text-slate-500 hover:text-slate-800 dark:hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
