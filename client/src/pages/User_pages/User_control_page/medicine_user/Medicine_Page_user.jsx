import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllMedicinesQuery } from '@/redux/ApiController/medicineApi';
import MedicineSearchBar from './Medicine_search_bar';

export default function Medicine_Page_user() {
  const { data: medicines = [], isLoading, isError } = useGetAllMedicinesQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter medicines based on search input
  const filteredMedicines = medicines.filter((medi) => {
    const term = searchTerm.toLowerCase();
    return (
      medi.name?.toLowerCase().includes(term) ||
      medi.company?.toLowerCase().includes(term) ||
      medi.country?.toLowerCase().includes(term) ||
      medi.category?.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredMedicines.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen text-lg text-gray-500">Loading medicines...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center min-h-screen text-lg text-red-500">Failed to load medicines.</div>;
  }

  return (
    <div className="min-h-screen p-2">
      <div className='md:hidden flex justify-between items-center py-4'>
        <p>Find Medicine</p>
        <MedicineSearchBar/>
      </div>
      <div className="mb-6 flex justify-between items-center gap-4">
        <h2 className="md:text-lg text-xs font-semibold text-gray-700">
          Total:{filteredMedicines.length}
        </h2>
        <input
          type="text"
          placeholder="Search by name, company, country, category"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset to first page on search
          }}
          className="w-full sm:w-96 px-4 py-1 md:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {currentItems.map((medi) => (
          <Link
            to={`/product_details/${medi._id}`}
            key={medi._id}
            className="group bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 relative overflow-hidden"
          >
            <div className="md:h-36 h-32 overflow-hidden rounded-t-xl relative">
              <img
                src={
                  Array.isArray(medi.images) && medi.images.length > 0
                    ? `${import.meta.env.VITE_BASE_URL}/public${medi.images[0]}`
                    : "/placeholder.jpg"
                }
                alt={medi.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {medi.discount && (
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full shadow">
                  {medi.discount}% OFF
                </span>
              )}
            </div>

            <div className="p-2">
              <h3 className="text-sm md:text-md font-bold text-gray-800 truncate line-clamp-1">{medi.name}</h3>
              <div className='flex justify-between items-center'>
                <p className="text-gray-500 text-xs mb-1 line-clamp-1">{medi.company || 'Unknown Company'}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-700 font-semibold text-sm md:text-md">৳{medi.price}</span>
                </div>
              </div>
              <button className="w-full mt-3 py-1 md:py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-sm">
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-10 gap-2 flex-wrap">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)]?.map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
