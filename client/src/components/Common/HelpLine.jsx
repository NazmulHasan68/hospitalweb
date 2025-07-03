import React, { useState } from 'react';
import { Phone, Mail, Clock, Send } from 'lucide-react';
import Fixed_cart from '@/pages/User_pages/User_control_page/medicine_user/Fixed_cart';
import DoctorNotification from '@/pages/User_pages/User_control_page/medicine_user/DoctorNotification';
import { useLoadUserQuery } from '@/redux/ApiController/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useSendHelpMessageMutation } from '@/redux/ApiController/dashboardApi';

export default function HelpLine() {
  const navigate = useNavigate();
  const { data } = useLoadUserQuery();
  const [sendHelpMessage, { isLoading }] = useSendHelpMessageMutation();

  const isLoggedIn = !!data?.user;

  const [form, setForm] = useState({
    name: data?.user?.name || '',
    phone: data?.user?.phone || '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.warning('বার্তা পাঠাতে দয়া করে লগইন করুন');
      return navigate('/auth/login');
    }

    try {
      await sendHelpMessage(form).unwrap();
      toast.success('Thankes , wating for reply!');
      setForm({ ...form, message: '' });
    } catch (err) {
      toast.error('বার্তা পাঠাতে সমস্যা হয়েছে');
    }
  };

  return (
    <section className="bg-blue-50 py-32 px-4 relative">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-xl md:text-3xl font-bold text-blue-800 mb-4">হেল্পলাইন সাপোর্ট</h1>
        <p className="text-sm md:text-lg text-gray-700 mb-8">
          আমরা সব সময় আপনার পাশে আছি। Grow Care Health-এর মাধ্যমে আপনি যেকোনো সমস্যার সমাধান পেতে পারেন দ্রুত এবং নির্ভরযোগ্যভাবে। নিচের যেকোনো মাধ্যমে যোগাযোগ করুন আমাদের সাপোর্ট টিমের সাথে।
        </p>

        {/* Support Details */}
        <div className="grid md:grid-cols-3 gap-8 text-left mt-10">
          <SupportCard
            icon={<Phone className="w-8 h-8 text-blue-600" />}
            title="ফোন"
            value="+880 1234-567890"
            note="সরাসরি কল করে কথা বলুন"
          />
          <SupportCard
            icon={<Mail className="w-8 h-8 text-blue-600" />}
            title="ইমেইল"
            value="support@growcarehealth.com"
            note="২৪ ঘণ্টার মধ্যে উত্তর পাবেন"
          />
          <SupportCard
            icon={<Clock className="w-8 h-8 text-blue-600" />}
            title="সার্ভিস টাইম"
            value="২৪/৭ — প্রতিদিন, সবসময়"
            note="সবসময় আমাদের হেল্পলাইন খোলা"
          />
        </div>

        <p className="text-gray-600 mt-10 text-sm">
          আমাদের উদ্দেশ্য — দ্রুত সাড়া দিয়ে আপনাকে সহায়তা করা যেন আপনার চিকিৎসা, ট্রাভেল বা কনসালটেশন অভিজ্ঞতা হয় নির্বিঘ্ন ও সহজ।
        </p>

        {/* Contact Form */}
        <div className="mt-20 bg-white rounded-xl shadow-lg p-8 text-left">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">যোগাযোগ ফর্ম</h2>
          <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="name" className="text-sm text-gray-700 font-medium mb-1">আপনার নাম</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="নাম লিখুন"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="md:col-span-2 flex flex-col">
              <label htmlFor="message" className="text-sm text-gray-700 font-medium mb-1">বার্তা</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="আপনার বার্তা লিখুন "
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              ></textarea>
            </div>

            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                {isLoading ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="flex flex-col gap-2 fixed right-8 md:bottom-6 bottom-12 z-50">
        <Fixed_cart />
        <DoctorNotification />
      </div>
    </section>
  );
}

// Reusable Card Component
const SupportCard = ({ icon, title, value, note }) => (
  <div className="bg-white shadow-md rounded-lg p-6 flex items-start space-x-4">
    {icon}
    <div>
      <h3 className="text-md md:text-xl font-semibold text-blue-800">{title}</h3>
      <p className="text-gray-700">{value}</p>
      <p className="text-sm text-gray-500">{note}</p>
    </div>
  </div>
);
