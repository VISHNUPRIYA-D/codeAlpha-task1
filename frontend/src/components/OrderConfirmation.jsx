import React from "react";

const OrderConfirmation = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Order Confirmed!</h2>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
