import React, { useRef, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Cloud, MessageSquareQuote } from "lucide-react"; // for Ethical Dialogues icon
import Gallery from "../components/Gallery";
import NutritiousSatvikFood from "../components/NutritiousSatvikFood";
import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO";
/** Local assets */
const CLOUD = {
  // Hero
  heroBg: "/images/AMATIR_6_kphsdu.jpg",
  orangeIcon: "/images/Orange_Icon_i299iz.svg",

  // Home Away
  homeAwayBg: "/images/Rectangle_63_eof7qs.jpg",

  // Amenities
  amenities_ac: "/images/Central-Air-Conditioning-System.jpg",
  amenities_wifi: "/images/Dormitories_with_wI-FI_mvn6xz.jpg",
  amenities_safety: "/images/Safety_surveillance_irayl8.jpg",
  amenities_laundry: "/images/Laundry_facilities_irp8cf.jpg",
  amenities_phone: "/images/Phone_Access_points_tzdpnx.jpg",

  // Chetna / reused photos
  pillarsImg: "/images/Rectangle_35_m0delr.jpg",
  glimpseThumb: "/images/Rectangle_91_xztylc.jpg",
  nutritionImg: "/images/Rectangle_98_quqoet.jpg",

  // Happiness
  hc1: "/images/Health_committee_u7z1pw.jpg",
  hc2: "/images/Discipline_committee_cobjri.jpg",
  hc3: "/images/Fun_committee_omswze.jpg",
  hc4: "/images/Mess_committee_ylamxv.jpg",
  hc5: "/images/Rectangle_77_ph4zzf.jpg",

  // Gallery (updated with new images, excluding restricted ones)
  g1: "/images/Boardinggallery1_ugblpr.jpg",
  g2: "/images/Boardinggal_rboyjb.jpg",
  g3: "/images/Boardinggallery2_xda2v6.jpg",
  g4: "/images/Hostel-Mess07_ye58ti.jpg",
  g5: "/images/059A9848_wnterv.jpg",
  g6: "/images/4_2_1_hraipr.jpg",
  g7: "/images/boardinggallery01_vuouzm.jpg",
  g8: "/images/Hostel-Kitchen02_gkjsof.jpg",

  // CTA backgrounds
  ctaOrange: "/images/Rectangle_78_qtbute.jpg",
  ctaBlue: "/images/Rectangle_80_z1xymb.jpg",

  // Programs & Practices icons (3 provided)
  progCounsel: "/images/IndividualCounselingIcon_ua8nfd.png",
  progWorkshops: "/images/GroupWorkShopsIcon_xlibd4.png",
  progMindful: "/images/MindfullnessIcon_v23vdl.png",
  progEthical: "/images/EthicalDialoguesIcon_d6q0yn.png",
};

const brand = {
  navy: "#1C3664",
  deepNavy: "#0E2349",
  orange: "#ED6D23",
  light: "#F5F5F5",
};

