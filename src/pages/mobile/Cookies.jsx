import React from "react";
import { useMediaQuery } from "react-responsive";

const NAVY = "#0E2349";
const ORANGE = "#ED6D23";

const Cookies = () => {
  // Responsive breakpoints
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className={`cent-schbk-cyrill mb-4 ${
              isMobile ? "text-3xl" : isTablet ? "text-4xl" : "text-5xl"
            }`}
            style={{ color: NAVY }}
          >
            Cookie Policy
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
                  1. What Are Cookies?
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed">
                  Cookies are small text files that are placed on your computer or mobile device when you 
                  visit a website. They are widely used to make websites work more efficiently and to provide 
                  information to website owners. Cookies allow a website to recognize a user's device and 
                  remember information about their visit.
                </p>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  2. How We Use Cookies
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed mb-4">
                  Amatir Kanya Gurukul uses cookies for several purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 univers-regular text-gray-700">
                  <li>To ensure our website functions properly</li>
                  <li>To remember your preferences and settings</li>
                  <li>To analyze how visitors use our website</li>
                  <li>To improve user experience and website performance</li>
                  <li>To provide personalized content and features</li>
                  <li>To maintain security and prevent fraud</li>
                </ul>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  3. Types of Cookies We Use
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className={`univers-regular font-medium mb-3 ${
                      isMobile ? "text-base" : "text-lg"
                    }`} style={{ color: ORANGE }}>
                      Essential Cookies
                    </h3>
                    <p className="univers-regular text-gray-700 leading-relaxed mb-2">
                      These cookies are necessary for the website to function properly. They enable basic 
                      functions like page navigation, access to secure areas, and remembering your login status.
                    </p>
                    <p className="univers-regular text-sm text-gray-600">
                      <strong>Examples:</strong> Session cookies, authentication cookies, security cookies
                    </p>
                  </div>

                  <div>
                    <h3 className={`univers-regular font-medium mb-3 ${
                      isMobile ? "text-base" : "text-lg"
                    }`} style={{ color: ORANGE }}>
                      Performance Cookies
                    </h3>
                    <p className="univers-regular text-gray-700 leading-relaxed mb-2">
                      These cookies collect information about how visitors use our website, such as which 
                      pages are visited most often and if visitors get error messages. This helps us improve 
                      how our website works.
                    </p>
                    <p className="univers-regular text-sm text-gray-600">
                      <strong>Examples:</strong> Google Analytics cookies, website performance monitoring
                    </p>
                  </div>

                  <div>
                    <h3 className={`univers-regular font-medium mb-3 ${
                      isMobile ? "text-base" : "text-lg"
                    }`} style={{ color: ORANGE }}>
                      Functionality Cookies
                    </h3>
                    <p className="univers-regular text-gray-700 leading-relaxed mb-2">
                      These cookies allow the website to remember choices you make and provide enhanced, 
                      more personal features. They may also be used to provide services you have requested.
                    </p>
                    <p className="univers-regular text-sm text-gray-600">
                      <strong>Examples:</strong> Language preferences, font size settings, form data
                    </p>
                  </div>

                  <div>
                    <h3 className={`univers-regular font-medium mb-3 ${
                      isMobile ? "text-base" : "text-lg"
                    }`} style={{ color: ORANGE }}>
                      Marketing Cookies
                    </h3>
                    <p className="univers-regular text-gray-700 leading-relaxed mb-2">
                      These cookies are used to track visitors across websites to display relevant and 
                      engaging advertisements. They help us measure the effectiveness of our marketing campaigns.
                    </p>
                    <p className="univers-regular text-sm text-gray-600">
                      <strong>Examples:</strong> Social media tracking, advertising network cookies
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  4. Cookie Duration
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className={`univers-regular font-medium mb-2 ${
                      isMobile ? "text-base" : "text-lg"
                    }`} style={{ color: ORANGE }}>
                      Session Cookies
                    </h3>
                    <p className="univers-regular text-gray-700 leading-relaxed">
                      These cookies are temporary and are deleted when you close your browser. They are 
                      used to maintain your session while you navigate through our website.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className={`univers-regular font-medium mb-2 ${
                      isMobile ? "text-base" : "text-lg"
                    }`} style={{ color: ORANGE }}>
                      Persistent Cookies
                    </h3>
                    <p className="univers-regular text-gray-700 leading-relaxed">
                      These cookies remain on your device for a set period or until you delete them. 
                      They help us recognize you when you return to our website and remember your preferences.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  5. Third-Party Cookies
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed mb-4">
                  Some cookies on our website are set by third-party services that appear on our pages. 
                  These may include:
                </p>
                <ul className="list-disc list-inside space-y-2 univers-regular text-gray-700">
                  <li>Google Analytics for website analytics</li>
                  <li>Social media platforms for sharing content</li>
                  <li>Payment processors for online transactions</li>
                  <li>Content delivery networks for faster loading</li>
                </ul>
                <p className="univers-regular text-gray-700 leading-relaxed mt-4">
                  We do not control these third-party cookies. Please refer to their respective privacy 
                  policies for more information.
                </p>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  6. Managing Your Cookie Preferences
                </h2>
                <div className="space-y-4">
                  <p className="univers-regular text-gray-700 leading-relaxed">
                    You have several options for managing cookies:
                  </p>
                  
                  <div>
                    <h3 className={`univers-regular font-medium mb-2 ${
                      isMobile ? "text-base" : "text-lg"
                    }`} style={{ color: ORANGE }}>
                      Browser Settings
                    </h3>
                    <p className="univers-regular text-gray-700 leading-relaxed mb-2">
                      Most web browsers allow you to control cookies through their settings. You can:
                    </p>
                    <ul className="list-disc list-inside space-y-1 univers-regular text-gray-700">
                      <li>Block all cookies</li>
                      <li>Block third-party cookies only</li>
                      <li>Delete existing cookies</li>
                      <li>Set preferences for specific websites</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className={`univers-regular font-medium mb-2 ${
                      isMobile ? "text-base" : "text-lg"
                    }`} style={{ color: ORANGE }}>
                      Cookie Consent
                    </h3>
                    <p className="univers-regular text-gray-700 leading-relaxed">
                      When you first visit our website, you may see a cookie consent banner. You can 
                      choose which types of cookies to accept or reject. You can change your preferences 
                      at any time by clicking the cookie settings link in our website footer.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  7. Impact of Disabling Cookies
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed">
                  If you choose to disable cookies, some features of our website may not function properly. 
                  This may include:
                </p>
                <ul className="list-disc list-inside space-y-2 univers-regular text-gray-700 mt-4">
                  <li>Inability to stay logged in to your account</li>
                  <li>Loss of personalized settings and preferences</li>
                  <li>Reduced website functionality and performance</li>
                  <li>Inability to access certain secure areas</li>
                </ul>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  8. Children's Privacy
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed">
                  We are committed to protecting the privacy of children. We do not knowingly collect 
                  personal information from children under 13 through cookies without parental consent. 
                  Parents can contact us to review, delete, or refuse further collection of their child's 
                  information.
                </p>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  9. Updates to This Policy
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in our practices 
                  or for other operational, legal, or regulatory reasons. We will notify you of any 
                  material changes by posting the updated policy on our website with a new "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className={`univers-regular mb-4 ${
                  isMobile ? "text-xl" : "text-2xl"
                }`} style={{ color: NAVY }}>
                  10. Contact Us
                </h2>
                <p className="univers-regular text-gray-700 leading-relaxed mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
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

export default Cookies;
