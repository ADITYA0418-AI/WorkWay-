import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Briefcase, Lock, Mail, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { WorkWaySvgLogo } from '../components/common/WorkWayLogo';
import { FormConsentCheckbox } from '../components/common/FormConsentCheckbox';
import { useSeo } from '../lib/useSeo';

export const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'provider' ? 'provider' : 'consumer';

  const { login, signup, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [tradeCategory, setTradeCategory] = useState('electrician');
  const [hourlyRate, setHourlyRate] = useState('500');
  const [consentGiven, setConsentGiven] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useSeo({
    title: isSignup ? 'Create Your Account | WorkWay' : 'Sign In | WorkWay',
    description: isSignup
      ? 'Join WorkWay to book verified hyper-local service pros or grow your service business with fair escrow payouts.'
      : 'Sign in to your WorkWay account to manage service bookings, track active jobs, or access provider tools.',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setConsentError(false);

    if (isSignup && !consentGiven) {
      setConsentError(true);
      setErrorMsg('Please accept the Terms & Conditions and Privacy Policy to register.');
      return;
    }

    if (isSignup) {
      const res = await signup({
        email,
        password,
        fullName,
        phone,
        role,
        tradeCategory,
        hourlyRate: Number(hourlyRate)
      });
      if (res.success) {
        navigate(role === 'provider' ? '/provider' : '/consumer');
      } else {
        setErrorMsg(res.error || 'Signup failed');
      }
    } else {
      const res = await login(email, password);
      if (res.success) {
        navigate(role === 'provider' ? '/provider' : '/consumer');
      } else {
        setErrorMsg(res.error || 'Invalid credentials');
      }
    }
  };

  const handleDemoQuickLogin = (demoRole) => {
    switchDemoRole(demoRole);
    navigate(demoRole === 'admin' ? '/admin' : demoRole === 'provider' ? '/provider' : '/consumer');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        
        {/* Logo — Clickable link back to Home */}
        <div className="text-center">
          <Link to="/" className="inline-block group">
            <div className="group-hover:scale-105 transition-transform">
              <WorkWaySvgLogo width={80} height={80} className="mx-auto mb-2 rounded-3xl shadow-2xl shadow-sky-500/30" />
            </div>
          </Link>
          <p className="text-xs text-sky-400 font-semibold tracking-widest uppercase mt-1">
            To GET WORK &amp; TO GET WORK DONE
          </p>
        </div>

        {/* Auth Card */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
          
          {/* Role Selection Switcher */}
          <div role="tablist" aria-label="Account type" className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800">
            <button
              type="button"
              role="tab"
              aria-selected={role === 'consumer'}
              onClick={() => setRole('consumer')}
              className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-all focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none ${
                role === 'consumer'
                  ? 'bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Consumer</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={role === 'provider'}
              onClick={() => setRole('provider')}
              className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-all focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none ${
                role === 'provider'
                  ? 'bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Service Provider</span>
            </button>
          </div>

          <h2 className="text-sm font-bold text-slate-200 text-center">
            {isSignup ? `Create New ${role === 'provider' ? 'Provider' : 'Consumer'} Account` : `Sign In to WorkWay`}
          </h2>

          {errorMsg && (
            <div role="alert" className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center font-medium">
              {errorMsg}
            </div>
          )}

          <form id="auth-form" onSubmit={handleSubmit} className="space-y-3.5">
            {isSignup && (
              <div>
                <label htmlFor="auth-fullname" className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 cursor-pointer">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" aria-hidden="true" />
                  <input
                    type="text"
                    id="auth-fullname"
                    name="fullName"
                    required
                    placeholder="Rahul Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="auth-email" className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 cursor-pointer">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" aria-hidden="true" />
                <input
                  type="email"
                  id="auth-email"
                  name="email"
                  required
                  placeholder={role === 'provider' ? 'provider@workway.app' : 'consumer@workway.app'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500"
                />
              </div>
            </div>

            {isSignup && (
              <div>
                <label htmlFor="auth-phone" className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 cursor-pointer">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" aria-hidden="true" />
                  <input
                    type="tel"
                    id="auth-phone"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500"
                  />
                </div>
              </div>
            )}

            {isSignup && role === 'provider' && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="auth-trade-category" className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 cursor-pointer">
                    Trade Category
                  </label>
                  <select
                    id="auth-trade-category"
                    name="tradeCategory"
                    value={tradeCategory}
                    onChange={(e) => setTradeCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500"
                  >
                    <option value="electrician">Electrician</option>
                    <option value="plumber">Plumber</option>
                    <option value="carpenter">Carpenter</option>
                    <option value="housemaid">Housemaid</option>
                    <option value="handyman">Handyman</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="auth-hourly-rate" className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 cursor-pointer">
                    Hourly Rate (₹)
                  </label>
                  <input
                    type="number"
                    id="auth-hourly-rate"
                    name="hourlyRate"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="auth-password" className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 cursor-pointer">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" aria-hidden="true" />
                <input
                  type="password"
                  id="auth-password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500"
                />
              </div>
            </div>

            {isSignup && (
              <div className="pt-1">
                <FormConsentCheckbox
                  id="auth-signup-consent"
                  type="auth_signup"
                  checked={consentGiven}
                  onChange={(checked) => {
                    setConsentGiven(checked);
                    if (checked) setConsentError(false);
                  }}
                  hasError={consentError}
                  errorMessage="Please accept the Terms &amp; Conditions and Privacy Policy."
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs shadow-lg shadow-[#0F766E]/20 flex items-center justify-center space-x-2 transition-all mt-2"
            >
              <span>{isSignup ? 'Complete Registration' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-xs text-[#0284C7] hover:underline font-medium"
            >
              {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>

        {/* Quick Demo Credentials Switcher */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            ⚡ Quick Demo 1-Click Access
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleDemoQuickLogin('consumer')}
              className="py-2 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 text-[11px] font-semibold"
            >
              Consumer Demo
            </button>
            <button
              onClick={() => handleDemoQuickLogin('provider')}
              className="py-2 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 text-[11px] font-semibold"
            >
              Provider Demo
            </button>
            <button
              onClick={() => handleDemoQuickLogin('admin')}
              className="py-2 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-semibold"
            >
              Admin Demo
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
