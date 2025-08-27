# Driver/Rider Booking System 🚗🛵

## 🌟 Project Overview
The **Driver/Rider Booking System** is a modern, full-stack web application built to manage ride bookings efficiently. It provides a seamless platform for users to apply for driver or rider roles, create ride posts, book rides, and manage bookings. The system is designed to be user-friendly and role-based, giving Admins full control over posts, applications, and users.

This project is ideal for anyone looking to implement a simple yet functional ride management platform, similar to ride-sharing services like Uber or Pathao, but lightweight and fully customizable.

---

## 👥 User Roles & Permissions

### Rider
- Browse available driver posts.  
- Book rides from drivers.  
- Cancel bookings (with restrictions: cannot cancel if `ACCEPTED`, `PICKED_UP`, `IN_TRANSIT`, or `COMPLETED`).  
- View booking history.

### Driver
- Create, update, and delete ride posts (includes title, from, to, amount, etc.).  
- View all bookings made on their posts.  
- Only users with `DRIVER` role can post rides.

### Admin
- Approve or reject Rider/Driver applications.  
- Block or unblock ride posts.  
- Manage users and system content.  
- Full control over system management.

---

## ⚙️ Features

- Role-based authentication & authorization.  
- Apply system for Rider/Driver roles with Admin approval.  
- Driver posts with detailed information.  
- Booking system with status tracking:
  - `PENDING`  
  - `ACCEPTED`  
  - `PICKED_UP`  
  - `IN_TRANSIT`  
  - `COMPLETED`  
  - `CANCELLED`  
- Search functionality for posts (by title, from, to).  
- Admin dashboard for managing applications, posts, and users.  
- Secure JWT-based authentication.  

---

## 🛠 Tech Stack

**Frontend:**  
- React.js + TypeScript  
- Redux Toolkit + RTK Query  
- Tailwind CSS  
- React Router  
- Axios  

**Backend:**  
- Node.js + Express.js  
- MongoDB + Mongoose  
- JWT Authentication  

**Deployment & Tools:**  
- Vercel ([Frontend](https://client-ride-booking-management-syst.vercel.app))  
- MongoDB Atlas ([Database](https://bakend-ride-booking-system.vercel.app/api))  

--- 

