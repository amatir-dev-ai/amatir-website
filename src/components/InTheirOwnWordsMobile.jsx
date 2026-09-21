import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * InTheirOwnWordsMobile (JSX)
 * Mobile-only, scroll-snap carousel with category tabs.
 * - TailwindCSS required
 * - Uses hover/active/focus to reveal an orange-tinted sliding overlay
 * - Four tabs: ALL, PARENTS, STUDENTS, ALUMNAE
 * - Dots indicator below the card
 * - Fonts: CentSchbkCyrill BT (headings) & Univers (body)
 */

const ORANGE = "#ED6D23"; // brand orange
const NAVY = "#1C3664";   // headline navy

const ALL_TABS = ["ALL", "PARENTS", "STUDENTS", "ALUMNAE"];

const DEFAULT_SLIDES = [
  {
    id: "s1",
    role: "Parent",
    person: "Shubhangi Gupta",
    category: "PARENTS",
    image:
      "/images/confident-female-indian-entrepreneur_bzvn5y.jpg",
  },
  {
    id: "s2",
    role: "Student",
    person: "Ananya Rao",
    category: "STUDENTS",
    image:
      "/images/happy-indian-student-school-uniform-with-books-bag_mnfhuy.jpg",
  },
  {
    id: "s3",
    role: "Alumna",
    person: "Kavya Menon",
    category: "ALUMNAE",
    image:
      "/images/woman-sari-isolated-background_jdl3pt.jpg",
  },
];

function InTheirOwnWordsMobile({ slides = DEFAULT_SLIDES }) {
  const [activeTab, setActiveTab] = useState("ALL");
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);

  const filtered = useMemo(() => {
    if (activeTab === "ALL") return slides;
    return slides.filter((s) => s.category === activeTab);
  }, [slides, activeTab]);

  useEffect(() => {
    // Reset scroll to start when tab changes
    if (trackRef.current) trackRef.current.scrollTo({ left: 0, behavior: "auto" });
    setCurrent(0);
  }, [activeTab]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // rAF-throttled scroll handler using snap-width rounding
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const cs = getComputedStyle(el);
        const gap = parseFloat(cs.columnGap || cs.gap || "0") || 0;
        const step = (el.clientWidth || 1) + gap; // approximate snap step (card width + gap)
        let idx = Math.round(el.scrollLeft / step);
        idx = Math.max(0, Math.min(idx, filtered.length - 1));
        setCurrent(idx);
        ticking = false;
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [filtered.length]);

  return (
    <section
      className="w-full max-w-[390px] mx-auto py-6 md:hidden select-none"
      style={{ fontFamily: 'Univers, system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}
    >
      {/* Heading */}
      <h2
        className="text-center py-10 text-[28px] leading-[34px] text-[color:var(--navy,theme(colors.slate.900))]"
        style={{ color: NAVY, fontFamily: '"CentSchbkCyrill BT", serif' }}
      >
        In Their Own<br />
        Words
      </h2>

      {/* Tabs */}
      <div className="mt-4 flex items-center justify-center gap-5 text-xs tracking-wide uppercase">
        {ALL_TABS.map((tab) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={[
                "relative pb-1 transition-colors",
                active ? "text-[color:var(--orange)] font-semibold" : "text-slate-600",
              ].join(" ")}
              style={active ? { color: ORANGE } : undefined}
            >
              {tab}
              {active && (
                <span
                  className="absolute -bottom-0.5 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full"
                  style={{ backgroundColor: ORANGE }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Carousel */}
      <div
        ref={trackRef}
        className="mt-5 flex gap-4 px-4 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {filtered.map((s) => (
          <article key={s.id} className="snap-center shrink-0 w-full">
            <Card slide={s} />
          </article>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {filtered.map((_, i) => (
          <span
            key={i}
            className={"h-1.5 w-1.5 rounded-full transition-all " + (current === i ? "scale-110" : "opacity-50")}
            style={{ backgroundColor: current === i ? ORANGE : "#D0D5DD" }}
          />
        ))}
      </div>
    </section>
  );
}

function Card({ slide }) {
  return (
    <div className="group relative w-full aspect-[3/4] overflow-hidden rounded-xl shadow-sm">
      <img
        src={slide.image}
        alt={slide.person}
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        draggable={false}
      />

      {/* Subtle bottom gradient to keep the base caption legible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

      {/* Base caption (always visible) */}
      <div className="absolute bottom-4 left-4 z-10">
        <p className="text-white text-2xl leading-none" style={{ fontFamily: '"CentSchbkCyrill BT", serif' }}>{slide.role}</p>
        <div className="mt-1 h-0.5 w-7" style={{ backgroundColor: ORANGE }} />
        <p className="mt-2 text-white/95 text-sm">{slide.person}</p>
      </div>

      {/* Hover / Press overlay (slides up) */}
      <div
        className="absolute inset-0 translate-y-full group-hover:translate-y-0 group-active:translate-y-0 focus-within:translate-y-0 transition-transform duration-300 ease-out"
        style={{ backgroundColor: `${ORANGE}D9` /* ~85% opacity */ }}
      >
        <div className="absolute inset-0 flex items-end">
          <div className="p-4">
            <p className="text-white text-xl leading-none" style={{ fontFamily: '"CentSchbkCyrill BT", serif' }}>{slide.role}</p>
            <div className="mt-1 h-0.5 w-7 bg-white/95" />
            <p className="mt-2 text-white/95 text-sm">{slide.person}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InTheirOwnWordsMobile;