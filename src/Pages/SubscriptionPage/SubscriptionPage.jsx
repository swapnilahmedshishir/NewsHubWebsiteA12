import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SubscriptionPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const navigate = useNavigate();

  // Prices for each subscription period
  const subscriptionPrices = {
    "1 minute": 10,
    "5 days": 100,
    "10 days": 200,
  };

  const handleSubscription = () => {
    if (!selectedPeriod) {
      toast.info("Please select a subscription period.");
      return;
    }

    // Navigate to the payment page with subscription details
    navigate("/payment", {
      state: {
        period: selectedPeriod,
        price: subscriptionPrices[selectedPeriod],
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 rounded-lg mb-6 shadow-lg text-center">
        <h1 className="text-2xl font-bold">Upgrade to Premium!</h1>
        <p>Enjoy exclusive benefits with our premium subscription.</p>
      </div>

      {/* Subscription Options */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h1 className="text-center text-lg font-bold text-gray-800 mb-4">
          Choose Your Subscription
        </h1>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Select Period</label>
          <select
            className="w-full px-4 py-2 border rounded"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="" disabled>
              Select a period
            </option>
            {Object.keys(subscriptionPrices).map((period) => (
              <option key={period} value={period}>
                {period} - ${subscriptionPrices[period]}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSubscription}
          className="w-full bg-gradient-to-r from-blue-400 to-green-500 text-white py-2 rounded mt-4 hover:bg-gradient-to-r from-blue-500 to-green-500"
        >
          Subscribe Now
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPage;
