import React from 'react';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const dummyDoctors = [
  {
    id: 1,
    name: 'Dr. Alice Johnson',
    specialty: 'Gynecologist',
    experience: '10 years',
    age: 42,
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'Dr. Bob Smith',
    specialty: 'Obstetrician',
    experience: '8 years',
    age: 38,
    imageUrl: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
  {
    id: 3,
    name: 'Dr. Clara Evans',
    specialty: 'Pediatrician',
    experience: '12 years',
    age: 45,
    imageUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    id: 4,
    name: 'Dr. David Lee',
    specialty: 'Neonatologist',
    experience: '7 years',
    age: 35,
    imageUrl: 'https://randomuser.me/api/portraits/men/68.jpg',
  },
  {
    id: 5,
    name: 'Dr. Emma Brown',
    specialty: 'Child Specialist',
    experience: '9 years',
    age: 40,
    imageUrl: 'https://randomuser.me/api/portraits/women/72.jpg',
  },
];

export default function Consultation_speclist_section() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, arrows: true },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, arrows: false },
      },
    ],
  };

  const DoctorCard = ({ doctor }) => (
    <div
      className="bg-white rounded-xl shadow-md p-4 mx-3"
      style={{ minHeight: '100px' }}
    >
      <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
        {/* Image */}
        <img
          src={doctor.imageUrl}
          alt={doctor.name}
          className="w-20 h-20 rounded-full object-cover border-4 border-indigo-100 shadow-sm"
        />

        {/* Details */}
        <div className="space-y-1">
          <h3 className="text-base md:text-lg font-bold text-gray-900">{doctor.name}</h3>
          <p className="text-indigo-600 font-semibold text-sm">{doctor.specialty}</p>
          <p className="text-gray-600 text-sm">Experience: <span className="font-medium">{doctor.experience}</span></p>
          <p className="text-gray-600 text-sm">Age: <span className="font-medium">{doctor.age}</span></p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-12 p-4 max-w-7xl mx-auto">
      {/* Women Specialists */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Women Specialists</h2>
        <Slider {...settings}>
          {dummyDoctors.slice(0, 3).map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </Slider>
      </section>

      {/* Child Specialists */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Child Specialists</h2>
        <Slider {...settings}>
          {dummyDoctors.slice(2).map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </Slider>
      </section>
    </div>
  );
}
