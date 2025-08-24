import AnalyticsDashboard from "@/pages/admin/AnalyticsDashboard";
import DriveOversight from "@/pages/admin/DriveOversight";
import ManageRoleApplies from "@/pages/admin/ManageRoleApplies";
import RideOversight from "@/pages/admin/RideOversight";
import UserManagement from "@/pages/admin/UserManagement";
import ProfileManagement from "@/pages/ProfileManagement";
import type { ISidebarItem } from "@/types";
// import { lazy } from "react";



// const AnalyticsDashboard = lazy(() => import("@/pages/admin/AnalyticsDashboard"))

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
        title: "Manage Role Applies",
        url: "/admin/manage-role-applies",
        component: ManageRoleApplies
      }, 
      {
        title: "Profile",
        url: "/admin/profile",
        component: ProfileManagement
      }, 
      
    ],
  },
];