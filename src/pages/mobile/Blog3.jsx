// Blog3.jsx - "Why Gurukul Education Builds Character"
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
        <span className="text-[#1C3664] font-medium">Character Building</span>
      </li>
    </ol>
  </nav>
);

export default function Blog3() {
  return (
    <main className="w-full bg-white text-[#1C3664]">
      {/* Breadcrumb */}
      <Breadcrumb />
      
      {/* JSON-LD for BlogPosting */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "Why Gurukul Education Builds Character",
          alternativeHeadline: "How Traditional Gurukul Values Shape Modern Character",
          description: "Discipline, devotion, and daily practice shape confidence without arrogance and resilience without rigidity—how a Gurukul forms character.",
          image: "/images/Rectangle_111_j4hdij.jpg",
          author: { "@type": "Person", "name": "Drishti" },
          publisher: {
            "@type": "Organization",
            "name": "Amatir Kanya Gurukul",
          },
          datePublished: "2025-08-11",
          dateModified: "2025-08-11",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "/blog3"
          },
          keywords: "Gurukul character building, discipline, devotion, Amatir Kanya Gurukul, moral education",
          articleSection: "Education, Character Development, Moral Values",
          wordCount: "2200"
        })
      }} />

      {/* Title + meta */}
      <section className="mx-auto w-[92%] max-w-[980px] pt-12 md:pt-16">
        <h1 className="text-center font-serif text-[28px] leading-tight md:text-[36px]">
          Why Gurukul Education Builds Character
        </h1>
        <div className="mt-3 flex justify-center">
          <Meta date="15 Nov 2025" read="5 min read" />
        </div>

        {/* Feature image */}
        <div className="mt-7 flex justify-center">
          <div className="w-full max-w-[600px] overflow-hidden rounded-[10px] shadow-lg">
            <img 
              src="/images/Rectangle_111_j4hdij.jpg" 
              alt="Students in meditation and character building activities" 
              className="block w-full h-auto max-h-[50vh] md:max-h-[50vh] object-cover" 
            />
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="mx-auto w-[92%] max-w-[820px] py-10 md:py-14">
        {/* Intro */}
        <h2 className="font-serif text-[22px] md:text-[26px]">The Foundation of Character in Gurukul Education</h2>
        <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
          <p>
            In today's fast-paced world, where academic achievement often takes precedence over character development, Gurukul education stands as a beacon of holistic growth. At Amatir Kanya Gurukul, we believe that true education is not just about filling minds with information but about shaping hearts with values, building character through discipline, and nurturing souls through devotion.
          </p>
          <p>
            Character building in a Gurukul environment goes beyond traditional moral education. It's about creating an ecosystem where every aspect of daily life—from morning prayers to evening reflections—contributes to the development of strong, principled, and compassionate individuals.
          </p>
        </div>

        {/* Discipline Through Daily Practice */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">Discipline: The Cornerstone of Character</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              Discipline in a Gurukul is not about rigid rules or harsh punishments. It's about creating a structured environment where students learn to govern themselves. The daily routine itself becomes a teacher, instilling values of punctuality, responsibility, and self-control.
            </p>
            <p>
              Our students learn discipline through:
            </p>
            <ul className="mt-2 list-disc pl-5 text-[14px] leading-7 text-[#3A3A3A]">
              <li>Waking up at the same time every day, aligning with natural rhythms</li>
              <li>Following a structured daily routine that balances work, rest, and reflection</li>
              <li>Maintaining silence during meals, learning the value of mindful consumption</li>
              <li>Keeping their living spaces clean and organized, understanding responsibility</li>
              <li>Participating in community service, learning the importance of contributing to others</li>
            </ul>
            <p>
              This kind of discipline creates students who are confident but not arrogant, strong but not rigid, and capable of self-regulation in any situation.
            </p>
          </div>
        </section>

        {/* Devotion and Spiritual Growth */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">Devotion: Connecting with Higher Values</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              Devotion in the Gurukul context is not about religious dogma but about developing a sense of reverence for life, learning, and service. Through daily prayers, Sanskrit chanting, and meditation, students learn to connect with something greater than themselves.
            </p>
            <p>
              The practice of devotion helps students develop:
            </p>
            <ul className="mt-2 list-disc pl-5 text-[14px] leading-7 text-[#3A3A3A]">
              <li>Humility and gratitude, recognizing the gifts they receive</li>
              <li>Compassion and empathy, understanding their connection to all living beings</li>
              <li>Inner strength and resilience, drawing from spiritual practices during difficult times</li>
              <li>Purpose and meaning, understanding their role in the larger scheme of life</li>
              <li>Peace and contentment, finding joy in simple, meaningful activities</li>
            </ul>
            <p>
              This spiritual foundation provides students with an inner compass that guides them through life's challenges with grace and wisdom.
            </p>
          </div>
        </section>

        {/* Moral Science and Ethics */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">Moral Science: Learning Through Stories and Reflection</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              At Amatir Kanya Gurukul, moral education is not taught as a separate subject but integrated into every aspect of learning. Through stories from Indian epics, folktales, and real-life examples, students learn about values like truth, compassion, courage, and integrity.
            </p>
            <p>
              Our approach to moral education includes:
            </p>
            <ul className="mt-2 list-disc pl-5 text-[14px] leading-7 text-[#3A3A3A]">
              <li>Storytelling sessions where students discuss moral dilemmas and ethical choices</li>
              <li>Group reflections on current events and their moral implications</li>
              <li>Role-playing exercises that help students understand different perspectives</li>
              <li>Community service projects that put values into practice</li>
              <li>Mentorship programs where older students guide younger ones</li>
            </ul>
            <p>
              This approach creates students who are not just aware of right and wrong but who have the courage and conviction to act according to their values, even when it's difficult.
            </p>
          </div>
        </section>

        {/* Character Through Service */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">Service: Building Character Through Giving</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              Service is a fundamental aspect of character building in our Gurukul. Students learn that true strength comes not from what they can take but from what they can give. Through various service activities, they develop empathy, responsibility, and a sense of purpose.
            </p>
            <p>
              Our service programs include:
            </p>
            <ul className="mt-2 list-disc pl-5 text-[14px] leading-7 text-[#3A3A3A]">
              <li>Helping with daily chores and maintenance of the school premises</li>
              <li>Assisting younger students with their studies and daily needs</li>
              <li>Participating in community outreach programs</li>
              <li>Organizing cultural events and celebrations</li>
              <li>Contributing to environmental conservation efforts</li>
            </ul>
            <p>
              Through service, students learn that leadership is not about commanding others but about serving them, that success is not just about personal achievement but about contributing to the greater good.
            </p>
          </div>
        </section>

        {/* Resilience and Emotional Intelligence */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">Resilience: Building Inner Strength</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              The Gurukul environment naturally builds resilience in students. Living away from home, following a structured routine, and facing academic and personal challenges helps students develop inner strength and emotional intelligence.
            </p>
            <p>
              Students develop resilience through:
            </p>
            <ul className="mt-2 list-disc pl-5 text-[14px] leading-7 text-[#3A3A3A]">
              <li>Learning to manage homesickness and emotional challenges</li>
              <li>Developing problem-solving skills through daily challenges</li>
              <li>Building emotional regulation through meditation and yoga</li>
              <li>Learning to work through conflicts and disagreements</li>
              <li>Developing a growth mindset that sees challenges as opportunities</li>
            </ul>
            <p>
              This resilience prepares students to face life's inevitable difficulties with courage, wisdom, and grace, making them not just successful but also emotionally mature and mentally strong.
            </p>
          </div>
        </section>

        {/* Cultural Values and Identity */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">Cultural Values: Rooted Yet Global</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              At Amatir Kanya Gurukul, we believe that strong character comes from being rooted in one's cultural values while being open to global perspectives. Our students learn to appreciate their heritage while developing a cosmopolitan outlook.
            </p>
            <p>
              Cultural character building includes:
            </p>
            <ul className="mt-2 list-disc pl-5 text-[14px] leading-7 text-[#3A3A3A]">
              <li>Learning Sanskrit and understanding the wisdom of ancient texts</li>
              <li>Participating in traditional festivals and cultural celebrations</li>
              <li>Learning classical music, dance, and arts</li>
              <li>Understanding the values embedded in Indian philosophy and literature</li>
              <li>Developing respect for diversity and different cultural perspectives</li>
            </ul>
            <p>
              This cultural grounding gives students a strong sense of identity and values while preparing them to be global citizens who can navigate diverse environments with confidence and respect.
            </p>
          </div>
        </section>

        {/* The Result: Confident, Capable, and Compassionate Individuals */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">The Result: Confident, Capable, and Compassionate Individuals</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              The character building that happens in our Gurukul creates students who are confident but not arrogant, capable but not conceited, and compassionate but not weak. They carry themselves with dignity and grace, treating others with respect and kindness.
            </p>
            <p>
              Our graduates are known for:
            </p>
            <ul className="mt-2 list-disc pl-5 text-[14px] leading-7 text-[#3A3A3A]">
              <li>Strong moral compass and ethical decision-making</li>
              <li>Emotional intelligence and empathy</li>
              <li>Resilience and ability to handle challenges</li>
              <li>Leadership qualities and service orientation</li>
              <li>Cultural awareness and global perspective</li>
              <li>Inner peace and contentment</li>
            </ul>
            <p>
              These qualities make them not just successful in their careers but also happy in their personal lives, contributing positively to their families, communities, and society at large.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">Character: The Foundation of a Fulfilling Life</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              In a world where success is often measured by external achievements, Gurukul education reminds us that true success comes from within. Character is not just about being good—it's about being strong, wise, and capable of making a positive difference in the world.
            </p>
            <p>
              At Amatir Kanya Gurukul, we believe that character building is not a separate activity but the very essence of education. Every aspect of our program—from academic studies to spiritual practices, from community service to cultural activities—is designed to build character.
            </p>
            <p>
              The result is students who are not just prepared for academic success but for life itself. They are individuals who can face any challenge with courage, treat others with compassion, and live with purpose and meaning. This is the true gift of Gurukul education—the gift of character that lasts a lifetime.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
