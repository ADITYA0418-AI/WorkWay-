import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { X, Send, Image, PhoneCall, ShieldCheck, Zap } from 'lucide-react';

export const ChatDrawer = ({ isOpen, onClose }) => {
  const { activeBooking, messages, sendMessage } = useBooking();
  const { user } = useAuth();
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentMessages = messages.filter(
    m => m.bookingId === activeBooking?.id || m.bookingId === activeBooking?.bookingCode
  );

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeBooking) return;

    sendMessage(
      activeBooking.id,
      user?.id || 'c-1',
      user?.full_name || user?.name || 'Rahul Sharma',
      inputText
    );
    setInputText('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Service Chat Drawer"
      className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
    >
      
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
        <div>
          <div className="flex items-center space-x-1.5 text-xs font-bold text-sky-400">
            <Zap className="w-4 h-4" aria-hidden="true" />
            <span>Booking #{activeBooking?.bookingCode || 'WW-8291'}</span>
          </div>
          <h3 className="text-sm font-bold text-white mt-0.5">
            {activeBooking?.providerName || 'Service Provider'}
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => alert(`Connecting via Masked Call Protection... Call forwarded safely without sharing private number.`)}
            className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
            title="Masked Phone Call"
            aria-label="Initiate masked phone call"
          >
            <PhoneCall className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat drawer"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 text-[11px] text-slate-400 flex items-center space-x-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
        <span>Calls and chats are encrypted & masked for your privacy.</span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {currentMessages.map((msg) => {
          if (msg.isSystem) {
            return (
              <div key={msg.id} className="text-center my-2">
                <span className="inline-block px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-[11px] font-medium text-sky-300">
                  {msg.text}
                </span>
              </div>
            );
          }

          const isMe = msg.senderId === (user?.id || 'c-1');

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <span className="text-[10px] text-slate-400 mb-0.5 px-1">{msg.senderName}</span>
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                  isMe
                    ? 'bg-sky-600 text-white rounded-tr-none'
                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/60'
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-[9px] text-slate-300/80 block text-right mt-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chat Input Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-slate-950">
        <div className="flex items-center space-x-2">
          <label htmlFor="chat-message-input" className="sr-only">Type message</label>
          <input
            type="text"
            id="chat-message-input"
            name="chatMessage"
            aria-label="Type message"
            placeholder="Type message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20 transition-all focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </form>

    </div>
  );
};
