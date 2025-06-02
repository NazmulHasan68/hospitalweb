import React from 'react';
import { Phone, Mail, Clock, Send } from 'lucide-react';

export default function Contact_section() {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('আপনার বার্তা পাঠানো হয়েছে!');
        // ভবিষ্যতে এখানে API call যুক্ত করা যাবে।
    };

  return (
       <section className="bg-blue-50 py-12 -mt-14 px-4">
          <div className="max-w-5xl mx-auto text-center">
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
