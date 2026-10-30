import React from 'react';
import { Link } from 'react-router-dom';
import { Check, AlertCircle } from 'lucide-react';

export const FormConsentCheckbox = ({
  id = 'form-consent',
  checked,
  onChange,
  required = true,
  hasError = false,
  type = 'auth_signup', // 'auth_signup' | 'job_booking' | 'provider_verify' | 'custom'
  errorMessage = 'You must accept the terms and consent before proceeding.',
  children,
  className = '',
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-start space-x-2.5">
        <div className="relative flex items-center pt-0.5">
          <input
            type="checkbox"
            id={id}
            name={id}
            required={required}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                onChange(!checked);
              }
            }}
            className="peer sr-only"
            aria-checked={checked}
            aria-required={required}
          />
          <label
            htmlFor={id}
            className={`w-4 h-4 rounded-md border flex items-center justify-center cursor-pointer transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-[#0F766E] peer-focus-visible:ring-offset-surface outline-none ${
              checked
                ? 'bg-[#0F766E] border-[#0F766E] text-white shadow-sm'
                : hasError
                ? 'border-rose-500 bg-rose-500/10'
                : 'border-slate-400 dark:border-slate-600 bg-surface hover:border-slate-300'
            }`}
          >
            {checked && <Check className="w-3 h-3 stroke-[3]" aria-hidden="true" />}
          </label>
        </div>

        <label
          htmlFor={id}
          className="text-xs text-theme-text-secondary leading-snug cursor-pointer select-none"
        >
          {children ? (
            children
          ) : type === 'auth_signup' ? (
            <span>
              I agree to the{' '}
              <Link to="/terms" target="_blank" rel="noopener noreferrer" className="text-[#0284C7] underline hover:text-sky-400 font-semibold">
                Terms and Conditions
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#0284C7] underline hover:text-sky-400 font-semibold">
                Privacy Policy
              </Link>
              , and consent to the collection and processing of my contact and location information for service fulfillment.
            </span>
          ) : type === 'job_booking' ? (
            <span>
              I accept the{' '}
              <Link to="/terms" target="_blank" rel="noopener noreferrer" className="text-[#0284C7] underline hover:text-sky-400 font-semibold">
                Terms of Service
              </Link>{' '}
              &amp;{' '}
              <Link to="/refund-policy" target="_blank" rel="noopener noreferrer" className="text-[#0284C7] underline hover:text-sky-400 font-semibold">
                Refund Policy
              </Link>
              , and authorize sharing my job details &amp; location with the assigned provider.
            </span>
          ) : type === 'provider_verify' ? (
            <span>
              I certify that these documents are authentic, and consent to WorkWay performing identity verification, background screening, and data processing per the{' '}
              <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#0284C7] underline hover:text-sky-400 font-semibold">
                Privacy Policy
              </Link>.
            </span>
          ) : (
            <span>
              I understand and consent to the platform{' '}
              <Link to="/terms" target="_blank" rel="noopener noreferrer" className="text-[#0284C7] underline hover:text-sky-400 font-semibold">
                Terms
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#0284C7] underline hover:text-sky-400 font-semibold">
                Privacy Policy
              </Link>.
            </span>
          )}
        </label>
      </div>

      {hasError && (
        <div className="flex items-center space-x-1.5 text-rose-500 dark:text-rose-400 text-[11px] font-medium pl-6">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
