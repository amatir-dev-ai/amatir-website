// src/pages/Facilities.jsx
import React, { useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import MobileGallery from "../../components/MobileGallery";
import { useNavigate } from "react-router-dom";
import useSEO from "../../hooks/useSEO";

/* Brand palette */
const brand = {
  navy: "#1C3664",
  deepNavy: "#0E2349",
  orange: "#ED6D23",
  light: "#F5F5F5",
}; 

/* Cloudinary assets */
const CLOUD = {
  heroBg:
    "/images/KUM_4268_n3aexj.jpg",
  orangeIcon:
    "/images/Orange_Icon_i299iz.svg",
  fabric:
    "/images/Rectangle_78_qtbute.jpg",

  labImgs: [
    "/images/Computer_bczvhv.jpg",
    "/images/Maths_d5ehuh.jpg",
    "/images/Science_txnonf.jpg",
    "/images/English_j4htsv.jpg",
    "/images/Home_Science_u2xuae.jpg",
  ],

  playground:
    "/images/Rectangle_98_1_xn7cwt.jpg",
  library:
    "/images/Library_gr22nx.jpg",
  digital:
    "/images/AMATIR_6_geidan.jpg",
  transport:
    "/images/Transport_e9tm8p.jpg",
  embibe:
    "/images/AMATIR_7_vbdu6t.jpg",

  g0: "/images/Library02_w8x3om.jpg",
  g1: "/images/Hostel-Mess12_f5aibz.jpg",
  g2: "/images/Hostel-Mess09_mphvrz.jpg",
  g3: "/images/WhatsApp_Image_2025-04-07_at_9.33.15_AM_ukxhnh.jpg",
  g4: "/images/Hostel-Mess07_q9wobz.jpg",
  g5: "/images/IMG-20221023-WA0036_h8r74k.jpg",
  g6: "/images/Hostel-Mess02_jrvhny.jpg",
  g7: "/images/Hostel-Mess05_hxmj9g.jpg",

  videoThumb:
    "/images/AMATIR_7_vbdu6t.jpg",

  boardingCarousel: [
    "/images/fACI-BOARDING_ma9lsv.jpg",
    "/images/FACI-BOARDING02_ig2wqh.jpg",
    "/images/FACI-BOARDING03_pciakx.jpg"
  ],
};

export default function Facilities() {
  useSEO({
    title: 'Best School Infrastructure in Haryana | Amatir Kanya Gurukul',
    description: "Explore Amatir Kanya Gurukul's modern campus in Kurukshetra featuring smart classrooms, science labs, sports facilities, girls hostels and a secure CBSE learning environment.",
    keywords: ''
  });
  /* Responsive flags */
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isVerySmallScreen = useMediaQuery({ maxWidth: 1024 });
  const isLowHeight = useMediaQuery({ maxHeight: 600 });

  // Hero height tuned to header heights across breakpoints
  const getHeroHeight = () => {
    if (isMobile) return "calc(100vh - 4rem)";
    if (isVerySmallScreen) return "calc(100vh - 5rem)";
    if (isLowHeight) return "calc(100vh - 4.5rem)";
    return "calc(100vh - 5.5rem)";
  };

  /* Infrastructure (tabs desktop, accordion mobile) */
  const infraTabs = useMemo(
    () => ({
      playground: {
        label: "Playground",
        title: "Active Outdoor Spaces",
        text:
          "Our spacious playground offers children a safe and active space to play, explore, and build essential physical and social skills. Daily outdoor time is a key part of our balanced learning approach, and one more reason Amatir is counted among the best school infrastructure in Haryana.",
        img: CLOUD.playground,
        alt: "Playground",
      },
      library: {
        label: "Library",
        title: "Building a Reading Habit",
        text:
          " A calm, welcoming space filled with age-appropriate books, educational materials, and story collections. It nurtures a love for reading, imagination, and independent learning.",
        img: CLOUD.library,
        alt: "Library",
      },
      digital: {
        label: "Digital Classroom",
        title: "Technology-Enabled Classrooms",
        text:
          "Modern classrooms equipped with smart boards and digital learning tools bring lessons to life. This is where digital education in Gurukul meets interactivity and engagement.",
        img: CLOUD.digital,
        alt: "Digital classrooms",
      },
      transport: {
        label: "Transport",
        title: "Secure School Transport",
        text:
          "The school transport system is designed with student safety as the top priority. GPS-enabled buses, verified drivers, and trained attendants ensure a reliable, comfortable, and secure commute for every child.",
        img: CLOUD.transport,
        alt: "School transport",
      },
      embibe: {
        label: "Embibe",
        title: "Smart Learning with Embibe",
        text:
          "Through our partnership with Embibe, we offer personalized learning support using AI-driven tools. Students benefit from tailored practice, instant feedback, and deeper understanding across subjects.",
        img: CLOUD.embibe,
        alt: "Embibe",
      },
    }),
    []
  );
  const infraOrder = ["playground", "library", "digital", "transport", "embibe"];
  const [infraActive, setInfraActive] = useState("playground");

  /* Laboratory */
  const LABS = [
    { key: "computer", title: "Computer", desc: "Interactive lab sessions that strengthen digital literacy and practical tech skills.", img: CLOUD.labImgs[0] },
    { key: "maths", title: "Maths", desc: "A focused space for logical reasoning, problem-solving, and applied mathematics.", img: CLOUD.labImgs[1] },
    { key: "science", title: "Science", desc: "Equipped for safe and engaging experiments that bring scientific concepts to life.", img: CLOUD.labImgs[2] },
    { key: "english", title: "English", desc: "Helps students build confidence in reading, writing, speaking, and listening.", img: CLOUD.labImgs[3] },
    { key: "home", title: "Home Science", desc: "A hands-on space to learn essential life skills—from nutrition to cooking and home management.", img: CLOUD.labImgs[4] },
  ];
  const [labActive, setLabActive] = useState("computer");
  const labItem = LABS.find((l) => l.key === labActive) || LABS[0];

  /* Video modal + Boarding mini slider */
  const [showVideo, setShowVideo] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  /* Touch/swipe handling for carousels */
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum distance for a swipe gesture
  const minSwipeDistance = 50;

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
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left - next image
      setCurrentImage((p) => (p + 1) % CLOUD.boardingCarousel.length);
    } else if (isRightSwipe) {
      // Swipe right - previous image
      setCurrentImage((p) => (p - 1 + CLOUD.boardingCarousel.length) % CLOUD.boardingCarousel.length);
    }
  };

  /* Gallery images (ensure 8) */
  const pool = [CLOUD.g0, CLOUD.g1, CLOUD.g2, CLOUD.g3, CLOUD.g4, CLOUD.g5, CLOUD.g6, CLOUD.g7].filter(Boolean);
  const pick = (i) => pool[i % pool.length];
  const imagesForGallery = [pick(0), pick(1), pick(2), pick(3), pick(4), pick(5), pick(6), pick(7)];
  const navigate = useNavigate();

  return (
    <main className="w-full text-[#1C3664]">
      {/* helper styles for accordion */}
      <style>{`
        .fade-in { opacity: 0; animation: fadeIn 220ms cubic-bezier(0.33, 1, 0.68, 1) forwards; will-change: opacity }
        @keyframes fadeIn { to { opacity: 1 } }

        .infra-hr { height:1px; background:#E6EDF7; }
        .acc-row { padding: 14px 0; border-bottom: 1px solid #EEF2F8; }
        .acc-label { display:flex; align-items:center; justify-content:space-between; }
        .acc-label-text { font-family: "CentSchbkCyrill BT", serif; font-weight: 400; font-size: 18px; }
        .acc-label-text.off { color:#99A6BD; }
        .acc-label-text.on  { color:#1C3664; }
        .acc-underline { width:42px; height:3px; background:#ED6D23; border-radius:9999px; margin-top:6px; }

        .acc-chev { width:28px; height:28px; border-radius:9999px; display:grid; place-items:center; 
                    background:#F6EFEA; transition: transform .25s ease, background .25s ease; }
        .acc-chev.on { background:#ED6D23; }
        .acc-chev svg { width:14px; height:14px; stroke:#ED6D23; transition: transform .25s ease, stroke .25s ease; }
        .acc-chev.on svg { stroke:#FFFFFF; transform: rotate(180deg); }
      `}</style>

      {/* HERO */}
      <section className="relative flex items-end" style={{ height: getHeroHeight() }}>
        <img src={CLOUD.heroBg} alt="Facilities hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002F82]/80 via-transparent to-transparent" />
        <div className="relative mx-auto w-[90%] max-w-[1290px] pb-[4%] flex flex-col items-center">
          <img src={CLOUD.orangeIcon} alt="" className="mb-3 h-12 w-12 md:h-[60px] md:w-[60px]" />
          <h1 className="text-white leading-none font-semibold" style={{ fontSize: isMobile ? 36 : 64, marginBottom: isMobile ? "6%" : "10%" }}>
            Facilities
          </h1>
        </div>
      </section>

      {/* FULL-BLEED ORANGE FABRIC STRIP */}
      <section className="relative w-screen">
        <img src={CLOUD.fabric} alt="" className="absolute inset-0 h-[220px] md:h-[300px] w-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(237,109,35,0.86)" }} />
        <div className="relative mx-auto max-w-[1290px] px-5 sm:px-8">
          <div className="h-[220px] md:h-[300px] flex items-center justify-center text-center text-white">
            <div className="max-w-4xl">
              <h3 className="cent-schbk-cyrill">Campus Facilities</h3>
              <p className="mt-3 md:mt-4 text-[14px] md:text-[16px] leading-relaxed">
                Every corner of our CBSE school campus in Kurukshetra has been designed with one goal in mind: giving students a place where learning, comfort, and growth go hand in hand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOARDING (image first on mobile) */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="md:order-2">
            <div
              className="relative h-[260px] sm:h-[320px] md:h-[420px] rounded-lg overflow-hidden shadow cursor-grab active:cursor-grabbing"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <img src={CLOUD.boardingCarousel[currentImage]} alt="Dorm rooms" className="w-full h-full object-cover select-none" />
            </div>
            <div className="mt-4 flex md:hidden items-center justify-start gap-1.5 pl-1">
              {CLOUD.boardingCarousel.map((_, idx) => (
                <span key={idx} className={`h-1.5 w-1.5 rounded-full ${idx === currentImage ? "bg-[#ED6D23]" : "bg-[#D9D9D9]"}`} />
              ))}
            </div>
            <div className="mt-5 hidden md:flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentImage((p) => (p - 1 + CLOUD.boardingCarousel.length) % CLOUD.boardingCarousel.length)}
                className="w-11 h-11 rounded-full border-2 flex items-center justify-center transition hover:bg-[#ED6D23] hover:text-white cursor-pointer"
                style={{ borderColor: brand.orange, color: brand.orange }}
                aria-label="Previous image"
              >
                <span className="text-lg">‹</span>
              </button>
              <button
                onClick={() => setCurrentImage((p) => (p + 1) % CLOUD.boardingCarousel.length)}
                className="w-11 h-11 rounded-full border-2 flex items-center justify-center transition hover:bg-[#ED6D23] hover:text-white cursor-pointer"
                style={{ borderColor: brand.orange, color: brand.orange }}
                aria-label="Next image"
              >
                <span className="text-lg">›</span>
              </button>
            </div>
          </div>

          <div className="md:order-1">
            <h2 className="text-[#1C3664]" style={{ fontWeight: 600, fontSize: isMobile ? "28px" : "40px", lineHeight: 1.2 }}>
              Boarding
            </h2>
            <p className="mt-3 max-w-[520px] text-[#3A2323] univers-regular">
      Boarding at Amatir is more than accommodation, it's a nurturing experience that reflects our standing among the best school facilities in Kurukshetra. Our CBSE Gurukul facilities provide a warm, caring space where children grow, build friendships, and learn independence, a true second home that nurtures physical and mental well-being. Behind that experience are some of the more thoughtfully designed girls hostel facilities in Haryana, built to feel less like a dormitory and more like home.
            </p>
            <a
              href="/boarding"
              className="mt-6 inline-flex items-center justify-center rounded-full text-white text-[14px] cursor-pointer"
              style={{ width: "134px", height: "50px", borderRadius: "100px", background: brand.orange }}
            >
              Know more
            </a>
          </div>
        </div>
      </section>

      {/* LABORATORY */}
      <section className="bg-[#F5F5F5] py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-2 w-full">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="font-[400] leading-[1.2] text-[#1C3664]" style={{ fontSize: isMobile ? 28 : 44 }}>
              Laboratory
            </h2>
            <p className="text-[#3A2323] max-w-[820px] mx-auto text-center univers-regular leading-[1.5] mt-2" style={{ fontSize: isMobile ? 16 : 18 }}>
