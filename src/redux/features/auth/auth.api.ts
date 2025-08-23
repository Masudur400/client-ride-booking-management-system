import { baseApi } from "@/redux/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userInfo) => ({
                url: '/user/register',
                method: 'POST',
                data: userInfo
            })
        }),
        login: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                data: userInfo
            })
        }),
        logOut: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),
            invalidatesTags: ['USER']
        }),
        userInfo: builder.query({
            query: () => ({
                url: '/user/me',
                method: 'GET'
            }),
            providesTags: ['USER']
        }),
        updateInfo: builder.mutation({
            query: ( {id, updatedData} ) => ({
                url: `/user/${id}`,
                method: "PATCH",
                data: updatedData,
            }),
            invalidatesTags: ["USER"],
        })



    })
})


export const {
    useRegisterMutation,
    useLoginMutation,
    useUserInfoQuery,
    useLogOutMutation,
    useUpdateInfoMutation,
} = authApi