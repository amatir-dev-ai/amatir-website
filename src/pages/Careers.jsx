// CareersPage.jsx
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

/* Cloudinary assets (provided) */
const ASSETS = {
  hero: "/images/Copy_of_IMG_20250905_112441_pjh7h0.jpg",
  accent: "/images/Orange_Iocn_fnx3aw.svg",
  thumb: "/images/Rectangle_98_rrzfkj.jpg",
  openPositionsBg: "/images/Rectangle_35_tetoe6.jpg",
  orangeBanner: "/images/Rectangle_63_f9abnb.jpg",
};

/* Reusable chip button for the form */
const Chip = ({ label, selected, onClick }) => (
  <button
    type="button"
    aria-pressed={selected}
    onClick={onClick}
    className={`rounded border px-3 py-1 text-[12px] leading-6 transition ${selected
      ? "bg-[#1C3664] text-white border-[#1C3664]"
      : "bg-white text-[#1C3664] border-slate-300 hover:border-[#1C3664]"
      }`}
  >
    {label}
  </button>
);

export default function Careers() {
  // Responsive media queries for different devices
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isVerySmallScreen = useMediaQuery({ maxWidth: 1024 });
  const isLowHeight = useMediaQuery({ maxHeight: 600 });

  /* Form chip UI state */
  const [exp, setExp] = useState("1-2");
  const [marital, setMarital] = useState("Married");
  const [stayCampus, setStayCampus] = useState("Yes");
  const [fluency, setFluency] = useState("Good");
  const [positionType, setPositionType] = useState("Internship");

  return (
    <div className="min-h-screen w-full bg-white text-slate-800">
      {/* ================= HERO (keep this; header/footer excluded) ================= */}
      <section
        className="relative overflow-hidden w-full"
        style={{
          height: "100vh",
          marginTop: "60px",
          minHeight: isVerySmallScreen ? '400px' : '480px'
        }}
      >
        <img src={ASSETS.hero} alt="Careers hero" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[rgba(14,35,73,0.42)]" />
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
                src={ASSETS.accent}
              />
            </div>
            <h1 className="cent-schbk-cyrill z-10002" style={{
              lineHeight: '1.1',
              color: '#fff',
              marginBottom: '10%'
            }}>
              Careers
            </h1>
          </div>
        </div>
      </section>

      {/* ================= Teach, Inspire and Grow ================= */}
      <section className="mx-auto w-[92%] max-w-[1180px] py-12 md:py-16">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
          {/* Copy */}
          <div className="md:col-span-7">
            <h2 className="font-serif text-[#1C3664] text-[26px] md:text-[34px] leading-snug">
              Teach, Inspire and Grow
            </h2>

            <p className="mt-4 text-[14px] md:text-[15.5px] leading-7 text-[#3A3A3A]">
              At Amatir, we believe that teaching is more than just a profession — it is a calling
              to shape the minds and hearts of future generations. When you join Gurukul school life
              at Amatir, you become part of a vibrant learning community inspired by the rich
              tradition of Gurukul in India, where education goes beyond academics to nurture
              values, integrity, curiosity, and lifelong growth.
            </p>

            <p className="mt-4 text-[14px] md:text-[15.5px] leading-7 text-[#3A3A3A]">
              We are looking for passionate educators seeking teaching jobs for CBSE and who are
              committed to excellence, innovation, and unlocking the potential of every student. At
              Amatir, you will:
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-[14px] md:text-[15.5px] leading-7 text-[#3A3A3A]">
              <li>
                <span className="font-medium">Work with purpose:</span> Contribute to a meaningful
                educational mission that prioritizes character, critical thinking, well-being, and
                value-based teaching roles rooted in timeless wisdom and modern relevance.
              </li>
              <li>
                <span className="font-medium">Collaborate with a dedicated team:</span> Be part of a
                supportive environment where educators share ideas, learn from one another, and grow
                together, much like the Gurukul academy jobs of ancient and modern India.
              </li>
              <li>
                <span className="font-medium">Make a lasting impact:</span> Inspire students to
                become confident, compassionate individuals who are prepared for the challenges of
                tomorrow.
              </li>
            </ul>

            <p className="mt-5 text-[14px] md:text-[15.5px] leading-7 text-[#3A3A3A]">
              If you are seeking a workplace that recognizes your contribution, encourages professional development, and offers the opportunity to make a real difference, we invite you to explore career with purpose opportunities at Amatir.
            </p>

            <a
              href="#apply"
              className="mt-7 inline-block rounded-full bg-[#ED6D23] px-6 py-2 text-[14px] font-semibold text-white"
            >
              Apply
            </a>
          </div>

          {/* Media */}
          <div className="md:col-span-5">
            <div className="relative overflow-hidden rounded-[14px] shadow-sm">
              <img
                src={ASSETS.thumb}
                alt="Teach at Amatir"
                className="block h-[280px] w-full object-cover md:h-[360px]"
              />
              <div className="absolute inset-0 bg-black/20" />
              {/* <button
                type="button"
                aria-label="Play video"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-16 w-16 place-items-center rounded-full bg-white/90 shadow-lg ring-1 ring-black/10"
              >
                <Play className="h-7 w-7 text-[#0E2349]" />
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* ================= Open Positions (with orange Download button on all breakpoints) ================= */}
      <section className="relative overflow-hidden border-y border-white/20">
        <img src={ASSETS.openPositionsBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#1C3664]/92" />
        <div className="relative z-[1] px-6 py-14 md:py-16">
          <div className="mx-auto w-[92%] max-w-[980px] text-center text-white">
            <h2 className="font-serif text-[26px] md:text-[32px]">Open Positions</h2>
            <p className="mx-auto mt-3 max-w-[920px] text-[14px] md:text-[16px] leading-8 text-white/95">
              Amatir is always looking for passionate and skilled educators who are eager
              to inspire young minds and contribute to a values-driven learning
              environment. Explore our current opportunities and discover how you can
              be part of a dynamic and supportive team.
            </p>

            {/* ORANGE BUTTON — visible in both desktop & mobile */}
            <Link
              to="#apply"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#ED6D23] px-6 py-2 text-[14px] font-semibold text-white shadow-sm hover:brightness-105"
            >
              Download
            </Link>
          </div>
        </div>
      </section>

      {/* ================= Apply Now (exact questions & order) ================= */}
      <section
        id="apply"
        className="mx-auto w-[92%] max-w-[740px] py-14 md:py-18"
      >
        {/* Section Heading */}
        <h2 className="text-center font-serif text-[26px] md:text-[30px] text-[#1C3664]">
          Apply Now
        </h2>

        {/* Description */}
        <p className="mx-auto mt-2 max-w-[560px] text-center text-[14px] leading-7 text-[#3A3A3A]">
          Ready to take the next step in your teaching career?{" "}
          <br className="hidden md:block" />
          Click below to view available roles and submit your application.
        </p>

        {/* Zoho Form Embed */}
        <div
          className="flex-1 p-6 sm:p-8"
          style={{
            overflowY: "auto",
            scrollbarWidth: "none", 
            msOverflowStyle: "none", 
          }}
        >
          {/* Hide scrollbar for WebKit browsers */}
          <style>
            {`
      div::-webkit-scrollbar {
        display: none;
      }
    `}
          </style>
          <iframe
            title="Apply Now"
            aria-label="Apply Now"
            src="https://forms.zohopublic.in/adminama1/form/ApplyNow/formperma/bR5daVr8xzcd2v5mQwkWJw-hBeZQjZwxAXG4V9psqjU"
            style={{
              width: "calc(100% + 45px)",
              height: "820px",
              border: "none",
              borderRadius: "12px",
            }}
            allowFullScreen
          ></iframe>
        </div>


      </section>
      {/* ================= Orange CTA banner (kept for completeness) ================= */}
      <section className="relative w-full">
        <img src={ASSETS.orangeBanner} alt="" className="h-[260px] w-full object-cover md:h-[300px]" />
        <div className="absolute inset-0 bg-[rgba(237,109,35,0.88)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
          <h3 className="font-serif text-[24px] md:text-[28px]">Unlock her future!</h3>
          <p className="mt-2 max-w-[680px] text-[14px] leading-7 md:text-[15px]">
            Guided by Dharma, Prepared for the World.
          </p>
          <a
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0E2349] px-5 py-2 text-[14px] font-semibold text-white"
          >
            Get In Touch
          </a>
        </div>
      </section>

      {/* ================= Map ================= */}
      <section className="relative w-full">
        <iframe
          title="Amatir Kanya Gurukul Location"
          className="h-[420px] w-full md:h-[520px]"
          src="https://www.google.com/maps?q=Amatir%20Kanya%20Gurukul%20Kurukshetra&output=embed&z=12"
          loading="lazy"
        />
      </section>
    </div>
  );
}
