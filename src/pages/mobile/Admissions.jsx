// AdmissionsPage.jsx
import MobileJourneyTImeline from '../../components/MobileJourneyTImeline';
import React, { useRef, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, Link } from 'react-router-dom';
import useSEO from '../../hooks/useSEO';

/* ==================== ASSETS (from your brief) ==================== */
const ASSETS = {
  // Hero
  hero: '/images/AMATIR_6_wnap9t.jpg',
  orangeIcon: '/images/Orange_Icon_i299iz.svg',

  // Fee structure background (blue lab photo used under the dark overlay)
  feeBg: 'publi/images/Rectangle_35_gls0ou.jpg',

  // Visit Campus collage tiles (exact Figma positions)
  r100: '/images/Rectangle_100_xy0n9h.jpg',
  r101: '/images/Rectangle_101_qyu5pr.jpg',
  r102: '/images/3_15_dsxyok.jpg',
  r103: '/images/3_22_tfbpa0.jpg',
  r104: '/images/3_21_mz9q9b.jpg',
  r105: '/images/IMG_7695_mjsnqe.jpg',
  r106: '/images/3_19_qkmb6a.jpg',
  r108: '/images/3_10_clljar.jpg',
  r109: '/images/3_9_ivacze.jpg',
};

/* ---------- Small placeholder “image” for the timeline cards ---------- */
const ImgPlaceholder = () => (
  <div className="mx-auto mt-3 grid h-[4rem] w-[5.25rem] place-items-center rounded-md border border-slate-200 bg-slate-50">
    <svg width="1.75rem" height="1.75rem" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
        stroke="#9aa4b2"
        strokeWidth="1.4"
      />
      <path d="m3 15 5-5 5 5 3-3 5 5" stroke="#c2cbd6" strokeWidth="1.4" fill="none" />
    </svg>
  </div>
);

/* ---------- Visit Campus collage tile ---------- */

const Tile = ({ src, left, top, scale = 1, leftValue, topValue }) => (
  <img
    src={src}
    alt=""
    draggable="false"
    className={['absolute rounded-[0.625rem] object-cover', 'shadow-[0_1.5rem_3.75rem_rgba(0,20,60,0.18)]'].join(' ')}
    style={{
      width: `${11.625 * scale}rem`,
      height: `${14.25 * scale}rem`,
      left: leftValue ? `${leftValue * scale}rem` : undefined,
      top: topValue ? `${topValue * scale}rem` : undefined,
    }}
  />
);

