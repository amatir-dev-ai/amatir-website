// CareersPage.jsx
import React, { useState } from "react";
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
    className={`rounded border px-3 py-1 text-[12px] leading-6 transition ${
      selected
        ? "bg-[#1C3664] text-white border-[#1C3664]"
        : "bg-white text-[#1C3664] border-slate-300 hover:border-[#1C3664]"
    }`}
  >
    {label}
  </button>
);

export default function Careers() {
  /* Form chip UI state */
  const [exp, setExp] = useState("1-2");
  const [marital, setMarital] = useState("Married");
  const [stayCampus, setStayCampus] = useState("Yes");
  const [fluency, setFluency] = useState("Good");
  const [positionType, setPositionType] = useState("Internship");

  return (
    <div className="min-h-screen w-full bg-white text-slate-800">
      {/* ================= HERO (keep this; header/footer excluded) ================= */}
      <section className="relative h-[calc(100vh)] w-full">
        <img src={ASSETS.hero} alt="Careers hero" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[rgba(14,35,73,0.42)]" />
        <div className="absolute inset-x-0 bottom-[12%] flex flex-col items-center">
          <img src={ASSETS.accent} alt="" className="mb-3 h-8 w-8 md:h-10 md:w-10" />
          <h1 className="px-4 text-center font-serif text-[36px] leading-none text-white md:text-[56px]" style={{ marginBottom: "35%" }}>
            Careers
          </h1>
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
      <section id="apply" className="mx-auto w-[92%] max-w-[740px] py-14 md:py-18">
        <h2 className="text-center font-serif text-[26px] md:text-[30px] text-[#1C3664]">Apply Now</h2>
        <p className="mx-auto mt-2 max-w-[560px] text-center text-[14px] leading-7 text-[#3A3A3A]">
          Ready to take the next step in your teaching career? <br className="hidden md:block" />
          Click below to view available roles and submit your application.
        </p>

        <form className="mt-8 grid grid-cols-1 gap-4">
          <label className="text-[12px] text-[#1C3664]">
            Full name
            <input
              type="text"
              placeholder="Enter your Full name"
              className="mt-1 w-full rounded border border-slate-300 bg-white px-3 py-2 text-[13px] outline-none focus:border-[#1C3664]"
            />
          </label>

          <label className="text-[12px] text-[#1C3664]">
            Email address
            <input
              type="email"
              placeholder="hello@relume.io"
              className="mt-1 w-full rounded border border-slate-300 bg-white px-3 py-2 text-[13px] outline-none focus:border-[#1C3664]"
            />
          </label>

          <label className="text-[12px] text-[#1C3664]">
            Phone number
            <input
              type="tel"
              placeholder="Enter your Phone Number"
              className="mt-1 w-full rounded border border-slate-300 bg-white px-3 py-2 text-[13px] outline-none focus:border-[#1C3664]"
            />
          </label>

          <div>
            <div className="text-[12px] text-[#1C3664]">What is your Total Teaching and/or Administrative Experience?</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {["0-1", "1-2", "2-4", "5-8", "8-10", "10+"].map((x) => (
                <Chip key={x} label={x} selected={x === exp} onClick={() => setExp(x)} />
              ))}
            </div>
          </div>

          <label className="text-[12px] text-[#1C3664]">
            Have you completed B.Ed, M.Ed, NIS Diploma, or any equivalent qualification?
            <input
              type="text"
              placeholder="Enter your qualifications"
              className="mt-1 w-full rounded border border-slate-300 bg-white px-3 py-2 text-[13px] outline-none focus:border-[#1C3664]"
            />
          </label>

          <div>
            <div className="text-[12px] text-[#1C3664]">Marital Status</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Single", "Married", "Other"].map((x) => (
                <Chip key={x} label={x} selected={x === marital} onClick={() => setMarital(x)} />
              ))}
            </div>
          </div>

          <div>
            <div className="text-[12px] text-[#1C3664]">
              Would you be willing to stay as a resident staff on the school campus?
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Yes", "No"].map((x) => (
                <Chip key={x} label={x} selected={x === stayCampus} onClick={() => setStayCampus(x)} />
              ))}
            </div>
          </div>

          <div>
            <div className="text-[12px] text-[#1C3664]">What is your level of proficiency in English?</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Excellent", "Good", "Average", "Below Average"].map((x) => (
                <Chip key={x} label={x} selected={x === fluency} onClick={() => setFluency(x)} />
              ))}
            </div>
          </div>

          <div>
            <div className="text-[12px] text-[#1C3664]">Which position are you applying for?</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Volunteering", "Internship", "Staff"].map((x) => (
                <Chip key={x} label={x} selected={x === positionType} onClick={() => setPositionType(x)} />
              ))}
            </div>
          </div>

          <label className="text-[12px] text-[#1C3664]">
            Current Salary (if employed)
            <input
              type="text"
              placeholder="Enter current salary"
              className="mt-1 w-full rounded border border-slate-300 bg-white px-3 py-2 text-[13px] outline-none focus:border-[#1C3664]"
            />
          </label>

          <label className="text-[12px] text-[#1C3664]">
            Expected Salary
            <input
              type="text"
              placeholder="Enter expected salary"
              className="mt-1 w-full rounded border border-slate-300 bg-white px-3 py-2 text-[13px] outline-none focus:border-[#1C3664]"
            />
          </label>

          <label className="text-[12px] text-[#1C3664]">
            Notice Period
            <input
              type="text"
              placeholder="Enter notice period"
              className="mt-1 w-full rounded border border-slate-300 bg-white px-3 py-2 text-[13px] outline-none focus:border-[#1C3664]"
            />
          </label>

          <label className="text-[12px] text-[#1C3664]">
            Additional Information (if any)
            <textarea
              rows="6"
              placeholder="Enter any additional information"
              className="mt-1 w-full resize-none rounded border border-slate-300 bg-white px-3 py-2 text-[13px] outline-none focus:border-[#1C3664]"
            />
          </label>

          <button
            type="submit"
            className="mt-2 inline-flex w-max items-center justify-center rounded-full bg-[#ED6D23] px-6 py-2 text-[14px] font-semibold text-white"
          >
            Submit
          </button>
        </form>
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
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0E2349] px-5 py-2 text-[14px] font-semibold text-white"
          >
            Get in Touch
          </Link>
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
