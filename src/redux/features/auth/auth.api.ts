import { baseApi } from "@/redux/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userInfo) => ({
                url: '/user/register',
                method: 'POST',
                data: userInfo
            }),
            invalidatesTags: ["USER"],
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
        getAllUser: builder.query({
            query: () => ({
                url: '/user/all-users',
                method: 'GET'
            }),
            providesTags: ['USER']
        }),
        updateInfo: builder.mutation({
            query: ( {id, name} ) => ({
                url: `/user/${id}`,
                method: "PATCH",
                data: {name},
            }),
            invalidatesTags: ["USER"],
        }),
        updateUserRole: builder.mutation({
            query: ( {id, role} ) => ({
                url: `/user/${id}`,
                method: "PATCH",
                data: {role},
            }),
            invalidatesTags: ["USER"],
        }),
        changePassword: builder.mutation({
            query: (params) => ({
                url: '/auth/reset-password',
                method: "POST",
                data: params,
            }),
            invalidatesTags: ["USER"],
        })



    })
})


export const {
    useRegisterMutation,
    useLoginMutation,
    useUserInfoQuery,
    useGetAllUserQuery,
    useLogOutMutation,
    useUpdateInfoMutation,
    useUpdateUserRoleMutation,
    useChangePasswordMutation,
} = authApi