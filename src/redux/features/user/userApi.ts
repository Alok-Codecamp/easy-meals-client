import { baseApi } from "@/redux/api/baseApi/baseApi";



const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData,
            })
        })
    })
})


export const { useRegisterMutation } = userApi;