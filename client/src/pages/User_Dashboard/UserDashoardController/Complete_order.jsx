import React, { useState } from 'react';
import { useLoadUserQuery } from '@/redux/ApiController/authApi';
import { useGetOrderByIdQuery } from '@/redux/ApiController/medicineOrderApi';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';

export default function OrderCart() {
  const { data: user } = useLoadUserQuery();
  const userId = user?.user?._id;

  const { data: orders = [], isLoading } = useGetOrderByIdQuery(userId, {
    skip: !userId,
  });

  const [selectedOrder, setSelectedOrder] = useState(null);

  if (isLoading) return <div className="p-4 text-center">⏳ Loading your orders...</div>;
  if (!orders.length) return <div className="p-4 text-center">🚫 No orders found.</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center">📦 Your Orders</h2>

      <div className="grid md:grid-cols-3 gap-4 h-[480px] overflow-auto">
        {orders.map((order) => {
          const date = new Date(order.createdAt);
          const formattedDate = date.toLocaleDateString();
          const formattedTime = date.toLocaleTimeString();

          return (
            <div key={order._id} className="bg-white border shadow-sm p-4 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-gray-700 font-semibold">🆔 {order._id}</div>
                <div className="text-xs text-gray-500">{formattedDate} | {formattedTime}</div>
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-600">Status:</span>{" "}
                <span className="capitalize text-blue-700 font-semibold">{order.deliveryStatus}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-600">Total:</span>{" "}
                <span className="text-green-700 font-bold">৳{order.totalAmount}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-600">Payment:</span>{" "}
                <span className="text-gray-800">{order.paymentMethod}</span>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-1.5 text-sm font-medium"
                  >
                    🔍 View Details
                  </button>
                </DialogTrigger>

                {selectedOrder && selectedOrder._id === order._id && (
                  <DialogContent className="max-w-lg">
                    <DialogTitle>🧾 Order Details</DialogTitle>
                    <div className="space-y-3 mt-3 text-sm text-gray-700">
                      <div><strong>Shipping:</strong> {order.shippingAddress}</div>
                      <div><strong>Payment:</strong> {order.paymentMethod}</div>
                      <div><strong>Status:</strong> {order.deliveryStatus}</div>
                      <div><strong>Total:</strong> ৳{order.totalAmount}</div>
                      <div><strong>Time:</strong> {formattedDate} at {formattedTime}</div>

                      <div>
                        <strong>Medicines:</strong>
                        <ul className="list-disc ml-6 mt-1">
                          {order.medicines.map((item, i) => (
                            <li key={i}>
                              {item.medicine.name} ({item.medicine.brand}) × {item.quantity}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {order.prescription?.length > 0 && (
                        <div>
                          <strong>Prescription:</strong>
                          <div className="flex gap-2 mt-2 flex-wrap">
                            {order.prescription.map((file, i) => (
                              <img
                                key={i}
                                src={`${import.meta.env.VITE_BASE_URL}/public/prescriptions/${file}`}
                                alt={`pres-${i}`}
                                className="w-20 h-20 object-cover border rounded"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                )}
              </Dialog>
            </div>
          );
        })}
      </div>
    </div>
  );
}
