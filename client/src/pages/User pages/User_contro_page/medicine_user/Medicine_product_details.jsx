import React from 'react';
import productimage from '@/assets/doctor1.jpg';

export default function Medicine_product_details() {
  return (
    <div className="min-h-screen ">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* Product Image */}
          <div className="md:w-1/2">
            <img
              src={productimage}
              alt="Product"
              className="w-full h-64 md:h-h-64 object-cover rounded-md"
            />
          </div>

          {/* Product Info */}
          <div className="md:w-1/2  text-gray-800">
            <h2 className="text-2xl font-semibold text-blue-700">XYZ Medicine</h2>
            <p><span className="font-semibold">Company:</span> ABC Company</p>
            <p><span className="font-semibold">Brand:</span> Luxury</p>
            <p><span className="font-semibold">Price:</span> <s className="text-red-500">৳420</s></p>
            <p><span className="font-semibold">Offer Price:</span> <span className="text-green-600 font-bold">৳400</span></p>
            <p><span className="font-semibold">Expire Date:</span> 12/10/2025</p>
            <p><span className="font-semibold">Last Updated:</span> 12/10/2025</p>
            <p><span className="font-semibold">Category:</span> Child</p>
            <p><span className="font-semibold">Stock:</span> 123 units</p>
            <p><span className="font-semibold">Prescription Required:</span> <span className="text-red-600">Yes</span></p>
            <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="border-t p-6 space-y-4 text-gray-700">
          <h3 className="text-xl font-bold text-gray-800">Product Description</h3>

          <div>
            <h4 className="font-semibold text-lg text-blue-600 mb-1">Uses of this Product:</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, dolores blanditiis!
              Totam placeat expedita, est voluptates ipsum iusto cupiditate consequuntur a? Distinctio, laborum!
              Velit dolor eaque ad distinctio qui quam?
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-blue-600 mb-1">Working of this Product:</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio debitis natus possimus.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-blue-600 mb-1">Ingredients:</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod id ratione vel?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
