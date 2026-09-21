// LifeAtAmatirMobile.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";
import StackingCards from "../../components/StackingCards";
import useSEO from "../../hooks/useSEO";


/** ------- Brand palette (matches screenshots) ------- */
const BRAND = {
  navy: "#1C3664",
  blue: "#0E2349",
  orange: "#ED6D23",
  lightCream: "#F7EFE6",
  lightBlue: "#E9EFF6",
};

/** ------- Cloudinary Assets (exact links) ------- */
const ASSETS = {
  hero: "/images/Life_at_Amatir_Header_khfdft.jpg",
  orangeIcon: "/images/Orange_Icon_i299iz.svg",

  // Section images (cards)
  yoga: "/images/Rectangle_68_xsl4fb.jpg",
  vedic: "/images/Rectangle_70_zzamla.jpg",
  academics: "/images/Rectangle_71_qm2vlk.jpg",
  arts: "/images/Rectangle_88_bkq74c.jpg",
  care: "/images/Rectangle_73_oe6xrk.jpg",
  reflection: "/images/Rectangle_80_lwbyul.jpg",

  // Gallery set (1 image per dot)
  g1: "/images/Rectangle_79_fyl7o9.jpg",
  g2: "/images/Rectangle_86_bo10va.jpg",
  g3: "/images/Rectangle_85_srkhhg.jpg",
  g4: "/images/Rectangle_84_uhkl4w.jpg",
  g5: "/images/Rectangle_68_xsl4fb.jpg",
  g6: "/images/Rectangle_71_qm2vlk.jpg",

  // CTA background
  ctaBg: "/images/Rectangle_82_pdadc9.jpg",
};



/** ------- Cards and Gallery Combined Component ------- */
function CardsWithGallery() {
  // We need to access the animation states from the StackingCards component
  // For now, we'll use a simple state to track when cards are stacked
  const [allCardsStacked, setAllCardsStacked] = useState(false);

  return (
    <>
      <StackingCards onAllCardsStacked={setAllCardsStacked} />

      {/* Gallery - only show after all cards are stacked */}
      {allCardsStacked && <AutoGallery />}
    </>
  );
}

/** ------- Auto-advancing gallery — SQUARE frames, crop only from bottom ------- */
function AutoGallery() {
  const slides = useMemo(
    () => [ASSETS.g1, ASSETS.g2, ASSETS.g3, ASSETS.g4, ASSETS.g5, ASSETS.g6],
    []
  );
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % slides.length), 2000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="w-full" style={{ padding: "2vh 5vw 1vh 5vw" }}>
      <h3
        className="text-center"
        style={{
          color: BRAND.navy,
          fontFamily: "ui-serif, Georgia, serif",
          fontWeight: 400,
          fontSize: "8vw",
          lineHeight: 1.1,
          marginBottom: "1.2vh",
        }}
      >
        Gallery
      </h3>
      <p
        className="text-center"
        style={{
          color: "#111827",
          fontSize: "4vw",
          lineHeight: 1.5,
          marginBottom: "2.4vh",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
        }}
      >
        Festival Celebrations at Amatir
      </p>

      {/* Square viewport */}
      <div className="relative w-full overflow-hidden" style={{ borderRadius: "0", aspectRatio: "1 / 1" }}>
        <div
          className="flex h-full transition-transform"
          style={{
            transform: `translateX(-${i * 100}%)`,
            transition: "transform .6s ease",
          }}
        >
          {slides.map((src, idx) => (
            <div key={idx} className="shrink-0 h-full" style={{ width: "100%" }}>
              <img
                src={src}
                alt=""
                className="block w-full h-full object-cover object-top"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center" style={{ marginTop: "1.8vh", gap: ".6rem" }}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="rounded-full"
            style={{
              width: ".5rem",
              height: ".5rem",
              background: idx === i ? BRAND.orange : "#D1D5DB",
            }}
          />
        ))}
      </div>
    </section>
  );
}

