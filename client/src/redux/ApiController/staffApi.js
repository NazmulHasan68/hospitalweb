import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = `${import.meta.env.VITE_BASE_URL}/api/staff`;

export const staffApi = createApi({
  reducerPath: "staffApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  tagTypes: ["Staff"],

  endpoints: (builder) => ({
    // Get all staff
    getAllStaff: builder.query({
      query: () => "/all",
      providesTags: ["Staff"],
    }),

    // Get single staff
    getOneStaff: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Staff", id }],
    }),

    // Search staff
    searchStaff: builder.query({
      query: (query) => `/search?query=${query}`,
      providesTags: ["Staff"],
    }),

    // Get staff by department
    getByDepartment: builder.query({
      query: (department) => `/department/${department}`,
      providesTags: ["Staff"],
    }),

    // Create staff
    createStaff: builder.mutation({
      query: (formData) => ({
        url: `/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Staff"],
    }),

    // Update staff
    updateStaff: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Staff"],
    }),

    // Delete staff
    deleteStaff: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Staff"],
    }),

  }),
});

export const {
  useGetAllStaffQuery,
  useGetOneStaffQuery,
  useSearchStaffQuery,
  useGetByDepartmentQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} = staffApi;
