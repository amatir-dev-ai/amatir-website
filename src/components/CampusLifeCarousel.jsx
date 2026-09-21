import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

gsap.registerPlugin(ScrollTrigger);

const brand = {
  navy: "#1C3664",
  orange: "#ED6D23",
  light: "#F5F5F5",
};




/**
 * CampusLifeCarousel
 * UNESCO Vision section with learning pillars carousel
 */
export default function CampusLifeCarousel({ Slides }) {
  const unescoRoot = useRef(null);
  const railRef = useRef(null);
  const trackRef = useRef(null);
  const descRef = useRef(null);

  // Responsive breakpoints
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isSmallLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1365 });
  const isLargeDesktop = useMediaQuery({ minWidth: 1440 });

  // UNESCO section responsive values
  const unescoTitleFontSize = isMobile ? '22px' : isTablet ? '26px' : isSmallLaptop ? '30px' : isLargeDesktop ? '34px' : '28px';
  const unescoDescFontSize = isMobile ? '14px' : isTablet ? '15px' : '16px';
  const unescoDescMaxWidth = isMobile ? '100%' : isTablet ? '600px' : isLargeDesktop ? '900px' : '700px';
  const unescoSectionPadding = isMobile ? '60px 0' : isTablet ? '70px 0' : isSmallLaptop ? 'calc(2rem + 80px) 0' : isLargeDesktop ? '100px 0' : '80px 0';
  const unescoHeaderMargin = 0;
  const unescoRailHeight = isMobile ? '450px' : isTablet ? '500px' : isSmallLaptop ? '456px' : isLargeDesktop ? '650px' : '600px';
  const unescoCardWidth = isMobile ? 'calc(100% - 20px)' : isTablet ? 'calc(100% - 40px)' : isSmallLaptop ? 'calc(100% - 70px)' : 'calc(100% - 60px)';
  const unescoCardTitleFontSize = isMobile ? '24px' : isTablet ? '28px' : isSmallLaptop ? '32px' : isLargeDesktop ? '40px' : '30px';
  const unescoCardDescFontSize = isMobile ? '13px' : isTablet ? '14px' : '15px';
  const unescoCardDescMaxWidth = isMobile ? '75%' : isTablet ? '65%' : '60%';
  const unescoPadding = isMobile ? '25px' : isTablet ? '30px' : isSmallLaptop ? '35px' : isLargeDesktop ? '45px' : '35px';
  const unescoGap = isMobile ? '15px' : isTablet ? '20px' : isSmallLaptop ? '25px' : '30px';

  // Recalculate on resize
  useLayoutEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ScrollTrigger for horizontal scrolling when the description disappears
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const rail = railRef.current;
    const track = trackRef.current;
    const desc = descRef.current;
    if (!rail || !track || !desc) return;

    const getScrollWidth = () => track.scrollWidth - rail.clientWidth;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: desc,
        pin: unescoRoot.current,
        scrub: true,
        start: "bottom top",
        end: () => `+=${getScrollWidth()}`,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(track, { x: 0 }, { x: () => -getScrollWidth(), ease: "none" });
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);


  return (
    <section
      ref={unescoRoot}
      className="relative overflow-hidden bg-[#F5F5F5]"
      style={{ padding: unescoSectionPadding }}
    >
      <div
        className="mx-auto px-[5%] text-center"  
        style={{
          margin: unescoHeaderMargin,
          maxWidth: '100%'
        }}
      >
        <h3
          className="font-['PT_Serif']"
          style={{ fontSize: unescoTitleFontSize }}
        >
          UNESCO Vision, Our Guiding Principles
        </h3>
        <p
          ref={descRef}
          className="mx-auto mt-2 leading-[1.7] text-[#3A2323]"
          style={{
            fontSize: unescoDescFontSize,
          }}
        >
          Building a foundation of knowledge, skills, community, and individuality through the Four Pillars of Education
        </p>
      </div>

      <div
        ref={railRef}
        className="relative mx-auto overflow-hidden px-[5%]"
        style={{
          height: unescoRailHeight,
          marginTop: isMobile ? '25px' : isTablet ? '30px' : isSmallLaptop ? '35px' : '40px',
          maxWidth: isMobile ? '100%' : isTablet ? '1100px' : isSmallLaptop ? '1200px' : '1290px'
        }}
      >
        <div
          ref={trackRef}
          style={{
            height: unescoRailHeight,
            display: "flex",
            gap: unescoGap
          }}
        >
          {Slides.map((s, i) => (
            <article
              key={s.key}
              className="relative h-full shrink-0 overflow-hidden rounded-[20px] text-white"
              style={{
                width: unescoCardWidth,
                backgroundImage:`url(${s.img})`,
                backgroundSize:"cover",
                backgroundPosition:"center"
              }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,#002F82_96%)]" />
              <div
                className="relative z-[1] flex h-full flex-col justify-end"
                style={{ padding: unescoPadding }}
              >
                <h4
                  className="font-['PT_Serif']"
                  style={{ fontSize: unescoCardTitleFontSize }}
                >
                  {s.titleTop} {s.titleBottom}
                </h4>
                <p
                  style={{
                    fontSize: unescoCardDescFontSize,
                    maxWidth: unescoCardDescMaxWidth,
                    marginTop: isMobile ? '8px' : '10px',
                    lineHeight: '1.5'
                  }}
                >
                  {s.body}
                </p>
                {s.bullets && (
                  <ul
                    style={{
                      marginTop: isMobile ? '12px' : '15px',
                      fontSize: unescoCardDescFontSize,
                      maxWidth: unescoCardDescMaxWidth,
                      listStyleType: 'disc',
                      paddingLeft: '20px'
                    }}
                  >
                    {s.bullets.map((bullet, index) => (
                      <li key={index} style={{ marginBottom: '4px', lineHeight: '1.4' }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
                {s.key === "learning-to-know" ? (
                  <a
                    href="/academics#academics"
                    className="underline"
                    style={{
                      marginTop: isMobile ? '12px' : '18px',
                      fontSize: unescoCardDescFontSize
                    }}
                  >
                    Know More
                  </a>
                ) : s.key === "learning-to-do" ? (
                  <a
                    href="/co-curricular#cocurricular-hero"
                    className="underline"
                    style={{
                      marginTop: isMobile ? '12px' : '18px',
                      fontSize: unescoCardDescFontSize
                    }}
                  >
                    Know More
                  </a>
                ) : s.key === "learning-to-live-together" ? (
                  <a
                    href="/boarding#boarding-hero"
                    className="underline"
                    style={{
                      marginTop: isMobile ? '12px' : '18px',
                      fontSize: unescoCardDescFontSize
                    }}
                  >
                    Know More
                  </a>
                ) : s.key === "learning-to-be" ? (
                  <a
                    href="/academics#gurukul"
                    className="underline"
                    style={{
                      marginTop: isMobile ? '12px' : '18px',
                      fontSize: unescoCardDescFontSize
                    }}
                  >
                    Know More
                  </a>
                ) : (
                  <Link
                    to={s.link}
                    className="underline"
                    style={{
                      marginTop: isMobile ? '12px' : '18px',
                      fontSize: unescoCardDescFontSize
                    }}
                  >
                    Know More
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
