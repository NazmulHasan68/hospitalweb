import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetTravelByIdQuery } from '@/redux/ApiController/TravelApi';
import { Card, CardContent } from '@/components/ui/card';

export default function View_order() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetTravelByIdQuery(id);

  if (isLoading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (isError || !data || data.length === 0) return <p className="text-center mt-10 text-red-500">No order found.</p>;

  const order = data[0]; // Get the first item from the array
  const {
    patientName,
    age,
    email,
    phone,
    medicalCondition,
    preferredCountry,
    preferredCity,
    preferredHospital,
    status,
    submittedAt,
    updatedAt,
    userId,
  } = order;

  return (
    <div className="max-w-2xl mx-auto mt-2 p-4 h-[500px] overflow-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Travel Order Details</h1>

      <Card className="shadow-md rounded-2xl p-4 ">
        <CardContent className="space-y-4 text-gray-700">
          <div><strong className="text-gray-800">Patient Name:</strong> {patientName}</div>
          <div><strong className="text-gray-800">Age:</strong> {age}</div>
          <div><strong className="text-gray-800">Email:</strong> {email}</div>
          <div><strong className="text-gray-800">Phone:</strong> {phone}</div>
          <div><strong className="text-gray-800">Medical Condition:</strong> {medicalCondition}</div>
          <div><strong className="text-gray-800">Preferred Country:</strong> {preferredCountry}</div>
          <div><strong className="text-gray-800">Preferred City:</strong> {preferredCity}</div>
          <div><strong className="text-gray-800">Preferred Hospital:</strong> {preferredHospital}</div>
          <div>
            <strong className="text-gray-800">Status:</strong>{' '}
            <span
              className={`font-semibold ${
                status === 'rejected'
                  ? 'text-red-500'
                  : status === 'approved'
                  ? 'text-green-600'
                  : 'text-yellow-500'
              }`}
            >
              {status}
            </span>
          </div>
          <div><strong className="text-gray-800">Submitted At:</strong> {new Date(submittedAt).toLocaleString()}</div>
          <div><strong className="text-gray-800">Last Updated:</strong> {new Date(updatedAt).toLocaleString()}</div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mt-8 mb-4 text-blue-600">Submitted By</h2>
      <Card className="shadow-md rounded-2xl p-4">
        <CardContent className="space-y-2 text-gray-700">
          <div><strong className="text-gray-800">Name:</strong> {userId?.name}</div>
          <div><strong className="text-gray-800">Email:</strong> {userId?.email}</div>
          <div><strong className="text-gray-800">Phone:</strong> {userId?.phone}</div>
        </CardContent>
      </Card>
    </div>
  );
}
