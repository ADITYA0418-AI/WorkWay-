import React from 'react';
import { ShieldAlert, Zap, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const EmergencyModeBanner = ({ onTriggerEmergency }) => {
  const { providers } = useBooking();
  const availableProviders = providers.filter(p => p.dutyStatus === 'available');

  return (
    <div className="rounded-2xl bg-gradient-to-r from-rose-950/80 via-slate-900 to-rose-950/80 border border-rose-500/40 p-5 shadow-2xl relative overflow-hidden my-6">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start space-x-3">
          <div className="p-3 rounded-2xl bg-rose-600/20 border border-rose-500/40 text-rose-400 shrink-0">
            <ShieldAlert className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                EMERGENCY SERVICE MODE
              </span>
              <span className="text-xs text-rose-400 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Fastest Arrival: 12 mins
              </span>
            </div>
            <h3 className="font-heading text-lg font-bold text-white mt-1">
              Urgent Water Leak, Electrical Outage or Lockout?
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {availableProviders.length} Master Pro verified technicians available within 3 km right now.
            </p>
          </div>
        </div>

        <button
          onClick={onTriggerEmergency}
          className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 flex items-center justify-center space-x-2 transition-all hover:scale-105"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Dispatch Nearest Emergency Tech</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
