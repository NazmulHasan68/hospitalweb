import React, { useState } from 'react';

const sampleClients = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Client ${i + 1}`,
  phone: `+8801${Math.floor(600000000 + Math.random() * 10000000)}`,
  address: `House #${i + 10}, Road #${i + 2}, City ${i % 5 + 1}`,
  image: 'https://ui-avatars.com/api/?name=Client+' + (i + 1),
}));

const ITEMS_PER_PAGE = 50;

export default function ClientList() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sampleClients.length / ITEMS_PER_PAGE);

  const currentClients = sampleClients.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-4">
      <div className='flex justify-between items-center'>
        <h2 className="text-xl font-bold text-blue-600 mb-4">👥 Client List (100) </h2>
        <input type='search' placeholder=' Search by name and number'/>
      </div>

      {/* Client Table */}
      <div className="overflow-x-auto h-[450px] bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-left text-gray-600 font-semibold">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Address</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.map((client) => (
              <tr key={client.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={client.image}
                    alt={client.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-3">{client.name}</td>
                <td className="p-3">{client.phone}</td>
                <td className="p-3">{client.address}</td>
                <td className="p-3 text-center">
                  <button className="text-blue-600 hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === index + 1
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
