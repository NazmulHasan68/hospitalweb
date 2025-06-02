import React from 'react';

export default function Travel_hospital_location() {
  return (
    <div className="max-w-md flex justify-between items-center py-4 mx-auto mt-10 p-6 bg-white rounded-xl shadow-md text-gray-800">
        
      <div className=" basis-2/3">
        <h2 className="text-xl font-semibold mb-4 text-center">হাসপাতালের ঠিকানা</h2>
        <p className="text-gray-700">১২৩৪ ফাহোলিওথিন রোড, ব্যাংকক, থাইল্যান্ড</p>
      </div>

      <div className=" basis-1/3">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          ম্যাপে দেখুন
        </button>
      </div>
    </div>
  );
}
