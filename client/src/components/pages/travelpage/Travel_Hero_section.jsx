import React, { useState } from 'react';
import Slider from 'react-slick';
import { Search } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import banner from '@/assets/banner/banner3.jpg';
import banner2 from '@/assets/banner/banner2.jpg';
import banner3 from '@/assets/banner/banner5.jpg';
import banner4 from '@/assets/banner/banner7.jpg';
import { useGetAllHospitalsQuery } from '@/redux/ApiController/Hospital';
import { Link } from 'react-router-dom';

const sliderImages = [banner, banner2, banner3, banner4];

export default function Travel_Hero_section({ onSend }) {
  const { data } = useGetAllHospitalsQuery();
  const hospital = data || [];

  const [searchTerm, setSearchTerm] = useState('');

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 3000,
  };

  const handleSearch = (value) => {
  if (!value) {
    onSend(hospital);
    return;
  }

  const val = value.toLowerCase();

  const filteredHospital = hospital.filter((h) => {
    return (
      (h.hospitalName && h.hospitalName.toLowerCase().includes(val)) ||
      (h.country && h.country.toLowerCase().includes(val)) ||
      (h.city && h.city.toLowerCase().includes(val)) ||
      (h.specialty && h.specialty.toLowerCase().includes(val))
    );
  });

  onSend(filteredHospital);
};


  return (
    <div className=" w-full h-[180px] md:h-[220px] overflow-hidden relative">
      <Slider {...settings} className="w-full h-[180px] md:h-[220px] overflow-hidden">
        {sliderImages.map((src, i) => (
          <div key={i}>
            <img src={src} alt={`slide-${i}`} className="w-full h-[180px] md:h-[220px] object-cover" />
          </div>
        ))}
      </Slider>

      {/* Overlay with search */}
      <div className="absolute inset-0 bg-black/40 flex justify-center items-center -mt-6">
        <div className="bg-white/30 backdrop-blur-xs p-3 mx-4 rounded-md shadow-lg w-full max-w-2xl flex gap-4 justify-between items-center">
          {/* Hospital Input */}
          <input
            type="text"
            placeholder="Search by hospital name , country , city"
            className="md:p-2 p-1 rounded-md border border-gray-300 w-full"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch(e.target.value);
            }}
          />

          {/* Search Button */}
          <div
            onClick={() => handleSearch(searchTerm)}
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 flex items-center justify-center cursor-pointer"
          >
            <Search size={20} />
          </div>
        </div>
      </div>

      <div className=' absolute bottom-4 z-10 left-[36%] md:left-[45%]'>
          <Link to={`hospital/apply`} className='px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 hover:shadow-xl duration-300 font-semi-bold text-slate-50'>Start Process</Link>
      </div>
    </div>
  );
}
