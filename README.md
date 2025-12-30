# User Management System (MERN Stack)

A full-stack User Management System built using the MERN stack with Role-Based Access Control (RBAC).
The application allows users to register, log in, manage their profiles, and enables administrators to manage users by activating or deactivating accounts.

---

## Live Demo
- **Frontend Deployment:** https://mini-user-management-system-nu.vercel.app/
- **Backend API:** https://mini-user-management-system-e4sl.onrender.com

## Tech Stack

Frontend:
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify

Backend:
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JSON Web Tokens (JWT)
- Bcrypt
- CORS

---

## Features

- User Registration and Login
- JWT-based Authentication
- Role-Based Authorization (Admin/User)
- Protected Routes
- User Profile Management
- Change Password
- Last Login Tracking
- Admin Dashboard
- View All Users with Pagination
- Activate / Deactivate Users
- Secure Password Hashing
- Responsive UI (Mobile, Tablet, Desktop)

---

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas or Local MongoDB
- Git

---

### Clone Repository
```bash
git clone https://github.com/Rupas01/mini-user-management-system.git
cd mini-user-management
```

---

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file inside `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

Start backend server:
```bash
npm run dev
```

Backend URL: http://localhost:5000

---

### Frontend Setup
```bash
cd ../frontend
npm install
```

Start frontend server:
```bash
npm run dev
```

Frontend URL: http://localhost:5173

---

## Environment Variables

PORT – Backend server port  
MONGO_URI – MongoDB connection string  
JWT_SECRET – JWT secret key  
NODE_ENV – Environment mode  

---

## API Endpoints

Authentication:
- POST /api/auth/signup – Register user
- POST /api/auth/login – Login user
- PUT /api/auth/profile – Update profile (User)

User Management (Admin):
- GET /api/users – Get all users
- PUT /api/users/:id/status – Activate / Deactivate user

---

## Deployment

Backend:
- Platform: Render
- Build Command: npm install
- Start Command: node server.js

Frontend:
- Platform: Vercel
- Framework: Vite
- Build Command: npm run build
- Output Directory: dist

Database:
- MongoDB Atlas

---

## License
This project is created for educational purposes.

---

## Author
Mini Project – MERN Stack User Management System
