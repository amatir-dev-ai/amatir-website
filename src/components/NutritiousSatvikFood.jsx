import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SatvikFoodSection = () => {
  const IMAGES = [
    "/images/KUM_4285_1_aiwnob.jpg",
    "/images/2_8_dfl28l.jpg",
    "/images/2_4_fqszow.jpg",
    "/images/2_5_y5fs2x.jpg"
  ];

  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setIndex((i) => (i + 1) % IMAGES.length);

  return (
    <section className="h-auto bg-[#F5F5F5]">
      {/* Two columns, top aligned like the screenshot */}
      <div className="mx-auto grid h-full w-[92%] max-w-[1290px] grid-cols-1 items-start gap-10 py-10 lg:grid-cols-12 lg:gap-12 lg:py-14">
        {/* LEFT — left-aligned header + copy, multiline like screenshot */}
        <div className="lg:col-span-5">
          <div className="w-full max-w-[680px]">
            <h2 className="cent-schbk-cyrill text-[#1F3B5B] text-[40px] leading-[1.1] md:text-[56px] text-left" style={{textAlign:"left"}}>
              Nutritious
              <br />
              Satvik Food
            </h2>

            <p className="univers-regular mt-8 text-[16px] leading-[150%] text-gray-800 md:text-[18px] text-left" style={{textAlign:"left"}}>
              Fresh, farm-to-plate meals grown on campus nourish the body and
              mind. Dining together on the floor fosters humility, gratitude,
              and a strong sense of community. Meals align with the lunar
              calendar, with a specially curated menu on Poornima, Ekadashi, and
              Amavasya.
            </p>
          </div>
        </div>

        {/* RIGHT — carousel (fade-in), top-aligned with text block */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full overflow-hidden rounded-2xl shadow-sm h-[46vh] md:h-[52vh] lg:h-[60vh]">
            {IMAGES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt="Satvik food preparation"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                  i === index ? "opacity-100 fadeIn" : "opacity-0"
                }`}
                loading={i === 0 ? "eager" : "lazy"}
              />
            ))}
          </div>

          {/* Chevron controls — perfectly centered icon inside circle */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              aria-label="Previous image"
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#ED6D23] text-[#ED6D23] transition hover:bg-[#ED6D23]/10"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={2.4} />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#ED6D23] text-[#ED6D23] transition hover:bg-[#ED6D23]/10"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={2.4} />
            </button>
          </div>
        </div>
      </div>

      {/* Fade-in keyframes for the active slide */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        .fadeIn { animation: fadeIn 0.7s ease-out; }
      `}</style>
    </section>
  );
};

export default SatvikFoodSection;
