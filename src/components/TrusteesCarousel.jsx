import React, { useMemo, useRef, useState, useCallback, useEffect } from "react";

export default function TrusteesCarousel() {
    const trustees = React.useMemo(
      () => [
        {
          name: "Late Balwant Singh Nehra",
          role: "Founder",
          photo:
            "/images/Trustee-Balwant_pxclkm.jpg",
          details:
            "Balwant Singh Nehra, fondly known as ‘Dada Ji,’ founded Anant Charitable Trust and Amatir Kanya Gurukul at 65 to support girls in his village.An IIT (BHU) Banaras graduate and retired professor from NIT Kurukshetra, he was also a progressive farmer who has positively impacted countless families.",
        },
        {
          name: "Ashish Nehra",
          role: "Principal Trustee",
          photo:
            "/images/Ashish_Nehra.jpg",
          details:
            "Ashish Nehra is a Social Edupreneur and Co-Founder of Amatir Kanya Gurukul, dedicated to making high-quality, holistic education accessible to girls from underserved communities. A Sloan Fellow from London Business School and an Army veteran, he brings 22+ years of diverse experience across technology, farming, and leadership. His mission is to transform young girls into confident, resilient leaders who will shape the future of society and nation-building.",
        },
        {
          name: "Gursewak Singh",
          role: "President",
          photo:
            "/images/Gursewak_Singh.jpeg",
          details:
            "A lawyer, farmer, and passionate sportsperson, he believes deeply in the lessons taught through sports—perseverance, patience, and confidence. A law graduate from Kurukshetra University, he brings quiet strength and vision to the Trust.",
        },
        {
          name: "Dr. R L Kaushik",
          role: "Trustee",
          photo:
            "/images/Trustee-RLKaushik_fiza5i.jpg",
          details:
            "A retired professor of Chemistry and a graduate in Chemical Engineering from Punjab University, Dr. Kaushik brings with him rich academic and administrative experience. He continues to be a guiding force behind the trust and its educational mission.",
        },
        {
          name: "Adittee Naargolkar",
          role: "Trustee",
          photo:
            "/images/Adittee_gyu2qb.jpg",
          details:
            "With academic credentials in Early Childhood Care, Psychology, and Special Needs Education from the UK, Adittee focuses on curriculum design, teacher training, and the creation of engaging learning tools. Her work with leading toy brands and preschools across India reflects her commitment to making learning joyful and discovery-led.",
        },
      
        {
          name: "Dr. Priti Ojha",
          role: "Vice President",
          photo:
            "/images/Trustee-Priti_lm0jch.jpg",
          details:
            "Dr. Priti Ojha is a seasoned educationist and global trainer. As a British Council Ambassador and Core Skills Master Trainer, she has mentored over 600 schools and supported 100+ teachers in bringing global perspectives into classroom learning. She holds a Doctorate in Computer Science and remains, above all, a passionate teacher.",
        },
      ],
      []
    );
  
    const containerRef = React.useRef(null);
    const trackRef = React.useRef(null);
  
    const perView = () =>
      window.matchMedia("(max-width: 900px)").matches ? 1 : 3;
  
    const [pv, setPv] = React.useState(perView());
    const [gapPx, setGapPx] = React.useState(24); // gap-6
    const [cardW, setCardW] = React.useState(0);
    const [index, setIndex] = React.useState(0);
  
    // arrow positions (between columns on desktop)
    const [leftX, setLeftX] = React.useState(0);
    const [rightX, setRightX] = React.useState(0);
  
    const compute = React.useCallback(() => {
      const pvNow = perView();
      setPv(pvNow);
  
      const cont = containerRef.current;
      const track = trackRef.current;
      if (!cont || !track) return;
  
      const style = window.getComputedStyle(track);
      const g = parseFloat(style.columnGap || style.gap || "24") || 24;
      setGapPx(g);
  
      const cw = cont.clientWidth;
      const card = (cw - g * (pvNow - 1)) / pvNow;
      setCardW(card);
  
      const maxIndex = Math.max(0, trustees.length - pvNow);
      const clamped = Math.min(index, maxIndex);
      setIndex(clamped);
      track.style.transform = `translateX(-${clamped * (card + g)}px)`;
  
      if (pvNow === 3) {
        setLeftX(card + g / 2);
        setRightX(2 * card + (3 * g) / 2);
      } else {
        setLeftX(0);
        setRightX(cw);
      }
    }, [index, trustees.length]);
  
    React.useEffect(() => {
      compute();
      window.addEventListener("resize", compute, { passive: true });
      return () => window.removeEventListener("resize", compute);
    }, [compute]);
  
    const goTo = (i) => {
      const maxIndex = Math.max(0, trustees.length - pv);
      const clamped = Math.min(Math.max(i, 0), maxIndex);
      setIndex(clamped);
      const track = trackRef.current;
      if (track) track.style.transform = `translateX(-${clamped * (cardW + gapPx)}px)`;
    };
    const prev = () => goTo(index - 1);
    const next = () => goTo(index + 1);
  
    return (
      <div ref={containerRef} className="relative mx-auto overflow-hidden" style={{ width: "100%" }}>
        {/* Track */}
        <div
          ref={trackRef}
          className="flex items-stretch gap-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
        >
          {trustees.map((t, i) => (
            <article
              key={t.name + i}
              className="group relative overflow-hidden rounded-[20px] bg-transparent shadow-[0_8px_24px_rgba(0,0,0,.08)]"
              style={{ flex: `0 0 ${cardW}px` }}
            >
              {/* Image */}
              <img
                src={t.photo}
                alt={t.name}
                className="block w-full object-cover"
                style={{ aspectRatio: "1 / 1.2" }}
              />
  
              {/* Static name/role below the image (like your screenshot) */}
              <div className="p-5 text-left">
                <h5 className="relative mb-3 text-[22px] md:text-[24px] text-[#1C3664]">
                  {t.name}
                  <span className="absolute left-0 -bottom-2 block h-[2px] w-[30px] bg-[#ED6D23]" />
                </h5>
                <p className="text-[15px] text-[#3A2323]">{t.role}</p>
              </div>
  
              {/* HOVER OVERLAY — only on hover now (no default active) */}
              <div
                className="pointer-events-none absolute inset-0 flex h-full w-full items-start justify-start
                           p-8 md:p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out
                           bg-[#1C3664]/95 backdrop-blur-[2px]"
              >
                <div className="max-w-[90%] text-white">
                  <h5 className="relative mb-3 text-[22px] md:text-[26px] leading-tight">
                    {t.name}
                    <span className="absolute left-0 -bottom-2 block h-[2px] w-[30px] bg-[#ED6D23]" />
                  </h5>
                  <p className="text-white/85 text-[15px] mb-3">{t.role}</p>
                  <div className="pr-2">
                    <p className="text-[14px] leading-6 md:text-[15px] md:leading-7">{t.details}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
  
        {/* Orange chevrons positioned between cards (semi-circle feel due to overflow clip) */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous"
          className="absolute top-1/2 -translate-y-1/2 grid place-items-center h-12 w-12 md:h-14 md:w-14 rounded-full bg-[#F7941D] text-white shadow-lg cursor-pointer"
          style={{ left: pv === 3 ? `${leftX}px` : "-4px", transform: "translate(-50%, -50%)" }}
        >
          <span className="text-[20px] md:text-[22px] leading-none">‹</span>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next"
          className="absolute top-1/2 -translate-y-1/2 grid place-items-center h-12 w-12 md:h-14 md:w-14 rounded-full bg-[#F7941D] text-white shadow-lg cursor-pointer"
          style={{ left: pv === 3 ? `${rightX}px` : "calc(100% + 4px)", transform: "translate(-50%, -50%)" }}
        >
          <span className="text-[20px] md:text-[22px] leading-none">›</span>
        </button>
      </div>
    );
  }
  