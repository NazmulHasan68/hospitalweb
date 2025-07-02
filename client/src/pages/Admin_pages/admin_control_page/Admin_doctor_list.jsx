import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useGetAdminDashboardQuery } from '@/redux/ApiController/dashboardApi';
import { Input } from '@/components/ui/input';

export default function Admin_doctor_list() {
  const { data, isLoading, error } = useGetAdminDashboardQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const doctorsPerPage = 5;

  if (isLoading) return <div className="p-6">Loading doctors...</div>;
  if (error) return <div className="p-6 text-red-500">Error loading doctors.</div>;

  const filteredDoctors = data?.totalDoctors?.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const indexOfLast = currentPage * doctorsPerPage;
  const indexOfFirst = indexOfLast - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-blue-900">Doctors</h1>

      {/* Search */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-sm border-gray-300 focus:border-blue-600"
        />
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-lg shadow ring-1 ring-gray-200">
        <table className="min-w-full bg-white text-sm text-gray-700">
          <thead className="bg-blue-100 text-gray-800 font-semibold">
            <tr>
              <th className="p-4 text-left">Photo</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentDoctors.map((doctor, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/public/doctor/${doctor.photo}`}
                    alt={doctor.name}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                </td>
                <td className="p-4 font-medium">{doctor.name}</td>
                <td className="p-4">{doctor.phone}</td>
                <td className="p-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedDoctor(doctor)}
                        className="text-blue-700 border-blue-300 hover:bg-blue-100"
                      >
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl h-[500px] overflow-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-blue-800">Doctor Details</DialogTitle>
                      </DialogHeader>

                      {selectedDoctor && (
                        <div className="text-sm space-y-2 text-gray-700">
                          <div className="flex items-center justify-center mb-4">
                            <img
                              src={`${import.meta.env.VITE_BASE_URL}/public/doctor/${selectedDoctor.photo}`}
                              alt={selectedDoctor.name}
                              className="w-40 h-36 rounded-xl object-cover border shadow"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <p><strong>Name:</strong> {selectedDoctor.name}</p>
                            <p><strong>Email:</strong> {selectedDoctor.email}</p>
                            <p><strong>Phone:</strong> {selectedDoctor.phone}</p>
                            <p><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
                            <p><strong>Category:</strong> {selectedDoctor.category}</p>
                            <p><strong>Experience:</strong> {selectedDoctor.experience} years</p>
                            <p><strong>Checkup Type:</strong> {selectedDoctor.checkupType}</p>
                            <p><strong>Checkup Days:</strong> {selectedDoctor.checkupDate?.join(', ')}</p>
                            <p><strong>Time:</strong> {selectedDoctor.checkupStartTime} - {selectedDoctor.checkupEndTime}</p>
                            <p><strong>Fees:</strong> {selectedDoctor.fees} ৳</p>
                            <p><strong>Recheck Fees:</strong> {selectedDoctor.recheckFees} ৳</p>
                            <p><strong>Hospital:</strong> {selectedDoctor.hospital}</p>
                            <p><strong>Home Checkup:</strong> {selectedDoctor.homeCheckup}</p>
                            <p><strong>Popular:</strong> {selectedDoctor.popular ? 'Yes' : 'No'}</p>
                            <p><strong>Suggested:</strong> {selectedDoctor.suggested ? 'Yes' : 'No'}</p>
                          </div>

                          <p><strong>Bio:</strong> {selectedDoctor.bio}</p>

                          <p>
                            <strong>Degrees:</strong> {selectedDoctor.degree?.join(', ')}
                          </p>

                          <p>
                            <strong>CV:</strong>{' '}
                            <a
                              href={`${import.meta.env.VITE_BASE_URL}/public/doctor/${selectedDoctor.cv}`}
                              className="text-blue-600 underline"
                              target="_blank"
                              rel="noreferrer"
                            >
                              View CV
                            </a>
                          </p>

                          <p>
                            <strong>License:</strong>{' '}
                            <a
                              href={`${import.meta.env.VITE_BASE_URL}/public/doctor/${selectedDoctor.govtLicense?.[0]}`}
                              className="text-blue-600 underline"
                              target="_blank"
                              rel="noreferrer"
                            >
                              View License
                            </a>
                          </p>

                          {/* Experience */}
                          {selectedDoctor.experiences?.length > 0 && (
                            <div className="mt-4">
                              <h3 className="font-semibold text-blue-700">Experience</h3>
                              {selectedDoctor.experiences.map((exp, i) => (
                                <div key={i} className="border p-2 rounded mt-2 bg-gray-50 shadow-sm">
                                  <p><strong>Hospital:</strong> {exp.hospitalName}</p>
                                  <p><strong>Position:</strong> {exp.position}</p>
                                  <p><strong>Start:</strong> {exp.startDate?.split('T')[0]}</p>
                                  <p><strong>End:</strong> {exp.endDate?.split('T')[0]}</p>
                                </div>
                              ))}
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
      <div className="mt-6 flex flex-wrap gap-2">
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
