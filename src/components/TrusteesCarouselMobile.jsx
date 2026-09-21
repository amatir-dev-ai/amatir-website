import React from "react";

export default function TrusteesCarouselMobile() {
  const trustees = React.useMemo(
    () => [
      {
        name: "Late Balwant Singh Nehra",
        role: "Founder",
        photo:
          "/images/Trustee-Balwant_pxclkm.jpg",
        details:
          "Balwant Singh Nehra, fondly known as 'Dada Ji,' founded Anant Charitable Trust and Amatir Kanya Gurukul at 65 to support girls in his village.An IIT (BHU) Banaras graduate and retired professor from NIT Kurukshetra, he was also a progressive farmer who has positively impacted countless families.",
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
  const [index, setIndex] = React.useState(0);
  const [slideWidth, setSlideWidth] = React.useState(0);
  
  // Touch/swipe state
  const [touchStart, setTouchStart] = React.useState(null);
  const [touchEnd, setTouchEnd] = React.useState(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState(0);

  const compute = React.useCallback(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    const width = container.clientWidth;
    setSlideWidth(width);
    const baseTransform = -index * width;
    track.style.transform = `translateX(${baseTransform + dragOffset}px)`;
  }, [index, dragOffset]);

  React.useEffect(() => {
    compute();
    window.addEventListener("resize", compute, { passive: true });
    return () => window.removeEventListener("resize", compute);
  }, [compute]);

  const goTo = (i) => {
    const clamped = Math.min(Math.max(i, 0), trustees.length - 1);
    setIndex(clamped);
    setDragOffset(0);
    setIsDragging(false);
  };

  // Touch event handlers for swipe functionality
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !touchStart) return;
    
    // Prevent default scrolling behavior during horizontal swipe
    e.preventDefault();
    
    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;
    setDragOffset(-diff);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    
    setTouchEnd(e.changedTouches[0].clientX);
    const distance = touchStart - e.changedTouches[0].clientX;
    const minSwipeDistance = 30; // Reduced threshold for easier swiping
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && index < trustees.length - 1) {
      goTo(index + 1);
    } else if (isRightSwipe && index > 0) {
      goTo(index - 1);
    } else {
      // Snap back to current position with smooth animation
      setDragOffset(0);
    }
    
    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleTouchCancel = () => {
    setDragOffset(0);
    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* Track */}
      <div
        ref={trackRef}
        className={`flex will-change-transform select-none ${!isDragging ? 'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]' : ''}`}
        style={{ gap: 0 }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
      >
        {trustees.map((t, i) => (
          <article key={t.name + i} className="shrink-0" style={{ width: slideWidth  }}>
            <img
              src={t.photo}
              alt={t.name}
              className="block w-full object-cover"
              style={{ aspectRatio: "1 / 1.2" }}
            />

            <div className="p-5 text-left pb-0">
              <h5 className="relative mb-3 text-[26px] text-[#1C3664]">
                {t.name}
                <span className="absolute left-0 -bottom-2 block h-[2px] w-[30px] bg-[#ED6D23]" />
              </h5>
              <p className="text-[16px] text-[#3A2323]">{t.role}</p>
              <div className="mt-4 overflow-y-auto max-h-[112px] pr-2">
                <p className="text-[15px] leading-7 text-[#3A2323]">{t.details}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Dots - bottom-left, large and tappable */}
      <div className="mt-3 flex items-center gap-2 pl-5">
        {trustees.map((_, i) => (
          <button
            key={`dot-${i}`}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-3.5 w-3.5 rounded-full transition-colors ${
              i === index ? "bg-[#ED6D23]" : "bg-[#D0D0D0]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}


