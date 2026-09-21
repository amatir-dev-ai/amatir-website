// AboutContent.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import TrusteesCarousel from "../components/TrusteesCarousel";
import useSEO from "../hooks/useSEO";
/** Local assets */
const CLOUD = {
  // Hero
  heroBg:
    "/images/afb3c3619b5c47d084a92bd65cea4fd6_k5ucqy.jpg",
  orangeIcon:
    "/images/Orange_Icon_i299iz.svg",

  // Vision/Mission background images (from CSS)
  visionBg:
    "/images/Rectangle_35_hhc9xi.png",
  missionBg:
    "/images/Rectangle_36_rndebv.png",

  // Timeline
  anantTrust:
    "/images/Anant_Charitable_trust_fyw8kf.jpg",
  humbleBegin:
    "/images/Rectangle_68_xbwfg6.jpg",
  growthYears:
    "/images/About_us_growth_pic_wec7au.jpg",
  rootedKnowledge:
    "/images/Name_rooted_in_knowledge_nlbh8n.jpg",

  // Initiatives
  initiativesHeader:
    "/images/AMATIR_7_opdot9.jpg",
  vidyaIcon:
    "/images/Vidya_Scholorship_Icon_fzwkhr.png",
  dispensaryIcon:
    "/images/Charitable_Dispensary_Icon_xemjhq.svg",
  communityIcon:
    "/images/Community_Engagement_Icon_jinhvv.svg",
};

