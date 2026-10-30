import React from 'react';
import { Modal } from '../common/Modal';
import { formatCurrency, formatDate } from '../../lib/utils';
import { Printer, Download, Share2, Zap, CheckCircle2 } from 'lucide-react';

export const DigitalInvoiceModal = ({ isOpen, onClose, booking }) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const gstTax = Math.round(booking.estimatedLabour * 0.18);
  const finalTotal = booking.totalAmount + gstTax;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Official WorkWay Invoice" maxWidth="max-w-xl">
      <div id="printable-invoice" className="space-y-6 bg-slate-900 p-2 rounded-xl">
        
        {/* Invoice Top Brand Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#0F766E] flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-heading text-lg font-bold text-white tracking-wider block">WORKWAY</span>
              <span className="text-[9px] uppercase font-bold text-[#0284C7] tracking-widest">Tax Invoice</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-[#0284C7] block">INVOICE #{booking.bookingCode}</span>
            <span className="text-xs text-slate-400">{formatDate(booking.timestamps?.completed || booking.scheduledDate)}</span>
          </div>
        </div>

        {/* Consumer & Provider Info */}
        <div className="grid grid-cols-2 gap-4 text-xs p-3 rounded-xl bg-slate-950/60 border border-slate-800">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Billed To</span>
            <span className="font-bold text-white block mt-0.5">{booking.consumerName}</span>
            <span className="text-slate-400 block text-[11px]">{booking.addressLine}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Service Provider</span>
            <span className="font-bold text-white block mt-0.5">{booking.providerName}</span>
            <span className="text-[#0284C7] block text-[11px] capitalize">{booking.providerTrade}</span>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between font-bold uppercase text-[10px] text-slate-400 pb-1 border-b border-slate-800">
            <span>Description</span>
            <span>Amount</span>
          </div>

          <div className="flex justify-between text-slate-200 py-1">
            <span>Labour Charge ({booking.serviceTitle})</span>
            <span className="font-semibold">{formatCurrency(booking.estimatedLabour)}</span>
          </div>

          {booking.materialsCost > 0 && (
            <div className="flex justify-between text-slate-200 py-1">
              <span>Approved Materials</span>
              <span className="font-semibold">{formatCurrency(booking.materialsCost)}</span>
            </div>
          )}

          <div className="flex justify-between text-slate-200 py-1">
            <span>Platform Service Fee</span>
            <span className="font-semibold">{formatCurrency(booking.platformFee)}</span>
          </div>

          <div className="flex justify-between text-slate-400 py-1">
            <span>GST Tax (18%)</span>
            <span>{formatCurrency(gstTax)}</span>
          </div>

          <div className="flex justify-between font-heading font-bold text-sm text-white pt-2 border-t border-slate-800">
            <span>Total Paid</span>
            <span className="text-[#0284C7] font-extrabold">{formatCurrency(finalTotal)}</span>
          </div>
        </div>

        {/* Payment Status Badge */}
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">Payment Complete</span>
          </div>
          <span className="text-[11px] text-slate-300">Razorpay / UPI</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center space-x-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-lg shadow-[#0F766E]/20"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>

      </div>
    </Modal>
  );
};
