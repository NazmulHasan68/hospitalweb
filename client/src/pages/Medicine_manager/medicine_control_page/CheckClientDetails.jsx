import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrderByIdQuery, useGetAllOrdersQuery } from '@/redux/ApiController/medicineOrderApi';

export default function CheckClientDetails() {
  const { clientId } = useParams(); // this is the userId, not orderId
  const { data: allOrders = [], isLoading, isError } = useGetAllOrdersQuery();
  
  // Filter all orders for this user
  const userOrders = allOrders.filter((order) => order.user._id === clientId);

  // Extract user from the first order
  const user = userOrders[0]?.user;

  // Local state to show individual order details
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (isLoading) return <p className="text-center text-blue-500">Loading user orders...</p>;
  if (isError || userOrders.length === 0) return <p className="text-center text-red-500">No orders found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* User Info */}
      <div className="bg-white shadow rounded-lg p-6 flex gap-6 items-center">
        <img src={user.photoUrl} alt={user.name} className="w-24 h-24 rounded-full object-cover border" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">📧 {user.email}</p>
          <p className="text-gray-600">📱 {user.phone}</p>
          <p className="text-gray-600">Role: {user.role}</p>
        </div>
      </div>

      {/* All Orders List */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-gray-800">🧾 Orders List ({userOrders.length})</h3>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Order ID</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Delivery</th>
              <th className="p-2">Created</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.map((order) => (
              <tr key={order._id} className="border-t hover:bg-gray-50">
                <td className="p-2">{order._id.slice(-6)}</td>
                <td className="p-2">৳{order.totalAmount}</td>
                <td className="p-2">{order.paymentStatus}</td>
                <td className="p-2">{order.deliveryStatus}</td>
                <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-2 text-center">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Order Details */}
      {selectedOrder && (
        <div className="bg-white p-6 shadow rounded-lg space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">🛒 Order: {selectedOrder._id}</h3>

          {/* Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-3 bg-gray-50 rounded">💳 Payment: <strong>{selectedOrder.paymentStatus}</strong></div>
            <div className="p-3 bg-gray-50 rounded">📦 Delivery: <strong>{selectedOrder.deliveryStatus}</strong></div>
            <div className="p-3 bg-gray-50 rounded">📍 Shipping: <strong>{selectedOrder.shippingAddress}</strong></div>
          </div>

          {/* Prescriptions */}
          {selectedOrder.prescription?.length > 0 && (
            <div>
              <p className="font-medium mb-2">📝 Prescriptions</p>
              <div className="flex gap-4 flex-wrap">
                {selectedOrder.prescription.map((file, i) => (
                  <img
                    key={i}
                    src={`${import.meta.env.VITE_BASE_URL}/public/prescriptions/${file}`}
                    className="w-32 h-32 hover:w-full hover:h-full cursor-pointer transition-all duration-300 object-cover border rounded"
                    alt={`Prescription ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Medicines */}
          <div>
            <h4 className="font-semibold mb-2">💊 Medicines</h4>
            <div className="grid gap-4">
              {selectedOrder.medicines.map((item, i) => (
                <div key={i} className="flex gap-4 p-3 bg-gray-50 rounded-lg shadow-sm">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/public/photo/${item.medicine.images[0]}`}
                    className="w-24 h-24 object-cover rounded border  "
                    alt={item.medicine.name}
                  />
                  <div>
                    <h5 className="text-lg font-bold">{item.medicine.name}</h5>
                    <p className="text-sm">Brand: {item.medicine.brand}</p>
                    <p className="text-sm">৳{item.medicine.price} × {item.quantity} = <strong>৳{item.medicine.price * item.quantity}</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-right pt-4 border-t mt-4">
            <p className="text-xl font-bold">Total: ৳{selectedOrder.totalAmount}</p>
          </div>
        </div>
      )}
    </div>
  );
}
