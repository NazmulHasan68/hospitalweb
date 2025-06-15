import React, { useState } from 'react';

const generateOrders = () =>
  Array.from({ length: 50 }, (_, i) => ({
    id: `CMP-${3000 + i}`,
    customer: `Customer ${i + 1}`,
    phone: `01800${(100000 + i).toString().slice(0, 6)}`,
    product: `Medicine ${i % 10 + 1}`,
    quantity: Math.floor(Math.random() * 5) + 1,
    date: `2025-06-${(i % 30 + 1).toString().padStart(2, '0')}`,
  }));

const allOrders = generateOrders();
const ITEMS_PER_PAGE = 10;

export default function CompleteOrders() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const filteredOrders = allOrders.filter(
    (order) =>
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.phone.includes(search) ||
      order.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const currentOrders = filteredOrders.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-green-600 mb-4">✅ Completed Orders</h2>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        placeholder="Search by customer, phone, or order ID"
        className="mb-4 p-2 w-full md:w-1/3 border border-gray-300 rounded-md shadow-sm"
      />

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-md shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600 font-semibold">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Product</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length ? (
              currentOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3">{order.phone}</td>
                  <td className="p-3">{order.product}</td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">{order.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No matching orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`px-3 py-1 rounded border ${
              page === index + 1
                ? 'bg-green-600 text-white'
                : 'bg-white text-green-600'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
