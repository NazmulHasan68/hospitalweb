import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Minus, Paperclip, Plus, X } from "lucide-react";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "@/redux/features/cartSlice";
import { toast } from "sonner";
import { useCreateManualOrderMutation, useCreateOrderMutation } from "@/redux/ApiController/medicineOrderApi";
import { useLoadUserQuery } from "@/redux/ApiController/authApi";
import { useNavigate } from "react-router-dom";


export default function User_order() {
const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useLoadUserQuery();
  const [createOrder, { isLoading: isCreating }] = useCreateOrderMutation();
  const [createManualOrder] = useCreateManualOrderMutation();
  const [prescriptions, setPrescriptions] = useState([]);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState("online"); // default payment

  const calculateTotal = () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalQuantity = () => cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPrescriptions((prev) => [...prev, ...files]);
  };

  const handleConfirmOrder = async () => {
    if (prescriptions.length === 0) {
      toast.error("📎 Please add your Prescription");
      return;
    }

    if (!data || !data.user) {
      toast.warning("Please login first");
      navigate("/auth/login");
      return;
    }

    if (cartItems.length === 0) {
      toast.warning("🛒 Your cart i s empty!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("totalAmount", calculateTotal());
      formData.append("shippingAddress", address);
      formData.append("userId", data.user._id);
      formData.append("paymentMethod", paymentMethod);

      const medicineData = cartItems.map((item) => ({
        medicine: item._id,
        quantity: item.quantity,
      }));
      formData.append("medicines", JSON.stringify(medicineData));

      prescriptions.forEach((file) => formData.append("files", file));

      if (paymentMethod === "cash") {
        const response = await createManualOrder(formData).unwrap();
        if (response) {
          window.location.href = response.redirectUrl;
          dispatch(clearCart());
          setPrescriptions([]);
          return;
        }  
      } else {
        const response = await createOrder(formData).unwrap();
        if (response) {
          window.location.href = response.redirectUrl;
          dispatch(clearCart());
          setPrescriptions([]);
          return;
        }
      }
    } catch (error) {
      console.error(" Order error:", error);
      toast.error("⚠️ Order could not be confirmed!");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center mt-10 text-blue-700 font-semibold">
        User is loading ......
      </div>
    );
  }



  return (
    <div className="p-2 mx-auto flex gap-4 flex-col md:flex-row w-full">
      {cartItems.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-48 bg-blue-100 rounded-lg shadow-md mx-auto max-w-md p-6">
          <div className="text-5xl mb-4">🛒</div>
          <p className="text-center text-gray-600 text-xl font-semibold">
            Your cart is empty.
          </p>
          <p className="text-center text-gray-400 mt-2">
            Please add some items to your cart to get started.
          </p>
        </div>
      ) : (
        <>
          {/* Medicine List */}
          <div className="md:space-y-4 md:basis-3/4">
            <h1 className="md:text-xl text-md font-bold mb-6 text-blue-900">
              🧾 Check Medicine Order
            </h1>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between mb-2 bg-white shadow rounded-lg md:p-4 p-2"
              >
                <div className="flex items-center gap-4 basis-3/6">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/public/${item.image}`}
                    alt={item.name}
                    className="md:w-16 w-10 h-10 md:h-16 object-contain rounded"
                  />
                  <div>
                    <h2 className="md:text-md text-xs font-semibold line-clamp-1 text-blue-800">
                      {item.name}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500">
                      ৳{item.price} × {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 md:gap-3 basis-2/6">
                  <button
                    onClick={() => dispatch(decrementQuantity(item._id))}
                    className="bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="px-2 text-xs">{item.quantity} Pice</span>
                  <button
                    onClick={() => dispatch(incrementQuantity(item._id))}
                    className="bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <div className="flex items-center gap-4 basis-1/6">
                  <div className="text-xs md:text-md font-semibold text-gray-700">
                    ৳{item.price * item.quantity}
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="text-red-500 hover:text-red-700"
                    title="Remove"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="mt-4 bg-blue-100 rounded-lg p-4 h-fit md:basis-1/4">
            <h3 className="text-xl font-bold text-blue-900 mb-2">Order Summary</h3>
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

            <div className="flex flex-col gap-1">
              <input
                id="address"
                type="text"
                value={address}
                placeholder="Enter address"
                onChange={(e) => setAddress(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Payment Method Radios */}
            <div className="mt-4">
              <label className="block font-semibold mb-2 text-blue-900">
                Payment Method:
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                    className="cursor-pointer"
                  />
                  <span>Online</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                    className="cursor-pointer"
                  />
                  <span>Cash </span>
                </label>
              </div>
            </div>

            {/* Upload Prescription */}
            <div className="mt-4">
              <label className="flex gap-2 font-medium text-gray-700 mb-1 text-xs">
                <Paperclip size={16}/> Upload Prescription ( Multiple )
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              <div className="mt-2 grid grid-cols-3 gap-2">
                {prescriptions.map((img, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt={`prescription-${index}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmOrder}
              disabled={isCreating}
              className="mt-4 w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg text-center transition disabled:opacity-60"
            >
              {isCreating ? "⏳ Processing..." : "Confirm Order"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
