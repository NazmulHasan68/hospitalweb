import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  PackageSearch,
  Users,
  ClipboardList,
  Loader,
  CheckCircle,
  XCircle,
  Shield,
  Headphones,
  Menu,
  X
} from 'lucide-react';
import { useLoadUserQuery } from '@/redux/ApiController/authApi';

export default function Mobile_travel_sidebar() {
  const { data } = useLoadUserQuery();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, to: '/travel/dashboard' },

    { section: 'Management' },
    { label: 'Hospital List', icon: <PackageSearch size={20} />, to: '/travel/hospital' },
    { label: 'Patient List', icon: <Users size={20} />, to: '/travel/patient' },

    { section: 'Appointments' },
    { label: 'New Appointment', icon: <ClipboardList size={20} />, to: '/travel/new_appointment', color: 'text-blue-500' },
    { label: 'Processing', icon: <Loader size={20} />, to: '/travel/processing', color: 'text-yellow-500' },
    { label: 'Complete Appointment', icon: <CheckCircle size={20} />, to: '/travel/complete', color: 'text-green-500' },
    { label: 'Rejected', icon: <XCircle size={20} />, to: '/travel/rejected', color: 'text-red-500' },

    { section: 'System' },
    { label: 'Staff Panel', icon: <Shield size={20} />, to: '/travel/staff_panel' },
    { label: 'Support List', icon: <Headphones size={20} />, to: '/travel/support_ist' },
  ];

  return (
    <div className="md:hidden">
      {/* Top Section */}
      <div className="flex justify-between items-center bg-gray-900 px-4 py-6 ">
        <Link
          to="/profile"
          onClick={closeSidebar}
          className="flex items-center gap-3"
        >
          <img
            src={data?.user?.photoUrl || 'https://ui-avatars.com/api/?name=User'}
            alt={data?.user?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h1 className="text-md text-white font-semibold">{data?.user?.name || 'Loading...'}</h1>
            <p className="text-xs text-gray-300">{data?.user?.role || 'Role'} Manager</p>
          </div>
        </Link>
        <button onClick={toggleSidebar} className="text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Slide-Up Sidebar */}
      <div
        className={`fixed bottom-0 left-0 w-full h-[90%] bg-blue-700 text-white shadow-xl z-40 rounded-t-2xl transform transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 mt-8 border-b border-blue-500">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-4 pt-2 overflow-y-auto h-full">
          {menuItems.map((item, index) =>
            item.section ? (
              <h3
                key={index}
                className="mt-2 mb-1 text-xs font-semibold uppercase tracking-wide text-blue-200"
              >
                {item.section}
              </h3>
            ) : (
              <Link
                key={index}
                to={item.to}
                onClick={closeSidebar}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${
                  location.pathname === item.to
                    ? 'bg-white text-blue-700 font-semibold shadow'
                    : 'hover:bg-blue-600'
                }`}
              >
                <span className={`${item.color ?? 'text-white'}`}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          )}
        </nav>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={closeSidebar}
        />
      )}
    </div>
  );
}
