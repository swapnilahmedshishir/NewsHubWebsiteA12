import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CountUp from "react-countup";
import Hero from "./Hero";
import useGetPublisherData from "../../Hook/useGetPublisherData";
import useAxiosSequre from "../../Hook/useAxiosSequre";
import Statistics from "./Statistics";

const HomePage = () => {
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [data] = useGetPublisherData();
  const axiosSequre = useAxiosSequre();

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
    </div>
  );
};

export default HomePage;
