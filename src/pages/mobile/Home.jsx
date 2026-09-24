'use client';
import React, { useState, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MobileAmatirKanyaGurukul from '../../components/MobileAmatirKanyaGurukul';
import MobileCampusLifeCarousel from '../../components/MobileCampusLifeCarousel';
import AffiliationSection from '../../components/AffiliationSection';
import MobilePrincipalSplitSection from '../../components/MobilePrincipalSplitSection';
import InTheirOwnWordsMobile from '../../components/InTheirOwnWordsMobile';
import useSEO from '../../hooks/useSEO';

const C = {
  // Hero
  heroDesktop: '/images/Header_ywiibp.mp4',
  heroMobile: '/images/375x424_lqnlmg.mp4',
  heroPoster: '/images/Screenshot_2025-08-28_234620_eke0em.png',
  heroIcon: '/images/Orange_Icon_i299iz.svg',

  // Intro
  introLarge: '/images/IMG_1063_n2d5a6.jpg',
  introSmall: '/images/image_1_fzoxjw.jpg',

  // Campus Buzz
  buzzFeature: '/images/Rectangle_110_tdkht6.jpg',
  buzzSmall1: '/images/Rectangle_111_j4hdij.jpg',
  buzzSmall2: '/images/Blog_main_pic_b15a6e.jpg',

  // Unlock icons
  actionBlueI: '/images/Unlock_her_Future_blueCardsIcon_zeqzxs.png',
  actionOrgI: '/images/Unlock_her_Future_OrangeCardIcon_nvspzg.png',
};

export default function Home() {
  useSEO({
    title: 'CBSE Girls Boarding School Haryana | Gurukul Kurukshetra',
    description:
      'Experience Gurukul-style education at a leading CBSE girls boarding school in Haryana. Safe residential campus in Kurukshetra with values, academics, yoga & holistic learning.',
    keywords: '',
  });
  // Responsive breakpoints
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isSmallLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1365 });
  const isVerySmallScreen = useMediaQuery({ maxWidth: 1024, maxHeight: 600 });
  const isLowHeight = useMediaQuery({ maxHeight: 600 });

  // ============ HERO SETTINGS ============
  const getVideoObjectPosition = () => {
    if (isMobile) return 'center 30%';
    if (isVerySmallScreen) return 'center 25%';
    return 'center center';
  };

  // ============ CAMPUS BUZZ SLIDER ============
  const buzzImages = [
    { src: C.buzzFeature, alt: 'Campus Buzz 1' },
    { src: C.buzzSmall1, alt: 'Campus Buzz 2' },
    { src: C.buzzSmall2, alt: 'Campus Buzz 3' },
  ];

  const [index, setIndex] = useState(0);
  const touchStartX = useRef(0);

  const prevSlide = () => setIndex((prev) => (prev - 1 + buzzImages.length) % buzzImages.length);
  const nextSlide = () => setIndex((prev) => (prev + 1) % buzzImages.length);

  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX.current - touchEndX > 50) nextSlide();
    if (touchEndX - touchStartX.current > 50) prevSlide();
  };

  return (
    <main className="text-[#1C3664]">
      {/* ================= HERO ================= */}
      <section
        id="mobile-hero"
        className="relative overflow-hidden w-full"
        style={{
          height: '100vh',
          minHeight: isVerySmallScreen ? '400px' : '480px',
        }}
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          playsInline
          autoPlay
          muted
          loop
          poster={C.heroPoster}
          style={{
            objectFit: 'cover',
            objectPosition: getVideoObjectPosition(),
          }}
        >
          <source src={C.heroMobile} type="video/mp4" media="(max-width: 767px)" />
          <source src={C.heroDesktop} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_20%,#002F82_100%)]" />
        <div className="relative h-full z-10 mx-auto max-w-[1262px] px-4 flex items-end justify-center">
          <div
            className="text-center w-full"
            style={{
              transform: isVerySmallScreen ? 'translateY(-10%)' : isMobile ? 'translateY(-5%)' : 'translateY(0)',
              paddingTop: isVerySmallScreen ? '2rem' : isMobile ? '1rem' : '0',
              paddingBottom: isVerySmallScreen ? '2rem' : isMobile ? '1rem' : '0',
            }}
          >
            <div className="flex justify-center mb-4">
              <img alt="Amatir Icon" className="w-[60px] h-auto" src={C.heroIcon} />
            </div>
            <h1 className="cent-schbk-cyrill text-white leading-tight mb-[35%]">
              Guided by Dharma, Prepared for the World.
            </h1>
          </div>
        </div>
      </section>

      {/* ============ INTRO SECTION ============ */}
      <MobileAmatirKanyaGurukul />

      {/* ============ CAMPUS LIFE ============ */}
      <MobileCampusLifeCarousel />

      {/* ============  ============ */}
      <InTheirOwnWordsMobile />

      {/* ============ PRINCIPAL SECTION ============ */}
      <MobilePrincipalSplitSection />

      {/* ============ CAMPUS BUZZ ============ */}
      <section
        className="relative bg-[#F8F9FB] py-12 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <h2 className="text-center text-[#1C3664] font-semibold text-xl mb-6">Campus Buzz</h2>

        <div className="relative mx-auto max-w-[90%] rounded-[1rem] overflow-hidden shadow-lg">
          <img
            src={buzzImages[index].src}
            alt={buzzImages[index].alt}
            className="w-full h-[240px] object-cover transition-transform duration-500"
          />

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 left-2 z-10 grid place-items-center rounded-full text-white hover:scale-110 transition-transform duration-200"
            style={{
              width: '2.4rem',
              height: '2.4rem',
              background: '#ED6D23',
              boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
            }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 right-2 z-10 grid place-items-center rounded-full text-white hover:scale-110 transition-transform duration-200"
            style={{
              width: '2.4rem',
              height: '2.4rem',
              background: '#ED6D23',
              boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {buzzImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === index ? 'bg-[#ED6D23]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ============ UNLOCK HER FUTURE ============ */}
      <section
        className="bg-[#F5F5F5]"
        style={{
          padding: isMobile ? '70px 0' : isTablet ? '85px 0' : isSmallLaptop ? 'calc(2rem + 100px) 0' : '100px 0',
        }}
      >
        <div className="mx-auto max-w-[1290px] px-[5%]">
          <h3 className="cent-schbk-cyrill text-center text-[32px] md:text-[40px]">Unlock Her Future</h3>

          <div className="mt-8 overflow-hidden rounded-[20px] shadow-[0_6px_28px_rgba(0,0,0,0.08)]">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left (Blue) */}
              <article className="relative py-10">
                <img
                  src={C.buzzFeature}
                  alt="Plan a Campus Visit"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[#002F82]/95" />
                <div className="relative z-[1] h-full text-white p-6 md:p-8">
                  <img src={C.actionBlueI} alt="Blue Icon" className="mb-5 h-[48px] w-[48px] invert" />
                  <h4 className="cent-schbk-cyrill text-[20px] md:text-[26px]">Plan a Campus Visit</h4>
                  <p className="mt-2 leading-[1.7] text-[13px] md:text-[15px] max-w-[520px]">
                  Numbers and prospectuses only tell you so much. The best way to understand why families keep calling Amatir the best girls boarding school is to walk the campus yourself. Schedule a guided tour to see our facilities, meet our team, and get a feel for the day-to-day
                  life that has earned us a reputation as one of the best gurukul options for girls in India.
                  </p>
                  <a href="/campus-visit" className="mt-5 inline-block rounded-full bg-white px-5 py-2 text-[#1C3664]">
                    Register Now
                  </a>
                </div>
              </article>

              {/* Right (Orange) */}
              <article className="relative py-10">
                <img
                  src={C.buzzSmall2}
                  alt="Apply for Aptitude Test"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[#ED6D23]/95" />
                <div className="relative z-[1] h-full text-white p-6 md:p-8">
                  <img src={C.actionOrgI} alt="Orange Icon" className="mb-5 h-[48px] w-[48px] invert" />
                  <h4 className="cent-schbk-cyrill text-[20px] md:text-[26px]">Apply for the Aptitude Test</h4>
                  <p className="mt-2 leading-[1.7] text-[13px] md:text-[15px] max-w-[520px]">
                   Ready to take the next step? Amatir welcomes girls into its residential program through a straightforward aptitude test designed to understand each child's strengths and readiness for our learning environment. As a well-established Gurukul school,
                    we look for curiosity and character as much as academic ability. Register today to begin the process.
                  </p>
                  <a
                    href="/admissions#aptitude-test"
                    className="mt-5 inline-block rounded-full bg-white px-5 py-2 text-[#1C3664]"
                  >
                    Apply
                  </a>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ============ AFFILIATION + MAP ============ */}
      <AffiliationSection />

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
