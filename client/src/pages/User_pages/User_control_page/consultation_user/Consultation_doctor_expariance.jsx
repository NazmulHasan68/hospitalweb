import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Consultation_doctor_expariance() {
  const location = useLocation();
  const data = location.state;

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
       {data?.experiences?.map((exp, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg md:p-6 p-4 border-l-4 border-blue-600"
        >
          <h2 className="text-lg text-blue-500 font-semibold">
           {exp.hospitalName || "Unknown Hospital"} &middot;{" "}
          </h2>
          <p className="text-sm text-gray-700">
            Position : {exp.position || "Unknown Position"}
          </p>
          <p className='text-sm text-gray-600'>
            {exp.yearsOfExperience ?? "N/A"} years
          </p>
          <p className="text-sm text-gray-500">
            {new Date(exp.startDate).toLocaleDateString()} -{" "}
            {exp.endDate
              ? new Date(exp.endDate).toLocaleDateString()
              : "Present"}
          </p>
        </div>
      ))}

      </div>
    </div>
  );
}
