import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../lib/utils';
import { 
  Inbox, 
  MapPin, 
  Clock, 
  Star, 
  DollarSign, 
  Check, 
  X, 
  Info, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  XCircle,
  ExternalLink,
  Flame,
  AlertCircle
} from 'lucide-react';

export const INITIAL_LEADS = [
  {
    id: 'lead-881',
    title: 'Kitchen Electrical Repair & MCB Check',
    category: 'electrician',
    distance: '2.1 km away',
    approxArea: 'Indiranagar 100ft Road',
    estimatedPrice: '₹800 – ₹1,200 estimated',
    minPrice: 800,
    maxPrice: 1200,
    timing: 'Today, 6:30 PM',
    urgency: 'urgent_today',
    customerName: 'Rahul Sharma',
    customerRating: 4.8,
    customerBookingsCount: 14,
    description: 'Main kitchen switchboard sparks whenever heavy appliances run simultaneously. Needs circuit isolation and 32A MCB testing.',
    materialsNeeded: ['Fire-resistant PVC tape', '32A Double Pole MCB (if faulty)']
  },
  {
    id: 'lead-882',
    title: 'Water Heater Geyser Power Point Fitting',
    category: 'electrician',
    distance: '1.4 km away',
    approxArea: 'Koramangala 4th Block',
    estimatedPrice: '₹600 – ₹900 estimated',
    minPrice: 600,
    maxPrice: 900,
    timing: 'Today, 7:45 PM',
    urgency: 'evening',
    customerName: 'Priya Narayanan',
    customerRating: 5.0,
    customerBookingsCount: 8,
    description: 'New 25L storage geyser installed in master bath. Need heavy 16A anchor socket with earthing verification.',
    materialsNeeded: ['16A Anchor Modular Switch & Socket', '4 sq mm copper wire (2m)']
  }
];

