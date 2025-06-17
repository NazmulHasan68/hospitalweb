import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Your backend URL (make sure VITE_BASE_URL is defined in .env)
const USER_API = `${import.meta.env.VITE_BASE_URL}/api/medicine`;

export const medicineApi = createApi({
  reducerPath: "medicineApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include", // include cookies (for auth)
  }),
  tagTypes: ["Medicines"], // used for cache invalidation

  endpoints: (builder) => ({
    // Create a new medicine
    createMedicine: builder.mutation({
      query: (formData) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Medicines"], // auto-refresh medicine list
    }),

    // Get all medicines
    getAllMedicines: builder.query({
      query: () => ({
        url: "/all", // adjust if your backend uses a different endpoint
        method: "GET",
      }),
      providesTags: ["Medicines"],
    }),

    // Get a single medicine by ID
    getMedicineById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),

    // Delete a medicine by ID
    deleteMedicine: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Medicines"],
    }),

    // Update a medicine by ID
    updateMedicine: builder.mutation({
      query: ({ id, data }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Medicines"],
    }),
  }),
});

export const {
  useCreateMedicineMutation,
  useGetAllMedicinesQuery,
  useGetMedicineByIdQuery,
  useDeleteMedicineMutation,
  useUpdateMedicineMutation,
} = medicineApi;
