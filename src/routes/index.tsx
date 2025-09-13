import App from "@/App";
import DashboardLayOut from "@/components/layout/DashboardLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./AdminSidebarItems";
import { driverSidebarItems } from "./DriverSidebarItems";
import { riderSidebarItems } from "./RiderSidebarItems";
import { userSidebarItems } from "./UserSidebarItems";
import { withAuth } from "@/utils/withAuth";
import { Role } from "@/constants/role";
import type { TRole } from "@/types";
import RiderPosts from "@/pages/RiderPosts"; 
import DriverPosts from "@/pages/DriverPosts";
import { Contact } from "@/pages/Contact";
import TermsAndConditions from "@/pages/TermsAndConditions";
import PrivacyAndPolicy from "@/pages/PrivacyAndPolicy";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'rider-posts',
                Component:  RiderPosts 
            },
            {
                path: 'driver-posts',
                Component: DriverPosts 
            },
            {
                path: 'terms-and-conditions',
                Component:  TermsAndConditions
            },
            {
                path: 'privacy-policy',
                Component: PrivacyAndPolicy
            },
            {
                path: 'contact',
                Component: Contact
            },
        ]
    },
    // admin dashboard routes
    {
        Component: withAuth(DashboardLayOut, Role.SUPER_ADMIN as TRole),
        path: '/admin',

        children: [
            { index: true, element: <Navigate to="/admin/analytics" /> },
            ...generateRoutes(adminSidebarItems)
        ]
    },
    // driver dashboard router 
    {
        Component: withAuth(DashboardLayOut, Role.DRIVER as TRole),
        path: '/driver',
        children: [
            { index: true, element: <Navigate to="/driver/earning-dashboard" /> },
            ...generateRoutes(driverSidebarItems)
        ]
    },
    // rider dashboard router 
    {
        Component: withAuth(DashboardLayOut, Role.RIDER as TRole),
        path: '/rider',
        children: [
            { index: true, element: <Navigate to="/rider/earning-dashboard" /> },
            ...generateRoutes(riderSidebarItems)
        ]
    },
    // user dashboard router 
    {
        Component: withAuth(DashboardLayOut, Role.USER as TRole),
        path: '/user',
        children: [
            { index: true, element: <Navigate to="/user/overview" /> },
            ...generateRoutes(userSidebarItems)
        ]
    },


    // login register routes
    {
        path: '/login',
        Component: Login
    },
    {
        path: '/register',
        Component: Register
    },

])