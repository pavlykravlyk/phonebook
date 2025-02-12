import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { store } from '../store';

type RootState = ReturnType<typeof store.getState>;

export const contactSlice = createSlice({
  name: 'filter',
  initialState: { value: '' },

  reducers: {
    setFilter: (state: { value: string }, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setFilter } = contactSlice.actions;

export const getFilterValue = (state: RootState) => state.filter.value;
