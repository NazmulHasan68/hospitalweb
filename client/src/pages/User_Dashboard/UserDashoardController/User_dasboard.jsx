import React from 'react';
import { useSelector } from "react-redux";

export default function User_dashboard() {
  // Access cart items from Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">🛒 Total Items in Cart: {cartItems.length}</h2>
      <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
        {JSON.stringify(cartItems, null, 2)}
      </pre>
    </div>
  );
}
