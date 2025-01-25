import React from "react";
import { NavLink } from "react-router-dom";

const Plans = () => {
  return (
    <>
      {/* Plans Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Select a plan that suits your needs and unlock the full potential of
            our platform.
          </p>

          {/* Plans Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-blue-500">
              <h3 className="text-2xl font-bold text-gray-800">Free Plan</h3>
              <p className="mt-2 text-gray-600">Perfect for casual readers.</p>
              <ul className="mt-4 list-disc list-inside text-gray-600">
                <li>Access to all free articles</li>
                <li>Limited views per month</li>
                <li>Basic customer support</li>
              </ul>
              <p className="mt-6 text-3xl font-bold text-gray-800">Free</p>
              <NavLink
                to="/subscription"
                className="mt-4 inline-block bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 px-6 rounded"
              >
                Get Started
              </NavLink>
            </div>

            {/* Premium Plan */}
            <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-green-500">
              <h3 className="text-2xl font-bold text-gray-800">Premium Plan</h3>
              <p className="mt-2 text-gray-600">
                For dedicated readers who want more.
              </p>
              <ul className="mt-4 list-disc list-inside text-gray-600">
                <li>Unlimited article views</li>
                <li>Exclusive premium articles</li>
                <li>Ad-free reading experience</li>
                <li>Priority customer support</li>
              </ul>
              <p className="mt-6 text-3xl font-bold text-gray-800">
                $10<span className="text-xl">/Minits</span>
              </p>
              <NavLink
                to="/subscription"
                className="mt-4 inline-block bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 px-6 rounded"
              >
                Subscribe Now
              </NavLink>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-yellow-500">
              <h3 className="text-2xl font-bold text-gray-800">
                Enterprise Plan
              </h3>
              <p className="mt-2 text-gray-600">
                Ideal for businesses and teams.
              </p>
              <ul className="mt-4 list-disc list-inside text-gray-600">
                <li>Customized content solutions</li>
                <li>Unlimited team access</li>
                <li>Dedicated account manager</li>
                <li>Advanced analytics</li>
              </ul>

              <p className="mt-6 text-3xl font-bold text-gray-800">
                $200<span className="text-xl">/10days</span>
              </p>
              <NavLink
                to="/subscription"
                className="mt-4 inline-block bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 px-6 rounded"
              >
                Contact Sales
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Plans;
