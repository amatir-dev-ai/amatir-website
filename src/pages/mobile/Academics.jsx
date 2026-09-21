// AcademicsPage.jsx
import React, { useMemo, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import GurukulCard from "../../components/GurukulCard";
import MobileGurukul from "../../components/MobileGurukul";
import { useNavigate } from "react-router-dom";
import useSEO from "../../hooks/useSEO";

/** Local assets */
const IMG = {
  hero: "/images/AMATIR_6_wfestb.jpg",
  skillMain: "/images/Project_Based_oc2aa7.jpg",
  foundationShot: "/images/Candid-Primary02_ijhsoz.jpg",
  jee: "/images/Rectangle_88_l0lzko.jpg",
  neet: "/images/Rectangle_89_fyffgv.jpg",
  cuet: "/images/CUET_apubgr.jpg",
  campus: "/images/Secondary_pguja6.jpg",
  gurukulIcon: "/images/GuruKul_BlueIcon_cxzwv1.svg",
  g1: "/images/Rectangle_63_phii3n.jpg",
  g2: "/images/Rectangle_123_bj4blo.jpg",
  g3: "/images/Rectangle_116_stpd3q.jpg",
  g4: "/images/Rectangle_120_mpm2ah.jpg",
  g5: "/images/Rectangle_121_x91wci.jpg",
  g6: "/images/Rectangle_138_io9oub.jpg",
  t1: "/images/Rectangle_115_lyh3q2.png",
  t2: "/images/Rectangle_115_1_uucvan.png",
  t3: "/images/Rectangle_115_2_onwmd4.png",
  t4: "/images/Neha_Dhiman.png",
  band: "/images/Sadhana_tapas_wn5vod.jpg",
  projectBased: "/images/Project_Based_oc2aa7.jpg",
  fln: "/images/Foundation_and_literacy_eiqduq.jpg",
  artIntegrated: "/images/Art_Integrated_nezarr.jpg",
  sandhya: "/images/Sandhya_gdn4qm.jpg",
  atmaGyan: "/images/Atma_Gyan_y46mhe.jpg",
  hawan: "/images/Hawan_jtrewk.jpg",
  senior: "/images/senior_qucz8c.jpg",
};

/** Tiny helpers */
const Container = ({ children }) => (
  <div className="mx-auto" style={{ width: "min(92vw, 72rem)" }}>
    {children}
  </div>
);

const Serif = "font-['CentSchbkCyrill_BT:Roman',_serif]";

const Ratio = ({ src, alt = "", ratio = "100%" }) => (
  <div className="relative w-full overflow-hidden rounded-[0.8rem] shadow-lg">
    <div className="relative w-full" style={{ paddingBottom: ratio }}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  </div>
);

export default function AcademicsPage() {
  useSEO({
    title: 'CBSE Curriculum with JEE & NEET Prep | Amatir Kanya Gurukul',
    description: 'Looking for the best academic school in Kurukshetra? Amatir Kanya Gurukul provides CBSE education with JEE & NEET preparation and modern learning.',
    keywords: ''
  });
  // Responsive media queries for different devices
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });
  const isVerySmallScreen = useMediaQuery({ maxWidth: 1024 });
  const isLowHeight = useMediaQuery({ maxHeight: 600 });

  // Calculate proper hero section height accounting for header
  const getHeroHeight = () => {
    if (isMobile) return "calc(100vh - 4rem)"; // Account for mobile header (64px)
    if (isVerySmallScreen) return "calc(100vh - 5rem)"; // Account for small laptop header (80px)
    if (isLowHeight) return "calc(100vh - 4.5rem)"; // Account for low height screens
    return "calc(100vh - 5.5rem)"; // Account for desktop header (88px)
  };

  // Touch/swipe support for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  /** Teachers slider state (for the orange round arrows) */
  const teachers = useMemo(
    () => [
      {
        name: "Mr. Vijay Kumar",
        role: "Educator - Mathematics",
        photo: IMG.t1,
        details:
          "Mathematics educator focused on fostering analytical thinking, problem-solving, and concept clarity. He integrates interactive pedagogy and learner-centric strategies to make Mathematics engaging and meaningful for students.",
      },
      {
        name: "Ms. Rishu Singh",
        role: "Educator - Mathematics",
        photo: IMG.t2,
        details:
          "Mathematics educator who promotes logical reasoning, conceptual clarity, and problem-solving skills. She designs learner-centric lessons to build confidence and mathematical thinking among middle school students.",
      },
      {
        name: "Ms. Neha Dhiman",
        role: "Educator - Home Science",
        photo: IMG.t4,
        details:
          "PGT Home Science and Food Production, promotes experiential learning, life skills, and wellness education. She guides students in making informed lifestyle choices and developing practical, holistic competencies.",
      },
      {
        name: "Mr. Mayank Bhardwaj",
        role: "Educator - PGT Fine Arts",
        photo: IMG.t3,
        details:
          "Integrates creativity, design thinking, and visual literacy into art education. He fosters self-expression and innovation through experiential and skill-based learning in a dynamic classroom environment.",
      },
    ],
    []
  );
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const [i, setI] = useState(0);
  const goTo = (n) => {
    // Show 4 cards on desktop, 2 on tablet, 1 on mobile
    let pv;
    if (window.matchMedia("(max-width: 768px)").matches) {
      pv = 1; // Mobile: 1 card
    } else if (window.matchMedia("(max-width: 1024px)").matches) {
      pv = 2; // Tablet: 2 cards
    } else {
      pv = 4; // Desktop: 4 cards
    }

    const max = Math.max(0, teachers.length - pv);
    const clamped = Math.min(Math.max(n, 0), max);
    setI(clamped);

    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    const w = wrap.clientWidth;
    const card = (w - gap * (pv - 1)) / pv;
    track.style.transform = `translateX(-${clamped * (card + gap)}px)`;
  };
  useEffect(() => {
    const R = () => goTo(i);
    R();
    window.addEventListener("resize", R);
    return () => window.removeEventListener("resize", R);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, teachers.length]);

  const [activeTab, setActiveTab] = useState("Foundation");
  const [activeSkill, setActiveSkill] = useState("Project-Based");

  /** Preparing for Excellence (mobile carousel) */
  const excellenceItems = useMemo(
    () => [
      {
        key: "jee",
        title: "JEE",
        image:
          IMG.jee ||
          "https://images.unsplash.com/photo-1523240798131-8c6c2a7c3c8c?w=400&h=300&fit=crop&crop=center",
        description:
          "A national-level entrance exam for admission to top engineering institutes like IITs and NITs.",
      },
      {
        key: "neet",
        title: "NEET",
        image:
          IMG.neet ||
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&crop=center",
        description:
          "The qualifying exam for students aspiring to study medicine and allied health sciences in India.",
      },
      {
        key: "olympiads",
        title: "OLYMPIADS",
        image: "/images/Olympiads_vvurc0.jpg",
        description:
          "Rigorous subject-based assessments in Math and Science that nurture analytical thinking, problem-solving, and academic excellence.",
      },
      {
        key: "cuet",
        title: "CUET",
        image:
          IMG.cuet ||
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center",
        description:
          "A national-level entrance exam for admission to central universities and other leading institutions across India, covering a wide range of undergraduate courses.",
      },
    ],
    []
  );

  const exWrapRef = useRef(null);
  const exTrackRef = useRef(null);
  const [exI, setExI] = useState(0);

  const goToEx = (n) => {
    const pv = 1; // mobile: 1 per view
    const max = Math.max(0, excellenceItems.length - pv);
    const clamped = Math.min(Math.max(n, 0), max);
    setExI(clamped);
    const wrap = exWrapRef.current;
    const track = exTrackRef.current;
    if (!wrap || !track) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    const w = wrap.clientWidth;
    const card = w; // one card per view
    track.style.transform = `translateX(-${clamped * (card + gap)}px)`;
  };
  useEffect(() => {
    const R = () => goToEx(exI);
    R();
    window.addEventListener("resize", R);
    return () => window.removeEventListener("resize", R);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exI, excellenceItems.length]);

  // Touch navigation for excellence carousel
  const [exTouchStart, setExTouchStart] = useState(null);
  const [exTouchEnd, setExTouchEnd] = useState(null);
  const onExTouchStart = (e) => {
    setExTouchEnd(null);
    setExTouchStart(e.targetTouches[0].clientX);
  };
  const onExTouchMove = (e) => {
    setExTouchEnd(e.targetTouches[0].clientX);
  };
  const onExTouchEnd = () => {
    if (!exTouchStart || !exTouchEnd) return;
    const distance = exTouchStart - exTouchEnd;
    const isLeft = distance > 50;
    const isRight = distance < -50;
    if (isLeft) {
      goToEx(exI + 1);
    } else if (isRight) {
      goToEx(exI - 1);
    }
  };

  // Touch event handlers for mobile swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goTo(i + 1);
    } else if (isRightSwipe) {
      goTo(i - 1);
    }
  };

  // Reset animation when tab changes
  useEffect(() => {
    const contentElement = document.querySelector(
      `[key="content-${activeTab}"]`
    );
    const imageElement = document.querySelector(`[key="image-${activeTab}"]`);

    if (contentElement && imageElement) {
      // Remove and re-add the fadeIn class to trigger animation
      contentElement.classList.remove("fadeIn");
      imageElement.classList.remove("fadeIn");

      // Force reflow
      void contentElement.offsetWidth;
      void imageElement.offsetWidth;

      // Re-add the class
      contentElement.classList.add("fadeIn");
      imageElement.classList.add("fadeIn");
    }
  }, [activeTab]);

  // (skill tab animation removed — all items are open by default now)

  const tabData = [
    {
      id: "Foundation",
      tagline: "The Foundation Stage is where curiosity begins to bloom.",
      content:
        "Through hands-on projects and real-world applications, children learn by doing — asking questions, solving problems, and working together. No rote learning, no heavy textbooks — just meaningful experiences that spark independent thinking and a lifelong love for learning.",
      image: IMG.foundationShot,
    },
    {
      id: "Middle",
      tagline:
        "In the Middle Stage, learning shifts from memorizing to mastering.",
      content:
        "A skill-based approach empowers students to think critically, communicate clearly, and solve real-world problems. With AI-powered tools like Embibe, each child learns at their own pace — gaining deeper understanding and lasting confidence. It's purposeful, personalised learning that prepares them for life beyond the classroom.",
      image: "/images/1_10_cqscjr.jpg",
    },
    {
      id: "Secondary",
      tagline: "Where students grow into confident, capable individuals.",
      content:
        "Beyond academics, the focus is on building character, leadership, and purpose. With personalised academic support and real-world problem-solving, students develop resilience, sharpen exam readiness, and take ownership of their learning journey. It's preparation for life — not just the board exams.",
      image: "/images/Secondary_lmc82a.jpg",
    },
    {
      id: "Senior",
      tagline:
        "Shaping confident, self-aware leaders — rooted in values, ready for the world",
      content:
        "Academic excellence goes hand-in-hand with life skills, global exposure, and purpose-driven growth. From university readiness to leadership development, students are empowered to think boldly, act responsibly, and lead with both head and heart.",
      image: IMG.senior,
    },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab((prev) => (prev === tabId ? null : tabId));
  };

  const getCurrentTabData = () => {
    return tabData.find((tab) => tab.id === activeTab);
  };

  const navigate = useNavigate();

  return (
    <main className="w-full overflow-hidden bg-white">
      {/* HERO */}
      <section
        className="relative flex items-end"
        style={{ height: "100vh", marginTop: "60px" }}
      >
        <img
          src={IMG.hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1C3664]" />
        <Container>
          <div
            className="relative w-full text-center"
            style={{
              paddingBottom: isMobile ? "4vh" : "8vh",
            }}
          >
            <div className="flex justify-center mb-4">
              <img
                alt="Amatir Icon"
                className="w-[60px] h-auto"
                src="/images/Orange_Icon_i299iz.svg"
              />
            </div>
            <h1
              className={`${Serif} text-white font-[400]`}
              style={{
                fontSize: "clamp(2rem,5vw,3.8rem)",
                lineHeight: 1.12,
                marginBottom: "35%",
              }}
            >
              Academics
            </h1>
          </div>
        </Container>
      </section>

      {/* CURRICULUM */}
      <section style={{ paddingTop: "8vh", paddingBottom: "8vh" }}>
        <Container>
          <h2
            className={`${Serif} text-[#1C3664] text-center font-[400]`}
            style={{ fontSize: "clamp(1.6rem,3.1vw,2.6rem)", lineHeight: 1.15 }}
          >
            Curriculum
          </h2>
          <p
            className="mx-auto text-center text-[#3a2323]/90"
            style={{
              maxWidth: "70ch",
              lineHeight: 1.8,
              fontSize: "clamp(0.95rem,1.1vw,1.05rem)",
              marginTop: "1vh",
            }}
          >
            A future-ready curriculum aligned with CBSE, designed to grow with
            your child. From building curiosity in early years to developing
            real-world skills, confidence, and character in higher grades —
            every stage prepares students not just for exams, but for life.
          </p>

          {/* accordion */}
          <div className="mt-[4vh]">
            {tabData.map((tab, idx) => {
              const isOpen = activeTab === tab.id;
              return (
                <div
                  key={tab.id}
                  className={`border-t ${idx === tabData.length - 1 ? "border-b" : ""
                    } border-[#E6E9EF]`}
                  style={{ padding: "1rem 0" }}
                >
                  <button
                    type="button"
                    onClick={() => handleTabClick(tab.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between cursor-pointer"
                    style={{ padding: "0.6rem 0" }}
                  >
                    <div>
                      <div
                        className={`${Serif} text-[#1C3664]`}
                        style={{ fontSize: "clamp(1.05rem,1.3vw,1.25rem)" }}
                      >
                        {tab.id}
                      </div>
                      {isOpen && (
                        <span
                          className="block rounded-full bg-[#ED6D23]"
                          style={{
                            height: "0.22rem",
                            width: "5rem",
                            marginTop: "0.55rem",
                          }}
                        />
                      )}
                    </div>
                    <span
                      className="grid place-items-center rounded-full text-white"
                      style={{
                        width: "1.6rem",
                        height: "1.6rem",
                        background: "#ED6D23",
                      }}
                    >
                      {isOpen ? (
                        <ChevronUp style={{ width: "1rem", height: "1rem" }} />
                      ) : (
                        <ChevronDown
                          style={{ width: "1rem", height: "1rem" }}
                        />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div>
                      <div
                        key={`content-${tab.id}`}
                        className="fadeIn transition-all duration-500 cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                        style={{ marginTop: "1.2rem" }}
                      >
                        <h3
                          className={`${Serif} text-[#1C3664] font-[400]`}
                          style={{
                            fontSize: "clamp(1.6rem,2.5vw,2.25rem)",
                            lineHeight: 1.2,
                            marginBottom: "1.2rem",
                          }}
                        >
                          {tab.tagline}
                        </h3>
                        <p
                          className="text-[#3a2323]/90"
                          style={{
                            lineHeight: 1.85,
                            fontSize: "clamp(0.98rem,1.05vw,1.05rem)",
                          }}
                        >
                          {tab.content}
                        </p>
                      </div>
                      <div
                        key={`image-${tab.id}`}
                        className="fadeIn transition-all duration-500 cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                        style={{ marginTop: "1.4rem" }}
                      >
                        <Ratio src={tab.image} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* SKILL BASED LEARNING */}
      <section style={{ paddingTop: "8vh", paddingBottom: "8vh" }}>
        <Container>
          <h2
            className={`${Serif} text-[#1C3664] text-center font-[400]`}
            style={{ fontSize: "clamp(1.6rem,3.1vw,2.6rem)" }}
          >
            Skill Based Learning
          </h2>
          <p
            className="mx-auto text-center text-[#3a2323]/90"
            style={{
              maxWidth: "72ch",
              lineHeight: 1.8,
              fontSize: "clamp(0.95rem,1.1vw,1.05rem)",
              marginTop: "1vh",
            }}
          >
            We emphasize practical learning that helps children apply concepts
            with confidence. By engaging in meaningful activities, they build a
            strong academic foundation while developing abilities that support
            independent learning and personal growth.
          </p>

          {/* Mobile layout with image and tabs */}
          {isMobile ? (
            <div className="mt-[4vh]">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Left image */}
                <div className="order-1">
                  <Ratio
                    src={
                      activeSkill === "Project-Based"
                        ? IMG.projectBased
                        : activeSkill ===
                          "Foundational Literacy & Numeracy (FLN)"
                          ? IMG.fln
                          : activeSkill === "Art-Integrated"
                            ? IMG.artIntegrated
                            : IMG.skillMain
                    }
                  />
                </div>

                {/* Right tab list */}
                <div className="relative order-2">
                  <div className="absolute left-2 top-0 bottom-0 w-px bg-[#D9DFEA]" />
                  <ul className="space-y-4 pl-6">
                    {[
                      {
                        title: "Project-Based",
                        content:
                          "Hands-on projects that bring learning to life—students build, experiment, and solve real-world problems while developing creativity, critical thinking, and collaboration.",
                        image: IMG.projectBased,
                      },
                      {
                        title: "Foundational Literacy & Numeracy (FLN)",
                        content:
                          "Focused on strong basics in reading, writing, and math—empowering every child with the core skills needed for future learning and everyday life.",
                        image: IMG.fln,
                      },
                      {
                        title: "Art-Integrated",
                        content:
                          "Blending art with academics to make learning fun and memorable—students explore subjects creatively through visuals, stories, and design.",
                        image: IMG.artIntegrated,
                      },
                    ].map((section, k) => {
                      const isActive = section.title === activeSkill;
                      return (
                        <li key={k}>
                          <button
                            onClick={() => setActiveSkill(section.title)}
                            className="w-full text-left cursor-pointer"
                          >
                            <div className="flex items-start gap-3">
                              <span
                                className="mt-2 h-5 w-[3px] rounded"
                                style={{
                                  backgroundColor: isActive
                                    ? "#ED6D23"
                                    : "transparent",
                                }}
                              />
                              <div>
                                <h4
                                  className={`${Serif}`}
                                  style={{
                                    fontSize: "clamp(1.1rem,1.3vw,1.25rem)",
                                    color: isActive ? "#1C3664" : "#9CA3AF",
                                    fontWeight: isActive ? 600 : 400,
                                  }}
                                >
                                  {section.title}
                                </h4>
                                {/* Only show description for active item */}
                                {isActive && (
                                  <p
                                    className="mt-1 text-[#000]"
                                    style={{
                                      fontSize: "clamp(0.95rem,1.05vw,1.05rem)",
                                      lineHeight: 1.8,
                                    }}
                                  >
                                    {section.content}
                                  </p>
                                )}
                              </div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Desktop layout - Image first, then the open tabs */}
              <div className="mt-[4vh]">
                <Ratio src={IMG.skillMain} />
              </div>

              <div className="mt-[4vh] flex flex-col" style={{ gap: "2vh" }}>
                {[
                  {
                    title: "Project-Based",
                    content:
                      "Hands-on projects that bring learning to life—students build, experiment, and solve real-world problems while developing creativity, critical thinking, and collaboration.",
                    image: IMG.projectBased,
                  },
                  {
                    title: "Foundational Literacy & Numeracy (FLN)",
                    content:
                      "Focused on strong basics in reading, writing, and math—empowering every child with the core skills needed for future learning and everyday life.",
                    image: IMG.fln,
                  },
                  {
                    title: "Art-Integrated",
                    content:
                      "Blending art with academics to make learning fun and memorable—students explore subjects creatively through visuals, stories, and design.",
                    image: IMG.artIntegrated,
                  },
                ].map((section, k) => (
                  <article
                    key={k}
                    className="relative rounded-[0.8rem] bg-[#F7F8FA] shadow-sm"
                  >
                    <span
                      className="absolute left-0 top-0 bottom-0 rounded-r-[999rem] bg-[#ED6D23]"
                      style={{ width: "0.36rem" }}
                    />
                    {/* Header */}
                    <div
                      className="flex items-center"
                      style={{
                        padding: "1rem 1.2rem 1rem 1.6rem",
                        minHeight: "3.2rem",
                      }}
                    >
                      <div className="mr-4 mt-1">
                        <BookOpen
                          className="text-[#1C3664]"
                          style={{ width: "1.4rem", height: "1.4rem" }}
                        />
                      </div>
                      <h4
                        className={`${Serif} text-[#1C3664]`}
                        style={{ fontSize: "clamp(1.1rem,1.3vw,1.25rem)" }}
                      >
                        {section.title}
                      </h4>
                    </div>
                    {/* Body */}
                    <div className="px-[1.6rem] pb-[1.2rem]">
                      <p
                        className="text-[#000]"
                        style={{
                          fontSize: "clamp(0.95rem,1.05vw,1.05rem)",
                          lineHeight: 1.8,
                        }}
                      >
                        {section.content}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </Container>
      </section>

      {/* PREPARING FOR EXCELLENCE */}
      <section style={{ paddingTop: "8vh", paddingBottom: "8vh" }}>
        <Container>
          <h2
            className={`${Serif} text-[#1C3664] text-center font-[400]`}
            style={{ fontSize: "clamp(1.6rem,3.1vw,2.6rem)" }}
          >
            Preparing for Excellence
          </h2>
          <p
            className="mx-auto text-center text-[#3a2323]/90"
            style={{
              maxWidth: "70ch",
              lineHeight: 1.8,
              fontSize: "clamp(0.95rem,1.1vw,1.05rem)",
              marginTop: "1vh",
            }}
          >
            Expert faculty with a proven track record provide structured
            guidance for JEE, NEET, and Olympiads. Through focused study plans,
            regular assessments, and result-driven strategies, students are
            prepared to excel in competitive exams.
          </p>

          {/* Mobile carousel */}
          <div className="mt-[5vh]">
            <div
              ref={exWrapRef}
              className="overflow-hidden"
              onTouchStart={onExTouchStart}
              onTouchMove={onExTouchMove}
              onTouchEnd={onExTouchEnd}
            >
              <div
                ref={exTrackRef}
                className="grid transition-transform duration-500 ease-out"
                style={{
                  gridAutoFlow: "column",
                  gridAutoColumns: "100%",
                  columnGap: "1rem",
                }}
              >
                {excellenceItems.map((it, idx) => (
                  <article
                    key={it.key}
                    className="group overflow-hidden rounded-[0.9rem] shadow-md relative cursor-pointer"
                    style={{ height: "clamp(308px, 50vh, 420px)" }}
                  >
                    <img
                      src={it.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    {/* Bottom overlay: 40% height. Default shows 30% (translateY 25%). On hover/tap, slides up to reveal full 40%. */}
                    <div
                      className="absolute left-0 right-0 bottom-0 text-white px-4 py-4 flex flex-col justify-center items-start"
                      style={{
                        height: "40%",
                        background: "#ED6D23",
                        transform: "translateY(0%)",
                        transition: "transform 300ms ease-in-out",
                      }}
                    >
                      <h4
                        className={`${Serif} text-white mb-2 font-[600]`}
                        style={{ fontSize: "clamp(1.1rem,1.3vw,1.25rem)" }}
                      >
                        {it.title}
                      </h4>
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          fontSize: "clamp(0.85rem,1vw,0.95rem)",
                          lineHeight: 1.6,
                        }}
                      >
                        {it.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            {/* Mobile navigation dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {excellenceItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToEx(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${idx === exI ? "bg-[#ED6D23]" : "bg-gray-300"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* DISCOVER OUR CAMPUS BAND */}
      <section className="relative w-full " style={{ height: "55vh" }}>
        <div className="relative w-full h-full ">
          <img src={IMG.campus} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#1C3664]/92" />
          <div
            className="absolute inset-0 grid place-items-center text-center text-white"
            style={{ padding: "5vh 6vw" }}
          >
            <div style={{ maxWidth: "70ch" }} className="p-12">
              <h3
                className={`${Serif} font-[400]`}
                style={{
                  fontSize: "clamp(1.3rem,2.3vw,2rem)",
                  marginBottom: "1vh",
                }}
              >
                Discover Our Campus
              </h3>
              <p
                className="opacity-95"
                style={{
                  fontSize: "clamp(0.95rem,1.05vw,1.05rem)",
                  lineHeight: 1.8,
                }}
              >
                Explore a serene, tech-enabled campus where tradition meets
                innovation—designed to nurture holistic growth, learning, and
                well-being.
              </p>
              <a
                href="/facilities"
                className="my-[2vh] inline-block rounded-full bg-[#ED6D23] text-white shadow-lg hover:brightness-110"
                style={{
                  padding: "0.7rem 1.4rem",
                  fontSize: "clamp(0.95rem,1.05vw,1.05rem)",
                }}
              >
                View Facilities
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GURUKUL */}
      <MobileGurukul id="gurukul" />

      {/* TEACHERS */}
      <section
        className="bg-[#F8F9FB]"
        style={{ paddingTop: "7vh", paddingBottom: "7vh" }}
      >
        <Container>
          <h2
            className={`${Serif} text-[#1C3664] text-center font-[400]`}
            style={{ fontSize: "clamp(1.44rem,2.79vw,2.6rem)" }}
          >
            Know our Teachers
          </h2>
          <p
            className="mx-auto text-center text-[#3a2323]/90"
            style={{
              maxWidth: "60ch",
              lineHeight: 1.8,
              fontSize: "clamp(0.855rem,0.945vw,1.05rem)",
            }}
          >
            Meet our dedicated team of educators who inspire and guide our
            students
          </p>

          <div className="relative mt-[4vh]">
            {isMobile ? (
              <div className="flex flex-col" style={{ gap: "1.25rem" }}>
                {teachers.map((t, idx) => (
                  <article
                    key={t.name + idx}
                    className="rounded-[0.9rem] bg-white shadow-sm overflow-hidden"
                  >
                    <div
                      className="relative w-full"
                      style={{ paddingBottom: "100%" }}
                    >
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    <div className="px-4 py-3 text-left">
                      <h5
                        className={`${Serif} text-[#1C3664]`}
                        style={{ fontSize: "1.25rem" }}
                      >
                        {t.name}
                      </h5>
                      <p
                        className="text-[#1C3664] mt-1"
                        style={{ fontSize: "0.95rem" }}
                      >
                        {t.role}
                      </p>
                      <span
                        className="block rounded-full bg-[#ED6D23]"
                        style={{
                          height: "0.22rem",
                          width: "3.5rem",
                          marginTop: "0.45rem",
                        }}
                      />
                      <p
                        className="text-[#3a2323] mt-4"
                        style={{ fontSize: "0.95rem", lineHeight: 1.7 }}
                      >
                        {t.details}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <>
                {/* Navigation arrows */}
                <div
                  className="absolute right-[32%] -top-[2.6rem] hidden md:flex items-center"
                  style={{ gap: "0.6rem" }}
                >
                  <button
                    onClick={() => goTo(i - 1)}
                    disabled={i === 0}
                    className="grid place-items-center rounded-full text-white transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      width: "2.2rem",
                      height: "2.2rem",
                      background: "#ED6D23",
                    }}
                    aria-label="Previous"
                  >
                    <ChevronLeft
                      style={{ width: "1.1rem", height: "1.1rem" }}
                    />
                  </button>
                  <button
                    onClick={() => goTo(i + 1)}
                    disabled={
                      i >= teachers.length - (isMobile ? 1 : isTablet ? 2 : 4)
                    }
                    className="grid place-items-center rounded-full text-white transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      width: "2.2rem",
                      height: "2.2rem",
                      background: "#ED6D23",
                    }}
                    aria-label="Next"
                  >
                    <ChevronRight
                      style={{ width: "1.1rem", height: "1.1rem" }}
                    />
                  </button>
                </div>

                <div ref={wrapRef} className="overflow-hidden">
                  <div
                    ref={trackRef}
                    className="grid transition-transform duration-500 ease-out"
                    style={{
                      gridAutoFlow: "column",
                      gridAutoColumns: "1fr",
                      columnGap: isMobile
                        ? "1rem"
                        : isTablet
                          ? "1.2rem"
                          : "clamp(0.9rem,1.2rem,1.2rem)",
                    }}
                  >
                    {teachers.map((t, idx) => (
                      <article
                        key={t.name + idx}
                        className="group overflow-hidden rounded-[0.9rem] shadow-md bg-white text-[#1C3664] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                        style={{ minWidth: 0 }}
                      >
                        <div
                          className="relative w-full overflow-hidden"
                          style={{ paddingBottom: "132%" }}
                        >
                          <img
                            src={t.photo}
                            alt={t.name}
                            className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                          />

                          {/* Hover overlay with content */}
                          <div className="absolute inset-0 bg-gradient-to-b from-[#0E2349]/95 to-[#0E2349]/90 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center p-6 transform translate-y-2 group-hover:translate-y-0">
                            <h5
                              className={`${Serif} font-[500] mb-3 text-center`}
                              style={{
                                fontSize: "clamp(0.945rem,1.08vw,1.2rem)",
                              }}
                            >
                              {t.name}
                            </h5>
                            <p
                              className="mb-4 text-center"
                              style={{
                                whiteSpace: "pre-line",
                                fontSize: "clamp(0.81rem,0.9vw,1rem)",
                              }}
                            >
                              {t.role}
                            </p>
                            <p
                              className="mb-4 text-center"
                              style={{
                                fontSize: "clamp(0.765rem,0.855vw,0.95rem)",
                                lineHeight: 1.6,
                              }}
                            >
                              {t.details}
                            </p>
                          </div>
                        </div>

                        {/* Default card content */}
                        <div className="px-[1rem] pb-[1rem] pt-[0.9rem] text-left bg-white">
                          <h5
                            className={`${Serif} font-[500] text-[#1C3664]`}
                            style={{
                              fontSize: "clamp(0.945rem,1.08vw,1.2rem)",
                            }}
                          >
                            {t.name}
                          </h5>
                          <p
                            className="text-[#3a2323] mt-1"
                            style={{ fontSize: "clamp(0.81rem,0.9vw,1rem)" }}
                          >
                            {t.role}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </Container>
      </section>

      {/* DOUBLE CTA BAND */}
      <section style={{ paddingTop: "10%", paddingBottom: "10%" }}>
        <Container>
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: isMobile ? "0" : "clamp(1rem,2vw,1.6rem)" }}
          >
            {/* left */}
            <article
              className="relative overflow-hidden   text-white shadow-[0_1.2rem_2.6rem_rgba(0,29,73,0.16)]"
              style={{
                minHeight: isMobile ? "360px" : "clamp(10rem,24vh,16rem)",
                backgroundImage: `url(${IMG.band})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(0,47,130,0.92)" }}
              />
              <div className="relative grid h-full place-items-center p-[2rem] text-center">
                <div style={{ maxWidth: "46ch" }}>
                  <h4
                    className={`${Serif} font-[400]`}
                    style={{
                      fontSize: isMobile
                        ? "28px"
                        : "clamp(1.15rem,1.9vw,1.55rem)",
                      marginBottom: "0.8rem",
                    }}
                  >
                    School Rules Handbook
                  </h4>
                  <p
                    className="opacity-95"
                    style={{
                      lineHeight: 1.75,
                      fontSize: "clamp(0.9rem,1.05vw,1.05rem)",
                      marginBottom: "1.2rem",
                    }}
                  >
                    Find all the essential information about Hostel Rules,
                    Hostel Schedule, Parents and Guardians Visit timings in the
                    pdf attached below.
                  </p>
                  <a
                    href="/school-rules.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      className="rounded-full shadow-[0_0.8rem_1.8rem_rgba(0,0,0,0.15)] hover:brightness-110"
                      style={{
                        background: "#ED6D23",
                        color: "white",
                        padding: "0.6rem 1.2rem",
                        fontSize: "clamp(0.92rem,1.05vw,1.05rem)",
                      }}
                    >
                      Download Handbook
                    </button>
                  </a>
                </div>
              </div>
            </article>
            {/* right */}
            <article
              className="relative overflow-hidden   text-white shadow-[0_1.2rem_2.6rem_rgba(0,29,73,0.16)]"
              style={{
                minHeight: isMobile ? "360px" : "clamp(10rem,24vh,16rem)",
                backgroundImage: `url(${IMG.band})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(237,109,35,0.92)" }}
              />
              <div className="relative grid h-full place-items-center px-[2rem] text-center">
                <div style={{ maxWidth: "46ch" }}>
                  <h4
                    className={`${Serif} font-[400]`}
                    style={{
                      fontSize: isMobile
                        ? "28px"
                        : "clamp(1.15rem,1.9vw,1.55rem)",
                      marginBottom: "0.8rem",
                    }}
                  >
                    Unlock her future!
                  </h4>
                  <p
                    className="opacity-95"
                    style={{
                      lineHeight: 1.75,
                      fontSize: "clamp(0.9rem,1.05vw,1.05rem)",
                      marginBottom: "1.2rem",
                    }}
                  >
                    Guided by Dharma, Prepared for the World.
                  </p>
                  <button
                    onClick={() => navigate("/contact")}
                    className="rounded-full shadow-[0_0.8rem_1.8rem_rgba(0,0,0,0.15)] hover:brightness-110"
                    style={{
                      background: "#1C3664",
                      color: "white",
                      padding: "0.6rem 1.2rem",
                      fontSize: "clamp(0.92rem,1.05vw,1.05rem)",
                    }}
                  >
                    Get in Touch
                  </button>
                </div>
              </div>
            </article>
          </div>
        </Container>
      </section>

      {/* MAP (just above footer in the design) */}
      <section className="bg-white">
        <div className="relative">
          <div className="absolute left-[5%] top-8 z-10 max-w-[360px] bg-white rounded-lg shadow-xl p-6 hidden md:block">
            <h3 className="univers-regular text-[#0E2349]">
              Amatir Kanya Gurukul Kurukshetra
            </h3>
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
