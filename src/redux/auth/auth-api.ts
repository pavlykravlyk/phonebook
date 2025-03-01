import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { store } from '../store';

type RootState = ReturnType<typeof store.getState>;

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://connections-api.goit.global/',

  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = (getState() as RootState).authSlice.token;

    if (token && endpoint !== 'logIn' && endpoint !== 'addUser')
      headers.set('authorization', `Bearer ${token}`);

    return headers;
  },
});

interface User {
  name: string;
  email: string;
}

interface UserResponse {
  user: User;
  token: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['User'],

  endpoints: builder => ({
    register: builder.mutation<UserResponse, RegisterRequest>({
      query: body => ({
        url: `users/signup`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [{ type: 'User' }],
    }),

    login: builder.mutation<UserResponse, LoginRequest>({
      query: credentials => ({
        url: `users/login`,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: [{ type: 'User' }],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: `users/logout`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'User' }],
    }),

    current: builder.mutation<User, void>({
      query: () => ({
        url: `users/current`,
        method: 'GET',
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useCurrentMutation } =
  authApi;

export const { register, login, logout, current } = authApi.endpoints;
