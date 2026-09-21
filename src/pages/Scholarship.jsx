// AcademicsPage.jsx
import React, { useMemo, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import GurukulCard from "../components/GurukulCard";

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
  band: "/images/Sadhana_tapas_wn5vod.jpg",
  projectBased: "/images/Project_Based_oc2aa7.jpg",
  fln: "/images/Foundation_and_literacy_eiqduq.jpg",
  artIntegrated: "/images/Art_Integrated_nezarr.jpg",
  sandhya: "/images/Sandhya_gdn4qm.jpg",
  atmaGyan: "/images/Atma_Gyan_y46mhe.jpg",
  hawan: "/images/Hawan_jtrewk.jpg",
  senior: "/images/senior_qucz8c.jpg",
  scholarshipBanner: "/images/scholarship-banner.jpg",
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

export default function Scholarship() {
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
        role: "Educator - Math",
        photo: IMG.t1,
        details:
          "Expert in advanced mathematics with 15+ years of experience. Specializes in calculus, algebra, and mathematical modeling. Believes in making complex concepts accessible through practical examples.",
      },
      {
        name: "Ms. Rishu Singh",
        role: "Educator - Mentor",
        photo: IMG.t2,
        details:
          "Passionate mentor with expertise in student development and career guidance. Specializes in psychology and counseling. Helps students discover their potential and navigate academic challenges.",
      },
      {
        name: "Ms. Neha Dhiman",
        role: "Educator - Home Science",
        photo:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        details:
          "Teaches nutrition and hygiene; enjoys cooking traditional dishes, Conducts cooking sessions. Expert in food science with focus on healthy eating habits and sustainable food practices.",
      },
      {
        name: "Mr. Mayank Bazzxhwaj",
        role: "Educator - Arts",
        photo: IMG.t3,
        details:
          "Creative arts director with passion for visual arts and design. Specializes in painting, sculpture, and digital arts. Encourages students to express themselves through various artistic mediums.",
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
          src={IMG.scholarshipBanner}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

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
            {/* <div className="flex justify-center mb-4">
              <img
                alt="Amatir Icon"
                className="w-[60px] h-auto"
                src={IMG.orangeIcon}
              />
            </div> */}
            {/* <h1
              className="cent-schbk-cyrill z-10002"
              style={{
                lineHeight: "1.1",
                color: "#fff",
                marginBottom: "10%",
              }}
            >
              Academics
            </h1> */}
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
            Vidya श्री Scholarship
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
            Scholarship Exam Result Declared – Check Now!
          </p>
          <p
            className="mx-auto text-center text-[#3a2323]/90"
            style={{
              maxWidth: "70ch",
              lineHeight: 1.8,
              fontSize: "clamp(0.95rem,1.1vw,1.05rem)",
              marginTop: "1vh",
            }}
          >
            स्कॉलरशिप परीक्षा का परिणाम जारी! जानें आपका परिणाम।
          </p>

          {/* tabs row */}
        </Container>
      </section>

      {/* SKILL BASED LEARNING */}
      <section style={{ paddingTop: "8vh", paddingBottom: "8vh" }}>
        <Container>
          <h2
            className={`${Serif} text-[#1C3664] text-left font-[400]`}
            style={{ fontSize: "clamp(1.6rem,3.1vw,2.6rem)" }}
          >
            Dear Parents,
          </h2>
          <p
            className="text-left text-[#000000]/90"
            style={{
              maxWidth: "72ch",
              lineHeight: 1.8,
              fontSize: "clamp(0.95rem,1.1vw,1.05rem)",
              marginTop: "1vh",
            }}
          >
            Greetings from Amatir Kanya Gurukul!
          </p>
          <p
            className="text-left text-[#000000]/90 mb-4"
            style={{
              maxWidth: "72ch",
              lineHeight: 1.2,
              fontSize: "clamp(0.95rem,1.1vw,1.05rem)",
              marginTop: "1vh",
            }}
          >
            Please find attached the result PDF of the Vidyasश्री Scholarship
            Exam for your information. Based on the first round, the top 25 rank
            holders have been shortlisted for the second round comprising an
            interview and document verification. We may invite more students for
            second round, if required.
          </p>
          <p
            className="text-left text-[#000000]/90 mb-4"
            style={{
              maxWidth: "72ch",
              lineHeight: 1.2,
              fontSize: "clamp(0.95rem,1.1vw,1.05rem)",
              marginTop: "1vh",
            }}
          >
            The shortlisted students of Class 11 are requested to report at
            10:00 AM and those of Class 9 at 01:00 PM on 31th March 2025 at
            Amatir Kanya Gurukul.
          </p>
          <p
            className="text-left text-[#000000]/90"
            style={{
              maxWidth: "72ch",
              lineHeight: 1.2,
              fontSize: "clamp(0.95rem,1.1vw,1.05rem)",
              marginTop: "1vh",
            }}
          >
            Note:
          </p>
          <p
            className="text-left text-[#000000]/90 mb-2"
            style={{
              maxWidth: "72ch",
              lineHeight: 1.2,
              fontSize: "clamp(0.95rem,1.1vw,1.05rem)",
              marginTop: "1vh",
            }}
          >
            1. Parent must accompany their daughter.
          </p>
          <p
            className="text-left text-[#000000]/90 mb-4"
            style={{
              maxWidth: "72ch",
              lineHeight: 1.2,
              fontSize: "clamp(0.95rem,1.1vw,1.05rem)",
              marginTop: "1vh",
            }}
          >
            2. Kindly bring Government-approved Income Proof Documents, if
            available, for verification. Please be advised that clearing the
            written exam does not guarantee admission. Admission is subject to
            qualification in the second round of the selection.
          </p>
          <p
            className="text-left text-[#000000]/90 mb-4"
            style={{
              maxWidth: "72ch",
              lineHeight: 1.2,
              fontSize: "clamp(0.95rem,1.1vw,1.05rem)",
              marginTop: "1vh",
            }}
          >
            A final list of students qualifying for Vidyaश्री 100% scholarship
            will be released and communicated only to the concerned parents.
          </p>

          <p
            className="text-left text-[#000000]/90"
            style={{
              maxWidth: "72ch",
              lineHeight: 1.2,
              fontSize: "clamp(0.95rem,1.1vw,1.05rem)",
              marginTop: "1vh",
            }}
          >
            We look forward to welcoming you.
            <br />
            Sincerely,
            <br />
            Amatir Kanya Gurukul
          </p>
           
        </Container>
      </section>

      {/* GURUKUL */}
      <GurukulCard
        id="gurukul"
        image={IMG.gurukulIcon}
        title="Gurukul"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
 
      {/* MAP (just above footer in the design) */}
      <section className="w-full">
        <iframe
          title="Amatir Campus Map"
          className="w-full"
          style={{ height: "52vh" }}
          src="https://www.openstreetmap.org/export/embed.html?bbox=76.7%2C29.9%2C77.2%2C30.1&layer=mapnik"
          loading="lazy"
        />
      </section>
    </main>
  );
}
