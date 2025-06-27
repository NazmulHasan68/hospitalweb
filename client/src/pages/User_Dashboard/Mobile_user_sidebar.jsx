import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  PackageSearch,
  Users,
  ClipboardList,
  Loader,
  CheckCircle,
  Menu,
  X,
} from 'lucide-react';
import { useLoadUserQuery } from '@/redux/ApiController/authApi';

export default function Mobile_user_sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useLoadUserQuery();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, to: '/user_panel/dashboard' },
    { label: 'Medicine', icon: <PackageSearch size={20} />, to: '/user_panel/medicine' },
    { label: 'Travel ', icon: <Users size={20} />, to: '/user_panel/travel' },
    { label: 'Doctor Schedule', icon: <ClipboardList size={20} />, to: '/user_panel/doctor' },
    { label: 'Order Pending', icon: <Loader size={20} />, to: '/user_panel/order' },
    { label: 'Order Complete', icon: <CheckCircle size={20} />, to: '/user_panel/complete' },
  ];

  return (
    <div className="md:hidden block ">
      {/* Toggle Button */}
    <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white rounded m-2 w-[380px] "
      >
        {isOpen ? (
          <X size={24} className='ml-80'/>
        ) : (
          <div className="flex items-center justify-between ">
            <h1 className="text-sm font-semibold">Check Medicine</h1>
            <Menu size={24} />
          </div>
        )}
      </button>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Profile */}
        <div className="p-4 border-b border-blue-200 flex items-center gap-3">
          <img
            src={data?.user?.photoUrl || '/default-profile.png'}
            alt={data?.user?.name || 'User'}
            className="md:w-10 w-8 h-8 md:h-10 rounded-full object-cover border-2 border-blue-300"
          />
          <div>
            <h1 className="text-base font-semibold line-clamp-1">{data?.user?.name || 'Loading...'}</h1>
            <p className="text-xs text-gray-500 capitalize">{data?.user?.role || 'user'}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 p-4 mt-6 bg-blue-50 h-full">
          <div className='text-blue-700'>Sidebar</div>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              onClick={() => setIsOpen(false)} // close after click
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition ${
                isActive(item.to)
                  ? 'bg-blue-100 text-blue-800 font-semibold'
                  : 'text-gray-700 hover:bg-blue-50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
