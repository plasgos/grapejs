// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authImagekit = createApi({
  reducerPath: "authImagekit",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (builder) => ({
    getAuthImagekit: builder.query({
      query: () => "auth",
    }),
    getImages: builder.query({
      query: () => "images",
    }),
  }),
});

// Export hooks untuk digunakan di komponen
export const { useGetAuthImagekitQuery, useGetImagesQuery } = authImagekit;
