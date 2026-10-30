import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { IncomingLeadsSection } from '../../components/provider/IncomingLeadsSection';

export const ProviderLeadsPage = () => {
  const { updateBookingStatus } = useBooking();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">Hyperlocal Job Leads & Inbox</h1>
        <p className="text-xs text-slate-400">Review, accept, or decline incoming leads in your service radius in real time.</p>
      </div>

      <IncomingLeadsSection 
        onLeadAccepted={(lead) => {
          // Additional custom hook handling if needed
        }}
      />
    </div>
  );
};

