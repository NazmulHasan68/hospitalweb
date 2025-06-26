import React, { useState } from 'react';
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from '@/redux/ApiController/medicineOrderApi';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export default function CompleteOrders() {
  const { data = [], isLoading, isError } = useGetAllOrdersQuery();
  const [updateOrder] = useUpdateOrderStatusMutation();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const processingOrders = data.filter(
    (order) => order.deliveryStatus === 'delivered'
  );

  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(processingOrders.length / ITEMS_PER_PAGE);
  const currentOrders = processingOrders.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  console.log(currentOrders);
  

  const handleUpdateStatus = () => {
    if (!selectedOrder || !newStatus) return;
    updateOrder({ id: selectedOrder._id, deliveryStatus: newStatus });
    toast.success("Order status Update")
    setSelectedOrder(null);
    setNewStatus('');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-blue-600 mb-4">
        📦 Complete Orders
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load orders.</p>
      ) : currentOrders?.length === 0 ? (
        <p className="text-center text-gray-500">No processing orders found.</p>
      ) : (
        <>
          <div className="overflow-x-auto shadow rounded-lg bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100 text-left text-gray-600 font-semibold">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Shipping</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr
                    key={order?._id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-3">{order?._id}</td>
                    <td className="p-3 line-clamp-1">{order?.shippingAddress}</td>
                    <td className="p-3">{order?.paymentMethod}</td>
                    <td className="p-3">৳ {order?.totalAmount}</td>
                    <td className="p-3">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {order?.deliveryStatus}
                      </span>
                    </td>
                    <td className="p-3 text-blue-600 underline" onClick={() => setSelectedOrder(order)}>
                      View
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`px-3 py-1 rounded border ${
                  page === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Dialog Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full relative">
            <h3 className="text-lg font-semibold mb-4 text-blue-600">Order Details</h3>
            <p><strong>Order ID :</strong> {selectedOrder._id}</p>
            <p><strong>Customer : </strong> {selectedOrder?.user?.name}</p>
            <p><strong>Phone : </strong> {selectedOrder?.user?.phone}</p>
            <p><strong>Shipping:</strong> {selectedOrder.shippingAddress}</p>
            <p><strong>Payment:</strong> {selectedOrder.paymentMethod}</p>
            <p><strong>Amount:</strong> ৳ {selectedOrder.totalAmount}</p>
            <p>
              <strong>Order Time:</strong>{' '}
              {new Date(selectedOrder.createdAt).toLocaleString()}
            </p>
            <p><strong>Prescription : </strong></p>
            <ul className='flex gap-2 '>
              {selectedOrder.prescription.map((item , idx) => (
                <Link to={`/medicine/prescription/${idx}`} state={selectedOrder.prescription} key={item?._id} className='w-12 h-12 '>
                  <img src={`${import.meta.env.VITE_BASE_URL}/public/prescriptions/${selectedOrder?.prescription?.[idx]}`} className='w-full h-full object-cover'/>
                </Link>
              ))}
            </ul>
            <p className="mt-4 font-medium text-gray-700">Medicines : </p>
            <ul className="list-disc ml-5 mb-4">
              {selectedOrder.medicines.map((item, idx) => (
                <li key={item._id || idx}>
                  {item.medicine?.name || 'Unknown'} ( {item.medicine?.price} discount {item.medicine?.discount}% ) × {item.quantity} = {(item.medicine?.price - (item.medicine?.price * item.medicine?.discount / 100)) * item.quantity}
                </li>
              ))}
            </ul>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Update Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select status</option>
                <option value="rejected">Rejected</option> 
              </select>
            </div>

            <div className="flex justify-between">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
                onClick={handleUpdateStatus}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
