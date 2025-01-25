import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import Hero from "./Hero";
import useGetPublisherData from "../../Hook/useGetPublisherData";
import useAxiosSequre from "../../Hook/useAxiosSequre";
import Statistics from "./Statistics";

const HomePage = () => {
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [data] = useGetPublisherData();
  const axiosSequre = useAxiosSequre();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Show the modal after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  // Handle the button click to navigate to the subscription page
  const handleSubscribeClick = () => {
    navigate("/subscription");
  };

  // Handle the cancel button to close the modal
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
      <section className="py-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800">Plans</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto max-w-5xl">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold">Free Plan</h3>
            <ul className="mt-4 list-disc pl-4 text-gray-600">
              <li>Access to all free articles</li>
              <li>Limited views per month</li>
            </ul>
            <NavLink
              to="/subscription"
              className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded"
            >
              Subscribe
            </NavLink>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold">Premium Plan</h3>
            <ul className="mt-4 list-disc pl-4 text-gray-600">
              <li>Unlimited article views</li>
              <li>Exclusive premium articles</li>
            </ul>
            <NavLink
              to="/subscription"
              className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded"
            >
              Subscribe
            </NavLink>
          </div>
        </div>
      </section>

      {/* Additional Unique Sections */}
      <section className="py-10 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Why Choose Us?
        </h2>
        <p className="mt-4 text-center max-w-2xl mx-auto text-gray-600">
          Experience a seamless way to stay updated with the best articles,
          tailored to your interests.
        </p>
      </section>
      <section className="py-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Subscribe to our Newsletter
        </h2>
        <form className="mt-6 flex flex-col items-center">
          <input
            type="email"
            placeholder="Your email"
            className="input input-bordered w-full max-w-xs"
          />
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
          >
            Subscribe
          </button>
        </form>
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
                className="bg-blue-600 text-white py-2 px-4 rounded"
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
