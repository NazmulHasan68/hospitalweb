import React, { useState } from 'react';
import { useGetAdminDashboardQuery } from '@/redux/ApiController/dashboardApi';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Admin_employee_list() {
  const { data, isLoading, error } = useGetAdminDashboardQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const employeesPerPage = 5;

  if (isLoading) return <div className="p-6">Loading employee data...</div>;
  if (error) return <div className="p-6 text-red-500">Error loading data.</div>;

  const employees = data?.totalStaff || [];

  const filteredEmployees = employees.filter((emp) =>
    emp.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const currentEmployees = filteredEmployees.slice(
    (currentPage - 1) * employeesPerPage,
    currentPage * employeesPerPage
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Employee List</h1>

      {/* Search */}
      <Input
        type="text"
        placeholder="Search by employee name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 max-w-sm"
      />

      {/* Table */}
      <div className="overflow-auto rounded-lg shadow border bg-white">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-3 text-left">Photo</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Position</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((emp, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/public/photo/${emp.photo}`}
                    alt={emp.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="p-3">{emp.name}</td>
                <td className="p-3">{emp.phone}</td>
                <td className="p-3 capitalize">{emp.position}</td>
                <td className="p-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="text-blue-700 border-blue-300"
                        onClick={() => setSelectedEmployee(emp)}
                      >
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl h-[500px] overflow-auto">
                      <DialogHeader>
                        <DialogTitle className="text-lg text-blue-800">Employee Details</DialogTitle>
                      </DialogHeader>
                      {selectedEmployee && (
                        <div className="space-y-2 text-sm">
                          <img
                            src={`${import.meta.env.VITE_BASE_URL}/public/photo/${selectedEmployee.photo}`}
                            alt={selectedEmployee.name}
                            className="w-24 h-24 rounded-full border mx-auto mb-3"
                          />
                          <p><strong>Name:</strong> {selectedEmployee.name}</p>
                          <p><strong>Email:</strong> {selectedEmployee.email}</p>
                          <p><strong>Phone:</strong> {selectedEmployee.phone}</p>
                          <p><strong>Family Phone:</strong> {selectedEmployee.familyNumber}</p>
                          <p><strong>Gender:</strong> {selectedEmployee.gender}</p>
                          <p><strong>Religion:</strong> {selectedEmployee.religion}</p>
                          <p><strong>Department:</strong> {selectedEmployee.department}</p>
                          <p><strong>Position:</strong> {selectedEmployee.position}</p>
                          <p><strong>Salary:</strong> {selectedEmployee.salary} BDT</p>
                          <p><strong>Date of Birth:</strong> {selectedEmployee.dateOfBirth?.split('T')[0]}</p>
                          <p><strong>Joining Date:</strong> {selectedEmployee.joiningDate?.split('T')[0]}</p>
                          <p><strong>Leaving Date:</strong> {selectedEmployee.leavingDate?.split('T')[0]}</p>
                          <p><strong>Present Address:</strong> {selectedEmployee.presentAddress}</p>
                          <p><strong>Permanent Address:</strong> {selectedEmployee.permanentAddress}</p>
                          <p><strong>District:</strong> {selectedEmployee.district}</p>
                          <p>
                            <strong>CV:</strong>{' '}
                            <a
                              className="text-blue-600 underline"
                              href={`${import.meta.env.VITE_BASE_URL}/public/photo/${selectedEmployee.cv}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              View CV
                            </a>
                          </p>
                        </div>
                      )}
                      <DialogClose asChild>
                        <Button variant="outline" className="mt-4">Close</Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded text-sm ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
