import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { getStatusBadgeStyle, formatCurrency, formatDate } from '../../lib/utils';
import { MaterialApprovalModal } from '../../components/consumer/MaterialApprovalModal';
import { DigitalInvoiceModal } from '../../components/consumer/DigitalInvoiceModal';
import { SafetyCenterModal } from '../../components/consumer/SafetyCenterModal';
import { processPayment } from '../../lib/razorpay';
import { useAuth } from '../../context/AuthContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  MessageSquare, 
  FileText, 
  ShieldCheck, 
  Star, 
  Package, 
  CreditCard,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

export const ConsumerBookingsPage = ({ onOpenChat }) => {
  const { bookings, updateBookingStatus, submitReview, fileDispute } = useBooking();
  const { user } = useAuth();

  const [selectedBookingForInvoice, setSelectedBookingForInvoice] = useState(null);
  const [selectedBookingForMaterials, setSelectedBookingForMaterials] = useState(null);
  const [selectedBookingForSafety, setSelectedBookingForSafety] = useState(null);

  const [disputeBookingId, setDisputeBookingId] = useState(null);
  const [disputeReason, setDisputeReason] = useState('');

  const [reviewBookingId, setReviewBookingId] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const handlePayNow = async (booking) => {
    await processPayment({
      amount: booking.totalAmount,
      bookingId: booking.bookingCode,
      description: `Payment for ${booking.serviceTitle}`,
      user,
      onSuccess: () => {
        updateBookingStatus(booking.id, 'completed');
        alert('Payment Captured Successfully!');
      },
      onFailure: (err) => {
        alert('Payment failed: ' + err.description);
      }
    });
  };

  const handleReviewSubmit = (e, booking) => {
    e.preventDefault();
    submitReview(booking.id, booking.providerId, {
      userName: user?.full_name || 'Rahul Sharma',
      overallRating: reviewRating,
      comment: reviewComment
    });
    setReviewBookingId(null);
    alert('Thank you for reviewing your provider!');
  };

  const handleDisputeSubmit = (e) => {
    e.preventDefault();
    if (!disputeReason.trim()) return;
    fileDispute(disputeBookingId, 'overcharging', disputeReason);
    setDisputeBookingId(null);
    setDisputeReason('');
    alert('Dispute submitted to WorkWay Admin support.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">Your Service Bookings</h1>
        <p className="text-xs text-slate-400">Track active technician status, approve material costs, view invoices & chat.</p>
      </div>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
            
            {/* Booking Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-sky-400">BOOKING #{b.bookingCode}</span>
                <h3 className="font-heading text-base font-bold text-white mt-0.5">{b.serviceTitle}</h3>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${getStatusBadgeStyle(b.bookingStatus)}`}>
                  {b.bookingStatus.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            {/* Provider & Address info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Technician</span>
                <span className="font-semibold text-slate-200 block mt-0.5">{b.providerName}</span>
                <span className="text-[11px] text-sky-400 capitalize">{b.providerTrade}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Scheduled Time</span>
                <span className="font-semibold text-slate-200 block mt-0.5">{b.scheduledTime} ({formatDate(b.scheduledDate)})</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Amount</span>
                <span className="font-bold text-white text-sm block mt-0.5">{formatCurrency(b.totalAmount)}</span>
              </div>
            </div>

            {/* Material cost request notification if any */}
            {b.materialsRequested?.length > 0 && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-300">
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-amber-400" />
                  <span>Provider requested ₹{b.materialsCost} for materials.</span>
                </div>
                <button
                  onClick={() => setSelectedBookingForMaterials(b)}
                  className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  Review Materials
                </button>
              </div>
            )}

            {/* Action Bar Buttons */}
            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={onOpenChat}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                  <span>Chat & Masked Call</span>
                </button>

                <button
                  onClick={() => setSelectedBookingForSafety(b)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Safety</span>
                </button>

                <button
                  onClick={() => setSelectedBookingForInvoice(b)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  <span>Invoice</span>
                </button>
              </div>

              {/* Status Specific Action */}
              <div>
                {b.bookingStatus === 'completed' && !b.hasReviewed && (
                  <button
                    onClick={() => setReviewBookingId(b.id)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-1"
                  >
                    <Star className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Rate & Review</span>
                  </button>
                )}

                {(b.bookingStatus === 'in_progress' || b.bookingStatus === 'on_the_way') && (
                  <button
                    onClick={() => handlePayNow(b)}
                    className="px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs flex items-center space-x-1.5 shadow-lg shadow-[#0F766E]/20"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Pay ₹{b.totalAmount}</span>
                  </button>
                )}
              </div>

            </div>

            {/* Inline Review Form */}
            {reviewBookingId === b.id && (
              <form onSubmit={(e) => handleReviewSubmit(e, b)} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white">Rate your experience with {b.providerName}</h4>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1"
                    >
                      <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} />
                    </button>
                  ))}
                </div>
                <textarea
                  rows={2}
                  placeholder="Write your feedback..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
                <button type="submit" className="px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold">
                  Submit Review
                </button>
              </form>
            )}

          </div>
        ))}
      </div>

      <DigitalInvoiceModal
        isOpen={!!selectedBookingForInvoice}
        onClose={() => setSelectedBookingForInvoice(null)}
        booking={selectedBookingForInvoice}
      />

      <MaterialApprovalModal
        isOpen={!!selectedBookingForMaterials}
        onClose={() => setSelectedBookingForMaterials(null)}
        booking={selectedBookingForMaterials}
      />

      <SafetyCenterModal
        isOpen={!!selectedBookingForSafety}
        onClose={() => setSelectedBookingForSafety(null)}
        booking={selectedBookingForSafety}
      />

    </div>
  );
};
