import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetTravelHelpByIdQuery } from '@/redux/ApiController/TravelApi';
import { Card } from '@/components/ui/card';

export default function Travel_User_order() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetTravelHelpByIdQuery(id);

  if (isLoading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Error fetching data.</p>;
  if (!data || data.length === 0) return <p className="text-center mt-10 text-gray-500">No data found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-2 h-[500px] overflow-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ← Back
      </button>

      <h1 className="text-xl md:text-2xl font-bold text-center text-blue-700 mb-1">Order Details</h1>

      {data.map((order) => (
        <Card
          key={order._id}
          className="p-4 shadow-md rounded-xl space-y-3 bg-white border"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p><strong>Patient Name:</strong> {order.patientName ?? 'N/A'}</p>
              <p><strong>Age:</strong> {order.age ?? 'N/A'} years</p>
              <p><strong>Medical Condition:</strong> {order.medicalCondition ?? 'N/A'}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span
                  className={`ml-2 px-2 py-1 rounded text-white text-sm ${
                    order.status === 'in-review'
                      ? 'bg-yellow-500'
                      : order.status === 'rejected'
                      ? 'bg-red-500'
                      : 'bg-green-600'
                  }`}
                >
                  {order.status ?? 'Unknown'}
                </span>
              </p>
            </div>

            <div>
              <p><strong>Email:</strong> {order.email ?? 'N/A'}</p>
              <p><strong>Phone:</strong> {order.phone ?? 'N/A'}</p>
              <p><strong>Preferred Country:</strong> {order.preferredCountry ?? 'N/A'}</p>
              <p><strong>Preferred City / Hospital:</strong> {order.preferredCity ?? 'N/A'}, {order.preferredHospital ?? 'N/A'}</p>
            </div>
          </div>

          {order.documents?.length > 0 ? (
            <div className="pt-4 border-t">
              <h2 className="font-semibold mb-2">Documents</h2>
              <ul className="list-disc list-inside space-y-1">
                {order.documents.map((doc, index) => (
                  <li key={index}>
                    <a
                      href={doc.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {doc.name || `Document ${index + 1}`}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="pt-4 border-t text-gray-500 italic">No documents uploaded.</p>
          )}

          <div className="pt-4 border-t text-sm text-gray-500">
            <p><strong>Submitted At:</strong> {order.submittedAt ? new Date(order.submittedAt).toLocaleString() : 'N/A'}</p>
            <p><strong>Last Updated At:</strong> {order.updatedAt ? new Date(order.updatedAt).toLocaleString() : 'N/A'}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
