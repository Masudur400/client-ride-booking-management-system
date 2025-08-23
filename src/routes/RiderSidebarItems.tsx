import ProfileManagement from "@/pages/ProfileManagement"; 
import { AddRiderPost } from "@/pages/rider/AddRiderPost";
import EarningRiderDashboard from "@/pages/rider/EarningRiderDashboard";
import IncomingRiderRequests from "@/pages/rider/IncomingRiderRequests";
import type { ISidebarItem } from "@/types";

export const riderSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Earning Dashboard",
        url: "/rider/earning-dashboard",
        component: EarningRiderDashboard,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Add rider Post",
        url: "/rider/add-post",
        component: AddRiderPost
      },
      {
        title: "Incoming Request",
        url: "/rider/incoming-request",
        component: IncomingRiderRequests
      }, 
      {
        title: "Profile",
        url: "/rider/profile",
        component: ProfileManagement
      }, 
      
    ],
  },
];