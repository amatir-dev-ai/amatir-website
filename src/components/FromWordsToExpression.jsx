// FromWordsToExpression.jsx
import React from "react";
import { useMediaQuery } from "react-responsive";

// Cloudinary images (as provided)
const IMG = {
  reading:
    "/images/Rectangle_110_1_vvwqwv.jpg",
  creative:
    "/images/Rectangle_110_2_dyyrg6.jpg",
  debating:
    "/images/Debate1_hmlmfm.jpg",
};

const BRAND = {
  bg: "#F5F5F5",
  heading: "#1C3664",
  text: "#000000",
};

export default function FromWordsToExpression() {
  // 100% screen height on all non-mobile devices
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <section
      style={{ backgroundColor: BRAND.bg }}
      className={`${isMobile ? "" : "h-screen"} flex`}
    >
      <div className="mx-auto w-[92%] max-w-[1200px] flex h-full flex-col py-8 md:py-12">
        {/* Heading + Subheading */}
        <header className="text-center">
          <h2
            className="mb-4 leading-[1.2]"
            style={{
              fontFamily: '"CentSchbkCyrill BT","PT Serif",serif',
              fontWeight: 400,
              fontSize: "44px",
              lineHeight: "120%",
              letterSpacing: "0",
              color: BRAND.heading,
            }}
          >
            From Words to Expression
          </h2>

          <p
            className="mx-auto max-w-[820px] text-[#000000]/80"
            style={{
              fontFamily: 'Univers, "Roboto", system-ui, -apple-system, sans-serif',
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "150%",
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            Building strong language skills to inspire imagination, clarity, and
            confident communication.
          </p>
        </header>

        {/* Cards */}
        <div className="mt-6 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-3 md:gap-8">
          <Card
            img={IMG.reading}
            title="Reading"
            body="Invites focus, imagination, and a lifelong love for books."
          />
          <Card
            img={IMG.creative}
            title="Creative Writing"
            body="Encouraging self-expression through stories, poems, and ideas."
          />
          <Card
            img={IMG.debating}
            title="Debating"
            body="Sharpening thinking, confidence, and the power to speak with clarity."
          />
        </div>

        {/* Bottom caption */}
        <p
          className="mx-auto mt-10 max-w-[980px] text-center md:mt-12 text-[#000000]/80"
          style={{
            fontFamily: 'Univers, "Roboto", system-ui, -apple-system, sans-serif',
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "150%",
            letterSpacing: "-0.02em",
          }}
        >
          Amatir’s blend of values and experiences truly reflects what makes us
          one of the best Gurukuls in India for girls.
        </p>
      </div>
    </section>
  );
}

function Card({ img, title, body }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative">
        <img
          src={img}
          alt={title}
          className="h-[220px] w-full object-cover md:h-[240px] lg:h-[260px]"
        />
      </div>

      <div className="p-5 md:p-6">
        <h3
          className="mb-2"
          style={{
            fontFamily: '"CentSchbkCyrill BT","PT Serif",serif',
            fontWeight: 400,
            fontSize: "28px",
            lineHeight: "120%",
            letterSpacing: "0",
            color: BRAND.heading,
          }}
        >
          {title}
        </h3>

        <p
          className="text-[#000000]/70"
          style={{
            fontFamily: 'Univers, "Roboto", system-ui, -apple-system, sans-serif',
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "150%",
            letterSpacing: "-0.02em",
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

/*
Notes:
- Ensure the fonts "CentSchbkCyrill BT" and "Univers" are loaded in your project
  (via @font-face or a font host). The code includes sensible fallbacks.
- The section becomes 100% viewport height on non-mobile devices using react-responsive.
*/
