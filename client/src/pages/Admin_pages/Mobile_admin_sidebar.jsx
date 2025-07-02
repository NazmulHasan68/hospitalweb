import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  X,
  LayoutDashboard,
  PackageSearch,
  Users,
  UserCog,
  ClipboardList,
  Loader,
  CheckCircle,
} from 'lucide-react';
import { useLoadUserQuery } from '@/redux/ApiController/authApi';

export default function Mobile_admin_sidebar() {
  const { data } = useLoadUserQuery();
  const [isOpen, setIsOpen] = useState(false);

  const roleLabel = (role) => {
    if (!role) return '';
    if (role === 'admin') return 'Admin';
    return `${role.charAt(0).toUpperCase() + role.slice(1)} Manager`;
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, to: '/admin/dashboard' },

    { label: 'Patient List', icon: <PackageSearch size={18} />, to: '/admin/patient' },
    { label: 'Doctor List', icon: <Users size={18} />, to: '/admin/doctor' },
    { label: 'Employee List', icon: <UserCog size={18} />, to: '/admin/employee' },
    { label: 'Hospital List', icon: <Users size={18} />, to: '/admin/hospital' },

    { label: 'Medicine', icon: <ClipboardList size={18} />, to: '/admin/medicine' },
    { label: 'Travel', icon: <Loader size={18} />, to: '/admin/travel' },
    { label: 'Ads & Banners', icon: <CheckCircle size={18} />, to: '/admin/add_banner' },
  ];

  return (
    <div className="md:hidden mt-4">
      {/* Toggle Button */}
      <button onClick={toggleSidebar} className="p-4 focus:outline-none text-blue-800 flex justify-between items-center ml-[300px]">
        <Menu className="text-slate-50" size={30} />
      </button>

      {/* Slide-out Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40">
          <div className="fixed left-0 top-0 h-full w-72 bg-blue-950 text-white p-5 shadow-xl transition-transform duration-300">
            {/* Close Button */}
            <button onClick={toggleSidebar} className="absolute top-4 right-4 text-white">
              <X size={24} />
            </button>

            {/* User Info */}
            <div className="flex items-center gap-4 mt-6 mb-6 border-b border-blue-800 pb-4">
              <img
                src={data?.user?.photoUrl || 'https://i.ibb.co/YD6F60p/avatar-placeholder.png'}
                alt="User"
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />
              <div>
                <h2 className="text-lg font-bold capitalize">{data?.user?.name || 'Loading'}</h2>
                <p className="text-sm text-blue-300">{roleLabel(data?.user?.role)}</p>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="space-y-3">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  onClick={toggleSidebar}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-800 transition"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
