import React from 'react';
import { Ban } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Medicine_payment_cancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-md text-center">
        <Ban className="mx-auto text-yellow-600" size={60} strokeWidth={1.5} />
        <h1 className="mt-4 text-2xl font-bold text-yellow-700">Payment Cancelled</h1>
        <p className="mt-2 text-gray-600">
          Your payment was cancelled. If this was accidental, you can try again below.
        </p>

        <div className="mt-6">
          <button
            onClick={() => navigate('/user_medicine')}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition duration-300"
          >
            Go Back and Order Again
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Need help? Please contact support for assistance.
        </p>
      </div>
    </div>
  );
}
