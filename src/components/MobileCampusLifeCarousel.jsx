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

const SLIDES = [
  {
    key: "learning-to-know",
    titleTop: "Learning to",
    titleBottom: "Know",
    body:
      "Fostering curiosity and a love for learning through a rigorous, value-based education curriculum that promotes exploration, critical thinking, and intellectual growth, preparing students for success in higher education and beyond.",
    bullets: [
      "Innovative Curriculum",
      "Skill-Based Learning", 
      "Competitive Exams"
    ],
    img: "/images/059A9916_axtwdh (1).jpg",
    link: "/academics"
  },
  {
    key: "learning-to-do",
    titleTop: "Learning to",
    titleBottom: "Do",
    body:
      "Encouraging hands-on skills and creative expression, this pillar empowers students to explore their interests and excel in diverse pursuits.",
    bullets: [
      "Sports",
      "Elevate Clubs",
      "Fine Arts",
      "Performing Arts",
      "Gastronomy"
    ],
    img: "/images/Rectangle_35_1_fdqy9r.jpg",
    link: "/co-curricular"
  },
  {
    key: "learning-to-live-together",
    titleTop: "Learning to Live",
    titleBottom: "Together",
    body:
      "Cultivating harmony, collaboration, and a strong sense of community, nurturing lifelong relationships and a spirit of shared responsibility.",
    bullets: [
      "Chetna-Prabha",
      "Happiness Council",
      "Pillars of Care: Samrakshika & Samposhini",
      "Marg Darshini"
    ],
    img: "/images/IMG_1063_n2d5a6.jpg",
    link: "/boarding"
  },
  {
    key: "learning-to-be",
    titleTop: "Learning to",
    titleBottom: "Be",
    body:
      "Developing self-awareness, inner balance, and a sense of purpose, this pillar integrates the transformative practices of Atma Dhyan to help students realize their true potential.",
    bullets: [
      "Hawan",
      "Classical Isha Hatha Yoga",
      "Inner Engineering",
      "Sandhya "
    ],
    img: "/images/Learning_to_be_yzbdez (1).jpg",
    link: "/academics#gurukul"
  },
];

/**
 * MobileCampusLifeCarousel
 * Mobile-optimized UNESCO Vision section with learning pillars
 */
export default function MobileCampusLifeCarousel() {
  const unescoRoot = useRef(null);
  const railRef = useRef(null);
  const trackRef = useRef(null);
  const descRef = useRef(null);
  const titleRef = useRef(null);

  // Responsive breakpoints
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  // Mobile/tablet responsive values tuned to screenshot layout
  const unescoTitleFontSize = isMobile ? '28px' : '32px';
  const unescoDescFontSize = isMobile ? '16px' : '18px';
  const unescoSectionPadding = isMobile ? '60px 0' : '80px 0';
  // Taller rail to accommodate image header + body text inside each card
  const unescoRailHeight = isMobile ? '660px' : '700px';
  const unescoCardWidth = isMobile ? 'calc(100vw - 48px)' : '360px';
  const unescoCardImageHeight = isMobile ? '260px' : '280px';
  const unescoCardTitleFontSize = isMobile ? '30px' : '34px';
  const unescoCardDescFontSize = isMobile ? '15px' : '16px';
  const unescoPadding = isMobile ? '16px' : '20px';
  const unescoGap = isMobile ? '16px' : '20px';

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
    const title = titleRef.current;
    if (!rail || !track || !title) return;

    const getScrollWidth = () => track.scrollWidth - rail.clientWidth;

    // Preserve original behavior: vertical distance equals horizontal track width
    const computeEnd = () => `+=${getScrollWidth()}`;

    const computeStart = () => "bottom top";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: title,
        pin: unescoRoot.current,
        scrub: isMobile ? 0.5 : true,
        start: computeStart,
        end: computeEnd,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(track, { x: 0 }, { x: () => -getScrollWidth(), ease: "none" });
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [isMobile]);

  return (
    <section
      ref={unescoRoot}
      className="relative overflow-hidden bg-[#F5F5F5]"
      style={{ padding: unescoSectionPadding }}
    >
      <div className="mx-auto px-4 text-center">
        <h3
          ref={titleRef}
          className="font-['PT_Serif'] text-[#1C3664]"
          style={{ fontSize: unescoTitleFontSize }}
        >
          UNESCO Vision, Our Guiding Principles
        </h3>
        <p
          ref={descRef}
          className="mx-auto mt-4 leading-[1.7] text-[#3A2323]"
          style={{
            fontSize: unescoDescFontSize,
            maxWidth: isMobile ? '100%' : '600px'
          }}
        >
          Building a foundation of knowledge, skills, community, and individuality through the Four Pillars of Education
        </p>
      </div>

      <div
        ref={railRef}
        className="relative mx-auto overflow-hidden px-4"
        style={{
          height: unescoRailHeight,
          marginTop: isMobile ? '30px' : '40px',
          maxWidth: '100%'
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
          {SLIDES.map((s, i) => (
            <article
              key={s.key}
              className="relative h-full shrink-0 overflow-hidden rounded-[20px] bg-white shadow-md"
              style={{ width: unescoCardWidth }}
            >
              {/* Image header with actual img element */}
              <div
                className="relative w-full overflow-hidden"
                style={{ height: unescoCardImageHeight }}
              >
                <img
                  src={s.img}
                  alt={`${s.titleTop} ${s.titleBottom}`}
                  draggable={false}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div className="absolute inset-0 z-[0] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,#002F82_96%)]" />
                <div className="absolute inset-x-0 bottom-0 z-[1] p-4">
                  <h4
                    className="font-['PT_Serif'] text-white leading-tight"
                    style={{ fontSize: unescoCardTitleFontSize }}
                  >
                    <span>{s.titleTop}</span>
                    <br />
                    <span>{s.titleBottom}</span>
                  </h4>
                </div>
              </div>

              {/* Body content on white background */}
              <div className="flex flex-col text-[#3A2323]" style={{ padding: unescoPadding }}>
                <p
                  style={{
                    fontSize: unescoCardDescFontSize,
                    marginTop: isMobile ? '4px' : '6px',
                    lineHeight: '1.6'
                  }}
                >
                  {s.body}
                </p>

                {s.bullets && (
                  <ul
                    className="mt-3"
                    style={{
                      fontSize: unescoCardDescFontSize,
                      listStyleType: 'none',
                      paddingLeft: '0'
                    }}
                  >
                    {s.bullets.map((bullet, index) => (
                      <li key={index} style={{ marginBottom: '4px', lineHeight: '1.5' }}>
                        ~ {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  to={s.link}
                  className="mt-auto underline"
                  style={{
                    marginTop: isMobile ? '12px' : '14px',
                    fontSize: unescoCardDescFontSize,
                    color: brand.orange
                  }}
                >
                  Know More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
