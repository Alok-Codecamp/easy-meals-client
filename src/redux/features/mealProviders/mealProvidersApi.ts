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
        getMyMealProvider: builder.query({
            query: (userId) => ({
                url: `/providers/my-profile/${userId}`,
                method: 'GET',
            })

        }),
        getAllMealProvider: builder.query({
            query: (args: TQueryParam[]) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item) => {
                        const value = item.value
                        params.append(item.name, value as string);
                    })
                }
                return {
                    url: '/providers/all-provider',
                    method: 'GET',
                    params: params
                }
            },
            // transformResponse: (response: TReduxResponse<TResponseData>) => {
            //     return response.data;
            // },

        }),
        updateMealProviderProfile: builder.mutation({
            query: (providerData) => {
                console.log(providerData);
                return {
                    url: `/providers/update-profile/${providerData?.id}`,
                    method: "PUT",
                    body: providerData.data
                }
            }
        })
    })
})


export const { useCreateMealProviderMutation, useGetAllMealProviderQuery, useGetMyMealProviderQuery, useUpdateMealProviderProfileMutation } = providerApi;