import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from '@/redux/features/auth/authSlice'
import { persistStore, FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { baseApi } from './api/baseApi/baseApi';




const persistConfig = {
    key: 'auth',
    storage,
}

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({

    reducer: persistedReducer,
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    }).concat(baseApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);