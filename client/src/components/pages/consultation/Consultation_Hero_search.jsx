import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import family from '@/assets/family.jpg';
import banner from '@/assets/banner/banner1.jpg';

const images = [family, family, banner];

export default function ConsultationHeroSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const doSearch = () => {
    const q = searchTerm.trim();
    if (!q) return;

    setIsLoading(true);

    // Correct usage of URLSearchParams
    const params = new URLSearchParams();
    params.set('query', q);

    // Simulate loading
    setTimeout(() => {
      navigate(`/user_consultation/search?${params.toString()}`);
      setIsLoading(false); // optional: stop loading after navigation
    }, 300);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') doSearch();
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="relative max-w-7xl mx-auto mt-24">
      {/* Image slider */}
      <Slider {...sliderSettings}>
        {images.map((img, idx) => (
          <div key={idx}>
            <img
              src={img}
              alt=""
              className="w-full h-[250px] md:h-[300px] object-cover"
            />
          </div>
        ))}
      </Slider>

      {/* Search overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white p-2 rounded-xl shadow-md flex w-full max-w-xl">
          <input
            type="text"
            className="flex-grow px-4 py-2 border rounded-l-md outline-none"
            placeholder="রোগের নাম বা ডাক্তারের নাম লিখুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button
            type="button"
            onClick={doSearch}
            disabled={isLoading}
            className={`px-4 py-2 text-white rounded-r-md ${
              isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Loading…' : 'সার্চ করুন'}
          </button>
        </div>
      </div>
    </div>
  );
}
