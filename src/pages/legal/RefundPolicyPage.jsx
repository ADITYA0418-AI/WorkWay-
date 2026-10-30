import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';
import { RefreshCw, Clock, ShieldCheck, AlertCircle, CheckCircle2, Wallet, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSeo } from '../../lib/useSeo';

export const RefundPolicyPage = () => {
  useSeo({
    title: 'Refund & Cancellation Policy — WorkWay',
    description: 'WorkWay Refund and Cancellation Policy: cancellation windows, refund timelines, workmanship guarantee, and escalation process for disputed bookings.',
    canonical: '/refund-policy',
  });
  return (
    <LegalPageLayout
      title="Refund &amp; Cancellation Policy"
      subtitle="Clear, fair, and transparent guidelines on booking cancellations, job rework guarantees, and payment refunds."
      lastUpdated="October 15, 2026"
    >
      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-border">
        <div className="p-4 rounded-2xl bg-surface-secondary border border-border space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-[#0F766E] dark:text-teal-400 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <h4 className="font-heading font-bold text-xs text-theme-text">5-Minute Free Window</h4>
          <p className="text-[11px] text-theme-text-muted leading-relaxed">
            Cancel any booking within 5 minutes of request confirmation with zero cancellation penalties or deductions.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-surface-secondary border border-border space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="font-heading font-bold text-xs text-theme-text">7-Day Rework Guarantee</h4>
          <p className="text-[11px] text-theme-text-muted leading-relaxed">
            If a completed job has recurring issues or defect in craftsmanship, WorkWay arranges a free technician re-visit or refund.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-surface-secondary border border-border space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
            <Wallet className="w-4 h-4" />
          </div>
          <h4 className="font-heading font-bold text-xs text-theme-text">Rapid Processing</h4>
          <p className="text-[11px] text-theme-text-muted leading-relaxed">
            Instant credit to your WorkWay Wallet or 3-5 business days directly back to your source UPI / Card account.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8 text-xs sm:text-sm text-theme-text-secondary leading-relaxed">
        
        {/* Section 1: Cancellation Matrix */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">1.</span>
            <span>Consumer Cancellation Windows &amp; Charges</span>
          </h2>
          <p>
            We recognize plans change unexpectedly. However, skilled trade technicians block their schedules and travel across neighborhoods to serve you. Our cancellation policy balances fairness for both consumers and providers:
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-2xl bg-surface-secondary border border-border flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-theme-text flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Within 5 Minutes of Booking Confirmation
                </span>
                <p className="text-xs text-theme-text-muted">
                  Provider has not yet departed. 100% full refund including the ₹49 platform service fee.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                100% Free
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-secondary border border-border flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-theme-text flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                  After 5 Minutes (Provider En Route)
                </span>
                <p className="text-xs text-theme-text-muted">
                  Technician is actively traveling to your premises. A nominal ₹50 travel compensation fee is credited to the provider; all remaining prepaid labor is refunded.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 shrink-0">
                ₹50 Travel Fee
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-secondary border border-border flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-theme-text flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  Cancellation After Provider Arrival / Doorstep Inspection
                </span>
                <p className="text-xs text-theme-text-muted">
                  Technician has arrived on premises and conducted problem diagnostics. Standard diagnostic/visitation fee (₹150) applies; any remaining labor fee is refunded.
                </p>
              </div>
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 shrink-0">
                ₹150 Diagnostic Fee
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-secondary border border-border flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-theme-text flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-500 shrink-0" />
                  Provider-Initiated Cancellation or No-Show
                </span>
                <p className="text-xs text-theme-text-muted">
                  If an assigned technician cancels or fails to arrive within 20 minutes of the scheduled window, you receive a 100% full refund plus a ₹100 credit voucher on your next service.
                </p>
              </div>
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 shrink-0">
                100% Refund + Voucher
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: 7-Day Guarantee */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">2.</span>
            <span>7-Day WorkWay Service Quality Guarantee</span>
          </h2>
          <p>
            Your satisfaction is our cornerstone. For all standard skilled trade bookings:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Free Rework:</strong> If the repaired fixture (e.g. leaking valve, faulty switch, loose hinge) malfunctions within 7 calendar days of completion, WorkWay will dispatch a technician for a free rework.</li>
            <li><strong>Full or Partial Labor Refund:</strong> If a rework cannot resolve the issue or if the technician was determined to have caused negligence, WorkWay's dispute center issues a full or proportionate labor refund after auditing photos and job notes.</li>
          </ul>
        </section>

        {/* Section 3: Material Costs */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">3.</span>
            <span>Material &amp; Spare Parts Policy</span>
          </h2>
          <p>
            Because replacement parts (such as circuit breakers, CPVC pipes, wood ply, or specialized paints) are physical goods procured on your behalf:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>All materials require your digital pre-approval in the WorkWay app before purchase.</li>
            <li>Once physically installed or customized to your property, material costs are non-refundable through WorkWay. Any defect in the hardware is subject to the OEM manufacturer's warranty.</li>
            <li>Unused materials with original vendor receipts may be returned to the vendor subject to that merchant's return policy.</li>
          </ul>
        </section>

        {/* Section 4: Refund Timelines */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">4.</span>
            <span>Refund Modes &amp; Settlement Timelines</span>
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-surface-secondary border-b border-border text-theme-text font-bold">
                  <th className="p-3">Payment Mode</th>
                  <th className="p-3">Refund Destination</th>
                  <th className="p-3">Processing Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-3 font-semibold text-theme-text">WorkWay Wallet</td>
                  <td className="p-3">In-App Wallet Balance</td>
                  <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">Instant (within 5 minutes)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-theme-text">UPI (Google Pay, PhonePe, Paytm)</td>
                  <td className="p-3">Linked Bank Account via VPA</td>
                  <td className="p-3">1 - 2 Business Days</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-theme-text">Credit / Debit Card</td>
                  <td className="p-3">Issuing Bank Card Account</td>
                  <td className="p-3">3 - 5 Business Days</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-theme-text">Net Banking</td>
                  <td className="p-3">Source Bank Account</td>
                  <td className="p-3">3 - 7 Business Days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Raising a Claim */}
        <section className="space-y-3 p-5 rounded-2xl bg-surface-secondary border border-border">
          <h3 className="text-sm font-heading font-bold text-theme-text">5. How to Raise a Refund or Cancellation Claim</h3>
          <p className="text-xs text-theme-text-secondary">
            You can manage bookings and submit dispute tickets in three easy ways:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-xs text-theme-text-muted">
            <li>Navigate to <Link to="/consumer/bookings" className="text-[#0284C7] underline font-semibold">My Bookings</Link>, select the booking, and click <strong>Cancel Booking</strong> or <strong>Report Issue / Dispute</strong>.</li>
            <li>Initiate a chat with our automated Resolution Assistant in the in-app chat drawer.</li>
            <li>Email our resolution desk at <a href="mailto:support@workway.app" className="text-[#0284C7] underline font-semibold">support@workway.app</a> or call our customer helpline at <strong>1800 203 4599</strong> (Mon–Sun: 8:00 AM – 9:00 PM IST) with your Booking ID and description.</li>
          </ol>
          <p className="text-[11px] text-theme-text-muted pt-2 border-t border-border">
            WorkWay Hyperlocal Technologies Pvt. Ltd., 4th Floor, Salarpuria Sattva Magnificence, Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103.
          </p>
        </section>

      </div>
    </LegalPageLayout>
  );
};
