import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Medicine_payment_success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-md text-center">
        <CheckCircle className="mx-auto text-green-500" size={60} strokeWidth={1.5} />
        <h1 className="mt-4 text-2xl font-bold text-green-700">Payment Successful!</h1>
        <p className="mt-2 text-gray-600">
          🎉 Thank you for your order. Your payment has been processed successfully.
        </p>

        <div className="mt-6">
          <button
            onClick={() => navigate('/user_panel/medicine')}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition duration-300"
          >
            Go to Dashboard
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          A confirmation has been sent to your phone number.
        </p>
      </div>
    </div>
  );
}
