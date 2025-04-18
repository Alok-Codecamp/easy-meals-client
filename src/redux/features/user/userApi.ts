import { baseApi } from "@/redux/api/baseApi/baseApi";



const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation({
            query: (userData) => ({
                url: '/users/register',
                method: 'POST',
                body: userData,
            })
        }),
        getMyProfile: build.query({
            query: (id: string) => ({
                url: `/users/my-profile/${id}`,
                method: 'GET',
            })
        }),
        updateProfile: build.mutation({
            query: (userInfo) => ({
                url: `/users/update-profile/${userInfo.id}`,
                method: 'PUT',
                body: userInfo.data,
            })
        })
    })
})


export const { useRegisterMutation, useGetMyProfileQuery, useUpdateProfileMutation } = userApi;