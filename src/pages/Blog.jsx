// Blog.jsx — updated to render doc content + 4-card carousel
import React, { useMemo, useRef, useState } from "react";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";

/* ===================== SEO (from doc) ===================== */
export const SEO = {
  title: "Curriculum in Gurukuls | Amatir Kanya Gurukul Education System",
  description:
    "Discover the Gurukul curriculum at Amatir Kanya Gurukul blending CBSE academics, yoga, Sanskrit, culture, and holistic learning for girls.",
  slug: "/curriculum-in-gurukuls-parents-guide",
};

/* ===================== BLOG DATA ===================== */
/** Main article = first tab of the document */
const BLOGS = {
  blog1: {
    slug: "blog1",
    title: "Curriculum in Gurukuls: What Parents Should Know",
    date: "10 Oct 2025",
    read: "7 min read",
    hero:
      "/images/Blog_main_pic_b15a6e.jpg",
    inlineImg:
      "/images/Rectangle_110_tdkht6.jpg",
    heroAlt:
      "Students practising yoga at Amatir Kanya Gurukul",
    inlineAlt:
      "CBSE curriculum blended with Gurukul education system",
    caption: "Gurukul students chanting Sanskrit verses",
    introHeading: "Blending Tradition with Modernity in Gurukul Curriculum",
    intro: [
      "Parents today are looking for more than just high scores—they want education that nurtures character, confidence, and clarity. The modern Gurukul system has evolved to offer just that: a balanced curriculum that blends traditional Indian wisdom with academic excellence.",
      "At Amatir Kanya Gurukul, we’ve curated an educational model where CBSE academics, Sanskrit chanting, Hatha Yoga, and festival-based cultural learning coexist in harmony. Our curriculum is not only about what children learn—but how they live while learning.",
    ],

    sections: [
      {
        h2: "CBSE and Gurukul Education: A Dual Approach",
        ps: [
          "Yes, we follow the CBSE curriculum, ensuring our students are on par with national academic standards. But unlike conventional schools, our delivery is infused with Yogic practices, silence, and nature-based learning.",
        ],
        ulTitle: "This dual approach helps children:",
        ul: [
          "Excel in board exams",
          "Stay rooted in Indian ethos",
          "Cultivate inner stillness and strength",
        ],
        ps2: [
          "From sunrise Yoga to evening chanting, every moment of the day becomes a classroom—not just the hours spent inside four walls.",
        ],
      },

      {
        h2: "Core Academic Subjects Offered",
        ps: [
          "Amatir Gurukul offers all core subjects as per CBSE guidelines:",
        ],
        tableClass: [
          {
            level: "Primary",
            subjects:
              "English, Hindi, Sanskrit, Science, Maths, Environmental Science",
          },
          {
            level: "Middle",
            subjects:
              "English, Hindi, Sanskrit, Science, Maths, Social Science, Artificial Intelligence",
          },
          {
            level: "Secondary",
            subjects:
              "English, Hindi, Sanskrit, Science, Maths, Social Science, Information Technology",
          },
          {
            level: "Senior Secondary",
            subjects:
              "Two Languages, Physics, Chemistry, Maths, Biology, Accountancy, Business Studies, Economics, Computer Science, Information Practices, Psychology, Political Science, History, Music-Vocal, Music-Instrumental, Fine Arts, Home Science, Food Production, Physical Education, NCC",
          },
        ],
        ps2: [
          "Digital literacy, reading comprehension, and general knowledge are integrated into daily lessons.",
          "Amatir also organises special mentoring programs to prepare students for various competitive exams like JEE, NEET, NDA, CUET, Olympiads.",
        ],
      },

      {
        h2: "Vedic Learning and Sanskrit Education in Gurukuls",
        ps: [
          "While we do not teach ancient scriptures as academic subjects, we retain the cultural richness through daily Sanskrit chanting of slokas, Hawan and Yoga. This connects students with:",
        ],
        ul: [
          "Clarity of speech and pronunciation",
          "Aesthetic appreciation of sound and silence",
          "Emotional balance and devotion through chants like Shanti Mantras and Bhagavad Gita verses",
        ],
        ps2: [
          "Students also observe Amavasya, Purnima, Guru Purnima, and other sacred days with guided reflections and Yogic practices, helping them internalize wisdom, rather than merely study it.",
        ],
      },

      {
        h2: "Character Building Through Moral Science and Ethics",
        ps: [
          "True education shapes values, not just vocabulary. We integrate:",
        ],
        ul: [
          "Moral science stories",
          "Group reflections on ethical dilemmas",
          "Discipline through lifestyle practices (like silence during meals, self-cleaning of spaces, etc.)",
        ],
        ul2Title: "This silent character-building creates girls who are:",
        ul2: [
          "Confident, but not arrogant",
          "Rooted, but not rigid",
          "Disciplined, yet joyful",
        ],
      },

      {
        h2: "Arts, Music, and Culture: Beyond Academics",
        ps: [
          "At Amatir, education is not confined to academics. Girls are immersed in:",
        ],
        ul: [
          "Indian classical music and bhajans",
          "Traditional folk and devotional dances",
          "Basic handicrafts and drawing",
          "Theatre and storytelling in cultural themes",
        ],
        h3: "Sports",
        ps2: [
          "At Amatir, great emphasis is placed on nurturing and honing the athletic abilities of our students. Many of our girls regularly participate in sports competitions at the state and national levels, proudly representing the Gurukul with skill and determination",
          "Under the guidance of dedicated & highly qualified coaches, Amatir daughters have won several accolades and medals in the following sports:",
        ],
        ul2: [
          "Volleyball",
          "Football",
          "Handball",
          "Basketball",
          "Taekwondo",
          "Skating",
        ],
        ps3: [
          "Our sports program not only promotes physical fitness but also instills discipline, teamwork and resilience — values that align with the spirit of holistic education at Amatir.",
        ],
      },

      {
        h2: "Weekly Timetable Sample from Amatir Gurukul",
        ps: ["Here’s a sample weekday routine that blends academics and inner work:"],
        tableTime: [
          ["5:00 AM", "Wake-up & Yogic cleansing"],
          ["5:50 AM", "Sports, Hatha Yoga & Breathwork"],
          ["7:10 AM", "Breakfast in Silence (Satvik)"],
          ["7:45 AM", "Hawan"],
          ["8:15 AM", "Academic Periods (CBSE subjects)"],
          ["11:10 AM", "Lunch"],
          ["11:50 AM", "Academic Periods (CBSE subjects)"],
          ["2:00 PM", "Olympiad Classes"],
          ["3:00 PM", "Snacks and Rest"],
          ["4:30 PM", "Sports, Dance, Music, Fine Arts"],
          ["6:30 PM", "Sandhya Upasana"],
          ["6:50 PM", "Dinner"],
          ["7:30 PM", "Guided Tutoring"],
          ["9:00 PM", "Milk & Reflection time"],
          ["9:30 PM", "Night Prayer"],
          ["9:45 PM", "Lights Out"],
        ],
        ps2: [
          "Special observances on Amavasya, Purnima, and festival days include silence, storytelling, and ceremonial Havan.",
        ],
      },

      {
        h2: "Modern Teaching Methods in a Traditional Environment",
        ps: ["Our teaching style includes:"],
        ul: [
          "Activity-based learning",
          "Storytelling and roleplay for primary levels",
          "Project-based assignments for middle and secondary",
          "Use of smart boards and visual tools, where suitable",
          "Bilingual instruction in English and Hindi for clear understanding",
        ],
        ps2: [
          "The classroom structure is minimal yet alive—with natural light, open air, and a focus on attention and presence rather than distraction.",
        ],
      },

      {
        h2: "Exams, Projects, and Progress Tracking",
        ps: ["Assessment is done in the CBSE format:"],
        ul: [
          "Formative and summative tests",
          "Classwork, homework, and regular revision",
          "Portfolio-based progress for primary students",
          "Annual projects on science, culture, and nature",
        ],
        ps2: [
          "We focus on progress, not pressure. Parents are updated on both academic and personal growth milestones through term meetings.",
        ],
      },

      {
        h2: "Parent Involvement in Curriculum Design",
        ps: [
          "At Amatir, we believe parents are co-educators, not just observers. We involve parents through:",
        ],
        ul: [
          "Orientation sessions before admission",
          "Regular parent-teacher circles (not just PTMs)",
          "Inviting feedback on new activities, workshops, or spiritual events",
          "Cultural days where parents can observe or participate",
        ],
        ps2: [
          "This fosters community, trust, and shared responsibility in shaping a child’s path.",
        ],
      },

      {
        h2: "Success Stories from Gurukul Students",
        ps: ["Many of our girls go on to:"],
        ul: [
          "Excel in academics and competitive exams",
          "Lead school events with poise and grace",
          "Speak fluently in English, Hindi, and Sanskrit verses",
          "Win accolades in yoga, arts, and inter-school forums",
          "Carry with them a balanced, humble, and graceful personality into adulthood",
        ],
        ps2: ["Their journey is not just measured in marks, but in maturity."],
      },
    ],

    conclusionH2:
      "Conclusion: Why the Gurukul Curriculum Is Ideal for Girls",
    conclusion: [
      "In a world rushing toward artificial intelligence, the Gurukul curriculum nourishes natural intelligence—of the body, the breath, the heart, and the spirit.",
      "For girls especially, Amatir Kanya Gurukul provides a rare sanctuary where they can:",
    ],
    conclusionList: [
      "Grow academically and spiritually",
      "Learn to carry themselves with strength and softness",
      "Be in touch with tradition while excelling in the modern world",
    ],
    closing:
      "Our curriculum doesn’t just prepare them for school—it prepares them for life.",
  },

  /* Bottom carousel = four more items */
  blog2: {
    slug: "blog2",
    title: "A Day in the Life of a Girl at Amatir Gurukul",
    excerpt:
      "From morning prayers and CBSE classes to yoga, arts, and evening upasana—step through a complete weekday that balances study with inner work.",
    img: "/images/Rectangle_110_tdkht6.jpg",
    date: "10 Nov 2025",
    read: "6 min read",
  },
  blog3: {
    slug: "blog3",
    title: "Why Gurukul Education Builds Character",
    excerpt:
      "Discipline, devotion, and daily practice shape confidence without arrogance and resilience without rigidity—how a Gurukul forms character.",
    img: "/images/Rectangle_111_j4hdij.jpg",
    date: "15 Nov 2025",
    read: "5 min read",
  },
  blog4: {
    slug: "blog4",
    title: "CBSE in Gurukuls: How It Works",
    excerpt:
      "CBSE subjects delivered in a yogic environment—silence, nature, and presence—so students excel in exams and grow inwardly too.",
    img: "/images/CBSE_in_Gurukuls__How_It_Works_qh3mia.jpg",
    date: "25 Nov 2025",
    read: "5 min read",
  },
  blog5: {
    slug: "blog5",
    title: "Benefits of a Gurukul for Girls",
    excerpt:
      "Why a residential Gurukul can be a sanctuary for growth—academically, emotionally, and spiritually—for today’s daughters.",
    img: "/images/Rectangle_111_j4hdij.jpg",
    date: "1 Dec 2025",
    read: "6 min read",
  },
};

