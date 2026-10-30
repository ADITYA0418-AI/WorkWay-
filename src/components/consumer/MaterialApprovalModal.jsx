import React from 'react';
import { Modal } from '../common/Modal';
import { useBooking } from '../../context/BookingContext';
import { Package, Check, X, ShieldAlert } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

export const MaterialApprovalModal = ({ isOpen, onClose, booking }) => {
  const { approveMaterialRequest } = useBooking();

  if (!booking || !booking.materialsRequested?.length) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Approve Material Cost Request">
      <div className="space-y-4">
        
        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-sky-400 shrink-0" />
          <span>
            Provider requested additional materials for <strong>{booking.serviceTitle}</strong>. Costs will be added to the invoice upon your approval.
          </span>
        </div>

        <div className="space-y-2">
          {booking.materialsRequested.map((mat) => (
            <div
              key={mat.id}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">{mat.name}</span>
                  <span className="text-xs text-sky-400 font-bold">{formatCurrency(mat.cost)}</span>
                </div>
              </div>

              {mat.approved ? (
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Approved</span>
                </span>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => approveMaterialRequest(booking.id, mat.id, false)}
                    className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-medium"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => approveMaterialRequest(booking.id, mat.id, true)}
                    className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center space-x-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Done
          </button>
        </div>

      </div>
    </Modal>
  );
};
