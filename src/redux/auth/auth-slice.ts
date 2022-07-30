import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, current } from './auth-api';
import { store } from 'redux/store';

type RootState = ReturnType<typeof store.getState>;

interface User {
  name: string | null;
  email: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    user: null,
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  } as AuthState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(register.matchFulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    });

    builder.addMatcher(login.matchFulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    });

    builder.addMatcher(logout.matchFulfilled, state => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    });

    builder.addMatcher(current.matchPending, state => {
      state.isRefreshing = true;
    });

    builder.addMatcher(current.matchFulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    });

    builder.addMatcher(current.matchRejected, state => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    });
  },
});

export default authSlice.reducer;

export const getIsLoggedIn = (state: RootState) => state.authSlice.isLoggedIn;
export const getUserName = (state: RootState) => state.authSlice.user?.name;
export const getToken = (state: RootState) => state.authSlice.token;
export const getIsRefreshing = (state: RootState) => state.authSlice.isRefreshing;
