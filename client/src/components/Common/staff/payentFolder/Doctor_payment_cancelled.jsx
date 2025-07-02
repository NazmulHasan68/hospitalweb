import React from 'react';
import { Ban } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Doctor_payment_cancelled() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <Ban className="text-yellow-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Cancelled</h2>
        <p className="text-gray-600 mb-6">
          You cancelled the payment process. If that was a mistake, you can try again below.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/user_panel/doctor/token">
            <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full">
              Go to Dashboard
            </button>
          </Link>
          <Link to="/user_consultation/search">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full">
              Try Again
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
