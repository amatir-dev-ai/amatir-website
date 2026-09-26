import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Trans, useTranslation } from 'react-i18next';
import LanguageDropdown from '../components/LanguageDropdown';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Check if we're on the mobile PaidPage route
  const isMobilePaidPage = isMobile && location.pathname === '/reachout';
  const ifReaachoutPage = location.pathname.startsWith('/reachout');
  const reachout_meta = location.pathname.startsWith('/reachout_meta');
  const vidyashri = location.pathname.startsWith('/vidyashri');
  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownOpen && !e.target.closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [dropdownOpen]);

  const menuItems = [
    'Home',
    'About',
    'Life at Amatir',
    'Boarding',
    'Co-curricular',
    'Facilities',
    'Academics',
    'Admissions',
    'Campus Visit',
    'Essential Information',
    'Careers',
    'Blog',
  ];

  const isRouteActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>

      {/* Thin top bar */}
      <div className="fixed sticky inset-x-0 top-0 z-[1200] h-1  " />

      {/* NOTE: relative + overflow-visible lets the logo hang over the nav */}
      <header
        className="fixed inset-x-0 top-1 z-[1200] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 relative overflow-visible"
        style={{ position: 'fixed', top: 0 }}
      >
        <nav className="mx-auto flex h-16 md:h-20 w-screen items-center px-6 md:px-12 lg:px-16">
          {/* Left Container */}
          <div className="flex items-center">
            {/* Desktop left links */}
            {vidyashri ? null : (
              <div className="hidden items-center gap-8 md:flex">
                <RouterLink
                  to="/about"
                  className={`text-[12px] tracking-[0.15em] font-bold uppercase ${isRouteActive('/about') ? 'text-orange-500' : 'text-[#1C3664]'} hover:text-orange-500 transition-colors`}
                >
                  About Us
                </RouterLink>
                <RouterLink
                  to="/life-at-amatir"
                  className={`text-[12px] tracking-[0.15em] font-bold uppercase ${isRouteActive('/life-at-amatir') ? 'text-orange-500' : 'text-[#1C3664]'} hover:text-orange-500 transition-colors`}
                >
                  Life at Amatir
                </RouterLink>
                <RouterLink
                  to="/contact"
                  smooth={true}
                  duration={800}
                  offset={-100}
                  className={`text-[12px] tracking-[0.15em] font-bold uppercase ${isRouteActive('/contact') ? 'text-orange-500' : 'text-[#1C3664]'} hover:text-orange-500 transition-colors cursor-pointer`}
                >
                  Contact Us
                </RouterLink>
              </div>
            )}

            {/* MOBILE: hanging left logo (absolute) */}
            <div className="pointer-events-none absolute left-3 top-[-7px] md:hidden">
              <RouterLink to={vidyashri ? null : '/'} className="pointer-events-auto block">
                <img
                  src="/images/Logo_Blue_vl2ust (3).svg"
                  alt="Amatir Kanya Gurukul"
                  style={{
                    height: '100px', // much larger than h-20 (80px)
                    width: 'auto',
                    minWidth: '0',
                    minHeight: '0',
                    maxWidth: 'none',
                    maxHeight: 'none',
                    display: 'block',
                    marginTop: '0',
                    position: 'relative',
                    zIndex: 1300, // higher than navbar z-1200
                    pointerEvents: 'auto',
                  }}
                  className="will-change-transform"
                />
              </RouterLink>
            </div>
          </div>

          {/* Center Logo */}
          <div className="flex-1 flex justify-center">
            {/* DESKTOP: hanging center logo (absolute) */}
            <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[-14px] md:top-[-7px] hidden md:block">
              <RouterLink to={`${vidyashri ? '/vidyashri' : '/'}`} className="pointer-events-auto block">
                <img
                  src="/images/Logo_Blue_vl2ust.svg"
                  alt="Amatir Kanya Gurukul"
                  className="h-20 md:h-28 w-auto will-change-transform"
                />
              </RouterLink>
            </div>
          </div>

          {/* Right Container */}
          <div className="flex items-center gap-5">
            {/* {ifReaachoutPage ? null : } */}
            {vidyashri ? (
              <LanguageDropdown />
            ) : ifReaachoutPage || reachout_meta || vidyashri ? null : ( // Show only Enquire Now button for mobile PaidPage
              // <RouterLink
              //   to="/enquire"
              //   className="inline-flex items-center gap-2 rounded-full bg-[#ED6D23] px-4 py-2 text-white shadow transition hover:bg-[#d55a1a] md:px-5 cursor-pointer"
              // >
              //   <span className="text-sm md:text-base font-normal">Enquire Now</span>
              // </RouterLink>
              // Show Get in touch dropdown for all other pages
              <div className="relative dropdown-container">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#1C3664] px-4 py-2 text-white shadow transition hover:bg-[#152a4e] md:px-5 cursor-pointer"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="text-sm md:text-base font-normal">Get in touch</span>
                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''} cursor-pointer`}
                  >
                    <path
                      d="M1 1.5L6 5.5L11 1.5"
                      stroke="#ED6D23"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <RouterLink
                      to="/contact"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Enquire
                    </RouterLink>
                    <RouterLink
                      to="/campus-visit"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Visit Campus
                    </RouterLink>
                    <RouterLink
                      to="/admissions"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Apply
                    </RouterLink>
                  </div>
                )}
              </div>
            )}

            {vidyashri ? null : (
              <button
                aria-label="Open menu"
                aria-expanded={open}
                onClick={() => setOpen(true)}
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1C3664] md:h-11 md:w-11 cursor-pointer"
              >
                <svg
                  width="25"
                  height="16"
                  viewBox="0 0 25 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="cursor-pointer"
                >
                  <path d="M12.833 1H24.1108" stroke="black" strokeWidth="2" />
                  <path d="M6.22266 8.00006L24.1115 8.00006" stroke="black" strokeWidth="2" />
                  <path d="M0 15.0001L24.1111 15.0001" stroke="black" strokeWidth="2" />
                </svg>
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Menu Drawer (mobile full-width, desktop ≤ 33%) */}
      <div
        className={[
          'fixed inset-0 z-[1300] flex',
          'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        {/* Clickable dimmed backdrop */}
        <div
          className={['flex-1 bg-black/20 transition-opacity duration-500', open ? 'opacity-100' : 'opacity-0'].join(
            ' ',
          )}
          onClick={() => setOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={[
            'h-full w-full md:w-1/3 max-w-[420px] text-gray-900',
            'transform transition-transform duration-500',
            open ? 'translate-x-0' : 'translate-x-full',
            'shadow-xl relative',
          ].join(' ')}
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          }}
        >
          {/* Close & header area */}
          <div
            className="relative flex items-center justify-between px-4 py-3 md:px-6 border-b border-gray-100"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex items-center gap-3">
              <img
                src="/images/Logo_Blue_vl2ust.svg"
                alt="Amatir Kanya Gurukul"
                className="h-8 w-auto hidden sm:block"
              />
              {/* On mobile, show text instead of image */}
              <span className="sm:hidden font-semibold text-[#1C3664] text-lg">Amatir Kanya Gurukul</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1C3664] cursor-pointer"
              aria-label="Close menu"
            >
              <svg width="16" height="16" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4 4l10 10M14 4L4 14" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Close
            </button>
          </div>

          {/* Menu grid */}
          <div className="h-[calc(100%-72px)] overflow-y-auto px-4 pb-8 md:px-6">
            <div className="grid grid-cols-1 gap-3 pt-6">
              {menuItems.map((label) => {
                const isCTA = label === 'Apply Now';
                const shouldScroll = ['Apply Now', 'Quick Links'].includes(label);
                const scrollTarget = label === 'Apply Now' ? 'apply' : label === 'Quick Links' ? 'quick-links' : '';

                // Map menu labels to their corresponding routes
                const getRouteForLabel = (label) => {
                  const routeMap = {
                    Home: '/',
                    About: '/about',
                    Admissions: '/admissions',
                    Academics: '/academics',
                    Boarding: '/boarding',
                    Facilities: '/facilities',
                    'Life at Amatir': '/life-at-amatir',
                    Blog: '/blogs',
                    'Campus Visit': '/campus-visit',
                    Careers: '/careers',
                    'Co-curricular': '/co-curricular',
                    'Essential Information': '/essential-information',
                  };
                  return routeMap[label] || '#';
                };

                const route = getRouteForLabel(label);
                // Active when exact match or path starts with route (for nested routes like /blogs/:slug)
                const isActive =
                  route === '/' ? location.pathname === '/' : route !== '#' && location.pathname.startsWith(route);

                // SCROLL LINK
                if (shouldScroll) {
                  return (
                    <ScrollLink
                      key={label}
                      to={scrollTarget}
                      smooth={true}
                      duration={800}
                      offset={-100}
                      onClick={() => setOpen(false)}
                      className={[
                        'group relative isolate rounded-2xl border border-gray-200 cursor-pointer',
                        'px-5 py-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                        'hover:-translate-y-0.5 hover:shadow-md',
                        isCTA
                          ? 'bg-[#1C3664] text-white hover:bg-[#152a4e]'
                          : isActive
                            ? 'bg-[#1C3664]/10 text-[#1C3664] border-[#1C3664]/20'
                            : 'bg-white/50 text-gray-900 hover:bg-white/70',
                      ].join(' ')}
                    >
                      <span className={`text-base md:text-lg ${isCTA ? 'font-semibold' : 'font-medium'}`}>{label}</span>
                      <span
                        className={`absolute right-5 top-1/2 -translate-y-1/2 transition-transform group-hover:translate-x-1 ${isCTA ? 'text-white' : 'text-gray-900'}`}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M6 4l6 5-6 5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </ScrollLink>
                  );
                }

                // ROUTER LINK
                return (
                  <RouterLink
                    key={label}
                    to={route}
                    onClick={() => setOpen(false)}
                    className={[
                      'group relative isolate rounded-2xl border border-gray-200',
                      'px-5 py-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                      'hover:-translate-y-0.5 hover:shadow-md',
                      isCTA
                        ? 'bg-[#1C3664] text-white hover:bg-[#152a4e]'
                        : isActive
                          ? 'bg-[#1C3664]/10 text-[#1C3664] border-[#1C3664]/20'
                          : 'bg-white/50 text-gray-900 hover:bg-white/70',
                    ].join(' ')}
                  >
                    <span className={`text-base md:text-lg ${isCTA ? 'font-semibold' : 'font-medium'}`}>{label}</span>
                    <span
                      className={`absolute right-5 top-1/2 -translate-y-1/2 transition-transform group-hover:translate-x-1 ${isCTA ? 'text-white' : 'text-gray-900'}`}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 4l6 5-6 5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </RouterLink>
                );
              })}
            </div>

            <div className="pt-8 text-xs md:text-sm text-gray-500 text-center">
              © {new Date().getFullYear()} Amatir Kanya Gurukul. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Spacer:
          Keep it equal to the nav height so content aligns; the logo will hang over.
          If you want content to clear beneath the hanging logo, increase these values. */}
    </>
  );
}
