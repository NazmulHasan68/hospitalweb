import React, { useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Loader,
  CheckCircle,
  XCircle,
  Shield,
  Headphones,
} from 'lucide-react';
import { useLoadUserQuery } from '@/redux/ApiController/authApi';

export default function Mobile_consultation_sidebar() {
  const { data } = useLoadUserQuery();
  const location = useLocation();
  const [open, setOpen] = useState(false); // 👈 control drawer visibility

  const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, to: '/consultation/dashboard' },
    { section: 'Management' },
    { label: 'User List', icon: <Users size={18} />, to: '/consultation/user' },
    { label: 'Doctor List', icon: <Users size={18} />, to: '/consultation/doctor' },
    { section: 'Appointments' },
    { label: 'Spespalist', icon: <ClipboardList size={18} />, to: '/consultation/spespalist', color: 'text-blue-500' },
    { label: 'New Appointments', icon: <Loader size={18} />, to: '/consultation/appointments', color: 'text-yellow-500' },
    { label: 'Shedule list', icon: <CheckCircle size={18} />, to: '/consultation/shedule', color: 'text-green-500' },
    { label: 'Complete', icon: <CheckCircle size={18} />, to: '/consultation/complete', color: 'text-green-500' },
    { label: 'Rejected', icon: <XCircle size={18} />, to: '/consultation/rejected', color: 'text-red-500' },
    { section: 'System' },
    { label: 'Staff Panel', icon: <Shield size={18} />, to: '/consultation/staff_panel' },
    { label: 'Support List', icon: <Headphones size={18} />, to: '/consultation/support_list' },
  ];

  return (
    <div className="md:hidden">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild className='mt-4 '>
         
          <button className="p-2 text-white bg-blue-600  w-full  gap-2 flex justify-between items-center">
              <p>Find your option</p> <Menu size={20} /> 
          </button>
        </DrawerTrigger>
        <DrawerContent className="p-4">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-3">
              <img
                src={data?.user?.photoUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gray-300 object-cover"
              />
              <div>
                <h1 className="text-base font-semibold">{data?.user?.name}</h1>
                <p className="text-xs text-muted-foreground">{data?.user?.role} Manager</p>
              </div>
            </DrawerTitle>
          </DrawerHeader>

          <div className="mt-4 flex flex-col gap-2">
            {menuItems.map((item, index) =>
              item.section ? (
                <p
                  key={index}
                  className="text-xs uppercase tracking-wide text-gray-500 font-semibold mt-3"
                >
                  {item.section}
                </p>
              ) : (
                <Link
                  key={index}
                  to={item.to}
                  onClick={() => setOpen(false)} // 👈 Close drawer on click
                  className={`flex items-center gap-3 p-2 rounded-md text-sm transition ${
                    location.pathname === item.to
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'hover:bg-blue-50 text-gray-700'
                  }`}
                >
                  <span className={`${item.color ?? 'text-blue-900'}`}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
