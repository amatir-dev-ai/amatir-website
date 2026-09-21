// StackingCards.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

/** ------- Brand palette ------- */
const BRAND = {
  navy: "#1C3664",
  blue: "#0E2349",
  orange: "#ED6D23",
  lightCream: "#F7EFE6",
  lightBlue: "#E9EFF6",
};

/** ------- Cloudinary Assets ------- */
const ASSETS = {
  yoga: "/images/Rectangle_68_xsl4fb.jpg",
  vedic: "/images/Rectangle_70_zzamla.jpg",
  academics: "/images/Rectangle_71_qm2vlk.jpg",
  arts: "/images/Rectangle_88_bkq74c.jpg",
  care: "/images/Rectangle_73_oe6xrk.jpg",
  reflection: "/images/Rectangle_80_lwbyul.jpg",
};

/** ------- Helpers ------- */
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** ------- CONFIG (high sensitivity + accurate pinning) ------- */
// Lock when the section is barely visible (first card starts to show)
const LOCK_TRIGGER_VISIBLE_RATIO = 0.05;
// Slightly higher threshold for mobile to avoid abrupt lock-in
const MOBILE_LOCK_TRIGGER_VISIBLE_RATIO = 0.2;

// Ensure entire card stays within the viewport on mobile
const CARD_MAX_VH = 90; // max height of any card relative to viewport
const IMAGE_VH = 30;    // image block height relative to viewport

// Fade-in/out of the entire stack as section enters/leaves viewport
const DESKTOP_FADE_IN_END_VISIBLE_RATIO = 0.15;
const MOBILE_FADE_IN_END_VISIBLE_RATIO = 0.25;

// Total virtual distance (px) to run the entire sequence 0→1.
// Larger = slower overall, but we’ll still react to tiny deltas.
const PX_PER_FULL_SEQUENCE = 7200;

// No dead-zone: tiniest deltas move the progress; cap big trackpad bursts.
const STEP_MIN = 0.0;     // keep at 0 for maximum sensitivity
const STEP_MAX = 0.02;   // lower to reduce per-tick leaps on touch devices

// Optional multipliers to tune device feel
const WHEEL_MUL = 1.0;
const TOUCH_MUL = 1.9; // slight additional boost for faster mobile progression

