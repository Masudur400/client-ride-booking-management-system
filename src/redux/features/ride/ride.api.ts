import { baseApi } from "@/redux/baseApi"



const rideApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createRide: builder.mutation({
            query: (data) => ({
                url: '/rider/create',
                method: 'POST',
                data: data
            }),
            invalidatesTags: ['RIDER'],
        }),
        getMyRiderPost: builder.query({
            query: ({ page, limit }) => ({
                url: `/rider/my-posts?page=${page}&limit=${limit}`,
                method: 'GET', 
            }),
            providesTags: ['RIDER'],
        }),
        removeRider: builder.mutation({
            query: (id) => ({
                url: `/rider/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['RIDER'],
        }),
        updateRiderPost: builder.mutation({
            query: ({ id, postStatus }) => ({
                url: `/rider/status/${id}`,
                method: "PATCH",
                data: postStatus,
            }),
            invalidatesTags: ["RIDER"],
        }),



    })
})


export const {
    useCreateRideMutation,
    useGetMyRiderPostQuery,
    useRemoveRiderMutation,
} = rideApi