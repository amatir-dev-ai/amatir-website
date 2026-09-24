import React, { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Cloud, MessageSquareQuote } from "lucide-react"; // for Ethical Dialogues icon 
import MobileGallery from "../../components/MobileGallery";
import NutritiousSatvikFood from "../../components/NutritiousSatvikFood";
import { Link } from "react-router-dom";
import useSEO from "../../hooks/useSEO";
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
  g1: "/images/smart_vtotes.jpg",
  g2: "/images/KUM_3234_o9tcvu.jpg",
  g3: "/images/KUM_3205_uunnhj.jpg",
  g4: "/images/GOPR2287_lw3vte.jpg",
  g5: "/images/059A9848_wnterv.jpg",
  g6: "/images/059A0109_zlyowu.jpg", 
  g7: "/images/IMG_1070_qfxs0g.jpg",
  g8: "/images/Hostel-Kitchen02_gkjsof.jpg",

  // CTA backgrounds
  ctaOrange: "/images/Rectangle_78_qtbute.jpg",
  ctaBlue: "/images/Rectangle_80_lwbyul.jpg",

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

function CTA({ title, subtitle, button, tone, bgImg }) {
  const overlay =
    tone === "orange"
      ? "bg-[rgba(237,109,35,0.78)]"
      : "bg-[rgba(28,54,100,0.85)]";
  return (
    <section className="relative">
      <img src={bgImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="relative mx-auto w-[92%] max-w-[1100px] py-12 md:py-16 text-center text-white">
        <h3 className="cent-schbk-cyrill">
          {title}
        </h3>
        <p className="mt-2 opacity-90">{subtitle}</p>
        <a
          href="/contact"
          className="mt-6 inline-flex items-center justify-center px-6 py-2 rounded-full transition shadow-sm hover:opacity-90 cursor-pointer"
          style={{
            backgroundColor: tone === "orange" ? brand.deepNavy : brand.orange,
            color: "white",
          }}
        >
          {button}
        </a>
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
          <img src={CLOUD.homeAwayBg} alt="" className="w-full h-[400px] md:h-[400px] object-cover" />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(237,109,35,0.86)" }} />
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <div className="max-w-4xl text-white">
              <h3 className="cent-schbk-cyrill">
                Your Home Away From Home
              </h3>
              <p className="mt-3 md:mt-4 text-[14px] md:text-[16px] leading-relaxed">
              At Amatir, over 300 girls from across India live in a safe, caring, and structured environment that fosters 
            growth, independence, and lifelong friendships. It's this environment that has made Amatir home to some of
             the best girls boarding facilities in India.
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
    key: "ac", title: "Central AC with Cooling & Heating", img: CLOUD.amenities_ac,
    desc: "Spacious, well-ventilated gurukul hostel buildings equipped with central cooling and heating ensure year-round comfort."
  },
  {
    key: "wifi", title: "Dormitories with Wi-Fi", img: CLOUD.amenities_wifi,
    desc: "Each dormitory is equipped with secure Wi-Fi, allowing students to use their personal tablets for researched based learning."
  },
  {
    key: "safety", title: "Safety Surveillance", img: CLOUD.amenities_safety,
    desc: "Round-the-clock security with CCTV surveillance and trained guards provides a safe girls boarding school experience, where parents can rest assured about their child's well-being."
  },
  {
    key: "laundry", title: "Dedicated Laundry Facilities", img: CLOUD.amenities_laundry,
    desc: "Modern laundry services ensure hygiene, convenience, and independence as part of the hostel routine for girls."
  },
  {
    key: "phone", title: "Phone Access Points", img: CLOUD.amenities_phone,
    desc: "Speed-dial contacts mapped for safe, direct connection with home."
  },
];

function AmenitiesBlock() {
  const [active, setActive] = useState("ac");
  const activeItem = AMENITY_ITEMS.find((i) => i.key === active) || AMENITY_ITEMS[0];

  return (
    <section className="py-12 md:py-16" style={{ backgroundColor: brand.light }}>
      <div className="mx-auto w-[100%] max-w-[1290px]">
        <SectionTitle
          title="Amenities"
          subtitle="Explore thoughtfully designed spaces and services that ensure comfort, safety, and well-being, making our boarding experience truly exceptional. As a girls boarding school with hostel facilities built around every girl's comfort, we've designed every corner of campus life with her needs in mind.
"
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

          {/* Right tab list - Mobile style */}
          <div className="relative">
            {/* faint vertical guide line */}
            <div className="absolute left-2 top-0 bottom-0 w-px bg-[#D9DFEA]" />

            <ul className="space-y-4 pl-6">
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
                          style={{ backgroundColor: isActive ? brand.orange : "transparent" }}
                        />
                        <div>
                          <h4
                            className="univers-regular"
                            style={{
                              color: isActive ? "#1C3664" : "#9CA3AF",
                              fontWeight: isActive ? "600" : "400"
                            }}
                          >
                            {i.title}
                          </h4>
                          {/* Only show description for active item */}
                          {isActive && (
                            <p className="mt-1 text-[14px] text-[#3A2323] max-w-prose">
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
    title: "Self & Emotional Well-being", img: "/images/Emotional_wellbeing_fzxout.jpg",
    desc: "Self & Emotional Well-being — Understanding emotions, managing stress and developing resilience, confidence and self-awareness."
  },
  {
    title: "Relationships & Social Well-being", img: "/images/social_wellbeing-team_work_woh9rj.jpg",
    desc: " Building empathy, respectful communication, healthy friendships and the ability to resolve conflicts."
  },
  {
    title: "Thinking & Responsible Choices", img: "/images/cognitive_wellbeing-confidence_vqfbne.jpg",
    desc: "Strengthening reflection, decision-making, digital awareness and the ability to respond thoughtfully to challenges."
  },
  {
    title: "Values & Character", img: "/images/Ethics_Integrity_sfkdy8.jpg",
    desc: "Nurturing honesty, responsibility, compassion, integrity and a sense of responsibility towards others and society."
  },
];

function ChetnaPrabha() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [expandedIdx, setExpandedIdx] = useState(-1);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    const delta = touchEndX.current - touchStartX.current;
    const threshold = 40;
    if (Math.abs(delta) < threshold) return;
    const next = delta < 0 ? Math.min(activeIdx + 1, CHETNA.length - 1) : Math.max(activeIdx - 1, 0);
    if (next !== activeIdx) {
      setExpandedIdx(-1);
      setActiveIdx(next);
    }
  };

  const goTo = (i) => {
    setExpandedIdx(-1);
    setActiveIdx(i);
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="mx-auto w-[92%] max-w-[1290px]">
        <SectionTitle
          title="Illuminating Awareness"
          subtitle="Chetna Prabha is Amatir’s distinctive initiative for the psychological, emotional, social and behavioural well-being of its students and the wider school community. Through 24×7 pastoral presence, counselling and experiential learning, it helps girls understand themselves, build healthy relationships, navigate challenges and grow into confident, responsible and grounded young women."
        />
        <p
          className="text-center cent-schbk-cyrill text-[#ED6D23] mt-6"
        >
          Our focus
        </p>

        {/* Fade slider */}
        <div
          className="mt-8 -mx-[4%] px-[4%]"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative h-[320px]">
            {CHETNA.map((c, idx) => (
              <div
                key={idx}
                className={`${idx === activeIdx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"} absolute inset-0 rounded-lg overflow-hidden shadow-sm transition-opacity duration-300 ease-out cursor-pointer`}
                onClick={() => setExpandedIdx((cur) => (cur === idx ? -1 : idx))}
              >
                <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                <div
                  className="absolute bottom-0 left-0 right-0 px-6 py-6 text-white"
                  style={{
                    background: "linear-gradient(to top, rgba(237,109,35,0.95) 0%, rgba(237,109,35,0.7) 50%, transparent 100%)"
                  }}
                >
                  <h4 className="univers-regular font-semibold mb-2">{c.title}</h4>
                  <p className="text-[14px] leading-relaxed opacity-95">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-5 flex justify-center gap-2">
          {CHETNA.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`${i === activeIdx ? "w-6 bg-[#ED6D23]" : "w-2 bg-[#D9DFEA]"} h-2 rounded-full transition-all`}
            />
          ))}
        </div>
              <p className="py-5 text-center max-w-3xl mx-auto opacity-90">
         Chetna Prabha goes beyond one-time counselling or classroom lectures. It is an ongoing culture of care, reflection and growth—experienced through daily life at Amatir.
        </p>
      </div>

    </section>
  );
}

/* ---------- NEW: Programs & Practices (blue band) ---------- */
const PROGRAMS = [
  {
    title: "Individual Counseling",
    desc:
      "One-on-one support to help girls talk about their feelings, handle challenges, and build confidence in a safe, private space.",
    iconImg: CLOUD.progCounsel,
  },
  {
    title: "Group Workshops",
    desc:
      "Interactive sessions where girls learn life skills, like handling peer pressure, building self-esteem, and speaking up with confidence.",
    iconImg: CLOUD.progWorkshops,
  },
  {
    title: "Mindfulness",
    desc:
      "Simple daily meditation, reflection, or quiet time to help girls feel calm, focused, and balanced.",
    iconImg: CLOUD.progMindful,
  },
  {
    title: "Ethical Dialogues",
    desc:
      "Heartfelt conversations inspired by Indian values that help girls think about right and wrong, purpose, and the kind of person they want to become.",
    iconImg: CLOUD.progEthical,
  },
];

function ProgramsPractices() {
  const [activeIdx, setActiveIdx] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    const delta = touchEndX.current - touchStartX.current;
    const threshold = 40;
    if (Math.abs(delta) < threshold) return;
    if (delta < 0 && activeIdx < PROGRAMS.length - 1) setActiveIdx(activeIdx + 1);
    if (delta > 0 && activeIdx > 0) setActiveIdx(activeIdx - 1);
  };

  const goTo = (i) => setActiveIdx(i);

  return (
    <section className="py-14 md:py-20" style={{ backgroundColor: brand.deepNavy, color: "white" }}>
      <div className="mx-auto w-[92%] max-w-[1290px]">
        <h2 className="cent-schbk-cyrill text-[#ED6D23] text-center">
          Programs and Practices
        </h2>
        <p className="mt-3 text-center max-w-3xl mx-auto opacity-90">
        Includes training for teachers and staff to support adolescent well-being with empathy, part of what makes Amatir a genuinely safe residential school for girls in India.
        </p>

        {/* Fade slider (no scroll bounce) */}
        <div
          className="relative mt-10 overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="min-h-[320px]" />
          {PROGRAMS.map((p, idx) => (
            <div
              key={idx}
              className={`${activeIdx === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"} absolute inset-0 transition-opacity duration-300 ease-out px-6 text-center`}
            >
              <div className="mx-auto mb-5 grid place-items-center w-16 h-16 rounded-md border-2"
                style={{ borderColor: "rgba(255,255,255,0.7)" }}>
                {p.iconImg ? (
                  <img src={p.iconImg} alt="" className="w-8 h-8 object-contain" />
                ) : (
                  <MessageSquareQuote className="w-8 h-8" aria-hidden />
                )}
              </div>
              <h3 className="univers-regular">{p.title}</h3>
              <p className="mt-3 text-base opacity-90">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-3">
          {PROGRAMS.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`${i === activeIdx ? "w-8 bg-[#ED6D23]" : "w-3 bg-white/60"} h-3 rounded-full transition-all`}
            />
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
    desc:
      "Compassionate protectors, our Sanrakshikas are dedicated female caretakers who ensure safety, structure, and discipline—offering protective care.",
    img: "/images/059A0109_w5gdie.jpg",
  },
  {
    key: "samposhini",
    title: "Samposhini",
    desc:
      "A nurturing guide and counsellor, our Samposhini offers motherly care—providing emotional support, daily guidance, and heartfelt mentorship to help each child grow with confidence and clarity.",
    img: "/images/Rectangle_70_haob7j.jpg",
  },
  {
    key: "marg",
    title: "Marg Darshini",
    desc:
      "Senior students mentor younger ones, building leadership, responsibility, and empathy through peer learning.",
    img: "/images/Marg_Darshini_cs8hci.jpg",
  },
  {
    key: "tutoring",
    title: "Tutoring",
    desc:
      "Personalized Mentorship in both scholastic and co-scholastic subjects.",
    img: "/images/Tutoring_xcxj8r.jpg",
  },
  {
    key: "weekend",
    title: "Weekend Leisure",
    desc:
      "Regular indoor games, weekend movie screenings, and light recreational activities.",
    img: "/images/Weekend_Leisure_sulnqa.jpg",
  },
];

function PillarsTabs() {
  const [active, setActive] = useState("sanrakshika");
  const activeItem = PILLARS.find((p) => p.key === active) || PILLARS[0];

  return (
    <section className="py-12 md:py-16" style={{ backgroundColor: brand.light }}>
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

          {/* Right tab list - Mobile style */}
          <div className="relative">
            {/* faint vertical guide line */}
            <div className="absolute left-2 top-0 bottom-0 w-px bg-[#D9DFEA]" />

            <ul className="space-y-4 pl-6">
              {PILLARS.map((p) => {
                const isActive = p.key === active;
                return (
                  <li key={p.key}>
                    <button
                      onClick={() => setActive(p.key)}
                      className="w-full text-left cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className="mt-2 h-5 w-[3px] rounded"
                          style={{ backgroundColor: isActive ? brand.orange : "transparent" }}
                        />
                        <div>
                          <h4
                            className="univers-regular"
                            style={{
                              color: isActive ? "#1C3664" : "#9CA3AF",
                              fontWeight: isActive ? "600" : "400"
                            }}
                          >
                            {p.title}
                          </h4>
                          {/* Only show description for active item */}
                          {isActive && (
                            <p className="mt-1 text-[14px] text-[#3A2323] max-w-prose">
                              {p.desc}
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
  const [activeIdx, setActiveIdx] = useState(0);
  const go = (dir) => setActiveIdx((p) => (p + dir + cards.length) % cards.length);

  return (
    <div className="relative mt-10">
      <div className="relative h-[320px] overflow-hidden rounded-lg">
        {cards.map((c, i) => (
          <div
            key={i}
            className={`${i === activeIdx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"} absolute inset-0 transition-opacity duration-300 ease-out`}
          >
            <img src={c.img} alt={c.title} className="block w-full h-full object-cover" draggable="false" />
            <div
              className="absolute bottom-0 left-0 right-0 px-6 py-6 text-white"
              style={{
                background: "linear-gradient(to top, rgba(237,109,35,0.95) 0%, rgba(237,109,35,0.7) 50%, transparent 100%)"
              }}
            >
              <h4 className="univers-regular font-semibold mb-2">{c.title}</h4>
              <p className="text-[14px] leading-relaxed opacity-95">{c.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {cards.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setActiveIdx(idx)}
            className={`${idx === activeIdx ? 'w-6 bg-[#ED6D23]' : 'w-2 bg-[#D9DFEA]'} h-2 rounded-full transition-all`}
          />
        ))}
      </div>
    </div>
  );
}
const HCARDS = [
  { img: CLOUD.hc1, title: "Health Committee", excerpt: "Looks after students’ well-being through regular check-ups, health awareness, and support during illness." },
  { img: CLOUD.hc2, title: "Discipline Committee", excerpt: "Maintains order and responsibility—making sure everyone follows routines, eats well, and respects shared spaces." },
  { img: CLOUD.hc3, title: "Fun Committee", excerpt: "Plans events, games, and celebrations that everyone can enjoy together." },
  { img: CLOUD.hc4, title: "Mess Committee", excerpt: "Manages meals with care—overseeing serving, cleanliness, and ensuring no food is wasted." },
  { img: CLOUD.hc5, title: "Grooming Committee", excerpt: "Ensures cleanliness, proper uniform, and personal hygiene through weekend checks and grooming activities." }

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

  // Calculate proper hero section height accounting for header
  const getHeroHeight = () => {
    if (isMobile) return 'calc(100vh - 4rem)'; // Account for mobile header (64px)
    if (isVerySmallScreen) return 'calc(100vh - 5rem)'; // Account for small laptop header (80px)
    if (isLowHeight) return 'calc(100vh - 4.5rem)'; // Account for low height screens
    return 'calc(100vh - 5.5rem)'; // Account for desktop header (88px)
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
        className="relative flex items-end"
        style={{ height: "100vh", marginTop: "60px" }}
      >
        <img src={CLOUD.heroBg} alt="Boarding hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002F82]/80 via-transparent to-transparent" />
        <div className="relative mx-auto w-[90%] max-w-[1290px] pb-[4%] flex flex-col items-center">
          <img src={CLOUD.orangeIcon} alt="" className="mb-3 h-12 w-12 md:h-[60px] md:w-[60px]" />
          <h1 className="text-white text-[40px] md:text-[64px] leading-none font-semibold" style={{ marginBottom: "35%" }}>
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
            <img src={CLOUD.glimpseThumb} alt="" className="w-full h-[260px] md:h-[420px] object-cover" />
            <button onClick={() => setShowVideo(true)} className="absolute inset-0 grid place-items-center cursor-pointer" aria-label="Play video">
              <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/30 backdrop-blur-sm grid place-items-center">
                <span className="ml-1 border-l-[14px] border-l-white border-y-[10px] border-y-transparent" />
              </span>
            </button>
          </div>
        </div>

        {showVideo && (
          <div className="fixed inset-0 z-50" onClick={(e) => e.target === e.currentTarget && setShowVideo(false)}>
            <div className="absolute inset-0 bg-black/70" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 pt-18">
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
              <button onClick={() => setShowVideo(false)} className="mt-4 inline-flex items-center bg-white text-slate-800 px-4 py-2 rounded-lg cursor-pointer">
                Close
              </button>
            </div>
          </div>
        )}
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

      <MobileGallery
        images={[
          CLOUD.g1,
          CLOUD.g2, CLOUD.g3,
          CLOUD.g4,
          CLOUD.g5, CLOUD.g6,
          CLOUD.g7,
          CLOUD.g8,
        ]}
        title="Gallery"
        subtitle="Festival Celebrations at Amatir"
      />

      <CTA
        title="Hostel Rules Handbook"
        subtitle="Find all the essential information about Hostel Rules, Hostel Schedule, Parents and Guardians Visit timings in the pdf attached below."
        tone="blue"
        button="Download Handbook"
        bgImg={CLOUD.ctaBlue}
        target="_blank"
        link="/hostel_handbook.pdf"
      />

      {/* <CTA
        title="Unlock her future!"
        subtitle="Guided by Dharma, Prepared for the World."
        tone="orange"
        button="Get in Touch"
        bgImg={CLOUD.ctaOrange}
      /> */}

      <section className="w-full">
        <div className="relative overflow-hidden py-12 md:py-16">
          <img src="/images/Rectangle_78_qtbute.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />

          {/* Strong solid orange veil (not a soft gradient) */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: brand.orange,
              opacity: 0.8,
            }}
          />

          <div className="relative h-full flex flex-col items-center justify-center text-center" style={{ padding: "0 6vw" }}>
            <h3
              style={{
                color: "#FFFFFF",
                fontFamily: "ui-serif, Georgia, serif",
                fontWeight: 400,
                fontSize: "8vw",
                lineHeight: 1.15,
                marginBottom: "1.2vh",
                letterSpacing: ".01em",
              }}
            >
              Unlock her future!
            </h3>

            <p
              style={{
                color: "#FFFFFF",
                fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
                fontSize: "4.2vw",
                lineHeight: 1.5,
                marginBottom: "2.4vh",
              }}
            >
              Guided by Dharma, Prepared for the World.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center"
              style={{
                background: brand.navy,
                color: "#FFFFFF",
                borderRadius: "9999px",
                height: "3.2rem",
                padding: "0 2.2rem",
                fontSize: "4.2vw",
                fontWeight: 600,
              }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="relative">
          <div className="absolute left-[5%] top-8 z-10 max-w-[360px] bg-white rounded-lg shadow-xl p-6 hidden md:block">
            <h3 className="univers-regular text-[#0E2349]">Amatir Kanya Gurukul Kurukshetra</h3>
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
