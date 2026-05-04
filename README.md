# MedConnect
MedConnect is a full-stack healthcare platform connecting patients, doctors, chamber assistants, and admins — solving Bangladesh's private-chamber discovery and booking problem.

---

## Features

- Search and book doctors by specialty, location, and fee
- Track appointments through their full lifecycle
- E-prescriptions linked to consultations
- Role-based dashboards for patients, doctors, assistants, and admins
- Payment confirmation via bKash or cash

---

## Technologies Used

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **Auth**: JWT + bcryptjs

---

## Project Structure

```
med_connect/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Route logic (auth, patient, doctor, assistant, admin)
│   ├── middleware/       # JWT auth & role guard
│   ├── models/          # Mongoose schemas (User, Doctor, Appointment, Payment, Prescription)
│   ├── routes/          # Express route definitions
│   ├── seedAdmin.js     # Admin account seeder
│   ├── seedDoctors.js   # Sample doctor data seeder
│   └── server.js        # App entry point
└── frontend/
    ├── admin/           # Admin pages, JS, and CSS
    ├── css/             # Shared styles
    ├── js/              # Feature scripts (dashboard, doctor, assistant, etc.)
    ├── pages/           # Patient, doctor & assistant HTML pages
    └── index.html       # Landing page
```

---

## Installation

### Backend
```bash
git clone https://github.com/Marjia275/MedConnect.git
cd MedConnect-Digital-healthcare-platform-/med_connect/backend
npm install
```
Create a `.env` file:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```
```bash
node seedAdmin.js   # seed admin account
npm run dev         # start server
```

### Frontend
Open `frontend/index.html` in your browser or use VS Code Live Server.

> To use localhost, set `API_BASE` in `frontend/js/config.js` to `http://localhost:5000/api`.

---

## Live Demo

- **Frontend:** [medconnect.vercel.app](https://medconnect.vercel.app)
- **Backend API:** [medconnect-e8ld.onrender.com](https://medconnect-e8ld.onrender.com)

---

## Team

| Name                 | Student ID  |
| -------------------- | ----------- |
| **Ali Hussain**      | 231-115-170 |
| **Marjia Chowdhury** | 231-115-183 |

**Courses:** CSE 300 & CSE 323  
**Institution:** Metropolitan University Sylhet, Bangladesh  
**Batch / Section:** 58 / E  
**Supervisor:** Abu Jafar Md. Jakaria

---

## License

Academic submission for Metropolitan University Sylhet. All rights reserved by the authors.