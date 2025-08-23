import ProfileManagement from "@/pages/ProfileManagement";
import bookings from "@/pages/user/bookings";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Booking History",
        url: "/user/bookings",
        component: bookings,
      },
    ],
  },
  {
    title: "Management",
    items: [ 
      {
        title: "Profile",
        url: "/user/profile",
        component: ProfileManagement
      }, 
      
    ],
  },
];