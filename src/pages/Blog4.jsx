// Blog4.jsx - "CBSE in Gurukuls: How It Works"
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
        <span className="text-[#1C3664] font-medium">CBSE in Gurukuls</span>
      </li>
    </ol>
  </nav>
);

export default function Blog4() {
  return (
    <main className="w-full bg-white text-[#1C3664]">
      {/* Breadcrumb */}
      <Breadcrumb />
      
      {/* JSON-LD for BlogPosting */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "CBSE in Gurukuls: How It Works",
          alternativeHeadline: "Blending Modern CBSE Curriculum with Traditional Gurukul Values",
          description: "CBSE subjects delivered in a yogic environment—silence, nature, and presence—so students excel in exams and grow inwardly too.",
          image: "/images/CBSE_in_Gurukuls__How_It_Works_u4yzti.jpg",
          author: { "@type": "Person", "name": "Drishti" },
          publisher: {
            "@type": "Organization",
            "name": "Amatir Kanya Gurukul",
          },
          datePublished: "2025-08-11",
          dateModified: "2025-08-11",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "/blog4"
          },
          keywords: "CBSE in Gurukuls, academic excellence, yogic environment, Amatir Kanya Gurukul, holistic education",
          articleSection: "Education, CBSE Curriculum, Gurukul System",
          wordCount: "2400"
        })
      }} />

      {/* Title + meta */}
      <section className="mx-auto w-[92%] max-w-[980px] pt-12 md:pt-16">
        <h1 className="text-center cent-schbk-cyrill text-[28px] leading-tight md:text-[36px]">
          CBSE in Gurukuls: How It Works
        </h1>
        <div className="mt-3 flex justify-center">
          <Meta date="25 Nov 2025" read="5 min read" />
        </div>

        {/* Feature image */}
        <div className="mt-7 flex justify-center">
          <div className="w-full max-w-[600px] overflow-hidden rounded-[10px] shadow-lg">
            <img 
              src="/images/CBSE_in_Gurukuls__How_It_Works_u4yzti.jpg" 
              alt="CBSE curriculum blended with Gurukul education system" 
              className="block w-full h-auto max-h-[50vh] md:max-h-[50vh] object-cover" 
            />
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="mx-auto w-[92%] max-w-[820px] py-10 md:py-14">
        {/* Intro */}
        <h2 className="font-serif text-[22px] md:text-[26px]">The Perfect Blend: CBSE Excellence in a Gurukul Environment</h2>
        <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
          <p>
            At Amatir Kanya Gurukul, we've created something unique: a learning environment where the rigorous CBSE curriculum meets the wisdom of traditional Gurukul education. This isn't just about combining two systems—it's about creating a third way that gives students the best of both worlds.
          </p>
          <p>
            Our students don't just excel in CBSE examinations; they develop the inner strength, cultural awareness, and spiritual foundation that comes from Gurukul education. This article explores how we make this seemingly impossible combination not just work, but thrive.
          </p>
        </div>

        {/* The Dual Approach */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">The Dual Approach: Academic Excellence Meets Spiritual Growth</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              Yes, we follow the CBSE curriculum completely, ensuring our students are on par with national academic standards. But unlike conventional schools, our delivery is infused with Yogic practices, silence, and nature-based learning that enhances rather than distracts from academic achievement.
            </p>
            <p>
              This dual approach helps children:
            </p>
            <ul className="mt-2 list-disc pl-5 text-[14px] leading-7 text-[#3A3A3A]">
              <li>Excel in board exams with better concentration and memory</li>
              <li>Stay rooted in Indian ethos while being globally competitive</li>
              <li>Cultivate inner stillness and strength that supports learning</li>
              <li>Develop emotional intelligence alongside academic intelligence</li>
              <li>Build character that lasts beyond exam results</li>
            </ul>
            <p>
              From sunrise Yoga to evening chanting, every moment of the day becomes a classroom—not just the hours spent inside four walls. This creates students who are not just academically successful but also emotionally balanced and spiritually aware.
            </p>
          </div>
        </section>

        {/* Core Academic Subjects */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">Core Academic Subjects: CBSE Standards with Gurukul Values</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              Amatir Gurukul offers all core subjects as per CBSE guidelines, but with a difference. Each subject is taught not just for examination success but for life application, with values and wisdom integrated into every lesson.
            </p>
          </div>

          {/* Subjects Table */}
          <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
            <div className="hidden grid-cols-[160px_1fr] bg-[#F8FAFF] p-3 text-[13px] font-medium text-[#1C3664] md:grid">
              <div>Class Level</div>
              <div>Subjects Taught</div>
            </div>
            <div className="divide-y divide-slate-200 text-[13.5px] leading-6">
              <div className="grid grid-cols-1 gap-1 p-3 md:grid-cols-[160px_1fr]">
                <div className="font-medium text-[#1C3664]">Primary</div>
                <div className="text-[#334155]">English, Hindi, Sanskrit, Science, Maths, Environmental Science</div>
              </div>
              <div className="grid grid-cols-1 gap-1 p-3 md:grid-cols-[160px_1fr]">
                <div className="font-medium text-[#1C3664]">Middle</div>
                <div className="text-[#334155]">English, Hindi, Sanskrit, Science, Maths, Social Science, Artificial Intelligence</div>
              </div>
              <div className="grid grid-cols-1 gap-1 p-3 md:grid-cols-[160px_1fr]">
                <div className="font-medium text-[#1C3664]">Secondary</div>
                <div className="text-[#334155]">English, Hindi, Sanskrit, Science, Maths, Social Science, Information Technology</div>
              </div>
              <div className="grid grid-cols-1 gap-1 p-3 md:grid-cols-[160px_1fr]">
                <div className="font-medium text-[#1C3664]">Senior Secondary</div>
                <div className="text-[#334155]">Two Languages, Physics, Chemistry, Maths, Biology, Accountancy, Business Studies, Economics, Computer Science, Information Practices, Psychology, Political Science, History, Music-Vocal, Music-Instrumental, Fine Arts, Home Science, Food Production, Physical Education, NCC</div>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              Digital literacy, reading comprehension, and general knowledge are integrated into daily lessons. Amatir also organizes special mentoring programs to prepare students for various competitive exams like JEE, NEET, NDA, CUET, and Olympiads.
            </p>
            <p>
              What makes our approach unique is that every subject is taught with an awareness of its connection to life, values, and the student's overall development. Mathematics isn't just about solving equations—it's about developing logical thinking and problem-solving skills. Science isn't just about memorizing facts—it's about understanding the wonder of creation and our responsibility toward it.
            </p>
          </div>
        </section>

        {/* Teaching Methods */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">Modern Teaching Methods in a Traditional Environment</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              Our teaching style combines the best of modern pedagogy with the wisdom of traditional learning. We use:
            </p>
            <ul className="mt-2 list-disc pl-5 text-[14px] leading-7 text-[#3A3A3A]">
              <li>Activity-based learning that engages multiple senses</li>
              <li>Storytelling and roleplay for primary levels to make learning memorable</li>
              <li>Project-based assignments for middle and secondary students</li>
              <li>Smart boards and visual tools where they enhance understanding</li>
              <li>Bilingual instruction in English and Hindi for clear comprehension</li>
              <li>Group discussions and peer learning to develop communication skills</li>
              <li>Regular assessments that focus on understanding rather than rote memorization</li>
            </ul>
            <p>
              The classroom structure is minimal yet alive—with natural light, open air, and a focus on attention and presence rather than distraction. This environment naturally enhances concentration and learning effectiveness.
            </p>
          </div>
        </section>

        {/* Sanskrit and Cultural Integration */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">Sanskrit and Cultural Integration: Beyond Language Learning</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              While we do not teach ancient scriptures as academic subjects, we retain the cultural richness through daily Sanskrit chanting of slokas, Hawan, and Yoga. This connects students with:
            </p>
            <ul className="mt-2 list-disc pl-5 text-[14px] leading-7 text-[#3A3A3A]">
              <li>Clarity of speech and pronunciation that improves overall communication</li>
              <li>Aesthetic appreciation of sound and silence that enhances focus</li>
              <li>Emotional balance and devotion through chants like Shanti Mantras and Bhagavad Gita verses</li>
              <li>Cultural awareness and pride in their heritage</li>
              <li>Spiritual foundation that supports academic and personal growth</li>
            </ul>
            <p>
              Students also observe Amavasya, Purnima, Guru Purnima, and other sacred days with guided reflections and Yogic practices, helping them internalize wisdom rather than merely study it. This creates a deep connection to their cultural roots while maintaining academic excellence.
            </p>
          </div>
        </section>

        {/* Assessment and Progress Tracking */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">Assessment: Progress Over Pressure</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              Assessment is done in the CBSE format, but with a focus on understanding and growth rather than just grades:
            </p>
            <ul className="mt-2 list-disc pl-5 text-[14px] leading-7 text-[#3A3A3A]">
              <li>Formative and summative tests that measure real understanding</li>
              <li>Classwork, homework, and regular revision that builds mastery</li>
              <li>Portfolio-based progress for primary students that shows holistic development</li>
              <li>Annual projects on science, culture, and nature that encourage creativity</li>
              <li>Regular feedback sessions that help students improve continuously</li>
            </ul>
            <p>
              We focus on progress, not pressure. Parents are updated on both academic and personal growth milestones through term meetings. This approach creates students who are motivated by learning rather than fear of failure, leading to better long-term academic success.
            </p>
          </div>
        </section>

        {/* Competitive Exam Preparation */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">Competitive Exam Preparation: Excellence with Balance</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              Our students regularly excel in competitive examinations, but not at the cost of their overall development. We provide:
            </p>
            <ul className="mt-2 list-disc pl-5 text-[14px] leading-7 text-[#3A3A3A]">
              <li>Specialized coaching for JEE, NEET, NDA, CUET, and Olympiads</li>
              <li>Regular practice tests and mock examinations</li>
              <li>Individual attention and personalized study plans</li>
              <li>Stress management through yoga and meditation</li>
              <li>Balanced approach that maintains physical and mental health</li>
            </ul>
            <p>
              The Gurukul environment provides the discipline and focus needed for competitive exam success while ensuring students don't lose their sense of balance, values, and overall well-being. This creates not just successful students but well-rounded individuals.
            </p>
          </div>
        </section>

        {/* Parent Involvement */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">Parent Involvement: Partners in Education</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              At Amatir, we believe parents are co-educators, not just observers. We involve parents through:
            </p>
            <ul className="mt-2 list-disc pl-5 text-[14px] leading-7 text-[#3A3A3A]">
              <li>Orientation sessions before admission to understand our approach</li>
              <li>Regular parent-teacher circles (not just PTMs) for meaningful dialogue</li>
              <li>Inviting feedback on new activities, workshops, or spiritual events</li>
              <li>Cultural days where parents can observe or participate</li>
              <li>Regular updates on both academic progress and character development</li>
            </ul>
            <p>
              This fosters community, trust, and shared responsibility in shaping a child's path. Parents become partners in the educational journey, understanding both the academic rigor and the character-building aspects of our program.
            </p>
          </div>
        </section>

        {/* Success Stories */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">Success Stories: Academic Excellence with Character</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              Many of our girls go on to:
            </p>
            <ul className="mt-2 list-disc pl-5 text-[14px] leading-7 text-[#3A3A3A]">
              <li>Excel in academics and competitive exams with top ranks</li>
              <li>Lead school events with poise and grace</li>
              <li>Speak fluently in English, Hindi, and Sanskrit verses</li>
              <li>Win accolades in yoga, arts, and inter-school forums</li>
              <li>Carry with them a balanced, humble, and graceful personality into adulthood</li>
              <li>Pursue higher education in prestigious institutions</li>
              <li>Become leaders in their chosen fields while maintaining their values</li>
            </ul>
            <p>
              Their journey is not just measured in marks, but in maturity. They become individuals who are not just successful but also happy, not just capable but also compassionate, not just intelligent but also wise.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mt-10">
          <h2 className="font-serif text-[22px] md:text-[26px]">The Best of Both Worlds: CBSE Excellence with Gurukul Values</h2>
          <div className="mt-2 space-y-4 text-[14px] leading-7 text-[#3A3A3A]">
            <p>
              At Amatir Kanya Gurukul, we've proven that academic excellence and character development are not mutually exclusive. Our students don't have to choose between being successful and being good—they can be both.
            </p>
            <p>
              The CBSE curriculum provides the academic foundation and national recognition that parents want, while the Gurukul environment provides the character building, cultural awareness, and spiritual foundation that creates truly successful individuals.
            </p>
            <p>
              This unique combination creates students who are not just prepared for examinations but for life itself. They are academically excellent, emotionally balanced, culturally aware, and spiritually grounded. This is the true power of CBSE in a Gurukul environment—creating individuals who excel in every aspect of life.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
