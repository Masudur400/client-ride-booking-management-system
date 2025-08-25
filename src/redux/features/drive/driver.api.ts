 
import { baseApi } from "@/redux/baseApi"



const rideApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createDriver: builder.mutation({
            query: (data) => ({
                url: '/driver/create',
                method: 'POST',
                data: data
            }),
            invalidatesTags: ['DRIVER'],
        }),
        getMyDriverPost: builder.query({
            query: ({ page, limit }) => ({
                url: `/driver/my-posts?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
            providesTags: ['DRIVER'],
        }), 
        removeDriver: builder.mutation({
            query: (id) => ({
                url: `/driver/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['DRIVER'],
        }),
        updateDriverPost: builder.mutation({
            query: ({ id, postStatus }) => ({
                url: `/deriver/status/${id}`,
                method: "PATCH",
                data: postStatus,
            }),
            invalidatesTags: ["DRIVER"],
        }),



    })
})


export const { 
    useCreateDriverMutation,
    useGetMyDriverPostQuery,
    useRemoveDriverMutation,
    useUpdateDriverPostMutation
} = rideApi