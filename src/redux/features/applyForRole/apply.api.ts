import { baseApi } from "@/redux/baseApi"

 

const applyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        sendRequest: builder.mutation({
            query: (request) => ({
                url: '/apply/create-apply',
                method: 'POST',
                data: request
            }),
            invalidatesTags: ['APPLY'],
        }),
         mySendRequest: builder.query({
            query: () => ({
                url: '/apply/my-apply',
                method: 'GET'
            }),
            providesTags: ['APPLY']
        }),
        cancelRequest: builder.mutation({
            query: () => ({
                url: 'apply/cancel',
                method: "DELETE",
            }),
            invalidatesTags: ['APPLY'],
        }),
        


    })
})


export const {
    useSendRequestMutation, 
    useMySendRequestQuery,
    useCancelRequestMutation,
} = applyApi