export const IncomingLeadsSection = ({ onLeadAccepted }) => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [stats, setStats] = useState({
    received: 12,
    accepted: 8,
    declined: 4
  });
  const [selectedLeadModal, setSelectedLeadModal] = useState(null);
  const [notificationToast, setNotificationToast] = useState(null);

  const handleAcceptLead = (lead) => {
    setLeads(prev => prev.filter(l => l.id !== lead.id));
    setStats(prev => ({ ...prev, accepted: prev.accepted + 1 }));
    setNotificationToast(`Lead "${lead.title}" accepted! Added to Active Jobs.`);
    setTimeout(() => setNotificationToast(null), 4000);
    if (onLeadAccepted) onLeadAccepted(lead);
  };

  const handleDeclineLead = (lead) => {
    setLeads(prev => prev.filter(l => l.id !== lead.id));
    setStats(prev => ({ ...prev, declined: prev.declined + 1 }));
    setNotificationToast(`Lead declined. Re-routed to nearest available pro.`);
    setTimeout(() => setNotificationToast(null), 3000);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
      
      {/* Toast Notification */}
      {notificationToast && (
        <div className="p-3 rounded-2xl bg-sky-600/90 text-white text-xs font-bold shadow-xl border border-sky-400 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>{notificationToast}</span>
          </div>
          <button onClick={() => setNotificationToast(null)} className="text-white/80 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Header & Weekly Performance Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Inbox className="w-5 h-5" />
            </div>
            <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
              Incoming Job Leads
            </h2>
            {leads.length > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30 text-xs font-bold animate-pulse">
                {leads.length} New Incoming
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time hyperlocal service requests from verified nearby customers.
          </p>
        </div>

        {/* Weekly Stats Summary Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="px-3 py-2 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center space-x-2">
            <Inbox className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <div>
              <span className="text-[10px] text-slate-500 block font-bold uppercase leading-none">This Week</span>
              <strong className="text-slate-900 dark:text-white font-bold">{stats.received} leads received</strong>
            </div>
          </div>

          <div className="px-3 py-2 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <div>
              <span className="text-[10px] text-slate-500 block font-bold uppercase leading-none">Accepted</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{stats.accepted} accepted</strong>
            </div>
          </div>

          <div className="px-3 py-2 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center space-x-2">
            <XCircle className="w-4 h-4 text-slate-400" />
            <div>
              <span className="text-[10px] text-slate-500 block font-bold uppercase leading-none">Declined</span>
              <strong className="text-slate-600 dark:text-slate-400 font-bold">{stats.declined} declined</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Leads List */}
      {leads.length === 0 ? (
        <div className="text-center py-10 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 space-y-2">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto opacity-80" />
          <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">Lead Inbox is All Caught Up</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            You have reviewed all incoming job leads. Keep your Duty status <strong>ON DUTY</strong> to receive the next lead immediately.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-sky-500/30 hover:border-sky-500/60 transition-all shadow-sm space-y-4 relative overflow-hidden group"
            >
              {/* Subtle glowing indicator badge */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Lead Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-sky-500/20 to-blue-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/30 text-xs font-bold flex items-center space-x-1.5">
                    <Zap className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 fill-sky-400" />
                    <span>NEW JOB LEAD</span>
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Posted just now
                  </span>
                </div>

                <div className="flex items-center space-x-1 text-xs text-amber-600 dark:text-amber-400 font-bold bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 dark:text-amber-400" />
                  <span>Customer rating: {lead.customerRating}</span>
                  <span className="text-slate-500 font-normal text-[10px]">({lead.customerBookingsCount} hires)</span>
                </div>
              </div>

              {/* Lead Title & Description */}
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                  {lead.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed line-clamp-2">
                  {lead.description}
                </p>
              </div>

              {/* Metrics Grid: Distance, Estimated Value, Timing */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs">
                
                {/* Distance */}
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Distance</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{lead.distance}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">{lead.approxArea}</span>
                  </div>
                </div>

                {/* Estimated Value */}
                <div className="flex items-start space-x-2">
                  <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Estimated Earnings</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">{lead.estimatedPrice}</span>
                    <span className="text-[10px] text-emerald-600/80 dark:text-emerald-500/80 block font-medium">Guaranteed direct payout</span>
                  </div>
                </div>

                {/* Timing */}
                <div className="flex items-start space-x-2">
                  <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Preferred Time</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{lead.timing}</span>
                    <span className="text-[10px] text-purple-600 dark:text-purple-400 block font-medium">Customer is at location</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons: Accept, Decline, View Details */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span>Exact flat number unlocked upon acceptance</span>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedLeadModal(lead)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-transparent text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <span>View Details</span>
                  </button>

                  <button
                    onClick={() => handleDeclineLead(lead)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/60 hover:text-[#E11D48] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-transparent text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-[#E11D48]" />
                    <span>Decline</span>
                  </button>

                  <button
                    onClick={() => handleAcceptLead(lead)}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold shadow-lg shadow-[#0F766E]/30 flex items-center justify-center space-x-1.5 transition-all hover:scale-105"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Accept Lead</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Lead Details Modal */}
      {selectedLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden shadow-2xl p-6 space-y-5 animate-in zoom-in-95">
            
            <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400">LEAD ID #{selectedLeadModal.id.toUpperCase()}</span>
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  {selectedLeadModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLeadModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Customer</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{selectedLeadModal.customerName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Rating</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">⭐ {selectedLeadModal.customerRating} ({selectedLeadModal.customerBookingsCount} bookings)</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Approx Area:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedLeadModal.approxArea} ({selectedLeadModal.distance})</span>
              </div>
            </div>

            {/* Full Issue Description */}
            <div className="space-y-1.5 text-xs">
              <label className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Customer Reported Problem</label>
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 leading-relaxed">
                {selectedLeadModal.description}
              </div>
            </div>

            {/* Anticipated Materials */}
            {selectedLeadModal.materialsNeeded && (
              <div className="space-y-1.5 text-xs">
                <label className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Potential Materials Required</label>
                <ul className="space-y-1">
                  {selectedLeadModal.materialsNeeded.map((mat, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pricing & Modal Actions */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Est. Payout</span>
                <span className="font-black text-emerald-600 dark:text-emerald-400 text-base">{selectedLeadModal.estimatedPrice}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    handleDeclineLead(selectedLeadModal);
                    setSelectedLeadModal(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-transparent"
                >
                  Decline
                </button>
                <button
                  onClick={() => {
                    handleAcceptLead(selectedLeadModal);
                    setSelectedLeadModal(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Accept Lead Now</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
