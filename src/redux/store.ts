import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/features/auth/authSlice';
import { persistStore, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { baseApi } from './api/baseApi/baseApi';

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, authReducer)
// Combine reducers (adding your `baseApi` as well)
// const rootReducer = combineReducers({
//     [baseApi.reducerPath]: baseApi.reducer,
//     auth: authReducer, // The `auth` slice
// });

// Wrap root reducer with persistReducer


export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: persistedReducer,

    },
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    }).concat(baseApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Initialize the persistor
export const persistor = persistStore(store);
