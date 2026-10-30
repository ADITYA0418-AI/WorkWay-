import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from '../../context/LocationContext';
import { ReferralModal } from '../../components/consumer/ReferralModal';
import { User, MapPin, Gift, Heart, Shield, Bell, LogOut, Plus } from 'lucide-react';

export const ConsumerProfilePage = () => {
  const { user, logout } = useAuth();
  const { savedAddresses, addSavedAddress } = useLocation();

  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const [newLabel, setNewLabel] = useState('Home');
  const [newAddressLine, setNewAddressLine] = useState('');

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddressLine.trim()) return;
    addSavedAddress({
      label: newLabel,
      addressLine: newAddressLine,
      lat: 12.9716,
      lng: 77.5946
    });
    setNewAddressLine('');
    alert('Address saved!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      
      {/* Profile Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-[#0F766E] flex items-center justify-center text-white text-2xl font-bold">
            {user?.full_name?.charAt(0) || user?.name?.charAt(0) || 'R'}
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold text-white">{user?.full_name || user?.name || 'Rahul Sharma'}</h1>
            <p className="text-xs text-slate-400">{user?.email || 'consumer@workway.app'}</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#0284C7]/15 border border-[#0284C7]/30 text-[#0284C7] text-[10px] font-bold">
              Consumer Account
            </span>
          </div>
        </div>

        <button
          onClick={logout}
          className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Reward Credits & Referral Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0F766E] to-[#115E59] border border-teal-400/40 flex items-center justify-between text-white shadow-xl shadow-[#0F766E]/20">
        <div className="flex items-center space-x-3">
          <Gift className="w-8 h-8 text-white shrink-0" />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider block opacity-90">WorkWay Rewards Balance</span>
            <span className="font-heading text-2xl font-extrabold">₹1,000</span>
          </div>
        </div>

        <button
          onClick={() => setIsReferralOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-white text-[#0F766E] font-bold text-xs shadow-md transition-transform hover:scale-105"
        >
          Invite Friends
        </button>
      </div>

      {/* Saved Addresses Section */}
      <div className="space-y-3">
        <h2 className="font-heading text-base font-bold text-white flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-[#0284C7]" />
          <span>Saved Delivery & Service Addresses</span>
        </h2>

        <div className="space-y-2">
          {savedAddresses.map((addr) => (
            <div key={addr.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">{addr.label}</span>
                <span className="text-xs text-slate-400">{addr.addressLine}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Address Form */}
        <form onSubmit={handleAddAddress} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-slate-300">Add New Saved Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <select
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
            >
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              required
              placeholder="Full street address..."
              value={newAddressLine}
              onChange={(e) => setNewAddressLine(e.target.value)}
              className="sm:col-span-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
            />
          </div>
          <button type="submit" className="px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold">
            Save Address
          </button>
        </form>
      </div>

      <ReferralModal isOpen={isReferralOpen} onClose={() => setIsReferralOpen(false)} />

    </div>
  );
};
