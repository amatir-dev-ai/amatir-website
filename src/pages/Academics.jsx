// AcademicsPage.jsx
import React, { useMemo, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import GurukulCard from "../components/GurukulCard";
import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO";

/** Local assets */
const IMG = {
  hero: "/images/AMATIR_6_wfestb.jpg",
  orangeIcon: "/images/Orange_Icon_vejkl7.svg",
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
  t5: "/images/Jatinder-Singh.png",
  t6: "/images/Sangeeta_Devi.png",
  t7: "/images/Aradhana_Kaushik.png",
  t8: "/images/Kusum_Lata.png",
  t9: "/images/Jisha_Raj.png",
  t10: "/images/Mamta.png",
  t11: "/images/Mahabir_Singh_Bhandari.png",
  t12: "/images/Archna.png",
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

  // Handle scroll to hash on page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#gurukul") {
      setTimeout(() => {
        const element = document.getElementById("gurukul");
        if (element) {
          const headerHeight = 88; // Account for header height
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 200); // Slightly longer delay for page load
    }
  }, []);

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

      {
        name: "Mr Jatinder Singh",
        role: "Head of Department – Mathematics",
        photo: IMG.t5,
        details:
          "Mathematics, Jatinder Singh is committed to making Mathematics accessible and engaging. He fosters conceptual understanding and builds supportive relationships to nurture student growth and a positive attitude toward learning.",
      },
      {
        name: "Ms. Sangeeta",
        role: "Educator - Science",
        photo: IMG.t6,
        details:
          "Science educator committed to inquiry-based learning. She fosters scientific thinking, curiosity, and conceptual clarity through hands-on exploration, real-life connections, and evidence-based instructional practices.",
      },
      {
        name: "Ms. Aradhana",
        role: "Educator - English",
        photo: IMG.t7,
        details:
          "An experienced English educator known for transforming lessons into meaningful learning experiences. She promotes curiosity, creativity, and critical thinking through a blend of engaging strategies and student-centered instruction.",
      },
      {
        name: "Dr. Kusum Lata",
        role: "Educator - PGT Hindi",
        photo: IMG.t8,
        details:
          "seasoned educator and poet. She nurtures language appreciation through literary exploration and empathetic teaching, while encouraging emotional expression and deep student connection in the classroom."
      },
      {
        name: "Ms. Jisha Raj",
        role: "Educator - English",
        photo: IMG.t9,
        details:
          "dedicated PGT English educator and Communication & Personality Development coach, she integrates language learning with soft skills training, fostering confidence, clarity, and expression through dynamic, learner-centered environments that empower students for future success."
      },
      {
        name: "Ms. Mamta",
        role: "Educator - PRT",
        photo: IMG.t10,
        details:
          "dedicated Hindi educator at Amatir Kanya Gurukul since 2014. She believes a teacher is not merely a source of knowledge but a guiding force that inspires and uplifts learners."
      },
      {
        name: "Mr. Mahabir Singh Bhandari",
        role: "Educator - PGT Economics",
        photo: IMG.t11,
        details:
          "Teaches cultivates analytical skills, economic reasoning, and inquiry-based learning. He guides students to understand contemporary issues through data interpretation, structured thinking, and real-world application."
      },
      {
        name: "Ms. Archna Goel",
        role: "Educator - Librarian",
        photo: IMG.t12,
        details:
          "dedicated librarian who promotes reading culture, research, and information literacy. She curates meaningful resources and supports students and staff in developing lifelong learning and independent inquiry skills."
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
  const [activeSkillTab, setActiveSkillTab] = useState("Project-Based");

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

  // Reset animation when skill tab changes
  useEffect(() => {
    const skillContentElement = document.querySelector(
      `[key="content-${activeSkillTab}"]`
    );

    if (skillContentElement) {
      // Remove and re-add the fadeIn class to trigger animation
      skillContentElement.classList.remove("fadeIn");

      // Force reflow
      void skillContentElement.offsetWidth;

      // Re-add the class
      skillContentElement.classList.add("fadeIn");
    }
  }, [activeSkillTab]);

  // Handle scroll to gurukul section when page loads with hash
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash === "#gurukul") {
        // Wait for the component to render, then scroll
        setTimeout(() => {
          const element = document.getElementById("gurukul");
          if (element) {
            // Add fade-in class before scrolling
            element.style.opacity = "0";
            element.style.transform = "translateY(30px)";
            element.style.transition =
              "opacity 0.8s ease-out, transform 0.8s ease-out";

            // Scroll to element
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });

            // Trigger fade-in after a short delay
            setTimeout(() => {
              element.style.opacity = "1";
              element.style.transform = "translateY(0)";
            }, 200);
          }
        }, 100);
      }
    };

    // Handle initial load
    handleHashScroll();

    // Handle hash changes (in case user navigates with hash)
    window.addEventListener("hashchange", handleHashScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, []);

  const tabData = [
    {
      id: "Foundation",
      tagline: "Foundation Stage",
      content:
        "The Foundation Stage is where curiosity begins to bloom. Through hands-on projects and real-world applications, children learn by doing, asking questions, solving problems, and working together. No rote learning, no heavy textbooks, just meaningful experiences that spark independent thinking and a lifelong love for learning.",
      image: IMG.foundationShot,
    },
    {
      id: "Middle",
      tagline:
        "Middle Stage",
      content:
        "In the Middle Stage, learning shifts from memorizing to mastering. A skill-based approach empowers students to think critically, communicate clearly, and solve real-world problems. With AI-powered tools like Embibe, each child learns at their own pace, gaining deeper understanding and lasting confidence. It's purposeful, personalised learning that prepares them for life beyond the classroom.",
      image: "/images/1_10_cqscjr.jpg",
    },

    {
      id: "Senior",
      tagline:
        "Senior Stage",
      content:
        "Where students grow into confident, capable individuals. Beyond academics, the focus is on building character, leadership, and purpose. With personalised academic support and real-world problem-solving, students develop resilience, sharpen exam readiness, and take ownership of their learning journey. It's preparation for life, not just the board exams, and it's this holistic approach that has earned Amatir its reputation as the best academic school in Kurukshetra.",
      image: IMG.senior,
    },
        {
      id: "Senior Secondary",
      tagline: "Senior Secondary Stage",
      content:
        "Shaping confident, self-aware leaders, rooted in values, ready for the world. Academic excellence goes hand-in-hand with life skills, global exposure, and purpose-driven growth. From university readiness to leadership development, students are empowered to think boldly, act responsibly, and lead with both head and heart.",
      image: "/images/Secondary_lmc82a.jpg",
    },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const getCurrentTabData = () => {
    return tabData.find((tab) => tab.id === activeTab);
  };

  return (
    <main id="Academics" className="w-full overflow-hidden bg-white">
      {/* HERO */}
      <section
        id="academics-hero"
        className="relative overflow-hidden w-full"
        style={{
          height: "100vh",
          marginTop: "60px",
          minHeight: isVerySmallScreen ? "400px" : "480px",
        }}
      >
        <img
          src={IMG.hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1C3664]" />
        <div className="relative h-full z-10 mx-auto max-w-[1262px] px-4 flex items-end mt-[-8%] justify-center">
          <div
            className="text-center w-full"
            style={{
              transform: isVerySmallScreen
                ? "translateY(-10%)"
                : isMobile
                  ? "translateY(-5%)"
                  : "translateY(0)",
              paddingTop: isVerySmallScreen ? "2rem" : isMobile ? "1rem" : "0",
              paddingBottom: isVerySmallScreen
                ? "2rem"
                : isMobile
                  ? "1rem"
                  : "0",
            }}
          >
            <div className="flex justify-center mb-4">
              <img
                alt="Amatir Icon"
                className="w-[60px] h-auto"
                src={IMG.orangeIcon}
              />
            </div>
            <h1
              className="cent-schbk-cyrill z-10002"
              style={{
                lineHeight: "1.1",
                color: "#fff",
                marginBottom: "10%",
              }}
            >
              Academics
            </h1>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section style={{ paddingTop: "8vh", paddingBottom: "8vh" }}>
        <Container>
          <h2
            className={`${Serif} text-[#1C3664] text-center font-[400]`}
            style={{ fontSize: "clamp(1.6rem,3.1vw,2.6rem)", lineHeight: 1.15 }}
          >
            Curriculum That Grows With Your Child 
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
         A future-ready curriculum, shaped by CBSE standards for girls at our Kurukshetra school, designed to grow with your child. From building curiosity in the early years to developing real-world skills, confidence, and character in higher grades, every stage prepares students not just for exams, but for life. 
          </p>

          {/* tabs row */}
          <div
            className="mx-auto grid"
            style={{
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "clamp(3rem,8vw,4rem)",
              maxWidth: "56rem",
              marginTop: "3.5vh",
            }}
          >
            {tabData.map((tab) => (
              <button
                key={tab.id}
                className={`${Serif} relative text-[#1C3664] cursor-pointer transition-all duration-500 cubic-bezier(0.25, 0.46, 0.45, 0.94) hover:opacity-80`}
                style={{
                  fontSize: "clamp(1rem,1.35vw,1.25rem)",
                  opacity: activeTab === tab.id ? 1 : 0.35,
                  paddingBottom: "0.9rem",
                  transform: activeTab === tab.id ? "scale(1.05)" : "scale(1)",
                }}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.id}
                {activeTab === tab.id && (
                  <span
                    className="absolute left-0 bottom-0 rounded-full bg-[#ED6D23] transition-all duration-500 cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                    style={{ height: "0.22rem", width: "6rem" }}
                  />
                )}
              </button>
            ))}
          </div>

          <div
            className="mt-[4vh] grid items-start"
            style={{
              gridTemplateColumns: "1fr 1.1fr",
              columnGap: "clamp(2rem,4vw,3rem)",
            }}
          >
            <div
              key={`content-${activeTab}`}
              className="fadeIn transition-all duration-500 cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            >
              <h3
                className={`${Serif} text-[#1C3664] font-[400]`}
                style={{
                  fontSize: "clamp(1.6rem,2.5vw,2.25rem)",
                  lineHeight: 1.2,
                  marginBottom: "1.2rem",
                }}
              >
                {getCurrentTabData()?.tagline}
              </h3>
              <p
                className="text-[#3a2323]/90"
                style={{
                  lineHeight: 1.85,
                  fontSize: "clamp(0.98rem,1.05vw,1.05rem)",
                }}
              >
                {getCurrentTabData()?.content}
              </p>
            </div>
            <div
              key={`image-${activeTab}`}
              className="fadeIn transition-all duration-500 cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            >
              <Ratio src={getCurrentTabData()?.image} />
            </div>
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
  We emphasize practical learning that helps children apply concepts with confidence. By engaging in meaningful activities, they build a strong academic foundation while developing abilities that support independent learning and personal growth.

          </p>

          <div
            className="mt-[4vh] grid items-start"
            style={{
              gridTemplateColumns: "1.1fr 1fr",
              columnGap: "clamp(2rem,4vw,3rem)",
            }}
          >
            <Ratio
              src={
                activeSkillTab === "Project-Based"
                  ? IMG.projectBased
                  : activeSkillTab === "Foundational Literacy & Numeracy (FLN)"
                    ? IMG.fln
                    : IMG.artIntegrated
              }
              alt="Skill-based learning"
            />
            <div className="flex flex-col" style={{ gap: "2vh" }}>
              {/* Content Sections */}
              {[
                {
                  title: "Project-Based",
                  content:
                    "Hands-on projects that bring learning to life. Students build, experiment, and solve real-world problems while developing creativity, critical thinking, and collaboration.",
                  image: IMG.projectBased,
                  muted: activeSkillTab !== "Project-Based",
                },
                {
                  title: "Foundational Literacy & Numeracy (FLN)",
                  content:
                    "Focused on strong basics in reading, writing, and math, empowering every child with the core skills needed for future learning and everyday life.",
                  image: IMG.fln,
                  muted:
                    activeSkillTab !== "Foundational Literacy & Numeracy (FLN)",
                },
                {
                  title: "Art-Integrated",
                  content:
                    "Blending art with academics to make learning fun and memorable, students explore subjects creatively through visuals, stories, and design.",
                  image: IMG.artIntegrated,
                  muted: activeSkillTab !== "Art-Integrated",
                },
              ].map((section, k) => (
                <div
                  key={k}
                  className={`relative rounded-[0.8rem] ${section.muted ? "opacity-40" : "bg-[#F7F8FA] shadow-sm"
                    } flex items-start transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer hover:opacity-80`}
                  style={{ padding: "1.2rem 1.2rem 1.2rem 1.6rem" }}
                  onClick={() => setActiveSkillTab(section.title)}
                >
                  {!section.muted && (
                    <span
                      className="absolute left-0 top-0 bottom-0 rounded-r-[999rem] bg-[#ED6D23]"
                      style={{ width: "0.36rem" }}
                    />
                  )}
                  <div className="mr-4 mt-1">
                    <BookOpen
                      className="text-[#1C3664]"
                      style={{ width: "1.4rem", height: "1.4rem" }}
                    />
                  </div>
                  <div className="w-full">
                    <h4
                      className={`${Serif} text-[#1C3664] transition-colors duration-200`}
                      style={{
                        fontSize: "clamp(1.1rem,1.3vw,1.25rem)",
                        marginBottom: "0.35rem",
                      }}
                    >
                      {section.title}
                    </h4>
                    {!section.muted && (
                      <p
                        key={`content-${section.title}`}
                        className="text-[#000] fadeIn"
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
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* PREPARING FOR EXCELLENCE */}
      <section style={{ paddingTop: "8vh", paddingBottom: "8vh" }}>
        <Container>
          <h2
            className={`${Serif} text-[#1C3664] text-center font-[400]`}
            style={{ fontSize: "clamp(1.6rem,3.1vw,2.6rem)" }}
          >
Where CBSE Education Meets JEE and NEET Readiness
          </h2>
          <p
            className="mx-auto text-center text-[#3a2323]/90"
            style={{
              maxWidth: "90ch",
              lineHeight: 1.8,
              fontSize: "clamp(0.95rem,1.1vw,1.05rem)",
              marginTop: "1vh",
            }}
          >
        Our association with Physics Wallah (PW) strengthens Amatir’s commitment to enabling more young women to pursue STEM careers and turn their academic aspirations into reality.
          </p>

          <p
            className="mx-auto text-center text-[#3a2323]/90"
            style={{
              maxWidth: "90ch",
              lineHeight: 1.8,
              fontSize: "clamp(0.95rem,1.1vw,1.05rem)",
              marginTop: "1vh",
            }}
          >
PW brings its structured curriculum, expert faculty and smart-board enabled learning directly to our classrooms, seamlessly integrating CBSE preparation with competitive exam readiness—reducing the need for additional evening coaching.
          </p>

          <p
            className="mx-auto text-center text-[#3a2323]/90"
            style={{
              maxWidth: "90ch",
              lineHeight: 1.8,
              fontSize: "clamp(0.95rem,1.1vw,1.05rem)",
              marginTop: "1vh",
            }}
          >
Students in Classes 9–10 develop strong conceptual and analytical foundations, while senior students receive focused preparation for JEE and NEET through interactive digital learning, regular assessments, data-driven insights and dedicated doubt-clearing sessions.
          </p>
                 <p
            className="mx-auto text-center text-[#3a2323]/90"
            style={{
              maxWidth: "90ch",
              lineHeight: 1.8,
              fontSize: "clamp(0.95rem,1.1vw,1.05rem)",
              marginTop: "1vh",
            }}
          >
At Amatir, we strive to give every girl the clarity, confidence and preparation to aim higher—and succeed. 
          </p>
          <div
            className="mt-[5vh] grid"
            style={{
              gridTemplateColumns: "repeat(4,1fr)",
              columnGap: "clamp(1rem,2vw,1.6rem)",
            }}
          >
            {/* JEE */}
            <article
              className="group overflow-hidden rounded-[0.9rem] shadow-md relative cursor-pointer"
              style={{ height: "clamp(308px, 22vh, 360.8px)" }}
            >
              <div className="relative w-full h-full">
                <Ratio
                  src={
                    IMG.jee ||
                    "https://images.unsplash.com/photo-1523240798131-8c6c2a7c3c8c?w=400&h=300&fit=crop&crop=center"
                  }
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 bg-[#ED6D23] text-white text-center transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-0"
                  style={{ padding: "0.85rem 1rem" }}
                >
                  <span
                    className={`${Serif}`}
                    style={{ fontSize: "clamp(1rem,1.15vw,1.15rem)" }}
                  >
                    JEE
                  </span>
                </div>
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-[#ED6D23]/95 text-white p-4 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <h4
                    className={`${Serif} text-white mb-3 font-[600]`}
                    style={{ fontSize: "clamp(1.1rem,1.3vw,1.25rem)" }}
                  >
                    JEE
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontSize: "clamp(0.85rem,1vw,0.95rem)",
                      lineHeight: 1.6,
                    }}
                  >
                    A national-level entrance exam for admission to top
                    engineering institutes like IITs and NITs.
                  </p>
                </div>
              </div>
            </article>

            {/* NEET */}
            <article
              className="group overflow-hidden rounded-[0.9rem] shadow-md relative cursor-pointer"
              style={{ height: "clamp(308px, 22vh, 360.8px)" }}
            >
              <div className="relative w-full h-full">
                <Ratio
                  src={
                    IMG.neet ||
                    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&crop=center"
                  }
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 bg-[#ED6D23] text-white text-center transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-0"
                  style={{ padding: "0.85rem 1rem" }}
                >
                  <span
                    className={`${Serif}`}
                    style={{ fontSize: "clamp(1rem,1.15vw,1.15rem)" }}
                  >
                    NEET
                  </span>
                </div>
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-[#ED6D23]/95 text-white p-4 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <h4
                    className={`${Serif} text-white mb-3 font-[600]`}
                    style={{ fontSize: "clamp(1.1rem,1.3vw,1.25rem)" }}
                  >
                    NEET
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontSize: "clamp(0.85rem,1vw,0.95rem)",
                      lineHeight: 1.6,
                    }}
                  >
                    The qualifying exam for students aspiring to study medicine
                    and allied health sciences in India.
                  </p>
                </div>
              </div>
            </article>

            {/* OLYMPIADS */}
            <article
              className="group overflow-hidden rounded-[0.9rem] shadow-md relative cursor-pointer"
              style={{ height: "clamp(308px, 22vh, 360.8px)" }}
            >
              <div className="relative w-full h-full">
                <Ratio
                  src="/images/Olympiads_vvurc0.jpg"
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 bg-[#ED6D23] text-white text-center transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-0"
                  style={{ padding: "0.85rem 1rem" }}
                >
                  <span
                    className={`${Serif}`}
                    style={{ fontSize: "clamp(1rem,1.15vw,1.15rem)" }}
                  >
                    OLYMPIADS
                  </span>
                </div>
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-[#ED6D23]/95 text-white p-4 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <h4
                    className={`${Serif} text-white mb-3 font-[600]`}
                    style={{ fontSize: "clamp(1.1rem,1.3vw,1.25rem)" }}
                  >
                    OLYMPIADS
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontSize: "clamp(0.85rem,1vw,0.95rem)",
                      lineHeight: 1.6,
                    }}
                  >
                    Rigorous subject-based assessments in Math and Science that
                    nurture analytical thinking, problem-solving, and academic
                    excellence.
                  </p>
                </div>
              </div>
            </article>

            {/* CUET */}
            <article
              className="group overflow-hidden rounded-[0.9rem] shadow-md relative cursor-pointer"
              style={{ height: "clamp(308px, 22vh, 360.8px)" }}
            >
              <div className="relative w-full h-full">
                <Ratio
                  src={
                    IMG.cuet ||
                    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center"
                  }
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 bg-[#ED6D23] text-white text-center transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-0"
                  style={{ padding: "0.85rem 1rem" }}
                >
                  <span
                    className={`${Serif}`}
                    style={{ fontSize: "clamp(1rem,1.15vw,1.15rem)" }}
                  >
                    CUET
                  </span>
                </div>
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-[#ED6D23]/95 text-white p-4 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <h4
                    className={`${Serif} text-white mb-3 font-[600]`}
                    style={{ fontSize: "clamp(1.1rem,1.3vw,1.25rem)" }}
                  >
                    CUET
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontSize: "clamp(0.85rem,1vw,0.95rem)",
                      lineHeight: 1.6,
                    }}
                  >
                    A national-level entrance exam for admission to central
                    universities and other leading institutions across India,
                    covering a wide range of undergraduate courses.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </Container>
      </section>

      {/* DISCOVER OUR CAMPUS BAND */}
      <section className="relative w-full" style={{ height: "35vh" }}>
        <div className="relative w-full h-full overflow-hidden">
          <img src={IMG.campus} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#1C3664]/92" />
          <div
            className="absolute inset-0 grid place-items-center text-center text-white"
            style={{ padding: "5vh 6vw" }}
          >
            <div style={{ maxWidth: "70ch" }}>
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
                className="mt-[2vh] inline-block rounded-full bg-[#ED6D23] text-white shadow-lg hover:brightness-110"
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
      <GurukulCard
        id="gurukul"
        image={IMG.gurukulIcon}
        title="Gurukul"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />

      {/* TEACHERS */}
      <section
        className="bg-[#F8F9FB]"
        style={{ paddingTop: "7vh", paddingBottom: "1vh" }}
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
            {/* Left navigation arrow */}
            {/* Left arrow */}
            <button
              onClick={() => goTo(i - 4)}
              className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-0 md:-left-5 lg:-left-9 z-10 grid place-items-center rounded-full text-white transition-all duration-200 hover:scale-110"
              style={{
                width: "2.8rem",
                height: "2.8rem",
                background: "#ED6D23",
                boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
                marginLeft: "-8px",
              }}
            >
              <ChevronLeft style={{ width: "1.3rem", height: "1.3rem" }} />
            </button>

            {/* Right arrow */}
            <button
              onClick={() => goTo(i + 4)}
              className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-0 md:-right-5 lg:-right-9 z-10 grid place-items-center rounded-full text-white transition-all duration-200 hover:scale-110"
              style={{
                width: "2.8rem",
                height: "2.8rem",
                background: "#ED6D23",
                boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
                marginRight: "-8px", // extra 5–10px outward offset
              }}
            >
              <ChevronRight style={{ width: "1.3rem", height: "1.3rem" }} />
            </button>

            {/* Mobile navigation dots */}
            {isMobile && (
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: teachers.length }, (_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${idx === i ? "bg-[#ED6D23]" : "bg-gray-300"
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            <div
              ref={wrapRef}
              className="overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div
                ref={trackRef}
                className="grid transition-transform duration-500 ease-out mb-12"
                style={{
                  "--gap": isMobile
                    ? "1rem"
                    : isTablet
                      ? "1.2rem"
                      : "clamp(0.9rem,1.2rem,1.2rem)",
                  gridAutoFlow: "column",
                  gridAutoColumns: "calc((100% - (3 * var(--gap))) / 4)",
                  columnGap: "var(--gap)",
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
                          style={{ fontSize: "clamp(0.945rem,1.08vw,1.2rem)" }}
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
                        <div className="mt-auto space-y-2 text-center">
                          <p className="text-sm opacity-90">{t.email}</p>
                          <p className="text-sm opacity-90">{t.phone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Default card content */}
                    <div className="px-[1rem] pb-[1rem] pt-[0.9rem] text-left bg-white">
                      <h5
                        className={`${Serif} font-[500] text-[#1C3664]`}
                        style={{ fontSize: "clamp(0.945rem,1.08vw,1.2rem)" }}
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
          </div>
        </Container>
      </section>

      {/* DOUBLE CTA BAND */}
      <section style={{ paddingTop: "5%", paddingBottom: "10%" }}>
        <Container>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {/* left */}
            <article
              className="relative overflow-hidden   text-white shadow-[0_1.2rem_2.6rem_rgba(0,29,73,0.16)]"
              style={{
                minHeight: "clamp(10rem,24vh,16rem)",
                backgroundImage: `url(${IMG.band})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(28,54,100,0.92)" }}
              />
              <div className="relative grid h-full place-items-center p-[2rem] text-center">
                <div style={{ maxWidth: "46ch" }}>
                  <h4
                    className={`${Serif} font-[400]`}
                    style={{
                      fontSize: "clamp(1.15rem,1.9vw,1.55rem)",
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
                minHeight: "clamp(10rem,24vh,16rem)",
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
                      fontSize: "clamp(1.15rem,1.9vw,1.55rem)",
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
                  <Link to="/contact">
                    <button
                      className="rounded-full shadow-[0_0.8rem_1.8rem_rgba(0,0,0,0.15)] hover:brightness-110 cursor-pointer"
                      style={{
                        background: "#1C3664",
                        color: "white",
                        padding: "0.6rem 1.2rem",
                        fontSize: "clamp(0.92rem,1.05vw,1.05rem)",
                      }}
                    >
                      Get in Touch
                    </button>
                  </Link>
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
