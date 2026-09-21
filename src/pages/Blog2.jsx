// Blog2.jsx - "A Day in the Life of a Girl at Amatir Gurukul"
import React from "react";
import { Calendar, Clock, ChevronRight, Home } from "lucide-react";

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

const Breadcrumb = () => (
  <nav className="mx-auto w-[92%] max-w-[980px] pt-8 pb-4" aria-label="Breadcrumb">
    <ol className="flex items-center space-x-2 univers-regular text-[14px] text-[#6A7386]">
      <li className="flex items-center">
        <a 
          href="/" 
          className="inline-flex items-center gap-1 hover:text-[#1C3664] transition-colors duration-200"
        >
          <Home className="h-4 w-4" />
          Home
        </a>
      </li>
      <li className="flex items-center">
        <ChevronRight className="h-4 w-4 mx-2 text-[#9CA3AF]" />
        <a 
          href="/blog" 
          className="hover:text-[#1C3664] transition-colors duration-200"
        >
          Blog
        </a>
      </li>
      <li className="flex items-center">
        <ChevronRight className="h-4 w-4 mx-2 text-[#9CA3AF]" />
        <span className="text-[#1C3664] font-medium">A Day in the Life</span>
      </li>
    </ol>
  </nav>
);

export default function Blog2() {
  return (
    <main className="w-full bg-white text-[#1C3664]">
      {/* Breadcrumb */}
      <Breadcrumb />
      
      {/* JSON-LD for BlogPosting */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "A Day in the Life of a Girl at Amatir Gurukul",
          alternativeHeadline: "Inside the Daily Routine of Students at Amatir Kanya Gurukul",
          description: "Explore a complete day in the life of a girl at Amatir Gurukul — from morning prayers, academic classes, extracurriculars, to boarding life — giving parents insights into the Gurukul lifestyle.",
          image: "/images/Rectangle_110_tdkht6.jpg",
          author: { "@type": "Person", "name": "Drishti" },
          publisher: {
            "@type": "Organization",
            "name": "Amatir Kanya Gurukul",
          },
          datePublished: "2025-08-11",
          dateModified: "2025-08-11",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "/blog2"
          },
          keywords: "Day in the life of a girl at Gurukul, Amatir Gurukul daily routine, girls boarding school Kurukshetra",
          articleSection: "Education, Gurukul Life, Boarding School",
          wordCount: "2500"
        })
      }} />

      {/* Title + meta */}
      <section className="mx-auto w-[92%] max-w-[980px] pt-12 md:pt-16">
        <h1 className="text-center cent-schbk-cyrill text-[28px] leading-tight md:text-[36px]">
          A Day in the Life of a Girl at Amatir Gurukul
        </h1>
        <div className="mt-3 flex justify-center">
          <Meta date="10 Nov 2025" read="6 min read" />
        </div>

        {/* Feature image */}
        <div className="mt-7 flex justify-center">
          <div className="w-full max-w-[600px] overflow-hidden rounded-[10px] shadow-lg">
            <img 
              src="/images/Rectangle_110_tdkht6.jpg" 
              alt="Students practising yoga at Amatir Kanya Gurukul" 
              className="block w-full h-auto max-h-[50vh] md:max-h-[50vh] object-cover" 
            />
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="mx-auto w-[92%] max-w-[820px] py-10 md:py-14">
        {/* Intro */}
        <h2 className="font-serif text-[22px] md:text-[26px]">Inside the Daily Routine of Students at Amatir Kanya Gurukul</h2>
        <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
          <p>
            Ever wondered what a typical day looks like for a girl studying at Amatir Kanya Gurukul? From the first light of dawn to the quiet hours of night, every moment is carefully designed to nurture both academic excellence and spiritual growth.
          </p>
          <p>
            This comprehensive guide takes you through a complete weekday in the life of our students, showing how we seamlessly blend CBSE academics with traditional Gurukul practices, creating an environment where girls thrive both intellectually and personally.
          </p>
        </div>

        {/* Early Morning Routine */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">5:00 AM - The Sacred Beginning</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              The day begins with the gentle sound of the morning bell, not an alarm clock. Our students wake up naturally with the rising sun, embracing the ancient wisdom that early mornings are the most conducive for learning and spiritual practice.
            </p>
            <p>
              The first hour is dedicated to yogic cleansing and preparation. Students perform their morning ablutions mindfully, understanding that cleanliness is not just physical but also mental and spiritual preparation for the day ahead.
            </p>
          </div>
        </section>

        {/* Yoga and Sports */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">5:50 AM - Energizing Body and Mind</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              As the sun begins to warm the earth, our students gather in the open-air yoga hall. Here, they practice Hatha Yoga asanas, pranayama (breathing exercises), and meditation. This isn't just physical exercise—it's a foundation for mental clarity and emotional balance.
            </p>
            <p>
              The yoga session is followed by sports activities. Whether it's volleyball, basketball, or martial arts, students engage in physical activities that build strength, coordination, and team spirit. Many of our girls have represented the school at state and national levels in various sports.
            </p>
          </div>
        </section>

        {/* Breakfast and Hawan */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">7:10 AM - Nourishing Body and Soul</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              Breakfast is served in complete silence, allowing students to eat mindfully and appreciate the nourishment they receive. The food is prepared according to Ayurvedic principles, ensuring it's not just nutritious but also conducive to learning and concentration.
            </p>
            <p>
              At 7:45 AM, the entire school gathers for Hawan (sacred fire ceremony). This ancient ritual creates a sense of community and spiritual connection. Students participate in Sanskrit chanting, learning to appreciate the power of sound and vibration in creating positive energy.
            </p>
          </div>
        </section>

        {/* Academic Classes */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">8:15 AM - Academic Excellence Begins</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              The morning academic sessions focus on core CBSE subjects. What makes our teaching unique is the environment—natural light, fresh air, and a sense of calm that enhances concentration. Teachers use a blend of traditional and modern teaching methods, ensuring students understand concepts deeply rather than just memorizing.
            </p>
            <p>
              Subjects include English, Hindi, Sanskrit, Mathematics, Science, and Social Studies. The Sanskrit classes are particularly special, as students learn not just the language but also the wisdom embedded in ancient texts, connecting them to their cultural heritage.
            </p>
          </div>
        </section>

        {/* Lunch and Afternoon Classes */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">11:10 AM - Midday Nourishment and Learning</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              Lunch is another opportunity for mindful eating and community bonding. Students serve each other, learning the values of service and gratitude. The afternoon academic sessions continue with the same focus on deep understanding and practical application.
            </p>
            <p>
              Special attention is given to Olympiad preparation and competitive exam coaching. Our students regularly excel in various Olympiads and competitive examinations, thanks to the dedicated mentoring and the disciplined environment that fosters excellence.
            </p>
          </div>
        </section>

        {/* Extracurricular Activities */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">4:30 PM - Creative Expression and Skill Development</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              The late afternoon is dedicated to arts, music, dance, and sports. Students can choose from Indian classical music, folk dances, fine arts, handicrafts, and various sports activities. These aren't just hobbies—they're integral parts of character development and self-expression.
            </p>
            <p>
              Many students discover hidden talents during these sessions. The supportive environment encourages experimentation and growth, helping each girl find her unique strengths and interests.
            </p>
          </div>
        </section>

        {/* Evening Rituals */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">6:30 PM - Evening Reflection and Gratitude</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              Sandhya Upasana (evening prayer) is a time for reflection and gratitude. Students gather to chant Sanskrit mantras, expressing gratitude for the day's learning and seeking blessings for continued growth. This practice instills a sense of humility and appreciation for life's gifts.
            </p>
            <p>
              Dinner follows, again in silence, allowing students to reflect on their day and prepare for the evening study session. The food is light and nutritious, designed to support both physical health and mental clarity for evening studies.
            </p>
          </div>
        </section>

        {/* Evening Studies */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">7:30 PM - Guided Learning and Reflection</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              The evening study session is supervised by teachers who provide individual attention and guidance. Students work on homework, prepare for upcoming tests, and engage in self-study. The quiet, focused environment helps them develop concentration and self-discipline.
            </p>
            <p>
              At 9:00 PM, students enjoy a glass of warm milk and spend time in personal reflection. This is when they journal about their day, set goals for tomorrow, and practice gratitude. This habit of reflection is crucial for personal growth and emotional intelligence.
            </p>
          </div>
        </section>

        {/* Night Routine */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">9:30 PM - Peaceful End to a Fulfilling Day</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              The day concludes with night prayers, where students express gratitude for the day's experiences and seek blessings for peaceful sleep. By 9:45 PM, lights are out, and students rest in the knowledge that they've spent their day productively, growing both academically and personally.
            </p>
            <p>
              This routine isn't just about following a schedule—it's about creating a lifestyle that nurtures the whole person. Students learn to balance work and rest, activity and reflection, individual growth and community service.
            </p>
          </div>
        </section>

        {/* Special Days */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">Special Observances and Festival Days</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              On special days like Amavasya, Purnima, and Guru Purnima, the routine is modified to include extended periods of silence, storytelling sessions, and ceremonial Hawan. These observances help students connect with their cultural heritage and develop a deeper understanding of life's spiritual dimensions.
            </p>
            <p>
              Festival days are particularly special, as students participate in cultural celebrations, learn traditional songs and dances, and understand the significance of various Indian festivals. These experiences create lasting memories and strengthen their connection to their roots.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">The Impact of This Daily Routine</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              This carefully designed daily routine creates students who are not just academically excellent but also emotionally balanced, spiritually aware, and culturally rooted. They learn to manage their time effectively, develop self-discipline, and understand the importance of balance in life.
            </p>
            <p>
              Parents often remark on the positive changes they see in their daughters—increased confidence, better concentration, improved health, and a deeper sense of purpose. These changes are the natural result of living a life that honors both tradition and modernity, individual growth and community service.
            </p>
            <p>
              At Amatir Kanya Gurukul, we believe that education is not just about preparing for exams—it's about preparing for life. Our daily routine reflects this philosophy, creating an environment where every girl can discover her potential and develop into a confident, capable, and compassionate individual.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
