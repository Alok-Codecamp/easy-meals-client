import { baseApi } from "@/redux/api/baseApi/baseApi";
import { TQueryParam, TReduxResponse, TResponseData } from "@/types/query";


const providerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createMealProvider: builder.mutation({
            query: (providerData) => ({
                url: `/providers/create-mealProvider/${providerData.id}`,
                method: 'POST',
                body: providerData.data
            })
        }),
        getMyMeals: builder.query({
            query: (userId) => ({
                url: `/providers/my-profile/${userId}`,
                method: 'GET',
            })

        }),
        getAllMeals: builder.query({
            query: (args: TQueryParam[]) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item) => {
                        const value = item.value
                        params.append(item.name, value as string);
                    })
                }
                return {
                    url: '/providers/all-meals',
                    method: 'GET',
                    params: params
                }
            },
            // transformResponse: (response: TReduxResponse<TResponseData>) => {
            //     return response.data;
            // },

        }),
    })
})


export const { useCreateMealProviderMutation, useGetMyMealsQuery, useGetAllMealsQuery } = providerApi;