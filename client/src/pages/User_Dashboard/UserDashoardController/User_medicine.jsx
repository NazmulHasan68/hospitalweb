import React from 'react';
import { useLoadUserQuery } from '@/redux/ApiController/authApi';
import { useGetOrderByIdQuery } from '@/redux/ApiController/medicineOrderApi';

export default function User_medicine() {
  const { data: user } = useLoadUserQuery();
  const userId = user?.user?._id;

  const { data: orders = [], isLoading } = useGetOrderByIdQuery(userId, {
    skip: !userId,
  });

  const otherOrders = orders.filter(order => order.deliveryStatus !== 'delivered');

  if (isLoading) return <div className="p-4 text-center">⏳ Loading orders...</div>;
  if (!orders.length) return <div className="p-4 text-center">🚫 No orders found.</div>;
  if (!otherOrders.length) return <div className="p-4 text-center">🎉 All orders are delivered!</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center">🧾 Orders In Progress</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 h-[480px] overflow-auto">
        {otherOrders.map((order) => {
          const date = new Date(order.createdAt);
          const formattedDate = date.toLocaleDateString();
          const formattedTime = date.toLocaleTimeString();

          return (
            <div key={order._id} className="bg-white border shadow p-4 rounded-xl hover:shadow-lg transition">
              <div className="flex justify-between items-center">
                <div className="text-gray-700 font-semibold truncate">🆔 {order._id}</div>
               
              </div>

              <div className="text-sm mt-1">
                 <div className="text-xs text-gray-500">{formattedDate} | {formattedTime}</div>
                <span className="font-medium text-gray-600">Status:</span>{" "}
                <span className={`capitalize font-semibold ${
                  order.deliveryStatus === 'processing'
                    ? 'text-yellow-700'
                    : order.deliveryStatus === 'shipped'
                    ? 'text-blue-700'
                    : 'text-red-700'
                }`}>
                  {order.deliveryStatus}
                </span>
              </div>

              <div className="text-sm mt-1">
                <span className="font-medium text-gray-600">Total:</span>{" "}
                <span className="text-green-700 font-bold">৳{order.totalAmount}</span>
              </div>

              <div className="text-sm mt-1">
                <span className="font-medium text-gray-600">Payment:</span>{" "}
                <span className="text-gray-800">{order.paymentMethod}</span>
              </div>

              <div className="mt-2">
                <strong className="block text-sm text-gray-600">Medicines:</strong>
                <ul className="list-disc ml-6 text-sm text-gray-700">
                  {order.medicines.map((item, i) => (
                    <li key={i}>
                      {item.medicine.name} ({item.medicine.brand}) × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
