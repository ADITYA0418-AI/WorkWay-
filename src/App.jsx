import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import { BookingProvider } from './context/BookingContext';
import { NotificationProvider } from './context/NotificationContext';
import { CookieConsentProvider } from './context/CookieConsentContext';
import { SocketProvider } from './context/SocketContext';
import { ThemeProvider } from './context/ThemeContext';

import { Navbar } from './components/common/Navbar';
import { BottomNav } from './components/common/BottomNav';
import { Footer } from './components/common/Footer';
import { ParticleBackground } from './components/common/ParticleBackground';
import { WorkWayFuturisticLoader } from './components/common/WorkWayFuturisticLoader';
import { ChatDrawer } from './components/chat/ChatDrawer';
import { LocationPickerModal } from './components/map/LocationPickerModal';
import { AIProblemDiagnosisModal } from './components/consumer/AIProblemDiagnosisModal';
import { EmergencyModeBanner } from './components/consumer/EmergencyModeBanner';
import { CookieConsentBanner } from './components/common/CookieConsentBanner';
import { CookieConsentModal } from './components/common/CookieConsentModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';

// Consumer Pages
import { ConsumerHome } from './pages/consumer/ConsumerHome';
import { ProviderProfilePage } from './pages/consumer/ProviderProfilePage';
import { ConsumerBookingsPage } from './pages/consumer/ConsumerBookingsPage';
import { ConsumerProfilePage } from './pages/consumer/ConsumerProfilePage';
import { ConsumerMessagesPage } from './pages/consumer/ConsumerMessagesPage';

// Provider Pages
import { ProviderDashboard } from './pages/provider/ProviderDashboard';
import { ProviderLeadsPage } from './pages/provider/ProviderLeadsPage';
import { ProviderJobsPage } from './pages/provider/ProviderJobsPage';
import { ProviderEarningsPage } from './pages/provider/ProviderEarningsPage';
import { ProviderVerificationPage } from './pages/provider/ProviderVerificationPage';
import { ProviderProfileEditPage } from './pages/provider/ProviderProfileEditPage';

// Admin Pages (single self-contained shell with useState routing)
import { AdminLayout } from './pages/admin/AdminLayout';

// Legal & Policy Pages
import { PrivacyPolicyPage } from './pages/legal/PrivacyPolicyPage';
import { TermsPage } from './pages/legal/TermsPage';
import { CookiePolicyPage } from './pages/legal/CookiePolicyPage';
import { RefundPolicyPage } from './pages/legal/RefundPolicyPage';

// Marketing & Info Pages
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { ServicesListPage } from './pages/services/ServicesListPage';
import { ServicePage } from './pages/services/ServicePage';

// Analytics
import { useAnalytics } from './lib/useAnalytics';

function AppContent() {
  const { role } = useAuth();
  const location = useLocation();
  useAnalytics(); // GA4 consent-guarded page tracking
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [showIntroLoader, setShowIntroLoader] = useState(true);

  return (
    <div className="relative min-h-screen bg-theme-bg text-theme-text flex flex-col font-sans transition-colors duration-200">
      {showIntroLoader && !isAdminRoute && (
        <WorkWayFuturisticLoader
          onComplete={() => setShowIntroLoader(false)}
          durationSeconds={9}
          autoDismiss={true}
        />
      )}
      <ParticleBackground opacity={0.7} />

      {/* Global Navbar with View Switcher always accessible */}
      <Navbar
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        onReplayIntro={() => setShowIntroLoader(true)}
      />

      <div className="relative z-10 flex-1">
        <Routes>
          {/* Dynamic Root Route based on active role */}
          <Route
            path="/"
            element={
              role === 'admin' ? (
                <AdminLayout />
              ) : role === 'provider' ? (
                <ProviderDashboard onOpenChat={() => setIsChatOpen(true)} />
              ) : (
                <ConsumerHome onOpenChat={() => setIsChatOpen(true)} />
              )
            }
          />
          {/* Marketing Landing */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* Consumer Routes */}
          <Route path="/consumer" element={<ConsumerHome onOpenChat={() => setIsChatOpen(true)} />} />
          <Route path="/consumer/search" element={<ConsumerHome onOpenChat={() => setIsChatOpen(true)} />} />
          <Route path="/consumer/providers/:id" element={<ProviderProfilePage />} />
          <Route path="/consumer/bookings" element={<ConsumerBookingsPage onOpenChat={() => setIsChatOpen(true)} />} />
          <Route path="/consumer/profile" element={<ConsumerProfilePage />} />
          <Route path="/consumer/messages" element={<ConsumerMessagesPage onOpenChat={() => setIsChatOpen(true)} />} />

          {/* Provider Routes */}
          <Route path="/provider" element={<ProviderDashboard onOpenChat={() => setIsChatOpen(true)} />} />
          <Route path="/provider/leads" element={<ProviderLeadsPage />} />
          <Route path="/provider/jobs" element={<ProviderJobsPage onOpenChat={() => setIsChatOpen(true)} />} />
          <Route path="/provider/earnings" element={<ProviderEarningsPage />} />
          <Route path="/provider/verification" element={<ProviderVerificationPage />} />
          <Route path="/provider/profile" element={<ProviderProfileEditPage />} />

          {/* Admin — self-contained shell handles all sub-navigation internally */}
          <Route path="/admin/*" element={<AdminLayout />} />

          {/* Legal & Policy Routes */}
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          
          <Route path="/cookies" element={<CookiePolicyPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          
          <Route path="/refunds" element={<RefundPolicyPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />

          {/* Info & Marketing Routes */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/services" element={<ServicesListPage />} />
          <Route path="/services/:categoryId" element={<ServicePage />} />

          {/* Fallback Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Global Footer on public, consumer, provider, and legal pages */}
      {!isAdminRoute && <Footer />}

      {!isAdminRoute && <BottomNav />}

      {/* Global Drawers & Modals */}
      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      <LocationPickerModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />

      <AIProblemDiagnosisModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        onSelectCategory={() => {}}
      />

      {/* Cookie Consent Manager & Banner */}
      <CookieConsentBanner />
      <CookieConsentModal />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <SocketProvider>
            <LocationProvider>
              <BookingProvider>
                <NotificationProvider>
                  <CookieConsentProvider>
                    <AppContent />
                  </CookieConsentProvider>
                </NotificationProvider>
              </BookingProvider>
            </LocationProvider>
          </SocketProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}
