import { baseApi } from "@/redux/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Super Admin / Admin - Full dashboard
    getDashboardStats: builder.query({
      query: () => ({
        url: "/stats/dashboard",
        method: "GET",
      }),
      providesTags: ["DASHBOARD"],
    }),

    // Rider dashboard
    getRiderDashboardStats: builder.query({
      query: () => ({
        url: "/stats/rider",
        method: "GET",
      }),
      providesTags: ["DASHBOARD"],
    }),

    // Driver dashboard
    getDriverDashboardStats: builder.query({
      query: () => ({
        url: "/stats/driver",
        method: "GET",
      }),
      providesTags: ["DASHBOARD"],
    }),

    // User dashboard
    getUserDashboardStats: builder.query({
      query: () => ({
        url: "/stats/user",
        method: "GET",
      }),
      providesTags: ["DASHBOARD"],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetRiderDashboardStatsQuery,
  useGetDriverDashboardStatsQuery,
  useGetUserDashboardStatsQuery,
} = dashboardApi;
