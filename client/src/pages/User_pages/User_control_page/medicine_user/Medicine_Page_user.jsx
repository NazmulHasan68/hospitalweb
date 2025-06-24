import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/features/cartSlice";
import { Link, useSearchParams } from 'react-router-dom';
import { useSearchByCategoryOrQueryQuery } from '@/redux/ApiController/medicineApi';
import MedicineSearchBar from './Medicine_search_bar';
import Fixed_cart from './Fixed_cart';
import DoctorNotification from './DoctorNotification';

export default function Medicine_Page_user() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  // Get cart items from redux store
  const cartItems = useSelector((state) => state.cart.cartItems);

  const query = searchParams.get('query') || '';
  const categoryParam = searchParams.get('categories');
  const categories = categoryParam ? categoryParam.split(',') : [];

  const { data: medicines = [], isLoading, isError } = useSearchByCategoryOrQueryQuery({
    query,
    categories,
  });

  // Pagination logic
  const totalPages = Math.ceil(medicines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = medicines.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1); // Reset page when filters change
  }, [query, categoryParam]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen text-lg text-gray-500">Loading medicines...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center min-h-screen text-lg text-red-500">Failed to load medicines.</div>;
  }

  const handleAddToCart = (medi) => {
    dispatch(addToCart({ 
      _id: medi._id,
      name: medi.name,
      price: medi.price,
      image: medi.images?.[0] || null,
      quantity: 1,
    }));
  };

  return (
    <div className="min-h-screen p-2 relative">
      <div className='md:hidden flex justify-between items-center py-4 -mt-8'>
        <p className='text-blue-950 font-medium'>Find your Medicine</p>
        <MedicineSearchBar />
      </div>

      <div className="mb-6 flex justify-between items-center gap-4">
        <h2 className="md:text-lg text-xs font-semibold text-gray-700">
          Total: {medicines?.length}
        </h2>
        <input
          type="text"
          placeholder="Search by name, company, country, category"
          value={query}
          onChange={(e) => {
            const newParams = new URLSearchParams(searchParams);
            if (e.target.value.trim()) {
              newParams.set('query', e.target.value);
            } else {
              newParams.delete('query');
            }
            setSearchParams(newParams, { replace: true });
          }}
          className="w-full sm:w-96 px-4 py-1 md:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {currentItems.map((medi) => (
          <div
            key={medi._id}
            className="group bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 relative overflow-hidden"
          >
            <div className="md:h-36 h-32 overflow-hidden rounded-t-xl relative">
              <img
                src={
                  Array.isArray(medi.images) && medi.images.length > 0
                    ? `${import.meta.env.VITE_BASE_URL}/public/${medi.images[0]}`
                    : "/placeholder.jpg"
                }
                alt={medi.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {medi.discount && (
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full shadow">
                  {medi.discount}% OFF
                </span>
              )}
            </div>

            <div className="p-2">
              <h3 className="text-sm md:text-md font-bold text-gray-800 truncate line-clamp-1">{medi.name}</h3>
              <div className='flex justify-between items-center'>
                <p className="text-gray-500 text-xs mb-1 line-clamp-1">{medi.company || 'Unknown Company'}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-700 font-semibold text-sm md:text-md">৳{medi.price}</span>
                </div>
              </div>
              <div className='bg-green-500 hover:bg-green-600 py-1 mt-2 text-white cursor-pointer text-center rounded-lg'>
                <Link to={`product_details/${medi._id}`} className='px-14'>View</Link>
              </div>

              {/* Conditional Add / Remove Cart Button */}
              {cartItems.some(item => item._id === medi._id) ? (
                <button
                  onClick={() => dispatch(removeFromCart(medi._id))}
                  className="w-full mt-1 py-1 md:py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 text-sm"
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  onClick={() => handleAddToCart(medi)}
                  className="w-full mt-1 py-1 md:py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-sm"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

       <div className='flex flex-col gap-2 fixed right-8 md:bottom-6 bottom-12'>
          <Fixed_cart/>
          <DoctorNotification/>
       </div>
    </div>
  );
}
