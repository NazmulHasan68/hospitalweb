import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = `${import.meta.env.VITE_BASE_URL}/api/medicine`;

export const medicineApi = createApi({
  reducerPath: "medicineApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include", 
  }),
  endpoints: (builder) => ({
    createMedicine: builder.mutation({
      query: (formData) => ({
        url: "/create", 
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useCreateMedicineMutation } = medicineApi;
