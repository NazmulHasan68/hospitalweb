import React from 'react';
import { CalendarDays, Users, ClipboardList, Stethoscope } from 'lucide-react';

export default function Consultation_Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-2xl font-bold text-blue-700">
        🩺 Consultation Dashboard
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow rounded-lg flex items-center gap-4">
          <Stethoscope className="text-blue-500 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-500">Total Consultations</p>
            <p className="text-xl font-bold">128</p>
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg flex items-center gap-4">
          <ClipboardList className="text-green-500 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-500">Pending Appointments</p>
            <p className="text-xl font-bold">12</p>
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg flex items-center gap-4">
          <Users className="text-purple-500 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-500">Total Clients</p>
            <p className="text-xl font-bold">45</p>
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg flex items-center gap-4">
          <CalendarDays className="text-yellow-500 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-500">Today's Sessions</p>
            <p className="text-xl font-bold">5</p>
          </div>
        </div>
      </div>

      {/* Recent Consultations Section */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">🕒 Recent Consultations</h2>
        <ul className="divide-y divide-gray-100">
          {[1, 2, 3].map((item) => (
            <li key={item} className="py-3">
              <p className="text-gray-800 font-medium">Patient #{item}</p>
              <p className="text-gray-500 text-sm">Consulted on: 2025-06-25</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
