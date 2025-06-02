import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate from react-router-dom
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import familly from '@/assets/family.jpg'
import familly1 from '@/assets/familly1.jpg'
import banner from '@/assets/banner/banner1.jpg'

const images = [
  familly,
  familly1,
  banner,
];

export default function Consultation_Hero_search() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleSearch = () => {
    // Trim and check if search term is not empty
    const query = searchTerm.trim();
    if (query) {
      // Navigate with query param, you can change this URL as needed
      navigate(`/user_consultation/search?query=${encodeURIComponent(query)}`);
    }
  };

  // Optional: handle Enter key press in input field
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative max-w-7xl mt-24 md:mx-auto">
      <Slider {...sliderSettings}>
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`slide-${index}`} className="w-full h-[250px] md:h-[300px] object-cover" />
          </div>
        ))}
      </Slider>

      <div className="absolute top-1/2 left-1/2 -mt-6 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xl px-4">
        <div className="bg-transparent shadow-md rounded-xl p-2 flex items-center space-x-2">
          <input
            type="text"
            placeholder="রোগের নাম বা ডাক্তারের নাম লিখুন..."
            className="flex-grow px-4 py-2 border rounded-md outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            সার্চ করুন
          </button>
        </div>
      </div>
    </div>
  );
}
