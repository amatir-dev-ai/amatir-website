import React, { useEffect, useRef } from "react";

// MobileJourneyTImeline: a mobile-first replica of the JourneyTImeline layout
// with a left-aligned vertical track and step dots, matching the shared mock.
export default function MobileJourneyTImeline() {
  const containerRef = useRef(null);
  const movingDotRef = useRef(null);
  // Small reusable placeholder used on each step (image/icon slot)
  const ImgPlaceholder = () => (
    <div className="mx-auto mt-4 grid h-[7.5rem] w-[7.5rem] place-items-center rounded-md border border-slate-200 bg-slate-50">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" stroke="#9aa4b2" strokeWidth="1.4"/>
        <path d="m3 15 5-5 5 5 3-3 5 5" stroke="#c2cbd6" strokeWidth="1.4" fill="none"/>
      </svg>
    </div>
  );

  // One timeline step block with left dot and content on the right
  const Step = ({ children }) => (
    <div className="relative pl-8">
      {children}
    </div>
  );

  // Moving dot along the left track based on scroll progress
  useEffect(() => {
    const updateDot = () => {
      const container = containerRef.current;
      const dot = movingDotRef.current;
      if (!container || !dot) return;

      const rect = container.getBoundingClientRect();
      const pageScrollY = window.scrollY || window.pageYOffset;
      const containerTopPage = pageScrollY + rect.top;
      const containerHeight = rect.height || 1;
      const viewportMiddlePage = pageScrollY + window.innerHeight * 0.5;

      let progress = (viewportMiddlePage - containerTopPage) / containerHeight;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      const y = progress * containerHeight;
      dot.style.transform = `translate(-50%, ${y}px)`;
    };

    updateDot();
    window.addEventListener("scroll", updateDot, { passive: true });
    window.addEventListener("resize", updateDot);
    return () => {
      window.removeEventListener("scroll", updateDot);
      window.removeEventListener("resize", updateDot);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative mx-auto mb-8 w-[92%] max-w-[66.25rem] md:hidden">
      {/* Left vertical track */}
      <div className="pointer-events-none absolute left-[1rem] top-0 h-full w-[2px] -translate-x-1/2 bg-[#E6E9EF]" />
      {/* Moving dot */}
      <span
        ref={movingDotRef}
        className="absolute left-[1rem] z-10 h-3 w-3 rounded-full bg-[#ED6D23]"
        style={{ top: 0, transform: "translate(-50%, 0px)", boxShadow: "0 0 0 6px rgba(237,109,35,0.35), 0 0 10px rgba(237,109,35,0.55), 0 0 22px rgba(237,109,35,0.35)" }}
        aria-hidden
      />

      <div className="flex flex-col" style={{ gap: "1.25rem" }}>
        {/* Step 1 */}
        <Step>
          <div className="rounded-[0.75rem] bg-[#EEF4FB] p-5">
            <p className="mt-1 text-[0.875rem] font-semibold text-[#1C3664]">Take the First Step</p>
            <h3 id="aptitude-test" className="font-serif text-[1.375rem] leading-[1.2] text-[#1C3664]">Apply for the Aptitude Test</h3>
            <p className="mt-2 text-[0.813rem] leading-6 text-[#3E4450]">
        Begin by filling out a simple application form. This helps us understand your daughter's background, interests, and learning needs, and ensures the rest of the process is tailored to your family's specific requirements from the outset.

            </p>
            <button className="mt-4 inline-flex h-[2.125rem] items-center rounded-full bg-[#ED6D23] px-4 text-[0.813rem] text-white hover:brightness-105 cursor-pointer">
              Apply
            </button>
          </div>
          <div className="rounded-[0.75rem] bg-[#F3F5F8] p-5">
            <img src="/images/Addmission_1.jpg" alt="" className="inset-0 h-full w-full object-cover" />
          </div>
        </Step>

        {/* Step 2 */}
        <Step>
          <div className="rounded-[0.75rem] bg-[#FEF3EA] p-5">
            <h3 className="text-left font-serif text-[1.375rem] text-[#1C3664]">Academic Assessment</h3>
            <p className="mt-2 text-[0.875rem] font-semibold text-[#1C3664]">Appear for the Aptitude Exam</p>
            <p className="mt-2 text-[0.813rem] leading-6 text-[#3E4450]">
            Once we receive the application, your daughter will be invited to take a brief aptitude test. This helps us assess her current academic level and learning strengths so we can place her in the right environment from day one.

            </p>
          </div>
          <div className="rounded-[0.75rem] bg-[#F3F5F8] p-5">
            <img src="/images/Addmission_2.jpg" alt="" className="inset-0 h-full w-full object-cover" />
          </div>
        </Step>

        {/* Step 3 */}
        <Step>
          <div className="rounded-[0.75rem] bg-[#EEF4FB] p-5">
            <h3 className="font-serif text-[1.375rem] text-[#1C3664]">Counselling</h3>
            <p className="mt-2 text-[0.875rem] font-semibold text-[#1C3664]">Share Your Story</p>
            <p className="mt-2 text-[0.813rem] leading-6 text-[#3E4450]">
          Shortlisted candidates and their guardians will be invited for an interaction with our psychologist. This is a warm, open conversation designed to understand the child better and explore how Amatir can best support her aspirations. We'll also walk you through eligibility, guidelines, and every detail you need for a smooth transition into our Residential School Admission program.
            </p>
          </div>
          <div className="rounded-[0.75rem] bg-[#F3F5F8] p-5">
            <img src="/images/Addmission_3.jpg" alt="" className="inset-0 h-full w-full object-cover" />
          </div>
        </Step>

        {/* Step 4 */}
        <Step>
          <div className="rounded-[0.75rem] bg-[#FEF3EA] p-5">
            <h3 className="text-left font-serif text-[1.375rem] text-[#1C3664]">Admission Confirmation</h3>
            <p className="mt-2 text-[0.875rem] font-semibold text-[#1C3664]">Begin Your Educational Journey</p>
            <p className="mt-2 text-[0.813rem] leading-6 text-[#3E4450]">
            Based on the outcome of the test and interview, selected students will receive an official offer of admission.
            </p>
            <div className="mt-4 flex">
              <a href="/Amatir_Admission_process.pdf" target="_blank" rel="noopener noreferrer">
              <button className="inline-flex h-[2.125rem] items-center rounded-full bg-[#ED6D23] px-4 text-[0.813rem] text-white hover:brightness-105 cursor-pointer">
                Admission Documents
              </button>
              </a>
            </div>
          </div>
          <div className="rounded-[0.75rem] bg-[#F3F5F8] p-5">
            <img src="/images/Addmission_4.jpg" alt="" className="inset-0 h-full w-full object-cover" />
          </div>
        </Step>
      </div>
    </section>
  );
}


