import App from "@/App"; 
import About from "@/pages/About"; 
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";

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
    {
        path:'/login',
        Component:Login
    },
    {
        path:'/register',
        Component:Register
    },
    
])