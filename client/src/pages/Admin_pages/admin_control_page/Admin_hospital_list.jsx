import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { useGetAdminDashboardQuery } from '@/redux/ApiController/dashboardApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Admin_hospital_list() {
  const { data, isLoading, error } = useGetAdminDashboardQuery();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const perPage = 5;

  if (isLoading) return <div className="p-6">Loading hospitals...</div>;
  if (error) return <div className="p-6 text-red-500">Error loading hospitals.</div>;

  const hospitals = data?.totalHospitals || [];

  const filtered = hospitals.filter(h =>
    h.hospitalName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const current = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-blue-900">Hospitals</h1>

      {/* Search */}
      <Input
        type="text"
        placeholder="Search by hospital name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm mb-4 border-gray-300 focus:border-blue-600"
      />

      {/* Table */}
      <div className="overflow-auto rounded-lg shadow ring-1 ring-gray-200">
        <table className="min-w-full bg-white text-sm text-gray-700">
          <thead className="bg-blue-100 text-gray-800 font-semibold">
            <tr>
              <th className="p-4 text-left">Banner</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Beds</th>
              <th className="p-4 text-left">City</th>
              <th className="p-4 text-left">Country</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {current.map((hospital, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/public/hospitals/${hospital.banner}`}
                    alt="banner"
                    className="w-20 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-4 font-medium">{hospital.hospitalName}</td>
                <td className="p-4">{hospital.beds}</td>
                <td className="p-4">{hospital.city}</td>
                <td className="p-4">{hospital.country}</td>
                <td className="p-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedHospital(hospital)}
                        className="text-blue-700 border-blue-300 hover:bg-blue-100"
                      >
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl h-[500px] overflow-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl text-blue-800 font-bold">
                          Hospital Details
                        </DialogTitle>
                      </DialogHeader>

                      {selectedHospital && (
                        <div className="space-y-2 text-sm text-gray-700">
                          <img
                            src={`${import.meta.env.VITE_BASE_URL}/public/hospitals/${selectedHospital.banner}`}
                            alt={selectedHospital.hospitalName}
                            className="w-full h-40 object-cover rounded mb-4 shadow"
                          />
                          <p><strong>Name:</strong> {selectedHospital.hospitalName}</p>
                          <p><strong>Address:</strong> {selectedHospital.address}</p>
                          <p><strong>Beds:</strong> {selectedHospital.beds}</p>
                          <p><strong>City:</strong> {selectedHospital.city}</p>
                          <p><strong>Country:</strong> {selectedHospital.country}</p>
                          <p><strong>Speciality:</strong> {selectedHospital.speciality}</p>
                          <p><strong>Type:</strong> {selectedHospital.type}</p>
                          <p><strong>Established:</strong> {selectedHospital.established}</p>
                          <p><strong>Description:</strong></p>
                          <p className="text-justify bg-gray-50 p-2 rounded">{selectedHospital.description}</p>
                          <p>
                            <strong>Map Link:</strong>{' '}
                            <a
                              href={selectedHospital.map}
                              className="text-blue-600 underline"
                              target="_blank"
                              rel="noreferrer"
                            >
                              View on Google Maps
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
      <div className="mt-6 flex flex-wrap gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded text-sm ${
              page === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
