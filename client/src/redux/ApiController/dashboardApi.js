import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = `${import.meta.env.VITE_BASE_URL}/api`;

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  tagTypes: ["Dashboard", "HelpMessage"],

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

    // ✅ GET all help messages
    getAllHelpMessages: builder.query({
      query: () => "/dashboard/getallmessage",
      providesTags: ["HelpMessage"],
    }),

    // ✅ POST a new help message
    sendHelpMessage: builder.mutation({
      query: (body) => ({
        url: "/dashboard/sendmessage",
        method: "POST",
        body,
      }),
      invalidatesTags: ["HelpMessage"],
    }),

    // ✅ DELETE a help message by ID
    deleteHelpMessage: builder.mutation({
      query: (id) => ({
        url: `/dashboard/deletemessage/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HelpMessage"],
    }),

    // ✅ PATCH to update isReplied status
    updateHelpMessageRepliedStatus: builder.mutation({
      query: ({ id, isReplied }) => ({
        url: `/dashboard/updatereplied/${id}`,
        method: 'PATCH',
        body: { isReplied },
      }),
      invalidatesTags: ['HelpMessage'],
    }),

  }),
});


export const {
  useGetAdminDashboardQuery,
  useGetDoctorDashboardQuery,
  useGetMedicineManagerDashboardQuery,
  useGetTravelManagerDashboardQuery,
  useGetConsultationManagerDashboardQuery,
  useGetAllHelpMessagesQuery,
  useSendHelpMessageMutation,
  useDeleteHelpMessageMutation,
  useUpdateHelpMessageRepliedStatusMutation
} = dashboardApi;
