import React from 'react';

export default function Consultation_doctor_expariance() {
  const experiences = [
    {
      title: 'Senior Consultant, Cardiology',
      hospital: 'Apollo Hospital, Dhaka',
      years: '2015 - Present',
      description:
        'Leading a team of cardiologists and managing complex cardiac surgeries with a success rate above 95%.',
    },
    {
      title: 'Assistant Professor, Cardiology',
      hospital: 'Dhaka Medical College',
      years: '2010 - 2015',
      description:
        'Taught medical students and conducted research in cardiovascular diseases and modern treatment methods.',
    },
    {
      title: 'Resident Doctor, Internal Medicine',
      hospital: 'BSMMU, Dhaka',
      years: '2006 - 2010',
      description:
        'Handled over 1000+ patients in inpatient and emergency departments. Built foundational expertise in diagnostics.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Doctor's Experience</h2>
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg md:p-6 p-4 border-l-4 border-blue-600">
            <h3 className="text-xl font-semibold text-blue-700">{exp.title}</h3>
            <p className="text-sm text-gray-500">{exp.hospital} &middot; {exp.years}</p>
            <p className="mt-2 text-gray-700">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
