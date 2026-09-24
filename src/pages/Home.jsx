// Home.jsx
import React from "react";
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import AmatirKanyaGurukul from '../components/AmatirKanyaGurukul';
import MobileAmatirKanyaGurukul from '../components/MobileAmatirKanyaGurukul';
import CampusLifeCarousel from '../components/CampusLifeCarousel';
import MobileCampusLifeCarousel from '../components/MobileCampusLifeCarousel';
import PrincipalSplitSection from "../components/PrincipalSplitSection";
import CampusBuzz from "../components/CampusBuzz";
import AffiliationSection from "../components/AffiliationSection";
import SLIDES from "../data/slides.json";
import useSEO from "../hooks/useSEO";
const C = {
  // Hero
  heroDesktop: "/images/Header_ywiibp.mp4",
  heroMobile: "/images/375x424_lqnlmg.mp4",
  heroPoster: "/images/Screenshot_2025-08-28_234620_eke0em.png",
  heroIcon: "/images/Orange_Icon_i299iz.svg",

  // Intro
  introLarge: "/images/IMG_1063_n2d5a6.jpg",
  introSmall: "/images/image_1_fzoxjw.jpg",


  // Campus Buzz
  buzzFeature: "/images/image_1_brnjvw.png",
  buzzSmall1: "/images/image_2_fe3zw1.png",
  buzzSmall2: "/images/image_3_haggxp.png",

  // Unlock icons
  actionBlueI: "/images/Unlock_her_Future_blueCardsIcon_zeqzxs.png",
  actionOrgI: "/images/Unlock_her_Future_OrangeCardIcon_nvspzg.png",

};

