/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "@/redux/baseApi"





const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //    only get rider 
        getMyPostBooking: builder.query<any, void>({
            query: () => ({
                url: '/booking/my-posts/bookings',
                method: 'GET',
            }),
            providesTags: ['BOOKING'],
        }),
        //    only rider can update 
        updateBookingStatus: builder.mutation({
            query: ({ id, bookingStatus }) => ({
                url: `/booking/update-status/${id}`,
                method: "PATCH",
                data: { bookingStatus },
            }),
            invalidatesTags: ["BOOKING"],
        }),
        //    only get driver
        // getMyDriverPostBooking: builder.query<any, void>({
        //     query: () => ({
        //         url: '/booking/my-posts/bookings',
        //         method: 'GET',
        //     }),
        //     providesTags: ['BOOKING'],
        // }),
        // //    only driver can update 
        // updateDriverBookingStatus: builder.mutation({
        //     query: ({ id, bookingStatus }) => ({
        //         url: `/booking/update-status/${id}`,
        //         method: "PATCH",
        //         data: { bookingStatus },
        //     }),
        //     invalidatesTags: ["BOOKING"],
        // }),
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
   useGetMyPostBookingQuery,
   useUpdateBookingStatusMutation,
    useGetMyBookingQuery,
    useDeleteBookingMutation,
} = bookingApi