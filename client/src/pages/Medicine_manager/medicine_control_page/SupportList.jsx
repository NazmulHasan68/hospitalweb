import React, { useState } from 'react';

const generateSupportAgents = () =>
  Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Support Agent ${i + 1}`,
    email: `support${i + 1}@medicinehub.com`,
    phone: `01700${(100000 + i).toString().slice(0, 6)}`,
    role: ['Technical', 'Customer Care', 'Billing', 'General'][i % 4],
    photo: `https://i.pravatar.cc/150?img=${i + 30}`,
  }));

const ITEMS_PER_PAGE = 12;

export default function SupportList() {
  const [page, setPage] = useState(1);
  const agents = generateSupportAgents();

  const totalPages = Math.ceil(agents.length / ITEMS_PER_PAGE);
  const currentAgents = agents.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-indigo-600 mb-6">🛠️ Support Agents</h2>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentAgents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <img
              src={agent.photo}
              alt={agent.name}
              className="w-20 h-20 rounded-full object-cover mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800">{agent.name}</h3>
            <p className="text-sm text-gray-600">{agent.role}</p>
            <p className="text-xs text-gray-500 mt-2">{agent.email}</p>
            <p className="text-xs text-gray-500">{agent.phone}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded border ${
              page === i + 1
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-indigo-600'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
