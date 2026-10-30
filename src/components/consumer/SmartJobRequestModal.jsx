import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useLocation } from '../../context/LocationContext';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Clock, MapPin, IndianRupee, AlertTriangle, CheckCircle } from 'lucide-react';
import { FormConsentCheckbox } from '../common/FormConsentCheckbox';

export const SmartJobRequestModal = ({ isOpen, onClose, selectedProvider }) => {
  const { coords } = useLocation();
  const { createBooking } = useBooking();
  const { user } = useAuth();

  const [category, setCategory] = useState(selectedProvider?.trade || 'electrician');
  const [serviceTitle, setServiceTitle] = useState(selectedProvider?.tradeLabel || 'Electrical Inspection & Repair');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('today');
  const [scheduledDate, setScheduledDate] = useState(new Date().toISOString().split('T')[0]);
  const [scheduledTime, setScheduledTime] = useState('05:00 PM');
  const [estimatedBudget, setEstimatedBudget] = useState(selectedProvider?.hourlyRate || 500);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!consentAccepted) {
      setConsentError(true);
      return;
    }

    const bookingData = {
      consumerId: user?.id || 'c-1',
      consumerName: user?.full_name || user?.name || 'Rahul Sharma',
      consumerPhone: user?.phone || '+91 98765 43210',
      providerId: selectedProvider?.id || 'p-101',
      providerName: selectedProvider?.name || 'Rohan Mehta',
      providerTrade: category,
      serviceTitle,
      problemDescription: description,
      urgency,
      addressLine: coords.addressLine,
      latitude: coords.lat,
      longitude: coords.lng,
      scheduledDate,
      scheduledTime,
      estimatedLabour: Number(estimatedBudget),
      materialsCost: 0,
      platformFee: 49,
      totalAmount: Number(estimatedBudget) + 49
    };

    createBooking(bookingData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Book Service ${selectedProvider ? `with ${selectedProvider.name}` : ''}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Service Title */}
        <div>
          <label htmlFor="job-service-title" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 cursor-pointer">
            Service Requested
          </label>
          <input
            type="text"
            id="job-service-title"
            name="serviceTitle"
            required
            value={serviceTitle}
            onChange={(e) => setServiceTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500 font-semibold"
          />
        </div>

        {/* Urgency Selection Tags */}
        <div>
          <label id="job-urgency-label" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Urgency Level
          </label>
          <div role="radiogroup" aria-labelledby="job-urgency-label" className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'emergency_asap', label: 'ASAP Emergency', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
              { id: 'today', label: 'Today', color: 'bg-orange-500/20 text-orange-300 border-orange-500/40' },
              { id: 'this_week', label: 'This Week', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
              { id: 'flexible', label: 'Flexible', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
            ].map((u) => (
              <button
                key={u.id}
                type="button"
                role="radio"
                aria-checked={urgency === u.id}
                onClick={() => setUrgency(u.id)}
                className={`py-2 px-2 rounded-xl border text-xs font-bold transition-all text-center focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none ${
                  urgency === u.id
                    ? `${u.color} ring-2 ring-sky-400`
                    : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {u.label}
              </button>
            ))}
          </div>
        </div>

        {/* Problem Description */}
        <div>
          <label htmlFor="job-description" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 cursor-pointer">
            Problem Description
          </label>
          <textarea
            id="job-description"
            name="description"
            rows={2}
            placeholder="Provide any relevant details for the provider..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500"
          />
        </div>

        {/* Date, Time & Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label htmlFor="job-scheduled-date" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 cursor-pointer">
              Date
            </label>
            <input
              type="date"
              id="job-scheduled-date"
              name="scheduledDate"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500"
            />
          </div>

          <div>
            <label htmlFor="job-scheduled-time" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 cursor-pointer">
              Time
            </label>
            <input
              type="text"
              id="job-scheduled-time"
              name="scheduledTime"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500"
            />
          </div>

          <div>
            <label htmlFor="job-estimated-budget" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 cursor-pointer">
              Est. Labour (₹)
            </label>
            <input
              type="number"
              id="job-estimated-budget"
              name="estimatedBudget"
              value={estimatedBudget}
              onChange={(e) => setEstimatedBudget(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500 font-bold"
            />
          </div>
        </div>

        {/* Address summary */}
        <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 text-xs flex items-center space-x-2 text-slate-300">
          <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
          <span className="truncate">{coords.addressLine}</span>
        </div>

        {/* Pricing Summary */}
        <div className="pt-2 border-t border-slate-800 text-xs space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>Estimated Labour</span>
            <span>₹{estimatedBudget}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Platform Service Fee</span>
            <span>₹49</span>
          </div>
          <div className="flex justify-between font-bold text-white text-sm pt-1 border-t border-slate-800">
            <span>Total Estimated Cost</span>
            <span className="text-sky-400">₹{Number(estimatedBudget) + 49}</span>
          </div>
        </div>

        <FormConsentCheckbox
          id="job-request-consent"
          type="job_booking"
          checked={consentAccepted}
          onChange={(checked) => {
            setConsentAccepted(checked);
            if (checked) setConsentError(false);
          }}
          hasError={consentError}
          errorMessage="Please accept the terms and refund policy to book."
          className="pt-2"
        />

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-sm shadow-lg shadow-[#0F766E]/20 transition-all"
        >
          Confirm & Send Request
        </button>

      </form>
    </Modal>
  );
};
