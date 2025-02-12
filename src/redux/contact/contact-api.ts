import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { store } from '../store';

type RootState = ReturnType<typeof store.getState>;

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://connections-api.goit.global/',

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authSlice.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

interface Contact {
  id?: string;
  name: string;
  number: string;
}

interface ContactRequest {
  name: string;
  email?: string;
  number: string;
}

interface ContactResponse {
  id: string;
  name: string;
  number: string;
}

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery,
  tagTypes: ['Contact'],

  endpoints: builder => ({
    getContacts: builder.query<ContactResponse[], void>({
      query: () => ({
        url: `contacts`,
        method: 'GET',
      }),
      providesTags: ['Contact'],
    }),

    deleteContact: builder.mutation<void, string>({
      query: id => ({
        url: `contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),

    addContact: builder.mutation<ContactResponse, ContactRequest>({
      query: contact => ({
        url: `contacts`,
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contact'],
    }),

    updateContact: builder.mutation<ContactResponse, Contact>({
      query: ({ id, name, number }) => ({
        url: `contacts/${id}`,
        method: 'PATCH',
        body: { name, number },
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useDeleteContactMutation,
  useAddContactMutation,
  useUpdateContactMutation,
} = contactApi;
