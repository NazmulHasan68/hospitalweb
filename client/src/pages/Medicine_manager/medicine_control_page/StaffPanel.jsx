import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useGetByDepartmentQuery } from "@/redux/ApiController/staffApi";
import { FileSpreadsheet, Search } from "lucide-react";
import { AddEmployee } from "@/components/Common/staff/AddEmployee";
import { Link } from "react-router-dom";
import { useLoadUserQuery } from "@/redux/ApiController/authApi";
import { EditEmployee } from "@/components/Common/staff/EditEmployee";

const ITEMS_PER_PAGE = 8;

export default function StaffPanel() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const {data} = useLoadUserQuery()

  const { data: staffList = [], isLoading, isError } = useGetByDepartmentQuery(data?.user?.role);

  const filteredStaff = staffList.filter((staff) =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStaff.length / ITEMS_PER_PAGE);
  const currentStaff = filteredStaff.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (isLoading)
    return (
      <p className="p-4 text-center text-gray-600 font-medium">Loading employees...</p>
    );
  if (isError)
    return (
      <p className="p-4 text-center text-red-600 font-semibold">Failed to load employees.</p>
    );

  return (
    <div className="p-4  md:mt-0 -mt-10 bg-gray-50 min-h-screen">
      {/* Header with title and add button */}
      <div className="flex flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-sm md:text-xl font-extrabold text-blue-700 tracking-wide">
          🧑‍💼 Employee Panel
        </h2>
        <AddEmployee />
      </div>

      {/* Search & total count */}
      <div className="flex justify-between items-center gap-3 mb-6">
        <p className="text-gray-700 font-semibold text-sm">Total Employees: {staffList.length}</p>
        <div className="flex items-center max-w-md w-full relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="search"
            placeholder="Search employees by name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Search employees"
          />
        </div>
      </div>

      {/* Staff grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentStaff.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 font-medium mt-8">
            No employees found.
          </p>
        ) : (
          currentStaff.map((staff) => (
            <div
              key={staff._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-5 flex flex-col items-center text-center relative"
            >
              <img
                src={`${import.meta.env.VITE_BASE_URL}/public/photo/${staff.photo}`}
                alt={staff.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-400 mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900">{staff.name}</h3>
              <p className="text-sm text-blue-600 font-medium">{staff.position}</p>
              <p className="text-xs text-gray-600 mt-2">{staff.email}</p>
              <p className="text-xs text-gray-600">{staff.phone}</p>

              <div className=" absolute top-1 right-1 ">
                <EditEmployee staffId={staff._id}/>
              </div>
              <Link  to={`/staff/${staff._id}`} className="absolute top-1 left-1 p-2 bg-slate-200 hover:bg-slate-300 text-blue-600 rounded-full">
                <FileSpreadsheet />
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-md border font-semibold transition ${
                page === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-600 border-blue-400 hover:bg-blue-100"
              }`}
              aria-current={page === i + 1 ? "page" : undefined}
              aria-label={`Page ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

