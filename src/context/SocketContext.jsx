import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [jobRequests, setJobRequests] = useState([]);
  const [liveLocations, setLiveLocations] = useState({});

  useEffect(() => {
    // Connect to the proxy or directly to backend
    const newSocket = io({ path: '/socket.io' }); // Vite proxies this to localhost:5000
    
    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server:', newSocket.id);
      
      // If user is a provider, join their specific room
      if (user?.role === 'provider' && user?.id) {
        newSocket.emit('join_provider_room', user.id);
      }
    });

    newSocket.on('new_job_request', (data) => {
      console.log('New job request received:', data);
      setJobRequests(prev => [data, ...prev]);
    });

    newSocket.on('location_changed', (data) => {
      console.log('Location updated:', data);
      setLiveLocations(prev => ({
        ...prev,
        [data.providerId]: { lat: data.lat, lng: data.lng }
      }));
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  const emitLocationUpdate = (providerId, lat, lng) => {
    if (socket) {
      socket.emit('update_location', { providerId, lat, lng });
    }
  };

  return (
    <SocketContext.Provider value={{ socket, jobRequests, liveLocations, emitLocationUpdate }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
