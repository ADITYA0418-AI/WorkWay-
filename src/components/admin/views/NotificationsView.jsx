import React, { useState } from 'react';
import { 
  Bell, 
  Send, 
  Smartphone, 
  Users, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Radio, 
  History
} from 'lucide-react';

export const NotificationsView = () => {
  const [title, setTitle] = useState('⚡ Monsoon Surge Alert: 1.25x Earnings Active');
  const [message, setMessage] = useState('High demand for verified Electricians and Plumbers in East Bangalore. Log online now to receive instant emergency leads!');
  const [targetAudience, setTargetAudience] = useState('all_providers'); // all_users, all_providers, all_customers, active_zone
  const [urgency, setUrgency] = useState('important');
  const [channel, setChannel] = useState('push');
  const [toastNotice, setToastNotice] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const [history, setHistory] = useState([
    {
      id: 'BC-101',
      title: '⚡ Monsoon Surge Alert: 1.25x Earnings Active',
      target: 'All Verified Providers (360 Pros)',
      sentAt: '24 Aug 2026, 08:00 AM',
      reach: '354 Delivered (98%)',
      openRate: '72%'
    },
    {
      id: 'BC-102',
      title: '🛠️ Scheduled System Maintenance at 2:00 AM',
      target: 'All Platform Users (1,840 Accounts)',
      sentAt: '22 Aug 2026, 09:30 PM',
      reach: '1,812 Delivered (98%)',
      openRate: '45%'
    },
    {
      id: 'BC-103',
      title: '🎉 Flat ₹150 OFF on First AC Deep Cleaning',
      target: 'Customers in Bangalore Central',
      sentAt: '20 Aug 2026, 11:00 AM',
      reach: '940 Delivered (96%)',
      openRate: '61%'
    }
  ]);

  const handleSendNotification = (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      const newEntry = {
        id: 'BC-' + Math.floor(100 + Math.random() * 900),
        title,
        target: targetAudience === 'all_providers' ? 'All Providers' : targetAudience === 'all_customers' ? 'All Customers' : 'All Users',
        sentAt: 'Just now',
        reach: 'Broadcasting Live...',
        openRate: '0%'
      };
      setHistory([newEntry, ...history]);
      setToastNotice('🚀 Broadcast Push Notification Sent to All Target Devices!');
      setTimeout(() => setToastNotice(null), 4000);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notice */}
      {toastNotice && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 shadow-2xl shadow-emerald-500/20 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span className="text-xs font-semibold">{toastNotice}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full bg-violet-500/15 text-violet-700 dark:text-violet-300 border border-violet-500/30 text-[10px] font-bold uppercase">
            SYSTEM & ENGAGEMENT
          </span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Broadcast Push Notification Center
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Dispatch instant emergency alerts, demand surges, discount promotions & platform notices.
        </p>
      </div>

      {/* Builder & Live Mockup Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Broadcast Form */}
        <form onSubmit={handleSendNotification} className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Radio className="w-5 h-5 text-indigo-500 dark:text-indigo-400 animate-pulse" />
            <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">Compose Global Notification</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] mb-1">
                Notification Headline / Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., ⚡ Emergency Alert or Special Discount"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] mb-1">
                Message Body
              </label>
              <textarea
                rows="3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Compose message text for push notification payload..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] mb-1">
                  Target Audience Segment
                </label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-indigo-500"
                >
                  <option value="all_providers">All Service Providers (Tradespeople)</option>
                  <option value="all_customers">All Registered Customers</option>
                  <option value="all_users">Global Broadcast (All App Users)</option>
                  <option value="active_zone">Pros in High-Demand Surge Zones</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] mb-1">
                  Delivery Channel
                </label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-indigo-500"
                >
                  <option value="push">Mobile Push Notification (FCM / APNs)</option>
                  <option value="in_app">In-App Banner Alert</option>
                  <option value="sms">SMS Text Alert (Twilio)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSending}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-violet-500/25 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSending ? 'Transmitting Push...' : 'Send Push Notification'}</span>
            </button>
          </div>
        </form>

        {/* Live Phone Screen Preview */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center space-y-3 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">
            Live Device Preview
          </span>

          {/* Smartphone Mockup */}
          <div className="w-64 rounded-3xl bg-slate-100 dark:bg-slate-950 border-4 border-slate-300 dark:border-slate-800 p-4 space-y-4 shadow-2xl relative">
            <div className="w-20 h-4 bg-slate-300 dark:bg-slate-800 rounded-full mx-auto" />
            <div className="text-center text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              Friday, 24 Aug
            </div>

            {/* Notification Banner */}
            <div className="p-3 rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-violet-300 dark:border-violet-500/40 text-left space-y-1 shadow-lg">
              <div className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5 font-bold text-violet-600 dark:text-violet-400">
                  <Zap className="w-3 h-3 text-violet-500 dark:text-violet-400" />
                  <span>WORKWAY</span>
                </div>
                <span className="text-slate-400 dark:text-slate-500">now</span>
              </div>
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{title || 'Notification Title'}</p>
              <p className="text-[10px] text-slate-600 dark:text-slate-300 line-clamp-3 leading-snug">{message || 'Message preview text goes here...'}</p>
            </div>

            <div className="h-16" />
          </div>
        </div>
      </div>

      {/* Broadcast History Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">Broadcast History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase text-slate-500 font-bold">
              <tr>
                <th className="pb-3">Broadcast ID</th>
                <th className="pb-3">Title & Content</th>
                <th className="pb-3">Target Audience</th>
                <th className="pb-3">Sent Timestamp</th>
                <th className="pb-3">Delivery Reach</th>
                <th className="pb-3 text-right">Open Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {history.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="py-3 font-mono font-bold text-violet-600 dark:text-violet-400">{h.id}</td>
                  <td className="py-3 font-semibold text-slate-900 dark:text-white max-w-xs truncate">{h.title}</td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">{h.target}</td>
                  <td className="py-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">{h.sentAt}</td>
                  <td className="py-3 text-emerald-600 dark:text-emerald-400 font-medium">{h.reach}</td>
                  <td className="py-3 text-right font-bold text-slate-900 dark:text-white">{h.openRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
