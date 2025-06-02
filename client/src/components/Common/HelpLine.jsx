import React from 'react';
import { Phone, Mail, Clock, Send } from 'lucide-react';

export default function HelpLine() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('আপনার বার্তা পাঠানো হয়েছে!');
    // ভবিষ্যতে এখানে API call যুক্ত করা যাবে।
  };

  return (
    <section className="bg-blue-50 py-32 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-xl md:text-3xl font-bold text-blue-800 mb-4">হেল্পলাইন সাপোর্ট</h1>
        <p className="text-sm md:text-lg text-gray-700 mb-8">
          আমরা সব সময় আপনার পাশে আছি। Grow Care Health-এর মাধ্যমে আপনি যেকোনো সমস্যার সমাধান পেতে পারেন দ্রুত এবং নির্ভরযোগ্যভাবে।
          নিচের যেকোনো মাধ্যমে যোগাযোগ করুন আমাদের সাপোর্ট টিমের সাথে।
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left mt-10">
          {/* Phone */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-start space-x-4">
            <Phone className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-md md:text-xl font-semibold text-blue-800">ফোন</h3>
              <p className="text-gray-700">+880 1234-567890</p>
              <p className="text-sm text-gray-500">সরাসরি কল করে কথা বলুন</p>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-start space-x-4">
            <Mail className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-md md:text-xl font-semibold text-blue-800">ইমেইল</h3>
              <p className="text-gray-700">support@growcarehealth.com</p>
              <p className="text-sm text-gray-500">২৪ ঘণ্টার মধ্যে উত্তর পাবেন</p>
            </div>
          </div>

          {/* Time */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-start space-x-4">
            <Clock className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-md md:text-xl font-semibold text-blue-800">সার্ভিস টাইম</h3>
              <p className="text-gray-700">২৪/৭ — প্রতিদিন, সবসময়</p>
              <p className="text-sm text-gray-500">সবসময় আমাদের হেল্পলাইন খোলা</p>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mt-10 text-sm">
          আমাদের উদ্দেশ্য — দ্রুত সাড়া দিয়ে আপনাকে সহায়তা করা যেন আপনার চিকিৎসা, ট্রাভেল বা কনসালটেশন অভিজ্ঞতা হয় নির্বিঘ্ন ও সহজ।
        </p>

        {/* Contact Form */}
        <div className="mt-20 bg-white rounded-xl shadow-lg p-8 text-left">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">যোগাযোগ ফর্ম</h2>
          <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm text-gray-700 font-medium mb-1">আপনার নাম</label>
              <input
                id="name"
                type="text"
                placeholder="নাম লিখুন"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-sm text-gray-700 font-medium mb-1">ফোন নম্বর</label>
              <input
                id="phone"
                type="tel"
                placeholder="আপনার ফোন নম্বর"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="md:col-span-2 flex flex-col">
              <label htmlFor="message" className="text-sm text-gray-700 font-medium mb-1">বার্তা</label>
              <textarea
                id="message"
                rows={5}
                placeholder="আপনার বার্তা লিখুন"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              ></textarea>
            </div>
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                <Send className="w-5 h-5" />
                বার্তা পাঠান
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

