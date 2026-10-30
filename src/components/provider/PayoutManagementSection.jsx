import React, { useState } from 'react';
import { formatCurrency } from '../../lib/utils';
import { 
  Wallet, 
  Building2, 
  Smartphone, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  History, 
  CreditCard, 
  AlertCircle, 
  X, 
  Zap, 
  Lock, 
  ExternalLink,
  Plus
} from 'lucide-react';

export const PayoutManagementSection = () => {
  const [availableBalance, setAvailableBalance] = useState(35250);
  const [pendingBalance, setPendingBalance] = useState(3200);
  const [lastPayout, setLastPayout] = useState({ amount: 12400, date: '16 Aug' });
  const [nextPayout, setNextPayout] = useState('Tomorrow, 06:00 AM (Auto-Sweep)');
  
  const [linkedAccounts, setLinkedAccounts] = useState({
    bank: {
      bankName: 'HDFC Bank Ltd',
      accountNumber: '•••• •••• 4092',
      ifsc: 'HDFC0001234',
      holderName: 'Rohan Mehta',
      isDefault: true,
      verified: true
    },
    upi: {
      vpa: 'rohan.mehta@oksbi',
      holderName: 'Rohan Mehta',
      isDefault: false,
      verified: true
    }
  });

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(availableBalance.toString());
  const [selectedMethod, setSelectedMethod] = useState('bank'); // 'bank' | 'upi'
  const [isProcessing, setIsProcessing] = useState(false);
  const [payoutSuccessMsg, setPayoutSuccessMsg] = useState(null);

  const handleExecuteWithdrawal = (e) => {
    e.preventDefault();
    const amount = Number(withdrawAmount);
    if (!amount || amount <= 0 || amount > availableBalance) {
      alert('Please enter a valid withdrawal amount.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setAvailableBalance(prev => prev - amount);
      setLastPayout({
        amount,
        date: 'Today, Just now'
      });
      setIsWithdrawModalOpen(false);
      setPayoutSuccessMsg(`₹${amount.toLocaleString('en-IN')} transferred successfully to your ${selectedMethod === 'bank' ? 'HDFC Bank Account' : 'UPI ID (' + linkedAccounts.upi.vpa + ')'} via IMPS! Ref: WW-PAY-${Math.floor(100000 + Math.random() * 900000)}`);
      setTimeout(() => setPayoutSuccessMsg(null), 6000);
    }, 1200);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
      
      {/* Toast Message */}
      {payoutSuccessMsg && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
            <span>{payoutSuccessMsg}</span>
          </div>
          <button onClick={() => setPayoutSuccessMsg(null)} className="text-white/80 hover:text-white ml-3">
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Wallet className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
              💰 Payouts & Settlement
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              Instant IMPS Active
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage your daily earned funds, initiate on-demand withdrawals, or configure automated bank auto-sweeps.
          </p>
        </div>
      </div>

      {/* Main 4-Card Balances & Payout Timeline Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Available Balance Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-emerald-500/10 via-white dark:via-slate-900 to-emerald-500/5 dark:to-slate-900 border border-emerald-500/40 shadow-sm space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Available Balance</span>
            <Wallet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <span className="text-[11px] text-slate-600 dark:text-slate-300 block">Available for withdrawal:</span>
            <span className="font-heading text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5 block">
              {formatCurrency(availableBalance)}
            </span>
          </div>
          <button
            onClick={() => {
              setWithdrawAmount(availableBalance.toString());
              setIsWithdrawModalOpen(true);
            }}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-1.5 transition-all hover:scale-[1.02]"
          >
            <span>Withdraw →</span>
          </button>
        </div>

        {/* Pending Balance Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">Pending Balance</span>
            <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Escrow Clearance:</span>
            <span className="font-heading text-3xl font-black text-amber-600 dark:text-amber-400 tracking-tight mt-0.5 block">
              {formatCurrency(pendingBalance)}
            </span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 text-[10px] text-slate-600 dark:text-slate-400 flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Releases immediately once customer OTP is verified</span>
          </div>
        </div>

        {/* Last Payout Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Last Payout</span>
            <History className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Processed Transfer:</span>
            <span className="font-heading text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5 block">
              {formatCurrency(lastPayout.amount)}
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Settled on {lastPayout.date}</span>
            </span>
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono pt-1">
            IMPS Ref: WW-9482-TXN
          </div>
        </div>

        {/* Next Scheduled Payout Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400">Next Payout</span>
            <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Automatic Payout:</span>
            <span className="font-heading text-lg font-bold text-purple-700 dark:text-purple-300 tracking-tight mt-0.5 block">
              {nextPayout}
            </span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 text-[10px] text-slate-600 dark:text-slate-400 flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5 text-purple-500 shrink-0" />
            <span>Zero transfer fees on auto-sweeps</span>
          </div>
        </div>

      </div>

      {/* Linked Accounts Section: Bank Account & UPI */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="font-heading text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Linked Settlement Accounts
          </h4>
          <span className="text-xs text-slate-500 dark:text-slate-400">2 Accounts Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Bank Account */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="p-3 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="space-y-0.5 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-heading text-sm font-bold text-slate-900 dark:text-white">Bank Account</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                    Primary Verified
                  </span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 font-medium">{linkedAccounts.bank.bankName}</p>
                <p className="text-slate-500 dark:text-slate-400 font-mono">Account: {linkedAccounts.bank.accountNumber}</p>
                <p className="text-[10px] text-slate-500">IFSC: {linkedAccounts.bank.ifsc} • Name: {linkedAccounts.bank.holderName}</p>
              </div>
            </div>
            
            <button
              onClick={() => alert('Account verified & locked for your security. Contact support to update bank details.')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 text-xs"
            >
              <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            </button>
          </div>

          {/* UPI Account */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="space-y-0.5 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-heading text-sm font-bold text-slate-900 dark:text-white">UPI Account</span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20 text-[10px] font-bold">
                    Instant IMPS
                  </span>
                </div>
                <p className="text-purple-700 dark:text-purple-300 font-mono font-bold">{linkedAccounts.upi.vpa}</p>
                <p className="text-slate-600 dark:text-slate-400">Linked to: {linkedAccounts.upi.holderName}</p>
                <p className="text-[10px] text-slate-500">Supports GPay, PhonePe, Paytm & BHIM</p>
              </div>
            </div>

            <button
              onClick={() => alert('UPI account active and ready for instant withdrawals.')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 text-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </button>
          </div>

        </div>
      </div>

      {/* Withdrawal Modal */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden shadow-2xl p-6 space-y-5 animate-in zoom-in-95">
            
            <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">Instant Payout Withdrawal</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Direct transfer to your verified account</p>
                </div>
              </div>
              <button
                onClick={() => setIsWithdrawModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteWithdrawal} className="space-y-4">
              
              {/* Available Balance Info */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Available for withdrawal:</span>
                <strong className="text-emerald-600 dark:text-emerald-400 font-heading text-base font-bold">
                  {formatCurrency(availableBalance)}
                </strong>
              </div>

              {/* Amount Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Enter Amount (₹)</span>
                  <button
                    type="button"
                    onClick={() => setWithdrawAmount(availableBalance.toString())}
                    className="text-[11px] text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    Withdraw Full Balance
                  </button>
                </label>
                <input
                  type="number"
                  min="100"
                  max={availableBalance}
                  required
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Enter amount in ₹"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-heading text-lg font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Select Payout Destination */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Select Destination</label>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('bank')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      selectedMethod === 'bank'
                        ? 'bg-sky-50 dark:bg-sky-500/10 border-sky-500 text-sky-900 dark:text-white font-bold'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-sky-600 dark:text-sky-400 mb-1" />
                    <span>HDFC Bank</span>
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-mono">•••• 4092</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod('upi')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      selectedMethod === 'upi'
                        ? 'bg-purple-50 dark:bg-purple-500/10 border-purple-500 text-purple-900 dark:text-white font-bold'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-purple-600 dark:text-purple-400 mb-1" />
                    <span>Instant UPI</span>
                    <span className="block text-[10px] text-purple-600 dark:text-purple-400 font-mono truncate">{linkedAccounts.upi.vpa}</span>
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Zero transaction fee • Payout processed via IMPS in &lt; 60 seconds.</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-2xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs shadow-xl shadow-[#0F766E]/30 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
              >
                {isProcessing ? (
                  <span>Processing IMPS Transfer...</span>
                ) : (
                  <>
                    <span>Confirm Withdrawal of {formatCurrency(Number(withdrawAmount) || 0)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
