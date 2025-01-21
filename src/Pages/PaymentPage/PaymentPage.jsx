import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { period, price } = location.state || {};

  const handlePayment = () => {
    // Simulate payment success
    alert("Payment Successful!");

    // Update user as premium (this should ideally be handled on the backend)
    // Redirect back to home or dashboard
    navigate("/dashboard");
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
