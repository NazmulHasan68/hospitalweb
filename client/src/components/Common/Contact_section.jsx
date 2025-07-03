import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { useLoadUserQuery } from '@/redux/ApiController/authApi';
import { useNavigate } from 'react-router-dom';
import { useSendHelpMessageMutation } from '@/redux/ApiController/dashboardApi';

export default function Contact_section() {
  const navigate = useNavigate();
  const { data } = useLoadUserQuery();
  const [sendHelpMessage, { isLoading }] = useSendHelpMessageMutation();

  const isLoggedIn = !!data?.user;

  const [form, setForm] = useState({
    name: data?.user?.name || '',
    phone : data?.user?.phone || '',
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

    const payload = {
      name: form.name,
      phone: data?.user?.phone || '', 
      message: form.message,
    };

    try {
      await sendHelpMessage(payload).unwrap();
      toast.success('আপনার বার্তা পাঠানো হয়েছে!');
      setForm({ ...form, message: '' });
    } catch (err) {
      toast.error('বার্তা পাঠাতে সমস্যা হয়েছে');
    }
  };

  return (
    <section className="bg-blue-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-10 md:p-12">
          <h2 className="text-3xl font-semibold text-center text-blue-800 mb-2">
            যোগাযোগ করুন
          </h2>
          <p className="text-center text-gray-600 mb-8">
            আপনার যেকোনো প্রশ্ন, মন্তব্য বা পরামর্শ আমাদের জানান
          </p>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-gray-700 font-medium">
                আপনার নাম
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="নাম লিখুন"
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-gray-700 font-medium">
                বার্তা
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="আপনার বার্তা লিখুন sdf"
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition duration-200 disabled:opacity-60 shadow-md"
              >
                <Send className="w-5 h-5" />
                {isLoading ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
