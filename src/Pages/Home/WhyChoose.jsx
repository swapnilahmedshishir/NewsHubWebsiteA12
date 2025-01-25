import React from "react";

const WhyChoose = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800">
          Why Choose Us?
        </h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Discover a seamless way to stay informed with articles crafted to meet
          your interests. We bring you the best content from trusted publishers,
          ensuring you never miss what matters most.
        </p>

        {/* Key Benefits Section */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c1.656 0 3-1.343 3-3S13.656 2 12 2 9 3.343 9 5s1.344 3 3 3zm6.364 2.636a3 3 0 10-4.243-4.243m4.243 4.243a3 3 0 11-4.243-4.243M12 16c1.657 0 3 1.344 3 3s-1.343 3-3 3-3-1.344-3-3 1.343-3 3-3zm4.242-6.364a3 3 0 10-4.243-4.243m4.243 4.243a3 3 0 11-4.243-4.243"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Personalized Content
            </h3>
            <p className="mt-2 text-gray-600">
              Articles and recommendations tailored specifically to your
              interests.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16.88 3.549L7.12 8.451a1 1 0 000 1.799l9.76 4.902c.689.346 1.44-.33 1.242-1.036l-1.303-4.467c-.234-.801.505-1.54 1.29-1.41l4.472 1.303c.708.206.583.958.247 1.306L8.67 20.126c-.346.351-1.055.351-1.401 0l-3.752-3.751c-.347-.347-.346-1.055 0-1.402l9.016-9.015a1.25 1.25 0 011.768 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Trusted Publishers
            </h3>
            <p className="mt-2 text-gray-600">
              Gain access to content from reputable and verified publishers
              worldwide.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 10c0 1.38-.56 2.63-1.46 3.54A5.001 5.001 0 0113 19H5a2 2 0 010-4h8a3.99 3.99 0 00-.59-1.75c-.292-.363-.47-.85-.47-1.35 0-1.38.56-2.63 1.46-3.54A5.001 5.001 0 0115 5h4a2 2 0 110 4h-4a3.99 3.99 0 00-.59 1.75c.292.363.47.85.47 1.35z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Ad-Free Experience
            </h3>
            <p className="mt-2 text-gray-600">
              Enjoy uninterrupted reading with our premium, ad-free platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
