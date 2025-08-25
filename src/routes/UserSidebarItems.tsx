import ProfileManagement from "@/pages/ProfileManagement";  
import MyBookings from "@/pages/user/MyBookings";
import UserDeshboard from "@/pages/user/UserDeshboard";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/user/overview",
        component:  UserDeshboard,
      },
    ],
  },
  {
    title: "Management",
    items: [ 
      {
        title: "Booking History",
        url: "/user/bookings",
        component:  MyBookings,
      },
      {
        title: "Profile",
        url: "/user/profile",
        component: ProfileManagement
      }, 
      
    ],
  },
];