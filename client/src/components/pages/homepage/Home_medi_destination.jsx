import React from 'react';

export default function Home_medi_destination() {
  const countries = ['India', 'Thailand', 'UAE', 'Egypt', 'Germany'];

  return (
    <section className="bg-blue-50 py-14 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-xl md:text-4xl font-bold text-blue-800 mb-4">
          Top Medical Destinations
        </h2>

        {/* Subheading */}
        <p className="text-slate-600 max-w-xl mx-auto text-sm md:text-md mb-10">
          আমাদের নেটওয়ার্ক বিশ্বের শীর্ষ মেডিকেল ট্যুরিজম কেন্দ্রগুলোকে অন্তর্ভুক্ত করেছে — যা আপনাকে শহর, ডাক্তার এবং খরচের ক্ষেত্রে পছন্দের সুযোগ দেয়।”
        </p>

        {/* Country Cards */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-6">
          {countries.map((country, index) => (
            <div
              key={index}
              className="bg-blue-100 shadow-sm border border-gray-200 rounded-lg py-2 md:py-4 md:px-2 hover:shadow-md transition"
            >
              <p className="text-md md:text-lg font-semibold text-blue-700">{country}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
