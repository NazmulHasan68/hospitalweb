import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const USER_API = `${import.meta.env.VITE_BASE_URL}/api/appointment`;

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: 'include',
  }),
  tagTypes: ['Appointment'],

  endpoints: (builder) => ({
    // ✅ Create new appointment
    addAppointment: builder.mutation({
      query: (formData) => ({
        url: '/',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Appointment'],
    }),

    // ✅ Get all appointments
    getAppointments: builder.query({
      query: () => '/',
      providesTags: ['Appointment'],
    }),

    // ✅ Get appointments by patient (user) ID
    getAppointmentsByUserId: builder.query({
      query: (userId) => `/user/${userId}`,
      providesTags: ['Appointment'],
    }),

    // ✅ Get appointments by doctor ID
    getAppointmentsByDoctorPhone: builder.query({
      query: (phone) => `/doctor/${phone}`,
      providesTags: ['Appointment'],
    }),

    // ✅ Search appointments by patient name
    searchAppointments: builder.query({
      query: (keyword) => `/search?keyword=${keyword}`,
      providesTags: ['Appointment'],
    }),

    // ✅ Update status
    updateAppointmentStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/status/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Appointment'],
    }),

    // ✅ Delete appointment
    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Appointment'],
    }),
  }),
});

export const {
  useAddAppointmentMutation,
  useGetAppointmentsQuery,
  useGetAppointmentsByUserIdQuery,
  useGetAppointmentsByDoctorPhoneQuery,
  useSearchAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
  useDeleteAppointmentMutation,
} = appointmentApi;
