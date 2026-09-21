import React from "react";

/**
 * MobileGallery
 * - Mobile-only carousel version of `Gallery.jsx`
 * - Single-image per slide with centered title/subtitle
 * - Dots navigation below the image (active = orange)
 * - Spacings tuned to match provided screenshot
 */
export default function MobileGallery({ images = [], title, subtitle }) {
  const containerRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const [index, setIndex] = React.useState(0);
  const [slideWidth, setSlideWidth] = React.useState(0);

  const compute = React.useCallback(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    const width = container.clientWidth;
    setSlideWidth(width);
    track.style.transform = `translateX(-${index * width}px)`;
  }, [index]);

  React.useEffect(() => {
    compute();
    window.addEventListener("resize", compute, { passive: true });
    return () => window.removeEventListener("resize", compute);
  }, [compute]);

  const goTo = (i) => {
    const max = Math.max(0, images.length - 1);
    const clamped = Math.min(Math.max(i, 0), max);
    setIndex(clamped);
    const track = trackRef.current;
    if (track) track.style.transform = `translateX(-${clamped * slideWidth}px)`;
  };
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Simple swipe handling
  const startX = React.useRef(0);
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-8">
      <div className="text-center mb-6">
        <h2 className="text-[32px] font-normal font-serif leading-[120%] text-[#1C3664]">
          {title}
        </h2>
        <br />
        <p className="text-[20px] text-[#0B0B0B]">{subtitle}</p>
      </div>

      {/* Carousel */}
      <div ref={containerRef} className="relative w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
          style={{ gap: 0 }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {images.map((src, i) => (
            <div key={i} className="shrink-0" style={{ width: slideWidth }}>
              <div className="w-full overflow-hidden rounded-lg" style={{ aspectRatio: "4 / 3" }}>
                <img src={src} alt="Gallery image" className="h-full w-full object-cover" />
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-3">
          {images.map((_, i) => (
            <button
              key={`dot-${i}`}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === index ? "bg-[#ED6D23]" : "bg-[#D0D0D0]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


