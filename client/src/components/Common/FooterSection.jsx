import React, { useState } from 'react';
import { useLoadUserQuery } from '@/redux/ApiController/authApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useSendHelpMessageMutation } from '@/redux/ApiController/dashboardApi';

export default function FooterSection() {
  const { data } = useLoadUserQuery();
  const navigate = useNavigate();
  const isLoggedIn = !!data?.user;
  const [sendHelpMessage, { isLoading }] = useSendHelpMessageMutation();

  const [form, setForm] = useState({
    name: data?.user?.name || '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.warning('বার্তা পাঠাতে লগইন করুন');
      return navigate('/auth/login');
    }

    try {
      await sendHelpMessage({
        name: form.name,
        message: form.message,
        phone: data?.user?.phone || '',
      }).unwrap();

      toast.success('Thnaks , Wating For Reply !');
      setForm({ ...form, message: '' });
    } catch (err) {
      toast.error('বার্তা পাঠাতে ব্যর্থ');
    }
  };

  return (
    <footer className="bg-gray-900 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and About */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Grow Care Health</h2>
          <p className="text-sm text-gray-300">
            আমরা আপনাকে আরও সুস্থভাবে বেড়ে উঠতে, নিরাপদে ভ্রমণ করতে এবং স্মার্টভাবে পরামর্শ নিতে সহায়তা করতে প্রতিশ্রুতিবদ্ধ। আপনার সুস্থতাই আমাদের অগ্রাধিকার।
          </p>
        </div>

        {/* Desktop: Services */}
        <div className="hidden md:block">
          <h3 className="text-xl font-semibold mb-2">Services</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/user_medicine" className="hover:underline">Medicine</a></li>
            <li><a href="/user_travel" className="hover:underline">Travel</a></li>
            <li><a href="/user_consultation" className="hover:underline">Consultation</a></li>
            <li><a href="/user_consultation/doctor" className="hover:underline">Doctor</a></li>
            <li><a href="/user_consultation" className="hover:underline">Help Line</a></li>
          </ul>
        </div>

        {/* Desktop: Social */}
        <div className="hidden md:block">
          <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="https://facebook.com" target="_blank" className="hover:underline">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" className="hover:underline">Instagram</a></li>
            <li><a href="https://twitter.com" target="_blank" className="hover:underline">Twitter</a></li>
            <li><a href="https://youtube.com" target="_blank" className="hover:underline">YouTube</a></li>
            <li><a href="https://linkedin.com" target="_blank" className="hover:underline">LinkedIn</a></li>
            <li><a href="https://threads.net" target="_blank" className="hover:underline">Threads</a></li>
          </ul>
        </div>

        {/* Mobile View Services + Social */}
        <div className="flex justify-between md:hidden gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/user_medicine" className="hover:underline">Medicine</a></li>
              <li><a href="/user_travel" className="hover:underline">Travel</a></li>
              <li><a href="/user_consultation" className="hover:underline">Consultation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="https://facebook.com" target="_blank" className="hover:underline">Facebook</a></li>
              <li><a href="https://instagram.com" target="_blank" className="hover:underline">Instagram</a></li>
              <li><a href="https://twitter.com" target="_blank" className="hover:underline">Twitter</a></li>
              <li><a href="https://youtube.com" target="_blank" className="hover:underline">YouTube</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Us Form */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              rows={3}
              required
            ></textarea>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full transition"
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <div className="text-center mt-10 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Grow Care Health. All rights reserved.
      </div>
    </footer>
  );
}
