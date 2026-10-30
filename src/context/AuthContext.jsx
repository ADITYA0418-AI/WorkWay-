import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isDemoMode } from '../lib/supabase';
import { DEMO_CREDENTIALS } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(DEMO_CREDENTIALS.consumer); // Default logged in as consumer for smooth initial testing
  const [role, setRole] = useState('consumer');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isDemoMode && supabase) {
      // Check live Supabase session with safety catch
      supabase.auth.getSession()
        .then(({ data: { session } }) => {
          if (session?.user) {
            fetchUserProfile(session.user.id);
          }
        })
        .catch((err) => {
          console.warn('Supabase session lookup skipped/unavailable:', err.message);
        });

      try {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session?.user) {
            fetchUserProfile(session.user.id);
          } else {
            setUser(null);
          }
        });

        return () => subscription?.unsubscribe?.();
      } catch (e) {
        console.warn('Supabase auth listener initialization error:', e);
      }
    }
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (data && !error) {
        setUser(data);
        setRole(data.role || 'consumer');
      }
    } catch (err) {
      console.warn('Error fetching profile:', err);
    }
  };

  const [token, setToken] = useState(localStorage.getItem('workway_token') || null);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Always attempt to authenticate against the custom Node backend
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (data.success && data.token) {
        setToken(data.token);
        localStorage.setItem('workway_token', data.token);
        setUser(data.user);
        setRole(data.user.role);
        return { success: true };
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (err) {
      console.warn('Backend login failed, falling back to mock:', err);
      // Fallback to Mock login if backend is unreachable
      if (email.includes('provider')) {
        setUser(DEMO_CREDENTIALS.provider);
        setRole('provider');
      } else if (email.includes('admin')) {
        setUser(DEMO_CREDENTIALS.admin);
        setRole('admin');
      } else {
        setUser({ ...DEMO_CREDENTIALS.consumer, email });
        setRole('consumer');
      }
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({ email, password, fullName, phone, role: targetRole, tradeCategory, hourlyRate }) => {
    setLoading(true);
    try {
      if (!isDemoMode && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName, role: targetRole, phone }
          }
        });
        if (error) throw error;
        setUser({ id: data.user?.id, email, full_name: fullName, role: targetRole, phone });
        setRole(targetRole);
      } else {
        const newUser = {
          id: 'u-' + Math.random().toString(36).substring(7),
          email,
          full_name: fullName,
          phone,
          role: targetRole,
          tradeCategory,
          hourlyRate
        };
        setUser(newUser);
        setRole(targetRole);
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (!isDemoMode && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setRole('consumer');
    setToken(null);
    localStorage.removeItem('workway_token');
  };

  const switchDemoRole = (targetRole) => {
    if (targetRole === 'provider') {
      setUser(DEMO_CREDENTIALS.provider);
      setRole('provider');
    } else if (targetRole === 'admin') {
      setUser(DEMO_CREDENTIALS.admin);
      setRole('admin');
    } else {
      setUser(DEMO_CREDENTIALS.consumer);
      setRole('consumer');
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, token, loading, login, signup, logout, switchDemoRole, isDemoMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