export default function Admissions() {
  useSEO({
    title: 'Amatir Kanya Gurukul Admission | Best Girls Boarding School',
    description:
      'Admissions open at Amatir Kanya Gurukul, a trusted residential girls school in Kurukshetra, Haryana offering CBSE education and holistic development.',
    keywords: '',
  });
  // Responsive media queries for different devices
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isVerySmallScreen = useMediaQuery({ maxWidth: 1024 });
  const isLowHeight = useMediaQuery({ maxHeight: 600 });
  const isSmallLaptop = useMediaQuery({ maxWidth: 1280 });
  const isMediumScreen = useMediaQuery({ minWidth: 1025, maxWidth: 1366 });

  // Get exact viewport width for precise calculations
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate proper hero section height accounting for header
  const getHeroHeight = () => {
    if (isMobile) return 'calc(100vh - 4rem)'; // Account for mobile header (64px)
    if (isVerySmallScreen) return 'calc(100vh - 5rem)'; // Account for small laptop header (80px)
    if (isLowHeight) return 'calc(100vh - 4.5rem)'; // Account for low height screens
    return 'calc(100vh - 5.5rem)'; // Account for desktop header (88px)
  };

  // Calculate responsive scale and container dimensions for collage
  const getCollageDimensions = () => {
    // Calculate the maximum required width (rightmost tile position + tile width)
    const maxTilePosition = 77.438; // Rightmost tile left position
    const tileWidth = 11.625; // Tile width
    const requiredWidth = maxTilePosition + tileWidth; // ~89rem

    // Convert viewport width to rem (assuming 16px = 1rem)
    const viewportWidthRem = viewportWidth / 16;

    if (isVerySmallScreen) {
      // For very small screens, calculate exact scale based on viewport
      const paddingRem = 1; // 1rem total padding
      const availableWidthRem = viewportWidthRem - paddingRem;
      const scale = Math.min(0.7, availableWidthRem / requiredWidth);

      return {
        containerWidth: '100%',
        containerHeight: '28rem',
        scale: Math.max(0.3, scale), // Minimum scale of 0.3
        maxWidth: '100vw',
        padding: '0.5rem',
      };
    }
    if (isSmallLaptop) {
      // For small laptops, calculate exact scale based on viewport
      const paddingRem = 2; // 2rem total padding
      const availableWidthRem = viewportWidthRem - paddingRem;
      const scale = Math.min(0.8, availableWidthRem / requiredWidth);

      return {
        containerWidth: '100%',
        containerHeight: '32rem',
        scale: Math.max(0.4, scale), // Minimum scale of 0.4
        maxWidth: '100vw',
        padding: '1rem',
      };
    }
    if (isMediumScreen) {
      // For medium screens, calculate exact scale based on viewport
      const paddingRem = 3; // 3rem total padding
      const availableWidthRem = viewportWidthRem - paddingRem;
      const scale = Math.min(0.9, availableWidthRem / requiredWidth);

      return {
        containerWidth: '100%',
        containerHeight: '35rem',
        scale: Math.max(0.5, scale), // Minimum scale of 0.5
        maxWidth: '100vw',
        padding: '1.5rem',
      };
    }
    // Default for large screens
    return {
      containerWidth: '88.125rem',
      containerHeight: '35.063rem',
      scale: 1,
      maxWidth: '88.125rem',
      padding: '0',
    };
  };

  const collageDimensions = getCollageDimensions();

  // Debug logging (remove in production)
  console.log('Viewport width:', viewportWidth, 'px');
  console.log('Collage dimensions:', collageDimensions);

  const [mapActive, setMapActive] = useState(false);
  const mapContainerRef = useRef(null);
  const navigate = useNavigate();

  return (
    <main className="w-full overflow-x-hidden bg-white text-[#1C3664]">
      {/* ==================== HERO ==================== */}
      <section className="relative w-full" style={{ height: '100vh', marginTop: '60px' }}>
        <img src={ASSETS.hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#0E2A55]/60" />
        <div className="relative mx-auto flex h-full max-w-[80vw] items-end justify-center pb-[10%] text-center">
          <div>
            <img src={ASSETS.orangeIcon} alt="" className="mx-auto mb-4 h-[3.375rem] w-[3.375rem]" />
            <h1
              className="font-serif text-[3.375rem] leading-tight text-white md:text-[4.125rem]"
              style={{ marginBottom: '35%' }}
            >
              Amatir Kanya Gurukul Admissions
            </h1>
          </div>
        </div>
      </section>

      {/* ==================== INTRO COPY ==================== */}
      <section className="mx-auto w-[92%] max-w-[66.25rem] py-12 md:py-16">
        <h2
          className="mx-auto mb-3 text-center"
          style={{
            fontFamily: "'CentSchbkCyrill BT', serif",
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: '44px',
            lineHeight: '120%',
            letterSpacing: '0%',
            textAlign: 'center',
          }}
        >
          Your Journey to Excellence Begins Here
        </h2>
        <p
          className="mx-auto max-w-[47.5rem] text-center text-[18px] leading-[1.5] text-[#3E4450]"
          style={{
            fontFamily: 'Univers, sans-serif',
            fontWeight: 400,
            fontStyle: 'normal',
            letterSpacing: '-0.02em',
            textAlign: 'justify',
          }}
        >
          At Amatir, admissions are more than just a process; they mark the beginning of a meaningful journey for your
          daughter. Whether you're exploring Amatir Kanya Gurukul admission for 2026 or simply want clarity on our fee
          structure, we're here to guide you through every step. Many families researching the best girls boarding
          school admission in Haryana tell us it's the personal, one-on-one support that sets the experience apart, and
          that's exactly what we aim to offer from your very first enquiry to the day your daughter joins us on campus.
          Here's a look at how the admission process unfolds. s
        </p>
      </section>

      {/* ==================== TIMELINE (mobile) ==================== */}
      <MobileJourneyTImeline />

      {/* ==================== FEE STRUCTURE BANNER ==================== */}
      <section className="relative w-full">
        <div className="relative mx-auto h-[15.75rem] w-full  overflow-hidden">
          <img src={ASSETS.feeBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#0E2A55]/92" />
          <div className="relative z-[1] mx-auto flex h-full w-full flex-col items-center justify-center text-center text-white">
            <h3 className="font-serif font-normal text-[32px] leading-[120%] text-center">Fee Structure</h3>
            <p
              className="mt-2 max-w-[45rem] text-center text-[18px] leading-[1.5] font-normal"
              style={{
                fontFamily: 'Univers, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                letterSpacing: '-0.02em',
                textAlign: 'center',
              }}
            >
              Check the latest structure, concessions, and scholarship options.
            </p>
            <a href="/FEE_STRUCTURE_2025-26.pdf" target="_blank" rel="noopener noreferrer">
              <button className="mt-5 inline-flex h-[2.5rem] items-center rounded-full bg-[#ED6D23] px-5 text-[0.875rem] font-medium text-white shadow-[0_0.625rem_1.25rem_rgba(237,109,35,0.35)] hover:brightness-105 cursor-pointer">
                Download
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ==================== VISIT CAMPUS (responsive collage) ==================== */}
      <section
        className="my-16 hidden lg:block overflow-x-hidden"
        style={{
          width: collageDimensions.containerWidth,
          maxWidth: collageDimensions.maxWidth,
          padding: collageDimensions.padding,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <div className="relative w-full" style={{ height: collageDimensions.containerHeight }}>
          {/* Collage tiles with responsive scaling */}
          <Tile src={ASSETS.r108} leftValue={0.938} topValue={0} scale={collageDimensions.scale} />
          <Tile src={ASSETS.r109} leftValue={0.938} topValue={15.375} scale={collageDimensions.scale} />
          <Tile src={ASSETS.r103} leftValue={26.438} topValue={0.563} scale={collageDimensions.scale} />
          <Tile src={ASSETS.r102} leftValue={13.688} topValue={6.5} scale={collageDimensions.scale} />
          <Tile src={ASSETS.r104} leftValue={39.188} topValue={4.063} scale={collageDimensions.scale} />
          <Tile src={ASSETS.r105} leftValue={51.938} topValue={0.563} scale={collageDimensions.scale} />
          <Tile src={ASSETS.r106} leftValue={64.688} topValue={6.5} scale={collageDimensions.scale} />
          <Tile src={ASSETS.r100} leftValue={77.438} topValue={0} scale={collageDimensions.scale} />
          <Tile src={ASSETS.r101} leftValue={77.438} topValue={15.375} scale={collageDimensions.scale} />

          {/* Text + CTA (responsive positioning) */}
          <h3
            className="absolute left-1/2 w-[90%] max-w-[27.563rem] -translate-x-1/2 text-center font-serif leading-[1.2] text-[#1C3664]"
            style={{
              top: `${21.5 * collageDimensions.scale}rem`,
              fontSize: `${2.75 * collageDimensions.scale}rem`,
            }}
          >
            Visit Campus
          </h3>
          <p
            className="absolute left-1/2 w-[90%] max-w-[49.938rem] -translate-x-1/2 text-center leading-7 text-[#3E4450]"
            style={{
              top: `${26.375 * collageDimensions.scale}rem`,
              fontSize: `${0.938 * collageDimensions.scale}rem`,
              width: window.innerWidth <= 1024 && window.innerHeight <= 600 ? '72%' : undefined,
            }}
          >
            We warmly invite prospective parents to visit the Amatir campus, interact with our team, and experience
            firsthand the vibrant learning environment of our Gurukul, a place families across the region have come to
            know as a trusted home for their daughters' education.
          </p>
          <Link
            to="/campus-visit"
            className="absolute left-1/2 -translate-x-1/2 inline-flex items-center justify-center rounded-full bg-[#ED6D23] text-white shadow-[0_0.625rem_1.25rem_rgba(237,109,35,0.35)] hover:brightness-105 cursor-pointer"
            style={{
              top: `${31.938 * collageDimensions.scale}rem`,
              height: `${3.125 * collageDimensions.scale}rem`,
              width: `${10.25 * collageDimensions.scale}rem`,
              fontSize: `${0.938 * collageDimensions.scale}rem`,
            }}
          >
            Schedule a visit
          </Link>
        </div>
      </section>

      {/* Mobile/tablet version of Visit Campus (3-column collage first, then text) */}
      <section className="px-5 lg:hidden">
        {/* 3-column collage */}
        <div className="mt-6">
          <div className="flex items-start justify-between" style={{ gap: '0.75rem' }}>
            {/* Column 1 */}
            <div className="flex-1">
              <div
                className="relative w-full rounded-[0.625rem] shadow-[0_0.875rem_1.875rem_rgba(0,20,60,0.12)] overflow-hidden"
                style={{ paddingBottom: '100%' }}
              >
                <img src={ASSETS.r100} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div
                className="relative w-full rounded-[0.625rem] shadow-[0_0.875rem_1.875rem_rgba(0,20,60,0.12)] overflow-hidden"
                style={{ paddingBottom: '100%', marginTop: '0.75rem' }}
              >
                <img src={ASSETS.r102} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>

            {/* Column 2 (offset top by 25% of tile height/width) */}
            <div className="flex-1">
              <div
                className="relative w-full rounded-[0.625rem] shadow-[0_0.875rem_1.875rem_rgba(0,20,60,0.12)] overflow-hidden"
                style={{ paddingBottom: '100%', marginTop: '25%' }}
              >
                <img src={ASSETS.r103} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div
                className="relative w-full rounded-[0.625rem] shadow-[0_0.875rem_1.875rem_rgba(0,20,60,0.12)] overflow-hidden"
                style={{ paddingBottom: '100%', marginTop: '0.75rem' }}
              >
                <img src={ASSETS.r105} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex-1">
              <div
                className="relative w-full rounded-[0.625rem] shadow-[0_0.875rem_1.875rem_rgba(0,20,60,0.12)] overflow-hidden"
                style={{ paddingBottom: '100%' }}
              >
                <img src={ASSETS.r104} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div
                className="relative w-full rounded-[0.625rem] shadow-[0_0.875rem_1.875rem_rgba(0,20,60,0.12)] overflow-hidden"
                style={{ paddingBottom: '100%', marginTop: '0.75rem' }}
              >
                <img src={ASSETS.r108} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Text and CTA below collage */}
        <h3
          className="text-center font-serif text-[#1C3664]"
          style={{ fontSize: '1.875rem', lineHeight: 1.2, marginTop: '1.5rem' }}
        >
          Visit Campus
        </h3>
        <p
          className="mx-auto text-center text-[#3E4450]"
          style={{ maxWidth: '45ch', marginTop: '0.5rem', lineHeight: 1.8, fontSize: '0.95rem' }}
        >
          We warmly invite prospective parents to visit the Amatir campus, interact with our team, and experience
          firsthand the vibrant learning environment of our Gurukul, a place families across the region have come to
          know as a trusted home for their daughters' education.
        </p>
        <div className="flex justify-center" style={{ marginTop: '1.25rem', marginBottom: '2rem' }}>
          <a
            href="/campus-visit"
            className="inline-block rounded-full bg-[#ED6D23] text-white shadow-[0_0.625rem_1.25rem_rgba(237,109,35,0.35)] hover:brightness-105 cursor-pointer"
            style={{ padding: '0.7rem 1.2rem', fontSize: '0.95rem' }}
          >
            Schedule a visit
          </a>
        </div>
      </section>

      {/* ==================== ORANGE CTA STRIP ==================== */}
      <section className="relative mx-auto mt-8 w-full   overflow-hidden">
        <div className="relative h-[15.25rem] w-full">
          <img src={ASSETS.feeBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#ED6D23]/92 " />
          <div className="relative z-[1] flex h-full flex-col items-center justify-center text-center text-white">
            <h4 className="font-ptserif font-normal not-italic text-[2rem] leading-[120%] tracking-normal text-center">
              Unlock her future!
            </h4>
            <p className="mt-2 text-center univers-regular opacity-95">Guided by Dharma, Prepared for the World.</p>
            <button
              onClick={() => navigate('/contact')}
              className="mt-4 inline-flex h-[2.375rem] items-center cursor-pointer rounded-full bg-[#1C3664] px-5 text-[0.875rem] font-medium text-white ring-1 ring-white/40 backdrop-blur"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* ==================== MAP ==================== */}
      <section className="bg-white">
        <div className="relative">
          <div className="absolute left-[5%] top-8 z-10 max-w-[360px] bg-white rounded-lg shadow-xl p-6 hidden md:block">
            <h3 className="univers-regular text-[#0E2349]">Amatir Kanya Gurukul Kurukshetra</h3>
            <p className="text-[14px] text-[#6c757d] mt-2">
              Village: Bachgaon Gamri, Lakhi Road, Kurukshetra, Haryana 136119
            </p>
            <a
              href="https://maps.google.com/?q=Amatir+Kanya+Gurukul+Kurukshetra"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 text-[#ED6D23] font-semibold"
            >
              Directions ↗
            </a>
          </div>
          <iframe
            title="Amatir Map"
            className="w-full h-[360px] md:h-[520px] border-0"
            src="https://www.google.com/maps?q=Amatir%20Kanya%20Gurukul%20Kurukshetra&output=embed"
            loading="lazy"
          />
        </div>
      </section>
    </main>
  );
}
