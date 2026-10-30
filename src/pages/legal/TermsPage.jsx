import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';
import { Scale, CheckCircle2, AlertTriangle, ShieldCheck, DollarSign, Clock } from 'lucide-react';
import { useSeo } from '../../lib/useSeo';

export const TermsPage = () => {
  useSeo({
    title: 'Terms and Conditions — WorkWay',
    description: 'WorkWay Terms and Conditions governing use of the hyperlocal home services marketplace, provider obligations, payment rules, and dispute resolution.',
    canonical: '/terms',
  });
  return (
    <LegalPageLayout
      title="Terms and Conditions"
      subtitle="The contractual terms governing your use of the WorkWay marketplace, services, and applications."
      lastUpdated="October 15, 2026"
    >
      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-border">
        <div className="p-4 rounded-2xl bg-surface-secondary border border-border space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-[#0F766E] dark:text-teal-400 flex items-center justify-center">
            <Scale className="w-4 h-4" />
          </div>
          <h4 className="font-heading font-bold text-xs text-theme-text">Marketplace Intermediary</h4>
          <p className="text-[11px] text-theme-text-muted leading-relaxed">
            WorkWay connects consumers with verified independent trade professionals. Service contracts are between consumer and provider.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-surface-secondary border border-border space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
          <h4 className="font-heading font-bold text-xs text-theme-text">Transparent Pricing</h4>
          <p className="text-[11px] text-theme-text-muted leading-relaxed">
            Standard ₹49 platform service fee. All physical material costs require explicit digital approval in-app before purchase.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-surface-secondary border border-border space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="font-heading font-bold text-xs text-theme-text">Service Guarantee</h4>
          <p className="text-[11px] text-theme-text-muted leading-relaxed">
            Qualified completed jobs are backed by our 7-Day WorkWay Rework Guarantee if workmanship doesn't meet standard benchmarks.
          </p>
        </div>
      </div>

      {/* Terms Body */}
      <div className="space-y-8 text-xs sm:text-sm text-theme-text-secondary leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">1.</span>
            <span>Agreement &amp; Eligibility</span>
          </h2>
          <p>
            Welcome to WorkWay ("To GET WORK &amp; TO GET WORK DONE"), operated by WorkWay Hyperlocal Technologies Private Limited ("WorkWay", CIN: U72900KA2024PTC189421, "we", "us", or "our"). By signing up, browsing, or utilizing the WorkWay marketplace, you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree with any provision of these Terms, you must immediately discontinue use of the platform.
          </p>
          <p>
            You must be at least 18 years of age and possess legal capacity to enter into binding agreements under applicable law. If registering on behalf of a residential society, apartment association, or business entity, you warrant that you are authorized to bind that entity.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">2.</span>
            <span>Role of WorkWay as a Technology Platform</span>
          </h2>
          <p>
            WorkWay operates as a technology intermediary platform connecting residential homeowners, tenants, and business users ("Consumers") with skilled, verified independent service technicians ("Providers") across specialized trade categories (Electricians, Plumbers, Carpenters, Housemaids, Handymen).
          </p>
          <p>
            Unless explicitly specified under a managed enterprise contract, Providers are independent contractors and not employees, partners, or agents of WorkWay. WorkWay provides matching, scheduling, communication, dispatch verification, and payment settlement infrastructure.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">3.</span>
            <span>Consumer Rights &amp; Responsibilities</span>
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Safe Premises:</strong> Consumers agree to provide a safe, harassment-free environment for providers performing on-site service.</li>
            <li><strong>Accurate Service Details:</strong> Consumers must furnish accurate descriptions and photos of the problem to ensure proper tool and spare part preparation.</li>
            <li><strong>Material Approvals:</strong> Any replacement parts, wiring, pipes, or hardware must be verified and approved through the in-app digital material approval workflow before provider purchase.</li>
            <li><strong>Prompt Payment:</strong> Once service milestones or job completion is certified via customer OTP, payment must be released without undue delay.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">4.</span>
            <span>Provider Obligations &amp; Verification Standards</span>
          </h2>
          <p>
            All Providers registered on WorkWay agree to our 3-Level Verification Protocol:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-surface-secondary border border-border">
              <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider block">Level 1</span>
              <strong className="text-theme-text text-xs block">Basic Verified</strong>
              <p className="text-[11px] text-theme-text-muted mt-1">Mobile OTP, Aadhaar/Government ID verification, and selfie match.</p>
            </div>
            <div className="p-3 rounded-xl bg-surface-secondary border border-border">
              <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">Level 2</span>
              <strong className="text-theme-text text-xs block">Background Cleared</strong>
              <p className="text-[11px] text-theme-text-muted mt-1">Police Clearance Certificate (PCC), physical address verification, and trade skill test.</p>
            </div>
            <div className="p-3 rounded-xl bg-surface-secondary border border-border">
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">Level 3</span>
              <strong className="text-theme-text text-xs block">Master Pro</strong>
              <p className="text-[11px] text-theme-text-muted mt-1">100+ completed jobs, 4.8+ rating score, and verified liability insurance.</p>
            </div>
          </div>
          <p className="pt-2">
            Providers agree to adhere to strict professional conduct, carry necessary safety equipment, maintain punctual arrival times, and accurately bill for work performed.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">5.</span>
            <span>Pricing, Invoicing &amp; Platform Fees</span>
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Labour Rates:</strong> Provider profiles transparently display hourly or task-based standard pricing.</li>
            <li><strong>Platform Convenience Fee:</strong> A nominal ₹49 platform service fee is applied per confirmed service booking to maintain geolocation dispatch infrastructure and customer support.</li>
            <li><strong>Provider Subscriptions:</strong> Providers can choose between Pay-Per-Lead fees or the Pro Unlimited monthly plan (₹1,650/month) for zero-commission lead access.</li>
            <li><strong>Taxes:</strong> All applicable GST or statutory levies will be itemized on the digital invoice generated upon job completion.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">6.</span>
            <span>Emergency Mode &amp; High Urgency Dispatch</span>
          </h2>
          <p>
            When utilizing Emergency Mode (e.g. major water pipe bursts, electrical short circuits), WorkWay prioritizes nearby active technicians within an expedited dispatch radius. Emergency dispatch may involve premium emergency labor rates which are displayed prior to booking confirmation.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">7.</span>
            <span>Limitation of Liability &amp; Disclaimers</span>
          </h2>
          <p>
            While WorkWay exercises thorough due diligence through its multi-tier verification process, WorkWay shall not be liable for indirect, incidental, punitive, or consequential damages resulting from provider craftsmanship, site accidents, or unforeseen structural faults. WorkWay's aggregate liability under any circumstances is limited to the fees collected by WorkWay for that specific booking or ₹2,000, whichever is lower.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">8.</span>
            <span>Governing Law &amp; Dispute Resolution</span>
          </h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of India. Any disputes arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the competent courts located in Bengaluru, Karnataka.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">9.</span>
            <span>Intellectual Property, Image Copyright &amp; Third-Party Services</span>
          </h2>
          <div className="space-y-2 text-theme-text-secondary">
            <p>
              All trademarks, software architectures, algorithms, logos, and UI designs of WorkWay are proprietary assets of WorkWay Hyperlocal Technologies Pvt. Ltd. Demonstrative portfolio photos and worker avatars are sourced under the Unsplash Open License. Interactive map layers are provided by OpenStreetMap contributors under the Open Database License (ODbL). Payment services are facilitated by Razorpay.
            </p>
          </div>
        </section>

        {/* Section 10 */}
        <section className="space-y-3 p-5 rounded-2xl bg-surface-secondary border border-border">
          <h3 className="text-sm font-heading font-bold text-theme-text">10. Corporate Registry &amp; Grievance Redressal</h3>
          <div className="text-xs space-y-1.5 text-theme-text-muted">
            <p><strong className="text-theme-text">Corporate Name:</strong> WorkWay Hyperlocal Technologies Private Limited</p>
            <p><strong className="text-theme-text">CIN:</strong> U72900KA2024PTC189421 | <strong className="text-theme-text">GSTIN:</strong> 29AABCW9871P1ZX</p>
            <p><strong className="text-theme-text">Registered Office:</strong> 4th Floor, Salarpuria Sattva Magnificence, Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103, India</p>
            <p><strong className="text-theme-text">Grievance Officer:</strong> Priya R. (Email: <a href="mailto:grievance@workway.app" className="text-[#0284C7] underline font-semibold">grievance@workway.app</a> | Phone: +91 80 4567 8910)</p>
          </div>
        </section>

      </div>
    </LegalPageLayout>
  );
};
