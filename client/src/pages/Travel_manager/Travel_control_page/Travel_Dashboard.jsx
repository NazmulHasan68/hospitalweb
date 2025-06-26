import React from 'react';
import { MapPin, Plane, Users, CalendarCheck, Eye } from 'lucide-react';

export default function Travel_Dashboard() {
  const recentTrips = [
    { place: 'Cox’s Bazar', date: '2025-06-24', travelers: 3 },
    { place: 'Sundarbans', date: '2025-06-25', travelers: 2 },
    { place: 'Bandarban', date: '2025-06-26', travelers: 4 },
  ];

  const bookings = [
    {
      id: 'T-1001',
      traveler: 'Nazmul Hasan',
      destination: 'Cox’s Bazar',
      date: '2025-06-24',
      status: 'confirmed',
    },
    {
      id: 'T-1002',
      traveler: 'Shourav A.',
      destination: 'Sundarbans',
      date: '2025-06-25',
      status: 'pending',
    },
    {
      id: 'T-1003',
      traveler: 'Mustakim R.',
      destination: 'Bandarban',
      date: '2025-06-26',
      status: 'cancelled',
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <h1 className="text-2xl font-bold text-blue-700">✈️ Travel Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow rounded-lg flex items-center gap-4">
          <Plane className="text-blue-500 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-500">Total Bookings</p>
            <p className="text-xl font-bold">265</p>
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg flex items-center gap-4">
          <MapPin className="text-green-500 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-500">Popular Destinations</p>
            <p className="text-xl font-bold">18</p>
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg flex items-center gap-4">
          <Users className="text-purple-500 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-500">Total Travelers</p>
            <p className="text-xl font-bold">102</p>
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg flex items-center gap-4">
          <CalendarCheck className="text-yellow-500 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-500">Upcoming Trips</p>
            <p className="text-xl font-bold">9</p>
          </div>
        </div>
      </div>

      {/* Recent Trips */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-4">🌍 Recent Bookings</h2>
        <ul className="divide-y divide-gray-100">
          {recentTrips.map((trip, idx) => (
            <li key={idx} className="py-3">
              <p className="font-medium text-gray-800">Trip to {trip.place}</p>
              <p className="text-sm text-gray-500">
                Date: {trip.date} • Travelers: {trip.travelers}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Booking Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">🗂 All Bookings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3">Booking ID</th>
                <th className="p-3">Traveler</th>
                <th className="p-3">Destination</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 border-b">
                  <td className="p-3">{booking.id}</td>
                  <td className="p-3">{booking.traveler}</td>
                  <td className="p-3">{booking.destination}</td>
                  <td className="p-3">{booking.date}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-600'
                          : booking.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button className="text-blue-600 hover:underline flex items-center gap-1 mx-auto">
                      <Eye className="w-4 h-4" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
