import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../Context/ContextProvider";
import useAxiosSequre from "../../Hook/useAxiosSequre";

const PaymentPage = () => {
  const { apiUrl, user } = useContext(AppContext);
  const axiosSecure = useAxiosSequre();
  const location = useLocation();
  const navigate = useNavigate();

  const { period, price } = location.state || {};

  const handlePayment = async () => {
    console.log({
      uid: user?.uid,
      period,
    });

    try {
      // Simulate updating the user's premium status
      const currentTime = new Date();
      await axiosSecure.put("/api/user/updatePremium", {
        uid: user?.uid,
        premiumTaken: currentTime,
        period,
      });

      alert("Payment Successful!");
      navigate("/");
    } catch (error) {
      console.error("Error updating premium status:", error);
      alert("Payment failed. Please try again.");
    }
  };

  if (!period || !price) {
    return <div>No subscription details found.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h1 className="text-center text-lg font-bold text-gray-800 mb-4">
          Payment Details
        </h1>
        <p className="mb-2 text-gray-700">Subscription Period: {period}</p>
        <p className="mb-4 text-gray-700">Price: ${price}</p>
        <button
          onClick={handlePayment}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
