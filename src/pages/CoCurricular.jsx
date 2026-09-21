// CoCurricularPage.jsx
import { Section } from "lucide-react";
import React, {useState} from "react";
import { useMediaQuery } from "react-responsive";
import FromWordsToExpression from "../components/FromWordsToExpression";
import { useNavigate } from "react-router-dom";

/* ===================== LOCAL ASSETS ===================== */
const IMG = {
  logoBlue: "/images/Logo_Blue_bjfere.svg",
  orangeIcon: "/images/Orange_Icon_i299iz.svg",

  hero: "/images/Main-cocurricular_1_mqjnop.jpg",
  band: "/images/Rectangle_110_z3567i.jpg",

  /* SPORTS */
  s1: "/images/WhatsApp_Image_2025-08-20_at_10.16.46_AM_1_ddz0gj.jpg",
  s2: "/images/Rectangle_101_vwxaqf.jpg",
  s3: "/images/Rectangle_107_mjkkny.jpg",
  s4: "/images/Rectangle_102_hveven.jpg",
  s5: "/images/Rectangle_112_f2pd47.jpg",
  s6: "/images/Rectangle_103_lc0vlr.jpg",
  s7: "/images/Rectangle_108_gtjkhm.jpg",
  s8: "/images/WhatsApp_Image_2025-02-27_at_11.30.13_AM_bx6kqm.jpg",
  s9: "/images/Rectangle_113_wtshss.jpg",
  s10: "/images/sports3_tm2fud.jpg",
  s11: "/images/Rectangle_109_ibi479.jpg",
  s12: "/images/Rectangle_106_pqh4w0.jpg",
  s13: "/images/Rectangle_111_cqenhk.jpg",
  s14: "/images/Rectangle_100_1_b9eotf.jpg",
  sLast: "/images/Rectangle_101_1_gdw4sm.jpg",
  sLastMost: "/images/KUM_3689_rau4ju.jpg",

  /* SECTIONS */
  ncc: "/images/NCC3_p3yo6h.jpg",
  performing: "/images/Dance_owgas0.jpg",
  creative: "/images/Rectangle_89_aqlytp.jpg",
  elevate: "/images/fashion_desgining_phj71k.jpg",
  cooking: "/images/cooking_jbavgg.jpg",

  /* FINE ARTS */
  fine1: "/images/Drawing_hnprij.jpg",
  fine2: "/images/Painting_ntq920.jpg",
  fine3: "/images/Quilling02_ftkvyw.jpg",
  fine4: "/images/Creative_writing_yqgll4.jpg",

  /* GALLERY (mosaic) */
  gA: "/images/WhatsApp_Image_2025-08-20_at_10.16.46_AM_1_ddz0gj.jpg",
  gB: "/images/WhatsApp_Image_2025-08-20_at_11.36.55_AM_1_wgsj3d.jpg",
  gC: "/images/BA-Sports10_r5wixc.jpg",
  gD: "/images/cocurricular2_rzalon.jpg",
  gE: "/images/2_3_hkh6bu.jpg",
  gF: "/images/co-curricular1_urazg4.jpg",
  gG: "/images/cocurricular3_iwnzau.jpg",
  gH: "/images/4_2_ppfqip.jpg",
};

/* ===================== ATOMS ===================== */
const H = ({ children, className = "" }) => (
  <h2
    className={`font-['CentSchbkCyrill_BT:Roman',_serif] text-[#1C3664] tracking-[0.01em] text-[28px] md:text-[32px] ${className}`}
  >
    {children}
  </h2>
);

