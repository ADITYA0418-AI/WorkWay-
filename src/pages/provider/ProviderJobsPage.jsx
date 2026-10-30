import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { getStatusBadgeStyle, formatCurrency } from '../../lib/utils';
import { 
  Briefcase, 
  Play, 
  Navigation, 
  Package, 
  Camera, 
  CheckCircle, 
  MessageSquare,
  IndianRupee,
  Plus
} from 'lucide-react';

export const ProviderJobsPage = ({ onOpenChat }) => {
  const { bookings, updateBookingStatus, addMaterialRequest } = useBooking();

  const [selectedJobId, setSelectedJobId] = useState(null);
  const [materialName, setMaterialName] = useState('');
  const [materialCost, setMaterialCost] = useState('');

  const handleAddMaterial = (e, bookingId) => {
    e.preventDefault();
    if (!materialName.trim() || !materialCost) return;
    addMaterialRequest(bookingId, materialName, Number(materialCost));
    setMaterialName('');
    setMaterialCost('');
    setSelectedJobId(null);
    alert('Material cost request sent to customer for approval!');
  };

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text pb-20 p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">Active Jobs & Lifecycle</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Update job milestones, request material approvals, upload proof & complete work.</p>
      </div>

      <div className="space-y-4">
        {bookings.map((job) => (
          <div key={job.id} className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400">BOOKING #{job.bookingCode}</span>
                <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white mt-0.5">{job.serviceTitle}</h3>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${getStatusBadgeStyle(job.bookingStatus)}`}>
                {job.bookingStatus.replace(/_/g, ' ')}
              </span>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Customer</span>
                <span className="font-semibold text-slate-900 dark:text-white block mt-0.5">{job.consumerName}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">{job.consumerPhone}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Service Address</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200 block mt-0.5">{job.addressLine}</span>
              </div>
            </div>

            {/* Job Milestone Controls */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              
              {job.bookingStatus === 'accepted' && (
                <button
                  onClick={() => updateBookingStatus(job.id, 'on_the_way')}
                  className="px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs flex items-center space-x-1.5 shadow-lg shadow-[#0F766E]/20"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Start Travel (On The Way)</span>
                </button>
              )}

              {job.bookingStatus === 'on_the_way' && (
                <button
                  onClick={() => updateBookingStatus(job.id, 'in_progress')}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-lg shadow-purple-600/20"
                >
                  <Play className="w-4 h-4" />
                  <span>Arrived & Start Job</span>
                </button>
              )}

              {job.bookingStatus === 'in_progress' && (
                <button
                  onClick={() => updateBookingStatus(job.id, 'completed')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-lg shadow-emerald-600/20"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Mark Job Completed</span>
                </button>
              )}

              <button
                onClick={() => setSelectedJobId(selectedJobId === job.id ? null : job.id)}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center space-x-1.5"
              >
                <Package className="w-4 h-4 text-amber-500" />
                <span>Add Material Cost</span>
              </button>

              <button
                onClick={onOpenChat}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center space-x-1.5"
              >
                <MessageSquare className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Chat with Customer</span>
              </button>

            </div>

            {/* Material Request Form */}
            {selectedJobId === job.id && (
              <form onSubmit={(e) => handleAddMaterial(e, job.id)} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Request Material Cost Approval</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Item name (e.g. CPVC Pipe 1/2 inch)"
                    value={materialName}
                    onChange={(e) => setMaterialName(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400"
                  />
                  <input
                    type="number"
                    required
                    placeholder="Cost in ₹"
                    value={materialCost}
                    onChange={(e) => setMaterialCost(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400"
                  />
                </div>
                <button type="submit" className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs">
                  Send Material Approval Request
                </button>
              </form>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};
