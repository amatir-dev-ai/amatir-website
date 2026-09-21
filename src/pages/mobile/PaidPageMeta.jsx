// HomeBody.jsx
// Body-only page (no header/footer) — all sizing uses vw, vh, rem, vmin
// Tailwind required for utilities, but all numeric sizing is responsive.
// Images are the Cloudinary assets you shared.

import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useMediaQuery } from "react-responsive";
import MobileCampusLifeCarousel from "../../components/MobileCampusLifeCarousel";
import MobileGallery from "../../components/MobileGallery";
import InTheirOwnWordsMobile from "../../components/InTheirOwnWordsMobile";

/* ---------- BRAND ---------- */
const BRAND = {
  navy: "#1C3664",

  orange: "#ED6D23",
  formBg: "#F4F3F1",
  blueTint: "#E8EEF7",
  peach: "#F7EEE8",
  border: "rgba(0,0,0,0.08)",
  text: "#111827",
  textMuted: "#4B5563",
};

/* ---------- FORM DATA ---------- */
const FORM_DATA = {
  states: [
    // States
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    // Union Territories
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ],
  classes: [
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
  ],
};

/* ---------- ASSETS ---------- */
const ASSET = {
  // Header / hero - Video assets like Home.jsx
  heroDesktop: "/images/Header_ywiibp.mp4",
  heroMobile: "/images/375x424_lqnlmg.mp4",
  heroPoster: "/images/Screenshot_2025-08-28_234620_eke0em.png",
  heroIcon: "/images/Orange_Icon_i299iz.svg",

  // Why parents trust icons
  stat1000: "/images/1000_kqkta6.svg",
  statPersonal: "/images/personalAttention_qajyxm.svg",
  stat200: "/images/200_medals_y4b9sy.svg",
  stat30: "/images/spacious_30_cpts76.svg",
  stat100: "/images/100_caring_kjseyh.svg",
  statRated: "/images/Rated4_5_uyx9cv.svg",

  // Big U section
  circleLarge: "/images/Rectangle_35_1_emkv7r.jpg",
  circleInset: "/images/confident-female-indian-entrepreneur_obbir6.jpg",

  // UNESCO carousel images
  pillarKnow: "/images/059A9916_gatxka.jpg",
  pillarDo: "/images/Rectangle_78_wkmgqe.jpg",
  pillarBe: "/images/Rectangle_77_em9gnl.jpg",

  // Voices
  voiceParent: "/images/image_rxpu5r.jpg",
  voiceCenter: "/images/confident-female-indian-entrepreneur_obbir6.jpg",
  voiceStudent:
    "/images/happy-indian-student-school-uniform-with-books-bag_mjt3de.jpg",
  voiceStaff: "/images/IMG_1063_cxkehi.jpg",

  // Fees (visual accents not required—using forms/cards)

  // Results split
  resultsLeft: "/images/268fee0c5a47cf73aedb5bcbf66d3eecc6ae7287_xgodld.jpg",
  resultsRight: "/images/c969fa80eeb0188de0d18eb65fa24892c9cc7da4_hascnj.jpg",

  // Gallery grid
  g_library: "/images/Library02_w8x3om.jpg",
  g_hostelMess12: "/images/Candid-Happy03_wu2xkd.jpg",
  g_hostelMess09: "/images/Acad-School03_h41ob8.jpg",
  g_whatsapp: "/images/Acad-Lab19_odu4q9.jpg",
  g_hostelMess07: "/images/Hostel-Life04_wwi9bv.jpg",
  g_img20221023: "/images/BA-Music01_iljqvq.jpg",
  g_hostelMess02: "/images/BA-Nukkad04_i8qysl.jpg",
  g_hostelMess05: "/images/Assembly10_1_gklgnh.jpg",

  // Unlock CTA
  unlockBg: "/images/5a3595fd08cbede5605d612ceae4005da048dbe0_sjctvy.jpg",
};

/* ---------- Small helpers ---------- */
function LabelInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  fontSize,
  labelSize,
  inputPadding,
  labelMargin,
}) {
  return (
    <label className="block">
      <span
        className="block"
        style={{
          color: BRAND.text,
          fontSize: labelSize || "clamp(0.9rem,1.05vw,1rem)",
          marginBottom: labelMargin || "0.6vh",
        }}
      >
        {label}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded outline-none"
        style={{
          padding: inputPadding || "1rem 1.2rem",
          border: `0.08rem solid ${BRAND.border}`,
          background: "#fff",
          fontSize: fontSize || "clamp(0.95rem,1.1vw,1.05rem)",
        }}
      />
    </label>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  placeholder,
  fontSize,
  labelSize,
  inputPadding,
  labelMargin,
  options = [],
}) {
  return (
    <label className="block">
      <span
        className="block"
        style={{
          color: BRAND.text,
          fontSize: labelSize || "clamp(0.9rem,1.05vw,1rem)",
          marginBottom: labelMargin || "0.6vh",
        }}
      >
        {label}
      </span>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full appearance-none rounded bg-white"
          style={{
            padding: inputPadding
              ? `${inputPadding.split(" ")[0]} 3rem ${inputPadding.split(" ")[0]
              } ${inputPadding.split(" ")[1]}`
              : "1rem 3rem 1rem 1.2rem",
            border: `0.08rem solid ${BRAND.border}`,
            fontSize: fontSize || "clamp(0.95rem,1.1vw,1.05rem)",
          }}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-[1rem] top-1/2 -translate-y-1/2">
          <svg
            viewBox="0 0 24 24"
            style={{
              width: "1.1rem",
              height: "1.1rem",
              color: BRAND.textMuted,
            }}
          >
            <path fill="currentColor" d="M7 10l5 5 5-5z" />
          </svg>
        </div>
      </div>
    </label>
  );
}

// FigureCaptioned helper removed as Voices section replaced with mobile component

