import React, { useState } from 'react';
import Slider from 'react-slick';
import { Search } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import banner from '@/assets/banner/banner3.jpg';
import banner2 from '@/assets/banner/banner2.jpg';
import banner3 from '@/assets/banner/banner5.jpg';
import banner4 from '@/assets/banner/banner7.jpg';

const sliderImages = [banner, banner2, banner3, banner4];

// Country → City mapping
const countryCityMap = {
  bd: ['Dhaka', 'Chattogram', 'Rajshahi'],
  in: ['Delhi', 'Mumbai', 'Kolkata'],
  us: ['New York', 'Los Angeles', 'Chicago'],
};

export default function Travel_Hero_section() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [cityList, setCityList] = useState([]);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setCityList(countryCityMap[country] || []);
  };

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

  return (
    <div className="relative w-full h-[300px] md:h-[300px] overflow-hidden">
      <Slider {...settings} className="w-full h-full overflow-hidden">
        {sliderImages.map((src, i) => (
          <div key={i}>
            <img
              src={src}
              alt={`slide-${i}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>

      {/* Overlay with search */}
      <div className="absolute inset-0 bg-black/40 flex justify-center items-center -mt-12">
        <div className="bg-white/30 backdrop-blur-xs p-3 mx-4 rounded-md shadow-lg w-full max-w-4xl space-y-3 md:space-y-0 md:space-x-3 flex flex-col md:flex-row items-stretch">

          {/* Country Dropdown */}
          <select
            onChange={handleCountryChange}
            className="p-2 rounded-md border border-gray-300 w-full"
          >
            <option value="">Select Country</option>
            <option value="bd">Bangladesh</option>
            <option value="in">India</option>
            <option value="us">USA</option>
          </select>

          {/* City Dropdown */}
          <select
            className="p-2 rounded-md border border-gray-300 w-full"
            disabled={!selectedCountry}
          >
            <option value="">
              {selectedCountry ? 'Select City' : 'Select Country First'}
            </option>
            {cityList.map((city, idx) => (
              <option key={idx} value={city.toLowerCase()}>
                {city}
              </option>
            ))}
          </select>

          {/* Hospital Input */}
          <input
            type="text"
            placeholder="Search by hospital name"
            className="p-2 rounded-md border border-gray-300 w-full"
          />

          {/* Search Button */}
          <button className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 flex items-center justify-center">
            <Search size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
