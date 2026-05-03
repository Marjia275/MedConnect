# MedConnect 🏥

> A full-stack healthcare management and appointment booking platform built for Metropolitan University Sylhet, Bangladesh.

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render&logoColor=white)](https://render.com/)

---

## 📋 Table of Contents

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

MedConnect is a comprehensive healthcare platform that connects patients, doctors, and chamber assistants. Patients can find doctors, book appointments, and make payments. Doctors can manage their profile, patients, and prescriptions. Chamber assistants can manage appointment scheduling on behalf of doctors.

**Live Demo:** [medconnect.vercel.app](https://medconnect.vercel.app)  
**Backend API:** [medconnect-e8ld.onrender.com](https://medconnect-e8ld.onrender.com)

---

## ✨ Features

### 👤 Patient
- Register and login securely with JWT authentication
- Search and filter doctors by specialty, location, and availability
- Book appointments with preferred time slots
- Make payments via bKash or cash
- View appointment history and status updates
- Access personal dashboard with health overview

### 🩺 Doctor
- Manage professional profile (specialty, degree, BMDC, chamber info)
- Set weekly availability schedule
- View today's appointments and patient list
- Write and manage e-prescriptions
- Track earnings and appointment statistics
- Link and manage a chamber assistant

### 🧑‍💼 Chamber Assistant
- Log in with assistant credentials
- Accept or reject appointment requests
- Assign serial numbers to accepted appointments
- Confirm patient payments (bKash / cash)
- Mark appointments as completed or no-show

### 🔐 Admin
- Manage all users (patients, doctors, assistants)
- View platform-wide appointment and payment reports
- Approve or deactivate doctor accounts
- Monitor assistant activity

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Authentication | JWT (JSON Web Tokens) + bcryptjs |
| Icons | Font Awesome 6 |
| Fonts | Google Fonts (Nunito, Sora) |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
| Database Hosting | MongoDB Atlas |

---

## 📁 Project Structure

```
Med-Connect/
└── med_connect/
    ├── backend/
    │   ├── config/
    │   │   └── db.js                    # MongoDB connection
    │   ├── controllers/
    │   │   ├── authController.js        # Register & login
    │   │   ├── patientController.js
    │   │   ├── doctorcontroller.js
    │   │   ├── assistantController.js
    │   │   ├── doctorAssistantController.js
    │   │   ├── appointmentController.js
    │   │   ├── paymentController.js
    │   │   ├── prescriptionController.js
    │   │   ├── doctorSearchController.js
    │   │   └── adminController.js
    │   ├── middleware/
    │   │   └── authMiddleware.js        # JWT protect + requireRole
    │   ├── models/
    │   │   ├── User.js
    │   │   ├── Appointment.js
    │   │   ├── Payment.js
    │   │   └── Prescription.js
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
    │   ├── server.js
    │   └── package.json
    └── frontend/
        ├── admin/
        │   ├── pages/                   # Admin HTML pages
        │   └── js/                      # Admin JS files
        ├── css/
        │   └── assistant.css
        ├── js/
        │   ├── config.js                # API base URL + auth helpers
        │   ├── register.js
        │   ├── dashboard.js
        │   ├── doctor-dashboard.js
        │   ├── doctor-profile.js
        │   ├── assistant-dashboard.js
        │   ├── assistant-appointments.js
        │   └── Doctor-assistant.js
        └── pages/
            ├── register.html
            ├── dashboard.html
            ├── doctor-dashboard.html
            ├── doctor-profile.html
            ├── assistant-dashboard.html
            ├── assistant-appointments.html
            └── Doctor-assistant.html
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Marjia275/MedConnect.git
cd MedConnect/med_connect
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

**5. Start the backend server**
```bash
npm run dev
```
Server runs at `http://localhost:5000`

**6. Open the frontend**

Open `frontend/pages/register.html` with VS Code Live Server (port 5500), or simply open `index.html` in your browser.

> **Note:** When running locally, `config.js` automatically detects `localhost` and points to `http://localhost:5000/api`. On production it uses the Render backend URL.

---

## 🔑 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/medconnect` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `supersecretkey123` |
| `PORT` | Port for the Express server | `5000` |

---

## 📡 API Reference

### Authentication — `/api/auth`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new patient or doctor |
| POST | `/api/auth/login` | Login and receive JWT token |

### Doctor — `/api/doctor`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/doctor/dashboard/:userId` | — | Doctor dashboard stats |
| GET | `/api/doctor/profile/:userId` | — | Get doctor profile |
| PUT | `/api/doctor/profile/:userId` | — | Update doctor profile |
| PUT | `/api/doctor/change-password/:userId` | — | Change password |

### Doctor Search — `/api/doctors`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctors` | Search/filter all doctors |
| GET | `/api/doctors/:id` | Get single doctor by ID |

### Assistant — `/api/assistant`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/assistant/dashboard/:userId` | JWT + assistant | Assistant dashboard |
| GET | `/api/assistant/appointments/:userId` | JWT + assistant | List appointments |
| PATCH | `/api/assistant/appointments/:id` | JWT + assistant | Update appointment status |

### Doctor–Assistant — `/api/doctor-assistant`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/doctor-assistant/invite` | JWT + doctor | Link or create assistant |
| GET | `/api/doctor-assistant/my-assistant/:doctorId` | JWT + doctor | Get linked assistant |
| DELETE | `/api/doctor-assistant/remove/:assistantId` | JWT + doctor | Unlink assistant |

### Appointments — `/api/appointments`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/appointments` | Book new appointment |
| GET | `/api/appointments/:id` | Get appointment details |

### Payments — `/api/payments`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payments` | Confirm payment |

---

## 🌐 Deployment

### Backend (Render)
1. Push code to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Set root directory to `med_connect/backend`
4. Set build command: `npm install`
5. Set start command: `node server.js`
6. Add environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT`)

### Frontend (Vercel)
1. Import the GitHub repository on [Vercel](https://vercel.com)
2. Set root directory to `med_connect/frontend`
3. No build step required (static HTML/CSS/JS)
4. Deploy

---

## 👥 Team

| Name | Student ID | Role |
|------|-----------|------|
| **Ali Hussain** | 231-115-170 | Full Stack Developer |
| **Marjia Chowdhury** | 231-115-183 | Full Stack Developer |

**Course:** CSE 300 & CSE 323  
**Institution:** Metropolitan University Sylhet, Bangladesh  
**Supervisor:** Abu Jafar Md. Jakaria

---

## 📄 License

This project was developed as an academic project for Metropolitan University Sylhet. All rights reserved by the authors.
