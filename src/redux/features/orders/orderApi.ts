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
        }),

        updateOrder: builder.mutation({
            query: (orderData) => ({
                url: `/orders/update-order${orderData.orderId}`,
                method: 'PUT',
                body: orderData.data
            })
        }),

    })
})



export const {
    useCreateOrderMutation,
    useGetCustomerOrdersQuery,
    useUpdateOrderMutation,
} = mealApi;