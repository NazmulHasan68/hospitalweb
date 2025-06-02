import React from 'react';
import {
  Hospital,
  ClipboardList,
  Wallet,
  FileText,
  Stethoscope,
  PlaneTakeoff,
  Hotel,
  Car,
  MessageCircle
} from 'lucide-react';
import { FaPassport } from 'react-icons/fa';


const services = [
  { name: 'হসপিটাল', icon: <Hospital className="text-blue-600 w-6 h-6" /> },
  { name: 'ট্রিটমেন্ট প্ল্যান', icon: <ClipboardList className="text-green-600 w-6 h-6" /> },
  { name: 'চিকিৎসা খরচের আনুমানিক হিসাব', icon: <Wallet className="text-yellow-600 w-6 h-6" /> },
  { name: 'ভিসা', icon: <FaPassport className="text-purple-600 w-6 h-6" /> },
  { name: 'ইনভাইটেশন লেটার', icon: <FileText className="text-red-600 w-6 h-6" /> },
  { name: 'ডাক্তারের অ্যাপয়েন্টমেন্ট বুকিং', icon: <Stethoscope className="text-pink-600 w-6 h-6" /> },
  { name: 'ভিসা প্রসেসিং', icon: <ClipboardList className="text-indigo-600 w-6 h-6" /> },
  { name: 'এয়ার টিকেট', icon: <PlaneTakeoff className="text-blue-500 w-6 h-6" /> },
  { name: 'হোটেল বুকিং', icon: <Hotel className="text-orange-600 w-6 h-6" /> },
  { name: 'এয়ারপোর্ট পিক/ড্রপ', icon: <Car className="text-teal-600 w-6 h-6" /> },
];

export default function Travel_service_section() {
  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl text-blue-700 font-bold text-center mb-8">আমাদের সেবা সমূহ</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow duration-300"
          >
            {service.icon}
            <p className="mt-2 text-sm md:text-base text-gray-700 font-medium">{service.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
