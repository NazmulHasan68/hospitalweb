import React, { useState } from 'react';

const sampleMedicines = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Medicine ${i + 1}`,
  price: `$${(5 + i * 0.75).toFixed(2)}`,
  image: 'https://via.placeholder.com/40',
}));

const ITEMS_PER_PAGE = 12;

export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sampleMedicines.length / ITEMS_PER_PAGE);

  const currentMedicines = sampleMedicines.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-4">
      {/* Top section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-600">Total Products: {sampleMedicines.length}</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded shadow">Add Medicine</button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 text-sm">
        <input className="border p-2 rounded" placeholder="Category" />
        <input className="border p-2 rounded" placeholder="Company" />
        <input className="border p-2 rounded" placeholder="Country" />
        <input className="border p-2 rounded col-span-2 md:col-span-1" placeholder="Search by product name" />
      </div>

      {/* Medicine List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentMedicines.map((med) => (
          <div key={med.id} className="bg-white p-4 shadow rounded flex items-center gap-4">
            <img src={med.image} alt={med.name} className="w-12 h-12 rounded" />
            <div className="flex-1">
              <h3 className="font-semibold">{med.name}</h3>
              <p className="text-sm text-gray-600">{med.price}</p>
            </div>
            <div className="space-x-2 text-sm">
              <button className="text-blue-600 hover:underline">View</button>
              <button className="text-yellow-600 hover:underline">Edit</button>
              <button className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
