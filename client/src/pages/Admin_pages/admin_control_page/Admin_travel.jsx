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

export default function Admin_travel() {
  const { data, isLoading, error } = useGetAdminDashboardQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTravel, setSelectedTravel] = useState(null);
  const travelsPerPage = 5;

  if (isLoading) return <div className="p-6">Loading travel appointments...</div>;
  if (error) return <div className="p-6 text-red-500">Error loading data.</div>;

  const travels = data?.totalTravels || [];

  const filteredTravels = travels.filter((item) =>
    item.patientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTravels.length / travelsPerPage);
  const currentTravels = filteredTravels.slice(
    (currentPage - 1) * travelsPerPage,
    currentPage * travelsPerPage
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Travel Appointment List</h1>

      <Input
        type="text"
        placeholder="Search by patient name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 max-w-sm"
      />

      <div className="overflow-auto rounded-lg shadow border bg-white">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-3 text-left">Patient Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTravels.map((item, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="p-3">{item.patientName}</td>
                <td className="p-3">{item.phone}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3 capitalize">{item.status}</td>
                <td className="p-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="text-blue-700 border-blue-300"
                        onClick={() => setSelectedTravel(item)}
                      >
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl h-[500px] overflow-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl text-blue-800 font-bold">
                          Travel Appointment Details
                        </DialogTitle>
                      </DialogHeader>
                      {selectedTravel && (
                        <div className="space-y-2 text-sm">
                          <p><strong>Name:</strong> {selectedTravel.patientName}</p>
                          <p><strong>Phone:</strong> {selectedTravel.phone}</p>
                          <p><strong>Email:</strong> {selectedTravel.email}</p>
                          <p><strong>Age:</strong> {selectedTravel.age}</p>
                          <p><strong>Medical Condition:</strong> {selectedTravel.medicalCondition}</p>
                          <p><strong>Preferred Country:</strong> {selectedTravel.preferredCountry}</p>
                          <p><strong>Preferred City:</strong> {selectedTravel.preferredCity}</p>
                          <p><strong>Preferred Hospital:</strong> {selectedTravel.preferredHospital}</p>
                          <p><strong>Status:</strong> {selectedTravel.status}</p>
                          <p><strong>Submitted At:</strong> {selectedTravel.submittedAt?.split('T')[0]}</p>
                          <p><strong>Created At:</strong> {selectedTravel.createdAt?.split('T')[0]}</p>
                          {/* You can also display uploaded documents here */}
                          {selectedTravel.documents?.length > 0 && (
                            <div>
                              <p><strong>Documents:</strong></p>
                              <ul className="list-disc ml-5">
                                {selectedTravel.documents.map((doc, i) => (
                                  <li key={i}>
                                    <a
                                      href={`${import.meta.env.VITE_BASE_URL}/public/travel/${doc}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-blue-600 underline"
                                    >
                                      View Document {i + 1}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
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
