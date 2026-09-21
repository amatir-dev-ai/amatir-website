import React from "react";
import { useMediaQuery } from 'react-responsive';

export default function TestimonialsSection() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  // Responsive values
  const sectionPadding = isMobile ? '60px 20px' : '80px 40px';
  const titleFontSize = isMobile ? '28px' : '32px';
  const videoWidth = isMobile ? '100%' : '400px';
  const videoHeight = isMobile ? '250px' : '300px';
  const testimonialFontSize = isMobile ? '14px' : '16px';
  const attributionFontSize = isMobile ? '12px' : '14px';

  return (
    <section 
      className="bg-white"
      style={{ padding: sectionPadding }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2 
          className="font-['PT_Serif'] text-[#1C3664] mb-8"
          style={{ fontSize: titleFontSize }}
        >
          In Their Own Words
        </h2>

        {/* Navigation dots */}
        <div className="flex justify-center mb-6 space-x-2">
          <div className="w-2 h-2 rounded-full bg-[#ED6D23]"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>

        {/* Video Player */}
        <div className="flex justify-center mb-6">
          <div 
            className="relative overflow-hidden rounded-lg bg-gray-200"
            style={{ width: videoWidth, height: videoHeight }}
          >
            <img
              src="/images/testimonial_video_thumbnail_x8k9m2.jpg"
              alt="Student testimonial video thumbnail"
              className="w-full h-full object-cover"
            />
            {/* Play button overlay */}
            <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-all">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-[#ED6D23] ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Student Name */}
        <p className="font-semibold text-[#1C3664] mb-4" style={{ fontSize: testimonialFontSize }}>
          Priya
        </p>

        {/* Testimonial Text */}
        <blockquote 
          className="text-[#3A2323] leading-relaxed mb-6 mx-auto"
          style={{ 
            fontSize: testimonialFontSize,
            maxWidth: isMobile ? '100%' : '600px',
            fontStyle: 'italic'
          }}
        >
          "At Amatir, I've discovered the true meaning of learning. Through the four pillars of education - learning to know, learning to do, learning to live together, and learning to be - I've grown not just academically, but as a person. The environment here nurtures both my mind and spirit, preparing me for the world while staying rooted in values."
        </blockquote>

        {/* Attribution */}
        <div className="text-[#6B7280] space-y-1">
          <p style={{ fontSize: attributionFontSize }}>
            — UNESCO's Four Pillars of Learning
          </p>
          <p style={{ fontSize: attributionFontSize }}>
            — Delors Report to UNESCO
          </p>
          <p style={{ fontSize: attributionFontSize }}>
            — International Commission on Education for the Twenty-first Century
          </p>
        </div>
      </div>
    </section>
  );
}
