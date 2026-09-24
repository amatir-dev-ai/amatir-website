// AmatirKanyaGurukul.jsx
import React, { useLayoutEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const AKGSection = ({
  bigSrc = '/images/Amatir_Kanya_Gurukul_big_pic_skec9b.jpg',
  smallSrc = '/images/image_1_fzoxjw.jpg',
}) => {
  // Responsive breakpoints
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isSmallLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1365 });
  const isDesktop = useMediaQuery({ minWidth: 1366 });
  const navigate = useNavigate();

  // Simple responsive sizing
  const bigImageSize = isMobile ? '300px' : isTablet ? '380px' : isSmallLaptop ? '420px' : '450px';
  const smallImageSize = isMobile ? '120px' : isTablet ? '150px' : isSmallLaptop ? '180px' : '200px';

  const railRef = React.useRef(null);
  const unescoRoot = React.useRef(null);

  useLayoutEffect(() => {
    const rail = railRef.current;
    const unescoSection = unescoRoot.current;
    if (!rail || !unescoSection) return;

    // Force a reflow to ensure all styles are applied
    unescoSection.offsetHeight;
    rail.offsetHeight;

    // Get the rail's position relative to the section (not the document)
    const sectionRect = unescoSection.getBoundingClientRect();
    const railRect = rail.getBoundingClientRect();

    // Calculate rail's position relative to the section
    const railTopRelativeToSection = railRect.top - sectionRect.top;
    const railHeight = railRect.height;
    const railCenterRelativeToSection = railTopRelativeToSection + railHeight / 2;

    // Get viewport center
    const viewportCenter = window.innerHeight / 2;

    // Get actual padding, margin, and border values
    const computedStyle = window.getComputedStyle(unescoSection);
    const paddingTop = parseFloat(computedStyle.paddingTop);
    const marginTop = parseFloat(computedStyle.marginTop);
    const borderTop = parseFloat(computedStyle.borderTopWidth);

    // Adjust the scroll offset calculation to include padding, margin, and border
    const scrollOffsetFromSectionStart =
      railCenterRelativeToSection - viewportCenter + paddingTop + marginTop + borderTop;

    // Debug logging for 1024x600 screens
    if (window.innerWidth === 1024 && window.innerHeight === 600) {
      console.log('1024x600 Debug:', {
        railTopRelativeToSection,
        railHeight,
        railCenterRelativeToSection,
        viewportCenter,
        scrollOffsetFromSectionStart,
        offsetPercentage: (scrollOffsetFromSectionStart / window.innerHeight) * 100,
      });
    }

    // Use pixels for precise control, allow negative values
    // Only clamp to prevent extreme values that could break ScrollTrigger
    const clampedOffset = Math.max(-window.innerHeight, Math.min(window.innerHeight, scrollOffsetFromSectionStart));

    gsap.to(rail, {
      scrollTrigger: {
        trigger: rail,
        start: 'top top',
        end: '+=1000',
        scrub: true,
        pin: true,
        pinSpacing: true,
        pinType: 'fixed',
        markers: false,
        onUpdate: (self) => {
          if (self.progress > 0.99) {
            self.progress = 0;
          }
        },
        onEnter: () => {
          gsap.to(rail, {
            scrollTrigger: {
              scrub: true,
              pin: true,
              pinSpacing: true,
              pinType: 'fixed',
              markers: false,
              onUpdate: (self) => {
                if (self.progress > 0.99) {
                  self.progress = 0;
                }
              },
            },
          });
        },
        onLeave: () => {
          gsap.to(rail, {
            scrollTrigger: {
              scrub: true,
              pin: false,
              pinSpacing: false,
              pinType: 'fixed',
              markers: false,
              onUpdate: (self) => {
                if (self.progress > 0.99) {
                  self.progress = 0;
                }
              },
            },
          });
        },
      },
    });
  }, []);

  // Recalculate on resize
  useLayoutEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative w-full h-screen bg-white px-[3%]">
      {/* Floating SVG decoration - positioned at bottom right, spanning 50% in this section and 50% in next */}
      <div className="absolute bottom-0 right-0 z-50" style={{ transform: 'translateY(50%)' }}>
        <svg width="186" height="371" viewBox="0 0 186 371" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M251.017 11.9733C225.698 12.8406 201.392 27.9367 188.505 48.8151C187.514 50.3639 186.481 50.8596 185.511 50.8596C184.54 50.8596 183.508 50.3639 182.516 48.8151C169.63 27.9367 145.323 12.8406 120.005 11.9733C117.837 11.9733 116.742 12.6548 117.878 15.1329C131.281 45.6142 151.478 87.5155 185.511 87.722C219.544 87.5155 239.741 45.6142 253.144 15.1329C254.3 12.6548 253.185 11.9733 251.017 11.9733Z"
            fill="black"
            fillOpacity="0.1"
            style={{ mixBlendMode: 'soft-light' }}
          />
          <path
            d="M197.798 11.9732C197.798 18.5816 192.284 23.9509 185.49 23.9509C178.696 23.9509 173.182 18.5816 173.182 11.9732C173.182 5.36482 178.696 -0.0045166 185.49 -0.0045166C192.284 -0.0045166 197.798 5.36482 197.798 11.9732Z"
            fill="black"
            fillOpacity="0.1"
            style={{ mixBlendMode: 'soft-light' }}
          />
          <path
            d="M197.798 358.997C197.798 365.606 192.284 370.975 185.49 370.975C178.696 370.975 173.182 365.606 173.182 358.997C173.182 352.389 178.696 347.02 185.49 347.02C192.284 347.02 197.798 352.389 197.798 358.997Z"
            fill="black"
            fillOpacity="0.1"
            style={{ mixBlendMode: 'soft-light' }}
          />
          <path
            d="M71.5159 316.889C66.8487 321.556 59.1458 321.453 54.3547 316.662C49.543 311.85 49.4397 304.168 54.1276 299.501C58.8154 294.834 66.4977 294.937 71.2888 299.728C76.1005 304.54 76.2038 312.222 71.5159 316.889Z"
            fill="black"
            fillOpacity="0.1"
            style={{ mixBlendMode: 'soft-light' }}
          />
          <path
            d="M11.9777 197.793C5.36932 197.793 0 192.279 0 185.485C0 178.691 5.36932 173.177 11.9777 173.177C18.5861 173.177 23.9555 178.691 23.9555 185.485C23.9555 192.279 18.5861 197.793 11.9777 197.793Z"
            fill="black"
            fillOpacity="0.1"
            style={{ mixBlendMode: 'soft-light' }}
          />
          <path
            d="M54.1062 71.4902C49.439 66.823 49.5423 59.1201 54.3334 54.329C59.1451 49.5172 66.8274 49.414 71.4946 54.1018C76.1618 58.769 76.0585 66.4719 71.2674 71.263C66.4557 76.0747 58.7734 76.178 54.1062 71.4902Z"
            fill="black"
            fillOpacity="0.1"
            style={{ mixBlendMode: 'soft-light' }}
          />
          <path
            d="M119.985 358.997C145.303 358.13 169.61 343.033 182.496 322.155C183.487 320.606 184.52 320.111 185.49 320.111C186.461 320.111 187.494 320.606 188.485 322.155C201.371 343.033 225.678 358.13 250.996 358.997C253.165 358.997 254.259 358.315 253.123 355.837C239.721 325.356 219.524 283.455 185.49 283.248C151.457 283.455 131.26 325.356 117.858 355.837C116.701 358.315 117.816 358.997 119.985 358.997Z"
            fill="black"
            fillOpacity="0.1"
            style={{ mixBlendMode: 'soft-light' }}
          />
          <path
            d="M16.4789 261.854C35.0031 279.139 62.8616 285.644 86.7345 280.006C88.5311 279.614 89.6256 280.006 90.3071 280.688C90.968 281.348 91.381 282.464 90.968 284.26C85.3302 308.154 91.8353 335.992 109.12 354.516C110.649 356.044 111.908 356.333 112.858 353.772C124.939 322.754 140.283 278.829 116.369 254.626C92.1451 230.712 48.2405 246.055 17.2223 258.136C14.6616 259.066 14.9507 260.346 16.4789 261.874"
            fill="black"
            fillOpacity="0.1"
            style={{ mixBlendMode: 'soft-light' }}
          />
          <path
            d="M11.9775 119.979C12.8449 145.298 27.941 169.604 48.8194 182.491C50.3682 183.482 50.8638 184.514 50.8638 185.485C50.8638 186.456 50.3682 187.488 48.8194 188.479C27.941 201.386 12.8449 225.672 11.9775 250.991C11.9775 253.159 12.659 254.254 15.1372 253.118C45.6184 239.715 87.5198 219.518 87.7263 185.485C87.5198 151.452 45.6184 131.255 15.1372 117.852C12.659 116.696 11.9775 117.811 11.9775 119.958"
            fill="black"
            fillOpacity="0.1"
            style={{ mixBlendMode: 'soft-light' }}
          />
          <path
            d="M109.141 16.4754C91.8558 34.9995 85.3507 62.8581 90.9885 86.7309C91.3809 88.5276 90.9885 89.6221 90.3276 90.3036C89.6668 90.9644 88.5516 91.3775 86.755 90.9644C62.8615 85.3267 35.0029 91.8318 16.4994 109.117C14.9712 110.645 14.6821 111.905 17.2429 112.855C48.261 124.936 92.1863 140.28 116.39 116.365C140.304 92.1416 124.96 48.237 112.879 17.2188C111.95 14.6581 110.669 14.9472 109.141 16.4754Z"
            fill="black"
            fillOpacity="0.1"
            style={{ mixBlendMode: 'soft-light' }}
          />
        </svg>
      </div>

      {/* Center orange divider line */}
      <div className="absolute left-1/2 top-[-10%] w-0.5 h-[110%] bg-[#ED6D23] transform -translate-x-1/2 z-10" />

      {/* Two equal width divs */}
      <div className="flex h-full" style={{ overflow: 'visible' }}>
        {/* LEFT HALF */}
        <div className="w-1/2 relative flex items-center justify-center" style={{ overflow: 'visible' }}>
          {/* Single container for both images */}
          <div
            className="relative"
            style={{
              width: bigImageSize,
              height: bigImageSize,
              overflow: 'visible',
              marginRight: `calc(${smallImageSize} / 2)`, // Margin at least half the width of small image
            }}
          >
            {/* Big image */}
            <div className="relative overflow-hidden rounded-b-[50%] w-full h-full">
              <img src={bigSrc} alt="Students at Amatir Kanya Gurukul" className="h-full w-full object-cover" />
            </div>

            {/* Small image positioned absolutely at top right, 50% outside and -10% from top */}
            <div
              className="absolute overflow-hidden rounded-t-[50%] border-4 border-white shadow-lg"
              style={{
                width: smallImageSize,
                height: smallImageSize,
                top: `calc(${smallImageSize} * 0.25)`, // -21% from top
                right: `calc(-${smallImageSize} * 0.5)`, // 50% outside to the right
              }}
            >
              <img src={smallSrc} alt="Focused study" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        {/* RIGHT HALF */}
        <div className="w-1/2 flex items-center pl-12">
          <div>
            <h2 className="font-['PT_Serif'] text-[#1C3664] text-4xl leading-tight">Amatir Kanya Gurukul </h2>
            <p className="mt-2 text-[#1C3664] text-xl opacity-90">A CBSE Girls Boarding School</p>
            <p className="mt-6 text-[#1C1C1C] text-base leading-relaxed max-w-lg">
         Rooted in Bharat's timeless wisdom and strengthened by modern education, Amatir nurtures academic excellence, 
         life skills, and inner strength through personalized mentorship, state-of-the-art facilities, and 
         a home-like environment. Every girl who walks through our gates is empowered to thrive with values 
         that last a lifetime.
            </p> 
            <button
              onClick={() => navigate('/contact')}
              className="mt-7 bg-[#ED6D23] text-white px-6 py-3 rounded-full font-semibold cursor-pointer"
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AKGSection;
