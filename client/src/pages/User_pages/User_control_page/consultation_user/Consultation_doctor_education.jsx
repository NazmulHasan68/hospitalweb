import React from 'react';

export default function Consultation_doctor_education() {
  const educationData = [
    {
      degree: 'MBBS',
      institution: 'Dhaka Medical College',
      year: '2010',
    },
    {
      degree: 'MD in Cardiology',
      institution: 'Bangabandhu Sheikh Mujib Medical University (BSMMU)',
      year: '2015',
    },
    {
      degree: 'Fellowship in Interventional Cardiology',
      institution: 'Harvard Medical School, USA',
      year: '2018',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Doctor's Education</h2>
      <div className="space-y-6">
        {educationData.map((edu, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-sm bg-white">
            <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
            <p className="text-gray-600">{edu.institution}</p>
            <p className="text-sm text-gray-500">Year of Completion: {edu.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
