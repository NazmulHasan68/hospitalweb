import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ConsultationAddDoctor from './Coultation_add_doctor';
import { useDeleteConsultationMutation, useGetConsultationsQuery } from '@/redux/ApiController/consaltaionAPi';
import { Delete, Edit, View } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function Consultation_doctor_list() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6;

  const { data } = useGetConsultationsQuery();
  const doctors = data || [];

  const [deleteDoctor] = useDeleteConsultationMutation();

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.hospital?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalDoctors = filteredDoctors.length;
  const totalPages = Math.ceil(totalDoctors / doctorsPerPage);
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDeleteDoctor = async(id)=>{
    try {
      await deleteDoctor(id)
      toast.success("Doctor deleted successfully").unwrap();
    } catch (error) {
      toast.error("Failed to Delete Doctor!")
    }
  }
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

      <div className="flex justify-between items-center gap-4">
        <Input
          type="text"
          placeholder="Search by name, phone, hospital"
          className="w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page when search changes
          }}
        />
        <Button className="text-white px-4 py-2 rounded">
          <ConsultationAddDoctor />
        </Button>
      </div>

      {/* Doctor List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentDoctors.length > 0 ? (
          currentDoctors.map((doctor) => (
            <Card
              key={doctor._id}
              className="p-2 flex gap-3 justify-between items-center shadow-xl hover:shadow-2xl duration-300 border rounded"
            >
              <div className="basis-2/6">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/public/doctor/${doctor.photo}`}
                  className="w-full h-36 object-cover"
                />
              </div>
              <div className="basis-3/6">
                <h2 className="text-lg font-semibold">{doctor.name}</h2>
                <p className="text-gray-600">{doctor.specialization}</p>
                <p className="text-gray-600">Hospital : {doctor.hospital}</p>
                <p className="text-gray-600">Phone : {doctor.phone}</p>
                <p className="text-gray-600">Email : {doctor.email}</p>
              </div>
              <div className="flex justify-between flex-col gap-2 basis-1/6">
                <Link to={`/consultation/doctor/${doctor._id}`}><View/></Link>
                <Link to={`/consultation/doctor/${doctor._id}`}><Edit/></Link>
                <button onClick={()=>handleDeleteDoctor(doctor._id)}><Delete/></button>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center col-span-2 text-gray-500">No doctors found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? 'default' : 'outline'}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
