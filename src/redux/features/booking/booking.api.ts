/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "@/redux/baseApi"





const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBooking: builder.mutation({
    query: ({ postId }: { postId: string }) => ({
        url: '/booking/create',
        method: 'POST',
        data: { postId },  // ✅ এখানে data use করতে হবে
    }),
    invalidatesTags: ['BOOKING'],
}),
        //    only get rider/driver
        getMyPostBooking: builder.query<any, void>({
            query: () => ({
                url: '/booking/my-posts/bookings',
                method: 'GET',
            }),
            providesTags: ['BOOKING'],
        }),
        //    only rider/driver can update 
        updateBookingStatus: builder.mutation({
            query: ({ id, bookingStatus }) => ({
                url: `/booking/update-status/${id}`,
                method: "PATCH",
                data: { bookingStatus },
            }),
            invalidatesTags: ["BOOKING"],
        }),
        getMyBooking: builder.query<any, void>({
            query: () => ({
                url: '/booking/my-bookings',
                method: 'GET',
            }),
            providesTags: ['BOOKING'],
        }),
        deleteBooking: builder.mutation({
            query: ({ id }: { id: string }) => ({
                url: `/booking/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['BOOKING'],
        }),



    })
})


export const {
    useCreateBookingMutation,
    useGetMyPostBookingQuery,
    useUpdateBookingStatusMutation,
    useGetMyBookingQuery,
    useDeleteBookingMutation,
} = bookingApi