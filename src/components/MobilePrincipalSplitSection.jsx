// MobilePrincipalSplitSection.jsx
import React from "react";
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

export default function MobilePrincipalSplitSection() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  // Mobile-optimized responsive values
  const sectionPadding = isMobile ? '60px 20px' : '80px 40px';
  const imageSize = isMobile ? '280px' : '320px';
  const titleFontSize = isMobile ? '32px' : '36px';
  const subtitleFontSize = isMobile ? '16px' : '18px';
  const buttonSize = isMobile ? '130px' : '146px';
  const buttonHeight = isMobile ? '44px' : '50px';

  return (
    <section
      className="relative w-full bg-[#F5F5F5] overflow-hidden"
      style={{ padding: sectionPadding }}
    >
      <div className="mx-auto flex flex-col items-center max-w-4xl">
        {/* Image Section */}
        <div
          className="relative overflow-hidden mb-8"
          style={{ width: imageSize, height: imageSize }}
        >
          <img
            src="/images/DSC03260.JPG.webp"
            alt="Principal at desk"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Play overlay (centered) */}
          {/* <button
            type="button"
            aria-label="Play video"
            className="absolute inset-0 m-0 grid place-items-center"
            style={{ pointerEvents: "auto" }}
          >
            <span className="relative inline-flex items-center justify-center rounded-full bg-white/20 backdrop-blur-[2px]">
              <span className="absolute inset-0 rounded-full ring-2 ring-white/80" />
              <svg
                width={isMobile ? "56" : "64"}
                height={isMobile ? "56" : "64"}
                viewBox="0 0 72 72"
                aria-hidden="true"
              >
                <circle cx="36" cy="36" r="34" fill="white" fillOpacity="0.8" />
                <polygon points="31,26 31,46 48,36" fill="#ED6D23" />
              </svg>
            </span>
          </button> */}
        </div>

        {/* Content Section */}
        <div className="text-center bg-white rounded-2xl p-8 w-full max-w-md">
          {/* Headline */}
          <h2
            className="text-[#1C3664] leading-[1.2] mb-6"
            style={{
              fontFamily:
                '\"CentSchbkCyrill BT\", Georgia, Cambria, \"Times New Roman\", serif',
              fontWeight: 400,
              fontSize: titleFontSize,
            }}
          >
            Leading With
            <br />
            Purpose
          </h2>

          {/* Copy */}
          <div
            className="mb-8 space-y-2 tracking-[-0.02em]"
            style={{
              fontFamily:
                'Univers, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif',
            }}
          >
            <p className="font-normal" style={{ fontSize: subtitleFontSize }}>
              A Message from the Principal
            </p>
            <p className="font-bold" style={{ fontSize: subtitleFontSize }}>
              Mrs. Soma Debnath
            </p>
            <p className="font-normal" style={{ fontSize: subtitleFontSize }}>
              Amatir Kanya Gurukul
            </p>
          </div>

          {/* CTA */}
          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-full bg-[#ED6D23] text-white transition-opacity hover:opacity-90 mb-2"
            style={{
              width: buttonSize,
              height: buttonHeight,
              fontFamily:
                '\"CentSchbkCyrill BT\", Georgia, Cambria, \"Times New Roman\", serif',
              fontSize: isMobile ? '14px' : '16px',
              lineHeight: isMobile ? '17px' : '19px',
            }}
          >
            About Amatir
          </Link>
        </div>
      </div>
    </section>
  );
}

