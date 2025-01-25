import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import Hero from "./Hero";
import useGetPublisherData from "../../Hook/useGetPublisherData";
import useAxiosSequre from "../../Hook/useAxiosSequre";
import Statistics from "./Statistics";
import useLoginUserInfo from "../../Hook/useLoginUserInfo";
import WhyChoose from "./WhyChoose";
import Plans from "./Plans";

const HomePage = () => {
  const [data] = useGetPublisherData();
  const [userInfo] = useLoginUserInfo();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Check if the user has an active premium subscription
  const hasPremium =
    userInfo?.premiumTaken && new Date(userInfo.premiumTaken) > new Date();

  useEffect(() => {
    if (!hasPremium) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [hasPremium]);

  const handleSubscribeClick = () => {
    navigate("/subscription");
  };

  const handleCancelClick = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-gray-50">
      <Hero />

      {/* All Publishers Section */}
      <section className="py-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          All Publishers
        </h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 mx-auto max-w-5xl">
          {data?.map((publisher) => (
            <div
              key={publisher._id}
              className="bg-white shadow-md p-4 rounded-lg text-center"
            >
              <img
                src={publisher?.logo}
                alt={publisher?.name}
                className="h-16 mx-auto"
              />
              <h3 className="mt-4 text-lg font-semibold">{publisher?.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <Statistics />

      {/* Plans Section */}
      <Plans />

      {/* Unique Sections */}
      {/* why choose  */}
      <WhyChoose />
      {/* news letter  */}
      <section className="py-16 bg-gradient-to-r from-blue-100 to-blue-200">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Stay Updated with Our Newsletter
          </h2>
          <p className="mt-4 text-lg text-gray-700 w-1/2 mx-auto">
            Subscribe to receive the latest updates, exclusive articles, and
            premium content straight to your inbox. Join our growing community
            today!
          </p>
          <form className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="input input-bordered w-full max-w-md px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:scale-105 transform transition-all duration-200"
            >
              Subscribe Now
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            We value your privacy. Unsubscribe anytime with a single click.
          </p>
        </div>

        {/* Decorative Illustration */}
        <div className="mt-10 flex justify-center">
          <img
            src="\premium_photo-1682309526815-efe5d6225117.avif"
            alt="Newsletter Subscription"
            className="rounded-lg shadow-lg max-w-full h-28 md:h-96"
          />
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h3 className="text-xl font-bold mb-4">Subscribe Now</h3>
            <p className="text-gray-600 mb-6">
              Unlock unlimited access to premium articles with our subscription
              plan.
            </p>
            <div className="flex justify-between gap-4">
              <button
                onClick={handleSubscribeClick}
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 px-4 rounded"
              >
                Go to Subscription Page
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-gray-600 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