const ArrowBtn = ({ dir = "left", onClick }) => (
  <button
    onClick={onClick}
    className="grid h-10 w-10 place-items-center rounded-full border border-[#ED6D23] text-[#ED6D23] hover:bg-[#ED6D23] hover:text-white transition-colors cursor-pointer"
    aria-label={dir === "left" ? "Previous" : "Next"}
  >
    {dir === "left" ? (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          d="M15 18l-6-6 6-6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </button>
);

/* ===================== SPORTS (exact 7-col zig-zag) ===================== */
const Sports = () => {
  // Design-calibrated sizes to match screenshot
  const TILE_H = 186; // px
  const GAP = 16; // px
  const BASE = 8;

  const columns = [
    [IMG.s1, IMG.s2, IMG.s3],
    [IMG.s4, IMG.s5],
    [IMG.s6, IMG.s7],
    [IMG.s8, IMG.s9],
    [IMG.s10, IMG.s11],
    [IMG.s12, IMG.s13],
    [IMG.s14, IMG.sLast, IMG.sLastMost],
  ];

  const mt = (idx) => {
    // 2-image columns: offset = 0.5*TILE + 0.5*GAP + BASE
    const two = 0.5 * TILE_H + 0.5 * GAP + BASE;
    // 3-image columns: align top; first/third/5th lowered slightly like visual
    const three = BASE;
    if ([0, 2, 4, 6].includes(idx)) return three + 10;
    return two;
  };

  const Tile = ({ src }) => (
    <div
      className="overflow-hidden rounded-[10px] shadow-[0_14px_32px_rgba(0,29,73,0.14)]"
      style={{ height: TILE_H }}
    >
      <img src={src} alt="" className="h-full w-full object-cover" />
    </div>
  );

  return (
    <section className="bg-[#F7F9FB] py-12">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="grid grid-cols-7" style={{ gap: `${GAP}px` }}>
          {columns.map((col, i) => (
            <div key={i} style={{ marginTop: mt(i) }}>
              <div className="flex flex-col" style={{ gap: `${GAP}px` }}>
                {col.map((src, j) => (
                  <Tile key={j} src={src} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className=" mx-auto text-center z-20"
          style={{
            marginTop: "-6%",
            width: "100%",
          }}
        >
          <h2 className="font-['CentSchbkCyrill_BT',_serif] font-normal not-italic text-[44px] leading-[120%] tracking-normal text-center">
            Sports
          </h2>
          <p className="mx-auto mt-2 max-w-[720px] text-center font-['Univers',_sans-serif] font-normal not-italic text-[18px] leading-[1.5] tracking-[-0.02em] text-[#2b2b2b]">
            At Amatir, the spirit of discipline, teamwork, and excellence is
            forged on the field. Through expert coaching in volleyball,
            basketball, football, handball, athletics, taekwondo, and access to
            a 400m track, our students consistently excel—from district
            tournaments to national stages like Khelo India.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ===================== NCC ===================== */
const NCC = () => {
  const pics = [
    "/images/NCC1_nse9hs.jpg",
    "/images/059A0024_kgbope.jpg",
    "/images/NCC3_p3yo6h.jpg",
  ];
  const [i, setI] = React.useState(0);
  return (
    <section className="py-14 bg-white">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="grid items-start gap-10 md:grid-cols-[1fr_600px]">
          <div>
            <h2 className="mb-2 font-['CentSchbkCyrill_BT',_serif] font-normal not-italic text-[44px] leading-[120%] tracking-normal text-[#1C3664]">
              NCC
            </h2>
            <p className="max-w-[520px] text-[14.5px] leading-[1.85] text-[#2b2b2b]">
              As part of the 10th Haryana Battalion Senior Wing, our NCC unit
              instills discipline, leadership, and national pride. Through
              drills, camps, and training, cadets build resilience,
              responsibility, and the strength to serve society with confidence.
            </p>
          </div>
          <div className="justify-self-end">
            <div className="overflow-hidden rounded-[10px] shadow-[0_16px_40px_rgba(0,29,73,0.16)]">
              <div className="relative w-[min(600px,90vw)] pb-[66%]">
                <img
                  src={pics[i]}
                  alt="NCC"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-6">
          <ArrowBtn
            dir="left"
            onClick={() => setI((p) => (p - 1 + pics.length) % pics.length)}
          />
          <ArrowBtn
            dir="right"
            onClick={() => setI((p) => (p + 1) % pics.length)}
          />
        </div>
      </div>
    </section>
  );
};

/* ===================== Performing Arts ===================== */
const Performing = () => {
  const [activeTab, setActiveTab] = React.useState("music");

  const tabs = {
    music: {
      title: "Music",
      content:
        "Opportunities to learn instruments, Indian vocals, and build confidence through rhythm, melody, and teamwork.",
    },
    dance: {
      title: "Dance",
      content:
        "Encourages expression, coordination, and joy through Indian classical dance and creative movement.",
    },
    theater: {
      title: "Theatre",
      content:
        "Builds communication skills, stage presence, and self-confidence through acting and storytelling.",
    },
  };

  return (
    <section className="py-14 bg-[#F5F5F5]">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="text-center mb-8">
          <h2
            style={{
              fontFamily: "CentSchbkCyrill BT, serif",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "44px",
              lineHeight: "120%",
              letterSpacing: "0%",
              textAlign: "center",
              color: "#1C3664",
            }}
            className="mb-2"
          >
            Performing Arts
          </h2>
          <p
            className="mx-auto mt-2 max-w-[560px] text-center"
            style={{
              fontFamily: "Univers, sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "18px",
              lineHeight: "150%",
              letterSpacing: "-0.02em",
              color: "#2b2b2b",
            }}
          >
            Encouraging students to explore their voice, presence, and passion
            through meaningful artistic experiences.
          </p>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-[560px_1fr]">
          <div className="overflow-hidden rounded-[10px] shadow-[0_16px_40px_rgba(0,29,73,0.16)]">
            <img
              src={
                activeTab === "music"
                  ? "/images/Music_kv48l2.jpg"
                  : activeTab === "dance"
                  ? "/images/Dance_owgas0.jpg"
                  : activeTab === "theater"
                  ? "/images/Theater_mcahmk.jpg"
                  : IMG.performing
              }
              alt=""
              className="h-[420px] w-full object-cover"
            />
          </div>

          <div className="space-y-7">
            {/* Music */}
            <div
              className={`flex items-start gap-4 cursor-pointer transition-all duration-200 ${
                activeTab === "music" ? "" : "opacity-60 hover:opacity-80"
              }`}
              onClick={() => setActiveTab("music")}
            >
              <div
                className={`h-8 w-[2px] transition-all duration-200 ${
                  activeTab === "music" ? "h-20 bg-[#ED6D23]" : "bg-[#1C3664]"
                }`}
              />
              <div>
                <div
                  style={{
                    fontFamily: "CentSchbkCyrill BT, serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "32px",
                    lineHeight: "140%",
                    letterSpacing: "0%",
                    color: "#1C3664",
                  }}
                >
                  {tabs.music.title}
                </div>
                {activeTab === "music" && (
                  <p className="mt-1 max-w-[480px] text-[14.5px] leading-[1.8] text-[#2b2b2b]">
                    {tabs.music.content}
                  </p>
                )}
              </div>
            </div>

            {/* Dance */}
            <div
              className={`flex items-start gap-4 cursor-pointer transition-all duration-200 ${
                activeTab === "dance" ? "" : "opacity-60 hover:opacity-80"
              }`}
              onClick={() => setActiveTab("dance")}
            >
              <div
                className={`h-8 w-[2px] transition-all duration-200 ${
                  activeTab === "dance" ? "h-20 bg-[#ED6D23]" : "bg-[#1C3664]"
                }`}
              />
              <div>
                <div
                  style={{
                    fontFamily: "CentSchbkCyrill BT, serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "32px",
                    lineHeight: "140%",
                    letterSpacing: "0%",
                    color: "#1C3664",
                  }}
                >
                  {tabs.dance.title}
                </div>
                {activeTab === "dance" && (
                  <p className="mt-1 max-w-[480px] text-[14.5px] leading-[1.8] text-[#2b2b2b]">
                    {tabs.dance.content}
                  </p>
                )}
              </div>
            </div>

            {/* Theater */}
            <div
              className={`flex items-start gap-4 cursor-pointer transition-all duration-200 ${
                activeTab === "theater" ? "" : "opacity-60 hover:opacity-80"
              }`}
              onClick={() => setActiveTab("theater")}
            >
              <div
                className={`h-8 w-[2px] transition-all duration-200 ${
                  activeTab === "theater" ? "h-20 bg-[#ED6D23]" : "bg-[#1C3664]"
                }`}
              />
              <div>
                <div
                  style={{
                    fontFamily: "CentSchbkCyrill BT, serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "32px",
                    lineHeight: "140%",
                    letterSpacing: "0%",
                    color: "#1C3664",
                  }}
                >
                  {tabs.theater.title}
                </div>
                {activeTab === "theater" && (
                  <p className="mt-1 max-w-[480px] text-[14.5px] leading-[1.8] text-[#2b2b2b]">
                    {tabs.theater.content}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ===================== Creative Expressions ===================== */
const Creative = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
  <section className="py-14 bg-white">
    <div className="mx-auto w-[min(1180px,92vw)] text-center">
      <h2
        className="mb-6"
        style={{
          fontFamily: "CentSchbkCyrill BT, serif",
          fontWeight: 400,
          fontStyle: "normal",
          fontSize: "44px",
          lineHeight: "120%",
          letterSpacing: "0%",
          textAlign: "center",
          color: "#1C3664",
        }}
      >
        Creative Expressions
      </h2>
    </div>
    <div className="mx-auto w-[90%] max-w-[1100px]">
      <div className="relative group mt-6 rounded-[12px] overflow-hidden">
        <img
          src="/images/Reading_gghzie.jpg"
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
                src="https://www.youtube.com/embed/aUzKbx04g9U?autoplay=1&rel=0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    )}
  </section>
  )
};

/* ===================== Fine Arts ===================== */
const FineArts = () => {
  const fineArtsData = [
    {
      id: "drawing",
      title: "Drawing",
      image: "/images/Drawing_hnprij.jpg",
      description:
        "Encourages observation and imagination as students bring their ideas to life on paper.",
    },
    {
      id: "Paper-Recycling",
      title: "Paper Recycling",
      image: "/images/paper_recycling_hxhbap.jpg",
      description:
        "Teaches eco-friendly habits by turning waste paper into useful and creative items.",
    },
    {
      id: "quilling",
      title: "Quilling",
      image: "/images/Quilling02_ftkvyw.jpg",
      description:
        "Builds focus and creativity through beautiful paper art made by rolling and shaping strips.",
    },
    {
      id: "Painting",
      title: "Painting",
      image: "/images/Painting_ntq920.jpg",
      description:
        "Lets students express feelings and ideas through colors, brushwork, and visual storytelling.",
    },
  ];

  return (
    <section className="py-14 bg-[#0E3773] text-white relative">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="text-center mb-10">
          <h3 className="font-['CentSchbkCyrill_BT:Roman',_serif] text-[28px] md:text-[32px]">
            Fine Arts
          </h3>
          <p className="mx-auto mt-2 max-w-[700px] text-[14.5px] leading-[1.85] opacity-95">
            Exploring creativity through diverse mediums, our Fine Arts program
            nurtures expression, environmental awareness, and hands-on skill
            development.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
          {fineArtsData.map((art) => (
            <article
              key={art.id}
              className="group relative overflow-hidden rounded-[10px] bg-white text-[#1C3664] cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-[220px] overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Bottom Title Bar */}
              <div className="grid place-items-center bg-[#ED6D23] py-3 text-white font-['CentSchbkCyrill_BT:Roman',_serif] transition-all duration-300 group-hover:bg-[#ED6D23]/90">
                {art.title}
              </div>

              {/* Hover Overlay - Slides from bottom */}
              <div className="absolute inset-0 bg-[#ED6D23]/95 px-5 py-4 text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 flex flex-col justify-center">
                <div className="font-['CentSchbkCyrill_BT:Roman',_serif] text-[20px] mb-2">
                  {art.title}
                </div>
                <p className="text-[14px] leading-[1.5] opacity-95">
                  {art.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ===================== Elevate Clubs ===================== */
const Elevate = () => {
  const [activeTab, setActiveTab] = React.useState("fashion");

  const tabs = {
    fashion: {
      title: "Fashion Designing",
      content:
        "Students explore creativity and style by designing outfits and learning the basics of fashion.",
    },
    shark: {
      title: "Shark Tank",
      content:
        "A fun, hands-on club where students pitch ideas, learn about business, and build confidence in communication.",
    },
    tech: {
      title: "Tech Hackathon",
      content:
        "Encourages teamwork and problem-solving as students use technology to build real-world solutions.",
    },
    vedic: {
      title: "Vedic Math",
      content:
        "Ancient techniques that make math faster, easier, and fun—building confidence with every calculation.",
    },
  };

  return (
    <section className="py-14 bg-[#F5F5F5]">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="text-center mb-8">
          <div className="cent-schbk-cyrill">Elevate Clubs</div>
          <p className="mx-auto mt-2 max-w-[600px] text-[14.5px] leading-[1.85] text-[#2b2b2b]">
            Our Elevate Clubs spark creativity and innovation—empowering
            students to explore their passions and develop real-world skills.
          </p>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-[560px_1fr]">
          <div className="overflow-hidden rounded-[10px] shadow-[0_16px_40px_rgba(0,29,73,0.16)]">
            <img
              src={
                activeTab === "fashion"
                  ? "/images/fashion_desgining_phj71k.jpg"
                  : activeTab === "shark"
                  ? "/images/Tech_Hackathon_ryxqzm.jpg"
                  : activeTab === "tech"
                  ? "/images/Tech_Hackathon_ryxqzm.jpg"
                  : activeTab === "vedic"
                  ? "/images/Vedic_Math_pxwnyk.jpg"
                  : "/images/fashion_desgining_phj71k.jpg"
              }
              alt=""
              className="h-[420px] w-full object-cover"
            />
          </div>

          <div className="space-y-7 text-left">
            {/* Fashion Designing */}
            <div
              className={`flex items-start gap-4 cursor-pointer transition-all duration-200 ${
                activeTab === "fashion" ? "" : "opacity-60 hover:opacity-80"
              }`}
              onClick={() => setActiveTab("fashion")}
            >
              <div
                className={`h-8 w-[2px] transition-all duration-200 ${
                  activeTab === "fashion" ? "h-20 bg-[#ED6D23]" : "bg-[#1C3664]"
                }`}
              />
              <div>
                <div
                  className="cent-schbk-cyrill text-[15px] text-left text-[#1C3664]"
                  style={{
                    fontSize: "28px",
                    color: "#1C3664",
                    textAlign: "left",
                  }}
                >
                  {tabs.fashion.title}
                </div>
                {activeTab === "fashion" && (
                  <p className="mt-1 max-w-[480px] text-[14.5px] leading-[1.8] text-[#2b2b2b]">
                    {tabs.fashion.content}
                  </p>
                )}
              </div>
            </div>

            {/* Shark Tank */}
            <div
              className={`flex items-start gap-4 cursor-pointer transition-all duration-200 ${
                activeTab === "shark" ? "" : "opacity-60 hover:opacity-80"
              }`}
              onClick={() => setActiveTab("shark")}
            >
              <div
                className={`h-8 w-[2px] transition-all duration-200 ${
                  activeTab === "shark" ? "h-20 bg-[#ED6D23]" : "bg-[#1C3664]"
                }`}
              />
              <div>
                <div
                  className="cent-schbk-cyrill"
                  style={{
                    fontSize: "28px",
                    color: "#1C3664",
                    textAlign: "left",
                  }}
                >
                  {tabs.shark.title}
                </div>
                {activeTab === "shark" && (
                  <p className="mt-1 max-w-[480px] text-[14.5px] leading-[1.8] text-[#2b2b2b]">
                    {tabs.shark.content}
                  </p>
                )}
              </div>
            </div>

            {/* Tech Hackathon */}
            <div
              className={`flex items-start gap-4 cursor-pointer transition-all duration-200 ${
                activeTab === "tech" ? "" : "opacity-60 hover:opacity-80"
              }`}
              onClick={() => setActiveTab("tech")}
            >
              <div
                className={`h-8 w-[2px] transition-all duration-200 ${
                  activeTab === "tech" ? "h-20 bg-[#ED6D23]" : "bg-[#1C3664]"
                }`}
              />
              <div>
                <div
                  className="cent-schbk-cyrill"
                  style={{
                    fontSize: "28px",
                    color: "#1C3664",
                    textAlign: "left",
                  }}
                >
                  {tabs.tech.title}
                </div>
                {activeTab === "tech" && (
                  <p className="mt-1 max-w-[480px] text-[14.5px] leading-[1.8] text-[#2b2b2b]">
                    {tabs.tech.content}
                  </p>
                )}
              </div>
            </div>

            {/* Vedic Math */}
            <div
              className={`flex items-start gap-4 cursor-pointer transition-all duration-200 ${
                activeTab === "vedic" ? "" : "opacity-60 hover:opacity-80"
              }`}
              onClick={() => setActiveTab("vedic")}
            >
              <div
                className={`h-8 w-[2px] transition-all duration-200 ${
                  activeTab === "vedic" ? "h-20 bg-[#ED6D23]" : "bg-[#1C3664]"
                }`}
              />
              <div>
                <div
                  className="cent-schbk-cyrill"
                  style={{
                    fontSize: "28px",
                    color: "#1C3664",
                    textAlign: "left",
                  }}
                >
                  {tabs.vedic.title}
                </div>
                {activeTab === "vedic" && (
                  <p className="mt-1 max-w-[480px] text-[14.5px] leading-[1.8] text-[#2b2b2b]">
                    {tabs.vedic.content}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ===================== Cooking ===================== */
const Cooking = () => {
  const slides = [
    "/images/Acad-Lab05_ellv9a.jpg",
    "/images/BA-Cooking01_wvgalp.jpg",
    "/images/cooking1_xvgxzy.jpg",
    "/images/cooking2_t0benh.jpg",
  ];
  const [i, setI] = React.useState(0);

  return (
    <section className="py-14 bg-white">
      <div className="mx-auto grid w-[min(1180px,92vw)] items-start gap-10 md:grid-cols-[1fr_600px]">
        <div>
          <div
            className="cent-schbk-cyrill"
            style={{
              color: "#1C3664",
              marginBottom: "0.5rem",
            }}
          >
            Cooking
          </div>
          <p className="max-w-[620px] text-[14.5px] leading-[1.85] text-[#2b2b2b]">
            Cooking is a creative life skill woven into everyday learning.
            Students explore nutrition, hygiene, food science, and meal planning
            through hands-on sessions in the kitchen. Fireless Cooking
            introduces younger students to healthy eating and safety, while the
            Multi-Cuisine Club lets seniors experiment with regional and global
            recipes—celebrating food diversity and teamwork. Every Sunday,
            senior classes prepare Sunday Snacks for the hostel—planning,
            cooking, and serving meals that blend leadership with the joy of
            sharing. These traditions nurture confidence, collaboration, and a
            lifelong appreciation for wholesome food.
          </p>
        </div>

        <div className="justify-self-end">
          <div className="overflow-hidden rounded-[10px] shadow-[0_16px_40px_rgba(0,29,73,0.16)]">
            <div className="relative w-[min(600px,90vw)] pb-[66%]">
              <img
                src={slides[i]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="mt-5 flex justify-center gap-6">
            <ArrowBtn
              dir="left"
              onClick={() =>
                setI((p) => (p - 1 + slides.length) % slides.length)
              }
            />
            <ArrowBtn
              dir="right"
              onClick={() => setI((p) => (p + 1) % slides.length)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ===================== Gallery (mosaic like screenshot) ===================== */
const Gallery = () => {
  const GAP = 16;

  const Cell = ({ src, col, span, rows }) => (
    <div
      className="overflow-hidden rounded-[10px] shadow-[0_16px_40px_rgba(0,29,73,0.14)]"
      style={{ gridColumn: `${col} / span ${span}`, gridRow: `span ${rows}` }}
    >
      <img src={src} alt="" className="h-full w-full object-cover" />
    </div>
  );

  return (
    <section className="py-14 bg-white">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="text-center mb-6">
          <H
            style={{
              fontFamily: "CentSchbkCyrill BT",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "44px",
              lineHeight: "120%",
              letterSpacing: "0%",
              textAlign: "center",
            }}
          >
            Gallery
          </H>
          <p
            className="text-[#2b2b2b] pb-7"
            style={{
              fontFamily: "Univers, system-ui, -apple-system, sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "18px",
              lineHeight: "150%",
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            Snapshots of life beyond the classroom
          </p>
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(12, 1fr)",
            gridAutoRows: "10px",
            gap: `${GAP}px`,
          }}
        >
          {/* Large left */}
          <Cell src={IMG.gA} col={1} span={7} rows={26} />

          {/* Top-right stacked 2 */}
          <Cell src={IMG.gB} col={8} span={5} rows={12} />
          <Cell src={IMG.gC} col={8} span={5} rows={12} />

          {/* Bottom band */}
          <Cell src={IMG.gD} col={1} span={4} rows={12} />
          <Cell src={IMG.gE} col={5} span={3} rows={12} />
          <Cell src={IMG.gH} col={8} span={5} rows={24} />
          <Cell src={IMG.gF} col={1} span={3} rows={12} />
          <Cell src={IMG.gG} col={4} span={4} rows={12} />
        </div>
      </div>
    </section>
  );
};

/* ===================== CUSTOM HOOKS ===================== */
const useScreenHeight = () => {
  const [screenHeight, setScreenHeight] = React.useState(window.innerHeight);

  React.useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenHeight;
};

/* ===================== PAGE ===================== */
export default function CoCurricularPage() {
  const screenHeight = useScreenHeight();
  const navigate = useNavigate();
  return (
    <main className="bg-white text-[#1C3664]">
      {/* HERO */}
      <section
        id="cocurricular-hero"
        className="relative"
        style={{ height: `${screenHeight}px` }}
      >
        <img
          src={IMG.hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#012a6a] opacity-80" />

        <div className="relative z-10 flex h-full items-end justify-center text-center text-white pb-[11%]">
          <div>
            <img src={IMG.orangeIcon} alt="" className="mx-auto mb-2 h-7 w-7" />
            <h1 className="cent-schbk-cyrill text-[34px] md:text-[42px] leading-tight">
              Co Curricular
            </h1>
          </div>
        </div>
      </section>

      {/* ORANGE BAND */}
      <section className="relative isolate w-[80%] mx-auto py-10 text-white">
        <img
          src={IMG.band}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[#ED6D23]/85 " />
        <div className="mx-auto w-[min(1180px,92vw)] text-center">
          <h3 className="font-['CentSchbkCyrill_BT',_serif] font-normal not-italic text-[44px] leading-[140%] tracking-normal text-center">
            Beyond the Classroom
          </h3>
          <p className="mx-auto mt-2 max-w-[700px] text-center font-['Univers',_sans-serif] font-normal not-italic text-[16px] leading-[1.5] tracking-normal">
            At Amatir, we believe that true education nurtures every part of a
            child’s being. As a leading Gurukul academy focused on holistic
            growth, our students go far beyond academics—engaging in music,
            yoga, sports, creative arts, and leadership-building programs that
            cultivate balance, creativity, and inner discipline.
          </p>
        </div>
      </section>

      {/* SECTIONS */}
      <Sports />
      <NCC />
      <Performing />
      <Creative />
      <FineArts />
      <Elevate />
      <Cooking />
      <FromWordsToExpression />
      <div style={{ padding: "3rem", height: "1px", width: "100%" }}> </div>
      <Gallery />

      {/* CTA */}
      <section className="relative isolate w-full py-14 text-center text-white">
        <img
          src={IMG.band}
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
          <button onClick={()=> navigate('/contact')} className="rounded-full bg-[#1C3664] px-6 py-2 text-white shadow-[0_12px_28px_rgba(0,29,73,0.16)] cursor-pointer">
            Get in Touch
          </button>
        </div>
      </section>

      {/* MAP / FOOTER STRIP (kept minimal to match screenshot spacing) */}
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
