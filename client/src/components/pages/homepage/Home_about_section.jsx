import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import medeaimage1 from '@/assets/familly1.jpg'
import medeaimage2 from '@/assets/doctor3.jpg'
import medeaimage3 from '@/assets/doctor1.jpg'

export default function Home_about_section() {
  const images = [
    medeaimage1,
    medeaimage2,
    medeaimage3,
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Image Slider */}
        <div className='w-[80%] md:w-[60%] mx-auto my-4'> 
          <Slider {...settings}>
            {images.map((img, idx) => (
              <div key={idx}>
                <img
                  src={img}
                  alt={`Grow Care Slide ${idx + 1}`}
                  className="w-full h-36 md:h-48 object-cover rounded-xl shadow-lg"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* About Content */}
        <div className='w-[80%] md:w-[60%] mx-auto my-4' >
          <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-4 border-l-4 border-blue-500 pl-4">
            আমাদের সম্পর্কে
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>Grow Care Health</strong> একটি আধুনিক স্বাস্থ্যসেবা প্ল্যাটফর্ম যেখানে আপনি পাচ্ছেন ভিডিও কনসালটেশন, মেডিকেল ট্রিপের সুবিধা এবং ঘরে বসেই ওষুধ অর্ডার করার সুবিধা — সব এক ছাতার নিচে।  
          </p>

          <p className="text-lg text-gray-700 mt-4">
            স্বাস্থ্যসেবা হবে আরও সহজ, দ্রুত এবং নির্ভরযোগ্য — সেটাই আমাদের প্রতিশ্রুতি। আমরা আপনাকে সাহায্য করতে প্রস্তুত ২৪/৭।  
          </p>
        </div>
      </div>
    </section>
  );
}
