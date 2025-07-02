import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = `${import.meta.env.VITE_BASE_URL}/api`;  

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  tagTypes: ["Dashboard"],

  endpoints: (builder) => ({
    getAdminDashboard: builder.query({
      query: () => "/dashboard/admin",
      providesTags: ["Dashboard"],
    }),

    getDoctorDashboard: builder.query({
      query: () => "/dashboard/doctor",
      providesTags: ["Dashboard"],
    }),

    getMedicineManagerDashboard: builder.query({
      query: () => "/dashboard/medicine-manager",
      providesTags: ["Dashboard"],
    }),

    getTravelManagerDashboard: builder.query({
      query: () => "/dashboard/travel-manager",
      providesTags: ["Dashboard"],
    }),

    getConsultationManagerDashboard: builder.query({
      query: () => "/dashboard/consultation-manager",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetAdminDashboardQuery,
  useGetDoctorDashboardQuery,
  useGetMedicineManagerDashboardQuery,
  useGetTravelManagerDashboardQuery,
  useGetConsultationManagerDashboardQuery,
} = dashboardApi;




