import React from 'react';
import {
  Package,
  Users,
  UserCog,
  ShoppingCart,
  BarChart2,
  DollarSign,
  MoveLeft,
  ChevronLeft,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Link } from 'react-router-dom';

export default function Medicine_Dashboard() {
  // Static metric cards
  const stats = [
    { label: 'Total Medicines', value: 320, icon: <Package className="text-blue-500" size={24} />, bg: 'bg-blue-100' },
    { label: 'Total Clients', value: 1500, icon: <Users className="text-green-500" size={24} />, bg: 'bg-green-100' },
    { label: 'Total Staff', value: 25, icon: <UserCog className="text-purple-500" size={24} />, bg: 'bg-purple-100' },
    { label: 'Total Orders', value: 830, icon: <ShoppingCart className="text-orange-500" size={24} />, bg: 'bg-orange-100' },
    { label: 'Orders Per Day', value: 48, icon: <BarChart2 className="text-pink-500" size={24} />, bg: 'bg-pink-100' },
    { label: 'Total Revenue', value: '$58,700', icon: <DollarSign className="text-yellow-500" size={24} />, bg: 'bg-yellow-100' },
  ];

  // Table dummy data
  const recentOrders = [
    { id: '#1001', name: 'Paracetamol', client: 'Anik', status: 'Pending' },
    { id: '#1002', name: 'Napa Extra', client: 'Rafi', status: 'Completed' },
    { id: '#1003', name: 'Seclo', client: 'Nila', status: 'Processing' },
    { id: '#1004', name: 'Maxpro', client: 'Jamal', status: 'Rejected' },
  ];

  const recentMessages = [
    { name: 'Anik', message: 'Need urgent delivery', time: '2h ago' },
    { name: 'Nusrat', message: 'Wrong product received', time: '4h ago' },
    { name: 'Riyad', message: 'How to track my order?', time: '1d ago' },
    { name: 'Sabina', message: 'Want to cancel', time: '1d ago' },
  ];

  // Chart data
  const chartData = [
    { name: 'Order', value: 830 },
    { name: 'Complete', value: 600 },
    { name: 'Medicines', value: 320 },
    { name: 'Revenue', value: 58700 },
  ];

  return (
    <div className="px-4 h-[700px] md:h-[600px] overflow-auto">
      <div className='flex gap-2'>
        <Link className='text-md font-medium' to={'/medicine'}>medicine <ChevronLeft /></Link> 
        <Link className='text-md font-medium' to={'/medicine/dashboard'}>dashboard</Link>
      </div>
      <h1 className="md:text-xl text-md font-bold text-blue-600 mb-6">📊 Dashboard Overview</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`p-4 rounded-xl shadow-sm ${stat.bg} cursor-pointer flex items-center gap-4 transition-transform hover:scale-[1.02]`}>
            <div className="bg-white p-2 rounded-full shadow-md">{stat.icon}</div>
            <div>
              <h2 className="md:text-xl text-md font-semibold">{stat.value}</h2>
              <p className="md:text-sm text-xs font-medium text-gray-700">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mini Tables */}
      <div className="mt-10 flex flex-col md:flex-row gap-6">
        {/* Orders Table */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">🧾 Recent Orders</h2>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-600 font-semibold">
                  <th>ID</th>
                  <th>Medicine</th>
                  <th>Client</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, idx) => (
                  <tr key={idx} className="border-t">
                    <td>{order.id}</td>
                    <td>{order.name}</td>
                    <td>{order.client}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Messages Table */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">📥 Client Messages</h2>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-600 font-semibold">
                  <th>Name</th>
                  <th>Message</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentMessages.map((msg, idx) => (
                  <tr key={idx} className="border-t">
                    <td>{msg.name}</td>
                    <td>{msg.message}</td>
                    <td>{msg.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">📈 Business Insights</h2>
        <div className="bg-white p-4 rounded-xl border border-gray-200 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
