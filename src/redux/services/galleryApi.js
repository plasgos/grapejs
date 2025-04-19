// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const galleryApi = createApi({
  reducerPath: "galleryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  tagTypes: ["Gallery"],
  endpoints: (builder) => ({
    getImages: builder.query({
      query: ({ path = "", skip, limit } = {}) => ({
        url: "images",
        params: { path, skip, limit },
      }),
      // providesTags: (result) =>
      //   result
      //     ? [
      //         ...result.map(({ fileId }) => ({ type: "Gallery", id: fileId })),
      //         { type: "Gallery", id: "LIST" },
      //       ]
      //     : [{ type: "Gallery", id: "LIST" }],

      providesTags: () => [{ type: "Gallery", id: "LIST" }],
    }),
    deleteImage: builder.mutation({
      query: (fileId) => ({
        url: `/delete/${fileId}`,
        method: "DELETE",
      }),
      // invalidatesTags: (result, error, id) => [
      //   { type: "Gallery", id },
      //   { type: "Gallery", id: "LIST" },
      // ],
      invalidatesTags: () => [{ type: "Gallery", id: "LIST" }],
    }),
  }),
});

// Export hooks untuk digunakan di komponen
export const { useGetImagesQuery, useDeleteImageMutation } = galleryApi;
