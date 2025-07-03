import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useGetSectionItemsQuery } from '@/redux/ApiController/bannerApi';

export default function Home_hero_section() {
  const homeSection = useGetSectionItemsQuery('home-banner');

  const slides = homeSection?.data?.data || [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  };

  if (homeSection.isLoading) return <p>Loading...</p>;
  if (homeSection.isError) return <p>Error loading banners</p>;

  return (
    <div className="w-full max-w-screen-xl mx-auto pt-0 md:pt-2">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={`${import.meta.env.VITE_BASE_URL}/public/banner/${slide.banner}`}
              alt={`Slide ${index + 1}`}
              className="w-full h-[250px] md:h-[300px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-blue-900 bg-opacity-60 flex items-center justify-start">
              <div className="px-4 md:px-14">
                <h2 className="text-white text-2xl md:text-4xl font-bold text-left">
                  {slide.title}
                </h2>
                <p className="w-[75%] md:w-[60%] mt-4 text-stone-200">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
