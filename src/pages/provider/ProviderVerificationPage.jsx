import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { VerificationBadge } from '../../components/provider/VerificationBadge';
import { CheckCircle2, ShieldCheck, Award, Upload, AlertCircle } from 'lucide-react';
import { FormConsentCheckbox } from '../../components/common/FormConsentCheckbox';

export const ProviderVerificationPage = () => {
  const { user } = useAuth();
  const { providers } = useBooking();
  const provider = providers.find(p => p.name === (user?.full_name || user?.name)) || providers[0];

  const [docType, setDocType] = useState('government_id');
  const [fileAttached, setFileAttached] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!consentGiven) {
      setConsentError(true);
      return;
    }
    setFileAttached(false);
    setConsentGiven(false);
    alert('Verification document submitted to Admin queue for review!');
  };

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text pb-20 p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">Trust & Verification Progress</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Complete verification levels to unlock higher trust badges, priority lead dispatch & Master Pro status.</p>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Current Level</span>
          <VerificationBadge level={provider.verificationLevel} />
        </div>

        {/* Verification Checklist */}
        <div className="space-y-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Level 1 — Basic Verified</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Mobile OTP + Aadhaar Government ID Verified</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Completed ✓</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Level 2 — Background Cleared</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Police Clearance & Trade Skill Verification</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Completed ✓</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Award className="w-5 h-5 text-amber-500" />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Level 3 — Master Pro</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">100+ Jobs • 4.8+ Rating • Insurance Uploaded</span>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Active Pro ✓</span>
          </div>
        </div>
      </div>

      {/* Upload Document Form */}
      <form onSubmit={handleUploadSubmit} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">Upload Additional Credentials</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="provider-doc-category" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 cursor-pointer">
              Document Category
            </label>
            <select
              id="provider-doc-category"
              name="docCategory"
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <option value="government_id">Aadhaar / Voter ID (Govt ID)</option>
              <option value="police_clearance">Police Clearance Certificate</option>
              <option value="skill_certificate">ITI Trade Skill Certification</option>
              <option value="insurance_proof">Liability Insurance Policy Proof</option>
            </select>
          </div>

          <div>
            <label htmlFor="provider-file-input" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 cursor-pointer">
              Select Document File
            </label>
            <label
              htmlFor="provider-file-input"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  document.getElementById('provider-file-input')?.click();
                }
              }}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 cursor-pointer text-xs text-slate-700 dark:text-slate-300 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none transition-all"
            >
              <Upload className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              <span>{fileAttached ? 'Document Selected ✓' : 'Choose JPG/PDF'}</span>
              <input
                type="file"
                id="provider-file-input"
                name="providerDocument"
                aria-label="Upload verification document"
                onChange={() => setFileAttached(true)}
                className="sr-only"
              />
            </label>
          </div>
        </div>

        <FormConsentCheckbox
          id="provider-verify-consent"
          type="provider_verify"
          checked={consentGiven}
          onChange={(checked) => {
            setConsentGiven(checked);
            if (checked) setConsentError(false);
          }}
          hasError={consentError}
          errorMessage="Please certify document authenticity and consent to verification."
          className="pt-2"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs shadow-lg shadow-[#0F766E]/20"
        >
          Submit to Admin Verification Queue
        </button>
      </form>

    </div>
  );
};
