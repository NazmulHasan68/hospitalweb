import React from 'react';
import whyusphoto from '@/assets/doctor2.jpg'

export default function Home_whyus_section() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Image Section */}
        <div>
          <img
            src={whyusphoto}
            alt="Why Choose Us"
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </div>

        {/* Content Section */}
        <div>
          <h2 className="text-xl md:text-3xl font-bold text-blue-800 mb-4">
            কেন আমাদের বেছে নেবেন?
          </h2>

          <p className="text-slate-600 mb-6 md:text-lg text-sm">
            আমরা শুধু ওষুধ সরবরাহ করি না — তার পাশাপাশি আপনাকে স্বাস্থ্যভ্রমণ ও অভিজ্ঞ চিকিৎসকদের কনসালটেশন সুবিধাও দিয়ে থাকি। Grow Care Health-এ আপনি পাবেন স্বাস্থ্যসেবার সম্পূর্ণ সমাধান এক জায়গায়।
          </p>

          <ul className="space-y-3 text-sm text-gray-600 md:text-lg">
            <li>✅ ঘরে বসেই ওষুধ অর্ডার ও হোম ডেলিভারি।</li>
            <li>✅ অভিজ্ঞ চিকিৎসকদের ভিডিও কনসালটেশন সুবিধা।</li>
            <li>✅ বিশ্বের সেরা মেডিকেল ট্যুরিজম গন্তব্যে চিকিৎসা সেবা।</li>
            <li>✅ সাশ্রয়ী খরচে উন্নত চিকিৎসা ও ট্রাভেল প্যাকেজ।</li>
            <li>✅ সার্বক্ষণিক ২৪/৭ হেল্পলাইন সাপোর্ট।</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
