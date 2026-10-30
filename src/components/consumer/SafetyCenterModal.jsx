import React from 'react';
import { Modal } from '../common/Modal';
import { ShieldCheck, Share2, PhoneCall, Headphones, AlertTriangle, XCircle } from 'lucide-react';

export const SafetyCenterModal = ({ isOpen, onClose, booking }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="WorkWay Safety & Protection Center">
      <div className="space-y-4">
        
        {/* Protection Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-500/10 to-blue-500/10 border border-sky-500/30">
          <div className="flex items-center space-x-2 text-xs font-bold text-sky-400 mb-1">
            <ShieldCheck className="w-5 h-5 text-sky-400" />
            <span>Active Booking Safety Guarantee</span>
          </div>
          <p className="text-xs text-slate-300">
            Booking #{booking?.bookingCode || 'WW-8291'} • Provider is Level 3 Master Pro Verified with background check clearance.
          </p>
        </div>

        {/* Safety Actions List */}
        <div className="space-y-2">
          
          <button
            onClick={() => alert('Live booking link copied to clipboard! Share with family or friends.')}
            className="w-full p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left flex items-center justify-between text-xs text-white transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold block">Share Trip / Booking Status</span>
                <span className="text-slate-400 text-[11px]">Send live location and provider details to trusted contact</span>
              </div>
            </div>
          </button>

          <button
            onClick={() => alert('Calling Emergency Contact (+91 98765 00000)...')}
            className="w-full p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left flex items-center justify-between text-xs text-white transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold block text-rose-300">Call Emergency SOS Contact</span>
                <span className="text-slate-400 text-[11px]">Immediate local emergency contact dialer</span>
              </div>
            </div>
          </button>

          <button
            onClick={() => alert('WorkWay Safety Hotline: 1800-WORKWAY-HELP')}
            className="w-full p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left flex items-center justify-between text-xs text-white transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold block">Contact WorkWay Safety Desk</span>
                <span className="text-slate-400 text-[11px]">24/7 dedicated customer care hotline</span>
              </div>
            </div>
          </button>

        </div>

      </div>
    </Modal>
  );
};
