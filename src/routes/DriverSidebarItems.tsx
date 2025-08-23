 
import { AddDriverPost } from "@/pages/driver/AddDriverPost";
import EarningsDriverDashboard from "@/pages/driver/EarningsDriverDashboard";
import IncomingDriverRequests from "@/pages/driver/IncomingDriverRequests";
import ProfileManagement from "@/pages/ProfileManagement";
import type { ISidebarItem } from "@/types";

export const driverSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Earning Dashboard",
        url: "/driver/earning-dashboard",
        component: EarningsDriverDashboard,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Add Driver Post",
        url: "/driver/add-post",
        component: AddDriverPost
      },
      {
        title: "Incoming Request",
        url: "/driver/incoming-request",
        component: IncomingDriverRequests
      }, 
      {
        title: "Profile",
        url: "/driver/profile",
        component: ProfileManagement
      }, 
      
    ],
  },
];