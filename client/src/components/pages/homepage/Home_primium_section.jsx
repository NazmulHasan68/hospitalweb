import { CircleCheckBig } from 'lucide-react';
import React from 'react';
import familyLog from "@/assets/familly1.jpg"

export default function Home_primium_section() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Content Section */}
        <div>
          <h2 className="text-md md:text-3xl font-bold text-blue-800 mb-4">
            প্রিমিয়াম মেম্বার অথবা ফ্যামিলি হোন
          </h2>
          <p className="text-gray-600 text-sm md:text-lg mb-6">
            Grow Care Health প্রিমিয়াম সদস্য হয়ে আপনি এবং আপনার পরিবার পেতে পারেন অতিরিক্ত স্বাস্থ্যসেবা, বিশেষ ছাড় এবং ব্যক্তিগত মেডিকেল সহায়তা।
          </p>
          <ul className="space-y-1 text-gray-600 text-xs md:text-lg">
            <li className='flex gap-2'> <CircleCheckBig className='text-green-700'/>ব্যক্তিগত হেলথ অ্যাসিস্ট্যান্ট সাপোর্ট</li>
            <li className='flex gap-2'> <CircleCheckBig className='text-green-700'/>সকল কনসালটেশন ও মেডিসিনে বিশেষ ছাড়</li>
            <li className='flex gap-2'> <CircleCheckBig className='text-green-700'/>হেলথ চেকআপের জন্য প্রায়োরিটি বুকিং</li>
            <li className='flex gap-2'> <CircleCheckBig className='text-green-700'/>ফ্যামিলি প্যাকেজে একসাথে সেবা</li>
            <li className='flex gap-2'> <CircleCheckBig className='text-green-700'/>২৪/৭ বিশেষ হটলাইন এক্সেস</li>
          </ul>

          {/* CTA Button */}
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300">
            এখনই প্রিমিয়াম হোন
          </button>
        </div>

        {/* Image Section */}
        <div className='p-8'>
          <img
            src={familyLog}
            alt="Premium Member"
            className="rounded-xl shadow-md w-full h-auto object-cover "
          />
        </div>
      </div>
    </section>
  );
}
