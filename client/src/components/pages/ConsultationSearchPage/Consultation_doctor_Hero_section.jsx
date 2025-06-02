import React from 'react';
import doctor from '@/assets/doctor.jpg';
import background from '@/assets/banner/banner6.jpg';

export default function Consultation_doctor_Hero_section() {
  return (
    <div className="relative w-full max-w-6xl mx-auto my-1">
      {/* Background Cover Image */}
      <div
        className="w-full h-40 md:h-72 bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${background})` }}
      ></div>

      {/* Doctor profile image - overlapping the background */}
      <div className="absolute left-8 md:left-16 -bottom-14 md:-bottom-20">
        <img
          src={doctor}
          alt="Dr. John Doe"
          className="rounded-full w-28 h-28 md:w-40 md:h-40 object-cover border-4 border-white shadow-lg"
        />
      </div>
   
    </div>
  );
}
