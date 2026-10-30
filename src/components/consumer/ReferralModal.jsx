import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Gift, Copy, Check, Share2 } from 'lucide-react';

export const ReferralModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const referralCode = 'WORKWAY-RAHUL-99';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Referral Rewards & Credit Program">
      <div className="space-y-5 text-center">
        
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center mx-auto shadow-xl shadow-sky-500/20">
          <Gift className="w-8 h-8 text-white animate-bounce" />
        </div>

        <div>
          <h3 className="font-heading text-lg font-bold text-white">
            Give ₹250, Get ₹250 WorkWay Credit
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
            Invite your friends, neighbours or family to WorkWay. When they complete their first booking, both of you earn ₹250 in service credit!
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Your Unique Referral Code</span>
            <span className="font-mono text-base font-bold text-sky-400">{referralCode}</span>
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-sky-600/20 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-800/60 text-slate-300">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Referrals</span>
            <span className="font-bold text-lg text-white">4 Friends</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/60 text-slate-300">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Credits Earned</span>
            <span className="font-bold text-lg text-emerald-400">₹1,000</span>
          </div>
        </div>

      </div>
    </Modal>
  );
};
