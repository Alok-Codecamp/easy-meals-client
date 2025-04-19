import { baseApi } from "@/redux/api/baseApi/baseApi";


const providerApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createMealProvider: build.mutation({
            query: (providerData) => ({
                url: `/providers/create-mealProvider/${providerData.id}`,
                method: 'POST',
                body: providerData.data
            })
        }),
        getMyMeals: build.query({
            query: (userId) => ({
                url: `/providers/my-profile/${userId}`,
                method: 'GET',
            })

        })
    })
})


export const { useCreateMealProviderMutation, useGetMyMealsQuery } = providerApi;