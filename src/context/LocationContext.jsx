import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentPositionPromise } from '../lib/geo';

const LocationContext = createContext(null);

export const DEFAULT_COORDS = {
  lat: 12.9716,
  lng: 77.5946,
  addressLine: 'MG Road, Indiranagar, Bangalore',
  label: 'Current Location'
};

export const INITIAL_SAVED_ADDRESSES = [
  { id: 'addr-1', label: 'Home', addressLine: 'Flat 402, Green Valley Apartments, Indiranagar, Bangalore', lat: 12.9716, lng: 77.5946, isDefault: true },
  { id: 'addr-2', label: 'Office', addressLine: 'Embassy Golf Links Business Park, Domlur, Bangalore', lat: 12.9620, lng: 77.6380, isDefault: false }
];

export const LocationProvider = ({ children }) => {
  const [coords, setCoords] = useState(DEFAULT_COORDS);
  const [radiusKm, setRadiusKm] = useState(5); // Default 5 km radius
  const [savedAddresses, setSavedAddresses] = useState(INITIAL_SAVED_ADDRESSES);
  const [isLocating, setIsLocating] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  // Request actual browser geolocation on mount
  useEffect(() => {
    requestGPSLocation();
  }, []);

  const requestGPSLocation = async () => {
    setIsLocating(true);
    setPermissionDenied(false);
    try {
      const pos = await getCurrentPositionPromise();
      setCoords({
        lat: pos.lat,
        lng: pos.lng,
        addressLine: `GPS: ${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)}`,
        label: 'GPS Location'
      });
    } catch (err) {
      console.warn('GPS Geolocation permission denied or unavailable:', err.message);
      setPermissionDenied(true);
      // Keeps default MG Road Bangalore coordinates safely
    } finally {
      setIsLocating(false);
    }
  };

  const selectSavedAddress = (address) => {
    setCoords({
      lat: address.lat,
      lng: address.lng,
      addressLine: address.addressLine,
      label: address.label
    });
  };

  const addSavedAddress = (newAddr) => {
    const addressItem = {
      id: 'addr-' + Date.now(),
      ...newAddr
    };
    setSavedAddresses(prev => [addressItem, ...prev]);
  };

  return (
    <LocationContext.Provider
      value={{
        coords,
        setCoords,
        radiusKm,
        setRadiusKm,
        savedAddresses,
        selectSavedAddress,
        addSavedAddress,
        requestGPSLocation,
        isLocating,
        permissionDenied
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