export default function AboutContent() {
  useSEO({
    title: 'Modern Gurukul School in India | About Amatir Kanya Gurukul',
    description: 'Learn about Amatir Kanya Gurukul, a modern Gurukul school in India blending CBSE education, Indian values, academic excellence and holistic development for girls.',
    keywords: ''
  });
  // Responsive media queries for different devices
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isVerySmallScreen = useMediaQuery({ maxWidth: 1024 });
  const isLowHeight = useMediaQuery({ maxHeight: 600 });
  const timelineContainerRef = useRef(null);
  const movingDotRef = useRef(null);
  const rowRefs = useRef([]);

  // Calculate proper hero section height accounting for header
  const getHeroHeight = () => {
    if (isMobile) return 'calc(100vh - 4rem)'; // Account for mobile header (64px)
    if (isVerySmallScreen) return 'calc(100vh - 5rem)'; // Account for small laptop header (80px)
    if (isLowHeight) return 'calc(100vh - 4.5rem)'; // Account for low height screens
    return 'calc(100vh - 5.5rem)'; // Account for desktop header (88px)
  };

  /** ---------- DATA ---------- */
  const timeline = useMemo(
    () => [
      {
        date: "2002",
        title: "Anant Charitable Trust",
        text:
          "Founded by retired electrical engineering professor Mr. B.S. Nehra, Anant Charitable Trust began in 2002 with a vision to uplift women through education—basic, technical, and higher learning—by reviving the principles of the gurukul education system to meet the needs of modern times.",
        img: CLOUD.anantTrust,
      },
      {
        date: "2002 May",
        title: "Humble Beginnings in Kurukshetra",
        text:
          "Our all-girls residential school was established in Bachgaon Gamri, Kurukshetra, Haryana, as a beacon of traditional Indian education. Starting with just 27 girls in a modest three-room facility that served as both school and hostel, it embodied the spirit of a gurukul in India, offering character building for girls through discipline, community living, and values-based learning.",
        img: CLOUD.humbleBegin,
      },
      {
        date: "2008 April",
        title: "Growth Over the Years",
        text:
          "What began as a humble initiative has evolved into a thriving institution spread across a 30-acre campus. Amatir now offers holistic education from Pre-Nursery to 10+2 grades, blending ancient wisdom for girls with academic excellence and modern gurukul values. Our state-of-the-art facilities support students and staff in an environment that respects tradition while embracing progress.",
        img: CLOUD.growthYears,
      },
      {
        date: "2016",
        title: "A Name Rooted in Knowledge",
        text:
          "To reflect its progressive vision, Kanya Gurukul was rebranded as Amatir Kanya Gurukul, signifying “Knowledge” in Sanskrit—a name that captures the essence of gurukul education and the school’s unwavering commitment to nurturing empowered, ethical, and confident young women.",
        img: CLOUD.rootedKnowledge,
      },
    ],
    []
  );

  // Trustees content pulled from your about.php (names, roles, bios, and photos). :contentReference[oaicite:6]{index=6} :contentReference[oaicite:7]{index=7}
  const trustees = useMemo(
    () => [
      {
        name: "Late Balwant Singh Nehra",
        role: "Founder",
        photo:
          "/images/Trustee-Balwant_pxclkm.jpg",
        details:
          "Fondly known as ‘Dada Ji,’ he founded Anant Charitable Trust and Amatir Kanya Gurukul at 65 to support girls in his village. An IIT (BHU) Banaras graduate and retired professor from NIT Kurukshetra, he is also a progressive farmer who has positively impacted countless families.",
      },
      {
        name: "Ashish Nehra",
        role: "Principal Trustee",
        photo:
          "Ashish_Nehra.jpg",
        details:
          "Ashish Nehra is a Social Edupreneur and Co-Founder of Amatir Kanya Gurukul, dedicated to making high-quality, holistic education accessible to girls from underserved communities. A Sloan Fellow from London Business School and an Army veteran, he brings 22+ years of diverse experience across technology, farming, and leadership. His mission is to transform young girls into confident, resilient leaders who will shape the future of society and nation-building.",
      },
      {
        name: "Gursewak Singh",
        role: "President",
        photo:
          "/images/Gursewak_Singh.jpeg",
        details:
          "A lawyer, farmer, and passionate sportsperson, he believes deeply in the lessons taught through sports—perseverance, patience, and confidence. A law graduate from Kurukshetra University, he brings quiet strength and vision to the Trust.",
      },
      {
        name: "Dr. R L Kaushik",
        role: "Trustee",
        photo:
          "/images/Trustee-RLKaushik_fiza5i.jpg",
        details:
          "A retired professor of Chemistry and a graduate in Chemical Engineering from Punjab University, Dr. Kaushik brings with him rich academic and administrative experience. He continues to be a guiding force behind the trust and its educational mission.",
      },
      {
        name: "Adittee Naargolkar",
        role: "Trustee",
        photo:
          "/images/Adittee_gyu2qb.jpg",
        details:
          "With academic credentials in Early Childhood Care, Psychology, and Special Needs Education from the UK, Adittee focuses on curriculum design, teacher training, and the creation of engaging learning tools. Her work with leading toy brands and preschools across India reflects her commitment to making learning joyful and discovery-led.",
      },
      {
        name: "Dr. Priti Ojha",
        role: "Vice President",
        photo:
          "/images/Trustee-Priti_lm0jch.jpg",
        details:
          "Dr. Priti Ojha is a seasoned educationist and global trainer. As a British Council Ambassador and Core Skills Master Trainer, she has mentored over 600 schools and supported 100+ teachers in bringing global perspectives into classroom learning. She holds a Doctorate in Computer Science and remains, above all, a passionate teacher.",
      },
    ],
    []
  );

  /** ---------- TRUSTEES CAROUSEL STATE ---------- */
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const perView = () => (window.matchMedia("(max-width: 900px)").matches ? 1 : 3);

  /** ---------- MAP INTERACTION STATE ---------- */
  const [mapActive, setMapActive] = useState(false);

  // keep slides aligned to exact card widths (no half-cards)
  const goTo = (i) => {
    const pv = perView();
    const maxIndex = Math.max(0, trustees.length - pv);
    const clamped = Math.min(Math.max(i, 0), maxIndex);
    setIndex(clamped);

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // compute card width including gap
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || 0);
    const containerWidth = container.clientWidth;
    const cardWidth = (containerWidth - gap * (pv - 1)) / pv;

    track.style.transform = `translateX(-${clamped * (cardWidth + gap)}px)`;
  };

  useEffect(() => {
    // initial position + on resize
    const onResize = () => goTo(index);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, trustees.length]);

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  // Keep one ref per timeline row
  rowRefs.current = timeline.map((_, i) => rowRefs.current[i] || React.createRef());

  // Moving dot: snap to the nearest row center (like Admissions)
  useEffect(() => {
    let raf = 0;

    const measure = () => {
      const container = timelineContainerRef.current;
      const dot = movingDotRef.current;
      if (!container || !dot) return;

      const viewportCenterAbsY = window.scrollY + window.innerHeight / 2;

      // Find row whose center is closest to viewport center
      let nearestIdx = 0;
      let nearestDist = Infinity;
      rowRefs.current.forEach((ref, i) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const centerAbsY = rect.top + window.scrollY + rect.height / 2;
        const dist = Math.abs(centerAbsY - viewportCenterAbsY);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestIdx = i;
        }
      });

      const containerRect = container.getBoundingClientRect();
      const containerTopAbsY = containerRect.top + window.scrollY;
      const targetRect = rowRefs.current[nearestIdx]?.current?.getBoundingClientRect();
      if (!targetRect) return;
      const rowCenterAbsY = targetRect.top + window.scrollY + targetRect.height / 2;
      const yLocal = rowCenterAbsY - containerTopAbsY;

      const minY = 8; // padding to keep the dot inside
      const maxY = containerRect.height - 8;
      const clampedY = Math.max(minY, Math.min(yLocal, maxY));

      dot.style.transform = `translate(-50%, ${clampedY}px)`;
    };

    const onScrollOrResize = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [timeline.length]);

  // Scroll to hero section when page loads
  useEffect(() => {
    const scrollToHero = () => {
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        // Scroll to the hero section
        window.scrollTo({
          top: heroElement.offsetTop,
          behavior: 'smooth'
        });
      }
    };

    // Small delay to ensure the page is fully rendered
    setTimeout(scrollToHero, 100);
  }, []);

  /** ---------- RENDER ---------- */
  return (
    <main className="w-full overflow-hidden">
      {/* HERO */}
      <section
        id="hero"
        className="relative overflow-hidden w-full"
        style={{
          height: "100vh",
          marginTop: "60px",
          minHeight: isVerySmallScreen ? '400px' : '480px'
        }}
      >
        <img
          src={CLOUD.heroBg}
          alt="Students in assembly"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full z-10 mx-auto max-w-[1262px] px-4 flex items-end mt-[-8%] justify-center">
          <div className="text-center w-full" style={{
            transform: isVerySmallScreen ? 'translateY(-10%)' : isMobile ? 'translateY(-5%)' : 'translateY(0)',
            paddingTop: isVerySmallScreen ? '2rem' : isMobile ? '1rem' : '0',
            paddingBottom: isVerySmallScreen ? '2rem' : isMobile ? '1rem' : '0'
          }}>
            <div className="flex justify-center mb-4">
              <img
                alt="Amatir Icon"
                className="w-[60px] h-auto"
                src={CLOUD.orangeIcon}
              />
            </div>
            <h1
              className="cent-schbk-cyrill z-10002"
              style={{
                lineHeight: '1.1',
                color: '#fff'
              }}
            >
              About us
            </h1>
          </div>
        </div>
      </section>

      {/* VISION / MISSION */}
      <section className="mx-auto my-10 w-[80%] max-w-[1290px] overflow-hidden rounded-[15px]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Vision */}
          <div
            className="relative h-[260px] md:h-[300px] flex items-center justify-start p-6 md:p-10"
            style={{
              backgroundImage: `url(${CLOUD.visionBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "scaleX(-1)",
            }}
          >
            <div className="absolute inset-0 bg-[#1C3664]/80" />
            <div className="relative max-w-[80%]" style={{ transform: "scaleX(-1)" }}>
              <h3 className="text-white text-[28px] md:text-[40px] font-[400]">
                Vision
              </h3>
              <p className="mt-2 text-white/95 text-[16px] md:text-[19px] leading-relaxed">
                To Create an environment that enables the making of a self-aware, autonomous, happy and a successful human being.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div
            className="relative h-[260px] md:h-[300px] flex items-center justify-start p-6 md:p-10"
            style={{
              backgroundImage: `url(${CLOUD.missionBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-[#ED6D23]/80" />
            <div className="relative max-w-[80%]">
              <h3 className="text-white text-[28px] md:text-[40px] font-[400]">
                Mission
              </h3>
              <p className="mt-2 text-white/95 text-[16px] md:text-[19px] leading-relaxed">
                To Nurture Truly Empowered Girl Child And Open Doors For Mainstream And Alternate Careers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY (flexbox, exact L/R placement) */}
      <section className="bg-[#F9F9F9] py-12 md:py-16">
        <div className="mx-auto w-[92%] max-w-[1100px]">
          <h2
            className="text-[#1C3664] text-center tracking-[0.02em]"
            style={{ fontFamily: "CentSchbkCyrill BT, serif", fontWeight: 400, fontSize: "clamp(34px,4vw,52px)" }}
          >
            Amatir's Journey Through the Years
          </h2>

          {/* spine (desktop only) */}
          <div className="relative mt-10 md:mt-12" ref={timelineContainerRef}>
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-[#ED6D23]" />
            {/* Moving dot Jai bhairavi (desktop) */}
            <span
              ref={movingDotRef}
              className="hidden md:block absolute left-1/2  z-10 h-4 w-4 rounded-full bg-[#ED6D23] transition-transform duration-500 ease-[cubic-bezier(.22,.61,.36,1)]"
              style={{ top: 0, transform: "translate(5%, 5px)", boxShadow: "0 0 0 6px rgba(237,109,35,0.35), 0 0 10px rgba(237,109,35,0.55), 0 0 22px rgba(237,109,35,0.35)" }}
            />

            {timeline.map((t, i) => {
              const leftHasPhoto = i % 2 === 0; // row 0,2,... photo on LEFT; row 1,3,... photo on RIGHT
              const cardBg = leftHasPhoto ? "bg-[#EFF3FA]" : "bg-[#F7F3ED]";

              return (
                <div ref={rowRefs.current[i]} key={t.title + i} className="relative py-10 md:py-14">

                  <div
                    className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 ${leftHasPhoto ? "" : "md:flex-row-reverse"
                      }`}
                  >
                    {/* PHOTO+YEAR side (locked to its half) */}
                    <div
                      className={`w-full md:w-1/2 flex flex-col ${leftHasPhoto ? "items-end md:pr-10" : "items-start md:pl-10"
                        }`}
                    >
                      <div
                        className="mb-2 text-[#1C3664] font-semibold whitespace-nowrap self-center md:self-auto"
                        style={{ fontFamily: "CentSchbkCyrill BT, serif", fontSize: "clamp(18px,2.2vw,24px)" }}
                      >
                        {t.date}
                      </div>

                      <img
                        src={t.img}
                        alt={t.title}
                        className={`rounded-[10px] object-cover w-full max-w-[280px] md:max-w-[300px] ${leftHasPhoto ? "self-center md:self-end" : "self-center md:self-start"
                          }`}
                      />
                    </div>

                    {/* CARD side */}
                    <article className={`w-full md:w-1/2 rounded-[20px] p-6 ${cardBg}`}>
                      <h4
                        className="text-[#1C3664] mb-2"
                        style={{ fontFamily: "CentSchbkCyrill BT, serif", fontSize: "clamp(20px,2.4vw,24px)" }}
                      >
                        {t.title}
                      </h4>
                      <p
                        className="leading-7 text-[#555]"
                        style={{ fontFamily: "Univers, ui-sans-serif, system-ui", fontSize: "clamp(15px,1.8vw,16px)" }}
                      >
                        {t.text}
                      </p>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INITIATIVES */}
      <section className="py-12 md:py-16">
        <div className="relative mx-auto w-[90%] max-w-[1290px]">
          <div className="relative overflow-hidden rounded-[8px]">
            <img
              src={CLOUD.initiativesHeader}
              alt="Initiatives"
              className="h-[560px] w-full object-cover md:h-[680px]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1C3664]/60 to-[#0E2B5C]" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-10 md:bottom-16 w-[90%] text-center text-white">
              <h2 className="font-serif text-[#ED6D23] text-[48px] md:text-[64px] leading-none font-normal">
                Initiatives
              </h2>
              <p className="mx-auto mt-3 md:mt-5 max-w-[900px] text-[16px] leading-7 md:text-[20px] md:leading-9">
                Anant Charitable Trust is deeply committed to fostering awareness, driving
                positive change, and uplifting the local and wider communities through
                initiatives such as
              </p>
            </div>
          </div>
          <div className="relative z-[2] -mt-10 grid grid-cols-1 gap-6 p-6 md:-mt-14 md:grid-cols-3">
            {[
              { key: "sch", icon: CLOUD.vidyaIcon, title: "Vidyaश्री Scholarship", bg: "bg-[#FEF5EC]" },
              { key: "disp", icon: CLOUD.dispensaryIcon, title: "Charitable Dispensary", bg: "bg-[#EEF3FA]" },
              { key: "comm", icon: CLOUD.communityIcon, title: "Community Engagement", bg: "bg-[#FEF5EC]" },
            ].map((it) => (
              <article key={it.key} className="text-center">
                <div className={`mx-auto mb-6 flex h-[120px] w-[120px] items-center justify-center rounded-full ${it.bg}`}>
                  <img src={it.icon} alt="" className="h-[60px] w-[60px]" />
                </div>
                <h4 className="text-[#1C3664] text-[20px] md:text-[24px] mb-3">{it.title}</h4>
                <p className="px-4 text-[15px] md:text-[16px] leading-7 text-[#555]">
                  {it.key === "sch" && "To uplift deserving students, the Trust offers 100% scholarships for Class 9 and 11 students. These scholarships are awarded to top performers who come from humble backgrounds, recognizing both their potential and perseverance."}
                  {it.key === "disp" && "The Anant Charitable Trust operates a free dispensary on Amatir's premises, offering treatment and medicines to residents of neighboring villages, ensuring accessible healthcare for all."}
                  {it.key === "comm" && "Students bring meaningful change to over 125 villages through impactful street plays and theater, raising awareness on crucial issues such as Beti Bachao Beti Padhao, sanitation, and women empowerment."}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TRUSTEES & OFFICE BEARERS — CAROUSEL */}
      <section className="bg-[#F9F9F9] py-12 md:py-16">
        <div className="mx-auto w-[90%] max-w-[1290px]">
          <h2 className="text-center text-[#1C3664] text-[26px] md:text-[36px]">
            Trustees and Office Bearers
          </h2>
          <p className="mx-auto mb-10 max-w-[820px] text-center text-[16px] md:text-[18px] leading-8 text-[#3A2323]">
            Behind Amatir's vision is a group of committed individuals—educators, professionals, and changemakers—who bring their diverse experience and shared purpose to guide the school and its students.
          </p>

          {/* Slider container clips edges; we compute exact card width so there are never half cards */}
          <TrusteesCarousel />
        </div>
      </section>


      {/* MAP / LOCATION (placeholder embed) */}
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
