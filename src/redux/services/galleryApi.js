import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const galleryApi = createApi({
  reducerPath: "galleryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Gallery"],
  endpoints: (builder) => ({
    getImages: builder.query({
      query: ({ path = "", skip, limit } = {}) => ({
        url: "/images",
        params: { path, skip, limit },
      }),
    }),
    deleteImage: builder.mutation({
      query: (fileId) => ({
        url: `/delete/${fileId}`,
        method: "DELETE",
      }),
    }),
    deleteImagePurgeCache: builder.mutation({
      query: ({ fileId, url }) => ({
        url: `/delete/${fileId}`,
        params: { url },
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetImagesQuery,
  useDeleteImageMutation,
  useLazyGetImagesQuery,
  useDeleteImagePurgeCacheMutation,
} = galleryApi;
