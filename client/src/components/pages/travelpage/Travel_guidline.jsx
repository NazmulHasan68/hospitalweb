import React from 'react';

export default function Travel_guidline() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      {/* আমাদের সম্পর্কে */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">আমাদের সম্পর্কে</h2>
        <p className="text-sm md:text-base leading-relaxed">
          আমাদের মেডিকেল ট্যুরিজম সার্ভিস, বিশ্বমানের হাসপাতাল, অভিজ্ঞ ডাক্তার এবং উন্নত চিকিৎসা সুবিধার সাথে আপনাকে সংযুক্ত করতে প্রতিশ্রুতিবদ্ধ। আপনার চিকিৎসা যাত্রাকে আরামদায়ক, নিরাপদ ও ঝামেলামুক্ত করে তোলাই আমাদের মূল লক্ষ্য — চিকিৎসার পাশাপাশি থাইল্যান্ডের সৌন্দর্য ও আতিথেয়তা উপভোগ করুন।
        </p>
      </section>

      {/* যোগাযোগ করুন */}
      <section>
        <h2 className="text-2xl font-bold text-blue-700 mb-4">যোগাযোগ করুন</h2>
        <p className="text-sm md:text-base mb-1">📧 ইমেইল: support@medtravelthailand.com</p>
        <p className="text-sm md:text-base mb-1">📞 ফোন: +৬৬ ১২৩ ৪৫৬ ৭৮৯</p>
        <p className="text-sm md:text-base mb-1">📍 ঠিকানা: ১২৩ ওয়েলনেস রোড, ব্যাংকক, থাইল্যান্ড</p>
        <p className="text-sm md:text-base">🌐 ওয়েবসাইট: www.medtravelthailand.com</p>
      </section>
    </div>
  );
}
