import React, { useState, useMemo } from "react";
import { useGetAdminDashboardQuery } from "@/redux/ApiController/dashboardApi";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Admin_patient_list() {
  const { data, isLoading, error } = useGetAdminDashboardQuery();

  const appointments = data?.totalAppointments || [];


  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const itemsPerPage = 5;

  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => {
      const name = item?.patientId?.name?.toLowerCase() || "";
      const phone = item?.patientId?.phone?.toLowerCase() || "";
      return (
        name.includes(search.toLowerCase()) ||
        phone.includes(search.toLowerCase())
      );
    });
  }, [appointments, search]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAppointments.slice(start, start + itemsPerPage);
  }, [filteredAppointments, currentPage]);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error)
    return <div className="p-4 text-red-500">Failed to load patient list.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Patients</h1>

      {/* Search bar */}
      <Input
        placeholder="Search by name or phone"
        className="mb-4 max-w-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Patient Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 bg-white rounded-xl">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={item._id} className="border-t text-sm">
                <td className="p-3">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="p-3">{item?.patientId?.name}</td>
                <td className="p-3">{item?.patientId?.phone}</td>
                <td className="p-3">{item?.doctorId?.name}</td>
                <td className="p-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        onClick={() => setSelectedAppointment(item)}
                      >
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl h-[500px] overflow-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl">
                          Appointment Details
                        </DialogTitle>
                      </DialogHeader>

                      {/* Patient Info */}
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-blue-700 mb-2">
                          Patient Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                          <p>
                            <strong>Name:</strong>{" "}
                            {selectedAppointment?.patientId?.name}
                          </p>
                          <p>
                            <strong>Phone:</strong>{" "}
                            {selectedAppointment?.patientId?.phone}
                          </p>
                          <p>
                            <strong>Age:</strong> {selectedAppointment?.age}
                          </p>
                          <p>
                            <strong>Weight:</strong>{" "}
                            {selectedAppointment?.weight}
                          </p>
                          <p>
                            <strong>Address:</strong>{" "}
                            {selectedAppointment?.address}
                          </p>
                          <p>
                            <strong>Payment Status:</strong>{" "}
                            {selectedAppointment?.paymentStatus}
                          </p>
                          <p>
                            <strong>Status:</strong>{" "}
                            {selectedAppointment?.status}
                          </p>
                          <p>
                            <strong>Notes:</strong>{" "}
                            {selectedAppointment?.notes || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Doctor Info */}
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-green-700 mb-2">
                          Doctor Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                          <p>
                            <strong>Name:</strong>{" "}
                            {selectedAppointment?.doctorId?.name}
                          </p>
                          <p>
                            <strong>Email:</strong>{" "}
                            {selectedAppointment?.doctorId?.email}
                          </p>
                          <p>
                            <strong>Phone:</strong>{" "}
                            {selectedAppointment?.doctorId?.phone}
                          </p>
                          <p>
                            <strong>Specialization:</strong>{" "}
                            {selectedAppointment?.doctorId?.specialization}
                          </p>
                          <p>
                            <strong>Category:</strong>{" "}
                            {selectedAppointment?.doctorId?.category}
                          </p>
                          <p>
                            <strong>Experience:</strong>{" "}
                            {selectedAppointment?.doctorId?.experience} years
                          </p>
                          <p>
                            <strong>Checkup Days:</strong>{" "}
                            {selectedAppointment?.doctorId?.checkupDate?.join(
                              ", "
                            )}
                          </p>
                          <p>
                            <strong>Checkup Time:</strong>{" "}
                            {selectedAppointment?.doctorId?.checkupStartTime} -{" "}
                            {selectedAppointment?.doctorId?.checkupEndTime}
                          </p>
                          <p>
                            <strong>Fees:</strong>{" "}
                            {selectedAppointment?.doctorId?.fees} BDT
                          </p>
                          <p>
                            <strong>Checkup Type:</strong>{" "}
                            {selectedAppointment?.doctorId?.checkupType}
                          </p>
                        </div>
                      </div>

                      {/* Appointment Date */}
                      <div className="mb-4 text-sm text-gray-700">
                        <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                          Appointment Schedule
                        </h3>
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(
                            selectedAppointment?.appointmentDate
                          ).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Time:</strong>{" "}
                          {new Date(
                            selectedAppointment?.appointmentDate
                          ).toLocaleTimeString()}
                        </p>
                      </div>

                      <DialogClose asChild>
                        <Button variant="outline" className="mt-4">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-3">
        <Button
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <span className="text-sm px-2 pt-2">Page {currentPage}</span>
        <Button
          size="sm"
          disabled={
            currentPage >= Math.ceil(filteredAppointments.length / itemsPerPage)
          }
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
