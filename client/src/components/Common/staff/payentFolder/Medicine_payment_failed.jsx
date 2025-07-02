import React from 'react';
import { XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Medicine_payment_failed() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-md text-center">
        <XCircle className="mx-auto text-red-500" size={60} strokeWidth={1.5} />
        <h1 className="mt-4 text-2xl font-bold text-red-700">Payment Failed!</h1>
        <p className="mt-2 text-gray-600">
          😞 Sorry, your payment could not be processed. Please try again or use a different method.
        </p>

        <div className="mt-6">
          <button
            onClick={() => navigate('/user_medicine')}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-300"
          >
            Go Back and order again
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          If you think this is a mistake, please contact support.
        </p>
      </div>
    </div>
  );
}