export default function Home() {
  useSEO({
    title: 'CBSE Girls Boarding School Haryana | Gurukul Kurukshetra',
    description: 'Experience Gurukul-style education at a leading CBSE girls boarding school in Haryana. Safe residential campus in Kurukshetra with values, academics, yoga & holistic learning.',
    keywords: ''
  });

  // Responsive breakpoints
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isSmallLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1365 });
  const isDesktop = useMediaQuery({ minWidth: 1366 });
  const isLargeDesktop = useMediaQuery({ minWidth: 1440 });
  const isVerySmallScreen = useMediaQuery({ maxWidth: 1024, maxHeight: 600 });
  const isLowHeight = useMediaQuery({ maxHeight: 600 });
  const isWideScreen = useMediaQuery({ minWidth: 1440 });

  // Dynamic hero values based on screen size
  const heroFontSize = isMobile ? '32px' : isTablet ? '50px' : isSmallLaptop ? '48px' : '62px';
  const heroTranslateY = isMobile ? 'translate-y-1/8' : isVerySmallScreen ? 'translate-y-1/6' : 'translate-y-1/11';
  const heroBottomPosition = isMobile ? '15%' : isVerySmallScreen ? '18%' : '21%';

  // Calculate proper hero section height accounting for header
  const getHeroHeight = () => {
    if (isMobile) return 'calc(100vh - 4rem)'; // Account for mobile header (64px)
    if (isVerySmallScreen) return 'calc(100vh - 5rem)'; // Account for small laptop header (80px)
    if (isLowHeight) return 'calc(100vh - 4.5rem)'; // Account for low height screens
    return 'calc(100vh - 5.5rem)'; // Account for desktop header (88px)
  };

  // Get video object position based on screen size
  const getVideoObjectPosition = () => {
    if (isMobile) return 'center 30%'; // Focus on upper portion for mobile
    if (isVerySmallScreen) return 'center 25%'; // Focus on upper portion for small laptops
    return 'center center'; // Default center for larger screens
  };

  // Using CSS custom properties for responsive scaling instead of JavaScript breakpoints


  // Campus Buzz section responsive values
  const buzzTitleFontSize = isMobile ? '32px' : '40px';
  const buzzImageHeight = isMobile ? '30vh' : isTablet ? '360px' : '440px';
  const buzzImageMinHeight = isMobile ? '220px' : '260px';
  const buzzSmallImageHeight = isMobile ? '140px' : '180px';
  const buzzSmallImageHeightMd = isMobile ? '160px' : '220px';
  const buzzCardTitleFontSize = isMobile ? '18px' : '24px';
  const buzzCardDescFontSize = isMobile ? '13px' : '15px';
  const buzzCardDescMaxWidth = isMobile ? '80%' : '100%';

  // Unlock Her Future section responsive values
  const unlockTitleFontSize = isMobile ? '32px' : '40px';
  const unlockCardHeight = isMobile ? '300px' : isTablet ? '340px' : '380px';
  const unlockCardPadding = isMobile ? '24px' : isTablet ? '32px' : '40px';
  const unlockCardTitleFontSize = isMobile ? '20px' : isTablet ? '22px' : '26px';
  const unlockCardDescFontSize = isMobile ? '13px' : '15px';



  return (
    <main className="text-[#1C3664]">
      {/* ================= HERO ================= */}
      <section
        className="relative overflow-hidden w-full"
        style={{
          height: "100vh",
          minHeight: isVerySmallScreen ? '400px' : '480px'
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
            objectPosition: getVideoObjectPosition()
          }}
        >
          <source src={C.heroMobile} type="video/mp4" media="(max-width: 767px)" />
          <source src={C.heroDesktop} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_20%,#002F82_100%)]" />
        <div className={`relative h-full z-10 mx-auto max-w-[1262px] px-4 flex items-end mt-[-8%] justify-center`} >
          <div className="text-center w-full" style={{
            transform: isVerySmallScreen ? 'translateY(-10%)' : isMobile ? 'translateY(-5%)' : 'translateY(0)',
            paddingTop: isVerySmallScreen ? '2rem' : isMobile ? '1rem' : '0',
            paddingBottom: isVerySmallScreen ? '2rem' : isMobile ? '1rem' : '0'
          }}>
            <div className="flex justify-center mb-4">
              <img
                alt="Amatir Icon"
                className="w-[60px] h-auto"
                src={C.heroIcon}
              />
            </div>
            <h1
              className="cent-schbk-cyrill z-10002"
              style={{
                lineHeight: '1.1',
                color: '#fff'
              }}
            >
              Guided by Dharma, Prepared for the World.
            </h1>
          </div>
        </div>
      </section>

      {/* ============ INTRO: Amatir Kanya Gurukul ============ */}
      {/* Amatir Kanya Gurukul (viewport-fit responsive system) */}
      {isMobile ? <MobileAmatirKanyaGurukul /> : <AmatirKanyaGurukul />}


      {/* ============ CAMPUS BUZZ (equal-height columns + bg/borders) ============ */}
      {isMobile ? <MobileCampusLifeCarousel /> : <CampusLifeCarousel Slides={SLIDES} />}
      <PrincipalSplitSection />
      <CampusBuzz />
      {/* ============ UNLOCK HER FUTURE (joined container, more opaque overlays, #F5F5F5 bg) ============ */}
      <section className="bg-[#F5F5F5]" style={{ padding: isMobile ? '70px 0' : isTablet ? '85px 0' : isSmallLaptop ? 'calc(2rem + 100px) 0' : '100px 0' }}>
        <div className="mx-auto max-w-[1290px] px-[5%]">
          <h3
            className="cent-schbk-cyrill text-center"
            style={{ fontSize: unlockTitleFontSize }}
          >
            Unlock Her Future
          </h3>

          {/* Joined container */}
          <div className="mt-8 overflow-hidden rounded-[20px] shadow-[0_6px_28px_rgba(0,0,0,0.08)]">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left (Blue) */}
              <article className="relative" style={{ height: unlockCardHeight }}>
                <img
                  src={C.buzzFeature}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* **More opaque** blue overlay */}
                <div className="absolute inset-0 bg-[#002F82]/95" />
                <div
                  className="relative z-[1] h-full text-white"
                  style={{ padding: unlockCardPadding }}
                >
                  <img src={C.actionBlueI} alt="" className="mb-5 h-[48px] w-[48px] invert" />
                  <h4
                    className="cent-schbk-cyrill"
                    style={{ fontSize: unlockCardTitleFontSize }}
                  >
                    Plan a Campus Visit
                  </h4>
                  <p
                    className="mt-2 max-w-[520px] leading-[1.7]"
                    style={{ fontSize: unlockCardDescFontSize }}
                  >
                    Numbers and prospectuses only tell you so much. The best way to understand why families keep
                    calling Amatir the best girls boarding school is to walk the campus yourself. Schedule a guided
                    tour to see our facilities, meet our team, and get a feel for the day-to-day
                     life that has earned us a reputation as one of the best gurukul options for girls in India.
                  </p>
                  <Link to="/campus-visit" className="mt-5 inline-block rounded-full bg-white px-5 py-2 text-[#1C3664] cursor-pointer">Register Now</Link>
                </div>
              </article>

              {/* Right (Orange) */}
              <article className="relative" style={{ height: unlockCardHeight }}>
                <img
                  src={C.buzzSmall2}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* **More opaque** orange overlay */}
                <div className="absolute inset-0 bg-[#ED6D23]/95" />
                <div
                  className="relative z-[1] h-full text-white"
                  style={{ padding: unlockCardPadding }}
                >
                  <img src={C.actionOrgI} alt="" className="mb-5 h-[48px] w-[48px] invert" />
                  <h4
                    className="cent-schbk-cyrill"
                    style={{ fontSize: unlockCardTitleFontSize }}
                  >
                    Apply for the Aptitude Test
                  </h4>
                  <p
                    className="mt-2 max-w-[520px] leading-[1.7]"
                    style={{ fontSize: unlockCardDescFontSize }}
                  >
                    Ready to take the next step? Amatir welcomes girls into its residential program through a straightforward 
                    aptitude test designed to understand each child's strengths and readiness for our learning environment. 
                    As a well-established Gurukul school, we look for curiosity and character as much as academic 
                    ability. Register today to begin the process.
                  </p>
                  <a href="/admissions#aptitude-test" className="mt-5 inline-block rounded-full
                   bg-white px-5 py-2 text-[#1C3664] cursor-pointer">Apply</a>
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
