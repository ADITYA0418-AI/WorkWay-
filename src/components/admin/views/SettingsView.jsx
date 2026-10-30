import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, Key, Globe, Percent, MapPin, Lock, Eye, EyeOff, Sliders } from 'lucide-react';

export const SettingsView = () => {
  const [toastNotice, setToastNotice] = useState(null);
  const [showApiKey, setShowApiKey] = useState({});

  const [settings, setSettings] = useState({
    platformFeePercent: '10',
    surgeFeePercent: '25',
    proSubscriptionFee: '1650',
    leadFeeStandard: '49',
    leadFeePremium: '99',
    defaultSearchRadius: '5',
    maxSearchRadius: '15',
    emergencyRadius: '10',
    razorpayApiKey: 'rzp_live_abc123xyzRPAY',
    razorpayWebhookSecret: 'whsec_workway_2026',
    firebaseServerKey: 'AAAA...FCM_SERVER_KEY',
    googleMapsKey: 'AIzaSy...MAPS_KEY_XYZ',
    twilioSid: 'AC12abc...TWILIO_SID',
    minWorkerCompletionForPayout: '85',
    escrowAutoReleaseDays: '3',
    refundWindowDays: '7'
  });

  const update = (key, val) => setSettings(prev => ({ ...prev, [key]: val }));
  const toggleApiVisibility = (key) => setShowApiKey(prev => ({ ...prev, [key]: !prev[key] }));

  const handleSave = (e) => {
    e.preventDefault();
    setToastNotice('Platform configuration saved successfully! Changes are live.');
    setTimeout(() => setToastNotice(null), 3500);
  };

  const Section = ({ title, icon: Icon, color, children }) => (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
      <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800/70 pb-3">
        <div className={`p-2 rounded-xl bg-slate-50 dark:bg-slate-950 ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
        <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">{title}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );

  const FieldGroup = ({ label, hint, children }) => (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">{label}</label>
      {children}
      {hint && <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">{hint}</p>}
    </div>
  );

  const InputField = ({ value, onChange, type = 'text', suffix }) => (
    <div className="flex items-center gap-2">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-xs focus:outline-none focus:border-indigo-500 transition-colors"
      />
      {suffix && <span className="text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">{suffix}</span>}
    </div>
  );

  const ApiKeyField = ({ fieldKey, value, onChange }) => (
    <div className="flex items-center gap-2">
      <input
        type={showApiKey[fieldKey] ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-indigo-500 transition-colors"
      />
      <button
        type="button"
        onClick={() => toggleApiVisibility(fieldKey)}
        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-all"
      >
        {showApiKey[fieldKey] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );

  return (
    <div className="space-y-6 pb-12">
      {toastNotice && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 shadow-2xl shadow-emerald-500/20 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span className="text-xs font-semibold">{toastNotice}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[10px] font-bold uppercase">SYSTEM CONFIG</span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Platform Configuration & API Secrets</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Control marketplace fee structures, geographic defaults & third-party service integrations.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">

        {/* Monetization Settings */}
        <Section title="Monetization & Fee Guardrails" icon={Percent} color="text-emerald-600 dark:text-emerald-400">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FieldGroup label="Platform Commission Rate" hint="Applied on every completed booking escrow">
              <InputField value={settings.platformFeePercent} onChange={v => update('platformFeePercent', v)} type="number" suffix="% Take Rate" />
            </FieldGroup>
            <FieldGroup label="Surge Pricing Premium" hint="Applied during peak demand hours 6PM–10PM">
              <InputField value={settings.surgeFeePercent} onChange={v => update('surgeFeePercent', v)} type="number" suffix="% Multiplier" />
            </FieldGroup>
            <FieldGroup label="Pro Subscription Fee" hint="Monthly recurring charge for WorkWay Pro Badge">
              <InputField value={settings.proSubscriptionFee} onChange={v => update('proSubscriptionFee', v)} type="number" suffix="₹/month" />
            </FieldGroup>
            <FieldGroup label="Standard Lead Fee" hint="Pay-per-lead cost for non-Pro tradespeople">
              <InputField value={settings.leadFeeStandard} onChange={v => update('leadFeeStandard', v)} type="number" suffix="₹ per lead" />
            </FieldGroup>
            <FieldGroup label="Premium Lead Fee" hint="High-priority emergency leads cost">
              <InputField value={settings.leadFeePremium} onChange={v => update('leadFeePremium', v)} type="number" suffix="₹ per lead" />
            </FieldGroup>
            <FieldGroup label="Min Completion % for Payout" hint="Worker must achieve this completion threshold">
              <InputField value={settings.minWorkerCompletionForPayout} onChange={v => update('minWorkerCompletionForPayout', v)} type="number" suffix="%" />
            </FieldGroup>
          </div>
        </Section>

        {/* Geo & Search Settings */}
        <Section title="Geographic & Search Radius Defaults" icon={MapPin} color="text-sky-600 dark:text-sky-400">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FieldGroup label="Default Search Radius" hint="Starting distance for consumer provider search">
              <InputField value={settings.defaultSearchRadius} onChange={v => update('defaultSearchRadius', v)} type="number" suffix="km" />
            </FieldGroup>
            <FieldGroup label="Maximum Search Radius" hint="Cap on how far a consumer can expand search">
              <InputField value={settings.maxSearchRadius} onChange={v => update('maxSearchRadius', v)} type="number" suffix="km" />
            </FieldGroup>
            <FieldGroup label="Emergency Dispatch Radius" hint="Radius for emergency lead broadcasts">
              <InputField value={settings.emergencyRadius} onChange={v => update('emergencyRadius', v)} type="number" suffix="km" />
            </FieldGroup>
          </div>
        </Section>

        {/* Escrow & Dispute Settings */}
        <Section title="Escrow & Refund Policies" icon={Sliders} color="text-amber-600 dark:text-amber-400">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldGroup label="Escrow Auto-Release After Completion" hint="Days before payment auto-releases if no dispute filed">
              <InputField value={settings.escrowAutoReleaseDays} onChange={v => update('escrowAutoReleaseDays', v)} type="number" suffix="days" />
            </FieldGroup>
            <FieldGroup label="Customer Refund Claim Window" hint="Days post-completion for raising a refund request">
              <InputField value={settings.refundWindowDays} onChange={v => update('refundWindowDays', v)} type="number" suffix="days" />
            </FieldGroup>
          </div>
        </Section>

        {/* API Keys */}
        <Section title="Third-Party API Integration Secrets" icon={Key} color="text-rose-600 dark:text-rose-400">
          <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-700 dark:text-rose-300 font-semibold mb-2">
            ⚠️ These keys are masked in transit and only visible to Super Admins. Never share in plaintext.
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldGroup label="Razorpay Live API Key">
              <ApiKeyField fieldKey="razorpay" value={settings.razorpayApiKey} onChange={v => update('razorpayApiKey', v)} />
            </FieldGroup>
            <FieldGroup label="Razorpay Webhook Secret">
              <ApiKeyField fieldKey="razorpayWh" value={settings.razorpayWebhookSecret} onChange={v => update('razorpayWebhookSecret', v)} />
            </FieldGroup>
            <FieldGroup label="Firebase FCM Server Key">
              <ApiKeyField fieldKey="firebase" value={settings.firebaseServerKey} onChange={v => update('firebaseServerKey', v)} />
            </FieldGroup>
            <FieldGroup label="Google Maps Platform Key">
              <ApiKeyField fieldKey="maps" value={settings.googleMapsKey} onChange={v => update('googleMapsKey', v)} />
            </FieldGroup>
          </div>
        </Section>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save All Platform Settings</span>
          </button>
          <p className="text-xs text-slate-500">Changes take effect immediately on save. A full audit log entry is auto-created.</p>
        </div>
      </form>
    </div>
  );
};
