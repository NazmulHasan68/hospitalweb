import React from 'react';
import { useLocation } from 'react-router-dom';

export default function ViewPrescription() {
  const location = useLocation();
  const prescriptions = location.state; // should be an array

  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-xl font-bold mb-6 text-center text-gray-800">
        🧾 Prescription Images
      </h1>

      {prescriptions && prescriptions.length > 0 ? (
        <div className="">
          {prescriptions.map((image, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform transform hover:scale-105 h-screen"
            >
              <img
                src={`${baseUrl}/public/prescriptions/${image}`}
                alt={`Prescription ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="p-4 text-center">
                <p className="text-sm text-gray-600">Image {index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-red-500 text-lg">
          ❌ No prescription images found.
        </p>
      )}
    </div>
  );
}
