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
      query: ({ id, updatedData }) => ({
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
    query: ({
      q,
      isActive,
      isFree,
      isAvailableToday,
      next2hr,
      maxPrice,
      sortBy,
      experience,
      category,
      page,
      limit,
    }) => {
      const params = new URLSearchParams();

      if (q?.trim()) params.set("q", q.trim());
      if (isActive !== undefined) params.set("isActive", String(isActive));
      if (isFree !== undefined) params.set("isFree", String(isFree));
      if (isAvailableToday !== undefined) params.set("isAvailableToday", String(isAvailableToday));
      if (next2hr !== undefined) params.set("next2hr", String(next2hr));
      if (maxPrice !== undefined) params.set("maxPrice", String(maxPrice));
      if (sortBy) params.set("sortBy", sortBy);
      if (experience) params.set("experience", experience);
      if (category) params.set("category", category);
      if (page !== undefined) params.set("page", String(page));
      if (limit !== undefined) params.set("limit", String(limit));

      return `/search?${params.toString()}`;
    },
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



