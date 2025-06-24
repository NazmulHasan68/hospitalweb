import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Minus, Plus, X } from 'lucide-react';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from '@/redux/features/cartSlice';

export default function User_order() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const totalQuantity = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) {
      alert("🛒 আপনার কার্ট খালি!");
      return;
    }
    alert("✅ অর্ডার কনফার্ম হয়েছে!");
    dispatch(clearCart());
  };

  return (
    <div className="p-2 mx-auto flex gap-4 flex-col md:flex-row w-full " >
     

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">🛒 Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4 md:basis-3/4">
             <h1 className="text-2xl font-bold mb-6 text-blue-900">🧾 Check Medicine Order</h1>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white shadow rounded-lg p-4"
              >
                <div className="flex items-center gap-4 basis-3/6">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/public/${item.image}`}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-blue-800">{item.name}</h2>
                    <p className="text-sm text-gray-500">
                      ৳{item.price} × {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 basis-2/6">
                  <button
                    onClick={() => dispatch(decrementQuantity(item._id))}
                    className="bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(incrementQuantity(item._id))}
                    className="bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-4 basis-1/6">
                  <div className="text-md font-bold text-gray-700">
                    ৳{item.price * item.quantity}
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="text-red-500 hover:text-red-700"
                    title="Remove"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-14 bg-blue-100 rounded-lg p-4 h-52 md:basis-1/4">
            <h3 className="text-xl font-bold text-blue-900 mb-2">🧮 Order Summary</h3>
            <div className="flex justify-between text-gray-700">
              <span>Total Products:</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Total Quantity:</span>
              <span>{totalQuantity()}</span>
            </div>
            <div className="flex justify-between text-gray-900 font-semibold text-lg mt-2">
              <span>Total Price:</span>
              <span>৳{calculateTotal()}</span>
            </div>

            <button
              onClick={handleConfirmOrder}
              className="mt-4 w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg text-center transition"
            >
              ✅ Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
