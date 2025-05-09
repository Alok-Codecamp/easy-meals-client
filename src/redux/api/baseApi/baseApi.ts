import { logOut, setUser } from "@/redux/features/auth/authSlice";
import { RootState } from "@/redux/store";
import { BaseQueryApi, DefinitionType, createApi, FetchArgs, fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";


// http://localhost:5000 

// https://easy-meals-server.vercel.app
const baseQuery = fetchBaseQuery({
    baseUrl: 'https://easy-meals-server.vercel.app',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('authorization', `${token}`)
            return headers;
        }
    },

})

const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (args, api, extraOptions): Promise<any> => {
    let result = await baseQuery(args, api, extraOptions);
    console.log(result);
    // https://easy-meals-server.onrender.com
    if ((result as any)?.error?.status === 500) {
        const res = await fetch('https://easy-meals-server.vercel.app/auth/refresh', {
            method: 'POST',
            credentials: 'include'
        });

        const data = await res.json();

        if (data.success) {
            const user = (api.getState() as RootState).auth.user;
            api.dispatch(setUser({
                user,
                token: data.data.token
            }));

            result = await baseQuery(args, api, extraOptions);

        } else {
            api.dispatch(logOut())
        }

    }
    return result;

}


export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken,
    endpoints: () => ({})
})