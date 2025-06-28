import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = `${import.meta.env.VITE_BASE_URL}/api/consultation`;  

export const consultationApi = createApi({
  reducerPath: "consultationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  tagTypes: ["Consultation"],

  endpoints: (builder) => ({
    getConsultations: builder.query({
      query: () => "/all",
      providesTags: ["Consultation"],
    }),

    getConsultationById: builder.query({
      query: (id) => `/findbyid/${id}`,
      providesTags: (result, error, id) => [{ type: "Consultation", id }],
    }),

    addConsultation: builder.mutation({
      query: ({newConsultation}) => ({
        url: "/create",
        method: "POST",
        body: newConsultation,
      }),
      invalidatesTags: ["Consultation"],
    }),

    updateConsultation: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Consultation", id }],
    }),

    deleteConsultation: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Consultation"],
    }),

    searchConsultations: builder.query({
      query: (searchTerm) => `/search?q=${searchTerm}`,
      providesTags: ["Consultation"],
    }),
  }),
});

export const {
  useGetConsultationsQuery,
  useGetConsultationByIdQuery,
  useAddConsultationMutation,
  useUpdateConsultationMutation,
  useDeleteConsultationMutation,
  useSearchConsultationsQuery,
} = consultationApi;
