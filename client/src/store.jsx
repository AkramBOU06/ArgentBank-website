// client/src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './features/auth/authSlice';
import transactionsReducer from './features/auth/transactionsSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token']
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    transactions: transactionsReducer,
  },
});

export const persistor = persistStore(store);
