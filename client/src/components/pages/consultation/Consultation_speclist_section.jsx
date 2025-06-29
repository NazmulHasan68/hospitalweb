import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetConsultationsQuery } from "@/redux/ApiController/consaltaionAPi";

export default function Consultation_speclist_section({ receivedData }) {
  const {
    data: allDoctors = [],
    isLoading,
    isError,
  } = useGetConsultationsQuery();

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



  const formatDoctor = (doctor) => ({
    id: doctor._id,
    name: doctor.name,
    specialty: doctor.specialization,
    experience: `${doctor.experience} years`,
    age: doctor.age,
    imageUrl: doctor.photo
      ? `${import.meta.env.VITE_BASE_URL}/public/doctor/${doctor.photo}`
      : "https://via.placeholder.com/100",
  });

  const isReceivedDataArray = Array.isArray(receivedData);
  const filteredDoctors = isReceivedDataArray
    ? receivedData
        .filter((doc) => !doc.popular && !doc.suggested)
        .map(formatDoctor)
    : allDoctors.map(formatDoctor);

  const popularDoctors = allDoctors
    .filter((doc) => doc.popular)
    .map(formatDoctor);
  const suggestedDoctors = allDoctors
    .filter((doc) => doc.suggested)
    .map(formatDoctor);

  const DoctorCard = ({ doctor }) => (
    <div
      className="bg-white rounded-xl shadow-md p-4 mx-3"
      style={{ minHeight: "100px" }}
    >
      <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
        <img
          src={doctor.imageUrl}
          alt={doctor.name}
          className="w-20 h-20 rounded-full object-cover border-4 border-indigo-100 shadow-sm"
        />
        <div className="space-y-1">
          <h3 className="text-base md:text-lg font-bold text-gray-900">
            {doctor.name}
          </h3>
          <p className="text-indigo-600 font-semibold text-sm">
            {doctor.specialty}
          </p>
          <p className="text-gray-600 text-sm">
            Experience: <span className="font-medium">{doctor.experience}</span>
          </p>
          <p className="text-gray-600 text-sm">
            Age: <span className="font-medium">{doctor.age}</span>
          </p>
        </div>
      </div>
    </div>
  );

  if (isLoading) return <p className="text-center py-8">Loading...</p>;
  if (isError)
    return (
      <p className="text-center py-8 text-red-500">Failed to load doctors.</p>
    );

  return (
    <div className="space-y-12 p-4 max-w-7xl mx-auto">
      {isReceivedDataArray ? (
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Search Results
          </h2>
          {filteredDoctors.length ? (
            <Slider {...settings}>
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </Slider>
          ) : (
            <p className="text-gray-500">No doctors matched the criteria.</p>
          )}
        </section>
      ) : (
        <>
          {/* Popular Doctors */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Popular Doctors
            </h2>
            {popularDoctors.length ? (
              <Slider {...settings}>
                {popularDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </Slider>
            ) : (
              <p className="text-gray-500">No popular doctors found.</p>
            )}
          </section>

          {/* Suggested Doctors */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Suggested Doctors
            </h2>
            {suggestedDoctors.length ? (
              <Slider {...settings}>
                {suggestedDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </Slider>
            ) : (
              <p className="text-gray-500">No suggested doctors found.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
}
