import { baseApi } from "@/redux/api/baseApi/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => {
                console.log(data);
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body: data
                };
            }
        }),

        forgetPassword: builder.mutation({
            query: (email) => ({
                url: '/auth/forget-password',
                method: 'POST',
                body: email

            })
        }),
        resetPassword: builder.mutation({
            query: (passwords) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: passwords

            })
        }),


    })
})

export const { useLoginMutation, useForgetPasswordMutation, useResetPasswordMutation } = authApi;