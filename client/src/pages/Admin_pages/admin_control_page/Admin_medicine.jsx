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

export default function Admin_medicine() {
  const { data, isLoading, error } = useGetAdminDashboardQuery();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const perPage = 5;

  if (isLoading) return <div className="p-6">Loading medicines...</div>;
  if (error) return <div className="p-6 text-red-500">Error loading medicines.</div>;

  const medicines = data?.medicine || [];

  console.log(medicines);
  

  const filtered = medicines.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const current = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-blue-900">Medicine List</h1>

      {/* Search */}
      <Input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm mb-4 border-gray-300 focus:border-blue-600"
      />

      {/* Table */}
      <div className="overflow-auto rounded-lg shadow ring-1 ring-gray-200">
        <table className="min-w-full text-sm bg-white text-gray-700">
          <thead className="bg-blue-100 font-semibold text-gray-800">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {current.map((med, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/public${med.images[0]}`}
                    alt={med.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                </td>
                <td className="p-3 font-medium">{med.name}</td>
                <td className="p-3">{med.company}</td>
                <td className="p-3">{med.price}৳</td>
                <td className="p-3">{med.stock}</td>
                <td className="p-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="text-blue-700 border-blue-300 hover:bg-blue-100"
                        onClick={() => setSelectedMedicine(med)}
                      >
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl h-[500px] overflow-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl text-blue-800 font-bold">
                          Medicine Details
                        </DialogTitle>
                      </DialogHeader>

                      {selectedMedicine && (
                        <div className="space-y-2 text-sm text-gray-700">
                          {/* Images */}
                          <div className="flex gap-2 flex-wrap">
                            {selectedMedicine.images?.map((img, i) => (
                              <img
                                key={i}
                                src={`${import.meta.env.VITE_BASE_URL}/public${img}`}
                                alt="medicine"
                                className="w-24 h-24 object-cover rounded border"
                              />
                            ))}
                          </div>

                          <p><strong>Name:</strong> {selectedMedicine.name}</p>
                          <p><strong>Company:</strong> {selectedMedicine.company}</p>
                          <p><strong>Brand:</strong> {selectedMedicine.brand}</p>
                          <p><strong>Category:</strong> {selectedMedicine.category}</p>
                          <p><strong>Country:</strong> {selectedMedicine.country}</p>
                          <p><strong>Price:</strong> {selectedMedicine.price}৳</p>
                          <p><strong>Stock:</strong> {selectedMedicine.stock}</p>
                          <p><strong>Discount:</strong> {selectedMedicine.discount}%</p>
                          <p><strong>Prescription Required:</strong> {selectedMedicine.prescriptionRequired ? 'Yes' : 'No'}</p>
                          <p><strong>Production Date:</strong> {selectedMedicine.productionDate?.split('T')[0]}</p>
                          <p><strong>Expiry Date:</strong> {selectedMedicine.expiryDate?.split('T')[0]}</p>
                          <p><strong>Description:</strong> {selectedMedicine.description}</p>
                          <p><strong>Warning:</strong> {selectedMedicine.warning}</p>
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
