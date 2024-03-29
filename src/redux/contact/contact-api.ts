import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { store } from 'redux/store';

type RootState = ReturnType<typeof store.getState>;

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://connections-api.herokuapp.com/contacts/',

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
        url: ``,
        method: 'GET',
      }),
      providesTags: ['Contact'],
    }),

    deleteContact: builder.mutation<void, string>({
      query: id => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),

    addContact: builder.mutation<ContactResponse, ContactRequest>({
      query: contact => ({
        url: ``,
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contact'],
    }),

    updateContact: builder.mutation<ContactResponse, Contact>({
      query: ({ id, name, number }) => ({
        url: `${id}`,
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
