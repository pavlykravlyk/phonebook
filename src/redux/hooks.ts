import { useMemo } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { getToken, useCurrentMutation } from './auth';
import { getFilterValue, useGetContactsQuery } from './contact';
import type { store, AppDispatch } from './store';

type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
  const [currentUser] = useCurrentMutation();
  const token = useAppSelector(getToken);

  return useMemo(() => {
    if (token) {
      currentUser();
    }
  }, [currentUser, token]);
};

interface IContact {
  id: string;
  name: string;
  number: string;
}

export const useContacts = () => {
  const filterValue = useAppSelector(getFilterValue);

  const selectFilteredContacts = useMemo(() => {
    return createSelector(
      [response => response.data, (_, filter) => filter],
      (contacts: IContact[], filter) =>
        contacts?.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase())) ?? []
    );
  }, []);

  return useGetContactsQuery(undefined, {
    selectFromResult(result) {
      return {
        ...result,
        filteredContacts: selectFilteredContacts(result, filterValue),
      };
    },
  });
};
