import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const hospitals = [
  {
    name: 'Bangkok General Hospital',
    location: { country: 'Thailand', city: 'Bangkok' },
    rating: 4.3,
    reviews: 86,
    established: 2009,
    beds: 1600,
    specialty: 'Super Specialty',
    code: '102',
 image: 'https://cdn.pixabay.com/photo/2014/12/10/20/56/hospital-563427_960_720.jpg',
  },
  {
    name: 'Samitivej Sukhumvit Hospital',
    location: { country: 'Thailand', city: 'Bangkok' },
    rating: 4.7,
    reviews: 112,
    established: 2005,
    beds: 900,
    specialty: 'Cardiology',
    code: '103',
 image: 'https://cdn.pixabay.com/photo/2014/12/10/20/56/hospital-563427_960_720.jpg',
  },
  {
    name: 'Bumrungrad International Hospital',
    location: { country: 'Thailand', city: 'Chiang Mai' },
    rating: 4.6,
    reviews: 134,
    established: 2001,
    beds: 1200,
    specialty: 'Neuroscience',
    code: '104',
 image: 'https://cdn.pixabay.com/photo/2014/12/10/20/56/hospital-563427_960_720.jpg',
  },
  {
    name: 'Phuket International Hospital',
    location: { country: 'Thailand', city: 'Phuket' },
    rating: 4.4,
    reviews: 76,
    established: 2010,
    beds: 700,
    specialty: 'Orthopedics',
    code: '105',
 image: 'https://cdn.pixabay.com/photo/2014/12/10/20/56/hospital-563427_960_720.jpg',
  },
  {
    name: 'Chiang Rai Hospital',
    location: { country: 'Thailand', city: 'Chiang Rai' },
    rating: 4.2,
    reviews: 53,
    established: 2003,
    beds: 800,
    specialty: 'Pediatrics',
    code: '106',
 image: 'https://cdn.pixabay.com/photo/2014/12/10/20/56/hospital-563427_960_720.jpg',
  },
  {
    name: 'Pattaya International Hospital',
    location: { country: 'Thailand', city: 'Pattaya' },
    rating: 4.5,
    reviews: 95,
    established: 2008,
    beds: 950,
    specialty: 'Gastroenterology',
    code: '107',
 image: 'https://cdn.pixabay.com/photo/2014/12/10/20/56/hospital-563427_960_720.jpg',
  },
  {
    name: 'Hua Hin Hospital',
    location: { country: 'Thailand', city: 'Hua Hin' },
    rating: 4.1,
    reviews: 45,
    established: 2012,
    beds: 500,
    specialty: 'General Surgery',
    code: '108',
 image: 'https://cdn.pixabay.com/photo/2014/12/10/20/56/hospital-563427_960_720.jpg',
  },
  {
    name: 'Udon Thani Hospital',
    location: { country: 'Thailand', city: 'Udon Thani' },
    rating: 4.0,
    reviews: 39,
    established: 2006,
    beds: 620,
    specialty: 'ENT',
    code: '109',
 image: 'https://cdn.pixabay.com/photo/2014/12/10/20/56/hospital-563427_960_720.jpg',
  },
  {
    name: 'Khon Kaen Medical Center',
    location: { country: 'Thailand', city: 'Khon Kaen' },
    rating: 4.6,
    reviews: 88,
    established: 2004,
    beds: 1100,
    specialty: 'Urology',
    code: '110',
 image: 'https://cdn.pixabay.com/photo/2014/12/10/20/56/hospital-563427_960_720.jpg',
  },
  {
    name: 'Rayong Hospital',
    location: { country: 'Thailand', city: 'Rayong' },
    rating: 4.3,
    reviews: 67,
    established: 2007,
    beds: 740,
    specialty: 'Dermatology',
    code: '111',
 image: 'https://cdn.pixabay.com/photo/2014/12/10/20/56/hospital-563427_960_720.jpg',
  },
  {
    name: 'Trang Central Hospital',
    location: { country: 'Thailand', city: 'Trang' },
    rating: 4.2,
    reviews: 58,
    established: 2011,
    beds: 780,
    specialty: 'Pulmonology',
    code: '112',
    image: 'https://cdn.pixabay.com/photo/2014/12/10/20/56/hospital-563427_960_720.jpg',
  },
  {
    name: 'Nakhon Pathom Hospital',
    location: { country: 'Thailand', city: 'Nakhon Pathom' },
    rating: 4.4,
    reviews: 81,
    established: 2013,
    beds: 880,
    specialty: 'Ophthalmology',
    code: '113',
    image: 'https://cdn.pixabay.com/photo/2014/12/10/20/56/hospital-563427_960_720.jpg',
  },
];

const ITEMS_PER_PAGE = 6;

export default function Travel_search_hospital() {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentHospitals = hospitals.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(hospitals.length / ITEMS_PER_PAGE);

  return (
    <div className="p-6 max-w-7xl md:mx-auto ">
      {/* Hospital Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
        {currentHospitals.map((hospital, index) => (
          <Link
            to={'hospital'}
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex "
            >
            {/* Image Section */}
            <div className="w-1/3 ">
                <img
                src={hospital.image}
                alt={hospital.name}
                className="w-full h-32 md:h-26 object-cover sm:h-full"
                onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
                }}
                />
            </div>
                {/* Info Section */}
            <div className="p-4 w-2/3 flex flex-col justify-between">
                <div>
                    <h2 className="md:text-lg text-sm font-bold text-gray-800">{hospital.name}</h2>
                    <p className=" text-xs md:text-sm  text-gray-500 mt-3">
                        📍 {hospital.location.city}, {hospital.location.country}
                    </p>
                    <p className=" text-xs md:text-sm text-yellow-600 ">
                        ⭐ {hospital.rating} ({hospital.reviews} Ratings)
                    </p>
                    <p className=" text-xs md:text-sm text-gray-600 ">🗓️ Established: {hospital.established}</p>
                    <p className=" text-xs md:text-sm text-gray-600 ">🛏️ Beds: {hospital.beds}</p>
                    <p className=" text-xs md:text-sm text-gray-600 ">🏥 Specialty: {hospital.specialty}</p>
                    <p className=" text-xs md:text-sm text-gray-600 ">🏷️ H.Code: {hospital.code}</p>
                    </div>
                    <button className="mt-1 bg-blue-600 text-white text-xs md:text-sm py-1 rounded-md hover:bg-blue-500 transition">
                    Contact Us
                    </button>
                </div>
            </Link>

        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ⬅️ Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 text-sm rounded ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
}
