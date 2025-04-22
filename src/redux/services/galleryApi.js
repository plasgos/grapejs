// // api.js
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const galleryApi = createApi({
//   reducerPath: "galleryApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
//   tagTypes: ["Gallery"],
//   endpoints: (builder) => ({
//     getImages: builder.query({
//       query: ({ path = "", skip, limit } = {}) => ({
//         url: "/images",
//         params: { path, skip, limit },
//       }),
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.map(({ fileId }) => ({ type: "Gallery", id: fileId })),
//               { type: "Gallery", id: "LIST" },
//             ]
//           : [{ type: "Gallery", id: "LIST" }],
//     }),
//     deleteImage: builder.mutation({
//       query: (fileId) => ({
//         url: `/delete/${fileId}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: (result, error, fileId) => [
//         { type: "Gallery", id: fileId },
//       ],
//     }),
//     purgeCache: builder.mutation({
//       query: (body) => ({
//         url: `/purge-cache`,
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: (result, error, fileId) => [
//         { type: "Gallery", id: fileId },
//       ],
//     }),
//   }),
// });

// // Export hooks untuk digunakan di komponen
// export const {
//   useGetImagesQuery,
//   useDeleteImageMutation,
//   useLazyGetImagesQuery,
//   usePurgeCacheMutation,
// } = galleryApi;

// api.js
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
