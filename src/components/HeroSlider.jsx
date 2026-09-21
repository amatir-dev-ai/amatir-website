import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/images/vidyashri/slide1.jpeg",
    title: "Empowering Education",
    desc: "Scholarships for deserving students",
  },
  {
    id: 2,
    image: "/images/vidyashri/slide2.jpeg",
    title: "Bright Future",
    desc: "Support for higher education",
  },
  {
    id: 2,
    image: "/images/vidyashri/slide3.jpeg",
    title: "Bright Future",
    desc: "Support for higher education",
  }
];

export default function HeroSlider() {
  const [[index, direction], setIndex] = useState([0, 0]);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [index]);

  const nextSlide = () => {
    setIndex([(index + 1) % slides.length, 1]);
  };

  const prevSlide = () => {
    setIndex([
      index === 0 ? slides.length - 1 : index - 1,
      -1,
    ]);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0.6,
    }),
  };

  return (
    <div className="relative w-full mx-auto max-w-3xl h-[60vh] md:h-[75vh] lg:h-[85vh] overflow-hidden rounded-xl mb-12">

      <AnimatePresence custom={direction}>
        <motion.div
          key={slides[index].id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center rounded-xl mx-auto max-w-4xl"
        >
          {/* Image */}
          <img
            src={slides[index].image}
            alt=""
            className="w-full h-full object-contain object-center rounded-xl"
          />

          {/* Overlay */}
          {/* <div className="absolute inset-0 bg-black/40" /> */}

          {/* Content */}
          {/* <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
            <h2 className="text-xl md:text-3xl font-bold mb-3">
              {slides[index].title}
            </h2>
            <p className="text-sm md:text-base max-w-md">
              {slides[index].desc}
            </p>
          </div> */}
        </motion.div>
      </AnimatePresence>

      {/* Left */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full"
      >
        <ChevronLeft className="text-white" />
      </button>

      {/* Right */}
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full"
      >
        <ChevronRight className="text-white" />
      </button>
    </div>
  );
}
