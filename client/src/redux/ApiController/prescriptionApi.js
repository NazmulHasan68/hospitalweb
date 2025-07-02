import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = `${import.meta.env.VITE_BASE_URL}/api/prescription`;

export const prescriptionApi = createApi({
  reducerPath: "prescriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  tagTypes: ["Prescription"],

  endpoints: (builder) => ({
    // ✅ Create prescription
    createPrescription: builder.mutation({
      query: (formData) => ({
        url: `/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Prescription"],
    }),

    // ✅ Update prescription
    updatePrescription: builder.mutation({
      query: ({ appointmentId, formData }) => ({
        url: `/update/${appointmentId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Prescription"],
    }),

    // ✅ Delete prescription
    deletePrescription: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Prescription"],
    }),

    // ✅ Get all prescriptions
    getAllPrescriptions: builder.query({
      query: () => `/`,
      providesTags: ["Prescription"],
    }),

    // ✅ Get prescriptions by patient
    getPrescriptionsByPatient: builder.query({
      query: (patientId) => `/patient/${patientId}`,
      providesTags: ["Prescription"],
    }),

    // ✅ Get prescriptions by doctor
    getPrescriptionsByDoctor: builder.query({
      query: (doctorId) => `/doctor/${doctorId}`,
      providesTags: ["Prescription"],
    }),


    getPrescriptionsByAppointment: builder.query({
        query: (appointmentId) => `/appointment/${appointmentId}`,
        providesTags: ["Prescription"],
    }),

    // ✅ Search prescriptions
    searchPrescription: builder.query({
      query: (keyword) => `/search?keyword=${keyword}`,
      providesTags: ["Prescription"],
    }),
  }),
});

export const {
  useCreatePrescriptionMutation,
  useUpdatePrescriptionMutation,
  useDeletePrescriptionMutation,
  useGetAllPrescriptionsQuery,
  useGetPrescriptionsByPatientQuery,
  useGetPrescriptionsByDoctorQuery,
  useGetPrescriptionsByAppointmentQuery,
  useSearchPrescriptionQuery,
} = prescriptionApi;