/** ------- CTA EXACTLY LIKE THE LATEST REFERENCE ------- */
function UnlockCTA() {
  return (
    <section className="w-full" style={{ padding: "1vh 5vw 5vh 5vw" }}>
      <div className="relative overflow-hidden" style={{ borderRadius: "0", height: "36vh", minHeight: "20rem" }}>
        <img src={ASSETS.ctaBg} alt="" className="absolute inset-0 w-full h-full object-cover" />

        {/* Strong solid orange veil (not a soft gradient) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: BRAND.orange,
            opacity: 0.92,
          }}
        />

        <div className="relative h-full flex flex-col items-center justify-center text-center" style={{ padding: "0 6vw" }}>
          <h3
            style={{
              color: "#FFFFFF",
              fontFamily: "ui-serif, Georgia, serif",
              fontWeight: 400,
              fontSize: "8vw",
              lineHeight: 1.15,
              marginBottom: "1.2vh",
              letterSpacing: ".01em",
            }}
          >
            Unlock her future!
          </h3>

          <p
            style={{
              color: "#FFFFFF",
              fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
              fontSize: "4.2vw",
              lineHeight: 1.5,
              marginBottom: "2.4vh",
            }}
          >
            Guided by Dharma, Prepared for the World.
          </p>

          <a
            href="/contact"
            className="inline-flex items-center justify-center"
            style={{
              background: BRAND.navy,
              color: "#FFFFFF",
              borderRadius: "9999px",
              height: "3.2rem",
              padding: "0 2.2rem",
              fontSize: "4.2vw",
              fontWeight: 600,
            }}
          >
            Download
          </a>
        </div>
      </div>
    </section>
  );
}

/** ------- Simple map block (content only) ------- */
function MapBlock() {
  return (
    <section className="w-full" style={{ padding: "0 5vw 6vh" }}>
      <div className="overflow-hidden" style={{ borderRadius: "0", height: "42vh" }}>
        <iframe
          title="School Location"
          className="w-full h-full"
          src="https://www.openstreetmap.org/export/embed.html?bbox=77.5%2C12.8%2C77.7%2C13.1&layer=mapnik"
          loading="lazy"
        />
      </div>
    </section>
  );
}

/** ------- PAGE (Mobile-first, pixel-focused) ------- */
export default function LifeAtAmatirMobile() {
  useSEO({
    title: 'Holistic Student Development | Amatir Kanya Gurukul',
    description: 'Experience holistic student development at Amatir Kanya Gurukul through Gurukul values, yoga, leadership, cultural activities, life skills and character building.',
    keywords: ''
  });
  return (
    <main className="w-full overflow-x-hidden">
      {/* HERO */}
      <section className="relative flex items-end h-screen">
        <img src={ASSETS.hero} alt="Students" className="absolute inset-0 w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0.70) 100%)",
          }}
        />
        <div className="relative w-full flex flex-col items-center" style={{ paddingBottom: "6vh" }}>
          <img
            src={ASSETS.orangeIcon}
            alt=""
            style={{ width: "12vw", maxWidth: "3.6rem", marginBottom: "1.2vh", filter: "drop-shadow(0 0 .2rem rgba(0,0,0,.4))" }}
          />
          <h1
            className="text-center"
            style={{
              color: "#FFFFFF",
              fontFamily: "ui-serif, Georgia, serif",
              fontWeight: 400,
              fontSize: "9vw",
              lineHeight: 1.05,
              letterSpacing: ".01em",
            }}
          >
            Life at Amatir
          </h1>
        </div>
      </section>

      {/* CARDS AND GALLERY SECTION */}
      <CardsWithGallery />

      {/* CTA (updated to match your screenshot exactly) */}
      <UnlockCTA />

      {/* Map content block (no header/footer) */}
      <MapBlock />
    </main>
  );
}
