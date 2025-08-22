import App from "@/App"; 
import DashboardLayOut from "@/components/layout/DashboardLayout";
import About from "@/pages/About"; 
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./AdminSidebarItems";

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
                path: 'about',
                Component: About
            },
        ]
    },
    // admin dashboard routes
    {
Component:DashboardLayOut,
path:'/admin',
children:[...generateRoutes(adminSidebarItems)]
    },
    {
        path:'/login',
        Component:Login
    },
    {
        path:'/register',
        Component:Register
    },
    
])