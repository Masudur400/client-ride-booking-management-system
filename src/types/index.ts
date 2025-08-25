import type { ComponentType } from "react";



export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export interface IRider {
  _id: string
  title: string
  from: string
  to: string
  riderId: string
  riderName: string
  riderEmail: string
  amount: number
  postStatus: string
  available: boolean
  createdAt: string
  updatedAt: string
}


export interface IBooking {
  _id: string
  title:string
  from: string
  to: string
  amount: number
  postId: string
  transporterId: string
  transporterName: string
  transporterEmail: string
  bookerId: string
  bookerName: string
  bookerEmail: string
  bookingStatus: string
  createdAt: string
  updatedAt: string
}


export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "RIDER" | "DRIVER" 