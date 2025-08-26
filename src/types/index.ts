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
  title: string
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

export interface IPost {
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







export interface IAuthProvider {
  provider: "google" | "credentials"
  providerId: string;
}

export interface IUser {
  _id?: string
  name: string
  email: string
  password?: string
  phone?: string
  picture?: string
  address?: string
  isDeleted?: string
  isActive?: "ACTIVE" | "INACTIVE" | "BLOCKED"
  isVerified?: boolean
  role: "SUPER_ADMIN" | "ADMIN" | "USER" | "USER" | "RIDER" | "DRIVER"
  auths: IAuthProvider[]
  createAt?: Date
}


export const postStatus = {
  APPROVED: 'APPROVED',
  BLOCKED: 'BLOCKED'
}



export interface IApply {
  createdAt: string
  email: string
  isApproved: boolean
  updatedAt: string
  userData: UserData
  userId: string
  want: string
  _id: string
} 
export interface UserData {
  email: string
  name: string
}



export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "RIDER" | "DRIVER" 