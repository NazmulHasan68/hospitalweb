import React from 'react';

export default function FooterSection() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo and About */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Grow Care Health</h2>
          <p className="text-sm">
            আমরা আপনাকে আরও সুস্থভাবে বেড়ে উঠতে, নিরাপদে ভ্রমণ করতে এবং স্মার্টভাবে পরামর্শ নিতে সহায়তা করতে প্রতিশ্রুতিবদ্ধ। আপনার সুস্থতাই আমাদের অগ্রাধিকার।
          </p>
        </div>


          {/* Links Section */}
            <div className='hidden md:block'>
                <h3 className="text-xl font-semibold mb-2">Services</h3>
                <ul className="space-y-2 text-sm">
                    <li><a href="user_travel" className="hover:underline">Medicine</a></li>
                    <li><a href="user_medicine" className="hover:underline">Travel</a></li>
                    <li><a href="user_consultation" className="hover:underline">Consultation</a></li>
                    <li><a href="user_consultation/doctor" className="hover:underline">Doctor</a></li>
                    <li><a href="user_consultation" className="hover:underline">Help Linke</a></li>
                </ul>
            </div>

            {/* Social Media Links */}
            <div className='hidden md:block'>
                <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
                <ul className="space-y-2 text-sm">
                    <li><a href="https://facebook.com" target="_blank" className="hover:underline">Facebook</a></li>
                    <li><a href="https://instagram.com" target="_blank" className="hover:underline">Instagram</a></li>
                    <li><a href="https://twitter.com" target="_blank" className="hover:underline">Twitter</a></li>
                    <li><a href="https://youtube.com" target="_blank" className="hover:underline">Youtube</a></li>
                    <li><a href="https://LinkIn.com" target="_blank" className="hover:underline">LinkIn</a></li>
                    <li><a href="https://Thead.com" target="_blank" className="hover:underline">Thead</a></li>
                </ul>
            </div>

        <div className='flex justify-between  md:hidden'>

            {/* Links Section */}
            <div>
                <h3 className="text-xl font-semibold mb-2">Services</h3>
                <ul className="space-y-2 text-sm">
                    <li><a href="user_travel" className="hover:underline">Medicine</a></li>
                    <li><a href="user_medicine" className="hover:underline">Travel</a></li>
                    <li><a href="user_consultation" className="hover:underline">Consultation</a></li>
                </ul>
            </div>

            {/* Social Media Links */}
            <div>
                <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
                <ul className="space-y-2 text-sm">
                    <li><a href="https://facebook.com" target="_blank" className="hover:underline">Facebook</a></li>
                    <li><a href="https://instagram.com" target="_blank" className="hover:underline">Instagram</a></li>
                    <li><a href="https://twitter.com" target="_blank" className="hover:underline">Twitter</a></li>
                    <li><a href="https://youtube.com" target="_blank" className="hover:underline">Youtube</a></li>
                    <li><a href="https://LinkIn.com" target="_blank" className="hover:underline">LinkIn</a></li>
                    <li><a href="https://Thead.com" target="_blank" className="hover:underline">Thead</a></li>
                </ul>
            </div>

        </div>


        {/* Contact Form */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              required
            />
            <input
              type="phone"
              placeholder="Your Phone"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              required
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              rows="3"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Send Message
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
