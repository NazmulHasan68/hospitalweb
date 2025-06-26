import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = `${import.meta.env.VITE_BASE_URL}/api/hospital`;

export const hospitalApi = createApi({
  reducerPath: "hospitalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  tagTypes: ["Hospital"],

  endpoints: (builder) => ({

    getAllHospitals: builder.query({
      query: (search) => ({
        url: search ? `/all?search=${search}` : "/all",
        method: "GET",
      }),
      providesTags: ["Hospital"],
    }),

    getHospitalById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Hospital", id }],
    }),

    createHospital: builder.mutation({
      query: (formData) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Hospital"],
    }),

    updateHospital: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Hospital", id }],
    }),


    deleteHospital: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Hospital"],
    }),
  }),
});

export const {
  useGetAllHospitalsQuery,
  useGetHospitalByIdQuery,
  useCreateHospitalMutation,
  useUpdateHospitalMutation,
  useDeleteHospitalMutation,
} = hospitalApi;
