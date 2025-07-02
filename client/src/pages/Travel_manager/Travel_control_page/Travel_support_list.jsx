import React, { useState, useMemo } from 'react';
import { useGetAllHelpMessagesQuery } from '@/redux/ApiController/dashboardApi';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';

export default function Travel_support_list() {
  const { data, isLoading } = useGetAllHelpMessagesQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const entriesPerPage = 5;

  const filtered = useMemo(() => {
    if (!data?.data) return [];
    return data.data.filter(entry =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.phone.includes(searchTerm)
    );
  }, [data, searchTerm]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    return filtered.slice(start, start + entriesPerPage);
  }, [filtered, currentPage]);

  const totalPages = Math.ceil(filtered.length / entriesPerPage);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Travel Support Messages</h2>

      {/* Search bar */}
      <div className="mb-4 flex justify-between items-center">
        <Input
          placeholder="Search by name or phone..."
          className="w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow border rounded-md bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center py-6">Loading...</td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6">No messages found.</td>
              </tr>
            ) : (
              paginatedData.map((entry) => (
                <tr key={entry._id} className="border-t">
                  <td className="px-4 py-3">{entry.name}</td>
                  <td className="px-4 py-3">{entry.phone}</td>
                  <td className="px-4 py-3">{dayjs(entry.createdAt).format('YYYY-MM-DD HH:mm')}</td>
                  <td className="px-4 py-3">
                    <Button onClick={() => setSelectedEntry(entry)}>View</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Message Dialog */}
      {selectedEntry && (
        <Dialog open={true} onOpenChange={() => setSelectedEntry(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-blue-700">
                Messages from {selectedEntry.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-2 mt-4 text-sm text-gray-700 max-h-80 overflow-y-auto">
              {selectedEntry.messages.map((msg, idx) => (
                <p key={idx} className="p-2 bg-blue-50 rounded">{msg}</p>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
