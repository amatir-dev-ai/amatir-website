import React from "react";

export default function Gallery({ images, title, subtitle }) {
  return (
    <section className="mx-auto max-w-6xl px-5 md:px-6 py-8 md:py-12">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-[32px] md:text-[44px] font-normal font-serif leading-[120%] text-center text-[#1C3664]">
          {title}
        </h2><br/>
        <p className="text-sm text-[#64748B]">
          {subtitle}
        </p>
      </div>

      {/* Gallery with proper layout and margins */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
        {/* Top Row */}
        <div className="md:col-span-2">
          {/* 16:9 aspect ratio image - height matches stacked images */}
          <div className="h-[400px] md:h-[500px]">
            <img
              src={images[0]}
              alt="Students in assembly"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
        </div>
        
        <div className="md:col-span-1">
          {/* Two 1:1 images stacked vertically - total height = 400px/500px */}
          <div className="space-y-6 h-[400px] md:h-[500px]">
            <div className="h-[197px] md:h-[247px]">
              <img
                src={images[1]}
                alt="Student writing in notebook"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <div className="h-[197px] md:h-[247px]">
              <img
                src={images[2]}
                alt="Children in circle activity"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          {/* 9:16 aspect ratio image - height matches stacked images */}
          <div className="h-[400px] md:h-[500px]">
            <img
              src={images[3]}
              alt="Girl with building blocks"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
        </div>
        
        {/* Bottom Row */}
        <div className="md:col-span-1">
          {/* Two 1:1 images stacked vertically - total height = 400px/500px */}
          <div className="space-y-6 h-[400px] md:h-[500px]">
            <div className="h-[197px] md:h-[247px]">
              <img
                src={images[4]}
                alt="Students in yoga meditation"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <div className="h-[197px] md:h-[247px]">
              <img
                src={images[6]}
                alt="School campus aerial view"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          {/* 16:9 aspect ratio image - height matches stacked images */}
          <div className="h-[400px] md:h-[500px]">
            <img
              src={images[5]}
              alt="Girl observing science experiment"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
        </div>
        
        <div className="md:col-span-1">
          {/* 9:16 aspect ratio image - height matches stacked images */}
          <div className="h-[400px] md:h-[500px]">
            <img
              src={images[7]}
              alt="Students in science laboratory"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
