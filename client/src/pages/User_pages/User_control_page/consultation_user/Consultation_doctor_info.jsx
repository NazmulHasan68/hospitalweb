import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Consultation_doctor_info() {
  const location = useLocation();
  const data = location.state;

  return (
    <div className="bg-white px-4 py-4 shadow-md rounded-lg max-w-4xl mx-auto mt-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Doctor Information</h2>
      
      <p className="text-gray-600">
        {data?.bio}
      </p>
    </div>
  );
}
