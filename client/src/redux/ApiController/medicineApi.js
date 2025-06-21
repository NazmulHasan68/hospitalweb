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
      invalidatesTags: ["Medicines"], 
    }),

    // Get all medicines
    getAllMedicines: builder.query({
      query: () => ({
        url: "/all", 
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
      query: ({ id, formData }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: formData,
        formData: true, 
      }),
      invalidatesTags: ["Medicines"],
    }),

    searchByCategoryOrQuery: builder.query({
      query: ({ query = '', categories = [] }) => {
        const params = new URLSearchParams();
        if (query) params.set('query', query);
        if (categories.length > 0) params.set('categories', categories.join(','));
        return `/search?${params.toString()}`;
      }
    })
  }),
});

export const {
  useCreateMedicineMutation,
  useGetAllMedicinesQuery,
  useGetMedicineByIdQuery,
  useDeleteMedicineMutation,
  useUpdateMedicineMutation,
  useSearchByCategoryOrQueryQuery
} = medicineApi;