/* ---------- Utilities & shared ---------- */
function SectionTitle({ title, subtitle, center = true }) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2
        className="font-[400] text-[44px] leading-[1.2] text-[#1C3664] text-center"
        style={{
          fontStyle: "normal",
          letterSpacing: "0%",
        }}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 text-[#3A2323] text-[16px] md:text-[18px] max-w-[820px] mx-auto">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function CTA({ title, subtitle, button, tone, bgImg, link, target }) {
  const overlay =
    tone === "orange"
      ? "bg-[rgba(237,109,35,0.78)]"
      : "bg-[rgba(28,54,100,0.85)]";
  return (
    <section className="relative">
      <img
        src={bgImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="relative mx-auto w-[92%] max-w-[1100px] py-12 md:py-16 text-center text-white">
        <h3 className="cent-schbk-cyrill">{title}</h3>
        <p className="mt-2 opacity-90">{subtitle}</p>
        <Link
          to={link}
          className="mt-6 inline-flex items-center justify-center px-6 py-2 rounded-full transition shadow-sm hover:opacity-90 cursor-pointer"
          style={{
            backgroundColor: tone === "orange" ? brand.deepNavy : brand.orange,
            color: "white",
          }}
          target={target}
        >
          {button}
        </Link>
      </div>
    </section>
  );
}

/* ---------- Hero + earlier sections (kept) ---------- */

function HomeAway() {
  return (
    <section className=" bg-white">
      <div className="mx-auto w-[92%] max-w-[1290px]">
        <div className="relative overflow-hidden rounded md:rounded-none">
          <img
            src={CLOUD.homeAwayBg}
            alt=""
            className="w-full h-[220px] md:h-[300px] object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(237,109,35,0.86)" }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <div className="max-w-4xl text-white">
              <h3 className="cent-schbk-cyrill">Your Home Away From Home</h3>
              <p className="mt-3 md:mt-4 text-[14px] md:text-[16px] leading-relaxed">
                At Amatir, over 300 girls from across India live in a safe,
                caring, and structured environment—fostering growth,
                independence, and lifelong friendships.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const AMENITY_ITEMS = [
  {
    key: "ac",
    title: "Central AC with Cooling & Heating",
    img: CLOUD.amenities_ac,
    desc: "Spacious, well-ventilated gurukul hostel buildings equipped with central cooling and heating ensure year-round comfort.",
  },
  {
    key: "wifi",
    title: "Dormitories with Wi-Fi",
    img: CLOUD.amenities_wifi,
    desc: "Each dormitory is equipped with secure Wi-Fi, allowing students to use their personal tablets for researched based learning.",
  },
  {
    key: "safety",
    title: "Safety Surveillance",
    img: CLOUD.amenities_safety,
    desc: "Round-the-clock security with CCTV surveillance and trained guards provides a safe girls boarding school experience, where parents can rest assured about their child's well-being.",
  },
  {
    key: "laundry",
    title: "Dedicated Laundry Facilities",
    img: CLOUD.amenities_laundry,
    desc: "Modern laundry services ensure hygiene, convenience, and independence as part of the hostel routine for girls.",
  },
  {
    key: "phone",
    title: "Phone Access Points",
    img: CLOUD.amenities_phone,
    desc: "Speed-dial contacts mapped for safe, direct connection with home.",
  },
];

function AmenitiesBlock() {
  const [active, setActive] = useState("ac");
  const activeItem =
    AMENITY_ITEMS.find((i) => i.key === active) || AMENITY_ITEMS[0];

  return (
    <section
      className="py-12 md:py-16"
      style={{ backgroundColor: brand.light }}
    >
      <div className="mx-auto w-[92%] max-w-[1290px]">
        <SectionTitle
          title="Amenities"
          subtitle="Explore thoughtfully designed spaces and services that ensure comfort, safety, and well-being, making our boarding experience truly exceptional."
        />

        <div className="mt-10 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 items-start">
          {/* Left image with fade on change */}
          <div className="relative rounded-xl overflow-hidden shadow-sm">
            <style>{`
              @keyframes fadeIn { from {opacity: 0;} to {opacity: 1;} }
              .animate-fadeIn { animation: fadeIn .35s ease-out; }
            `}</style>
            <img
              key={activeItem.img}
              src={activeItem.img}
              alt={activeItem.title}
              className="w-full h-[300px] md:h-[360px] object-cover animate-fadeIn"
            />
          </div>

          {/* Right tab list */}
          <div className="relative">
            {/* faint vertical guide line */}
            <div className="absolute left-2 top-0 bottom-0 w-px bg-[#D9DFEA]" />

            <ul className="space-y-4 pl-0">
              {AMENITY_ITEMS.map((i) => {
                const isActive = i.key === active;
                return (
                  <li key={i.key}>
                    <button
                      onClick={() => setActive(i.key)}
                      className="w-full text-left cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className="mt-2 h-5 w-[3px] rounded"
                          style={{
                            backgroundColor: isActive
                              ? brand.orange
                              : "transparent",
                          }}
                        />
                        <div>
                          <h4
                            className={`univers-regular ${isActive ? "text-[#1C3664]" : "text-[#B7BFCC]"
                              } text-left`}
                            style={{
                              textAlign: "left",
                            }}
                          >
                            {i.title}
                          </h4>

                          {isActive && (
                            <p className="mt-3 text-[14px] text-[#3A2323] m">
                              {i.desc}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const CHETNA = [
  {
    title: "Emotional Well-being",
    img: "/images/Emotional_wellbeing_fzxout.jpg",
    desc: "Helping each girl understand her feelings, manage stress, and feel calm and confident—so she can face challenges without feeling overwhelmed.",
  },
  {
    title: "Social Well-being",
    img: "/images/social_wellbeing-team_work_woh9rj.jpg",
    desc: "Encouraging strong friendships, kind communication, and teamwork—creating a safe, supportive sisterhood.",
  },
  {
    title: "Cognitive Well-being",
    img: "/images/cognitive_wellbeing-confidence_vqfbne.jpg",
    desc: "Improving focus, clear thinking, and smart decision-making—so she can learn better and solve everyday problems with confidence.",
  },
  {
    title: "Ethics & Integrity",
    img: "/images/Ethics_Integrity_sfkdy8.jpg",
    desc: "Instilling honesty, responsibility, and values—so each girl grows into a grounded, principled young woman.",
  },
];

function ChetnaPrabha() {
  return (
    <section id="chetna-prabha" className="py-12 md:py-16 bg-white">
      <div className="mx-auto w-[92%] max-w-[1290px]">
        <SectionTitle
          title="Chetna Prabha"
          subtitle="Our signature initiative dedicated to empowering young minds through holistic development and self-awareness."
        />
        <p className="text-center cent-schbk-cyrill text-[#ED6D23] mt-6">
          At The Heart
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHETNA.map((c, idx) => (
            <div
              key={idx}
              className="group relative rounded-md overflow-hidden shadow-sm"
            >
              <img
                src={c.img}
                alt={c.title}
                className="w-full h-[240px] md:h-[260px] object-cover"
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-2 text-white"
                style={{ backgroundColor: brand.orange }}
              >
                <span className="univers-regular">{c.title}</span>
              </div>
              <div
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
                style={{ backgroundColor: "rgba(237,109,35,0.92)" }}
              >
                <div className="h-full w-full p-5 text-white flex flex-col">
                  <h4 className="univers-regular leading-tight">{c.title}</h4>
                  <p className="mt-2 text-[14px] leading-snug">{c.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- NEW: Programs & Practices (blue band) ---------- */
const PROGRAMS = [
  {
    title: "Individual Counseling",
    desc: "One-on-one support to help girls talk about their feelings, handle challenges, and build confidence in a safe, private space.",
    iconImg: CLOUD.progCounsel,
  },
  {
    title: "Group Workshops",
    desc: "Interactive sessions where girls learn life skills—like handling peer pressure, building self-esteem, and speaking up with confidence.",
    iconImg: CLOUD.progWorkshops,
  },
  {
    title: "Mindfulness",
    desc: "Simple daily meditation, reflection, or quiet time to help girls feel calm, focused, and balanced.",
    iconImg: CLOUD.progMindful,
  },
  {
    title: "Ethical Dialogues",
    desc: "Heartfelt conversations inspired by Indian values that help girls think about right and wrong, purpose, and the kind of person they want to become.",
    iconImg: CLOUD.progEthical,
  },
];

function ProgramsPractices() {
  return (
    <section
      className="py-14 md:py-20"
      style={{ backgroundColor: brand.deepNavy, color: "white" }}
    >
      <div className="mx-auto w-[92%] max-w-[1290px]">
        <h2 className="cent-schbk-cyrill text-[#ED6D23] text-center">
          Programs and Practices
        </h2>
        <p className="mt-3 text-center max-w-3xl mx-auto opacity-90">
          Includes training for teachers and staff to support adolescent
          well-being with empathy.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROGRAMS.map((p, idx) => (
            <div key={idx} className="text-center px-3">
              <div
                className="mx-auto mb-4 grid place-items-center w-14 h-14 rounded-md border-2"
                style={{ borderColor: "rgba(255,255,255,0.7)" }}
              >
                {p.iconImg ? (
                  <img
                    src={p.iconImg}
                    alt=""
                    className="w-7 h-7 object-contain"
                  />
                ) : (
                  <MessageSquareQuote className="w-7 h-7" aria-hidden />
                )}
              </div>
              <h3 className="univers-regular">{p.title}</h3>
              <p className="mt-2 text-sm opacity-90">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- NEW: Pillars of Care (tabs + fade image) ---------- */
const PILLARS = [
  {
    key: "sanrakshika",
    title: "Sanrakshika",
    desc: "Compassionate protectors, our Sanrakshikas are dedicated female caretakers who ensure safety, structure, and discipline—offering protective care.",
    img: "/images/sanrakshika_czakl0.jpg",
  },
  {
    key: "samposhini",
    title: "Samposhini",
    desc: "A nurturing guide and counsellor, our Samposhini offers motherly care—providing emotional support, daily guidance, and heartfelt mentorship to help each child grow with confidence and clarity.",
    img: "/images/Rectangle_70_haob7j.jpg",
  },
  {
    key: "marg",
    title: "Marg Darshini",
    desc: "Senior students mentor younger ones, building leadership, responsibility, and empathy through peer learning.",
    img: "/images/Marg_Darshini_1_hn7ucq.jpg",
  },
  {
    key: "tutoring",
    title: "Tutoring",
    desc: "Personalized Mentorship in both scholastic and co-scholastic subjects.",
    img: "/images/tutoring1_nh39ez.jpg",
  },
  {
    key: "weekend",
    title: "Weekend Leisure",
    desc: "Regular indoor games, weekend movie screenings, and light recreational activities.",
    img: "/images/weekendleisure01_ugl8b3.jpg",
  },
];

function PillarsTabs() {
  const [active, setActive] = useState("sanrakshika");
  const activeItem = PILLARS.find((p) => p.key === active) || PILLARS[2];

  return (
    <section
      id="pillars-of-care"
      className="py-12 md:py-16"
      style={{ backgroundColor: brand.light }}
    >
      <div className="mx-auto w-[92%] max-w-[1290px]">
        <SectionTitle
          title="Pillars of Care"
          subtitle="From daily care to guided learning and weekend fun, we support your child's growth—both inside and outside the classroom."
        />

        <div className="mt-10 grid md:grid-cols-2 gap-10 items-start">
          {/* Left image with fade-in on change */}
          <div className="relative rounded-xl overflow-hidden shadow-sm">
            <style>{`
              @keyframes fadeIn { from {opacity: 0} to {opacity: 1} }
              .animate-fadeIn { animation: fadeIn .35s ease-out; }
            `}</style>
            <img
              key={activeItem.img + active}
              src={activeItem.img}
              alt={activeItem.title}
              className="w-full h-[300px] md:h-[360px] object-cover animate-fadeIn"
            />
          </div>

          {/* Right tab list */}
          <div className="relative">
            {/* faint vertical guide line */}

            <ul className="space-y-4 pl-0">
              {PILLARS.map((p) => {
                const isActive = p.key === active;
                return (
                  <li key={p.key}>
                    <button
                      onClick={() => setActive(p.key)}
                      className="w-full text-left cursor-pointer flex items-start gap-3"
                    >
                      <span
                        className="mt-2 h-5 w-[3px] rounded flex-shrink-0"
                        style={{
                          backgroundColor: isActive
                            ? brand.orange
                            : "transparent",
                        }}
                      />
                      <div>
                        <h4
                          className={`univers-regular font-semibold text-[20px] md:text-[22px] mb-2 text-left ${isActive ? "text-[#1C3664]" : "text-[#B7BFCC]"
                            }`}
                          style={{
                            textAlign: "left",
                          }}
                        >
                          {p.title}
                        </h4>

                        {isActive && (
                          <p className="mt-1 text-[14px] text-[#3A2323] max-w-prose">
                            {p.desc}
                          </p>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Happiness (kept from your last version) ---------- */
function ArrowCircle({ dir = "left", onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Previous" : "Next"}
      className="w-11 h-11 rounded-full border-2 flex items-center justify-center transition hover:bg-[#ED6D23] hover:text-white cursor-pointer"
      style={{ borderColor: brand.orange, color: brand.orange }}
    >
      <span className="text-xl leading-none">{dir === "left" ? "‹" : "›"}</span>
    </button>
  );
}
function HappinessCarousel({ cards }) {
  const ref = useRef(null);
  const CARD_W = 290,
    GAP = 28;
  const scrollBy = (dir) =>
    ref.current?.scrollBy({ left: dir * (CARD_W + GAP), behavior: "smooth" });

  return (
    <div className="relative mt-10">
      <div
        ref={ref}
        className="flex gap-7 overflow-x-auto no-scrollbar scroll-smooth"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {cards.map((c, i) => (
          <a
            key={i}
            href="#"
            className="group shrink-0 w-[290px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative rounded-md overflow-hidden">
              <img
                src={c.img}
                alt={c.title}
                className="block w-full h-[260px] object-cover"
                draggable="false"
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-2 text-white pointer-events-none"
                style={{ backgroundColor: brand.orange }}
              >
                <span className="univers-regular">{c.title}</span>
              </div>
              <div
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
                style={{ backgroundColor: "rgba(237,109,35,0.96)" }}
              >
                <div className="h-full w-full p-5 text-white flex flex-col">
                  <h4 className="univers-regular leading-tight">{c.title}</h4>
                  <p className="mt-2 text-[14px] leading-snug">
                    {c.excerpt ||
                      "Student committee managing initiatives and shared spaces."}
                  </p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="flex gap-4 justify-end mt-6 ">
        <ArrowCircle dir="left" onClick={() => scrollBy(-1)} />
        <ArrowCircle dir="right" onClick={() => scrollBy(1)} />
      </div>
    </div>
  );
}
const HCARDS = [
  {
    img: CLOUD.hc1,
    title: "Health Committee",
    excerpt:
      "Looks after students’ well-being through regular check-ups, health awareness, and support during illness.",
  },
  {
    img: CLOUD.hc2,
    title: "Discipline Committee",
    excerpt:
      "Maintains order and responsibility—making sure everyone follows routines, eats well, and respects shared spaces.",
  },
  {
    img: CLOUD.hc3,
    title: "Fun Committee",
    excerpt:
      "Plans events, games, and celebrations that everyone can enjoy together.",
  },
  {
    img: CLOUD.hc4,
    title: "Mess Committee",
    excerpt:
      "Manages meals with care—overseeing serving, cleanliness, and ensuring no food is wasted.",
  },
  {
    img: CLOUD.hc5,
    title: "Grooming Committee",
    excerpt:
      "Ensures cleanliness, proper uniform, and personal hygiene through weekend checks and grooming activities.",
  },
];

/* ---------- Gallery (kept equal-height layout from earlier) ---------- */

/* ======================= PAGE ======================= */
export default function BoardingPage() {
  useSEO({
    title: 'Girls Boarding & Hostel Facilities | Amatir Kanya Gurukul',
    description: 'Discover safe and comfortable boarding facilities at Amatir Kanya Gurukul in Haryana. Secure hostels, nutritious meals, 24/7 care and a nurturing environment for girls.',
    keywords: ''
  });
  // Responsive media queries for different devices
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isVerySmallScreen = useMediaQuery({ maxWidth: 1024 });
  const isLowHeight = useMediaQuery({ maxHeight: 600 });
  const [showVideo, setShowVideo] = useState(false);

  // Handle scroll to hash on page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#chetna-prabha" || hash === "#pillars-of-care") {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1)); // Remove the # from hash
        if (element) {
          const headerHeight = 88; // Account for header height
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 200); // Slightly longer delay for page load
    }
  }, []);

  // Calculate proper hero section height accounting for header
  const getHeroHeight = () => {
    if (isMobile) return "calc(100vh - 4rem)"; // Account for mobile header (64px)
    if (isVerySmallScreen) return "calc(100vh - 5rem)"; // Account for small laptop header (80px)
    if (isLowHeight) return "calc(100vh - 4.5rem)"; // Account for low height screens
    return "calc(100vh - 5.5rem)"; // Account for desktop header (88px)
  };

  return (
    <main className="w-full text-[#1C3664]">
      {/* utility css */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* HERO (unchanged) */}
      <section
        id="boarding-hero"
        className="relative flex items-end"
        style={{ height: "100vh", marginTop: "60px" }}
      >
        <img
          src={CLOUD.heroBg}
          alt="Boarding hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002F82]/80 via-transparent to-transparent" />
        <div className="relative mx-auto w-[90%] max-w-[1290px] pb-[4%] flex flex-col items-center">
          <img
            src={CLOUD.orangeIcon}
            alt=""
            className="mb-3 h-12 w-12 md:h-[60px] md:w-[60px]"
          />
          <h1
            className="cent-schbk-cyrill text-white text-[40px] md:text-[64px] leading-none font-semibold"
            style={{ marginBottom: "10%" }}
          >
            Boarding
          </h1>
        </div>
      </section>

      {/* Home Away + Amenities + Chetna (as before) */}
      <HomeAway />
      <AmenitiesBlock />
      <ChetnaPrabha />

      {/* >>> NEW ORDER HERE <<< */}
      <ProgramsPractices />
      <PillarsTabs />

      {/* keep the rest of your page unchanged (glimpse, nutrition, happiness, ctas, gallery, map) */}
      <section className="py-10 md:py-16 bg-white">
        <div className="mx-auto w-[90%] max-w-[960px]">
          <SectionTitle title="A Glimpse into Campus living" />
          <div className="relative mt-6 rounded-lg overflow-hidden">
            <img
              src={CLOUD.glimpseThumb}
              alt=""
              className="w-full h-[260px] md:h-[420px] object-cover"
            />
            <button
              onClick={() => setShowVideo(true)}
              className="absolute inset-0 grid place-items-center cursor-pointer"
              aria-label="Play video"
            >
              <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/30 backdrop-blur-sm grid place-items-center">
                <span className="ml-1 border-l-[14px] border-l-white border-y-[10px] border-y-transparent" />
              </span>
            </button>
          </div>

          {showVideo && (
            <div
              className="fixed inset-0 z-50"
              onClick={(e) =>
                e.target === e.currentTarget && setShowVideo(false)
              }
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
                      src="https://www.youtube.com/embed/U5qyakZJKX4?autoplay=1&rel=0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <NutritiousSatvikFood />

      <section className="py-12 md:py-20 bg-white">
        <div className="mx-auto w-[90%] max-w-[1290px]">
          <SectionTitle
            title="Happiness Council"
            subtitle="Rooted in kindness and led by students, the Happiness Council helps make hostel life joyful, caring, and full of connection."
          />
          <HappinessCarousel cards={HCARDS} />
        </div>
      </section>

      <CTA
        title="Hostel Rules Handbook"
        subtitle="Find all the essential information about Hostel Rules, Hostel Schedule, Parents and Guardians Visit timings in the pdf attached below."
        tone="blue"
        button="Download Handbook"
        bgImg={CLOUD.ctaBlue}
        target="_blank"
        link="/hostel_handbook.pdf"
      />

      {/* GALLERY */}
      <Gallery
        images={[
          CLOUD.g1, // Row1: 16:9 left
          CLOUD.g2,
          CLOUD.g3, // Row1: stacked middle
          CLOUD.g4, // Row1: 9:16 right
          CLOUD.g5,
          CLOUD.g6, // Row2: stacked left
          CLOUD.g7, // Row2: 9:16 middle
          CLOUD.g8, // Row2: 16:9 right
        ]}
        title="Gallery"
        subtitle="Festival Celebrations at Amatir"
      />

      {/* CTA: orange overlay on an image (reuse a gallery image to stay within provided assets) */}
      <section
        className="relative"
        style={{
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        <div className="relative h-[140px] md:h-[200px]">
          <img
            src="/images/Rectangle_78_qtbute.jpg" // using provided list
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#ED6D23]/90" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
            <h3 className="text-white text-xl md:text-2xl font-serif">
              Unlock her future!
            </h3>
            <p className="text-white/90 text-xs md:text-sm mt-1">
              Guided by Dharma, Prepared for the World.
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center rounded-full bg-[#1C3664] px-4 py-2 text-white text-sm"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="relative">
          <div className="absolute left-[5%] top-8 z-10 max-w-[360px] bg-white rounded-lg shadow-xl p-6 hidden md:block">
            <h3 className="univers-regular text-[#0E2349]">
              Amatir Kanya Gurukul Kurukshetra
            </h3>
            <p className="text-[14px] text-[#6c757d] mt-2">
              Village: Bachgaon Gamri, Lakhi Road, Kurukshetra, Haryana 136119
            </p>
            <a
              href="https://maps.google.com/?q=Amatir+Kanya+Gurukul+Kurukshetra"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 text-[#ED6D23] font-semibold"
            >
              Directions ↗
            </a>
          </div>
          <iframe
            title="Amatir Map"
            className="w-full h-[360px] md:h-[520px] border-0"
            src="https://www.google.com/maps?q=Amatir%20Kanya%20Gurukul%20Kurukshetra&output=embed"
            loading="lazy"
          />
        </div>
      </section>
    </main>
  );
}
