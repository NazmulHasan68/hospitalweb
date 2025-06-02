import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import medeaimage from '@/assets/family.jpg'
import medeaimage1 from '@/assets/familly1.jpg'
import medeaimage2 from '@/assets/doctor3.jpg'
import medeaimage3 from '@/assets/doctor1.jpg'

export default function Home_mass_media_section() {
  const mediaItems = [
    {
      title: 'Health Talk on NTV',
      image: medeaimage,
      Link : '#'
    },
    {
      title: 'Featured in The Daily Star',
      image: medeaimage1,
      Link : '#'
    },
    {
      title: 'Grow Care at Health Expo 2024',
      image: medeaimage2,
      Link : '#'
    },
    {
      title: 'Special Coverage on Channel i',
      image: medeaimage3,
      Link : '#'
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="bg-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-lg md:text-2xl font-bold text-blue-800 mb-8">
          গণমাধ্যমে আমাদের উপস্থিতি
        </h2>

        <Slider {...settings}>
          {mediaItems.map((item, index) => (
            <Link to={index.Link}  key={index} className="px-4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </section>
  );
}
