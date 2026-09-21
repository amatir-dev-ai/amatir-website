// Footer.jsx
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const NAVY = "#0E2349";
const ORANGE = "#ED6D23";

const Footer = () => {
  // Responsive breakpoints
  const isLargeLaptop = useMediaQuery({ minWidth: 1200 });
  const isLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1199 });
  const isSmallLaptop = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isVerySmallLaptop = useMediaQuery({
    minWidth: 1024,
    maxWidth: 1100,
    maxHeight: 700,
  });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const location = useLocation();
  const ifReachoutPage = location.pathname.startsWith('/reachout');
  const reachout_meta = location.pathname.startsWith('/reachout_meta');
  const vidyashri = location.pathname.startsWith('/vidyashri');

  const quickLinks = [
    { label: "Admissions", href: "/admissions" },
    { label: "Academics", href: "/academics" },
    { label: "Boarding", href: "/boarding" },
    { label: "Facilities", href: "/facilities" },
    { label: "Life at Amatir", href: "/life-at-amatir" },
    {
      label: "Parent Login",
      href: "https://amatir.edunexttechnologies.com/Index",
    },
  ];

  const Cta = ({ children, href }) => {
    // Responsive width based on screen size
    const getMaxWidth = () => {
      if (isVerySmallLaptop) return "max-w-[180px]";
      if (isLargeLaptop) return "max-w-[260px]";
      if (isLaptop) return "max-w-[220px]";
      if (isSmallLaptop) return "max-w-[200px]";
      return "max-w-[260px]"; // mobile
    };

    return (
      <a
        href={href}
        className={`
          flex h-11 w-full ${getMaxWidth()} items-center justify-center
          rounded-full border border-white/70 px-6 text-center
          font-roboto text-[15px] leading-none
          transition-colors hover:bg-white hover:text-[#1C3664]
        `}
        style={{ color: ORANGE }}
      >
        {children}
      </a>
    );
  };

  const Icon = ({ children }) => (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      {children}
    </svg>
  );

  return (
    <footer className="w-full">
      {/* ===================== Upper band ===================== */}
      <div
        className="relative w-full text-white"
        style={{ backgroundColor: NAVY }}
      >
        {/* Desktop crest: hangs from very top-left */}
        <img
          src="/images/Logo_Blue_vl2ust.svg"
          alt="Amatir Kanya Gurukul"
          className={`pointer-events-none absolute left-0 top-8 hidden select-none md:block ${isVerySmallLaptop
            ? "w-[80px] ml-4"
            : isLargeLaptop
              ? "w-[145px] ml-18"
              : isLaptop
                ? "w-[100px] ml-8"
                : isSmallLaptop
                  ? "w-[85px] ml-6"
                  : "w-[145px] ml-18"
            }`}
          loading="lazy"
        />

        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {/* Mobile crest: centered */}
          <div className="flex justify-center pt-4 md:hidden">
            <img
              src="/images/Logo_Blue_vl2ust (2).svg"
              alt="Amatir Kanya Gurukul"
              className={`select-none ${isVerySmallLaptop ? "w-[100px]" : "w-[120px]"
                }`}
              loading="lazy"
            />
          </div>

          {/* Content: centered on mobile, right-aligned on desktop; vertically centered */}
          <div className="flex items-center justify-center py-8 md:min-h-[220px] md:justify-end md:py-8">
            <div className="w-full md:ml-auto md:w-auto">
              <div
                className={`${vidyashri ? "flex" : "grid"} grid-cols-1 gap-8 ${isVerySmallLaptop
                  ? "md:grid-cols-[180px_1fr_1fr] md:gap-4"
                  : isLargeLaptop
                    ? "md:grid-cols-[260px_1fr_1.25fr] md:gap-12"
                    : isLaptop
                      ? "md:grid-cols-[220px_1fr_1fr] md:gap-8"
                      : isSmallLaptop
                        ? "md:grid-cols-[200px_1fr_1fr] md:gap-6"
                        : "md:grid-cols-[260px_1fr_1.25fr] md:gap-12"
                  }`}
              >
                {/* CTA column */}

                <div className="flex flex-col items-center gap-4 md:items-start">
                  {ifReachoutPage || reachout_meta || vidyashri ? null : (
                    <>
                      <Cta href="/contact">Enquire Now</Cta>
                      <Cta href="/campus-visit">Book a Campus Visit</Cta>
                      <Cta href="/admissions">Apply Now</Cta>
                    </>
                  )}
                </div>

                {/* Quick Links */}
                {vidyashri ? null : <div className="text-left md:text-left">
                  <h3
                    className={`mb-4 font-pt-serif font-normal ${isVerySmallLaptop
                      ? "text-[13px] md:text-[15px]"
                      : isLargeLaptop
                        ? "text-[16px] md:text-[18px]"
                        : isLaptop
                          ? "text-[15px] md:text-[17px]"
                          : isSmallLaptop
                            ? "text-[14px] md:text-[16px]"
                            : "text-[16px] md:text-[18px]"
                      }`}
                    style={{ color: ORANGE }}
                  >
                    Quick Links
                  </h3>
                  <ul className="space-y-2">
                    {quickLinks.map((l) => (
                      <li key={l.label}>
                        <a
                          className={`font-roboto leading-7 hover:underline ${isVerySmallLaptop
                            ? "text-[13px]"
                            : isLargeLaptop
                              ? "text-[16px]"
                              : isLaptop
                                ? "text-[15px]"
                                : isSmallLaptop
                                  ? "text-[14px]"
                                  : "text-[16px]"
                            }`}
                          href={l.href}
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>}

                {/* Get In Touch */}
                <div className="text-left md:text-left">
                  <h3
                    className={`mb-4 font-pt-serif font-normal ${isVerySmallLaptop
                      ? "text-[18px] md:text-[22px]"
                      : isLargeLaptop
                        ? "text-[24px] md:text-[32px]"
                        : isLaptop
                          ? "text-[22px] md:text-[28px]"
                          : isSmallLaptop
                            ? "text-[20px] md:text-[24px]"
                            : "text-[24px] md:text-[32px]"
                      }`}
                    style={{ color: ORANGE }}
                  >
                    Get In Touch
                  </h3>

                  <div
                    className={`space-y-3 font-roboto leading-7 ${isLargeLaptop
                      ? "text-[16px]"
                      : isLaptop
                        ? "text-[15px]"
                        : isSmallLaptop
                          ? "text-[14px]"
                          : "text-[16px]"
                      }`}
                  >
                    <p className="flex items-start justify-start gap-3">
                      <Icon>
                        <path d="M4 6h16v12H4z" />
                        <path d="M22 6 12 13 2 6" />
                      </Icon>
                      <a
                        href="mailto:info@amatir.org"
                        className="hover:underline"
                      >
                        info@amatir.org
                      </a>
                    </p>

                    <p className="flex items-start justify-start gap-3">
                      <Icon>
                        <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 1h2a2 2 0 0 1 2 1.72c.12.93.31 1.84.57 2.73a2 2 0 0 1-.45 2.11L7 8a16 16 0 0 0 6 6l.44-.23a2 2 0 0 1 2.11-.45c.89.26 1.8.45 2.73.57A2 2 0 0 1 22 16.92z" />
                      </Icon>
                      <span>
                        {vidyashri ? <a href="tel:+919254837200" className="hover:underline">
                          +91 9254837200
                        </a>
                          : <a href="tel:+917027570124" className="hover:underline">
                            +91 7027570124
                          </a>}
                      </span>
                    </p>

                    <p className="flex items-start justify-start gap-3">
                      <Icon>
                        <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </Icon>
                      <span>
                        Amatir Kanya Gurukul, Bachgaon Gamri,
                        <br />
                        Lukhi Road, Kurukshetra, Haryana 136119
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== Lower strip ===================== */}
      <div className="w-full border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 py-4 text-black md:flex-row md:justify-between md:px-8">
          <nav className="flex flex-col items-center gap-3 font-roboto text-sm md:flex-row md:gap-x-8 md:gap-y-2">
            <RouterLink to="/privacy" className="hover:underline">
              Privacy Policy
            </RouterLink>
            <span className="hidden text-slate-400 md:inline">•</span>
            <RouterLink to="/terms" className="hover:underline">
              Terms of Service
            </RouterLink>
            <span className="hidden text-slate-400 md:inline">•</span>
            <RouterLink to="/cookies" className="hover:underline">
              Cookie Policy
            </RouterLink>
          </nav>
          <p className="font-roboto text-sm text-center">
            © 2026 Amatir. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
