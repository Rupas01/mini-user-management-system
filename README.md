# User Management System (MERN Stack)

A full-stack User Management System built using the MERN stack with Role-Based Access Control (RBAC).
The application allows users to register, log in, manage their profiles, and enables administrators to manage users by activating or deactivating accounts.

---

## Live Demo
- **Frontend Deployment:** https://mini-user-management-system-nu.vercel.app/
- **Backend API:** https://mini-user-management-system-e4sl.onrender.com

---

## Tech Stack

### Frontend:
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify

### Backend:
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
- Password hashing using bcrypt
- JWT-based authentication
- Role-Based Authorization (Admin/User)
- Protected Routes
- User Profile Management
- Change Password
- Last Login Tracking
- Admin Dashboard
- View All Users with Pagination
- Activate / Deactivate Users
- Responsive UI (Mobile, Tablet, Desktop)

---

## Admin Access
- By default, users are registered with the "User" role.
- Admin privileges can be assigned manually by updating the user's role field in the MongoDB database.

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
cd mini-user-management-system
```

---

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file inside `backend` folder:
- PORT=5000
- MONGO_URI=your mongodb connection string
- JWT_SECRET=your jwt secret
- NODE_ENV=development

#### Start backend server:
```bash
npm run dev
```

**Backend URL**: http://localhost:5000

---

### Frontend Setup
```bash
cd ../frontend
npm install
```

#### Start frontend server:
```bash
npm run dev
```

**Frontend URL**: http://localhost:5173

---

## Environment Variables

- PORT – Backend server port  
- MONGO_URI – MongoDB connection string  
- JWT_SECRET – JWT secret key  
- NODE_ENV – Environment mode  

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

### Backend:
- Platform: Render
- Build Command: npm install
- Start Command: node server.js

### Frontend:
- Platform: Vercel
- Framework: Vite
- Build Command: npm run build
- Output Directory: dist

### Database:
- MongoDB Atlas

---

## Testing

The backend is tested using **Jest**, **Supertest**, and **mongodb-memory-server** to ensure isolated and reliable testing without affecting the production database.

### Testing Approach
- An in-memory MongoDB instance is created using `mongodb-memory-server`
- Mongoose connects to the in-memory database during test execution
- The Express app is imported directly to test real API endpoints
- Database is disconnected and cleaned up after tests

### Test Coverage
The following functionalities are tested:

- Password hashing before saving a user
- Default user role and account status
- User registration API (success case)
- Duplicate email validation during signup
- Login failure on incorrect password
- Unauthorized access to protected routes
- Admin-level user status modification logic

### Running Tests
Navigate to the backend folder and run:

```bash
npm test
```

---

## License
This project is intended solely for educational and academic purposes and is not licensed for commercial use.

---

## Author
Rupas