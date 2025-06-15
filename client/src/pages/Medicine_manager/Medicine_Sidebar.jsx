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

export default function Medicine_Sidebar() {
  const {data} = useLoadUserQuery()
  console.log(data);
  
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, to: '/medicine/dashboard' },
    { label: 'Product List', icon: <PackageSearch size={20} />, to: '/medicine/products' },
    { label: 'Client List', icon: <Users size={20} />, to: '/medicine/clients' },
    { label: 'Check Orders', icon: <ClipboardList size={20} />, to: '/medicine/orders/check' },
    { label: 'Processing Orders', icon: <Loader size={20} />, to: '/medicine/orders/processing' },
    { label: 'Complete Orders', icon: <CheckCircle size={20} />, to: '/medicine/orders/complete' },
    { label: 'Rejected Orders', icon: <XCircle size={20} />, to: '/medicine/orders/rejected' },
    { label: 'Staff Panel', icon: <Shield size={20} />, to: '/medicine/staff' },
    { label: 'Support List', icon: <Headphones size={20} />, to: '/medicine/support' },
  ];

  return (
    <aside className=" shadow-md rounded-xl p-4 w-full max-w-xs h-screen sticky top-0">
      {/* Profile Section */}
      <Link
        to="/medicine/profile"
        className="flex items-center gap-4 mb-6 border-b mt-6 pb-4 hover:opacity-90 transition"
      >
        <img
          src={data?.user?.photoUrl}
          alt={data?.user?.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h1 className="text-lg font-semibold">{data?.user?.name}</h1>
          <p className="text-xs text-gray-100">{data?.user?.role} Manager</p>
        </div>
      </Link>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-1">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition ${
              location.pathname === item.to
                ? 'bg-white  text-blue-600 font-semibold shadow-lg'
                : ''
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
