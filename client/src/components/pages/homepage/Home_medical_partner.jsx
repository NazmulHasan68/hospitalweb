import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import hospitallogo from '@/assets/doctor.jpg'

const partners = [
  {
    name: 'Apollo Hospital',
    logo: hospitallogo,
  },
  {
    name: 'Fortis Healthcare',
     logo: hospitallogo,
  },
  {
    name: 'Medanta',
   logo: hospitallogo,
  },
  {
    name: 'Bumrungrad Thailand',
    logo: hospitallogo,
  },
  {
    name: 'AIIMS Delhi',
    logo: hospitallogo,
  },
];

export default function Home_medical_partner() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-blue-50 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-800 mb-6">
          আমাদের মেডিকেল পার্টনার
        </h2>

        <Slider {...settings}>
          {partners.map((partner, index) => (
            <div key={index} className="">
                <div className='flex justify-center items-center'>
                    <img
                        src={partner.logo}
                        alt={partner.name}
                        className="mx-auto w-20 h-20 rounded-3xl object-cover overflow-hidden  transition duration-300"
                    />
                    <p className='text-blue-800'>{partner.name}</p>
                </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
