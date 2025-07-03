import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/banner`;

export const bannerApi = createApi({
  reducerPath: "bannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Banner"],

  endpoints: (builder) => ({
    // 🔸 Generic: Create section item (with file support)
    createSectionItem: builder.mutation({
      query: ({ sectionPath, body }) => ({
        url: `/${sectionPath}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Banner"],
    }),

    // 🔸 Generic: Get all items of a section
    getSectionItems: builder.query({
      query: (sectionPath) => `/${sectionPath}`,
      providesTags: ["Banner"],
    }),

    // 🔸 Generic: Get item by ID
    getSectionItemById: builder.query({
      query: ({ sectionPath, id }) => `/${sectionPath}/${id}`,
      providesTags: ["Banner"],
    }),

    // 🔸 Generic: Update section item
    updateSectionItem: builder.mutation({
      query: ({ sectionPath, id, body }) => ({
        url: `/${sectionPath}/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Banner"],
    }),

    // 🔸 Generic: Delete section item
    deleteSectionItem: builder.mutation({
      query: ({ sectionPath, id }) => ({
        url: `/${sectionPath}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

export const {
  useCreateSectionItemMutation,
  useGetSectionItemsQuery,
  useGetSectionItemByIdQuery,
  useUpdateSectionItemMutation,
  useDeleteSectionItemMutation,
} = bannerApi;
