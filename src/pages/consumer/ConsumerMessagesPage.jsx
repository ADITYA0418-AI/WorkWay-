import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { MessageSquare, PhoneCall, ShieldCheck, Zap } from 'lucide-react';

export const ConsumerMessagesPage = ({ onOpenChat }) => {
  const { bookings } = useBooking();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">Active Service Messages</h1>
        <p className="text-xs text-slate-400">Encrypted real-time messaging and masked phone communication with technician.</p>
      </div>

      <div className="space-y-3">
        {bookings.map((b) => (
          <div
            key={b.id}
            onClick={onOpenChat}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 cursor-pointer flex items-center justify-between transition-all group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F766E]/20 text-[#0F766E] dark:text-teal-400 flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
                  {b.providerName}
                </h3>
                <p className="text-xs text-slate-400">
                  Booking #{b.bookingCode} • {b.serviceTitle}
                </p>
              </div>
            </div>

            <button className="px-3 py-1.5 rounded-xl bg-slate-800 group-hover:bg-[#0F766E] text-xs font-semibold text-white transition-colors">
              Open Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
