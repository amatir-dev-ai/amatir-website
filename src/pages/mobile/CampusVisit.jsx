// CampusVisit.jsx
import React, { useEffect, useRef, useState } from "react";
import { Play, Download } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

/* Brand palette */
const NAVY = "#0E2349";
const NAVY2 = "#1C3664";
const ORANGE = "#ED6D23";
const LIGHT_BG = "#F6F8FB";

/* Cloudinary assets */
const ASSETS = {
  hero: "/images/3_10_xq0avb.jpg",
  accent: "/images/Orange_Icon_i299iz.svg",
  videoThumb: "/images/Rectangle_98_qeqks9.jpg",
  bannerImg: "/images/Rectangle_63_byhglx.jpg",
};

export default function CampusVisit() {
  // Responsive breakpoints - updated to handle 1265x585 and similar resolutions
  const isSmallMobile = useMediaQuery({ maxWidth: 480 });
  const isMobile = useMediaQuery({ minWidth: 481, maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isLandscapeTablet = useMediaQuery({ minWidth: 1024, maxWidth: 1366 }); // Covers 1265x585
  const isDesktop = useMediaQuery({ minWidth: 1367 });
  const isNarrowScreen = useMediaQuery({ maxWidth: 1300 }); // For narrow landscape screens
  const isVerySmallScreen = useMediaQuery({ maxWidth: 1024 });
  const isLowHeight = useMediaQuery({ maxHeight: 600 });
  const [showVideo, setShowVideo] = useState(false);
  const crmContainerRef = useRef(null);
  // Calculate proper hero section height accounting for header
  const getHeroHeight = () => {
    if (isSmallMobile || isMobile) return "calc(100vh - 4rem)"; // Account for mobile header (64px)
    if (isVerySmallScreen) return "calc(100vh - 5rem)"; // Account for small laptop header (80px)
    if (isLowHeight) return "calc(100vh - 4.5rem)"; // Account for low height screens
    return "calc(100vh - 5.5rem)"; // Account for desktop header (88px)
  };
  useEffect(() => {
    const container = crmContainerRef.current;
    if (container) {
      container.innerHTML = ""; // Clear existing content to prevent duplicates on re-render

      const baseUrl = 'https://connect.amatir.org/CRM/forms/public/21';
      const currentUrl = window.location.href;
      const iframeSrc = baseUrl + '?embed=1&landing_url=' + encodeURIComponent(currentUrl);

      const iframe = document.createElement('iframe');
      iframe.id = 'crm-form-21';
      iframe.src = iframeSrc;
      iframe.style.width = '100%';
      iframe.style.height = '480px';
      iframe.style.border = '0';

      container.appendChild(iframe);
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-white text-slate-800 overflow-x-hidden">
      {/* ====== HERO (keep; no header/footer) ====== */}
      <section
        className="relative"
        style={{ height: "100vh", marginTop: "60px" }}
      >
        <img
          src={ASSETS.hero}
          alt="Campus aerial"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(14,35,73,0.35)" }}
        />
        <div className="absolute inset-x-0 bottom-[12%] flex flex-col items-center justify-end px-4">
          <img
            src={ASSETS.accent}
            alt=""
            className={`mb-4 opacity-95 ${isSmallMobile
              ? "h-6 w-6"
              : isMobile
                ? "h-8 w-8"
                : isLandscapeTablet
                  ? "h-9 w-9"
                  : "h-10 w-10"
              }`}
          />
          <h1
            className={`px-4 text-center font-serif leading-none text-white ${isSmallMobile
              ? "text-[28px]"
              : isMobile
                ? "text-[32px]"
                : isTablet
                  ? "text-[48px]"
                  : isLandscapeTablet
                    ? "text-[56px]"
                    : "text-[64px]"
              }`}
            style={{
              textShadow: "0 2px 14px rgba(0,0,0,.25)",
              marginBottom: "35%",
            }}
          >
            Campus Visit
          </h1>
        </div>
      </section>

      {/* ====== SEE IT FOR YOURSELF ====== */}
      <section
        className={`mx-auto ${isSmallMobile ? "w-[95%]" : isNarrowScreen ? "w-[94%]" : "w-[92%]"
          } ${isNarrowScreen ? "max-w-[1200px]" : "max-w-[1180px]"} ${isSmallMobile
            ? "py-8"
            : isMobile
              ? "py-10"
              : isLandscapeTablet
                ? "py-12"
                : "py-12 md:py-20"
          }`}
      >
        <div
          className={`flex flex-col items-start ${isMobile ? "gap-6" : isLandscapeTablet ? "gap-8" : "gap-10"
            } ${isTablet || isLandscapeTablet
              ? "md:flex-row md:items-center md:gap-8"
              : "md:flex-row md:items-center md:gap-14"
            }`}
        >
          <div className="w-full md:w-1/2">
            <h2
              className={`mb-4 font-serif ${isSmallMobile
                ? "text-[24px]"
                : isMobile
                  ? "text-[28px]"
                  : isLandscapeTablet
                    ? "text-[32px]"
                    : "text-[30px] md:text-[40px]"
                }`}
              style={{ color: NAVY2 }}
            >
              See It for Yourself
            </h2>
            <div
              className={`space-y-5 text-slate-700 ${isSmallMobile
                ? "text-[14px] leading-6"
                : isMobile
                  ? "text-[15px] leading-7"
                  : isLandscapeTablet
                    ? "text-[16px] leading-7"
                    : "text-[16px] leading-7 md:text-[17px] md:leading-8"
                }`}
            >
              <p>
                Step into the world of Amatir—an inspiring girls gurukul in
                Kurukshetra, Haryana. Nestled in a scenic, secure, and
                pollution-free 30-acre campus, Amatir offers a vibrant
                residential experience for over 300 girls. During your
                interactive school visit, you’ll explore our thoughtfully
                designed school and hostel facilities, meet our educators, and
                witness a unique blend of modern CBSE education and timeless
                Indian values.
              </p>
              <p>
                We place special emphasis on discipline, culture, and holistic
                development—ensuring that every child grows with clarity,
                confidence, and character.
              </p>
              <p>
                We place special emphasis on discipline, culture, and holistic
                development—ensuring that every child grows with clarity,
                confidence, and character.
              </p>
            </div>
          </div>

          {/* Video teaser */}
          <div className="w-full md:w-1/2">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img
                src={ASSETS.videoThumb}
                alt="Campus life video"
                className="h-full w-full object-cover"
              />
              <button
                aria-label="Play video"
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 backdrop-blur hover:bg-white ${isSmallMobile
                  ? "p-3"
                  : isMobile
                    ? "p-4"
                    : isLandscapeTablet
                      ? "p-4"
                      : "p-5"
                  }`}
                onClick={() => setShowVideo(true)}
              >
                <Play
                  className={`${isSmallMobile
                    ? "h-6 w-6"
                    : isMobile
                      ? "h-7 w-7"
                      : isLandscapeTablet
                        ? "h-7 w-7"
                        : "h-8 w-8"
                    }`}
                  style={{ color: NAVY }}
                />
              </button>
            </div>

            {showVideo && (
              <div
                className="fixed inset-0 z-50"
                onClick={(e) =>
                  e.target === e.currentTarget && setShowVideo(false)
                }
              >
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 pt-18">
                  <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
                    <div className="aspect-video">
                      <iframe
                        title="Campus Video"
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/U5qyakZJKX4?autoplay=1&rel=0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setShowVideo(false)}
                    className="mt-4 inline-flex items-center bg-white text-slate-800 px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====== REGISTRATION FORM — matches desktop screenshot ====== */}
      <section
        className={`${isSmallMobile
          ? "py-12"
          : isMobile
            ? "py-14"
            : isLandscapeTablet
              ? "py-16"
              : "py-16 md:py-20"
          }`}
        style={{ background: LIGHT_BG }}
      >
        <div
          className={`mx-auto ${isSmallMobile ? "w-[95%]" : isNarrowScreen ? "w-[94%]" : "w-[92%]"
            } ${isNarrowScreen ? "max-w-[800px]" : "max-w-[760px]"}`}
        >
          <h3
            className={`text-center font-serif leading-tight ${isSmallMobile
              ? "text-[24px]"
              : isMobile
                ? "text-[26px]"
                : isLandscapeTablet
                  ? "text-[30px]"
                  : "text-[28px] md:text-[34px]"
              }`}
            style={{ color: NAVY2 }}
          >
            Campus Visit Registration Form
          </h3>
          <p
            className={`mx-auto mt-3 ${isNarrowScreen ? "max-w-[720px]" : "max-w-[680px]"
              } text-center ${isSmallMobile
                ? "text-[14px] leading-6"
                : isMobile
                  ? "text-[15px] leading-7"
                  : isLandscapeTablet
                    ? "text-[15px] leading-7"
                    : "text-[15px] md:text-[16px] leading-7"
              } text-slate-600`}
          >
            Please fill out the form below to schedule your visit and let us
            know your preferred date and time. Our admissions team will get in
            touch with you shortly.
          </p>
          <div
            className="w-full mt-8 rounded-xl overflow-hidden relative"
            style={{
              minHeight: "480px",
            }}
          >
            <div ref={crmContainerRef} id="crm-form-container-21" className="w-full h-full" />
          </div>
        </div>
      </section>

      {/* ====== ORANGE BANNER (Download) ====== */}
      <section className="relative w-full">
        <img
          src={ASSETS.bannerImg}
          alt=""
          className={`w-full object-cover ${isSmallMobile
            ? "h-[200px]"
            : isMobile
              ? "h-[240px]"
              : isLandscapeTablet
                ? "h-[280px]"
                : "h-[260px] md:h-[300px]"
            }`}
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(237,109,35,0.88)" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
          <h3
            className={`font-serif ${isSmallMobile
              ? "text-[22px]"
              : isMobile
                ? "text-[24px]"
                : isLandscapeTablet
                  ? "text-[30px]"
                  : "text-[26px] md:text-[34px]"
              }`}
          >
            Unlock her future!
          </h3>
          <p
            className={`mt-2 ${isNarrowScreen ? "max-w-[720px]" : "max-w-[680px]"
              } ${isSmallMobile
                ? "text-[14px] leading-6"
                : isMobile
                  ? "text-[15px] leading-7"
                  : isLandscapeTablet
                    ? "text-[15px] leading-7"
                    : "text-[15px] leading-7 md:text-[16px]"
              }`}
          >
            Guided by Dharma, Prepared for the World.
          </p>
          <Link
            to="/contact"
            className={`mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2 font-semibold text-white ${isSmallMobile ? "text-[14px]" : "text-[15px]"
              }`}
            style={{ background: NAVY }}
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* ====== MAP ====== */}
      <section className="relative w-full">
        <iframe
          title="Amatir Kanya Gurukul Location"
          className={`w-full ${isSmallMobile
            ? "h-[300px]"
            : isMobile
              ? "h-[360px]"
              : isLandscapeTablet
                ? "h-[400px]"
                : "h-[420px] md:h-[520px]"
            }`}
          src="https://www.google.com/maps?q=Amatir%20Kanya%20Gurukul%20Kurukshetra&output=embed&z=12"
          loading="lazy"
        />
      </section>
    </div>
  );
}
