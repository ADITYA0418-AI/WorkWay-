import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { RatingStars } from '../../components/common/RatingStars';
import { VerificationBadge } from '../../components/provider/VerificationBadge';
import { SmartJobRequestModal } from '../../components/consumer/SmartJobRequestModal';
import { INITIAL_SERVICES_CATALOG } from '../../data/mockData';
import { formatCurrency } from '../../lib/utils';
import { 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft, 
  Star, 
  Award, 
  Building2, 
  ChevronRight 
} from 'lucide-react';

export const ProviderProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { providers } = useBooking();

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const provider = providers.find(p => p.id === id) || providers[0];
  const services = INITIAL_SERVICES_CATALOG[provider.trade] || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      
      {/* Top Banner Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-slate-400">Back to Search</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {/* Main Profile Header Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start space-x-4">
              <img
                src={provider.avatar}
                alt={`${provider.name}'s profile avatar`}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-sky-500/40 shadow-xl"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=300';
                }}
              />
              <div className="space-y-1">
                <h1 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  {provider.name}
                  {provider.insuranceVerified && (
                    <ShieldCheck className="w-5 h-5 text-sky-400" title="Insurance Verified" />
                  )}
                </h1>
                <p className="text-xs font-semibold text-sky-400 capitalize">{provider.tradeLabel || provider.trade}</p>
                <div className="flex items-center space-x-2 pt-1">
                  <RatingStars rating={provider.rating} reviewCount={provider.reviewCount} />
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-300 font-semibold">{provider.jobsCompleted} Jobs Done</span>
                </div>
                <div className="pt-2">
                  <VerificationBadge level={provider.verificationLevel} />
                </div>
              </div>
            </div>

            {/* Pricing & CTA */}
            <div className="w-full sm:w-auto p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center sm:text-right space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Hourly Rate</span>
              <span className="font-heading text-2xl font-bold text-white block">
                {formatCurrency(provider.hourlyRate)}
                <span className="text-xs font-normal text-slate-400">/hr</span>
              </span>
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs shadow-lg shadow-[#0F766E]/20 transition-all hover:scale-105"
              >
                Book This Provider
              </button>
            </div>
          </div>

          {/* Badges list */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
            {provider.badges?.map((badge, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-medium text-slate-300"
              >
                ✨ {badge}
              </span>
            ))}
          </div>

          {/* Bio */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {provider.bio}
          </p>
        </div>

        {/* Services & Pricing Catalog */}
        <div className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">Services & Pricing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((srv) => (
              <div key={srv.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white">{srv.name}</h3>
                  <span className="text-xs text-sky-400 font-semibold">{srv.priceRange}</span>
                </div>
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Before / After Photos */}
        {provider.portfolio?.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-heading text-lg font-bold text-white">Project Portfolio</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {provider.portfolio.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <h3 className="text-xs font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-400">{item.description}</p>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Before</span>
                      <img src={item.beforeImg} alt={`Before repair work for ${item.title}`} className="w-full h-32 rounded-xl object-cover" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">After</span>
                      <img src={item.afterImg} alt={`Completed work for ${item.title}`} className="w-full h-32 rounded-xl object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customer Reviews */}
        <div className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">Customer Reviews ({provider.reviewCount})</h2>
          <div className="space-y-3">
            {provider.reviewsList?.map((rev) => (
              <div key={rev.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{rev.user}</span>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>
                <RatingStars rating={rev.rating} size="xs" />
                <p className="text-xs text-slate-300">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <SmartJobRequestModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedProvider={provider}
      />

    </div>
  );
};
