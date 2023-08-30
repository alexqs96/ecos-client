import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// maneja las peticiones de datos basicos del usuario logueado y cerrar sesion

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    fetchOptions: {
      credentials: 'include',
    },
  }),
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => ({
        url: 'auth/userdata',
        method: "GET",
        credentials: "include"
      })
    }),
    logOut: builder.mutation({
      query: () => ({
        url: 'auth/signout',
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
});

export const { useGetUserDataQuery, useLogOutMutation } = authApi;
