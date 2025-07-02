import React from 'react';
import {
  Users,
  UserCog,
  ShoppingCart,
  CalendarCheck,
  Building2,
  Plane,
  Stethoscope,
  DollarSign,
  Pill,
} from 'lucide-react';
import { useGetAdminDashboardQuery } from '@/redux/ApiController/dashboardApi';

// 🟡 Replace this with your actual auth state
const currentUserRole = 'admin'; 

export default function Admin_Dashboard() {
  const { data, isLoading, error } = useGetAdminDashboardQuery();

  if (isLoading) return <div className="p-6">Loading dashboard...</div>;
  if (error) return <div className="p-6 text-red-500">Error loading dashboard.</div>;

  // Calculate sales total
  const totalMedicineSales = data?.totalmediOrders?.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );

  const totalAppointmentEarnings = data?.totalAppointments?.reduce(
    (sum, item) =>
      item.paymentStatus === 'paid' ? sum + Number(item.totalAmount || 0) : sum,
    0
  );

  const fullStats = [
    {
      title: 'Total Users',
      value: data?.totalUsers?.length || 0,
      icon: <Users className="text-blue-500" />,
      roles: ['admin'],
    },
    {
      title: 'Total Staff',
      value: data?.totalStaff?.length || 0,
      icon: <UserCog className="text-green-500" />,
      roles: ['admin'],
    },
    {
      title: 'Total Medicines',
      value: data?.medicine?.length || 0,
      icon: <Pill className="text-pink-500" />,
      roles: ['admin', 'medicine-manager'],
    },
    {
      title: 'Medicine Orders',
      value: data?.totalmediOrders?.length || 0,
      icon: <ShoppingCart className="text-purple-500" />,
      roles: ['admin', 'medicine-manager'],
    },
    {
      title: 'Medicine Sales',
      value: `৳ ${totalMedicineSales || 0}`,
      icon: <DollarSign className="text-green-600" />,
      roles: ['admin', 'medicine-manager'],
    },
    {
      title: 'Appointments',
      value: data?.totalAppointments?.length || 0,
      icon: <CalendarCheck className="text-yellow-500" />,
      roles: ['admin', 'consultation-manager'],
    },
    {
      title: 'Appointment Earnings',
      value: `৳ ${totalAppointmentEarnings || 0}`,
      icon: <DollarSign className="text-orange-500" />,
      roles: ['admin', 'consultation-manager'],
    },
    {
      title: 'Hospitals',
      value: data?.totalHospitals?.length || 0,
      icon: <Building2 className="text-red-500" />,
      roles: ['admin', 'travel-manager'],
    },
    {
      title: 'Medical Travels',
      value: data?.totalTravels?.length || 0,
      icon: <Plane className="text-indigo-500" />,
      roles: ['admin', 'travel-manager'],
    },
    {
      title: 'Doctors',
      value: data?.totalDoctors?.length || 0,
      icon: <Stethoscope className="text-teal-500" />,
      roles: ['admin', 'consultation-manager'],
    },
  ];

  // 🔐 Filter cards by current user role
  const visibleStats = fullStats.filter((stat) =>
    stat.roles.includes(currentUserRole)
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 capitalize">
        {currentUserRole} Dashboard
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {visibleStats.map((item, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl p-5 flex items-center space-x-4"
          >
            <div className="p-3 bg-gray-100 rounded-full">{item.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-2xl font-bold text-gray-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
