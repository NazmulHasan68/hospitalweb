import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/travel`;

export const TravelApi = createApi({
  reducerPath: "TravelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", 
  }),
  tagTypes: ["TravelHelp"],

  endpoints: (builder) => ({
    createTravelHelp: builder.mutation({
      query: (formData) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["TravelHelp"],
    }),

    getAllTravelHelps: builder.query({
      query: () => "/all",
      providesTags: ["TravelHelp"],
    }),

    getTravelHelpById: builder.query({
      query: (id) => `/travel/${id}`,
      providesTags: (result, error, id) => [{ type: "TravelHelp", id }],
    }),


      getTravelById: builder.query({
      query: (id) => `/help/${id}`,
      providesTags: (result, error, id) => [{ type: "TravelHelp", id }],
    }),

    updateTravelHelp: builder.mutation({
      query: ({ id, data }) => ({
        url: `/travel/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "TravelHelp", id }],
    }),

    deleteTravelHelp: builder.mutation({
      query: (id) => ({
        url: `/travel/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TravelHelp"],
    }),
  }),
});

export const {
  useCreateTravelHelpMutation,
  useGetAllTravelHelpsQuery,
  useGetTravelHelpByIdQuery,
  useGetTravelByIdQuery,
  useUpdateTravelHelpMutation,
  useDeleteTravelHelpMutation,
} = TravelApi;
