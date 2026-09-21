// AffiliationSection.jsx
import React from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const C = {
  affLarge:
    "/images/For_download_1_tp4xmq.png",
  affSmall:
    "/images/image_rnj9zb.jpg",
};

export default function AffiliationSection() {
  // Breakpoints
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isSmallLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1365 });

  // Typography
  const titleSize = isMobile ? "32px" : "40px";
  const descSize = isMobile ? "16px" : "18px";

  // Sizes
  const largeW = isMobile ? "340px" : isSmallLaptop ? "460px" : "540px";
  const largeH = `calc(${largeW} * 1.22)`; // tall portrait U
  const smallW = isMobile ? "160px" : isTablet ? "210px" : isSmallLaptop ? "220px" : "250px";
  const smallH = `calc(${smallW} * 1.22)`;

  // Radii
  const smallTopR = isMobile ? "54px" : isTablet ? "80px" : isSmallLaptop ? "92px" : "106px";
  const huge = "9999px"; // creates the U bottom on the large image

  // Offsets (tuned to match screenshot)
  const gap = isMobile ? "40px" : isSmallLaptop ? "50px" : "60px";
  const largeRightPull = isMobile ? "0px" : "0px"; // keep right-aligned
  const smallTop = "5%";
  const smallLeftOverLarge =
    isMobile ? "calc(100% - 0px - " + largeW + " + 18px)"
             : isSmallLaptop ? "calc(100% - " + largeW + " - 11%)"
             : "calc(100% - " + largeW + " - 11%)";

  return (
    <section
      className="relative overflow-hidden bg-white"
      style={{
        padding: isMobile ? "60px 0 80px" : isSmallLaptop ? "80px 0 100px" : "80px 0 110px",
      }}
    >
      {isMobile ? (
        // Mobile Layout - Image on top, content below
        <div className="mx-auto max-w-[1290px] px-[5%]">
          {/* Image Section */}
          <div className="mb-8 flex justify-center">
            <img 
              src={C.affLarge} 
              alt="Affiliation" 
              className="h-auto object-cover rounded-[20px]" 
              style={{
                maxHeight: "400px",
                maxWidth: "100%"
              }}
            />
          </div>
          
          {/* Content Section */}
          <div>
            <h3 className="font-['PT_Serif']" style={{ fontSize: titleSize }}>
              Affiliation
            </h3>
            <p className="mt-3 leading-[1.6] text-black" style={{ fontSize: descSize }}>
              Amatir Kanya Gurukul is a reputed CBSE girls school, proudly affiliated with the
              Central Board of Secondary Education (CBSE). Explore complete details, including
              mandatory disclosures and access to all relevant information below.
            </p>
            <Link
              to="/essential-information#cbseDisclosure"
              className="mt-6 inline-flex cursor-pointer rounded-full bg-[#ED6D23] px-6 py-3 text-white"
              rel="noopener noreferrer"
            >
              CBSE Mandatory Disclosure
            </Link>
          </div>
        </div>
      ) : (
        // Desktop Layout - Original side-by-side layout
        <div
          className={`mx-auto max-w-[1290px] pl-[5%] ${
            isSmallLaptop ? "grid grid-cols-2 items-center" : "flex items-center"
          }`}
          style={{ gap ,overflow:"visible"}}
        >
          {/* Left copy */}
          <div className={`${isSmallLaptop ? "w-full" : "max-w-[520px]"} z-[2]`}>
            <h3 className="font-['PT_Serif']" style={{ fontSize: titleSize }}>
              Affiliation
            </h3>
            <p className="mt-3 leading-[1.6] text-black" style={{ fontSize: descSize }}>
              Amatir Kanya Gurukul is a reputed CBSE girls school, proudly affiliated with the
              Central Board of Secondary Education (CBSE). Explore complete details, including
              mandatory disclosures and access to all relevant information below.
            </p>
            <Link
              to="/essential-information#cbseDisclosure"
              className="mt-6 inline-flex cursor-pointer rounded-full bg-[#ED6D23] px-6 py-3 text-white"
              rel="noopener noreferrer"
            >
              CBSE Mandatory Disclosure
            </Link>
          </div>

          {/* Right images */}
          <div
            className={`${isSmallLaptop ? "w-full" : "flex-1"} relative flex justify-end`}
            style={{ height: largeH ,overflow:"visible"}}
          >
            {/* Large U-shaped image */}
            <img src={C.affLarge} alt="Affiliation" className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}
