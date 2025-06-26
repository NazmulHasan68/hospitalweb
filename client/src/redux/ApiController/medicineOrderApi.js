import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ API Base URL from .env
const USER_API = `${import.meta.env.VITE_BASE_URL}/api/mediorders`;

export const mediorderApi = createApi({
  reducerPath: "mediorderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  tagTypes: ["Orders"],

  endpoints: (builder) => ({
    // ✅ Create Order (SSLCommerz)
    createOrder: builder.mutation({
      query: (formData) => ({
        url: "/ssl_order",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Orders"],
    }),

    // ✅ Create Manual Order (COD / Offline)
    createManualOrder: builder.mutation({
      query: (formData) => ({
        url: "/order",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Orders"],
    }),

    // ✅ Get All Medicines (used for selection or admin)
    getAllOrders: builder.query({
      query: () => "/medicines/orders",
      providesTags: ["Orders"],
    }),

    // ✅ Get Medicine by ID (you named it getOrderById, so renamed it properly here)
    getOrderById: builder.query({
      query: (id) => `/medicine/${id}`,
      providesTags: (result, error, id) => [{ type: "Orders", id }],
    }),

    // ✅ Update Order Status
    updateOrderStatus: builder.mutation({
      query: ({ id, ...statusData }) => ({
        url: `/${id}/status`,
        method: "PUT", // your Express router uses PUT, not PATCH
        body: statusData,
      }),
      invalidatesTags: ["Orders"],
    }),

    // ✅ Delete Order
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

// ✅ Export hooks for components
export const {
  useCreateOrderMutation,
  useCreateManualOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = mediorderApi;
