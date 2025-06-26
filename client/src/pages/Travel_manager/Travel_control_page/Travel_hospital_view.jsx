import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetHospitalByIdQuery } from '@/redux/ApiController/Hospital'

export default function Travel_hospital_view() {
  const { id } = useParams()
  const { data: hospital, isLoading, isError, error } = useGetHospitalByIdQuery(id)

  if (isLoading) return <p className="text-center">Loading hospital details...</p>
  if (isError) return <p className="text-center text-red-600">Error: {error?.message}</p>
  if (!hospital) return <p className="text-center text-gray-500">No data found.</p>

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-blue-800">{hospital.hospitalName}</h1>

      <img
        src={`${import.meta.env.VITE_BASE_URL}/public/hospitals/${hospital.banner}`}
        alt="Hospital Banner"
        className="w-full h-64 object-cover rounded-lg shadow"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
        <div><strong>Country:</strong> {hospital.country}</div>
        <div><strong>City:</strong> {hospital.city}</div>
        <div><strong>Address:</strong> {hospital.address}</div>
        <div><strong>Established:</strong> {hospital.established}</div>
        <div><strong>Beds:</strong> {hospital.beds}</div>
        <div><strong>Speciality:</strong> {hospital.speciality}</div>
        <div><strong>Type:</strong> {hospital.type}</div>
        <div><strong>Map:</strong> <a href={hospital.map} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Map</a></div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mt-6">Description</h2>
        <p className="mt-2 text-gray-700 leading-relaxed">{hospital.description}</p>
      </div>

      {hospital.doctorList?.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mt-6">Doctors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {hospital.doctorList.map((doc, i) => (
              <div key={i} className="p-4 border rounded shadow">
                <img src={doc.image} alt={doc.name} className="w-20 h-20 rounded-full object-cover mb-2" />
                <p><strong>Name:</strong> {doc.name}</p>
                <p><strong>Expertise:</strong> {doc.expertise}</p>
                <p><strong>Experience:</strong> {doc.experience}</p>
                <p><strong>Age:</strong> {doc.age}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