/* ---------- SLIDING FORM COMPONENT ---------- */
function SlidingForm({ isVisible, onClose }) {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const isSmallHeight = useMediaQuery({ maxHeight: 600 });
  const isVerySmallHeight = useMediaQuery({ maxHeight: 500 });

  const [form, setForm] = useState({
    g: "",
    d: "",
    p: "",
    w: "",
    s: "",
    c: "",
  });
  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Get responsive form sizing based on screen height
  const getFormSizing = () => {
    if (isVerySmallHeight) {
      return {
        titleSize: "clamp(0.9rem, 3vw, 1.1rem)",
        inputSize: "clamp(0.7rem, 2.2vw, 0.8rem)",
        labelSize: "clamp(0.65rem, 1.8vw, 0.75rem)",
        spacing: "space-y-1",
        padding: "p-2 sm:p-3",
        buttonPadding: "0.5rem 0.9rem",
        buttonSize: "clamp(0.7rem, 2.2vw, 0.8rem)",
        inputPadding: "0.5rem 0.7rem",
        titleMargin: "mb-2",
        labelMargin: "0.4vh",
      };
    }
    if (isSmallHeight) {
      return {
        titleSize: "clamp(1rem, 3.5vw, 1.3rem)",
        inputSize: "clamp(0.75rem, 2.5vw, 0.85rem)",
        labelSize: "clamp(0.7rem, 2vw, 0.8rem)",
        spacing: "space-y-2",
        padding: "p-3 sm:p-4",
        buttonPadding: "0.6rem 1rem",
        buttonSize: "clamp(0.75rem, 2.5vw, 0.85rem)",
        inputPadding: "0.6rem 0.9rem",
        titleMargin: "mb-3",
        labelMargin: "0.5vh",
      };
    }
    if (isMobile) {
      return {
        titleSize: "clamp(1.2rem, 4.5vw, 1.8rem)",
        inputSize: "clamp(0.85rem, 3.5vw, 0.95rem)",
        labelSize: "clamp(0.8rem, 3vw, 0.9rem)",
        spacing: "space-y-3",
        padding: "p-4 sm:p-6",
        buttonPadding: "0.8rem 1.3rem",
        buttonSize: "clamp(0.85rem, 3.5vw, 0.95rem)",
        inputPadding: "0.8rem 1rem",
        titleMargin: "mb-4",
        labelMargin: "0.6vh",
      };
    }
    return {
      titleSize: "clamp(1.3rem, 2.8vw, 2.5rem)",
      inputSize: "clamp(0.9rem, 1.1vw, 1rem)",
      labelSize: "clamp(0.85rem, 0.9vw, 0.95rem)",
      spacing: "space-y-3 lg:space-y-4",
      padding: "py-6 sm:py-8 lg:py-10 xl:py-14",
      buttonPadding: "0.9rem 2rem",
      buttonSize: "clamp(0.9rem, 1.1vw, 1rem)",
      inputPadding: "0.9rem 1.1rem",
      titleMargin: "mb-4 lg:mb-5",
      labelMargin: "0.6vh",
    };
  };

  const formSizing = getFormSizing();

  return <div></div>;
}

