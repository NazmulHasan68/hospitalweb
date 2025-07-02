import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  PackageSearch,
  Users,
  ClipboardList,
  Loader,
  CheckCircle,
} from 'lucide-react';
import { useLoadUserQuery } from '@/redux/ApiController/authApi';

export default function UserSidebar() {
  const { data } = useLoadUserQuery();
  const location = useLocation();

  // Utility function to check if path is active
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { label: 'Medicine', icon: <PackageSearch size={20} />, to: '/user_panel/medicine' },
    { label: 'Travel ', icon: <Users size={20} />, to: '/user_panel/travel' },
    { label: 'Doctor Schedule', icon: <ClipboardList size={20} />, to: '/user_panel/doctor' },
    { label: 'Order Pending', icon: <Loader size={20} />, to: '/user_panel/order' },
    { label: 'Order Complete', icon: <CheckCircle size={20} />, to: '/user_panel/complete' },
  ];

  return (
    <aside className="h-screen text-white shadow-lg rounded-xl p-4 w-full max-w-xs sticky top-0 hidden md:block">
      {/* Profile Section */}
      <Link
        to="/personal"
        className="flex items-center gap-4 mb-6 border-b border-blue-800 mt-6 pb-4 hover:opacity-90 transition"
      >
        <img
          src={data?.user?.photoUrl || '/default-profile.png'}
          alt={data?.user?.name || 'User'}
          className="w-12 h-12 rounded-full object-cover border-2 border-white"
        />
        <div>
          <h1 className="text-lg font-bold">{data?.user?.name || 'Loading...'}</h1>
          <p className="text-sm text-blue-300 capitalize">{data?.user?.role || 'user'}</p>
        </div>
      </Link>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${
              isActive(item.to)
                ? 'bg-white text-blue-800 font-semibold shadow'
                : 'hover:bg-blue-800 hover:text-white'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
