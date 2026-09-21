import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

const NAVY = "#0E2349";
const ORANGE = "#ED6D23";

const ParentLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      alert("Login functionality would be implemented here");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
        
          <h2 
            className={`cent-schbk-cyrill ${
              isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-4xl"
            }`}
            style={{ color: NAVY, marginTop:'4rem' }}
          >
            Parent Login
          </h2>
          <p className={`mt-2 univers-regular ${
            isMobile ? "text-sm" : "text-base"
          } text-gray-600`}>
            Access your child's academic information and school updates
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm univers-regular font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10 univers-regular text-sm transition-colors"
                style={{ 
                  focusRingColor: ORANGE,
                  '--tw-ring-color': ORANGE 
                }}
                placeholder="Enter your email address"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm univers-regular font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10 univers-regular text-sm transition-colors"
                style={{ 
                  focusRingColor: ORANGE,
                  '--tw-ring-color': ORANGE 
                }}
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-offset-2"
                style={{ 
                  focusRingColor: ORANGE,
                  '--tw-ring-color': ORANGE 
                }}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm univers-regular text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="univers-regular font-medium hover:underline transition-colors"
                style={{ color: ORANGE }}
              >
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm univers-regular font-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: ORANGE,
                focusRingColor: ORANGE,
                '--tw-ring-color': ORANGE 
              }}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Additional Links */}
          <div className="text-center">
            <p className="text-sm univers-regular text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="font-medium hover:underline transition-colors"
                style={{ color: ORANGE }}
              >
                Contact the school
              </a>
            </p>
          </div>
        </form>

        {/* Help Section */}
        <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: `${NAVY}10` }}>
          <h3 className="text-sm univers-regular font-medium mb-2" style={{ color: NAVY }}>
            Need Help?
          </h3>
          <p className="text-xs univers-regular text-gray-600 mb-3">
            If you're having trouble accessing your account, please contact the school administration.
          </p>
          <div className="space-y-1">
            <p className="text-xs univers-regular text-gray-600">
              <span className="font-medium">Email:</span> info@amatir.org
            </p>
            <p className="text-xs univers-regular text-gray-600">
              <span className="font-medium">Phone:</span> +91 7027570124
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentLogin;