/* ===================== UI Bits ===================== */
const Meta = ({ date, read, className = "" }) => (
  <div className={`flex items-center gap-4 text-[12.5px] text-[#68748C] ${className}`}>
    <span className="inline-flex items-center gap-2">
      <Calendar className="h-[14px] w-[14px]" />
      {date}
    </span>
    <span className="inline-flex items-center gap-2">
      <Clock className="h-[14px] w-[14px]" />
      {read}
    </span>
  </div>
);

const ReadMore = ({ href }) => (
  <a
    href={href}
    className="mt-3 inline-flex items-center justify-center rounded-md border border-[#1C3664] px-3 py-2 text-[13px] font-medium text-[#1C3664] transition hover:bg-[#1C3664] hover:text-white"
  >
    Read more
  </a>
);

const Card = ({ img, title, excerpt, date, read, href }) => (
  <article className="rounded-[10px] border border-slate-200/80 bg-white shadow-[0_1px_10px_rgba(16,24,40,0.05)] w-[88%] sm:w-[360px] shrink-0 snap-start">
    <img src={img} alt="" className="h-[168px] w-full rounded-t-[10px] object-cover" />
    <div className="p-4 md:p-5">
      <h4 className="font-serif text-[17px] leading-6 text-[#1C3664]">{title}</h4>
      <p className="mt-2 text-[12.5px] leading-6 text-[#656F83]">{excerpt}</p>
      <Meta className="mt-3" date={date} read={read} />
      <ReadMore href={href} />
    </div>
  </article>
);

