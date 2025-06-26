import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import AddHospital from '@/components/pages/admin/travel/AddHospital';
import { useGetAllHospitalsQuery } from '@/redux/ApiController/Hospital';
import { Link } from 'react-router-dom';

export default function Travel_hospital_list() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // hospitals per page

  // Fetch hospitals (you can add server-side pagination later)
  const { data, isLoading, isError, error } = useGetAllHospitalsQuery();
  const hospitals = data || [];

  if (isLoading) return <p className="text-center">Loading hospitals...</p>;
  if (isError) return <p className="text-center text-red-600">Error: {error?.message}</p>;

  // Calculate total pages
  const totalPages = Math.ceil(hospitals.length / pageSize);

  // Slice hospitals to display for current page
  const paginatedHospitals = hospitals.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handler to change page
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="p-3 max-w-6xl mx-auto space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-700">🏥 Total Hospitals ({hospitals.length})</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          <PlusCircle className="w-5 h-5" />
          <AddHospital />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 font-semibold">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Country</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedHospitals.map((hospital) => (
              <tr key={hospital._id} className="border-b hover:bg-gray-50">
                <td className="p-1 w-12 h-12">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/public/hospitals/${hospital.banner}`}
                    alt={hospital.hospitalName}
                    className="w-full h-full object-cover"
                  />
                </td>
                <td className="p-6 md:p-4 font-medium text-gray-800 line-clamp-1">{hospital.hospitalName}</td>
                <td className="p-4">{hospital.country}</td>
                <td className="p-4 text-center">
                  <Link to={`${hospital._id}`} className="text-blue-600 hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
