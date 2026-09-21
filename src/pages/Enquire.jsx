import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

const NAVY = "#0E2349";
const ORANGE = "#ED6D23";

const Enquire = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    childName: "",
    grade: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Responsive breakpoints
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      alert("Thank you for your enquiry! We will get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        childName: "",
        grade: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className={`cent-schbk-cyrill mb-4 ${
              isMobile ? "text-3xl" : isTablet ? "text-4xl" : "text-5xl"
            }`}
            style={{ color: NAVY }}
          >
            Enquire Now
          </h1>
          <p className={`univers-regular text-gray-600 max-w-2xl mx-auto ${
            isMobile ? "text-base" : "text-lg"
          }`}>
            Get in touch with us to learn more about Amatir Kanya Gurukul and how we can help your child's educational journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className={`cent-schbk-cyrill  mb-6 ${
              isMobile ? "text-2xl" : "text-3xl"
            }`} style={{ color: NAVY, fontSize: "2.5rem" }}>
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-left">
                <div>
                  <label htmlFor="name" className="block text-sm univers-regular font-medium text-gray-700 mb-2">
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 univers-regular text-sm transition-colors"
                    style={{ 
                      focusRingColor: ORANGE,
                      '--tw-ring-color': ORANGE 
                    }}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm univers-regular font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 univers-regular text-sm transition-colors"
                    style={{ 
                      focusRingColor: ORANGE,
                      '--tw-ring-color': ORANGE 
                    }}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm univers-regular font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 univers-regular text-sm transition-colors"
                    style={{ 
                      focusRingColor: ORANGE,
                      '--tw-ring-color': ORANGE 
                    }}
                    placeholder="+91 9876543210"
                  />
                </div>

                <div>
                  <label htmlFor="childName" className="block text-sm univers-regular font-medium text-gray-700 mb-2">
                    Child's Name
                  </label>
                  <input
                    type="text"
                    id="childName"
                    name="childName"
                    value={formData.childName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 univers-regular text-sm transition-colors"
                    style={{ 
                      focusRingColor: ORANGE,
                      '--tw-ring-color': ORANGE 
                    }}
                    placeholder="Child's full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="grade" className="block text-sm univers-regular font-medium text-gray-700 mb-2">
                  Interested Grade/Class
                </label>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 univers-regular text-sm transition-colors"
                  style={{ 
                    focusRingColor: ORANGE,
                    '--tw-ring-color': ORANGE 
                  }}
                >
                  <option value="">Select Grade</option>
                  <option value="nursery">Nursery</option>
                  <option value="lkg">LKG</option>
                  <option value="ukg">UKG</option>
                  <option value="3">Class 3</option>
                  <option value="4">Class 4</option>
                  <option value="5">Class 5</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm univers-regular font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 univers-regular text-sm transition-colors resize-none"
                  style={{ 
                    focusRingColor: ORANGE,
                    '--tw-ring-color': ORANGE 
                  }}
                  placeholder="Tell us more about your enquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 border border-transparent text-sm univers-regular font-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: ORANGE,
                  focusRingColor: ORANGE,
                  '--tw-ring-color': ORANGE 
                }}
              >
                {isLoading ? "Sending..." : "Send Enquiry"}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className={`font-normal leading-[1.5] tracking-[-0.02em] text-[clamp(1rem,2.5vw,1.125rem)] font-['Univers',sans-serif] mb-6 ${
                isMobile ? "text-xl" : "text-2xl"
              }`} style={{ color: NAVY }}>
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${ORANGE}20` }}>
                    <svg className="w-5 h-5" style={{ color: ORANGE }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-normal leading-[1.5] tracking-[-0.02em] text-[clamp(1rem,2.5vw,1.125rem)] font-['Univers',sans-serif] font-medium text-gray-900">Email</h4>
                    <p className="font-normal leading-[1.5] tracking-[-0.02em] text-[clamp(1rem,2.5vw,1.125rem)] font-['Univers',sans-serif] text-gray-600">info@amatir.org</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${ORANGE}20` }}>
                    <svg className="w-5 h-5" style={{ color: ORANGE }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-normal leading-[1.5] tracking-[-0.02em] text-[clamp(1rem,2.5vw,1.125rem)] font-['Univers',sans-serif] font-medium text-gray-900">Phone</h4>
                    <p className="font-normal leading-[1.5] tracking-[-0.02em] text-[clamp(1rem,2.5vw,1.125rem)] font-['Univers',sans-serif] text-gray-600">+91 7027570124</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${ORANGE}20` }}>
                    <svg className="w-5 h-5" style={{ color: ORANGE }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-normal leading-[1.5] tracking-[-0.02em] text-[clamp(1rem,2.5vw,1.125rem)] font-['Univers',sans-serif] font-medium text-gray-900">Address</h4>
                    <p className="font-normal leading-[1.5] tracking-[-0.02em] text-[clamp(1rem,2.5vw,1.125rem)] font-['Univers',sans-serif] text-gray-600 text-left">
                      Amatir Kanya Gurukul, Bachgaon Gamri,<br />
                      Lukhi Road, Kurukshetra,<br />
                      Haryana 136119
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className={`univers-regular mb-4 ${
                isMobile ? "text-xl" : "text-2xl"
              }`} style={{ color: NAVY }}>
                Why Choose Amatir?
              </h3>
              <ul className="space-y-3 font-normal leading-[1.5] tracking-[-0.02em] text-[clamp(1rem,2.5vw,1.125rem)] font-['Univers',sans-serif] text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Holistic education focusing on academic excellence and character development</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Experienced and dedicated teaching faculty</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Modern facilities and infrastructure</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Safe and nurturing environment for girls</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Co-curricular activities and sports programs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enquire;
