import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// maneja las peticiones relacionadas a usuarios (publicos)

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getFriendsList: builder.query({
      query: () => 'users',
    }),
    getProfile: builder.query({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetFriendsListQuery, useGetProfileQuery } = usersApi;
