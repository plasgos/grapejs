import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aiGenerateApi = createApi({
  reducerPath: "aiGenrateApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["ai"],
  endpoints: (builder) => ({
    generateComponentFromAI: builder.mutation({
      query: (prompt) => ({
        url: `/ai`,
        method: "POST",
        body: prompt,
      }),
    }),
  }),
});

export const { useGenerateComponentFromAIMutation } = aiGenerateApi;
