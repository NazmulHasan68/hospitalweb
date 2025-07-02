import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Doctor_payement_successfully() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Your payment has been completed successfully. You can now access your dashboard.
        </p>
        <Link to="/user_panel/doctor/token">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
