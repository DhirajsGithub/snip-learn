// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import hobbyReducer from '../slices/hobbySlice';

export const store = configureStore({
  reducer: {
    hobby: hobbyReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;