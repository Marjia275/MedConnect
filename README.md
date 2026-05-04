# MedConnect 🏥

> A full-stack healthcare management and appointment booking platform built to solve Bangladesh's private-chamber problem — doctors run chambers but have no digital presence, making it hard for patients to find, book, and pay them.

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render&logoColor=white)](https://render.com/)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Team](#team)

---

## Overview

MedConnect is a four-role healthcare platform connecting **patients**, **doctors**, **chamber assistants**, and **administrators** in one structured workflow.

The core journey is:

**Search Doctor → View Profile → Book Appointment → Assistant Review → Payment Confirmation → Serial Number → Consultation → E-Prescription → Medical Records**

**Live Demo:** [medconnect.vercel.app](https://medconnect.vercel.app)  
**Backend API:** [medconnect-e8ld.onrender.com](https://medconnect-e8ld.onrender.com)

> **Note on deployment:** The backend is hosted on Render's free tier, which spins down after inactivity. The first request after a cold start may take 30–60 seconds.

---

## Features

### Patient

- Register and log in with JWT authentication
- Search and filter doctors by specialty, location, and fee
- View doctor profiles including chamber address and availability
- Book appointments with preferred time slots
- Track appointment status through the full lifecycle
- Access prescription history and medical records

### Doctor

- Manage professional profile (specialty, degree, BMDC number, chamber details)
- View today's appointment schedule and pending requests
- Write e-prescriptions linked to appointments
- View all-time patient list and prescription history
- Link and manage a chamber assistant account
- Track consultation earnings

### Chamber Assistant

- Log in with assistant credentials (created by Admin or linked by Doctor)
- Accept or reject incoming appointment requests
- Assign serial numbers to confirmed appointments
- Confirm patient payments (bKash or cash)
- Mark appointments as completed or no-show

### Admin

- Separate admin login (seeded separately via `seedAdmin.js`)
- Approve or deactivate doctor accounts
- Manage all users across all roles
- Create assistant accounts
- View platform-wide appointment and payment reports

---

## Tech Stack

| Layer            | Technology                    |
| ---------------- | ----------------------------- |
| Frontend         | Vanilla HTML, CSS, JavaScript |
| Backend          | Node.js, Express.js 5         |
| Database         | MongoDB with Mongoose ODM     |
| Authentication   | JWT (jsonwebtoken) + bcryptjs |
| Icons            | Font Awesome 6                |
| Fonts            | Google Fonts (Nunito, Sora)   |
| Frontend Hosting | Vercel                        |
| Backend Hosting  | Render                        |
| Database Hosting | MongoDB Atlas                 |

---

## Project Structure

```
Med-Connect/
└── med_connect/
    ├── backend/
    │   ├── config/
    │   │   └── db.js                         # MongoDB Atlas connection
    │   ├── controllers/
    │   │   ├── authController.js             # Register & login (all roles)
    │   │   ├── patientController.js          # Patient dashboard & profile
    │   │   ├── doctorcontroller.js           # Doctor dashboard, profile, search
    │   │   ├── doctorSearchController.js     # Public doctor search & filter
    │   │   ├── assistantController.js        # Assistant dashboard & appointments
    │   │   ├── doctorAssistantController.js  # Doctor–assistant linking
    │   │   ├── appointmentController.js      # Full appointment lifecycle
    │   │   ├── paymentController.js          # Payment confirmation
    │   │   ├── prescriptionController.js     # E-prescription CRUD
    │   │   └── adminController.js            # Admin ops, approvals, reports
    │   ├── middleware/
    │   │   └── authMiddleware.js             # JWT protect + requireRole guard
    │   ├── models/
    │   │   ├── User.js                       # All roles (patient, doctor, assistant, admin)
    │   │   ├── Doctor.js                     # Doctor profile & chamber info
    │   │   ├── Appointment.js                # Appointment lifecycle
    │   │   ├── Payment.js                    # Payment records
    │   │   └── Prescription.js              # E-prescriptions
    │   ├── routes/
    │   │   ├── authRoutes.js
    │   │   ├── patientRoutes.js
    │   │   ├── doctorRoutes.js
    │   │   ├── doctorSearchRoutes.js
    │   │   ├── assistantRoutes.js
    │   │   ├── doctorAssistantRoutes.js
    │   │   ├── appointmentRoutes.js
    │   │   ├── paymentRoutes.js
    │   │   ├── prescriptionRoutes.js
    │   │   └── adminRoutes.js
    │   ├── seedAdmin.js                      # Seeds the admin account
    │   ├── seedDoctors.js                    # Seeds sample doctor data
    │   ├── server.js                         # Express app entry point
    │   └── package.json
    └── frontend/
        ├── admin/
        │   ├── pages/                        # Admin HTML pages
        │   ├── js/                           # Admin JS modules
        │   └── css/
        ├── css/                              # Shared & role CSS files
        ├── js/
        │   ├── config.js                     # API base URL + auth helpers (getUser, authHeaders, requireRole)
        │   ├── register.js
        │   ├── dashboard.js                  # Patient dashboard
        │   ├── doctor-dashboard.js
        │   ├── doctor-profile.js
        │   ├── doctor-assistant.js           # Doctor's assistant management UI
        │   ├── assistant-dashboard.js
        │   ├── assistant-appointments.js
        │   └── ...
        ├── pages/                            # Patient, doctor & assistant HTML pages
        └── index.html                        # Landing page
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- A MongoDB Atlas account (or local MongoDB)
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Marjia275/MedConnect.git
cd MedConnect-Digital-healthcare-platform-/med_connect
```

**2. Install backend dependencies**

```bash
cd backend
npm install
```

**3. Set up environment variables**

Create a `.env` file inside `backend/`:

```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

**4. Seed the admin account**

```bash
node seedAdmin.js
```

Optionally seed sample doctor data:

```bash
node seedDoctors.js
```

**5. Start the backend server**

```bash
npm run dev        # development (nodemon)
npm start          # production
```

Server runs at `http://localhost:5000`. The backend also serves the frontend as static files from `../frontend`.

**6. Open the frontend**

Open `frontend/index.html` directly in your browser, or use VS Code Live Server on port 5500.

> **API base URL:** `config.js` points to the Render production URL by default. To run against localhost, change `API_BASE` in `frontend/js/config.js` to `http://localhost:5000/api`.

---

## Environment Variables

| Variable     | Description                       | Example                                                  |
| ------------ | --------------------------------- | -------------------------------------------------------- |
| `MONGO_URI`  | MongoDB Atlas connection string   | `mongodb+srv://user:pass@cluster.mongodb.net/medconnect` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `some_long_random_secret`                                |
| `PORT`       | Port for the Express server       | `5000`                                                   |

---

## API Reference

All protected routes require a `Bearer <token>` header. Tokens are issued at login.

### Authentication — `/api/auth`

| Method | Endpoint             | Auth | Description                    |
| ------ | -------------------- | ---- | ------------------------------ |
| POST   | `/api/auth/register` | —    | Register new patient or doctor |
| POST   | `/api/auth/login`    | —    | Login, returns JWT token       |

### Admin — `/api/admin`

| Method | Endpoint                         | Auth        | Description                 |
| ------ | -------------------------------- | ----------- | --------------------------- |
| POST   | `/api/admin/login`               | —           | Admin-specific login        |
| GET    | `/api/admin/dashboard`           | JWT + admin | Platform stats              |
| GET    | `/api/admin/users`               | JWT + admin | List all users              |
| PATCH  | `/api/admin/users/:id/status`    | JWT + admin | Activate or deactivate user |
| GET    | `/api/admin/doctors/pending`     | JWT + admin | Pending doctor approvals    |
| PATCH  | `/api/admin/doctors/:id/approve` | JWT + admin | Approve a doctor            |
| GET    | `/api/admin/reports`             | JWT + admin | Platform reports            |
| POST   | `/api/admin/assistants`          | JWT + admin | Create assistant account    |

### Patient — `/api/patient`

| Method | Endpoint                         | Auth | Description             |
| ------ | -------------------------------- | ---- | ----------------------- |
| GET    | `/api/patient/dashboard/:userId` | —    | Patient dashboard stats |
| GET    | `/api/patient/profile/:userId`   | —    | Get patient profile     |
| PUT    | `/api/patient/profile/:userId`   | —    | Update patient profile  |

### Doctor — `/api/doctor`

| Method | Endpoint                              | Auth | Description            |
| ------ | ------------------------------------- | ---- | ---------------------- |
| GET    | `/api/doctor/dashboard/:userId`       | —    | Doctor dashboard stats |
| GET    | `/api/doctor/profile/:userId`         | —    | Get doctor profile     |
| PUT    | `/api/doctor/profile/:userId`         | —    | Update doctor profile  |
| PUT    | `/api/doctor/change-password/:userId` | —    | Change password        |
| GET    | `/api/doctor/:id`                     | —    | Get doctor by ID       |

### Doctor Search — `/api/doctors`

| Method | Endpoint           | Auth | Description                   |
| ------ | ------------------ | ---- | ----------------------------- |
| GET    | `/api/doctors`     | —    | Search and filter all doctors |
| GET    | `/api/doctors/:id` | —    | Get single doctor by ID       |

### Doctor–Assistant — `/api/doctor-assistant`

| Method | Endpoint                                       | Auth         | Description              |
| ------ | ---------------------------------------------- | ------------ | ------------------------ |
| POST   | `/api/doctor-assistant/invite`                 | JWT + doctor | Link or create assistant |
| GET    | `/api/doctor-assistant/my-assistant/:doctorId` | JWT + doctor | Get linked assistant     |
| DELETE | `/api/doctor-assistant/remove/:assistantId`    | JWT + doctor | Unlink assistant         |

### Assistant — `/api/assistant`

| Method | Endpoint                              | Auth            | Description               |
| ------ | ------------------------------------- | --------------- | ------------------------- |
| GET    | `/api/assistant/dashboard/:userId`    | JWT + assistant | Assistant dashboard       |
| GET    | `/api/assistant/appointments/:userId` | JWT + assistant | List managed appointments |
| PATCH  | `/api/assistant/appointments/:id`     | JWT + assistant | Update appointment status |

### Appointments — `/api/appointments`

| Method | Endpoint                                | Auth | Description                          |
| ------ | --------------------------------------- | ---- | ------------------------------------ |
| GET    | `/api/appointments`                     | JWT  | List appointments (filtered by role) |
| POST   | `/api/appointments`                     | JWT  | Book a new appointment               |
| GET    | `/api/appointments/:id`                 | JWT  | Get appointment details              |
| PATCH  | `/api/appointments/:id/status`          | JWT  | Update appointment status            |
| PATCH  | `/api/appointments/:id/confirm-payment` | JWT  | Confirm payment for appointment      |

### Payments — `/api/payments`

| Method | Endpoint                       | Auth | Description                    |
| ------ | ------------------------------ | ---- | ------------------------------ |
| POST   | `/api/payments`                | JWT  | Record a new payment           |
| GET    | `/api/payments/:appointmentId` | JWT  | Get payment for an appointment |

### Prescriptions — `/api/prescriptions`

| Method | Endpoint                                | Auth         | Description                 |
| ------ | --------------------------------------- | ------------ | --------------------------- |
| POST   | `/api/prescriptions`                    | JWT + doctor | Create prescription         |
| PUT    | `/api/prescriptions/:id`                | JWT + doctor | Update prescription         |
| GET    | `/api/prescriptions/patient/:patientId` | JWT          | Get patient's prescriptions |
| GET    | `/api/prescriptions/doctor/:doctorId`   | JWT          | Get doctor's prescriptions  |

---

## Deployment

### Backend (Render)

1. Push code to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Set root directory to `med_connect/backend`
4. Set build command: `npm install`
5. Set start command: `node server.js`
6. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `PORT`

The backend also serves the frontend as static files, so a single Render deployment covers both if preferred.

### Frontend (Vercel)

1. Import the GitHub repository on [Vercel](https://vercel.com)
2. Set root directory to `med_connect/frontend`
3. No build step required (static HTML/CSS/JS)
4. Deploy — Vercel auto-detects static output

---

## Team

| Name                 | Student ID  | Role    |
| -------------------- | ----------- | ------- |
| **Ali Hussain**      | 231-115-170 | Student |
| **Marjia Chowdhury** | 231-115-183 | Student |

**Courses:** CSE 300 & CSE 323  
**Institution:** Metropolitan University Sylhet, Bangladesh  
**Batch / Section:** 58 / E  
**Supervisor:** Abu Jafar Md. Jakaria

---

## License

This project was developed as an academic submission for Metropolitan University Sylhet. All rights reserved by the authors.