function CardsCarousel({ posts }) {
  const [i, setI] = useState(0);
  
  // For desktop: show 3 cards at a time, for mobile: show 1 card at a time
  const cardsPerView = 3;
  const maxIndex = Math.max(0, posts.length - cardsPerView);
  
  const prev = () => setI((p) => Math.max(0, p - 1));
  const next = () => setI((p) => Math.min(maxIndex, p + 1));

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h3
          className="text-[#1C3664] font-normal leading-[1.15] tracking-[0.01em]
                     text-[26px] md:text-[32px]"
          style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
        >
          From Words to Expression
        </h3>
        <div className="hidden gap-2 lg:flex">
          <button
            onClick={prev}
            disabled={i === 0}
            className="rounded-md border border-slate-300 p-2 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            disabled={i >= maxIndex}
            className="rounded-md border border-slate-300 p-2 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <p className="mx-auto mt-2 max-w-[620px] text-[13px] md:text-[14px] leading-[22px] text-[#6A7386]">
        Building strong language skills to inspire imagination, clarity, and confident communication.
      </p>

      {/* Desktop: Show 3 cards with pagination, Mobile: Single card carousel */}
      <div className="mt-6">
        {/* Desktop grid layout with pagination */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-6">
            {posts.slice(i, i + cardsPerView).map((p) => (
              <Card
                key={p.slug}
                img={p.img}
                title={p.title}
                excerpt={p.excerpt}
                date={p.date}
                read={p.read}
                href={`/${p.slug}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: Single card carousel */}
        <div className="lg:hidden relative" aria-live="polite">
          {posts.map((p, idx) => (
            <div
              key={p.slug}
              className={`absolute inset-0 transition-opacity duration-500 ${idx === i ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <div className="flex justify-center">
                <Card
                  img={p.img}
                  title={p.title}
                  excerpt={p.excerpt}
                  date={p.date}
                  read={p.read}
                  href={`/${p.slug}`}
                />
              </div>
            </div>
          ))}
          {/* Invisible first card to establish height and prevent layout shift */}
          {posts[0] && (
            <div className="invisible">
              <Card
                img={posts[0].img}
                title={posts[0].title}
                excerpt={posts[0].excerpt}
                date={posts[0].date}
                read={posts[0].read}
                href={`/${posts[0].slug}`}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile arrows */}
      <div className="mt-4 flex justify-center gap-3 lg:hidden">
        <button
          onClick={prev}
          className="rounded-md border border-slate-300 p-2 hover:bg-slate-50"
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="rounded-md border border-slate-300 p-2 hover:bg-slate-50"
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

/* ===================== RENDER HELPERS ===================== */
function SectionRenderer({ s }) {
  return (
    <section className="mt-12">
      <h2 className="font-serif text-[22px] md:text-[26px] text-[#1C3664]">{s.h2}</h2>

      {s.h3 && (
        <h3 className="mt-4 font-semibold text-[16px] text-[#102549]">{s.h3}</h3>
      )}

      {s.ps?.map((p, i) => (
        <p key={`p1-${i}`} className="mt-3 text-[14px] leading-7 text-[#3A3A3A]">
          {p}
        </p>
      ))}

      {s.ulTitle && (
        <p className="mt-3 text-[14px] font-semibold text-[#0E2349]">{s.ulTitle}</p>
      )}
      {s.ul && (
        <ul className="mt-2 list-disc pl-5 text-[14px] leading-7 text-[#3A3A3A]">
          {s.ul.map((li, i) => (
            <li key={`ul-${i}`}>{li}</li>
          ))}
        </ul>
      )}

      {s.ps2?.map((p, i) => (
        <p key={`p2-${i}`} className="mt-3 text-[14px] leading-7 text-[#3A3A3A]">
          {p}
        </p>
      ))}

      {s.ul2Title && (
        <p className="mt-3 text-[14px] font-semibold text-[#0E2349]">{s.ul2Title}</p>
      )}
      {s.ul2 && (
        <ul className="mt-2 list-disc pl-5 text-[14px] leading-7 text-[#3A3A3A]">
          {s.ul2.map((li, i) => (
            <li key={`ul2-${i}`}>{li}</li>
          ))}
        </ul>
      )}

      {/* Subjects table */}
      {s.tableClass && (
        <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
          <div className="hidden grid-cols-[160px_1fr] bg-[#F8FAFF] p-3 text-[13px] font-medium text-[#1C3664] md:grid">
            <div>Class Level</div>
            <div>Subjects Taught</div>
          </div>
          <div className="divide-y divide-slate-200 text-[13.5px] leading-6">
            {s.tableClass.map((row, i) => (
              <div
                key={`row-${i}`}
                className="grid grid-cols-1 gap-1 p-3 md:grid-cols-[160px_1fr]"
              >
                <div className="font-medium text-[#1C3664]">{row.level}</div>
                <div className="text-[#334155]">{row.subjects}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timetable table */}
      {s.tableTime && (
        <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
          <div className="hidden grid-cols-[130px_1fr] bg-[#F8FAFF] p-3 text-[13px] font-medium text-[#1C3664] md:grid">
            <div>Time</div>
            <div>Activity</div>
          </div>
          <div className="divide-y divide-slate-200 text-[13.5px] leading-6">
            {s.tableTime.map(([time, act], i) => (
              <div
                key={`trow-${i}`}
                className="grid grid-cols-1 gap-1 p-3 md:grid-cols-[130px_1fr]"
              >
                <div className="font-medium text-[#1C3664]">{time}</div>
                <div className="text-[#334155]">{act}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {s.ps3?.map((p, i) => (
        <p key={`p3-${i}`} className="mt-3 text-[14px] leading-7 text-[#3A3A3A]">
          {p}
        </p>
      ))}
    </section>
  );
}

/* ===================== MAIN PAGE ===================== */
export default function Blog() {
  const post = useMemo(() => BLOGS.blog1, []);

  return (
    <main className="w-full bg-white text-[#1C3664]">
      {/* JSON-LD for BlogPosting */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: SEO.description,
          image: post.hero,
          author: { "@type": "Person", "name": "Drishti" },
          publisher: {
            "@type": "Organization",
            "name": "Amatir Kanya Gurukul",
          },
          datePublished: "2025-08-11",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": SEO.slug
          },
          keywords: "Gurukul curriculum, CBSE in Gurukuls, Amatir Kanya Gurukul, girls boarding school",
          articleSection: "Education, Gurukul Life",
        })
      }} />

      {/* Title + meta */}
      <section className="mx-auto w-[92%] max-w-[980px] pt-24 md:pt-28">
        <h1 className="text-center cent-schbk-cyrill text-[28px] leading-tight md:text-[36px]">
          {post.title}
        </h1>
        <div className="mt-4 flex justify-center">
          <Meta date={post.date} read={post.read} />
        </div>

        {/* Feature image */}
        <div className="mt-8 overflow-hidden rounded-[10px]">
          <img src={post.hero} alt={post.heroAlt} className="block w-full object-cover" />
        </div>
      </section>

      {/* Article body */}
      <article className="mx-auto w-[92%] max-w-[820px] py-12 md:py-16">
        {/* Intro */}
        <h2 className="font-serif text-[22px] md:text-[26px]">{post.introHeading}</h2>
        <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
          {post.intro.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Inline image + caption */}
        <figure className="mt-8 overflow-hidden rounded-[10px] border border-slate-200/80">
          <img src={post.inlineImg} alt={post.inlineAlt} className="w-full object-cover" />
          <figcaption className="px-3 py-2 text-[11.5px] text-[#6D7788]">{post.caption}</figcaption>
        </figure>

        {/* Section blocks */}
        {post.sections.map((s, idx) => (
          <SectionRenderer key={idx} s={s} />
        ))}

        {/* Conclusion */}
        <section className="mt-12">
          <h2 className="font-serif text-[22px] md:text-[26px]">{post.conclusionH2}</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            {post.conclusion.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <ul className="mt-3 list-disc pl-5 text-[14px] leading-7 text-[#3A3A3A]">
            {post.conclusionList.map((li, i) => (
              <li key={i}>{li}</li>
            ))}
          </ul>
          <p className="mt-3 text-[14px] leading-7 text-[#3A3A3A]">{post.closing}</p>
        </section>
      </article>

      {/* Bottom carousel with the other 4 tabs */}
      <section className="bg-[#F6F7F9] py-16 md:py-20">
        <div className="mx-auto w-[92%] max-w-[1200px]">
          <CardsCarousel
            posts={[BLOGS.blog2, BLOGS.blog3, BLOGS.blog4, BLOGS.blog5]}
          />
        </div>
      </section>
    </main>
  );
}