export default function StackingCards({ onAllCardsStacked }) {
  const sectionRef = useRef(null);

  const [locked, setLocked] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1 across the stack
  const firedOnceRef = useRef(false);
  const [sectionOpacity, setSectionOpacity] = useState(0);
  const rafPinLoopRef = useRef(null);

  // Keep viewport anchored precisely while locked
  const lockAnchorYRef = useRef(null);

  // Accumulate unconsumed deltas with full precision
  const accumRef = useRef(0);

  /** ------- Cards content ------- */
  const cards = useMemo(
    () => [
      {
        id: "yoga",
        eyebrow: "Yoga and Sports",
        title: "I Begin My Day With Calm, Clarity and Strength",
        copy:
          "Our mornings begin with a choice of three essentials: energizing sports to awaken the body, yoga to calm the mind, and mindful practices to build focus and inner strength",
        img: ASSETS.yoga,
        bg: BRAND.lightCream,
        color: "#3B82F6",
      },
      {
        id: "vedic",
        eyebrow: "Vedic Living and Education",
        title: "Tradition Isn't Just What I Know; It's How I Live",
        copy:
          "Chanting, Meditation, and Hawans are part of our daily routine. We don't just learn about tradition—we practice it, live it, and carry it forward with meaning and pride.",
        img: ASSETS.vedic,
        bg: BRAND.lightBlue,
        color: "#FF6B6B",
      },
      {
        id: "academics",
        eyebrow: "Academic Learning and NEET/JEE Coaching",
        title: "I Study Not Just to Know, but to Grow",
        copy:
          "Our CBSE curriculum goes beyond textbooks. With hands-on learning, real-world skills, and values woven in, we grow into curious thinkers, confident doers, and grounded individuals.",
        img: ASSETS.academics,
        bg: BRAND.lightCream,
        color: "#20B2AA",
      },
      {
        id: "arts",
        eyebrow: "Art, Music, and Creative Expression",
        title: "I Explore Who I Am Beyond Marks",
        copy:
          "Through music, dance, theatre, art, and creative expression—even cooking—we discover what excites us, build confidence, and grow into who we truly are.",
        img: ASSETS.arts,
        bg: BRAND.lightBlue,
        color: "#8B5CF6",
      },
      {
        id: "community",
        eyebrow: "Community Living and Shared Responsibilities",
        title: "I Learn to Care — For Myself and the World Around Me",
        copy:
          "By leading councils, managing events, and working in teams, we learn to take charge, support one another, and lead with empathy. Through Chetna-Prabha, we also grow from within—learning to care deeply for ourselves and those around us.",
        img: ASSETS.care,
        bg: BRAND.lightCream,
        color: "#FFD700",
      },
      {
        id: "reflection",
        eyebrow: "Reflection and Emotional Wellbeing",
        title: "I End My Day with Purpose, Reflection, and Joy",
        copy:
          "Evenings are a blend of guided tutoring, indoor games, weekend movie nights, and joyful leisure. As the day winds down, we return to our cozy accommodations for a restful sleep.",
        img: ASSETS.reflection,
        bg: BRAND.lightBlue,
        color: "#1E40AF",
      },
    ],
    []
  );

  /** ------- Visual layout ------- */
  const cardSizes = [
    { widthPct: 90, maxW: 400 },
    { widthPct: 78, maxW: 350 },
    { widthPct: 82, maxW: 360 },
    { widthPct: 75, maxW: 340 },
    { widthPct: 80, maxW: 355 },
    { widthPct: 88, maxW: 385 },
  ];
  const rotationAngles = [-18, 16, -19, 17, -20, 15];
  const cardPositions = [
    { x: -8, y: -12 },
    { x: 12, y: -6 },
    { x: -6, y: 10 },
    { x: 14, y: 12 },
    { x: 2, y: -14 },
    { x: -12, y: 2 },
  ];

  /** ------- Section is one viewport tall; we hijack scroll while locked ------- */
  const sectionStyle = { height: "100vh" };

  /** ------- Pin helpers ------- */
  const getViewportHeight = () => {
    if (typeof window !== "undefined" && window.visualViewport && window.visualViewport.height) {
      return Math.max(1, Math.floor(window.visualViewport.height));
    }
    return Math.max(1, window.innerHeight || 1);
  };

  const getVisibleRatio = () => {
    if (!sectionRef.current) return 0;
    const r = sectionRef.current.getBoundingClientRect();
    const vh = getViewportHeight();
    const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
    return visible / vh;
  };

  const pinViewportToSection = (dir) => {
    if (!sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    const y = window.scrollY;
    const vh = getViewportHeight();
    const anchor = dir > 0 ? y + r.top : y + (r.bottom - vh);
    lockAnchorYRef.current = Math.round(anchor);
    if (Math.abs(window.scrollY - lockAnchorYRef.current) > 0.5) {
      window.scrollTo(0, lockAnchorYRef.current);
    }
  };

  const maintainPin = () => {
    if (lockAnchorYRef.current == null) return;
    // keep the viewport exactly pinned; avoids “creep” during momentum/bounce
    if (Math.abs(window.scrollY - lockAnchorYRef.current) > 0.5) {
      window.scrollTo(0, lockAnchorYRef.current);
    }
  };

  // Pin the viewport so that the section is centered in the window
  const pinViewportToSectionCenter = (smooth = false) => {
    if (!sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    const y = window.scrollY;
    const vh = getViewportHeight();
    const target = y + r.top + (r.height / 2) - (vh / 2);
    lockAnchorYRef.current = Math.round(target);
    if (smooth) {
      try {
        window.scrollTo({ top: lockAnchorYRef.current, behavior: "smooth" });
      } catch (_) {
        window.scrollTo(0, lockAnchorYRef.current);
      }
    } else {
      if (Math.abs(window.scrollY - lockAnchorYRef.current) > 0.5) {
        window.scrollTo(0, lockAnchorYRef.current);
      }
    }
  };

  const startPinLoop = () => {
    if (rafPinLoopRef.current != null) return;
    const loop = () => {
      if (!locked) {
        rafPinLoopRef.current = null;
        return;
      }
      maintainPin();
      rafPinLoopRef.current = requestAnimationFrame(loop);
    };
    rafPinLoopRef.current = requestAnimationFrame(loop);
  };

  const stopPinLoop = () => {
    if (rafPinLoopRef.current != null) {
      cancelAnimationFrame(rafPinLoopRef.current);
      rafPinLoopRef.current = null;
    }
  };

  /** ------- Progress driver (ultra-sensitive, no dead-zone) ------- */
  const addVirtualDistance = (signedPx) => {
    // accumulate with full precision
    accumRef.current += signedPx;

    // convert to progress
    let delta = (signedPx) / PX_PER_FULL_SEQUENCE;

    // clamp per-tick to avoid huge leaps on high-res trackpads
    if (delta > STEP_MAX) delta = STEP_MAX;
    if (delta < -STEP_MAX) delta = -STEP_MAX;
    // STEP_MIN is 0 — every tiny delta counts

    setProgress((p) => clamp(p + delta, 0, 1));
  };

  /** ------- Wheel / Touch / Keys ------- */
  const onWheel = (e) => {
    const dir = e.deltaY > 0 ? 1 : -1;

    if (!locked) {
      const visible = getVisibleRatio();
      if (
        visible >= LOCK_TRIGGER_VISIBLE_RATIO &&
        ((dir > 0 && progress < 1) || (dir < 0 && progress > 0))
      ) {
        // For wheel, pin to section center for a stable stage
        pinViewportToSectionCenter(false);
        setLocked(true);
        e.preventDefault();
        e.stopPropagation();
        addVirtualDistance((e.deltaY || 0) * WHEEL_MUL);
        return;
      }
      return; // natural page scroll
    }

    // locked: hijack and keep the viewport pinned precisely
    e.preventDefault();
    e.stopPropagation();
    maintainPin(); // keep hard-pinned during momentum
    addVirtualDistance((e.deltaY || 0) * WHEEL_MUL);
  };

  const touchRef = useRef({ x: 0, y: 0 });
  const lastTouchTimeRef = useRef(0);
  const onTouchStart = (e) => {
    if (!e.touches?.length) return;
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    lastTouchTimeRef.current = Date.now();
  };
  const onTouchMove = (e) => {
    if (!e.touches?.length) return;
    const ny = e.touches[0].clientY;
    const nx = e.touches[0].clientX;
    const dx = nx - touchRef.current.x;
    const dy = ny - touchRef.current.y; // +ve when swiping down
    const dir = dy < 0 ? 1 : -1;
    const now = Date.now();
    const dt = Math.max(1, now - (lastTouchTimeRef.current || now));
    const speed = Math.abs(dy) / dt; // px per ms
    // Map higher swipe speed to stronger progress (bounded)
    const speedBoost = clamp(1 + speed * 6, 1, 2.2);

    if (!locked) {
      const visible = getVisibleRatio();
      const isTouch = (typeof window !== "undefined") && (("ontouchstart" in window) || ((navigator && navigator.maxTouchPoints) || 0) > 0);
      const lockThreshold = isTouch ? MOBILE_LOCK_TRIGGER_VISIBLE_RATIO : LOCK_TRIGGER_VISIBLE_RATIO;
      if (
        visible >= lockThreshold &&
        ((dir > 0 && progress < 1) || (dir < 0 && progress > 0))
      ) {
        // On mobile: center the section smoothly so the card sits in the middle
        pinViewportToSectionCenter(true);
        setLocked(true);
      } else {
        return; // natural page scroll
      }
    }

    // locked: hijack
    e.preventDefault();
    e.stopPropagation();
    maintainPin();

    // prioritize vertical intent; ignore strong horizontal (don’t fight carousels)
    if (Math.abs(dx) > Math.abs(dy) * 1.2) return;

    addVirtualDistance((-dy) * TOUCH_MUL * speedBoost); // swipe up (dy<0) → progress forward
    touchRef.current = { x: nx, y: ny };
    lastTouchTimeRef.current = now;
  };

  const onKeyDown = (e) => {
    if (!locked) return;
    if (["ArrowDown", "PageDown", " "].includes(e.key)) {
      e.preventDefault();
      maintainPin();
      addVirtualDistance(160); // treat as 160px virtual
    } else if (["ArrowUp", "PageUp"].includes(e.key)) {
      e.preventDefault();
      maintainPin();
      addVirtualDistance(-160);
    }
  };

  /** ------- Bind/unbind listeners ------- */
  useEffect(() => {
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    const root = document.documentElement;
    const prev = root.style.overscrollBehaviorY;
    if (locked) {
      root.style.overscrollBehaviorY = "contain";
      startPinLoop();
    }

    // Fade control based on visibility, but force opaque while locked
    const onScroll = () => {
      const visible = getVisibleRatio();
      const isTouch = (typeof window !== "undefined") && (("ontouchstart" in window) || ((navigator && navigator.maxTouchPoints) || 0) > 0);
      const fadeEnd = isTouch ? MOBILE_FADE_IN_END_VISIBLE_RATIO : DESKTOP_FADE_IN_END_VISIBLE_RATIO;
      let o = clamp(visible / fadeEnd, 0, 1);
      if (locked) o = 1; // keep fully visible during interaction
      setSectionOpacity(o);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
      root.style.overscrollBehaviorY = prev || "";
      stopPinLoop();
    };
  }, [locked, progress]);

  /** ------- Unlock & callback ------- */
  useEffect(() => {
    if (progress >= 1) {
      if (!firedOnceRef.current && onAllCardsStacked) {
        firedOnceRef.current = true;
        onAllCardsStacked(true);
      }
      setLocked(false); // release only after all items are displayed
      lockAnchorYRef.current = null;
      stopPinLoop();
    } else if (progress <= 0) {
      setLocked(false);
      lockAnchorYRef.current = null;
      stopPinLoop();
    }
  }, [progress, onAllCardsStacked]);

  /** ------- Per-card transforms driven by global progress ------- */
  const step = 1 / cards.length;
  const styles = cards.map((_, index) => {
    const isLeftSide = index % 2 === 0;
    const start = index * step;
    const end = (index + 1) * step;
    const local = clamp((progress - start) / (end - start), 0, 1);
    const t = easeInOutCubic(local);

    const offXvw = isLeftSide ? -110 : 110;
    const endX = cardPositions[index].x;
    const endY = cardPositions[index].y;
    const rot = rotationAngles[index];

    const translateToCenter = `translateX(calc(-50% + ${(1 - t) * offXvw}vw))`;
    const center = `translateX(-50%)`;
    const currentX = t < 1 ? translateToCenter : center;
    const currentY = `translateY(calc(-50% + ${endY}px))`;
    const finalNudgeX = t >= 1 ? ` translateX(${endX}px)` : "";

    const opacity = t;
    const zIndex = 10 + index;
    const size = cardSizes[index];

    return {
      container: {
        width: `${size.widthPct}%`,
        maxWidth: `${size.maxW}px`,
        
        left: "50%",
        top: "50%",
        transform: `${currentX} ${currentY}${finalNudgeX} rotate(${rot}deg) translateZ(0)`,
        opacity,
        zIndex,
        transition: "transform 140ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        transformOrigin: "50% 50%",
      },
    };
  });

  return (
    <section
      ref={sectionRef}
      className="w-full relative"
      style={{
        ...sectionStyle,
        opacity: sectionOpacity,
        transition: "opacity 260ms ease",
        willChange: "opacity",
      }}
    >
      {/* Sticky pin area; keep pointer events off while locked */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{
          pointerEvents: "none",
          touchAction: locked ? "none" : "auto", // tighter control on mobile
        }}
      >
        <div className="relative w-full h-full">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="absolute rounded-lg shadow-lg overflow-hidden"
              style={{
                ...styles[index].container,
                background: card.bg,
                borderRadius: 12,
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: `${IMAGE_VH}vh` }}>
                <img
                  src={card.img}
                  alt={card.eyebrow}
                  className="w-full h-full"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.28) 100%)",
                  }}
                />
              </div>

              {/* Content */}
              <div
                className="px-4 py-4"
                style={{
                  background: card.bg,
                  pointerEvents: "auto",
                  textAlign: "left",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  maxHeight: "calc(60vh - 2rem)", // space below image
                  overflowY: "auto",
                  scrollbarWidth: "none", // Firefox
                  msOverflowStyle: "none", // IE
                }}
              >
                <style jsx>{`
    div::-webkit-scrollbar {
      display: none; /* hide scrollbar on mobile */
    }
  `}</style>

                <h3
                  style={{
                    fontSize: "clamp(16px, 4vw, 22px)",
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: card.color,
                    marginBottom: "0.8vh",
                    fontFamily:
                      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
                    letterSpacing: "0.01em",
                  }}
                >
                  {card.eyebrow}
                </h3>

                <p
                  style={{
                    fontSize: "clamp(18px, 4.5vw, 26px)",
                    fontWeight: 500,
                    lineHeight: 1.4,
                    color: BRAND.navy,
                    marginBottom: "1vh",
                    fontFamily: "ui-sans-serif, Georgia, serif",
                  }}
                >
                  {card.title}
                </p>

                <p
                  style={{
                    fontSize: "clamp(14px, 3.5vw, 18px)",
                    lineHeight: 1.6,
                    color: "#374151",
                    marginBottom: "1.8vh",
                    fontFamily:
                      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
                  }}
                >
                  {card.copy}
                </p>

                <a
                  href="/contact"
                  className="inline-flex items-center"
                  style={{
                    color: BRAND.navy,
                    fontSize: "clamp(14px, 3.5vw, 18px)",
                    fontWeight: 600,
                    textDecoration: "underline",
                    fontFamily:
                      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
                  }}
                >
                  Know More →
                </a>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