As a Gurukul academy committed to holistic education, our campus includes state-of-the-art labs, smart classrooms, and hands-on experiential learning that help students explore, experiment, and apply knowledge across disciplines. It's this setup that makes Amatir a genuine school with smart classrooms and science labs, not just on paper, but in the way students learn every day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div key={labActive} className="rounded-lg overflow-hidden shadow-md fade-in order-1">
              <img src={labItem.img} alt={labItem.title} className="w-full h-full object-cover" />
            </div>

            <div className="relative order-2">
              <div className="absolute left-2 top-0 bottom-0 w-px bg-[#D9DFEA] hidden md:block" />
              <ul className="space-y-4 pl-0 md:pl-6">
                {LABS.map((t) => {
                  const on = t.key === labActive;
                  return (
                    <li key={t.key}>
                      <button onClick={() => setLabActive(t.key)} className="w-full text-left cursor-pointer">
                        <div className="flex items-stretch gap-3">
                          <span
                            className="self-stretch w-[3px] rounded"
                            style={{ backgroundColor: on ? brand.orange : "transparent" }}
                          />
                          <div>
                            <h4
                              style={{
                                fontWeight: on ? 600 : 400,
                                fontSize: isMobile ? 24 : 32,
                                lineHeight: "140%",
                                color: on ? "#1C3664" : "#9CA3AF"
                              }}
                            >
                              {t.title}
                            </h4>
                            {/* Only show description for active item */}
                            {on && (
                              <p className="mt-1 text-[14px] md:text-[16px] text-[#3A2323] max-w-prose">{t.desc}</p>
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

      {/* INFRASTRUCTURE */}
      <section className="bg-white py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 w-full">
          <h2 className="text-center text-[#1C3664]" style={{ fontWeight: 400, fontSize: isMobile ? 28 : 44 }}>
            Infrastructure
          </h2>
          <p className="my-3 text-center text-slate-600 max-w-[860px] mx-auto univers-regular" style={{ fontSize: isMobile ? 16 : 18 }}>
            Smart, student-first spaces built for curiosity, comfort, and connection—because great learning starts with the right setting.
          </p>

          {/* Desktop tabs */}
          {!isMobile && (
            <>
              <div className="mt-10 flex flex-wrap justify-center gap-8 md:gap-10">
                {infraOrder.map((key) => (
                  <button
                    key={key}
                    onClick={() => setInfraActive(key)}
                    className="pb-2 cursor-pointer"
                    aria-selected={infraActive === key}
                    style={{

                      fontWeight: 400,
                      fontSize: 28,
                      borderBottom: infraActive === key ? "2px solid #002F82" : "2px solid transparent",
                      color: infraActive === key ? "#002F82" : "#1C3664",
                    }}
                  >
                    {infraTabs[key].label}
                  </button>
                ))}
              </div>

              <div key={infraActive} className="mt-12 grid md:grid-cols-2 gap-10 items-center fade-in">
                <div>
                  <h3 className="text-[#1C3664]" style={{ fontWeight: 400, fontSize: 44 }}>
                    {infraTabs[infraActive].title}
                  </h3>
                  <p className="mt-2 text-slate-700 univers-regular">
                    {infraTabs[infraActive].text}
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img src={infraTabs[infraActive].img} alt={infraTabs[infraActive].alt} className="w-full h-80 object-cover" />
                </div>
              </div>
            </>
          )}

          {/* Mobile accordion */}
          {isMobile && (
            <>
              <div className="infra-hr my-4" />
              <div className="mt-2">
                {infraOrder.map((key) => {
                  const on = infraActive === key;
                  const { label, title, text, img, alt } = infraTabs[key];
                  return (
                    <div key={key} className="acc-row">
                      <button onClick={() => setInfraActive(key)} className="w-full text-left cursor-pointer" aria-expanded={on} aria-controls={`infra-panel-${key}`}>
                        <div className="acc-label">
                          <span className={`acc-label-text ${on ? "on" : "off"}`}>{label}</span>
                          <span className={`acc-chev ${on ? "on" : ""}`} aria-hidden>
                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          </span>
                        </div>
                        {on && <div className="acc-underline" />}
                      </button>

                      {on && (
                        <div id={`infra-panel-${key}`} className="pt-3 fade-in">
                          <h4 className="text-[#1C3664]" style={{ fontWeight: 400, fontSize: 28 }}>
                            {title}
                          </h4>
                          <p className="mt-2 text-[#3A2323] univers-regular">
                            {text}
                          </p>
                          <div className="mt-3 rounded-[12px] overflow-hidden shadow-md">
                            <img src={img} alt={alt} className="w-full h-[184px] object-cover" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* STEP INSIDE (video) */}
      <section className="bg-white py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="mx-auto w-[90%] max-w-[1100px]">
          <h2 className="text-[#1C3664] text-center" style={{ fontWeight: 400, fontSize: isMobile ? 26 : 44 }}>
            Step Inside: Facilities and Amenities at a Glance
          </h2>
          <div className="relative group mt-6 rounded-[12px] overflow-hidden">
            <img src={CLOUD.videoThumb} alt="Campus video" className="w-full h-[220px] sm:h-[340px] md:h-[520px] object-cover" />
            <button onClick={() => setShowVideo(true)} aria-label="Play video" className="absolute inset-0 grid place-items-center cursor-pointer">
              <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/30 backdrop-blur-sm grid place-items-center">
                <span className="ml-1 border-l-[14px] border-l-white border-y-[10px] border-y-transparent" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {showVideo && (
        <div className="fixed inset-0 z-50" onClick={(e) => e.target === e.currentTarget && setShowVideo(false)}>
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 pt-18">
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
            <button onClick={() => setShowVideo(false)} className="mt-4 inline-flex items-center bg-white text-slate-800 px-4 py-2 rounded-lg cursor-pointer">
              Close
            </button>
          </div>
        </div>
      )}

      {/* GALLERY */}
      <MobileGallery images={imagesForGallery} title="Gallery" subtitle="Festival Celebrations at Amatir" />

      {/* BOTTOM CTA */}
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
          <button onClick={() => navigate('/contact')} className="rounded-full bg-[#1C3664] px-6 py-2 text-white shadow-[0_12px_28px_rgba(0,29,73,0.16)] cursor-pointer">
            Get in Touch
          </button>
        </div>
      </section>

      {/* MAP */}
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
