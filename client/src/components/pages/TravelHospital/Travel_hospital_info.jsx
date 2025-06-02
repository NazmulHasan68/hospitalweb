import React from 'react';

export default function Travel_hospital_info() {
  const hospitalInfo = {
    country: 'Thailand',
    city: 'Thai city',
    established: 2009,
    beds: 250,
  };

  const infoItems = [
    { label: 'Country', value: hospitalInfo.country },
    { label: 'City', value: hospitalInfo.city },
    { label: 'Established', value: hospitalInfo.established },
    { label: 'Beds', value: hospitalInfo.beds },
  ];

  return (
    <div className="max-w-4xl mx-4 md:mx-auto my-10">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
        {infoItems.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-blue-300 rounded-xl shadow-md p-2 hover:shadow-lg transition"
          >
            <h3 className="text-xs font-semibold text-blue-700">{item.label}</h3>
            <p className="text-gray-700 text-lg font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
