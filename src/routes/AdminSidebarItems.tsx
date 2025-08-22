 
 
 
import DriveOversight from "@/pages/admin/driveOversight";
import RideOversight from "@/pages/admin/rideOversight";
import UserManagement from "@/pages/admin/userManagement";
import ProfileManagement from "@/pages/profileManagement";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";



const AnalyticsDashboard = lazy(() => import("@/pages/admin/analyticsDashboard"))

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: AnalyticsDashboard,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Ride Oversight",
        url: "/admin/ride-oversight",
        component: RideOversight
      },
      {
        title: "Drive Oversight",
        url: "/admin/drive-oversight",
        component: DriveOversight
      },
      {
        title: "User Management",
        url: "/admin/user-management",
        component: UserManagement
      }, 
      {
        title: "Profile",
        url: "/admin/profile",
        component: ProfileManagement
      }, 
      
    ],
  },
];