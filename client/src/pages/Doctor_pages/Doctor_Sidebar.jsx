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
  XCircle,
  Shield,
  Headphones
} from 'lucide-react';
import { useLoadUserQuery } from '@/redux/ApiController/authApi';

export default function Doctor_Sidebar() {
  const { data } = useLoadUserQuery();
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, to: '/doctor/dashboard' },

    { section: 'Management' },
    { label: 'New patient', icon: <PackageSearch size={20} />, to: '/doctor/new_patient' },
    { label: 'Return patient', icon: <Users size={20} />, to: '/doctor/return_patient' },
    { label: 'Member patient', icon: <Users size={20} />, to: '/doctor/member_patient' },
    { label: 'Shedule patient', icon: <Users size={20} />, to: '/doctor/shedule_patient' },

    { section: 'Appointments' },
    { label: 'Complete Treatment', icon: <ClipboardList size={20} />, to: '/doctor/complete_treatment', color: 'text-blue-500' },
    { label: 'Reject Treatment', icon: <ClipboardList size={20} />, to: '/doctor/reject_treatment', color: 'text-blue-500' },

    { section: 'System' },
    { label: 'Support List', icon: <Headphones size={20} />, to: '/doctor/support_list' },
  ];

  return (
    <aside className="bg-blue-950 text-white shadow-lg rounded-xl p-4 w-full max-w-xs  sticky top-0">
      {/* Profile Section */}
      <Link
        to="/doctor/profile"
        className="flex items-center gap-4 mb-6 border-b border-blue-800 mt-6 pb-4 hover:opacity-90 transition"
      >
        <img
          src={data?.user?.photoUrl}
          alt={data?.user?.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-white"
        />
        <div>
          <h1 className="text-lg font-bold">{data?.user?.name}</h1>
          <p className="text-sm text-blue-300">{data?.user?.role} </p>
        </div>
      </Link>

      {/* Navigation Menu */}
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
              className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${
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
    </aside>
  );
}
