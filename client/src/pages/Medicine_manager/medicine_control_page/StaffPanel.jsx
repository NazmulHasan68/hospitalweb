import React, { useState } from 'react';

const generateStaff = () =>
  Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Staff Member ${i + 1}`,
    position: ['Pharmacist', 'Cashier', 'Delivery', 'Support'][i % 4],
    email: `staff${i + 1}@medicinehub.com`,
    phone: `019${(30000000 + i * 123).toString().slice(0, 8)}`,
    photo: `https://i.pravatar.cc/150?img=${i + 10}`,
  }));

const ITEMS_PER_PAGE = 8;

export default function StaffPanel() {
  const [page, setPage] = useState(1);
  const staffList = generateStaff();

  const totalPages = Math.ceil(staffList.length / ITEMS_PER_PAGE);
  const currentStaff = staffList.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-blue-600 mb-6">🧑‍⚕️ Staff Panel</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentStaff.map((staff) => (
          <div
            key={staff.id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <img
              src={staff.photo}
              alt={staff.name}
              className="w-20 h-20 rounded-full object-cover mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800">{staff.name}</h3>
            <p className="text-sm text-gray-600">{staff.position}</p>
            <p className="text-xs text-gray-500 mt-2">{staff.email}</p>
            <p className="text-xs text-gray-500">{staff.phone}</p>
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
