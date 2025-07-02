import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useGetConsultationByIdQuery } from '@/redux/ApiController/consaltaionAPi';
import { useAddAppointmentMutation } from '@/redux/ApiController/appointmentApi';
import { toast } from 'sonner';

export default function Consultaion_doctor_appoinment() {
  const { doctorId, patientId } = useParams();
  const { data: doctor, isLoading } = useGetConsultationByIdQuery(doctorId);
  const [addAppointment, { isLoading: isSubmitting }] = useAddAppointmentMutation();

  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    weight: '',
    address: '',
    appointmentDate: '',
    notes: '',
    totalAmount : '',
    reports: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, reports: [...prev.reports, file] }));
    }
  };

  const removeReport = (index) => {
    setFormData(prev => ({
      ...prev,
      reports: prev.reports.filter((_, i) => i !== index),
    }));
  };

  const isAppointmentValid = () => {
    const selectedDate = dayjs(formData.appointmentDate);
    const day = selectedDate.format('ddd').toLowerCase(); // e.g., 'fri'
    const isValidDay = doctor.checkupDate.includes(day);
    const time = selectedDate.format('HH:mm');
    return (
      isValidDay &&
      time >= doctor.checkupStartTime &&
      time <= doctor.checkupEndTime
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAppointmentValid()) {
      return alert(
        `Invalid appointment! Doctor is available only on [${doctor.checkupDate.join(
          ', '
        )}] between ${doctor.checkupStartTime} - ${doctor.checkupEndTime}`
      );
    }

    const form = new FormData();
    form.append('patientName', formData.patientName);
    form.append('age', formData.age);
    form.append('weight', formData.weight);
    form.append('address', formData.address);
    form.append('appointmentDate', formData.appointmentDate);
    form.append('notes', formData.notes || '');
    form.append('patientId', patientId);
    form.append('doctorId', doctorId);
    form.append('totalAmount', doctor.fees);
    formData.reports.forEach(file => form.append('reports', file));

    try {
      const response = await addAppointment(form).unwrap();
      toast.success('Appointment submitted successfully!');
       if (response.success && response.redirectUrl) {
          window.location.href = response.redirectUrl;
        } else {
          toast.error("Something went wrong while initiating payment.");
        }
      setFormData({
        patientName: '',
        age: '',
        weight: '',
        address: '',
        appointmentDate: '',
        notes: '',
        reports: [],
      });
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong while submitting.');
    }
  };

  if (isLoading || !doctor) {
    return <div className="text-center py-10">Loading doctor info...</div>;
  }

  const formattedStartTime = dayjs(`2024-01-01T${doctor.checkupStartTime}`).format('h:mm A');
  const formattedEndTime = dayjs(`2024-01-01T${doctor.checkupEndTime}`).format('h:mm A');
  const today = dayjs().format('YYYY-MM-DDTHH:mm');

  return (
    <div className="max-w-5xl mx-4 md:mx-auto py-12 mt-16">
      {/* ✅ Doctor Card */}
      <div className="flex flex-col md:flex-row items-center max-w-xl md:mx-auto mx-0 md:gap-6 border p-4 rounded-xl shadow mb-10 bg-white">
        <div className="flex-1">
          <img
            src={`${import.meta.env.VITE_BASE_URL}/public/doctor/${doctor.photo}`}
            alt={doctor.name}
            className="md:w-32 md:h-32 object-cover rounded-2xl border"
          />
          <h2 className="md:text-xl text-lg font-semibold pt-1">Dr. {doctor.name}</h2>
          <p className="text-gray-600 pb-1">
            {doctor.specialization} ({doctor.category})
          </p>
        </div>
        <div className="flex-1 space-y-1">
          <h1 className="text-2xl font-semibold text-blue-600">Appointment Details</h1>
          <p><strong>Days:</strong> {doctor.checkupDate?.join(', ')}</p>
          <p><strong>Time:</strong> {formattedStartTime} - {formattedEndTime}</p>
          <p><strong>Fees:</strong> ৳{doctor.fees}</p>
          <p><strong>Experience:</strong> {doctor.experience} years</p>
        </div>
      </div>

      {/* ✅ Appointment Form */}
      <h2 className="text-xl font-semibold mb-4">Appointment Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Patient Name</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">Appointment Date & Time</label>
            <input
              type="datetime-local"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              min={today}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Notes (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        {/* ✅ Upload Reports */}
        <div>
          <label className="block text-sm font-medium">Previous Doctor Reports</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          {formData.reports.length > 0 && (
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-3">
              {formData.reports.map((file, index) => (
                <div key={index} className="border rounded p-2 relative bg-white shadow">
                  <span
                    className="absolute top-1 right-2 text-red-500 cursor-pointer"
                    onClick={() => removeReport(index)}
                  >
                    ✖
                  </span>
                  {file.type.startsWith('image') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Report ${index}`}
                      className="w-full h-28 object-cover rounded"
                    />
                  ) : (
                    <p className="text-sm text-gray-700">{file.name}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Appointment'}
        </button>
      </form>
    </div>
  );
}
