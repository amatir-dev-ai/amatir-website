import React from "react";
import { useMediaQuery } from "react-responsive";
import Gallery from "../components/Gallery";
import FeatureGrid from "../components/FeatureGrid";
import useSEO from "../hooks/useSEO";

export default function LifeAtAmatir() {
  useSEO({
    title: 'Holistic Student Development | Amatir Kanya Gurukul',
    description: 'Experience holistic student development at Amatir Kanya Gurukul through Gurukul values, yoga, leadership, cultural activities, life skills and character building.',
    keywords: ''
  });
  // Responsive media queries for different devices
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isVerySmallScreen = useMediaQuery({ maxWidth: 1024 });
  const isLowHeight = useMediaQuery({ maxHeight: 600 });

  // Calculate proper hero section height accounting for header
  const getHeroHeight = () => {
    if (isMobile) return 'calc(100vh - 4rem)'; // Account for mobile header (64px)
    if (isVerySmallScreen) return 'calc(100vh - 5rem)'; // Account for small laptop header (80px)
    if (isLowHeight) return 'calc(100vh - 4.5rem)'; // Account for low height screens
    return 'calc(100vh - 5.5rem)'; // Account for desktop header (88px)
  };

  const IMAGES = {
    Header: {
      Logo:
        "/images/Logo_Blue_n6qrbx.svg",
    },
    Hero: {
      Background:
        "/images/Life_at_Amatir_Header_khfdft.jpg",
      Icon:
        "/images/Orange_Icon_i299iz.svg",
    },
    Gallery: [
      "/images/BA-Music02_nvhv4h.jpg",
      "/images/Life_at_aMATIR_gALLERY_yakern.jpg",
      "/images/1_1_mfxakz.jpg",
      "/images/Acad-Lab18_vg2alk.jpg",
      "/images/Hostel-Life04_wwi9bv.jpg",
      "/images/Gallery2_az5yel.jpg",
      "/images/Candid-Primary04_wkfkb2.jpg",
      "/images/BA-Dance09_fsvt7l.jpg",
      "/images/BA-Dance04_vgrzjd.jpg",
    ],
    Footer: {
      Logo:
        "/images/Logo_Blue_n6qrbx.svg",
    },
  };


  return (
    <main className="text-[#1C3664]">
      {/* Header (minimal, to anchor the page visually like your HTML) */}


      {/* HERO: full-bleed image with bottom navy band and centered title */}
      {/* HERO — FULL SCREEN LIKE OTHER PAGES */}
      <section
        className="relative flex items-end w-screen"
        style={{
          height: "100vh",
          marginTop: "60px",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
        }}
      >
        <img
          src={IMAGES.Hero.Background}
          alt="Students in assembly"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto w-[90%] max-w-[1290px] pb-[5%] flex flex-col items-center">
          <img
            src={IMAGES.Hero.Icon}
            alt=""
            className="mb-3 h-[48px] w-[48px] md:h-[60px] md:w-[60px]"
          />
          <h1
            className="cent-schbk-cyrill text-white text-[40px] md:text-[64px] leading-none font-semibold"
            style={{ marginBottom: "10%" }}
          >
            Life at Amatir
          </h1>
        </div>
      </section>

      {/* FEATURE GRID: six rows alternating image/text preserving screenshot rhythm */}
      <FeatureGrid />

      {/* GALLERY */}
      <Gallery
        images={IMAGES.Gallery}
        title="Gallery"
        subtitle="Festival Celebrations at Amatir"
      />

      {/* CTA: orange overlay on an image (reuse a gallery image to stay within provided assets) */}
      <section
        className="relative"
        style={{
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        <div className="relative h-[140px] md:h-[200px]">
          <img
            src={IMAGES.Gallery[2]} // using provided list
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#ED6D23]/90" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
            <h3 className="text-white text-xl md:text-2xl font-serif">
              Unlock her future!
            </h3>
            <p className="text-white/90 text-xs md:text-sm mt-1">
              Guided by Dharma, Prepared for the World.
            </p>
            <a
              href="/contact"
              className="mt-4 inline-flex items-center rounded-full bg-[#1C3664] px-4 py-2 text-white text-sm"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* MAP: full-bleed, no padding */}
      <section
        className="relative"
        style={{
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        <iframe
          title="Amatir Kanya Gurukul Map"
          src="https://www.google.com/maps?q=Amatir%20Kanya%20Gurukul&output=embed"
          loading="lazy"
          className="block h-[320px] md:h-[420px]"
          style={{
            border: 0,
            width: "100%",
            display: "block"
          }}
          allowFullScreen
        />
      </section>


    </main>
  );
}
