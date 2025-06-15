import React, { useState } from 'react';

const generateOrders = () =>
  Array.from({ length: 50 }, (_, i) => ({
    id: `ORD-${1000 + i}`,
    customer: `Customer ${i + 1}`,
    product: `Medicine ${i % 10 + 1}`,
    quantity: Math.floor(Math.random() * 5) + 1,
    status: ['Pending', 'Confirmed', 'Shipped'][i % 3],
    date: `2025-06-${(i % 30 + 1).toString().padStart(2, '0')}`,
  }));

const orders = generateOrders();
const ITEMS_PER_PAGE = 10;

export default function CheckOrders() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);

  const currentOrders = orders.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-blue-600 mb-4">📦 Order List (Check Orders)</h2>

      <div className="overflow-x-auto shadow rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-left text-gray-600 font-semibold">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Product</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.product}</td>
                <td className="p-3">{order.quantity}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.status === 'Confirmed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3">{order.date}</td>
                <td className="p-3 hover:underline">View</td>
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
            onClick={() => setPage(index + 1)}
            className={`px-3 py-1 rounded border ${
              page === index + 1
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
