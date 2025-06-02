import React from 'react';
import { Video, ShoppingBag, Plane, Phone } from 'lucide-react'; // Optional icons (using lucide-react)
import { Link } from 'react-router-dom';

export default function Home_nevigation_section() {
  const navItems = [
    {
      title: 'Video Consultation',
      icon: <Video className="w-6 h-6 text-blue-600" />,
      Link : '/user_consultation'
    },
    {
      title: 'Order Medicine',
      icon: <ShoppingBag className="w-6 h-6 text-green-600" />,
      Link : '/user_medicine'
    },
    {
      title: 'Medical Trip',
      icon: <Plane className="w-6 h-6 text-orange-500" />,
      Link: '/user_travel'
    },
    {
      title: 'Helpline',
      icon: <Phone className="w-6 h-6 text-red-600" />,
      Link : '/helpline'
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-2  md:grid-cols-4 gap-3 md:gap-6">
        {navItems.map((item, index) => (
          <Link
            to={item.Link}
            key={index}
            className="bg-white shadow-md cursor-pointer rounded-xl p-4 md:p-6 text-center hover:shadow-xl transition duration-300"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-sm md:text-lg font-semibold text-blue-900 hover:text-blue-500">{item.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
