import React, { useState, useMemo } from 'react';
import { useGetAllTravelHelpsQuery } from '@/redux/ApiController/TravelApi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 10;

export default function Travel_Patient_list() {
  const { data = [], isLoading, isError } = useGetAllTravelHelpsQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  // Step 1: Unique users by userId
  const uniqueUsers = useMemo(() => {
    const seen = new Set();
    return data.filter(item => {
      const key = item.userId?._id;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [data]);

  // Step 2: Filter by search
  const filteredUsers = useMemo(() => {
    return uniqueUsers.filter(user =>
      user.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userId?.phone?.includes(searchTerm)
    );
  }, [uniqueUsers, searchTerm]);

  // Step 3: Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePrev = () => setPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setPage(prev => Math.min(prev + 1, totalPages));

  if (isLoading) return <p className="text-center mt-10 text-gray-600">লোড হচ্ছে...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">ডেটা লোড করতে সমস্যা হয়েছে।</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
        ভ্রমণ সহায়তার ব্যবহারকারীদের তালিকা
      </h1>

      {/* Search */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="নাম বা ফোন দিয়ে খুঁজুন..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1); // search করলে প্রথম পেজে যাক
          }}
          className="w-full"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">নাম</th>
              <th className="px-4 py-2 border">ফোন</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  কোনো ব্যবহারকারী পাওয়া যায়নি।
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user, index) => (
                <tr key={user.userId?._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-center">
                    {(page - 1) * ITEMS_PER_PAGE + index + 1}
                  </td>
                  <td className="px-4 py-2 border">{user.userId?.name}</td>
                  <td className="px-4 py-2 border">{user.userId?.phone}</td>
                  <td className="px-4 py-2 border font-bold hover:text-green-500">
                    <Link to={`/travel/patient/${user.userId._id}`}>View</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button onClick={handlePrev} disabled={page === 1}>
            আগের পৃষ্ঠা
          </Button>
          <span>
            পৃষ্ঠা {page} / {totalPages}
          </span>
          <Button onClick={handleNext} disabled={page === totalPages}>
            পরের পৃষ্ঠা
          </Button>
        </div>
      )}
    </div>
  );
}
