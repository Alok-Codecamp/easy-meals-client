import { baseApi } from "@/redux/api/baseApi/baseApi";
import { TQueryParam } from "@/types/query";



const mealApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createMeal: builder.mutation({
            query: (mealData) => ({
                url: '/meals/create-meal',
                method: 'POST',
                body: mealData
            })
        }),
        getAllMeal: builder.query({
            query: (args: TQueryParam[]) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item) => {
                        const value = item.value
                        params.append(item.name, value as string);
                    })
                }
                return {
                    url: '/meals/all-meals',
                    method: 'GET',
                    params: params
                }
            },
            // transformResponse: (response: TReduxResponse<TResponseData>) => {
            //     return response.data;
            // },

        }),

        getMealById: builder.query({
            query: (mealId) => ({
                url: `/meals/${mealId}`,
                method: "GET"
            })
        }),

        updateMeal: builder.mutation({
            query: (updatableMealData) => ({
                url: `meals/update-meal/${updatableMealData?.mealId}`,
                method: "PUT",
                body: updatableMealData?.data
            })
        })
    })
})



export const {
    useCreateMealMutation,
    useGetAllMealQuery,
    useGetMealByIdQuery,
    useUpdateMealMutation
} = mealApi;