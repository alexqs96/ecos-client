import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// maneja las peticiones relacionadas a posts 

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
