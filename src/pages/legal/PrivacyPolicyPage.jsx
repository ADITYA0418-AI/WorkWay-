import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';
import { Shield, MapPin, Eye, Lock, UserCheck, FileText, PhoneCall, AlertCircle } from 'lucide-react';
import { useSeo } from '../../lib/useSeo';

export const PrivacyPolicyPage = () => {
  useSeo({
    title: 'Privacy Policy — WorkWay Hyperlocal Technologies',
    description: 'Learn how WorkWay collects, uses, and protects your personal data including GPS location, payment info, and booking history in compliance with the DPDP Act 2023.',
    canonical: '/privacy-policy',
  });
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="How WorkWay collects, uses, protects, and handles your personal and hyperlocal service data."
      lastUpdated="October 15, 2026"
    >
      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-border">
        <div className="p-4 rounded-2xl bg-surface-secondary border border-border space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-[#0F766E] dark:text-teal-400 flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
          <h4 className="font-heading font-bold text-xs text-theme-text">Hyperlocal Coordinates</h4>
          <p className="text-[11px] text-theme-text-muted leading-relaxed">
            GPS data is solely used to calculate distance matches and dispatch nearby technicians. Exact coordinates are never sold.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-surface-secondary border border-border space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
            <PhoneCall className="w-4 h-4" />
          </div>
          <h4 className="font-heading font-bold text-xs text-theme-text">Masked Communications</h4>
          <p className="text-[11px] text-theme-text-muted leading-relaxed">
            Direct phone numbers between customers and technicians are protected via virtual number masking and in-app messaging.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-surface-secondary border border-border space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <h4 className="font-heading font-bold text-xs text-theme-text">Your Data Rights</h4>
          <p className="text-[11px] text-theme-text-muted leading-relaxed">
            Full compliance with DPDP Act 2023. You can review, download, or request erasure of your account and service records anytime.
          </p>
        </div>
      </div>

      {/* Policy Content */}
      <div className="space-y-8 text-xs sm:text-sm text-theme-text-secondary leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">1.</span>
            <span>Introduction &amp; Scope</span>
          </h2>
          <p>
            WorkWay Hyperlocal Technologies Private Limited ("WorkWay", CIN: U72900KA2024PTC189421, "we", "our", or "us") operates the WorkWay hyperlocal skilled trades marketplace accessible through web and mobile interfaces. We are dedicated to maintaining strict transparency and security in handling data relating to consumers, skilled service professionals ("Providers"), society apartment residents, and marketplace administrators.
          </p>
          <p>
            This Privacy Policy explains the nature of personal information collected, the technical and business reasons for its processing, and your rights concerning your personal data in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">2.</span>
            <span>Information We Collect</span>
          </h2>
          <p>We collect information in the following categories:</p>
          
          <div className="space-y-3 pl-2 sm:pl-4">
            <div className="p-3.5 rounded-xl bg-surface-secondary border border-border">
              <strong className="text-theme-text block mb-1">A. Account &amp; Profile Information</strong>
              <span>Name, email address, mobile phone number, profile photo, and role preference (Consumer or Provider). For Providers, this includes trade specialty (Electrician, Plumber, Carpenter, Maid, Handyman), certifications, and hourly billing rates.</span>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-secondary border border-border">
              <strong className="text-theme-text block mb-1">B. Hyperlocal Geolocation Data</strong>
              <span>With your permission, we capture precise GPS coordinates (latitude/longitude) or user-entered landmark/address information to compute radial distance queries using PostGIS spatial indexing. For active service bookings, real-time technician GPS is relayed to the customer for en-route tracking.</span>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-secondary border border-border">
              <strong className="text-theme-text block mb-1">C. Provider Verification &amp; KYC Records</strong>
              <span>To maintain safety on our 3-tier verification standard (Basic Verified, Background Cleared, Master Pro), we collect government ID copies (Aadhaar / Voter ID), Police Clearance Certificates, trade diplomas, and liability insurance proofs. These files are stored in access-restricted storage buckets.</span>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-secondary border border-border">
              <strong className="text-theme-text block mb-1">D. Service Requests, Media &amp; AI Job Diagnosis</strong>
              <span>Photos or descriptions uploaded by consumers when diagnosing electrical faults, pipe leakages, or structural repairs using the Gemini AI Diagnosis Tool.</span>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">3.</span>
            <span>How We Use Your Information</span>
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Automated Hyperlocal Matching:</strong> Executing the WorkWay Match Algorithm (Distance, Availability, Skill, Rating, Response Speed) to connect consumers with nearby available technicians.</li>
            <li><strong>Service Dispatch &amp; Safety:</strong> Enabling real-time job arrival tracking, OTP start-job verification, and emergency dispatch.</li>
            <li><strong>Privacy-Preserving Contact:</strong> Masking telephone numbers and facilitating encrypted in-app WebSocket chats and voice connections.</li>
            <li><strong>Payment &amp; Invoicing:</strong> Generating digital invoices, material cost approval receipts, and processing provider payout withdrawals.</li>
            <li><strong>Fraud Prevention &amp; Trust:</strong> Detecting suspicious activity, account sharing, or fake reviews through platform telemetry.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">4.</span>
            <span>Data Sharing and Disclosure</span>
          </h2>
          <p>
            WorkWay does not sell, rent, or trade your personal data to third parties for marketing purposes. Data is only shared in the following situations:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>With Matched Service Providers:</strong> When a consumer confirms a booking, the assigned provider receives the service address, job description, and consumer first name to fulfill the task.</li>
            <li><strong>Payment Gateways &amp; Banking Partners:</strong> Encrypted transaction data sent to PCI-DSS compliant payment gateways for UPI, card, and net-banking transactions.</li>
            <li><strong>Legal &amp; Regulatory Authorities:</strong> When required by court order, law enforcement investigation, or under applicable statutory requirements.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">5.</span>
            <span>Security Measures &amp; Data Storage</span>
          </h2>
          <p>
            We implement industry-standard administrative, physical, and technical safeguards. All communications are encrypted over TLS 1.3 in transit. Databases are protected via PostgreSQL Row Level Security (RLS) policies ensuring users can only read records authorized by their authenticated JWT token.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-heading font-bold text-theme-text flex items-center space-x-2">
            <span className="text-[#0F766E] dark:text-teal-400">6.</span>
            <span>Your Rights (DPDP Act &amp; Global Standards)</span>
          </h2>
          <p>Under applicable data privacy laws, you possess the following rights:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-surface-secondary border border-border">
              <strong className="text-theme-text block text-xs">Right to Access &amp; Summary</strong>
              <span className="text-[11px] text-theme-text-muted">Request a readable summary of all personal data held by WorkWay.</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-secondary border border-border">
              <strong className="text-theme-text block text-xs">Right to Correction &amp; Erasure</strong>
              <span className="text-[11px] text-theme-text-muted">Update outdated records or request permanent deletion of your profile.</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-secondary border border-border">
              <strong className="text-theme-text block text-xs">Right to Withdraw Consent</strong>
              <span className="text-[11px] text-theme-text-muted">Withdraw cookie or location tracking consent at any time via settings.</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-secondary border border-border">
              <strong className="text-theme-text block text-xs">Right of Grievance Redressal</strong>
              <span className="text-[11px] text-theme-text-muted">Escalate unresolved privacy inquiries directly to our designated Grievance Officer.</span>
            </div>
          </div>
        </section>

        {/* Section 7 */}
        <section className="space-y-3 p-5 rounded-2xl bg-surface-secondary border border-border">
          <h3 className="text-sm font-heading font-bold text-theme-text">7. Grievance Redressal Officer Contact Details</h3>
          <p className="text-xs text-theme-text-secondary">
            In accordance with the Information Technology Act 2000, Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules 2021, and DPDP Act 2023, the details of the designated Grievance Officer are:
          </p>
          <div className="text-xs space-y-1.5 text-theme-text-muted">
            <p><strong className="text-theme-text">Officer Name:</strong> Priya R.</p>
            <p><strong className="text-theme-text">Designation:</strong> Principal Grievance &amp; Data Protection Officer</p>
            <p><strong className="text-theme-text">Corporate Entity:</strong> WorkWay Hyperlocal Technologies Private Limited</p>
            <p><strong className="text-theme-text">CIN:</strong> U72900KA2024PTC189421</p>
            <p><strong className="text-theme-text">Email:</strong> <a href="mailto:grievance@workway.app" className="text-[#0284C7] underline font-semibold">grievance@workway.app</a></p>
            <p><strong className="text-theme-text">Phone:</strong> +91 80 4567 8910</p>
            <p><strong className="text-theme-text">Registered Office Address:</strong> 4th Floor, Salarpuria Sattva Magnificence, Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103, India</p>
            <p><strong className="text-theme-text">Resolution SLA:</strong> Acknowledgment within 48 hours; resolution within 15 business days</p>
          </div>
        </section>

        {/* Section 8: Third-Party Embeds & Image Copyright */}
        <section className="space-y-3 p-5 rounded-2xl bg-surface-secondary border border-border">
          <h3 className="text-sm font-heading font-bold text-theme-text">8. Third-Party Embeds, Geolocation &amp; Image Copyright</h3>
          <div className="text-xs space-y-2 text-theme-text-secondary">
            <p>
              <strong>Third-Party Geospatial &amp; Payment Embeds:</strong> To render live technician discovery maps, WorkWay embeds OpenStreetMap tile services via Leaflet. All map tiles are copyrighted by OpenStreetMap contributors under the Open Database License (ODbL). Payment processing SDKs (Razorpay) are loaded asynchronously over encrypted TLS connections with <code>crossorigin="anonymous"</code>.
            </p>
            <p>
              <strong>Image Copyright &amp; Licensing:</strong> Demonstrative worker profile photos, technician avatars, and task portfolio photography on the marketplace are licensed under the Unsplash Open Community License. Logos, custom badge emblems, and brand designs are proprietary trademarks of WorkWay Hyperlocal Technologies Pvt. Ltd.
            </p>
          </div>
        </section>

      </div>
    </LegalPageLayout>
  );
};
