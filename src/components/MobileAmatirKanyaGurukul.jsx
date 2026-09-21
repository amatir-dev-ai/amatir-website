import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const MobileAmatirKanyaGurukul = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Mobile-optimized sizes
  const bigImageSize = isMobile ? "280px" : "320px";
  const sectionPadding = isMobile ? "60px 20px" : "80px 40px";
  const titleFontSize = isMobile ? "32px" : "36px";
  const subtitleFontSize = isMobile ? "18px" : "20px";
  const descFontSize = isMobile ? "16px" : "18px";
  const buttonPadding = isMobile ? "12px 24px" : "14px 28px";

  return (
    <section
      className="relative w-full bg-white"
      style={{ padding: sectionPadding }}
    >
      <div className="mx-auto max-w-4xl">
        {/* Text Content */}
        <div className="text-left">
          <h2
            className="font-['PT_Serif'] text-[#1C3664] leading-tight mb-3"
            style={{ fontSize: titleFontSize }}
          >
            Amatir Kanya Gurukul
          </h2>
          <p
            className="text-[#1C3664] opacity-90 mb-6"
            style={{ fontSize: subtitleFontSize }}
          >
            Residential School for Girls
          </p>
          <p
            className="text-[#1C1C1C] leading-relaxed mb-8"
            style={{
              fontSize: descFontSize,
              maxWidth: isMobile ? "100%" : "600px",
            }}
          >
            Rooted in Bharat's timeless wisdom and strengthened by modern education,
            Amatir nurtures academic excellence, life skills, and inner strength —
            through personalized mentorship, state-of-the-art facilities, and a
            home-like environment — empowering every girl to thrive with values
            that last a lifetime.
          </p>

          <Link
            to="/contact#mobile-contact"
            className="bg-[#ED6D23] text-white rounded-full font-semibold cursor-pointer hover:bg-[#d55a1a] transition-colors inline-block"
            style={{
              padding: buttonPadding,
              fontSize: isMobile ? "16px" : "18px",
            }}
          >
            Get in touch
          </Link>
        </div>

        {/* Image Section */}
        <div className="flex justify-center mt-8">
          <div
            className="relative rounded-full overflow-hidden"
            style={{
              width: bigImageSize,
              height: bigImageSize,
            }}
          >
            <img
              src="/images/AffiliationJoinImage_ibdgx9.png"
              alt="Amatir Kanya Gurukul"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAmatirKanyaGurukul;
