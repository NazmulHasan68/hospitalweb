import { useGetAllHospitalsQuery } from '@/redux/ApiController/Hospital';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Travel_search_hospital({ receivedData }) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // hospitals per page

  // Fetch all hospitals from API
  const { data, isLoading, isError, error } = useGetAllHospitalsQuery();
  const hospitals = receivedData && receivedData.length > 0 ? receivedData : data || [];

  if (isLoading && hospitals.length === 0)
    return <p className="text-center">Loading hospitals...</p>;

  if (isError) return <p className="text-center text-red-600">Error: {error?.message}</p>;

  // Total pages based on data length
  const totalPages = Math.ceil(hospitals.length / pageSize);

  // Paginate
  const paginatedHospitals = hospitals.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Page change handler
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="p-6 max-w-7xl md:mx-auto relative">
      {/* Hospital Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
        {paginatedHospitals?.map((hospital, index) => (
          <div
            key={hospital._id}
            className="bg-white rounded-xl shadow-xl hover:shadow-2xl overflow-hidden transition-shadow duration-300 flex"
          >
            {/* Image */}
            <div className="w-1/3">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/public/hospitals/${hospital.banner}`}
                alt={hospital.hospitalName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    'https://via.placeholder.com/400x200?text=Image+Not+Found';
                }}
              />
            </div>
            {/* Info */}
            <div className="p-4 w-2/3 flex flex-col justify-between">
              <div>
                <h2 className="md:text-lg text-sm font-bold text-gray-800 line-clamp-1">
                  {hospital.hospitalName}
                </h2>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  📍 {hospital.city}, {hospital.country}
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  🗓️ Established: {hospital.established}
                </p>
                <p className="text-xs md:text-sm text-gray-600">🛏️ Beds: {hospital.beds}</p>
                <p className="text-xs md:text-sm text-gray-600">
                  🏥 Specialty: {hospital.speciality}
                </p>
                <p className="text-xs md:text-sm text-gray-600">🏷️ H.Type: {hospital.type}</p>
              </div>
              <Link
                to={`hospital/${hospital._id}`}
                className="mt-1 text-center bg-blue-600 text-white text-xs md:text-sm py-1 rounded-md hover:bg-blue-500 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 ${
                pageNum === currentPage ? 'bg-blue-600 text-white' : ''
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </div>
  );
}