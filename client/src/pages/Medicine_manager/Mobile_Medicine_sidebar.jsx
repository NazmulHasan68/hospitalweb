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

export default function Mobile_Medicine_sidebar() {
  const { data } = useLoadUserQuery();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

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
    <div className="md:hidden t">
      {/* Top Section with Profile and Menu Button */}
      <div className="flex justify-between items-center bg-gray-900 px-4 py-6">
        <Link
          to="/medicine/profile"
          onClick={closeSidebar}
          className="flex items-center gap-4"
        >
          <img
            src={data?.user?.photoUrl || 'https://ui-avatars.com/api/?name=User'}
            alt={data?.user?.name}
            className="w-10 h-10 mt-1 rounded-full object-cover"
          />
          <div>
            <h1 className="text-md text-white font-semibold">{data?.user?.name || 'Loading...'}</h1>
            <p className="text-xs text-gray-100">{data?.user?.role || 'Role'} Manager</p>
          </div>
        </Link>
        <button onClick={toggleSidebar} className="p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Slide-Up Sidebar from Bottom */}
        <div
            className={`fixed bottom-0 left-0 w-full h-[90%] bg-blue-600 shadow-xl z-40 rounded-t-2xl transform transition-transform duration-300 ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
        >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-white">Menu</h2>
          <button onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1 p-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              onClick={closeSidebar}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-600 hover:text-blue-600 transition ${
                location.pathname === item.to
                  ? 'bg-white text-blue-600 font-semibold shadow-sm'
                  : ''
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Optional: dark transparent backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={closeSidebar}
        />
      )}
    </div>
  );
}
