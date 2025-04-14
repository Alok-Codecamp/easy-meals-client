import { baseApi } from "@/redux/api/baseApi/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (data) => {
                console.log(data);
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body: data
                };
            }
        }),

        forgetPassword: build.mutation({
            query: (email) => ({
                url: '/auth/forget-password',
                method: 'POST',
                body: email

            })
        }),
        resetPassword: build.mutation({
            query: (passwords) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: passwords

            })
        }),


    })
})

export const { useLoginMutation, useForgetPasswordMutation, useResetPasswordMutation } = authApi;