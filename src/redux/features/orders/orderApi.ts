import { baseApi } from "@/redux/api/baseApi/baseApi";



const mealApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderData) => ({
                url: '/orders/customers/order',
                method: 'POST',
                body: orderData
            })
        }),
        getCustomerOrders: builder.query({
            query: () => ({
                url: "/orders/customers/orders",
                method: "GET",

            })
        })



    })
})



export const {
    useCreateOrderMutation,
    useGetCustomerOrdersQuery,
} = mealApi;