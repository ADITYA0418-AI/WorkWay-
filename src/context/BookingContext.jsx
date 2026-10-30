import React, { createContext, useContext, useState, useCallback } from 'react';
import { INITIAL_BOOKINGS, INITIAL_PROVIDERS, INITIAL_MESSAGES, INITIAL_VERIFICATION_QUEUE, INITIAL_DISPUTES } from '../data/mockData';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [providers, setProviders] = useState(INITIAL_PROVIDERS);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [verificationQueue, setVerificationQueue] = useState(INITIAL_VERIFICATION_QUEUE);
  const [disputes, setDisputes] = useState(INITIAL_DISPUTES);
  const [activeBooking, setActiveBooking] = useState(INITIAL_BOOKINGS[0]); // WW-8291 active by default
  const [emergencyModeActive, setEmergencyModeActive] = useState(false);

  // Provider Duty Status Toggle (Available, Busy, Offline)
  const toggleProviderDuty = (providerId, newStatus) => {
    setProviders(prev =>
      prev.map(p => (p.id === providerId ? { ...p, dutyStatus: newStatus } : p))
    );
  };

  // Helper to build authorized request headers
  const authHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('workway_token') || ''}`
  });

  // Create New Booking — calls backend, falls back to mock state
  const createBooking = useCallback(async (newBookingData) => {
    const bookingCode = 'WW-' + Math.floor(1000 + Math.random() * 9000);
    const bookingObj = {
      id: bookingCode,
      bookingCode,
      bookingStatus: 'pending',
      paymentStatus: 'pending',
      materialsRequested: [],
      timestamps: { created: new Date().toISOString() },
      ...newBookingData
    };

    // Optimistically update local state immediately
    setBookings(prev => [bookingObj, ...prev]);
    setActiveBooking(bookingObj);

    // Fire & forget to backend
    try {
      await fetch('/api/v1/bookings', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          provider_id: newBookingData.providerId,
          category: newBookingData.providerTrade,
          estimated_cost: newBookingData.estimatedLabour,
          user_lat: newBookingData.latitude,
          user_lng: newBookingData.longitude
        })
      });
    } catch (err) {
      console.warn('Backend booking create failed, using local state only:', err);
    }

    // Send automated system chat message
    const sysMsg = {
      id: 'msg-' + Date.now(),
      bookingId: bookingCode,
      senderId: 'system',
      senderName: 'WorkWay System',
      text: `🎉 Booking ${bookingCode} created! Request sent to ${newBookingData.providerName}.`,
      isSystem: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, sysMsg]);

    return bookingObj;
  }, []);

  // Update Booking Status — calls backend, falls back to local state
  const updateBookingStatus = useCallback(async (bookingId, newStatus, note = '') => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id === bookingId || b.bookingCode === bookingId) {
          const updated = {
            ...b,
            bookingStatus: newStatus,
            timestamps: {
              ...b.timestamps,
              [newStatus]: new Date().toISOString()
            }
          };
          if (activeBooking?.id === b.id) {
            setActiveBooking(updated);
          }
          return updated;
        }
        return b;
      })
    );

    // Attempt backend sync
    try {
      await fetch(`/api/v1/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ status: newStatus, note })
      });
    } catch (err) {
      console.warn('Backend status update failed, using local state only:', err);
    }

    // Append system message
    const statusLabels = {
      accepted: '✅ Provider ACCEPTED the booking.',
      on_the_way: '🚗 Provider is ON THE WAY (ETA: 8 mins).',
      in_progress: '🔧 Work HAS STARTED.',
      completed: '✨ Job COMPLETED! Invoice ready.',
      cancelled: '❌ Booking CANCELLED.',
      disputed: '⚠️ Dispute filed. WorkWay Support investigating.'
    };

    if (statusLabels[newStatus]) {
      const sysMsg = {
        id: 'msg-' + Date.now(),
        bookingId,
        senderId: 'system',
        senderName: 'WorkWay System',
        text: statusLabels[newStatus],
        isSystem: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, sysMsg]);
    }
  }, [activeBooking]);

  // Add Material Cost Request (Provider Action)
  const addMaterialRequest = (bookingId, itemName, cost) => {
    const materialItem = {
      id: 'm-' + Date.now(),
      name: itemName,
      cost: parseFloat(cost),
      approved: false
    };

    setBookings(prev =>
      prev.map(b => {
        if (b.id === bookingId) {
          const updated = {
            ...b,
            materialsRequested: [...(b.materialsRequested || []), materialItem],
            materialsCost: (b.materialsCost || 0) + parseFloat(cost),
            totalAmount: b.estimatedLabour + (b.materialsCost || 0) + parseFloat(cost) + b.platformFee
          };
          if (activeBooking?.id === b.id) setActiveBooking(updated);
          return updated;
        }
        return b;
      })
    );

    // Add chat alert
    const sysMsg = {
      id: 'msg-' + Date.now(),
      bookingId,
      senderId: 'system',
      senderName: 'WorkWay System',
      text: `📦 Provider requested approval for material: ${itemName} (₹${cost})`,
      isSystem: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, sysMsg]);
  };

  // Approve / Reject Material Request (Consumer Action)
  const approveMaterialRequest = (bookingId, materialId, isApproved) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id === bookingId) {
          const updatedMaterials = (b.materialsRequested || []).map(m =>
            m.id === materialId ? { ...m, approved: isApproved } : m
          );
          const approvedCost = updatedMaterials
            .filter(m => m.approved)
            .reduce((sum, m) => sum + m.cost, 0);

          const updated = {
            ...b,
            materialsRequested: updatedMaterials,
            materialsCost: approvedCost,
            totalAmount: b.estimatedLabour + approvedCost + b.platformFee
          };
          if (activeBooking?.id === b.id) setActiveBooking(updated);
          return updated;
        }
        return b;
      })
    );
  };

  // Send Chat Message
  const sendMessage = (bookingId, senderId, senderName, text, attachmentUrl = null) => {
    const newMsg = {
      id: 'msg-' + Date.now(),
      bookingId,
      senderId,
      senderName,
      text,
      attachmentUrl,
      isSystem: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
  };

  // Submit Review
  const submitReview = (bookingId, providerId, reviewData) => {
    // Update booking to completed payment
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, hasReviewed: true } : b))
    );

    // Append review to provider
    setProviders(prev =>
      prev.map(p => {
        if (p.id === providerId) {
          const newCount = p.reviewCount + 1;
          const newRating = parseFloat(((p.rating * p.reviewCount + reviewData.overallRating) / newCount).toFixed(2));
          return {
            ...p,
            rating: newRating,
            reviewCount: newCount,
            reviewsList: [
              {
                id: 'r-' + Date.now(),
                user: reviewData.userName || 'Rahul S.',
                rating: reviewData.overallRating,
                date: 'Just now',
                comment: reviewData.comment
              },
              ...p.reviewsList
            ]
          };
        }
        return p;
      })
    );
  };

  // File Dispute
  const fileDispute = (bookingId, issueType, description) => {
    const disputeObj = {
      id: 'disp-' + Date.now(),
      disputeCode: 'WW-DISP-' + Math.floor(100 + Math.random() * 900),
      bookingCode: bookingId,
      issueType,
      description,
      status: 'open',
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setDisputes(prev => [disputeObj, ...prev]);
    updateBookingStatus(bookingId, 'disputed');
  };

  // Admin Verification Actions
  const updateVerificationStatus = (reqId, newStatus) => {
    setVerificationQueue(prev =>
      prev.map(item => (item.id === reqId ? { ...item, status: newStatus } : item))
    );
  };

  return (
    <BookingContext.Provider
      value={{
        providers,
        bookings,
        messages,
        verificationQueue,
        disputes,
        activeBooking,
        setActiveBooking,
        emergencyModeActive,
        setEmergencyModeActive,
        toggleProviderDuty,
        createBooking,
        updateBookingStatus,
        addMaterialRequest,
        approveMaterialRequest,
        sendMessage,
        submitReview,
        fileDispute,
        updateVerificationStatus
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
