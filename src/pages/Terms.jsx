import React from "react";
import { useMediaQuery } from "react-responsive";

const NAVY = "#0E2349";
const ORANGE = "#ED6D23";

const Terms = () => {
  // Responsive breakpoints
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-15">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className={`cent-schbk-cyrill mb-4 ${
              isMobile ? "text-3xl" : isTablet ? "text-4xl" : "text-5xl"
            }`}
            style={{ color: NAVY }}
          >
            Terms of Service
          </h1>
          <p className={`univers-regular text-gray-600 ${
            isMobile ? "text-sm" : "text-base"
          } hidden`}>
            Last updated: January 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  1. Acceptance of Terms
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed">
                  By accessing and using the Amatir Kanya Gurukul website and services, you accept and agree 
                  to be bound by the terms and provision of this agreement. If you do not agree to abide by 
                  the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  2. Use License
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed mb-4">
                  Permission is granted to temporarily download one copy of the materials on Amatir Kanya Gurukul's 
                  website for personal, non-commercial transitory viewing only. This is the grant of a license, 
                  not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 univers-regular text-gray-700">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  3. Educational Services
                </h2>
                <div className="space-y-4">
                  <p className="univers-regular text-gray-700 leading-relaxed">
                    Amatir Kanya Gurukul provides educational services including but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 univers-regular text-gray-700">
                    <li>Academic instruction and curriculum delivery</li>
                    <li>Student assessment and evaluation</li>
                    <li>Co-curricular activities and programs</li>
                    <li>Boarding facilities and residential care</li>
                    <li>Parent communication and reporting</li>
                  </ul>
                  <p className="univers-regular text-gray-700 leading-relaxed">
                    All educational services are subject to the school's academic policies, admission criteria, 
                    and disciplinary procedures as outlined in the school handbook.
                  </p>
                </div>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  4. User Accounts and Responsibilities
                </h2>
                <div className="space-y-4">
                  <p className="univers-regular text-gray-700 leading-relaxed">
                    When creating an account or using our services, you agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 univers-regular text-gray-700">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and update your information to keep it accurate</li>
                    <li>Maintain the security of your password and account</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  5. Payment Terms
                </h2>
                <div className="space-y-4">
                  <p className="univers-regular text-gray-700 leading-relaxed">
                    Payment terms for school fees and other charges:
                  </p>
                  <ul className="list-disc list-inside space-y-2 univers-regular text-gray-700">
                    <li>All fees are due as per the school's fee structure and schedule</li>
                    <li>Late payment charges may apply for overdue amounts</li>
                    <li>Refund policies are subject to school regulations and applicable laws</li>
                    <li>Payment methods accepted include bank transfers, cheques, and online payments</li>
                    <li>Fee structure may be revised with prior notice to parents/guardians</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  6. Prohibited Uses
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed mb-4">
                  You may not use our website or services:
                </p>
                <ul className="list-disc list-inside space-y-2 univers-regular text-gray-700">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                </ul>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  7. Privacy and Data Protection
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your 
                  use of the website, to understand our practices. We are committed to protecting student 
                  privacy and complying with applicable data protection laws.
                </p>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  8. Intellectual Property Rights
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed">
                  The website and its original content, features, and functionality are and will remain the 
                  exclusive property of Amatir Kanya Gurukul and its licensors. The website is protected by 
                  copyright, trademark, and other laws. Our trademarks and trade dress may not be used in 
                  connection with any product or service without our prior written consent.
                </p>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  9. Limitation of Liability
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed">
                  In no event shall Amatir Kanya Gurukul, nor its directors, employees, partners, agents, 
                  suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, 
                  or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                  or other intangible losses, resulting from your use of the website or services.
                </p>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  10. Termination
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed">
                  We may terminate or suspend your account and bar access to the website immediately, without 
                  prior notice or liability, under our sole discretion, for any reason whatsoever and without 
                  limitation, including but not limited to a breach of the Terms.
                </p>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  11. Governing Law
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed">
                  These Terms shall be interpreted and governed by the laws of India. Any disputes arising 
                  from these terms or the use of our services shall be subject to the jurisdiction of the 
                  courts in Kurukshetra, Haryana.
                </p>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  12. Changes to Terms
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                  If a revision is material, we will provide at least 30 days notice prior to any new terms 
                  taking effect. Your continued use of the website after any such changes constitutes your 
                  acceptance of the new Terms.
                </p>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  13. Contact Information
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="space-y-2 univers-regular text-gray-700">
                    <p><strong>Email:</strong> info@amatir.org</p>
                    <p><strong>Phone:</strong> +91 7027570124</p>
                    <p><strong>Address:</strong> Amatir Kanya Gurukul, Bachgaon Gamri, Lukhi Road, Kurukshetra, Haryana 136119</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
