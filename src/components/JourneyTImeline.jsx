import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

function clamp(n, min, max) { return Math.max(min, Math.min(n, max)); }

export default function JourneyTimeline() {
  // ---- If you already export default Admissions, change this export or inline this component there ----

  // Refs for 4 rows
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const rowRefs = useRef([0, 1, 2, 3].map(() => React.createRef()));

  const [activeIndex, setActiveIndex] = useState(0);
  const [dotY, setDotY] = useState(48);

  // Handle scroll to hash on component mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#aptitude-test') {
      setTimeout(() => {
        const element = document.getElementById('aptitude-test');
        if (element) {
          const headerHeight = 88; // Account for header height
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100); // Small delay to ensure component is rendered
    }
  }, []);

  const SPOT_R = 120; // spotlight radius
  const DOT_R = 8;

  // Pick the row whose center is closest to viewport center
  useEffect(() => {
    let raf = 0;

    const measure = () => {
      const viewportCenterAbsY = window.scrollY + window.innerHeight / 2;

      let nearestIdx = 0;
      let nearestDist = Infinity;

      rowRefs.current.forEach((r, i) => {
        const rect = r.current?.getBoundingClientRect();
        if (!rect) return;
        const centerAbsY = rect.top + window.scrollY + rect.height / 2;
        const dist = Math.abs(centerAbsY - viewportCenterAbsY);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestIdx = i;
        }
      });

      if (nearestIdx !== activeIndex) {
        setActiveIndex(nearestIdx);
      }

      // Update dot position inside overlay column
      const overlay = overlayRef.current?.getBoundingClientRect();
      const targetRect = rowRefs.current[nearestIdx]?.current?.getBoundingClientRect();
      if (overlay && targetRect) {
        const rowCenterAbsY = targetRect.top + window.scrollY + targetRect.height / 2;
        const overlayTopAbsY = overlay.top + window.scrollY;
        const yLocal = rowCenterAbsY - overlayTopAbsY;
        const clamped = clamp(yLocal, DOT_R + 16, overlay.height - (DOT_R + 16));
        setDotY(clamped);
      }
    };

    const onScrollOrResize = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    // Initial measure and listeners
    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <section ref={containerRef} className="relative mx-auto mb-16 w-[92%] max-w-[66.25rem] pb-2">
      {/* Center vertical line (visible path) */}
      <div className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 border-l-2 border-[#ED6D23] md:block" />

      {/* SVG spotlight/dot overlay in a narrow center column */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[260px] -translate-x-1/2 md:block z-1000"
      >
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            {/* Dot glow */}
            <filter id="jt-dot-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Darken column, punch a circular hole at the dot position */}
            <mask id="jt-spot-mask">
              <rect width="100%" height="100%" fill="white" />
              <g style={{ transform: `translateY(${dotY}px)`, transition: "transform 500ms cubic-bezier(.22,.61,.36,1)" }}>
                <circle cx="5%" cy="0" r={SPOT_R} fill="black" />
              </g>
            </mask>
          </defs>

          {/* Semi-transparent dark overlay — the “path background” */}
          <rect width="100%" height="100%" fill="black" opacity="0" mask="url(#jt-spot-mask)" />

          {/* Moving dot */}
          <g
            style={{ transform: `translateY(${dotY}px)`, transition: "transform 500ms cubic-bezier(.22,.61,.36,1)" }}
            filter="url(#jt-dot-glow)"
          >
            <circle cx="50%" cy="0" r={DOT_R} fill="#ED6D23" />
            <circle cx="50%" cy="0" r={DOT_R + 6} fill="none" stroke="#ED6D23" strokeOpacity="0.35" />
          </g>
        </svg>
      </div>

      {/* CONTENT (unchanged text) — alternating zoom R, L, R, L */}
      <div className="flex flex-col gap-8">
        {/* Row 1 (Right text) */}
        <div ref={rowRefs.current[0]} className="grid items-stretch gap-6 md:grid-cols-2">
          {/* Left Card */}
          <div className="rounded-[0.75rem] bg-[#F3F5F8] p-6 md:p-7">
            <div className="mx-auto mt-3 grid place-items-center rounded-md border border-slate-200 bg-slate-50">
              {/* Icon / Image */}
             <img src="/images/Addmission_1.jpg" alt="" className="inset-0 h-full w-full object-cover" />
            </div>
          </div>

          {/* Right Card */}
          <div
            className={[
              "relative rounded-[0.75rem] bg-[#EEF4FB] p-6 md:p-7 transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)]",
              activeIndex === 0
                ? "scale-[1.03] shadow-[0_15px_40px_rgba(0,0,0,0.08)]"
                : "scale-[0.995]"
            ].join(" ")}
          >
            <p className="mt-2 text-[0.875rem] font-semibold text-[#1C3664]">
              Take the First Step
            </p>
            <h3 id="aptitude-test" className="font-serif text-[1.375rem] md:text-[1.5rem]">
              Apply for the Aptitude Test
            </h3>
            <p className="mt-2 text-[0.813rem] leading-6 text-[#3E4450]">
              Begin by filling out a simple application form. This helps us
              understand your daughter's background, interests, and learning
              needs. If you are considering CBSE boarding school admission,
              this form ensures that we tailor the process to suit your
              requirements.
            </p>
            <Link
              to="/campus-visit#campus-form" // scrolls to the element with id="campus-form"
              className="mt-4 inline-flex h-[2.125rem] items-center rounded-full bg-[#ED6D23] px-4 text-[0.813rem] text-white hover:brightness-105 cursor-pointer"
              onClick={() => {
                // Optional: smooth scroll after navigation
                setTimeout(() => {
                  const el = document.getElementById("campus-form");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            >
              Apply
            </Link>
          </div>
        </div>
        {/* Row 2 (Left text) */}
        <div ref={rowRefs.current[1]} className="grid items-stretch gap-6 md:grid-cols-2">
          <div
            className={[
              "relative order-2 rounded-[0.75rem] bg-[#FEF3EA] p-6 md:order-1 md:p-7 transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)]",
              activeIndex === 1 ? "scale-[1.03] shadow-[0_15px_40px_rgba(0,0,0,0.08)]" : "scale-[0.995]"
            ].join(" ")}
          >
            <h3 className="text-center font-serif text-[1.375rem] md:text-[1.5rem]">Academic Assessment</h3>
            <p className="mt-2 text-center text-[0.875rem] font-semibold text-[#1C3664]">Appear for the Aptitude Exam</p>
            <p className="mx-auto mt-2 max-w-[32.5rem] text-center text-[0.813rem] leading-6 text-[#3E4450]">
              Once we receive the application, your daughter will be invited
              to take a brief aptitude test. This helps us assess her current
              academic level and learning strengths.
            </p>
          </div>

          <div className="order-1 rounded-[12px] bg-[#F3F5F8] p-6 md:order-2 md:p-7">
            <div className="mx-auto mt-3 grid place-items-center rounded-md border border-slate-200 bg-slate-50">
              <img src="/images/Addmission_2.jpg" alt="" className="inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </div>

        {/* Row 3 (Right text) */}
        <div ref={rowRefs.current[2]} className="grid items-stretch gap-6 md:grid-cols-2">
          <div className="rounded-[12px] bg-[#F3F5F8] p-6 md:p-7">
            <div className="mx-auto mt-3 grid place-items-center rounded-md border border-slate-200 bg-slate-50">
              <img src="/images/Addmission_3.jpg" alt="" className="inset-0 h-full w-full object-cover" />
            </div>
          </div>

          <div
            className={[
              "relative rounded-[12px] bg-[#EEF4FB] p-6 md:p-7 transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)]",
              activeIndex === 2 ? "scale-[1.03] shadow-[0_15px_40px_rgba(0,0,0,0.08)]" : "scale-[0.995]"
            ].join(" ")}
          >
            <h3 className="font-serif text-[22px] md:text-[24px]">Counselling</h3>
            <p className="mt-2 text-[14px] font-semibold text-[#1C3664]">Share Your Story</p>
            <p className="mt-2 text-[13px] leading-6 text-[#3E4450]">
              Shortlisted candidates and their guardians will be invited for an interaction with our psychologist. This is a warm, open conversation designed to understand the child better and explore how Amatir can best support her aspirations.We’ll also guide you through the step-by-step admission process and provide information on eligibility & guidelines to ensure a smooth transition.
            </p>
          </div>
        </div>

        {/* Row 4 (Left text) */}
        <div ref={rowRefs.current[3]} className="grid items-stretch gap-6 md:grid-cols-2">
          <div
            className={[
              "relative order-2 rounded-[0.75rem] bg-[#FEF3EA] p-6 md:order-1 md:p-7 transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)]",
              activeIndex === 3 ? "scale-[1.03] shadow-[0_15px_40px_rgba(0,0,0,0.08)]" : "scale-[0.995]"
            ].join(" ")}
          >
            <h3 className="text-center font-serif text-[1.375rem] md:text-[1.5rem]">Admission Confirmation</h3>
            <p className="mt-2 text-center text-[0.875rem] font-semibold text-[#1C3664]">Begin Your Educational Journey</p>
            <p className="mx-auto mt-2 max-w-[32.5rem] text-center text-[0.813rem] leading-6 text-[#3E4450]">
              Based on the outcome of the test and interview, selected
              students will receive an official offer for admission.
            </p>
            <div className="mt-4 flex justify-center">
              <a href="/Amatir_Admission_process.pdf" target="_blank" rel="noopener noreferrer">
                <button className="inline-flex h-[2.125rem] items-center rounded-full bg-[#ED6D23] px-4 text-[0.813rem] text-white hover:brightness-105 cursor-pointer">
                  Admission Documents
                </button>
              </a>
            </div>
          </div>

          <div className="order-1 rounded-[12px] bg-[#F3F5F8] p-6 md:order-2 md:p-7">
            <div className="mx-auto mt-3 grid place-items-center rounded-md border border-slate-200 bg-slate-50">
              <img src="/images/Addmission_4.jpg" alt="" className="inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
