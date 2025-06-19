import { useGetOneStaffQuery } from '@/redux/ApiController/staffApi';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function StaffDetails() {
  const { staffId } = useParams();
  const { data: staff, error, isLoading } = useGetOneStaffQuery(staffId);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen px-4">
        <p className="text-gray-500 text-lg">Loading staff details...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen px-4">
        <p className="text-red-500 text-lg">Error loading staff data.</p>
      </div>
    );
  if (!staff)
    return (
      <div className="flex justify-center items-center h-screen px-4">
        <p className="text-gray-500 text-lg">No staff data found.</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 md:p-10 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mt-12">
        {/* Photo */}
        <div className="flex-shrink-0">
          <img
            src={`${import.meta.env.VITE_BASE_URL}/public/photo/${staff.photo}`}
            alt={staff.name}
            className="w-36 h-36 md:w-48 md:h-48 rounded-full object-cover border-4 border-blue-600 shadow-md"
          />
        </div>

        {/* Info */}
        <div className="flex-grow w-full">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 text-center md:text-left">
            {staff.name}
          </h1>
          <p className="text-blue-600 font-semibold text-lg mb-6 capitalize text-center md:text-left">
            {staff.position} at {staff.department}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
            <InfoItem label="Phone" value={staff.phone} />
            <InfoItem label="Email" value={staff.email} isLink />
            <InfoItem label="Gender" value={staff.gender} />
            <InfoItem label="Religion" value={staff.religion} />
            <InfoItem label="District" value={staff.district} />
            <InfoItem label="Permanent Address" value={staff.permanentAddress} />
            <InfoItem label="Present Address" value={staff.presentAddress} />
            <InfoItem label="Family Contact" value={staff.familyNumber} />
            <InfoItem label="Date of Birth" value={formatDate(staff.dateOfBirth)} />
            <InfoItem label="Salary" value={`৳ ${staff.salary}`} />
            <InfoItem label="Joining Date" value={formatDate(staff.joiningDate)} />
            <InfoItem label="Leaving Date" value={formatDate(staff.leavingDate)} />
          </div>

          <div className="mt-10 text-center md:text-left">
            <strong className="block text-gray-800 mb-3 text-lg">Curriculum Vitae (CV):</strong>
            <a
              href={`${import.meta.env.VITE_BASE_URL}/public/photo/${staff.cv}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
            >
              View CV
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, isLink }) {
  if (!value) return null;
  if (isLink) {
    return (
      <p className="break-words">
        <strong>{label}:</strong>{' '}
        <a href={`mailto:${value}`} className="text-blue-600 hover:underline break-all">
          {value}
        </a>
      </p>
    );
  }
  return (
    <p className="break-words">
      <strong>{label}:</strong> {value}
    </p>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
