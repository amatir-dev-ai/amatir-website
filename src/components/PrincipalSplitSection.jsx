// PrincipalSplitSection.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PrincipalSplitSection() {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);

  const handleAboutClick = () => {
    console.log('About button clicked'); // Debug log
    try {
      navigate('/about');
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to direct navigation
      window.location.href = '/about';
    }
  };

  return (
    <section
      className="relative w-full bg-[#F5F5F5] overflow-hidden"
      /* Top/bottom breathing room scales with viewport height */
      style={{
        // Limit paddingTop and paddingBottom to a max of 80px even on very tall screens
        paddingTop: "clamp(24px, min(8vh, 80px), 100px)",
        paddingBottom: "clamp(24px, min(8vh, 80px), 100px)",
        /* One knob to scale the whole composition:
           - grows with width (vw) but clamped by height (vh)
           - never larger than the design 645px square
           - never smaller than 300px on tiny phones
        */
        ["--side"]: "clamp(300px, min(42vw, 70vh), 645px)",
      }}
    >
      {/* Pair container: stays centered; wraps to stacked layout on small screens */}
      <div
        className="mx-auto flex flex-wrap md:flex-nowrap items-center justify-center"
        style={{
          width: "min(100%, calc(var(--side) * 2))",
          rowGap: "24px",
        }}
      >
        {/* LEFT SQUARE (Image) */}
        <div
          className="relative overflow-hidden"
          style={{ width: "var(--side)", height: "var(--side)" }}
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
              <span onClick={() => setShowVideo(true)} className="absolute inset-0 rounded-full ring-2 ring-white/80 cursor-pointer" />
              <svg
                width="72"
                height="72"
                viewBox="0 0 72 72"
                className="md:w-[64px] md:h-[64px]"
                aria-hidden="true"
              >
                <circle cx="36" cy="36" r="34" fill="white" fillOpacity="0.8" />
                <polygon points="31,26 31,46 48,36" fill="#ED6D23" />
              </svg>
            </span>
          </button> */}
        </div>

        {showVideo && (
          <div
            className="fixed inset-0 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowVideo(false);
            }}
          >
            <div className="absolute inset-0 bg-black/70" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 pt-18">
              <button
                onClick={() => setShowVideo(false)}
                className="mt-4 inline-flex items-center bg-white text-slate-800 px-4 py-2 rounded-lg cursor-pointer"
              >
                Close
              </button>
              <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
                <div className="aspect-video">
                  <iframe
                    title="Campus Video"
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/aUzKbx04g9U?autoplay=1&rel=0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT SQUARE (White content panel) */}
        <div
          className="relative bg-white"
          style={{ width: "var(--side)", height: "var(--side)", overflow: "hidden" }}
        >
          <div
            className="absolute inset-0 flex items-center"
            /* Inner padding scales so text block always sits like the design */
            style={{ padding: "clamp(16px, 3.6vw, 48px)" }}
          >
            <div
              className="relative"
              style={{
                /* Design copy width ≈ 508px; cap by square size */
                width: "min(508px, calc(var(--side) - 96px))",
              }}
            >
              {/* Headline */}
              <h2
                className="text-[#1C3664] leading-[1.2]"
                style={{
                  fontFamily:
                    '"CentSchbkCyrill BT", Georgia, Cambria, "Times New Roman", serif',
                  fontWeight: 400,
                  fontSize: "clamp(36px, 4.4vw, 62px)",
                }}
              >
                Leading With
                <br />
                Purpose
              </h2>

              {/* Copy */}
              <div
                className="mt-5 space-y-1 tracking-[-0.02em]"
                style={{
                  fontFamily:
                    'Univers, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
                }}
              >
                <p className="text-[18px] leading-[150%] font-normal">
                  A Message from the Principal
                </p>
                <p className="text-[18px] leading-[150%] font-bold">
                  Mrs. Soma Debnath
                </p>
                <p className="text-[18px] leading-[150%] font-normal">
                  Amatir Kanya Gurukul
                </p>
              </div>

              {/* CTA */}
              <div className="mb-4">
                <button
                  type="button"
                  onClick={handleAboutClick}
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-[#ED6D23] text-white transition-opacity hover:opacity-90"
                  style={{
                    width: "146.16px",
                    height: "50px",
                    fontFamily:
                      '"CentSchbkCyrill BT", Georgia, Cambria, "Times New Roman", serif',
                    fontSize: "16px",
                    lineHeight: "19px",
                  }}
                >
                  About Amatir
                </button>
              </div>
            </div>
          </div>

          {/* Decorative petals (bottom-right), softly blended like screenshot */}
          <div className="pointer-events-none absolute -bottom-2 -right-2 opacity-70">
            <svg
              width="272"
              height="272"
              viewBox="0 0 272 272"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M368.744 17.5957C331.551 18.8698 295.845 41.046 276.914 71.7165C275.458 73.9918 273.941 74.7199 272.516 74.7199C271.09 74.7199 269.573 73.9918 268.117 71.7165C249.187 41.046 213.48 18.8698 176.287 17.5957C173.102 17.5957 171.494 18.5968 173.163 22.2372C192.851 67.0143 222.521 128.568 272.516 128.871C322.511 128.568 352.18 67.0143 371.869 22.2372C373.567 18.5968 371.929 17.5957 368.744 17.5957Z"
                fill="black"
                fillOpacity="0.05"
                style={{ mixBlendMode: "soft-light" }}
              />
              <path
                d="M290.566 17.5953C290.566 27.3031 282.466 35.1907 272.485 35.1907C262.504 35.1907 254.404 27.3031 254.404 17.5953C254.404 7.88757 262.504 0 272.485 0C282.466 0 290.566 7.88757 290.566 17.5953Z"
                fill="black"
                fillOpacity="0.05"
                style={{ mixBlendMode: "soft-light" }}
              />
              <path
                d="M17.5953 290.566C7.88756 290.566 0 282.466 0 272.485C0 262.504 7.88756 254.404 17.5953 254.404C27.3031 254.404 35.1907 262.504 35.1907 272.485C35.1907 282.466 27.3031 290.566 17.5953 290.566Z"
                fill="black"
                fillOpacity="0.05"
                style={{ mixBlendMode: "soft-light" }}
              />
              <path
                d="M79.4826 105.026C72.6265 98.1698 72.7782 86.8542 79.8163 79.8161C86.8848 72.7476 98.1701 72.5959 105.026 79.4824C111.882 86.3385 111.731 97.6541 104.692 104.692C97.624 111.761 86.3387 111.912 79.4826 105.026Z"
                fill="black"
                fillOpacity="0.05"
                style={{ mixBlendMode: "soft-light" }}
              />
              <path
                d="M17.5947 176.256C18.8689 213.449 41.0451 249.156 71.7155 268.086C73.9908 269.542 74.7189 271.059 74.7189 272.484C74.7189 273.91 73.9908 275.427 71.7155 276.883C41.0451 295.844 18.8689 331.52 17.5947 368.713C17.5947 371.898 18.5958 373.506 22.2363 371.837C67.0133 352.149 128.567 322.48 128.87 272.484C128.567 222.489 67.0133 192.82 22.2363 173.132C18.5958 171.433 17.5947 173.071 17.5947 176.226"
                fill="black"
                fillOpacity="0.05"
                style={{ mixBlendMode: "soft-light" }}
              />
              <path
                d="M160.328 24.2091C134.936 51.4211 125.38 92.3455 133.662 127.415C134.238 130.054 133.662 131.662 132.691 132.663C131.72 133.634 130.082 134.241 127.443 133.634C92.343 125.352 51.4186 134.908 24.2369 160.3C21.992 162.545 21.5672 164.395 25.329 165.791C70.8949 183.538 135.421 206.078 170.976 170.948C206.106 135.363 183.566 70.867 165.819 25.3012C164.454 21.5394 162.573 21.9641 160.328 24.2091Z"
                fill="black"
                fillOpacity="0.05"
                style={{ mixBlendMode: "soft-light" }}
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