export const TestimonialSection = () => {
  const Container = ({ children }) => (
    <div className="mx-auto" style={{ width: "min(92vw, 72rem)" }}>
      {children}
    </div>
  );
  const Serif = "font-['CentSchbkCyrill_BT:Roman',_serif]";
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const IMG = {
    t1: "/images/Rauktima_Royal.jpg",
    t2: "/images/confident-female.jpg",
    t4: "/images/Neha_Dhiman.png",
  };

  const teachers = useMemo(
    () => [
      {
        name: "Neha Dhiman",
        role: "Teacher",
        photo: IMG.t4,
        highlight: "Empowering Life Skills",
        sign: "_Ms. Neha Dhiman",
        category: "Educator - Home Science",
        details:
          "We teach Home Science not just as a subject, but as 'Gastronomy'—the art of living. Under the Learning to Do pillar, I mentor girls to blend scientific nutrition with traditional values. It is rewarding to see them evolve into independent, creative thinkers who take ownership of their health and environment.",
      },
      {
        name: "Shubhangi Gupta",
        role: "Parent",
        photo: IMG.t2,
        highlight: "Security and Holistic Growth",
        sign: "_Shubhangi Gupta",
        category: "Parent",
        details:
          "The Samrakshika system gave us immediate peace of mind regarding safety. Beyond the low student-teacher ratio, seeing our daughter balance rigorous JEE prep with Atma Dhyan meditation proves that Amatir nurtures the soul as much as the mind. It’s the best investment we’ve made for her future.",
      },
      {
        name: "Rauktima Royal, Delhi University",
        role: "Alumna",
        photo: IMG.t1,
        highlight: "Prepared for the Real World",
        sign: "_Rauktima Royal",
        category: "Alumna - Currently at Delhi University",
        details:
          "Amatir gave me more than just the academic edge to crack CUET and enter DU; it gave me the mental discipline of Inner Engineering. While university life is fast-paced, the grounded values and self-reliance I gained at the Gurukul keep me focused and ahead of the curve.",
      },
    ],
    []
  );

  return (
    <>
      {" "}
      <Container>
        <h2
          className="text-center py-10 text-[28px] leading-[34px] text-[color:var(--navy,theme(colors.slate.900))]"
          style={{
            color: "#1C3664",
            fontFamily: '"CentSchbkCyrill BT", serif',
          }}
        >
          In Their Own
          <br />
          Words
        </h2>

        <div className="relative mt-[4vh]">
          {isMobile ? (
            <div className="flex flex-col" style={{ gap: "1.25rem" }}>
              {teachers.map((t, idx) => (
                <article
                  key={t.name + idx}
                  className="rounded-[0.9rem] bg-white shadow-sm overflow-hidden"
                >
                  <div
                    className="relative w-full"
                    style={{ paddingBottom: "100%" }}
                  >
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="px-4 py-3 text-left">
                    <h5
                      className={`${Serif} text-[#1C3664]`}
                      style={{ fontSize: "1.25rem" }}
                    >
                      {t.name}
                    </h5>
                    <p
                      className="text-[#1C3664] mt-1"
                      style={{ fontSize: "0.95rem" }}
                    >
                      {t.role}
                    </p>
                    <span
                      className="block rounded-full bg-[#ED6D23]"
                      style={{
                        height: "0.22rem",
                        width: "3.5rem",
                        marginTop: "0.45rem",
                      }}
                    />
                    <p
                      className="text-[#3a2323] mt-4"
                      style={{ fontSize: "0.95rem", lineHeight: 1.7 }}
                    >
                      {t.details}
                    </p>

                    <h5
                      className={`${Serif} text-[#1C3664] text-right`}
                      style={{ fontSize: "1rem", marginTop: "1rem" }}
                    >
                      {t.sign}
                    </h5>
                    <p
                      className="text-[#1C3664] mt-1 text-right"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {t.category}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <>
              {/* Navigation arrows */}
              <div
                className="absolute right-[32%] -top-[2.6rem] hidden md:flex items-center"
                style={{ gap: "0.6rem" }}
              >
                <button
                  onClick={() => goTo(i - 1)}
                  disabled={i === 0}
                  className="grid place-items-center rounded-full text-white transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    width: "2.2rem",
                    height: "2.2rem",
                    background: "#ED6D23",
                  }}
                  aria-label="Previous"
                >
                  <ChevronLeft style={{ width: "1.1rem", height: "1.1rem" }} />
                </button>
                <button
                  onClick={() => goTo(i + 1)}
                  disabled={
                    i >= teachers.length - (isMobile ? 1 : isTablet ? 2 : 4)
                  }
                  className="grid place-items-center rounded-full text-white transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    width: "2.2rem",
                    height: "2.2rem",
                    background: "#ED6D23",
                  }}
                  aria-label="Next"
                >
                  <ChevronRight style={{ width: "1.1rem", height: "1.1rem" }} />
                </button>
              </div>

              <div ref={wrapRef} className="overflow-hidden">
                <div
                  ref={trackRef}
                  className="grid transition-transform duration-500 ease-out"
                  style={{
                    gridAutoFlow: "column",
                    gridAutoColumns: "1fr",
                    columnGap: isMobile
                      ? "1rem"
                      : isTablet
                        ? "1.2rem"
                        : "clamp(0.9rem,1.2rem,1.2rem)",
                  }}
                >
                  {teachers.map((t, idx) => (
                    <article
                      key={t.name + idx}
                      className="group overflow-hidden rounded-[0.9rem] shadow-md bg-white text-[#1C3664] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                      style={{ minWidth: 0 }}
                    >
                      <div
                        className="relative w-full overflow-hidden"
                        style={{ paddingBottom: "132%" }}
                      >
                        <img
                          src={t.photo}
                          alt={t.name}
                          className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                        />

                        {/* Hover overlay with content */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0E2349]/95 to-[#0E2349]/90 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center p-6 transform translate-y-2 group-hover:translate-y-0">
                          <h5
                            className={`${Serif} font-[500] mb-3 text-center`}
                            style={{
                              fontSize: "clamp(0.945rem,1.08vw,1.2rem)",
                            }}
                          >
                            {t.name}
                          </h5>
                          <p
                            className="mb-4 text-center"
                            style={{
                              whiteSpace: "pre-line",
                              fontSize: "clamp(0.81rem,0.9vw,1rem)",
                            }}
                          >
                            {t.role}
                          </p>
                          <p
                            className="mb-4 text-center"
                            style={{
                              fontSize: "clamp(0.765rem,0.855vw,0.95rem)",
                              lineHeight: 1.6,
                            }}
                          >
                            {t.details}
                          </p>
                        </div>
                      </div>

                      {/* Default card content */}
                      <div className="px-[1rem] pb-[1rem] pt-[0.9rem] text-left bg-white">
                        <h5
                          className={`${Serif} font-[500] text-[#1C3664]`}
                          style={{
                            fontSize: "clamp(0.945rem,1.08vw,1.2rem)",
                          }}
                        >
                          {t.name}
                        </h5>
                        <p
                          className="text-[#3a2323] mt-1"
                          style={{ fontSize: "clamp(0.81rem,0.9vw,1rem)" }}
                        >
                          {t.role}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
    </>
  );
};

/* ---------- MAIN BODY COMPONENT ---------- */
export default function PaidPage() {
  // Responsive media queries for different devices
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isVerySmallScreen = useMediaQuery({ maxWidth: 1024 });
  const isLowHeight = useMediaQuery({ maxHeight: 600 });

  // State for sliding form
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const touchRef = useRef(null);
  const buttonRef = useRef(null);
  const [hideButton, setHideButton] = useState(false);


  useEffect(() => {
    if (!touchRef.current) return;

    const offset = 40;

    const handleScroll = () => {
      const sectionTop =
        touchRef.current.getBoundingClientRect().top + window.scrollY - offset;

      const scrollY = window.scrollY; // adjust for offset

      if (scrollY >= sectionTop) {
        setHideButton(true); // hide from section downward
      } else {
        setHideButton(false); // show again above section
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="w-full overflow-x-hidden">
      <HeroEnquiry buttonRef={buttonRef} hideButton={hideButton} />
      {/* <SlidingForm isVisible={isFormVisible} onClose={() => setIsFormVisible(false)} /> */}
      <WhyTrust />
      <GrowthValues />
      <MobileCampusLifeCarousel />
      <TestimonialSection />
      {/* <InTheirOwnWordsMobile />*/}
      <FeesAndCallback touchRef={touchRef} />
      {/* <ResultsSplit /> */}
      <MobileGallery
        images={[
          ASSET.g_library,
          ASSET.g_hostelMess12,
          ASSET.g_hostelMess09,
          ASSET.g_whatsapp,
          ASSET.g_hostelMess07,
          ASSET.g_img20221023,
          ASSET.g_hostelMess02,
          ASSET.g_hostelMess05,
        ]}
        title="Gallery"
        subtitle=""
      />
      <UnlockCta />
      <MapEmbed />
    </main>
  );
}

// HERO SECTION - Full page with video background
function HeroEnquiry({ onShowForm, buttonRef, hideButton }) {
  // Responsive breakpoints for comprehensive device coverage
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });
  const isSmallHeight = useMediaQuery({ maxHeight: 600 });
  const isVerySmallHeight = useMediaQuery({ maxHeight: 500 });
  const isLargeHeight = useMediaQuery({ minHeight: 900 });
  const isVerySmallScreen = useMediaQuery({ maxWidth: 1024, maxHeight: 600 });

  // Get video object position based on screen size
  const getVideoObjectPosition = () => {
    if (isMobile) return "center 30%"; // Focus on upper portion for mobile
    if (isVerySmallScreen) return "center 25%"; // Focus on upper portion for small laptops
    return "center center"; // Default center for larger screens
  };

  return (
    <section
      className="relative overflow-hidden w-full"
      style={{
        height: "100vh",
        minHeight: isVerySmallScreen ? "400px" : "480px",
      }}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        autoPlay
        muted
        loop
        poster={ASSET.heroPoster}
        style={{
          objectFit: "cover",
          objectPosition: getVideoObjectPosition(),
        }}
      >
        <source
          src={ASSET.heroMobile}
          type="video/mp4"
          media="(max-width: 767px)"
        />
        <source src={ASSET.heroDesktop} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_20%,#002F82_100%)]" />

      {/* Hero content positioned to the left */}
      <div className="relative z-10 h-full flex items-end">
        <div className="w-full px-6 sm:px-8 lg:px-10 xl:px-16 pb-25 sm:pb-12 lg:pb-16 xl:pb-25">
          <div className="text-white max-w-4xl">
            <div className="flex justify-start mb-4">
              <img
                alt="Amatir Icon"
                className="w-[60px] h-auto"
                src={ASSET.heroIcon}
              />
            </div>
            <h1
              className="cent-schbk-cyrill font-semibold mb-4 lg:mb-6"
              style={{
                fontSize: isMobile
                  ? "clamp(1.5rem, 6vw, 2.5rem)"
                  : "clamp(1.8rem, 3.5vw, 3.2rem)",
                lineHeight: 1.1,
                textAlign: "left",
              }}
            >
              Amatir Kanya Gurukul
            </h1>
            <p
              className="univers-regular mb-6 lg:mb-8 opacity-92"
              style={{
                fontSize: isMobile
                  ? "clamp(0.9rem, 4vw, 1.1rem)"
                  : "clamp(1rem, 1.5vw, 1.15rem)",
                textAlign: "left",
              }}
            >
              A Heritage Residential Campus in Kurukshetra, Haryana
            </p>
            <button
              onClick={() => {
                const element = document.getElementById(
                  "request-callback-section"
                );
                if (element) {
                  const offset = 80;
                  const top =
                    element.getBoundingClientRect().top +
                    window.pageYOffset -
                    offset;

                  window.scrollTo({
                    top,
                    behavior: "smooth",
                  });
                }
              }}
              ref={buttonRef}
              className={`inline-flex items-center justify-center shadow-lg transition-transform hover:scale-105 fixed z-[99] top-[95%] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ease-in-out ${hideButton ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              style={{
                background: BRAND.orange,
                color: "#fff",
                padding: isMobile ? "0.8rem 1.4rem" : "0.95rem 1.6rem",
                borderRadius: "2rem",
                fontSize: isMobile
                  ? "clamp(0.9rem, 4vw, 1rem)"
                  : "clamp(0.95rem, 1.2vw, 1.05rem)",
              }}
            >
              Request a Call Back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// WHY PARENTS TRUST — replica of the provided screenshot
function WhyTrust({ touchRef }) {
  const tiles = useMemo(
    () => [
      {
        icon: ASSET.stat1000,
        bg: BRAND.peach,
        value: "1,000+",
        label: <>Alumnae</>,
      },
      {
        icon: ASSET.stat100,
        bg: BRAND.blueTint,
        value: "100+",
        label: <>in-house staff</>,
      },
      {
        icon: ASSET.stat30,
        bg: BRAND.blueTint,
        value: "30+",
        label: <>Acres of Land</>,
      },
      {
        icon: ASSET.statPersonal,
        bg: BRAND.peach,
        value: "Low",
        label: (
          <>
            Student to
            <br />
            teacher ratio.
          </>
        ),
      },
      {
        icon: ASSET.stat200,
        bg: BRAND.peach,
        value: "200+",
        label: <>Medals in Sports</>,
      },
      {
        icon: ASSET.statRated,
        bg: BRAND.blueTint,
        value: "4.5+⭐",
        label: (
          <>
            Google
            <br />
            Ratings(440)
          </>
        ),
      },
    ],
    []
  );

  return (
    <section
      className="whytrust w-screen bg-white"
      style={{ paddingTop: "5rem", paddingBottom: "4rem" }}
    >
      <div className="mx-auto w-[92vw]">
        <h2
          className="cent-schbk-cyrill text-center font-semibold"
          style={{
            color: BRAND.navy,
            fontSize: "clamp(1.25rem,2.8vw,2.25rem)",
            marginBottom: "3.5rem",
          }}
        >
          Why Parents Trust Amatir
        </h2>
        <div
          className="trust-grid grid"
          style={{
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap: "3.5vw",
          }}
        >
          {tiles.map((t, i) => (
            <article
              key={i}
              className="flex flex-col items-center text-center"
              style={{
                background: t.bg,
                borderRadius: "0.6rem",
                padding: "1.2rem 0.9rem 1rem",
                border: `0.08rem solid ${BRAND.border}`,
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "999rem",
                  background: "#fff",
                  marginBottom: "0.9rem",
                }}
              >
                <img
                  src={t.icon}
                  alt=""
                  style={{ width: "1.6rem", height: "1.6rem" }}
                />
              </div>
              <div
                className="cent-schbk-cyrill"
                style={{
                  color: BRAND.navy,
                  fontWeight: 600,
                  fontSize: "clamp(1.1rem,5.8vw,1.5rem)",
                  lineHeight: 1.1,
                }}
              >
                {t.value}
              </div>
              <div
                className="univers-regular"
                style={{
                  color: BRAND.navy,
                  fontSize: "clamp(0.9rem,3.8vw,1rem)",
                  lineHeight: 1.3,
                  marginTop: "0.25rem",
                }}
              >
                {t.label}
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 900px){
          .whytrust .trust-grid{ grid-template-columns: repeat(3, minmax(0,1fr)) !important; gap: 2vw; }
        }
      `}</style>
    </section>
  );
}

// Big “U” image + inverted U overlay + copy
function GrowthValues() {
  return (
    <section
      className="w-screen bg-white"
      style={{ paddingTop: "7vh", paddingBottom: "8vh" }}
    >
      <div className="mx-auto w-[92vw]">
        <h2
          className="cent-schbk-cyrill font-semibold text-center"
          style={{
            color: BRAND.navy,
            fontSize: "clamp(1.6rem,5.8vw,2.6rem)",
            lineHeight: 1.15,
            marginBottom: "2.2vh",
          }}
        >
          A residential school where
          <br /> your daughter grows with
          <br /> values and confidence.
        </h2>

        <p
          className="univers-regular mx-auto"
          style={{
            fontSize: "clamp(0.95rem,3.8vw,1.06rem)",
            lineHeight: 1.8,
            color: BRAND.text,
            maxWidth: "36ch",
            textAlign: "left",
            marginBottom: "2.2rem",
          }}
        >
          At Amatir Kanya Gurukul, your daughter will grow in a safe, all-girls
          campus that feels just like home. From the very first day, she’ll
          learn the values of discipline, independence, and Indian culture in a
          nurturing environment. Our balanced approach ensures that she excels
          not only in academics, but also in sports and the arts. Along the way,
          she’ll develop strong leadership qualities, confidence, and the
          ability to communicate clearly — skills that will support her
          throughout life.
        </p>

        {/* Image cluster: big circle with small inset circle on the right */}
        <div className="relative rounded-full overflow-hidden">
          <img
            src="/images/AffiliationJoinImage_ibdgx9.png"
            alt="Amatir Kanya Gurukul"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

// Voices section removed; replaced by InTheirOwnWordsMobile component

// Fees + Request a Call Back compact block
function FeesAndCallback({touchRef}) {
  // Responsive breakpoints for comprehensive device coverage
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });
  const isSmallHeight = useMediaQuery({ maxHeight: 600 });
  const isVerySmallHeight = useMediaQuery({ maxHeight: 500 });

  const [form, setForm] = useState({
    g: "",
    d: "",
    p: "",
    w: "",
    s: "",
    c: "",
  });
  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Mobile-first: exact Fee Structure layout per screenshot
  const residentialFees = [
    { title: "Grade III to V", amt: "Rs. 2,60,000", perQtr: "Rs. 65,000" },
    { title: "Grade VI to VIII", amt: "Rs. 2,64,000", perQtr: "Rs. 66,000" },
    { title: "Grade IX to X", amt: "Rs. 2,69,400", perQtr: "Rs. 67,350" },
    { title: "Grade XI to XII", amt: "Rs. 2,83,200", perQtr: "Rs. 70,800" },
  ];
  const nonResidentialFees = [
    { title: "Grade III to V", amt: "Rs. 48,000", perQtr: "Rs. 12,000" },
    { title: "Grade VI to VIII", amt: "Rs. 60,000", perQtr: "Rs. 15,000" },
    { title: "Grade IX to X", amt: "Rs. 65,400", perQtr: "Rs. 16,350" },
    { title: "Grade XI to XII", amt: "Rs. 79,200", perQtr: "Rs. 19,800" },
  ];
  if (isMobile) {
    return (
      <section
        className="w-screen bg-white"
        style={{ paddingTop: "6vh", paddingBottom: "6vh" }}
      >
        <div className="mx-auto w-[92vw]">
          <h2
            className="cent-schbk-cyrill font-semibold"
            style={{
              color: BRAND.navy,
              width: "86.11vw", // ~310px on 360px wide screen
              minHeight: "11.39vw", // ~41px on 360px wide screen
              // marginLeft: "9.17vw", // ~33px left offset
              fontSize: "clamp(1.35rem,5.8vw,2rem)",
              lineHeight: 1.15,
              transform: "rotate(0deg)",
              opacity: 1,
              textAlign: "center",
              marginBottom: "1.2rem",
            }}
          >
            Fee Structure
          </h2>

          <h2
            className="cent-schbk-cyrill font-semibold"
            style={{
              color: BRAND.navy,
              width: "86.11vw", // ~310px on 360px wide screen
              minHeight: "11.39vw", // ~41px on 360px wide screen
              // marginLeft: "9.17vw", // ~33px left offset
              fontSize: "clamp(1.35rem,5.8vw,2rem)",
              lineHeight: 1.15,
              transform: "rotate(0deg)",
              opacity: 1,
              textAlign: "left",
              marginBottom: "0.5rem",
            }}
            ref={touchRef}
          >
            Residential:
          </h2>

          <div>
            {residentialFees.map((f, i) => (
              <article
                key={f.title}
                className="rounded"
                style={{
                  background: i % 2 === 0 ? "#FDF0E9" : "#E5EAF2",
                  borderRadius: "0.6rem",
                  padding: "1.1rem 1rem",
                  border: `0.08rem solid ${BRAND.border}`,
                  marginBottom: "0.95rem",
                }}
              >
                <div
                  className="univers-regular"
                  style={{
                    color: BRAND.navy,
                    fontSize: "clamp(0.95rem,3.8vw,1.05rem)",
                    marginBottom: "0.35rem",
                  }}
                >
                  {f.title}
                </div>
                <div
                  className="univers-regular font-semibold"
                  style={{
                    color: "#0B0F19",
                    fontSize: "clamp(1.25rem,6.4vw,1.6rem)",
                    marginBottom: "0.35rem",
                  }}
                >
                  {f.amt}
                </div>
                <div
                  className="univers-regular"
                  style={{
                    color: BRAND.textMuted,
                    fontSize: "clamp(0.9rem,3.5vw,1rem)",
                  }}
                >
                  {f.perQtr}
                </div>
              </article>
            ))}
          </div>
          {/* <h2
            className="cent-schbk-cyrill font-semibold"
            style={{
              color: BRAND.navy,
              width: "86.11vw", // ~310px on 360px wide screen
              minHeight: "11.39vw", // ~41px on 360px wide screen
              // marginLeft: "9.17vw", // ~33px left offset
              fontSize: "clamp(1.35rem,5.8vw,2rem)",
              lineHeight: 1.15,
              transform: "rotate(0deg)",
              opacity: 1,
              textAlign: "left",
              marginBottom: "0.5rem",
              marginTop: "2.5rem",
            }}
          >
            Non Residential:
          </h2> */}

          {/* <div>
            {nonResidentialFees.map((f, i) => (
              <article
                key={f.title}
                className="rounded"
                style={{
                  background: i % 2 === 0 ? "#FDF0E9" : "#E5EAF2",
                  borderRadius: "0.6rem",
                  padding: "1.1rem 1rem",
                  border: `0.08rem solid ${BRAND.border}`,
                  marginBottom: "0.95rem",
                }}
              >
                <div
                  className="univers-regular"
                  style={{
                    color: BRAND.navy,
                    fontSize: "clamp(0.95rem,3.8vw,1.05rem)",
                    marginBottom: "0.35rem",
                  }}
                >
                  {f.title}
                </div>
                <div
                  className="univers-regular font-semibold"
                  style={{
                    color: "#0B0F19",
                    fontSize: "clamp(1.25rem,6.4vw,1.6rem)",
                    marginBottom: "0.35rem",
                  }}
                >
                  {f.amt}
                </div>
                <div
                  className="univers-regular"
                  style={{
                    color: BRAND.textMuted,
                    fontSize: "clamp(0.9rem,3.5vw,1rem)",
                  }}
                >
                  {f.perQtr}
                </div>
              </article>
            ))}
          </div> */}

          <div style={{ marginTop: "1.2rem" }}>
            <div
              className="univers-regular font-semibold"
              style={{
                color: BRAND.text,
                fontSize: "clamp(0.95rem,3.8vw,1rem)",
                marginBottom: "0.35rem",
                fontWeight: 700,
                marginTop: "2rem",
              }}
            >
              Note:
            </div>
            <ul
              className="univers-regular list-disc"
              style={{
                color: BRAND.text,
                fontSize: "clamp(0.9rem,3.6vw,1rem)",
                lineHeight: 1.7,
                paddingLeft: "1.1rem",
              }}
            >
              <li className="text-left">
                Inclusive of School and Hostel Fee for the student.
              </li>
              <li className="text-left">
                Registration Fee: ₹ 25,000 (Only for New Admission –
                Non-Refundable)
              </li>
              <li className="text-left">
                Imprest Money For New Resident Students – ₹ 20,000
              </li>
            </ul>
          </div>

          {/* Right request block */}
          <div className="rounded overflow-hidden">
            <h3
              className="cent-schbk-cyrill text-center font-semibold"
              style={{
                color: BRAND.navy,
                fontSize: "clamp(1.25rem,2.8vw,2.25rem)",
                marginBottom: "3.5rem",
                marginTop: "3.5rem",
              }}
              id="request-callback-section"
            >
              Request a Call Back
            </h3>

            {/* 👇 Container with hidden scrollbar */}
            <div
              className="flex justify-center items-center"
              style={{
                width: "100%",
                height: "100%",
                overflowY: "auto",
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // Edge
              }}
            >
              {/* Hide scrollbar for WebKit browsers */}
              <style>
                {`
              div::-webkit-scrollbar {
                display: none;
              }
            `}
              </style>

              <iframe
                title="Request a Call Back meta form"
                src="https://forms.zohopublic.in/adminama1/form/requestcallbackmeta/formperma/YxsbMPcH8N9bSukz2JouzEC4yUWtmTiOUWqfoRreKPU"
                style={{
                  width: "100%",
                  height: "1150px", // fixed to show full form
                  border: "none",
                  borderRadius: "12px",
                  overflow: "auto", // 🔥 hide Zoho’s own scrollbar
                }}
                scrolling="yes" // 🔥 disable Zoho iframe scrollbar
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Get responsive section padding based on device and height
  const getSectionPadding = () => {
    if (isVerySmallHeight) {
      return { paddingTop: "3vh", paddingBottom: "3vh" };
    }
    if (isSmallHeight) {
      return { paddingTop: "4vh", paddingBottom: "4vh" };
    }
    if (isMobile) {
      return { paddingTop: "5vh", paddingBottom: "5vh" };
    }
    if (isTablet) {
      return { paddingTop: "6vh", paddingBottom: "6vh" };
    }
    return { paddingTop: "7vh", paddingBottom: "7vh" };
  };

  // Get responsive grid gaps
  const getGridGaps = () => {
    if (isMobile) {
      return { columnGap: "0", rowGap: "4vh" };
    }
    if (isTablet) {
      return { columnGap: "1vw", rowGap: "3vh" };
    }
    return { columnGap: "1vw", rowGap: "4vh" };
  };

  // Get responsive fee card sizing
  const getFeeCardSizing = () => {
    if (isMobile) {
      return {
        width: "100%",
        padding: "2vh 2vw",
        titleSize: "clamp(0.9rem, 4vw, 1rem)",
        amountSize: "clamp(1.1rem, 5vw, 1.3rem)",
        quarterSize: "clamp(0.8rem, 3.5vw, 0.9rem)",
        marginBottom: "1.5vh",
      };
    }
    if (isTablet) {
      return {
        width: "calc(50% - 0.5vw)",
        padding: "1.8vh 1.8vw",
        titleSize: "clamp(1rem, 1.6vw, 1.1rem)",
        amountSize: "clamp(1.2rem, 2vw, 1.4rem)",
        quarterSize: "clamp(0.85rem, 1.2vw, 0.95rem)",
        marginBottom: "1.2vh",
      };
    }
    return {
      width: "calc(50% - 0.5vw)",
      padding: "1.6vh 1.6vw",
      titleSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
      amountSize: "clamp(1.3rem, 1.8vw, 1.6rem)",
      quarterSize: "clamp(0.9rem, 1vw, 0.95rem)",
      marginBottom: "1vh",
    };
  };

  // Get responsive form sizing
  const getFormSizing = () => {
    if (isVerySmallHeight) {
      return {
        padding: "2vh 2vw",
        titleSize: "clamp(1rem, 3vw, 1.2rem)",
        titleMargin: "1.5vh",
        gap: "1.2vh",
        inputSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
        labelSize: "clamp(0.75rem, 2vw, 0.85rem)",
        inputPadding: "0.7rem 1rem",
        labelMargin: "0.5vh",
        buttonPadding: "0.7rem 1.4rem",
        buttonSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
        buttonMargin: "1vh",
      };
    }
    if (isSmallHeight) {
      return {
        padding: "2.5vh 2.2vw",
        titleSize: "clamp(1.1rem, 3.5vw, 1.3rem)",
        titleMargin: "1.8vh",
        gap: "1.4vh",
        inputSize: "clamp(0.85rem, 2.8vw, 0.95rem)",
        labelSize: "clamp(0.8rem, 2.2vw, 0.9rem)",
        inputPadding: "0.8rem 1.1rem",
        labelMargin: "0.6vh",
        buttonPadding: "0.8rem 1.6rem",
        buttonSize: "clamp(0.85rem, 2.8vw, 0.95rem)",
        buttonMargin: "1.2vh",
      };
    }
    if (isMobile) {
      return {
        padding: "3vh 2.5vw",
        titleSize: "clamp(1.2rem, 4vw, 1.4rem)",
        titleMargin: "2vh",
        gap: "1.6vh",
        inputSize: "clamp(0.9rem, 3.5vw, 1rem)",
        labelSize: "clamp(0.85rem, 3vw, 0.95rem)",
        inputPadding: "0.9rem 1.2rem",
        labelMargin: "0.7vh",
        buttonPadding: "0.9rem 1.8rem",
        buttonSize: "clamp(0.9rem, 3.5vw, 1rem)",
        buttonMargin: "1.4vh",
      };
    }
    if (isTablet) {
      return {
        padding: "3.5vh 2.5vw",
        titleSize: "clamp(1.3rem, 2.2vw, 1.5rem)",
        titleMargin: "2.2vh",
        gap: "1.8vh",
        inputSize: "clamp(0.95rem, 1.3vw, 1.05rem)",
        labelSize: "clamp(0.9rem, 1.1vw, 1rem)",
        inputPadding: "1rem 1.3rem",
        labelMargin: "0.8vh",
        buttonPadding: "1rem 2rem",
        buttonSize: "clamp(0.95rem, 1.3vw, 1.05rem)",
        buttonMargin: "1.6vh",
      };
    }
    return {
      padding: "3vh 2.2vw",
      titleSize: "clamp(1.3rem, 1.8vw, 1.6rem)",
      titleMargin: "2vh",
      gap: "1.6vh",
      inputSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
      labelSize: "clamp(0.9rem, 1.05vw, 1rem)",
      inputPadding: "1rem 1.2rem",
      labelMargin: "0.6vh",
      buttonPadding: "0.9rem 1.8rem",
      buttonSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
      buttonMargin: "1.2vh",
    };
  };

  // Get responsive notes section sizing
  const getNotesSizing = () => {
    if (isMobile) {
      return {
        padding: "2vh 2vw",
        maxWidth: "100%",
        titleSize: "clamp(0.9rem, 4vw, 1rem)",
        titleMargin: "1.2vh",
        textSize: "clamp(0.8rem, 3.5vw, 0.9rem)",
        lineHeight: 1.7,
        marginBottom: "2vh",
      };
    }
    if (isTablet) {
      return {
        padding: "1.8vh 1.8vw",
        maxWidth: "100%",
        titleSize: "clamp(0.95rem, 1.2vw, 1rem)",
        titleMargin: "1vh",
        textSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
        lineHeight: 1.75,
        marginBottom: "1.8vh",
      };
    }
    return {
      padding: "1.6vh 1.6vw",
      maxWidth: "100%",
      titleSize: "clamp(0.95rem, 1.05vw, 1rem)",
      titleMargin: "1vh",
      textSize: "clamp(0.9rem, 1.02vw, 0.98rem)",
      lineHeight: 1.8,
      marginBottom: "2vh",
    };
  };

  const sectionPadding = getSectionPadding();
  const gridGaps = getGridGaps();
  const feeCardSizing = getFeeCardSizing();
  const formSizing = getFormSizing();
  const notesSizing = getNotesSizing();

  const FeeCard = ({ title, amt }) => (
    <div
      className="rounded"
      style={{
        background: BRAND.peach,
        border: `0.08rem solid ${BRAND.border}`,
        padding: feeCardSizing.padding,
        width: feeCardSizing.width,
        marginBottom: feeCardSizing.marginBottom,
      }}
    >
      <div
        className="univers-regular text-[#4b5b7a]"
        style={{
          fontSize: feeCardSizing.titleSize,
          marginBottom: "0.8vh",
        }}
      >
        {title}
      </div>
      <div
        className="univers-regular font-semibold"
        style={{
          color: BRAND.navy,
          fontSize: feeCardSizing.amountSize,
        }}
      >
        {amt}
      </div>
      <div
        className="univers-regular mt-[0.6vh]"
        style={{
          color: BRAND.textMuted,
          fontSize: feeCardSizing.quarterSize,
        }}
      >
        Rs. 57,000 / quarter
      </div>
    </div>
  );

  // Adjust the section to take up 75% of the height
  const sectionStyle = {
    ...sectionPadding,
    height: "auto", // Adjust the height to 75% of the viewport height
  };

  // Update the background colors
  const leftBoxStyle = {
    background: "white", // New background color for the left box
    border: `0.08rem solid ${BRAND.border}`,
    padding: notesSizing.padding,
    maxWidth: notesSizing.maxWidth,
    marginBottom: notesSizing.marginBottom,
    width: "100%",
  };

  const rightBoxStyle = {
    background: "#E5EAF2", // New background color for the right box
    border: `0.08rem solid ${BRAND.border}`,
    padding: formSizing.padding,
    width: "100%",
  };

  // Update the rest of the boxes
  const otherBoxStyle = {
    backgroundColor: "#FDF0E9", // New background color for the other boxes
    border: `0.08rem solid ${BRAND.border}`,
    padding: feeCardSizing.padding,
    width: feeCardSizing.width,
    marginBottom: feeCardSizing.marginBottom,
  };

  const otherBoxStyle2 = {
    background: "#E5EAF2", // New background color for the other boxes
    border: `0.08rem solid ${BRAND.border}`,
    padding: feeCardSizing.padding,
    width: feeCardSizing.width,
    marginBottom: feeCardSizing.marginBottom,
  };

  return (
    <section className="w-screen bg-white" style={sectionStyle}>
      <div
        className="mx-auto grid"
        style={{
          width: "80vw",
          gridTemplateColumns: isMobile ? "1fr" : "40% 40%",
          columnGap: gridGaps.columnGap,
          rowGap: gridGaps.rowGap,
          justifyContent: "center",
        }}
      >
        {/* Left fee blocks + notes */}
        <div className="grid" style={{ rowGap: isMobile ? "3vh" : "2vh" }}>
          <div
            className={isMobile ? "grid grid-cols-1 gap-1vh" : "flex"}
            style={{ gap: isMobile ? "3vh" : "1vw" }}
          >
            <FeeCard
              title="Grade III to V"
              amt="Rs. 2,30,800"
              style={otherBoxStyle}
            />
            <FeeCard
              className="bg-[#E5EAF2]"
              title="Grade VI to VIII"
              amt="Rs. 2,34,960"
              style={otherBoxStyle2}
            />
          </div>
          <div
            className={isMobile ? "grid grid-cols-1 gap-3vh" : "flex"}
            style={{ gap: isMobile ? "3vh" : "1vw" }}
          >
            <FeeCard
              title="Grade IX to X"
              amt="Rs. 2,39,400"
              style={otherBoxStyle2}
            />
            <FeeCard
              title="Grade XI to XII"
              amt="Rs. 2,52,000"
              style={otherBoxStyle}
            />
          </div>

          <div className="" style={leftBoxStyle}>
            <div
              className="univers-regular font-semibold"
              style={{
                fontSize: notesSizing.titleSize,
                marginBottom: notesSizing.titleMargin,
                textAlign: "left",
              }}
            >
              Note:
            </div>
            <ul
              className="univers-regular list-disc pl-[1.2rem]"
              style={{
                color: BRAND.textMuted,
                fontSize: notesSizing.textSize,
                lineHeight: notesSizing.lineHeight,
                textAlign: "left",
              }}
            >
              <li>
                Inclusive of School Fee, Hostel Fee, Uniforms, Textbooks and
                year-round personal shopping for students.
              </li>
              <li>
                Registration Fee: ₹ 22,000 (Only for New Admission –
                Non-Refundable)
              </li>
              <li>Imprest Money For New Resident Students – ₹ 20,000</li>
            </ul>
          </div>
        </div>

        {/* Right request block */}
        <div className="rounded" style={rightBoxStyle}>
          <h3
            className="cent-schbk-cyrill font-semibold"
            style={{
              color: BRAND.navy,
              fontSize: formSizing.titleSize,
              marginBottom: formSizing.titleMargin,
            }}
          >
            Request a Call Back
          </h3>
          <form
            className="grid"
            style={{ gap: formSizing.gap }}
            onSubmit={(e) => e.preventDefault()}
          >
            <LabelInput
              label="Guardian Name*"
              name="g"
              value={form.g}
              onChange={onChange}
              fontSize={formSizing.inputSize}
              labelSize={formSizing.labelSize}
              inputPadding={formSizing.inputPadding}
              labelMargin={formSizing.labelMargin}
            />
            <LabelInput
              label="Daughter's name*"
              name="d"
              value={form.d}
              onChange={onChange}
              fontSize={formSizing.inputSize}
              labelSize={formSizing.labelSize}
              inputPadding={formSizing.inputPadding}
              labelMargin={formSizing.labelMargin}
            />
            <LabelInput
              label="Phone Number*"
              name="p"
              value={form.p}
              onChange={onChange}
              fontSize={formSizing.inputSize}
              labelSize={formSizing.labelSize}
              inputPadding={formSizing.inputPadding}
              labelMargin={formSizing.labelMargin}
            />
            <LabelInput
              label="Whatsapp Number"
              name="w"
              value={form.w}
              onChange={onChange}
              fontSize={formSizing.inputSize}
              labelSize={formSizing.labelSize}
              inputPadding={formSizing.inputPadding}
              labelMargin={formSizing.labelMargin}
            />
            <div
              className={
                isMobile ? "grid grid-cols-1 gap-2vh" : "grid grid-cols-2"
              }
              style={{ gap: isMobile ? "2vh" : "2%" }}
            >
              <Select
                label="State*"
                name="s"
                placeholder="Please Select one"
                value={form.s}
                onChange={onChange}
                fontSize={formSizing.inputSize}
                labelSize={formSizing.labelSize}
                inputPadding={formSizing.inputPadding}
                labelMargin={formSizing.labelMargin}
                options={FORM_DATA.states}
              />
              <Select
                label="Class*"
                name="c"
                placeholder="Please Select one"
                value={form.c}
                onChange={onChange}
                fontSize={formSizing.inputSize}
                labelSize={formSizing.labelSize}
                inputPadding={formSizing.inputPadding}
                labelMargin={formSizing.labelMargin}
                options={FORM_DATA.classes}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
              style={{
                background: BRAND.orange,
                color: "#fff",
                padding: formSizing.buttonPadding,
                borderRadius: "999rem",
                marginTop: formSizing.buttonMargin,
                fontSize: formSizing.buttonSize,
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// Board/Comp results split with overlays
function ResultsSplit() {
  const [expandedCard, setExpandedCard] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 980 });

  const handleCardClick = (cardType) => {
    if (isMobile) {
      setExpandedCard(expandedCard === cardType ? null : cardType);
    }
  };

  const getCardHeight = (cardType) => {
    if (!isMobile) return "min(32vh, 30rem)";
    return expandedCard === cardType ? "min(60vh, 50rem)" : "min(20vh, 15rem)";
  };

  const getOverlayOpacity = (cardType) => {
    if (!isMobile) return cardType === "board" ? 0.85 : 0.75;
    return expandedCard === cardType ? 0.3 : cardType === "board" ? 0.85 : 0.75;
  };

  return (
    <section
      className="w-screen bg-[#F5F5F5]"
      style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
    >
      <div
        className="mx-auto grid w-[92vw]"
        style={{
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "1rem" : "0vw",
        }}
      >
        {/* Left - Board Exam Result */}
        <div
          className="relative block overflow-hidden cursor-pointer transition-all duration-500 ease-in-out"
          style={{
            height: getCardHeight("board"),
            gridColumn: isMobile ? "1" : "1",
          }}
          onClick={() => handleCardClick("board")}
        >
          <img
            src={ASSET.resultsLeft}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out"
          />
          <div
            className="absolute inset-0 transition-all duration-500 ease-in-out"
            style={{
              background: `rgba(28,54,100,${getOverlayOpacity("board")})`,
            }}
          />
          <span
            className="univers-regular absolute inset-0 grid place-items-center text-white font-medium transition-all duration-300 ease-in-out"
            style={{ fontSize: "clamp(1.1rem,1.8vw,1.4rem)" }}
          >
            Board Exam Result
          </span>
          {isMobile && (
            <div className="absolute bottom-4 right-4 text-white opacity-70">
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${expandedCard === "board" ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Right - Comp Exam Result */}
        <div
          className="relative block overflow-hidden cursor-pointer transition-all duration-500 ease-in-out"
          style={{
            height: getCardHeight("comp"),
            gridColumn: isMobile ? "1" : "2",
          }}
          onClick={() => handleCardClick("comp")}
        >
          <img
            src={ASSET.resultsRight}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out"
          />
          <div
            className="absolute inset-0 transition-all duration-500 ease-in-out"
            style={{
              background: `rgba(237,109,35,${getOverlayOpacity("comp")})`,
            }}
          />
          <span
            className="univers-regular absolute inset-0 grid place-items-center text-white font-medium transition-all duration-300 ease-in-out"
            style={{ fontSize: "clamp(1.1rem,1.8vw,1.4rem)" }}
          >
            Comp Exam Result
          </span>
          {isMobile && (
            <div className="absolute bottom-4 right-4 text-white opacity-70">
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${expandedCard === "comp" ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Unlock CTA + map will follow
function UnlockCta() {
  return (
    <section className="relative w-screen">
      <div className="relative overflow-hidden" style={{ minHeight: "28vh" }}>
        <img
          src={ASSET.unlockBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(237,109,35,0.92)" }}
        />
        <div className="relative mx-auto w-[92vw] py-[6vh] text-center text-white">
          <h3
            className="cent-schbk-cyrill font-medium"
            style={{
              fontSize: "clamp(1.25rem,2.2vw,1.8rem)",
              marginBottom: "1vh",
            }}
          >
            Unlock her future!
          </h3>
          <p
            className="univers-regular"
            style={{
              fontSize: "clamp(0.95rem,1.1vw,1rem)",
              opacity: 0.95,
              marginBottom: "2vh",
            }}
          >
            Guided by Dharma, Prepared for the World.
          </p>
          <a
            href="/FEE_STRUCTURE_2025-26.pdf"
            className="inline-flex items-center justify-center"
            style={{
              padding: "0.9rem 1.8rem",
              borderRadius: "999rem",
              background: "#0D2347",
              color: "#fff",
              fontSize: "clamp(0.95rem,1.1vw,1rem)",
            }}
            target="_blank"
          >
            Fee Structure
          </a>
        </div>
      </div>
    </section>
  );
}

// Map embed (body only — footer excluded)
function MapEmbed() {
  return (
    <section
      className="w-screen bg-white"
      style={{ paddingTop: "0vh", paddingBottom: "0vh" }}
    >
      <div className="mx-auto w-[100vw]">
        <iframe
          title="Amatir Kanya Gurukul Map"
          className="w-full"
          style={{ height: "60vh" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3428.468312073812!2d76.841!3d29.9909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3911a9e7b137a2e3%3A0x9a2b19b0d3f4a0f2!2sAmatir%20Kanya%20Gurukul!5e0!3m2!1sen!2sin!4v1680000000000"
        />
      </div>
    </section>
  );
}
