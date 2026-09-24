// FeatureGrid.jsx — GSAP ScrollTrigger only
// Tranquil sinusoidal fade-ins on visibility + symmetric tight pairs
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(ScrollTrigger, CustomEase);

/* ---- CONTENT (unchanged) ---- */
const IMAGES = {
  FeatureGridImages: [
    { alt: "Begin day with calm clarity and strength", url: "/images/Begin_day_with_calm_clarity_and_strength_lokmqg.jpg" },
    { alt: "Tradition isn't just what I know", url: "/images/Tradition_isn_t_just_what_i_know_cwcxvb.jpg" },
    { alt: "Student participating in sports", url: "/images/Rectangle_71_qm2vlk.jpg" },
    { alt: "Students celebrating a festival", url: "/images/Art_music_creative_even_cooking_y65jij.jpg" },
    { alt: "Student meditating", url: "/images/Rectangle_73_oe6xrk.jpg" },
    { alt: "Students on an educational trip", url: "/images/Gallery1_cbtzhi.jpg" },
  ],
};

const pairs = [
  { image: IMAGES.FeatureGridImages[0], theme: "peach", kicker: "Yoga and Sports", title: "I Begin My Day With Calm, Clarity and Strength", body: "Our mornings begin with a choice of three essentials: energizing sports to awaken the body, yoga to calm the mind, and mindful practices to build focus and inner strength, on a campus in Kurukshetra built around CBSE learning." },
  { image: IMAGES.FeatureGridImages[1], theme: "blue",  kicker: "Vedic Living and Education", title: "Tradition Isn't Just What I Know; It's How I Live", body: "Chanting, Meditation, and Hawans are part of our daily routine, held in spaces that reflect why Amatir is counted among the best school facilities in Kurukshetra. We don't just learn about tradition, we practice it, live it, and carry it forward with meaning and pride." },
  { image: IMAGES.FeatureGridImages[2], theme: "peach", kicker: "Academic Learning and NEET/JEE Coaching", title: "I Study Not Just to Know, but to Grow", body: "Our CBSE curriculum goes beyond textbooks. With hands-on learning, real-world skills, and values woven in, delivered in classrooms that make Amatir a genuine school with smart classrooms and science labs, we grow into curious thinkers, confident doers, and grounded individuals." },
  { image: IMAGES.FeatureGridImages[3], theme: "blue",  kicker: "Art, Music, and Creative Expression", title: "I Explore Who I Am Beyond Marks", body: "Through music, dance, theatre, art, and creative expression, even cooking, we discover what excites us, build confidence, and grow into who we truly are." },
  { image: IMAGES.FeatureGridImages[4], theme: "peach", kicker: "Community Living and Shared Responsibilities", title: "I Learn to Care, For Myself and the World Around Me", body: "By leading councils, managing events, and working in teams, we learn to take charge, support one another, and lead with empathy. Through Chetna-Prabha, we also grow from within, learning to care deeply for ourselves and those around us. It's an environment made possible by some of the best infrastructure among schools in Haryana. " },
  { image: IMAGES.FeatureGridImages[5], theme: "blue",  kicker: "Reflection and Emotional Wellbeing", title: "I End My Day with Purpose, Reflection, and Joy", body: "Evenings are a blend of guided tutoring, indoor games, weekend movie nights, and joyful leisure. As the day winds down, we return to our girls' hostel facilities, cozy and comfortable, for a restful sleep. " },
];

/* ---- UI bits ---- */
const TextCard = ({ data }) => {
  const bg = data.theme === "peach" ? "bg-[#F5E7DD]" : "bg-[#E8EFF7]";
  return (
    <div className={`pair-text-inner ${bg} rounded-xl p-6 md:p-10`}>
      <p className="mb-2 text-[12px] uppercase tracking-widest text-[#7C8190]">{data.kicker}</p>
      <h3 className="font-serif text-[22px] md:text-[26px] leading-snug text-[#1C3664]">{data.title}</h3>
      <p className="mt-3 text-[14px] md:text-[15px] leading-7 text-[#334155]">{data.body}</p>
      <a 
        href={
          data.kicker === "Yoga and Sports" ? "/academics#gurukul" :
          data.kicker === "Vedic Living and Education" ? "/academics#gurukul" :
          data.kicker === "Academic Learning and NEET/JEE Coaching" ? "/academics" :
          data.kicker === "Art, Music, and Creative Expression" ? "/co-curricular" :
          data.kicker === "Community Living and Shared Responsibilities" ? "/boarding#chetna-prabha" :
          data.kicker === "Reflection and Emotional Wellbeing" ? "/boarding#pillars-of-care" :
          "#"
        }
        className="mt-6 inline-block text-[13px] font-medium text-[#1C3664] underline decoration-2 underline-offset-4"
      >
        {data.kicker === "Yoga and Sports" && "Explore Morning Activities"}
        {data.kicker === "Vedic Living and Education" && "Learn About Our Traditions"}
        {data.kicker === "Academic Learning and NEET/JEE Coaching" && "Discover Our Curriculum"}
        {data.kicker === "Art, Music, and Creative Expression" && "See Creative Programs"}
        {data.kicker === "Community Living and Shared Responsibilities" && "Learn About Leadership"}
        {data.kicker === "Reflection and Emotional Wellbeing" && "Explore Evening Activities"}
      </a>
    </div>
  );
};

