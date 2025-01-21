import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SubscriptionPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const navigate = useNavigate();

  const subscriptionPrices = {
    "1 minute": 10, // Example price
    "5 days": 100,
    "10 days": 200,
  };

  const handleSubscription = () => {
    if (!selectedPeriod) {
      alert("Please select a subscription period.");
      return;
    }

    // Navigate to payment page with subscription details
    navigate("/payment", {
      state: {
        period: selectedPeriod,
        price: subscriptionPrices[selectedPeriod],
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500">
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
          className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600"
        >
          Subscribe Now
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPage;
