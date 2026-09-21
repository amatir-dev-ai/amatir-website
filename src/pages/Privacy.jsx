import React from "react";
import { useMediaQuery } from "react-responsive";

const NAVY = "#0E2349";
const ORANGE = "#ED6D23";

const Privacy = () => {
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
            Privacy Policy
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
                  1. Introduction
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed">
                  Amatir Kanya Gurukul ("we," "our," or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you visit our website or use our services.
                </p>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  2. Information We Collect
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className={`univers-regular font-medium mb-2 ${
                      isMobile ? "text-base" : "text-lg"
                    }`} style={{ color: ORANGE }}>
                      Personal Information
                    </h3>
                    <p className="univers-regular text-gray-700 leading-relaxed">
                      We may collect personal information that you voluntarily provide to us, including:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 univers-regular text-gray-700">
                      <li>Name and contact information (email, phone number, address)</li>
                      <li>Student information (name, grade, academic records)</li>
                      <li>Parent/guardian information</li>
                      <li>Payment and billing information</li>
                      <li>Communication preferences</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className={`univers-regular font-medium mb-2 ${
                      isMobile ? "text-base" : "text-lg"
                    }`} style={{ color: ORANGE }}>
                      Automatically Collected Information
                    </h3>
                    <p className="univers-regular text-gray-700 leading-relaxed">
                      We may automatically collect certain information about your device and usage, including:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 univers-regular text-gray-700">
                      <li>IP address and browser information</li>
                      <li>Pages visited and time spent on our website</li>
                      <li>Device information and operating system</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  3. How We Use Your Information
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc list-inside space-y-2 univers-regular text-gray-700">
                  <li>Providing and maintaining our educational services</li>
                  <li>Processing admissions and enrollment</li>
                  <li>Communicating with parents and students</li>
                  <li>Managing academic records and progress</li>
                  <li>Processing payments and billing</li>
                  <li>Improving our website and services</li>
                  <li>Complying with legal obligations</li>
                  <li>Sending important updates and announcements</li>
                </ul>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  4. Information Sharing and Disclosure
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share 
                  your information in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 univers-regular text-gray-700">
                  <li>With your explicit consent</li>
                  <li>To comply with legal requirements or court orders</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>With trusted service providers who assist in our operations</li>
                  <li>In case of a merger, acquisition, or sale of assets</li>
                </ul>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  5. Data Security
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. However, 
                  no method of transmission over the internet or electronic storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  6. Your Rights
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed mb-4">
                  You have certain rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 univers-regular text-gray-700">
                  <li>Access and review your personal information</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to processing of your information</li>
                  <li>Withdraw consent where applicable</li>
                  <li>Data portability rights</li>
                </ul>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  7. Cookies and Tracking Technologies
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your experience on our website. 
                  You can control cookie settings through your browser preferences. Please refer to our 
                  Cookie Policy for more detailed information.
                </p>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  8. Children's Privacy
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed">
                  We are committed to protecting the privacy of children. We collect personal information 
                  from children only with parental consent and in accordance with applicable laws. Parents 
                  have the right to review, delete, or refuse further collection of their child's information.
                </p>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  9. Changes to This Privacy Policy
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                  We encourage you to review this Privacy Policy periodically.
                </p>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  10. Contact Us
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
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

export default Privacy;
