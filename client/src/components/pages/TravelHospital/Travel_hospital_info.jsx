import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetHospitalByIdQuery } from '@/redux/ApiController/Hospital';
import { MapPin, Bed, Hospital, Globe, Info } from 'lucide-react';

export default function Travel_hospital_info() {
  const { id } = useParams();
  const { data: hospital, isLoading, isError } = useGetHospitalByIdQuery(id);

  if (isLoading) return <p className="text-center text-blue-600">Loading hospital info...</p>;
  if (isError || !hospital) return <p className="text-center text-red-600">Failed to load hospital details.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 text-center">
      <Link to={'/user_travel/hospital/apply'} className='px-6 py-2 bg-sky-400 hover:bg-sky-600 rounded-sm text-slate-50 text-center '>
        Apply Now
      </Link>
      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <InfoBox icon={<Globe />} label="Country" value={hospital.country} />
        <InfoBox icon={<MapPin />} label="City" value={hospital.city} />
        <InfoBox icon={<Hospital />} label="Type" value={hospital.type} />
        <InfoBox icon={<Bed />} label="Beds" value={hospital.beds} />
        <InfoBox icon={<Info />} label="Speciality" value={hospital.speciality} />
        <InfoBox icon={<MapPin />} label="Address" value={hospital.address} />
      </div>

      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-blue-700">{hospital.hospitalName}</h1>
        <p className="text-gray-600 italic">Established in {hospital.established}</p>
      </div>

      {/* Description */}
      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">📝 Description</h2>
        <p className="text-gray-700 leading-relaxed text-justify">
          {hospital.description}
        </p>
      </div>

      {/* Address & Map */}
      <div className="max-w-2xl  rounded-2xl mx-auto text-center mt-10 space-y-2">
        <h2 className="text-xl font-bold text-blue-700">🏥 হাসপাতালের ঠিকানা</h2>
        <div className='flex gap-3 justify-between items-center'>

          <p className="text-gray-800 font-medium bg-blue-200 py-6 basis-1/2">{hospital.address}</p>

          {hospital.map && (
            <a
              href={hospital.map}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block basis-1/2 cursor-pointer hover:shadow-lg duration-300 bg-blue-200 py-6 text-blue-600 hover:underline text-xl"
            >
              🌍 ম্যাপে দেখুন
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable Info Card
const InfoBox = ({ icon, label, value }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow p-4 flex items-start gap-3">
    <div className="text-blue-600">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-md font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);
