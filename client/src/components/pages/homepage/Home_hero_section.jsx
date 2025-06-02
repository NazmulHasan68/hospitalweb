import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner3 from '@/assets/banner/banner3.jpg'
import banner4 from '@/assets/banner/banner4.jpg'
import banner5 from '@/assets/banner/banner7.jpg'

export default function Home_hero_section() {
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

  const images = [
    {
      url: banner4,
      caption: 'Your Health, Our Priority',
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos ab ipsa ea beatae modi tempore accusantium enim placeat odit fugiat."
    },
    {
      url: banner3,
      caption: 'Travel with Confidence',
       description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos ab ipsa ea beatae modi tempore accusantium enim placeat odit fugiat."
    },
    {
      url: banner5,
      caption: 'Consult Smarter, Live Better',
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos ab ipsa ea beatae modi tempore accusantium enim placeat odit fugiat."
    },
  ];

  return (
    <div className="w-full max-w-screen-xl mx-auto pt-2">
      <Slider {...settings}>
        {images.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.url}
              alt={`Slide ${index + 1}`}
              className="w-full h-[250px] md:h-[300px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-blue-900 bg-opacity-60 flex items-center justify-start">
                <div className='px-4 md:px-14'>
                    <h2 className="text-white text-2xl md:text-4xl font-bold text-left ">{slide.caption}</h2>
                    <p className='w-[75%] md:w-[60%] mt-4 text-stone-200'>{slide.description}</p>
                </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
