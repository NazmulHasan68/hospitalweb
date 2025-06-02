import React, { useState } from 'react';
import medicineImage from '@/assets/familly1.jpg';
import { Link } from 'react-router-dom';

export default function Medicine_Page_user() {
  const medicines = [
    { id: 1, name: "Medicine 1", price: 500, decount: 15, image: medicineImage },
    { id: 2, name: "Medicine 2", price: 400, decount: 10, image: medicineImage },
    { id: 3, name: "Medicine 3", price: 560, decount: 12, image: medicineImage },
    { id: 4, name: "Medicine 4", price: 570, decount: 19, image: medicineImage },
    { id: 5, name: "Medicine 5", price: 520, decount: 25, image: medicineImage },
    { id: 6, name: "Medicine 6", price: 580, decount: 23, image: medicineImage },
    { id: 7, name: "Medicine 7", price: 600, decount: 20, image: medicineImage },
    { id: 8, name: "Medicine 8", price: 450, decount: 18, image: medicineImage },
    { id: 9, name: "Medicine 8", price: 450, decount: 18, image: medicineImage },
    { id: 10, name: "Medicine 8", price: 450, decount: 18, image: medicineImage },
    { id: 11, name: "Medicine 8", price: 450, decount: 18, image: medicineImage },
    { id: 12, name: "Medicine 8", price: 450, decount: 18, image: medicineImage },
    { id: 13, name: "Medicine 8", price: 450, decount: 18, image: medicineImage },
    { id: 14, name: "Medicine 8", price: 450, decount: 18, image: medicineImage },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(medicines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = medicines.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentItems.map((medi) => (
          <Link
            to="product_detaiils"
            key={medi.id}
            className="group bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 relative overflow-hidden"
          >
            <div className="h-40 overflow-hidden rounded-t-xl">
              <img
                src={medi.image}
                alt={medi.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <span className="absolute top-2 left-2 bg-blue-600 text-white text-sm px-2 py-1 rounded-full">
                {medi.decount}% OFF
              </span>
            </div>

            <div className="p-2">
              <h3 className="text-lg font-semibold text-gray-800">{medi.name}</h3>
              <p className="text-gray-600 text-xs">ABC Company Ltd.</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-700 font-bold text-md">৳{medi.price}</span>
              </div>
              <button className="w-full py-1 mt-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg transition-all duration-200">
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
