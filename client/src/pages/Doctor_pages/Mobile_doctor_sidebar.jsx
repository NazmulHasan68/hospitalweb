import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LayoutDashboard,
  PackageSearch,
  Users,
  ClipboardList,
  Headphones
} from 'lucide-react';
import { useLoadUserQuery } from '@/redux/ApiController/authApi';

export default function Mobile_doctor_sidebar() {
  const { data } = useLoadUserQuery();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, to: '/doctor/dashboard' },

    { section: 'Management' },
    { label: 'New patient', icon: <PackageSearch size={20} />, to: '/doctor/new_patient' },
    { label: 'Member patient', icon: <Users size={20} />, to: '/doctor/member_patient' },
    { label: 'Shedule patient', icon: <Users size={20} />, to: '/doctor/shedule_patient' },

    { section: 'Appointments' },
    { label: 'Complete Treatment', icon: <ClipboardList size={20} />, to: '/doctor/complete_treatment', color: 'text-blue-500' },
    { label: 'Reject Treatment', icon: <ClipboardList size={20} />, to: '/doctor/reject_treatment', color: 'text-blue-500' },

    { section: 'System' },
    { label: 'Support List', icon: <Headphones size={20} />, to: '/doctor/support_list' },
  ];

  return (
    <div className="md:hidden block">
      {/* Top Bar with Menu */}
      <div className=" text-white flex justify-between items-center p-4 shadow-md">
        <img
          src={data?.user?.photoUrl}
          alt="profile"
          className="w-8 h-8 rounded-full object-cover border"
        />
        <h1 className="text-lg font-bold">Doctor Panel</h1>
        <button onClick={toggleSidebar}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar Drawer */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-3/4 h-screen bg-blue-950 text-white z-50 p-4 shadow-lg">
          {/* Profile */}
          <Link
            to="/doctor/profile"
            onClick={toggleSidebar}
            className="flex items-center gap-4 mb-6 border-b border-blue-800 pb-4 hover:opacity-90 transition"
          >
            <img
              src={data?.user?.photoUrl}
              alt={data?.user?.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
            <div>
              <h1 className="text-md font-bold">{data?.user?.name}</h1>
              <p className="text-sm text-blue-300">{data?.user?.role}</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {menuItems.map((item, index) =>
              item.section ? (
                <h2
                  key={index}
                  className="text-xs text-blue-400 font-semibold mt-3 mb-1 uppercase tracking-wider"
                >
                  {item.section}
                </h2>
              ) : (
                <Link
                  key={index}
                  to={item.to}
                  onClick={toggleSidebar}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                    location.pathname === item.to
                      ? 'bg-white text-blue-800 font-semibold shadow'
                      : 'hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  <span className={`${item.color ?? 'text-white'}`}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
