import { useGetMedicineByIdQuery } from '@/redux/ApiController/medicineApi';
import { MoveLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

export default function Medicine_product_details() {
    const location = useLocation();
  const { id } = useParams();

  const passedData = location?.state?.data;
  const { data: fetchedData, isLoading, isError } = useGetMedicineByIdQuery(id, {
    skip: !!passedData,
  });

  const medi = passedData || fetchedData;

  const [selectedImage, setSelectedImage] = useState(
    medi?.images?.[0]
      ? `${import.meta.env.VITE_BASE_URL}/public${medi.images[0]}`
      : '/placeholder.jpg'
  );

  useEffect(() => {
    if (medi?.images?.length > 0) {
      setSelectedImage(`${import.meta.env.VITE_BASE_URL}/public${medi.images[0]}`);
    }
  }, [medi]);

  if (isLoading) return <div className="text-center py-20 text-gray-500">Loading product...</div>;
  if (isError || !medi) return <div className="text-center py-20 text-red-500">No product data found.</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Link to="/user_medicine" className="flex items-center gap-2 text-blue-800 font-semibold mb-4">
        <MoveLeft /> Back to Product Page
      </Link>

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* Image Section */}
          <div className="md:w-1/2 space-y-4">
            <img
              src={selectedImage}
              alt={medi.name}
              className="w-full h-64 md:h-96 object-cover rounded-md border"
            />

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto">
              {medi.images?.length > 0 ? (
                medi.images.map((img, idx) => {
                  const imageUrl = `${import.meta.env.VITE_BASE_URL}/public${img}`;
                  return (
                    <img
                      key={idx}
                      src={imageUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      onClick={() => setSelectedImage(imageUrl)}
                      className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
                        selectedImage === imageUrl ? 'border-blue-600' : 'border-transparent'
                      } hover:border-blue-400 transition`}
                    />
                  );
                })
              ) : (
                <span className="text-gray-400">No images available.</span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 space-y-2 text-gray-800">
            <h2 className="text-2xl font-bold text-blue-700">{medi.name}</h2>
            <p>Company: <span className="font-semibold">{medi.company}</span></p>
            <p>Brand: <span className="font-semibold">{medi.brand}</span></p>
            <p>
              Price:
              {medi.discount ? (
                <>
                  <s className="text-red-500 ml-1">৳{medi.price}</s>
                  <span className="ml-2 text-green-600 font-bold">
                    ৳{(medi.price - (medi.price * medi.discount) / 100).toFixed(2)}
                  </span>
                  <span className="ml-2 text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">
                    {medi.discount}% OFF
                  </span>
                </>
              ) : (
                <span className="ml-2 text-blue-600 font-bold">৳{medi.price}</span>
              )}
            </p>
            <p>Production Date: <span className="font-semibold">{new Date(medi.productionDate).toLocaleDateString()}</span></p>
            <p>Expire Date: <span className="font-semibold">{new Date(medi.expiryDate).toLocaleDateString()}</span></p>
            <p>Last Updated: <span className="font-semibold">{new Date(medi.updatedAt).toLocaleDateString()}</span></p>
            <p>Category: <span className="font-semibold">{medi.category.replace(/_/g, ' ')}</span></p>
            <p>Country: <span className="font-semibold">{medi.country}</span></p>
            <p>Stock: <span className="font-semibold">{medi.stock} units</span></p>
            <p>
              Prescription Required:
              <span className={`ml-2 font-bold ${medi.prescriptionRequired ? 'text-red-600' : 'text-green-600'}`}>
                {medi.prescriptionRequired ? 'Yes' : 'No'}
              </span>
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Description Section */}
        <div className="border-t p-6 space-y-4 text-gray-700">
          <h3 className="text-xl font-bold text-gray-800">Product Description</h3>
          <p>{medi.description || 'No description provided.'}</p>

          <div>
            <h4 className="font-semibold text-lg text-rose-600 mb-1">Warning</h4>
            <p>{medi.warning || 'No warnings provided.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
