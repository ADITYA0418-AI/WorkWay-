import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useLocation } from '../../context/LocationContext';
import { MapPin, Navigation, Home, Briefcase, Plus, Check } from 'lucide-react';

export const LocationPickerModal = ({ isOpen, onClose }) => {
  const { 
    coords, 
    setCoords, 
    radiusKm, 
    setRadiusKm, 
    savedAddresses, 
    selectSavedAddress, 
    requestGPSLocation, 
    isLocating, 
    permissionDenied 
  } = useLocation();

  const [manualInput, setManualInput] = useState('');

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    setCoords({
      lat: 12.9716 + (Math.random() - 0.5) * 0.02,
      lng: 77.5946 + (Math.random() - 0.5) * 0.02,
      addressLine: manualInput,
      label: 'Manual Location'
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Set Location & Service Radius">
      <div className="space-y-6">
        
        {/* GPS Button */}
        <div>
          <button
            onClick={async () => {
              await requestGPSLocation();
              onClose();
            }}
            disabled={isLocating}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-semibold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-sky-600/20 transition-all"
          >
            <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Locating device...' : 'Use Current Device GPS'}</span>
          </button>
          {permissionDenied && (
            <p className="text-xs text-amber-400 mt-2 text-center">
              ⚠️ GPS permission denied. You can select a saved address or type manually below.
            </p>
          )}
        </div>

        {/* Radius Selection Slider */}
        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Hyperlocal Search Radius
            </span>
            <span className="text-sm font-heading font-bold text-sky-400">
              {radiusKm} km
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={radiusKm}
            onChange={(e) => setRadiusKm(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
          />
          <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-1">
            <span>1 km</span>
            <span>2 km</span>
            <span>3 km</span>
            <span>5 km</span>
            <span>10 km</span>
          </div>
        </div>

        {/* Saved Addresses List */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Saved Locations
          </h4>
          <div className="space-y-2">
            {savedAddresses.map((addr) => {
              const isSelected = coords.addressLine === addr.addressLine;
              return (
                <button
                  key={addr.id}
                  onClick={() => {
                    selectSavedAddress(addr);
                    onClose();
                  }}
                  className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-sky-500/10 border-sky-500 text-white'
                      : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-slate-800 text-sky-400">
                      {addr.label === 'Home' ? <Home className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">{addr.label}</span>
                      <span className="text-xs text-slate-400 line-clamp-1">{addr.addressLine}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-sky-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Manual Address Input */}
        <form onSubmit={handleManualSubmit}>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Enter Address Manually
          </h4>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. HSR Layout Sector 1, Bangalore"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
            >
              Set
            </button>
          </div>
        </form>

      </div>
    </Modal>
  );
};
