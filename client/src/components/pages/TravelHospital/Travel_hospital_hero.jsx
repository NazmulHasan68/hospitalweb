import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function Travel_hospital_hero() {
  const hospitals = [
    {
      name: "Bangkok General Hospital",
      image: "/images/hospital1.jpg",
    },
    {
      name: "Samitivej Sukhumvit Hospital",
      image: "/images/hospital2.jpg",
    },
    {
      name: "Bumrungrad International Hospital",
      image: "/images/hospital3.jpg",
    },
    {
      name: "Phuket International Hospital",
      image: "/images/hospital4.jpg",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="max-w-7xl mx-auto mt-6">
      <Slider {...settings}>
        {hospitals.map((hospital, index) => (
          <div key={index} className="relative">
            <img
              src={hospital.image}
              alt={hospital.name}
              className="w-full h-[250px] md:h-[300px] object-cover rounded-xl shadow-lg"
            />
            {/* Overlay Hospital Name */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-xl">
              <h2 className="text-white text-2xl md:text-4xl font-bold text-center px-4">
                {hospital.name}
              </h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
