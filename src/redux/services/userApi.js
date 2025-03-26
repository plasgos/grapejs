// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi", // Nama slice di Redux store
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }), // Base URL untuk semua endpoint
  endpoints: (builder) => ({
    // Endpoint untuk mengambil data produk
    getUsers: builder.query({
      query: () => "users",
    }),

    // Endpoint untuk menambahkan produk (mutation)
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "products", // URL lengkap: /api/products
        method: "POST",
        body: newProduct, // Data yang dikirim ke backend
      }),
    }),
  }),
});

// Export hooks untuk digunakan di komponen
export const { useGetUsersQuery, useAddProductMutation } = userApi;
