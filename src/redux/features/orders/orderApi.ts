import { baseApi } from "@/redux/api/baseApi/baseApi";
import { TQueryParam } from "@/types/query";



const mealApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderData) => ({
                url: '/orders/customers/order',
                method: 'POST',
                body: orderData
            })
        }),




    })
})



export const {
    useCreateOrderMutation,
} = mealApi;