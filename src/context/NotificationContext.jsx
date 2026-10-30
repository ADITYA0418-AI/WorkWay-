import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext(null);

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n-1',
    userRole: 'consumer',
    title: '🚗 Provider On The Way',
    message: 'Rohan Mehta has accepted your booking and is en route. ETA 8 mins.',
    time: '10 mins ago',
    read: false
  },
  {
    id: 'n-2',
    userRole: 'consumer',
    title: '🎉 Booking Confirmed',
    message: 'Booking #WW-8291 created successfully.',
    time: '30 mins ago',
    read: true
  },
  {
    id: 'n-3',
    userRole: 'provider',
    title: '⚡ New Emergency Lead!',
    message: 'Plumbing Emergency Request 0.8 km away in Indiranagar. Budget: ₹500–₹1,000.',
    time: '5 mins ago',
    read: false
  }
];

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const addNotification = (notif) => {
    const item = {
      id: 'n-' + Date.now(),
      time: 'Just now',
      read: false,
      ...notif
    };
    setNotifications(prev => [item, ...prev]);
  };

  const markAllAsRead = (role) => {
    setNotifications(prev =>
      prev.map(n => (n.userRole === role ? { ...n, read: true } : n))
    );
  };

  const unreadCount = (role) =>
    notifications.filter(n => n.userRole === role && !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAllAsRead,
        unreadCount
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
