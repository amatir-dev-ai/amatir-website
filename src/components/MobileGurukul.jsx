import React, { useMemo, useState } from "react";

const Serif = "font-['CentSchbkCyrill_BT']";

function getImageForTitle(title) {
  switch (title) {
    case "Classical Hatha Yoga":
      return "/images/IMG_1083_nvwdp3 (1).jpg";
    case "Sadhana":
      return "/images/Sadhana_tapas_wn5vod.jpg";
    case "Sewa":
      return "/images/2_6_axma0v.jpg";
    case "Inner Engineering":
      return "/images/Inner_Engineering_htmol2.jpg";
    case "Sandhya":
      return "/images/sandhya_sz7fax.jpg";
    case "Hawan":
      return "/images/Hawan02_nzsse2.jpg";
    case "Atma Dhyan":
      return "/images/Atma_Gyan_y46mhe.jpg";
    case "Spiritual Excursions":
      return "/images/Rectangle_63_phii3n.jpg";
    default:
      return "/images/Rectangle_63_phii3n.jpg";
  }
}

export default function MobileGurukul({ id }) {
  const content = useMemo(() => ({
    Sadhana: ` At Amatir Kanya Gurukul, Sadhana reflects the spirit of dedicated effort and self-discipline that shapes every student’s journey. This disciplined way of life helps children cultivate focus, responsibility, and inner strength.

From maintaining personal and shared spaces with care, observing silence during certain hours, rising early, following structured routines, to approaching learning with sincerity and humility — these daily practices nurture a sense of order, respect, and commitment. Through Sadhana, students grow into individuals who carry grace, resilience, and purpose into every aspect of their lives.
`,
    Hatha: `Isha Hatha Yoga at Amatir offers authentic practices from an ancient tradition, taught in their purest form by trained teachers from Sadhguru Gurukulam. More than just physical exercise, these practices help the child build strength, balance, clarity, and inner joy — supporting overall health and well-being.

The program includes Upa Yoga, Angamardana, Surya Kriya, Yogasanas, and Bhuta Shuddhi, enabling the student to align body, mind, and energies, and blossom into their fullest potential.
`,
    Sandhya: `Sandhya is a cherished part of daily life at Amatir Kanya Gurukul. This evening prayer brings together all students in an atmosphere of devotion, gratitude, and positivity.

Through this sacred practice, children cultivate inner calm, focus, and reverence. Sandhya nurtures a deep sense of connection — with themselves, with each other, and with something greater — offering a meaningful close to each day.
`,
    Sewa: `Sewa — or selfless service — is an essential part of life at Amatir Kanya Gurukul. Through small acts of volunteering, students learn the joy of contributing without expectation, developing humility, responsibility, and compassion.

Whether helping maintain their surroundings, supporting daily activities, or lending a hand to peers and teachers, children experience the value of working together for the greater good. Sewa nurtures a spirit of generosity and belonging, shaping students into mindful, caring individuals.
`,
    Hawan: `At Amatir Kanya Gurukul, Hawan is a sacred morning practice where students participate in traditional fire offerings accompanied by Vedic chanting. This ancient ritual fosters purity, gratitude, and mindfulness, as children learn to offer with devotion and reverence.

Through Hawan, students experience a deep sense of connection — honoring nature, cultivating inner discipline, and starting each day with positive intention and harmony.
`,
    InnerEngineering: ` Inner Engineering is a transformative program designed by Sadhguru, offering powerful tools to take charge of your body, mind, emotions, and energies.

Rooted in the ancient science of yoga, Inner Engineering helps students build a foundation of health, clarity, and inner joy. Through guided practices and the sacred Shambhavi Mahamudra Kriya, it nurtures emotional balance, resilience, and a deep sense of harmony — empowering them to navigate modern life with confidence, ease, and meaningful connection to the world around them.`,
    SpiritualExcursions: ` At Amatir Kanya Gurukul, spiritual excursions are an enriching part of the learning journey. The school organizes visits to sacred places like Rishikesh, Amritsar, and other centers of spiritual significance.
     
These experiences give students the opportunity to connect with India’s rich spiritual and cultural heritage, deepen their sense of devotion, and reflect on higher values.
`,
    AtmaDhyan: `Rooted in India's spiritual tradition, Atma Dhyan forms the core of our holistic education. It is more than just a practice—it's a way of life. It helps children build a strong inner foundation, fostering clarity, strength, and balance as they grow. This connection to timeless wisdom empowers them to navigate life with confidence, purpose, and grace — making the Gurukul experience truly transformative.`,
  }), []);

  const tabs = useMemo(() => ([
    { title: "Inner Engineering", key: "InnerEngineering" },
    { title: "Sadhana", key: "Sadhana" },
    { title: "Classical Hatha Yoga", key: "Hatha" },
    { title: "Sandhya", key: "Sandhya" },
    { title: "Sewa", key: "Sewa" },
    { title: "Hawan", key: "Hawan" },
    { title: "Spiritual Excursions", key: "SpiritualExcursions" },
  ]), []);

  const [activeKey, setActiveKey] = useState(tabs[0].key);
  const activeTitle = tabs.find(t => t.key === activeKey)?.title || "";
  const activeImage = getImageForTitle(activeTitle);
  const activeContent = content[activeKey] || "";

  return (
    <section id={id} className="w-full" style={{ background: "#ED6D231A" }}>
      {/* Header */}
      <div className="mx-auto w-[92%] max-w-[1200px] pt-8 pb-4 text-center">
        <div className="flex justify-center mb-4">
          <svg width="59" height="38" viewBox="0 0 59 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M57.1478 5.12402C46.3172 5.49505 35.9196 11.9527 30.4071 20.884C29.9831 21.5465 29.5414 21.7585 29.1262 21.7585C28.711 21.7585 28.2693 21.5465 27.8452 20.884C22.3328 11.9527 11.9351 5.49505 1.10458 5.12402C0.17701 5.12402 -0.291193 5.41555 0.194679 6.47563C5.92797 19.5147 14.5677 37.4389 29.1262 37.5273C43.6847 37.4389 52.3244 19.5147 58.0577 6.47563C58.5524 5.41555 58.0753 5.12402 57.1478 5.12402Z" fill="#002F82"/>
            <path d="M34.3818 5.12375C34.3818 7.95064 32.0231 10.2475 29.1167 10.2475C26.2103 10.2475 23.8516 7.95064 23.8516 5.12375C23.8516 2.29685 26.2103 0 29.1167 0C32.0231 0 34.3818 2.29685 34.3818 5.12375C34.3818 5.12375Z" fill="#002F82"/>
          </svg>
        </div>
        <h2 className={`${Serif} text-[#ED6D23] font-normal not-italic text-center leading-[120%] tracking-[0%]`} style={{ fontSize: "62px" }}>
          Gurukul
        </h2>
        <p className="mt-4 text-black text-center text-base leading-relaxed">
          Guided by Dharma, Prepared for the World
        </p>
      </div>

      {/* Atma Dhyan Intro */}
      <div className="mx-auto w-[92%] max-w-[1200px] pt-6 pb-2 text-center">
        <h3 className={`${Serif} text-[#1C3664] font-normal not-italic text-center leading-[120%] tracking-[0%]`} style={{ fontSize: "44px" }}>
          Atma Dhyan
        </h3>
        <p className="mt-4 text-black text-center text-base leading-relaxed max-w-4xl mx-auto">
          {content.AtmaDhyan}
        </p>
      </div>

      {/* Tab headers (orange rounded rectangles) */}
      <div className="mx-auto w-[92%] max-w-[1200px] mt-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {tabs.map((t) => {
            const isActive = t.key === activeKey;
            return (
              <button
                key={t.key}
                onClick={() => setActiveKey(t.key)}
                className={`px-3 py-1 rounded-full text-sm transition-all cursor-pointer ${isActive ? 'bg-[#ED6D23] text-white' : 'bg-[#ED6D23]/10 text-[#ED6D23] border border-[#ED6D23]/40'}`}
              >
                {t.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active tab content */}
      <div className="mx-auto w-[92%] max-w-[1200px] mt-6">
        <div className="overflow-hidden rounded-[10px]">
          <img src={activeImage} alt={activeTitle} className="w-full h-[220px] object-cover" />
        </div>
        <h4 className={`${Serif} text-[#1C3664] font-normal not-italic mt-4`} style={{ fontSize: "28px" }}>
          {activeTitle}
        </h4>
        <p className="mt-2 text-[#000] text-base leading-relaxed whitespace-pre-line">
          {activeContent}
        </p>
      </div>
    </section>
  );
}


