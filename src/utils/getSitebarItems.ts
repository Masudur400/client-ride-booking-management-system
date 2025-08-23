import { Role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/AdminSidebarItems";
import { driverSidebarItems } from "@/routes/DriverSidebarItems";
import { riderSidebarItems } from "@/routes/RiderSidebarItems";
import { userSidebarItems } from "@/routes/UserSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case Role.SUPER_ADMIN:
      return [...adminSidebarItems];
    case Role.DRIVER:
      return [...driverSidebarItems];
    case Role.RIDER:
      return [...riderSidebarItems];
    case Role.USER:
      return [...userSidebarItems];
    default:
      return [];
  }
};