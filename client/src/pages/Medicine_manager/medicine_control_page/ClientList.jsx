import { useGetAllOrdersQuery } from '@/redux/ApiController/medicineOrderApi';
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 50;

export default function ClientList() {
  const { data = [], isLoading, isError } = useGetAllOrdersQuery();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique users
  const uniqueClients = useMemo(() => {
    const seen = new Set();
    return data
      .map((order) => order.user)
      .filter((user) => {
        if (!seen.has(user._id)) {
          seen.add(user._id);
          return true;
        }
        return false;
      });
  }, [data]);

  // Filter by search term
  const filteredClients = useMemo(() => {
    return uniqueClients.filter((client) => {
      const lowerSearch = searchTerm.toLowerCase();
      return (
        client.name?.toLowerCase().includes(lowerSearch) ||
        client.phone?.toLowerCase().includes(lowerSearch)
      );
    });
  }, [searchTerm, uniqueClients]);

  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE);

  const currentClients = filteredClients.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-600">
          👥 Client List ({filteredClients.length})
        </h2>
        <input
          type="search"
          placeholder="Search by name or phone"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to page 1 on search
          }}
          className="px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
              <tr key={client._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={client.photoUrl}
                    alt={client.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="p-3">{client.name}</td>
                <td className="p-3">{client.phone}</td>
                <td className="p-3">{client.address || 'N/A'}</td>
                <td className="p-3 text-center">
                  <Link
                    to={`${client._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
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
      )}
    </div>
  );
}
