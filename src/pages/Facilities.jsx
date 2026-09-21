// src/pages/Facilities.jsx
import React, { useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import Gallery from "../components/Gallery"; // same import style as Boarding.jsx  :contentReference[oaicite:0]{index=0}
import useSEO from "../hooks/useSEO";

/** -------- Brand palette (shared with Boarding.jsx) -------- */
const brand = {
  navy: "#1C3664",
  deepNavy: "#0E2349",
  orange: "#ED6D23",
  light: "#F5F5F5",
};

/** -------- Local assets -------- */
const CLOUD = {
  // Hero
  heroBg: "/images/KUM_4268_n3aexj.jpg",
  orangeIcon: "/images/Orange_Icon_i299iz.svg",

  // "Orange fabric" strip
  fabric: "/images/Rectangle_78_qtbute.jpg",

  // Sections
  labImg: "/images/AMATIR_1_qmffmu.jpg", // used in LEaboratory section  :contentReference[oaicite:1]{index=1}
  labImgs: [
    "/images/KUM_4063_xou2ih.jpg",
    "/images/Maths_d5ehuh.jpg",
    "/images/Science_txnonf.jpg",
    "/images/English_j4htsv.jpg",
    "/images/Home_Science_u2xuae.jpg",
  ],

  // Infrastructure tabs (per provided assets)
  playground: "/images/Rectangle_98_1_xn7cwt.jpg",
  library: "/images/Library_gr22nx.jpg",
  digital: "/images/Digitalclassroom01_lwwkhu.jpg",
  transport: "/images/Transport01_tzinbk.jpg",
  embibe: "/images/WhatsApp_Image_2025-08-20_at_11.36.56_AM_1_osxiwh.jpg",

  // Gallery thumbs
  // Gallery thumbs
  g0: "/images/Library02_w8x3om.jpg",
  g1: "/images/059A0066_w9uo0f.jpg",
  g2: "/images/facility01gallery_cjcpfx.jpg",
  g3: "/images/059A0109_w5gdie.jpg",
  g4: "/images/IMG_7710_hx7ucn.jpg",
  g5: "/images/IMG_8876_b4kfdn_tmj51e.png",
  g6: "/images/KUM_3182_pnxlpj.jpg",
  g7: "/images/facilitygallery002_d80z1c.jpg",

  // Campus video thumbnail
  videoThumb: "/images/WhatsApp_Image_2025-08-20_at_11.36.56_AM_1_osxiwh.jpg",

  // Boarding carousel
  boardingCarousel: [
    "/images/fACI-BOARDING_ma9lsv.jpg",
    "/images/FACI-BOARDING02_ig2wqh.jpg",
    "/images/FACI-BOARDING03_pciakx.jpg",
  ],
};

function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center">
      <h2
        className="font-[400] text-[44px] leading-[1.2] text-[#1C3664]"
        style={{ fontStyle: "normal", letterSpacing: "0%" }}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 text-[#3A2323] text-[16px] md:text-[18px] max-w-[820px] mx-auto">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export default function FacilitiesPage() {
  useSEO({
    title: 'Best School Infrastructure in Haryana | Amatir Kanya Gurukul',
    description: "Explore Amatir Kanya Gurukul's modern campus in Kurukshetra featuring smart classrooms, science labs, sports facilities, girls hostels and a secure CBSE learning environment.",
    keywords: ''
  });
  // Responsive media queries for different devices
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isVerySmallScreen = useMediaQuery({ maxWidth: 1024 });
  const isLowHeight = useMediaQuery({ maxHeight: 600 });

  // Calculate proper hero section height accounting for header
  const getHeroHeight = () => {
    if (isMobile) return "calc(100vh - 4rem)"; // Account for mobile header (64px)
    if (isVerySmallScreen) return "calc(100vh - 5rem)"; // Account for small laptop header (80px)
    if (isLowHeight) return "calc(100vh - 4.5rem)"; // Account for low height screens
    return "calc(100vh - 5.5rem)"; // Account for desktop header (88px)
  };

  /** ========== Infrastructure (horizontal tabs) ========== */
  const infraTabs = useMemo(
    () => ({
      playground: {
        title: "Active Outdoor Spaces",
        text: "Our spacious playground offers children a safe and active space to play, explore, and build essential physical and social skills. Daily outdoor time is a key part of our balanced learning approach.",
        img: CLOUD.playground,
        alt: "Playground",
      },
      library: {
        title: "Building a Reading Habit",
        text: " A calm, welcoming space filled with age-appropriate books, educational materials, and story collections. It nurtures a love for reading, imagination, and independent learning.",
        img: CLOUD.library,
        alt: "Library",
      },
      digital: {
        title: "Technology-Enabled Classrooms",
        text: "Modern classrooms equipped with smart boards and digital learning tools bring lessons to life. This is where digital education in Gurukul meets interactivity and engagement.",
        img: CLOUD.digital,
        alt: "Digital classrooms",
      },
      transport: {
        title: "Secure School Transport",
        text: "The school transport system is designed with student safety as the top priority. GPS-enabled buses, verified drivers, and trained attendants ensure a reliable, comfortable, and secure commute for every child.",
        img: CLOUD.transport,
        alt: "School transport",
      },
      embibe: {
        title: "Smart Learning with Embibe",
        text: "Through our partnership with Embibe, we offer personalized learning support using AI-driven tools. Students benefit from tailored practice, instant feedback, and deeper understanding across subjects.",
        img: CLOUD.embibe,
        alt: "Embibe",
      },
    }),
    []
  );
  const [infraActive, setInfraActive] = useState("playground");
  const [currentImage, setCurrentImage] = useState(0);

  /** ========== Laboratory (vertical tabs like Boarding.jsx PillarsTabs) ========== */
  const LABS = [
    {
      key: "computer",
      title: "Computer",
      desc: "Interactive lab sessions that strengthen digital literacy and practical tech skills.",
      img: CLOUD.labImgs[0],
    },
    {
      key: "maths",
      title: "Maths",
      desc: "A focused space for logical reasoning, problem-solving, and applied mathematics.",
      img: CLOUD.labImgs[1],
    },
    {
      key: "science",
      title: "Science",
      desc: "Equipped for safe and engaging experiments that bring scientific concepts to life.",
      img: CLOUD.labImgs[2],
    },
    {
      key: "english",
      title: "English",
      desc: "Helps students build confidence in reading, writing, speaking, and listening.",
      img: CLOUD.labImgs[3],
    },
    {
      key: "home",
      title: "Home Science",
      desc: "A hands-on space to learn essential life skills—from nutrition to cooking and home management.",
      img: CLOUD.labImgs[4],
    },
  ];
  const [labActive, setLabActive] = useState("computer");
  const labItem = LABS.find((l) => l.key === labActive) || LABS[2];

  /** ========== Video modal ========== */
  const [showVideo, setShowVideo] = useState(false);

  // Ensure Gallery always has 8 images by duplicating available ones
  // Explicitly duplicate for missing "Students in Assembly" (index 0) and
  // "Students in Yoga meditation" (index 4) slots expected by Gallery.jsx
  const availableGallery = [
    CLOUD.g0,
    CLOUD.g1,
    CLOUD.g2,
    CLOUD.g3,
    CLOUD.g4,
    CLOUD.g5,
    CLOUD.g6,
    CLOUD.g7,
  ].filter(Boolean);
  const pickImg = (i) => availableGallery[i % availableGallery.length];
  const imagesForGallery = [
    pickImg(0), // Students in assembly (duplicate if needed)
    pickImg(1),
    pickImg(2),
    pickImg(3),
    pickImg(4), // Students in yoga meditation (duplicate if needed)
    pickImg(5),
    pickImg(6),
    pickImg(7),
  ];

  return (
    <main className="w-full text-[#1C3664]">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .tab-btn[aria-selected="true"]{ color:#002F82;border-bottom:2px solid #002F82;font-weight:600 }
        :root { --ease-tranquil: cubic-bezier(0.4, 0, 0.2, 1); --fade-duration: 650ms }
        .tab-btn { cursor: pointer; transition: color 300ms var(--ease-tranquil), border-color 300ms var(--ease-tranquil), border-bottom-color 300ms var(--ease-tranquil) }
        .fade-in { opacity: 0; animation: fadeIn 80ms cubic-bezier(0.33, 1, 0.68, 1) forwards; will-change: opacity }
        @keyframes fadeIn { to { opacity: 1 } }
      `}</style>

      {/* ================= HERO (exact Boarding header: bottom-center with margin) ================= */}
      <section
        className="relative flex items-end"
        style={{ height: "100vh", marginTop: "60px" }}
      >
        <img
          src={CLOUD.heroBg}
          alt="Facilities hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002F82]/80 via-transparent to-transparent" />
        <div className="relative mx-auto w-[90%] max-w-[1290px] pb-[4%] flex flex-col items-center">
          <img
            src={CLOUD.orangeIcon}
            alt=""
            className="mb-3 h-12 w-12 md:h-[60px] md:w-[60px]"
          />
          <h1
            className="cent-schbk-cyrill text-white text-[40px] md:text-[64px] leading-none font-semibold"
            style={{ marginBottom: "10%" }}
          >
            Facilities
          </h1>
        </div>
      </section>

      {/* ========== Thin "Everything You Need" orange fabric strip ========== */}
      <section className="bg-white">
        <div className="mx-auto w-[92%] max-w-[1290px]">
          <div className="relative overflow-hidden rounded md:rounded-none">
            <img
              src={CLOUD.fabric}
              alt=""
              className="w-full h-[220px] md:h-[300px] object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(237,109,35,0.86)" }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-center px-6">
              <div className="max-w-4xl text-white">
                <h3 className="cent-schbk-cyrill">Everything You Need</h3>
                <p className="mt-3 md:mt-4 text-[14px] md:text-[16px] leading-relaxed">
                  Our campus offers state-of-the-art labs and facilities,
                  encouraging hands-on learning where students can explore,
                  experiment, and bring ideas to life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Boarding teaser ================= */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col justify-start h-full">
            <h2 className="text-[#1C3664] cent-schbk-cyrill">Boarding</h2>
            <p
              className="mt-3 max-w-[520px] text-[#3A2323] univers-regular"
              style={{
                fontFamily: "Univers, sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                letterSpacing: "-0.02em",
              }}
            >
              Boarding at Amatir is more than accommodation—it's a nurturing
              experience. Our CBSE Gurukul facilities provide a warm, caring
              space where children grow, build friendships, and learn
              independence. A true second home that nurtures physical and mental
              well-being.
            </p>
            <div className="mt-6 flex justify-center">
              <a
                href="/boarding"
                className="inline-flex items-center justify-center rounded-full text-white font-serif text-[14px] cursor-pointer"
                style={{
                  width: "134px",
                  height: "50px",
                  borderRadius: "100px",
                  background: brand.orange,
                  opacity: 1,
                  textDecoration: "none",
                }}
              >
                Know more
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[380px] md:h-[520px] rounded-lg overflow-hidden">
              <img
                src={CLOUD.boardingCarousel[currentImage]}
                alt="Dorm rooms"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-5 flex items-center justify-center gap-4">
              <button
                onClick={() =>
                  setCurrentImage(
                    (prev) =>
                      (prev - 1 + CLOUD.boardingCarousel.length) %
                      CLOUD.boardingCarousel.length
                  )
                }
                className="w-11 h-11 rounded-full border-2 flex items-center justify-center transition hover:bg-[#ED6D23] hover:text-white cursor-pointer"
                style={{ borderColor: brand.orange, color: brand.orange }}
                aria-label="Previous image"
              >
                <span className="text-lg">‹</span>
              </button>
              <button
                onClick={() =>
                  setCurrentImage(
                    (prev) => (prev + 1) % CLOUD.boardingCarousel.length
                  )
                }
                className="w-11 h-11 rounded-full border-2 flex items-center justify-center transition hover:bg-[#ED6D23] hover:text-white cursor-pointer"
                style={{ borderColor: brand.orange, color: brand.orange }}
                aria-label="Next image"
              >
                <span className="text-lg">›</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Laboratory (image + vertical tabs) ================= */}
      <section className="bg-[#F5F5F5] min-h-[100vh] flex items-center py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 w-full">
          <div className="text-center mb-8">
            <h2
              className="mb-14 font-[400] text-[44px] leading-[1.2] text-[#1C3664]"
              style={{ fontStyle: "normal", letterSpacing: "0%" }}
            >
              Laboratory
            </h2>
            <p
              className="mb-22 text-[#3A2323] max-w-[820px] mx-auto text-center univers-regular"
              style={{
                fontFamily: "Univers, sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
              }}
            >
              As a Gurukul academy committed to holistic education, our campus
              includes state-of-the-art labs, smart classrooms, and hands-on
              experiential learning that help students explore, experiment, and
              apply knowledge across disciplines.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center h-full">
            <div
              key={labActive}
              className="rounded-lg overflow-hidden shadow-md self-stretch fade-in"
            >
              <img
                src={labItem.img}
                alt="Science lab"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative self-center">
              {/* faint vertical guide line like Boarding tabs */}
              <div className="absolute left-2 top-0 bottom-0 w-px bg-[#D9DFEA]" />

              <ul className="space-y-4 pl-6">
                {LABS.map((t) => {
                  const on = t.key === labActive;
                  return (
                    <li key={t.key}>
                      <button
                        onClick={() => setLabActive(t.key)}
                        className="w-full text-left cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className="mt-2 h-5 w-[3px] rounded"
                            style={{
                              backgroundColor: on
                                ? brand.orange
                                : "transparent",
                            }}
                          />
                          <div>
                            <h4
                              className={`${on ? "text-[#1C3664]" : "text-[#B7BFCC]"
                                }`}
                              style={{
                                fontFamily: "CentSchbkCyrill BT, serif",
                                fontWeight: 400,
                                fontStyle: "normal",
                                fontSize: "32px",
                                lineHeight: "140%",
                                letterSpacing: "0%",
                              }}
                            >
                              {t.title}
                            </h4>
                            {on && (
                              <p className="mt-1 text-[14px] text-[#3A2323] max-w-prose fade-in">
                                {t.desc}
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
      </section>

      {/* ================= Infrastructure (horizontal tabs + swap image/text) ================= */}
      <section className="bg-white min-h-[100vh] flex py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 w-full flex flex-col justify-center">
          <h1 className="text-center text-[#1C3664] cent-schbk-cyrill">
            Infrastructure
          </h1>
          <p className="my-3 text-center text-slate-600 max-w-[860px] mx-auto univers-regular">
            Smart, student-first spaces built for curiosity, comfort, and
            connection—because great learning starts with the right setting.
          </p>

          {/* tab buttons (styled like the php page) */}
          <div className="mt-10 flex flex-wrap justify-center gap-8 md:gap-10">
            {[
              ["playground", "Playground"],
              ["library", "Library"],
              ["digital", "Digital Classroom"],
              ["transport", "Transport"],
              ["embibe", "Embibe"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setInfraActive(key)}
                className="tab-btn pb-2 cursor-pointer univers-regular"
                aria-selected={infraActive === key}
              >
                {label}
              </button>
            ))}
          </div>

          {/* panels */}
          <div
            key={infraActive}
            className="mt-12 grid md:grid-cols-2 gap-10 items-center fade-in"
          >
            <div>
              <h2 className="text-[#1C3664] cent-schbk-cyrill" id="infra-title">
                {infraTabs[infraActive].title}
              </h2>
              <p
                className="mt-2 text-slate-700 univers-regular"
                id="infra-copy"
              >
                {infraTabs[infraActive].text}
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src={infraTabs[infraActive].img}
                alt={infraTabs[infraActive].alt}
                id="infra-image"
                className="w-full h-56 md:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= Step Inside (video look + modal) ================= */}
      <section className="bg-white min-h-[100vh] flex items-center py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="mx-auto w-[90%] max-w-[1100px]">
          <h2 className="text-[#1C3664] text-center cent-schbk-cyrill">
            Step Inside: Facilities and Amenities at a Glance
          </h2>

          <div className="relative group mt-6 rounded-[12px] overflow-hidden">
            <img
              src={CLOUD.videoThumb}
              alt="Campus video"
              className="w-full h-[420px] md:h-[520px] object-cover"
            />
            <button
              onClick={() => setShowVideo(true)}
              aria-label="Play video"
              className="absolute inset-0 grid place-items-center cursor-pointer"
            >
              <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/30 backdrop-blur-sm grid place-items-center">
                <span className="ml-1 border-l-[14px] border-l-white border-y-[10px] border-y-transparent" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowVideo(false);
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 pt-18">
            <button
              onClick={() => setShowVideo(false)}
              className="mt-4 inline-flex items-center bg-white text-slate-800 px-4 py-2 rounded-lg cursor-pointer"
            >
              Close
            </button>
            <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
              <div className="aspect-video">
                <iframe
                  title="Campus Video"
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/ka7pC-SeEdQ?autoplay=1&rel=0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= Gallery (import + props like Boarding.jsx) ================= */}
      <Gallery
        images={imagesForGallery}
        title="Gallery"
        subtitle="Festival Celebrations at Amatir"
      />
      {/* Boarding.jsx shows this exact usage pattern of <Gallery /> with images + title/subtitle.  :contentReference[oaicite:2]{index=2} */}

      {/* ================= Bottom CTA ================= */}
      <section className="relative isolate w-full py-14 text-center text-white">
        <img
          src={CLOUD.fabric}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[#ED6D23]/85 py-14" />
        <div className="mx-auto w-[min(1180px,92vw)]">
          <h4 className="font-['CentSchbkCyrill_BT:Roman',_serif] text-[22px] md:text-[26px] mb-2">
            Unlock her future!
          </h4>
          <p className="mx-auto max-w-[640px] text-[14.5px] leading-[1.85] mb-4">
            Guided by Dharma, Prepared for the World.
          </p>
          <Link to="/contact" className="rounded-full bg-[#1C3664] px-6 py-2 text-white shadow-[0_12px_28px_rgba(0,29,73,0.16)] cursor-pointer">
            Get in Touch
          </Link>
        </div>
      </section>

      {/* ================= Map ================= */}
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
