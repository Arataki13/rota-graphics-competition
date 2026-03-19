<<<<<<< HEAD
# rota-graphics-competition
Graphic Design Competition Registration Platform
=======
# Graphic Design Competition Registration System

A complete full-stack web application for handling student registrations, OTP email verification, secure file uploads, and a public showcase for approved designs.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, React Router, Axios, Lucide React
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, bcryptjs, Nodemailer, Multer + Cloudinary

## Setup Instructions

### 1. Backend Setup
1. Navigate to the `server` directory: `cd server`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your MongoDB, Nodemailer (Gmail), and Cloudinary credentials.
4. Start the development server: `npm run dev` (Runs on port 5000)

### 2. Frontend Setup
1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` (Sets VITE_API_URL to localhost:5000)
4. Start the development server: `npm run dev` (Runs on port 5173)

### 3. Creating an Admin User
By default, all registered users are `student`. To create an admin:
1. Register a new user via the UI.
2. Open your MongoDB database (e.g., via MongoDB Compass).
3. Find the user in the `users` collection and change their `"role"` from `"student"` to `"admin"`.
4. Log in again. You will now be redirected to the Admin Dashboard.

---

## API Documentation

### Auth Routes (`/api/auth`)
- `POST /register`: Register a new user and trigger OTP email. Needs `username`, `email`, `password`.
- `POST /verify-otp`: Verify the 6-digit OTP. Needs `email`, `otp`.
- `POST /login`: Log in to receive a JWT. Needs `email`, `password`.

### Submission Routes (`/api/submissions`)
- `POST /`: (Protected) Upload a design. Uses `multipart/form-data`. Needs `fullName`, `university`, `faculty`, `phone`, `email`, and `design` (file).
- `GET /me`: (Protected) Get the logged-in user's submission.

### Admin Routes (`/api/admin`)
- `GET /submissions`: (Protected, Admin Only) Get all submissions.
- `PUT /submissions/:id/status`: (Protected, Admin Only) Update status (`approved`, `rejected`, `pending`).
- `DELETE /submissions/:id`: (Protected, Admin Only) Delete a submission.

### Public Routes (`/api/public`)
- `GET /showcase`: Get all `approved` submissions to show on the public Home page.

## Deployment Guidelines
- **Frontend (Vercel/Netlify)**: Push the `client` folder. Set build command to `npm run build`, publish dir to `dist`, and add the `VITE_API_URL` environment variable pointing to your deployed backend.
- **Backend (Render/Railway)**: Push the `server` folder. Set start command to `node server.js`, and add all `.env` variables in the hosting provider's dashboard.
- **Database**: Use MongoDB Atlas for a free managed cloud database.
>>>>>>> abbaa83 (Initial commit)
