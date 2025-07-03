import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCog,
  PackageSearch,
  Users,
  ClipboardList,
  Loader,
  CheckCircle,
} from 'lucide-react';
import { useLoadUserQuery } from '@/redux/ApiController/authApi';

export default function Admin_sidebar() {
  const { data } = useLoadUserQuery();
  const location = useLocation();

  const roleLabel = (role) => {
    if (!role) return '';
    if (role === 'admin') return 'Admin';
    return `${role.charAt(0).toUpperCase() + role.slice(1)} Manager`;
  };

  const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, to: '/admin/dashboard' },

    { section: 'Management' },
    { label: 'Patient List', icon: <PackageSearch size={20} />, to: '/admin/patient' },
    { label: 'Doctor List', icon: <Users size={20} />, to: '/admin/doctor' },
    { label: 'Employee List', icon: <UserCog size={20} />, to: '/admin/employee' },
    { label: 'Hospital List', icon: <Users size={20} />, to: '/admin/hospital' },

    { section: 'Appointments' },
    { label: 'Medicine', icon: <ClipboardList size={20} />, to: '/admin/medicine', color: 'text-blue-400' },
    { label: 'Travel', icon: <Loader size={20} />, to: '/admin/travel', color: 'text-yellow-400' },
    { label: 'Ads & Banners', icon: <CheckCircle size={20} />, to: '/admin/add_banner', color: 'text-pink-400' },
    { label: 'Support', icon: <CheckCircle size={20} />, to: '/admin/support', color: 'text-pink-400' },
  ];

  return (
    <aside className="bg-blue-950 text-white shadow-lg rounded-xl p-4 w-full max-w-xs sticky top-0 min-h-screen">
      {/* Profile Section */}
      <Link
        to="/profile"
        className="flex items-center gap-4 mb-6 border-b border-blue-800 mt-6 pb-4 hover:opacity-90 transition"
      >
        <img
          src={data?.user?.photoUrl || 'https://i.ibb.co/YD6F60p/avatar-placeholder.png'}
          alt={`${data?.user?.name}'s profile`}
          title={data?.user?.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-white"
        />
        <div>
          <h1 className="text-lg font-bold capitalize">{data?.user?.name || 'Loading...'}</h1>
          <p className="text-sm text-blue-300">{roleLabel(data?.user?.role)}</p>
        </div>
      </Link>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, index) =>
          item.section ? (
            <h2
              key={index}
              className="text-xs text-blue-400 font-semibold mt-4 mb-1 uppercase tracking-wider"
            >
              {item.section}
            </h2>
          ) : (
            <Link
              key={index}
              to={item.to}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                location.pathname === item.to
                  ? 'bg-white text-blue-900 font-semibold shadow'
                  : 'hover:bg-blue-800 hover:text-white'
              }`}
            >
              <span className={`${item.color ?? 'text-white'}`}>{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </Link>
          )
        )}
      </nav>
    </aside>
  );
}
