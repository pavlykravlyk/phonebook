import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice, authApi } from './auth';
import { contactApi, contactSlice } from './contact';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const authSliceReducer = persistReducer(authPersistConfig, authSlice.reducer);

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [authSlice.name]: authSliceReducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [contactSlice.name]: contactSlice.reducer,
  });

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
    .concat(contactApi.middleware)
    .concat(authApi.middleware),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

setupListeners(store.dispatch);
