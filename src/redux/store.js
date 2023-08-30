import { configureStore } from '@reduxjs/toolkit'
import { usersApi } from './features/usersApi';
import { postsApi } from './features/postsApi';
import { authApi } from './features/authApi';
import user from './features/userSlice'

// aca se integran las apis y los slices que hayamos creado
// para poder utilizarlas en toda la aplicacion

// en el reducer ponemos los slices para manejar estados

export default configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    user
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([usersApi.middleware, postsApi.middleware, authApi.middleware]),
});