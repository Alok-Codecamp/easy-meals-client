import { baseApi } from "@/redux/api/baseApi/baseApi";



const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userData) => ({
                url: '/users/register',
                method: 'POST',
                body: userData,
            })
        }),
        getMyProfile: builder.query({
            query: (id: string) => ({
                url: `/users/my-profile/${id}`,
                method: 'GET',
            })
        }),
        updateProfile: builder.mutation({
            query: (userInfo) => ({
                url: `/users/update-profile/${userInfo.id}`,
                method: 'PUT',
                body: userInfo.data,
            })
        })
    })
})


export const { useRegisterMutation, useGetMyProfileQuery, useUpdateProfileMutation } = userApi;