const ImgCard = ({ src, alt }) => (
  <div className="pair-image-inner relative overflow-hidden rounded-xl">
    <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
  </div>
);

/* ---- Component ---- */
export default function FeatureGrid() {
  const root = useRef(null);

  useEffect(() => {
    if (!root.current) return;

    // Smoothest tranquil fade: sine-out cubic-bezier equivalent
    // easeOutSine ≈ cubic-bezier(0.39, 0.575, 0.565, 1)
    const tranquil = CustomEase.create("tranquilSineOut", "M0,0 C0.39,0.575 0.565,1 1,1");

    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

      // TEXT: fade in as soon as the card itself enters view
      gsap.utils.toArray(".pair-text-inner").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24, filter: prefersReduced ? "none" : "blur(6px)" },
          {
            opacity: 1, y: 0, filter: "blur(0px)",
            duration: 1.4, ease: tranquil,
            scrollTrigger: {
              trigger: el,
              start: "top 88%", // enters sooner; 'in view' feel
              end: "top 70%",
              toggleActions: "play none none reverse",
              once: false,
            },
          }
        );
      });

      // IMAGE: also on its own visibility, slightly later threshold than text
      gsap.utils.toArray(".pair-image-wrap").forEach((wrap, i) => {
        const inner = wrap.querySelector(".pair-image-inner");
        const depth = [60, 72, 84][i % 3];

        gsap.fromTo(
          inner,
          { opacity: 0, y: 28, filter: prefersReduced ? "none" : "blur(6px)" },
          {
            opacity: 1, y: 0, filter: "blur(0px)",
            duration: 1.4, ease: tranquil,
            scrollTrigger: {
              trigger: wrap,
              start: "top 90%", // just after text threshold
              end: "top 72%",
              toggleActions: "play none none reverse",
              once: false,
            },
          }
        );

        // Gentle parallax float (scrubbed)
        if (!prefersReduced) {
          gsap.fromTo(
            inner,
            { yPercent: depth / 6 },
            {
              y: -depth,
              ease: "none",
              scrollTrigger: {
                trigger: wrap,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-[#F5F5F5]" style={{ perspective: "1000px" }}>
      {/* Tight pairs on the same grid row + ~5% diagonal separation */}
      <style>{`
        .pair { transform-style: preserve-3d; }
        .pair.left  { --dx: -2.5%; --dy: -1.75%; }
        .pair.right { --dx:  2.5%; --dy:  1.75%; }
        .pair { transform: translate3d(var(--dx), var(--dy), 0); }

        /* Symmetric pulls to keep pairs close on even/odd */
        .pair .col-text, .pair .col-img { will-change: transform; }
        .pair.left  .col-text { transform: translateX( 2.25%); }
        .pair.left  .col-img  { transform: translateX(-2.25%); }
        .pair.right .col-text { transform: translateX(-2.25%); }
        .pair.right .col-img  { transform: translateX( 2.25%); }

        .pair-image-inner { height: clamp(260px, 44vh, 520px); transform: translateZ(0); }
        @media (prefers-reduced-motion: reduce){
          .pair, .pair .col-text, .pair .col-img { transform: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-5 md:px-6 py-16 md:py-16">
        {/* Long stream; pairs are tight and share the same grid row */}
        <div className="space-y-28 md:space-y-[10vh]">
          {pairs.map((p, i) => {
            const left = i % 2 === 0;
            return (
              <div
                key={p.title}
                className={`pair ${left ? "left" : "right"} grid grid-cols-12 md:[grid-template-rows:1fr] items-start gap-4 md:gap-6`}
              >
                <div className={`col-text md:row-start-1 ${left ? "col-span-12 md:col-span-5 md:col-start-1" : "col-span-12 md:col-span-5 md:col-start-8"}`}>
                  <TextCard data={p} />
                </div>
                <div className={`col-img md:row-start-1 ${left ? "col-span-12 md:col-span-6 md:col-start-6" : "col-span-12 md:col-span-6 md:col-start-1"}`}>
                  <div className="pair-image-wrap mt-8 md:mt-[6vh]">
                    <ImgCard src={p.image.url} alt={p.image.alt} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
