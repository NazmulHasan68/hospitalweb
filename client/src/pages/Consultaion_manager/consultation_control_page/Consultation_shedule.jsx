import React, { useState } from 'react';
import {
  useGetAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
} from '@/redux/ApiController/appointmentApi';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'; // adjust path if needed

const statuses = [ 'meeting'];
const ITEMS_PER_PAGE = 10;

export default function Consultation_shedule() {
  const { data = [], isLoading } = useGetAppointmentsQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [updateStatus] = useUpdateAppointmentStatusMutation();

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Filter only "wating" + search
  const filteredData = data
    .filter((item) => item.status === 'meeting')
    .filter(
      (item) =>
        item.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.patientId?.phone?.includes(searchTerm)
    );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Waiting Appointments</h1>

      <input
        type="text"
        placeholder="Search by patient name or phone..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
      />

      {isLoading ? (
        <p>Loading appointments...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
              <thead className="bg-blue-50">
                <tr>
                  <th className="text-left p-3 border-b">Patient Name</th>
                  <th className="text-left p-3 border-b">Phone</th>
                  <th className="text-left p-3 border-b">Doctor Name</th>
                  <th className="text-left p-3 border-b">Status</th>
                  <th className="text-left p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-500">
                      No appointments found.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((appointment) => (
                    <tr key={appointment._id} className="hover:bg-gray-50">
                      <td className="p-3 border-b">{appointment.patientName}</td>
                      <td className="p-3 border-b">{appointment.patientId?.phone}</td>
                      <td className="p-3 border-b">{appointment.doctorId?.name}</td>
                      <td className="p-3 border-b capitalize">
                        <select
                          value={appointment.status}
                          onChange={(e) =>
                            handleStatusChange(appointment._id, e.target.value)
                          }
                          className="border rounded p-1 text-sm"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-3 border-b">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button
                              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                              onClick={() => setSelectedAppointment(appointment)}
                            >
                              View
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Appointment Details</DialogTitle>
                            </DialogHeader>
                            <ViewAllDetails data={selectedAppointment} />
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-2 text-blue-800 font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}



const ViewAllDetails = ({ data }) => {
  if (!data) return null;

  return (
    <div className="text-sm text-gray-800 space-y-4 max-h-[70vh] overflow-y-auto px-2">
      {/* Patient Info */}
      <section className="border-b pb-3">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">Patient Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <p><span className="font-medium">Name:</span> {data.patientName}</p>
          <p><span className="font-medium">Phone:</span> {data.patientId?.phone}</p>
          <p><span className="font-medium">Age:</span> {data.age}</p>
          <p><span className="font-medium">Weight:</span> {data.weight}</p>
          <p className="sm:col-span-2"><span className="font-medium">Address:</span> {data.address}</p>
        </div>
      </section>

      {/* Doctor Info */}
      <section className="border-b pb-3">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">Doctor Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <p><span className="font-medium">Name:</span> {data.doctorId?.name}</p>
          <p><span className="font-medium">Phone:</span> {data.doctorId?.phone}</p>
          <p><span className="font-medium">Specialization:</span> {data.doctorId?.specialization}</p>
          <p><span className="font-medium">Hospital:</span> {data.doctorId?.hospital}</p>
        </div>
      </section>

      {/* Appointment Info */}
      <section className="border-b pb-3">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">Appointment Details</h2>
        <div className="space-y-1">
          <p><span className="font-medium">Date:</span> {new Date(data.appointmentDate).toLocaleString()}</p>
          <p><span className="font-medium">Status:</span> <span className="capitalize">{data.status}</span></p>
          <p><span className="font-medium">Notes:</span> <span className="whitespace-pre-line">{data.notes}</span></p>
        </div>
      </section>

      {/* Reports */}
      {data.reports?.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Reports</h2>
          <ul className="list-disc pl-5 space-y-1">
            {data.reports.map((report, i) => (
              <li key={i}>
                <a
                  href={`${import.meta.env.VITE_BASE_URL}/public/appointment/${report}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  Report {i+1} 
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};


