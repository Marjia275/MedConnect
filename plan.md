# MedConnect — Implementation Plan

## 1. Project Overview

**Project Name:** MedConnect 
**Team:** Learning Squad  
**Team Members:** Marjia Chowdhury, Ali Hussain  
**Academic Context:** CSE 300 & CSE 323, Metropolitan University, Sylhet 

**Goal:** Build a web-based healthcare management and appointment booking platform that connects patients, doctors, assistants, and administrators in one organized system.

MedConnect is intended to reduce the problems of manual chamber-based healthcare management in Bangladesh, especially paper-based appointment handling, scattered patient records, and the lack of a centralized workflow between doctors and patients. The target system combines doctor discovery, appointment booking, approval, payment confirmation, digital prescription, and medical record access in one platform.

This implementation plan is based on three things:
- the original project proposal,
- the current repository state,
- and the project’s actual development history.

The proposal defines the final target, while the current repository shows a partially completed implementation that already includes core UI pages and parts of the backend.

---

## 2. Core Product Vision

MedConnect should become a practical healthcare chamber platform where:
- patients can find doctors, book appointments, pay, and access their records,
- doctors can manage schedules, patients, prescriptions, and earnings,
- assistants can handle appointment flow and scheduling support,
- admins can approve doctors, manage users, and monitor the system.

The final product is not just a booking site. It should work as a structured chamber management system with a clear workflow:
**Search Doctor → View Profile → Book Appointment → Approval → Payment Confirmation → Serial Number → Consultation → E-Prescription → Record History**.

---

## 3. Technology Stack

The proposal mentions React.js, Node.js, Express.js, MongoDB, GitHub, VS Code, and Vercel as the intended stack. In the current repository, the actual implementation is more specific and should be acknowledged honestly.

### Current practical stack

**Frontend**
- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome / static UI assets

**Backend**
- Node.js
- Express.js
- REST-style API routes
- dotenv
- cors

**Database**
- MongoDB
- Mongoose

**Authentication / Security**
- bcrypt-based password hashing in the model layer
- role-aware user logic for patient and doctor so far

**Version Control**
- Git + GitHub

### Planning note
Although the proposal mentions React, the current project has been built as a **multi-page HTML/CSS/JS application** with an **Express + MongoDB backend**. This should be treated as the established implementation base for the present version. For the current academic submission, the practical goal is to complete the healthcare workflow cleanly on this architecture. A future migration to **React** or **Next.js** can be considered later once the system is complete and stable.

---

## 4. Important Architecture Decision

Although the proposal mentions a React-based frontend, the actual project has been developed as a **multi-page vanilla HTML/CSS/JS application** connected to a **Node.js + Express + MongoDB backend**.

This was a practical team decision. Since the project is being developed as a university full-stack system with limited time and a fixed submission scope, the team chose to build the frontend with **HTML, CSS, and JavaScript** first so that the core workflow could be implemented clearly and completed in a manageable way.

### Decision
For the current version, MedConnect will continue as:
- **Frontend:** static multi-page vanilla web application
- **Backend:** Express REST API
- **Database:** MongoDB Atlas with Mongoose

### Why this is the right decision now
- the current frontend structure is already built around multiple HTML/CSS/JS pages,
- backend integration has already started using the existing structure,
- changing to React at this stage would require major refactoring,
- that refactoring would slow down completion of the core project requirements,
- the main academic goal is to deliver a working and demonstrable healthcare management platform that satisfies the proposal scope.

### Future Direction
This does not reject React or Next.js for the future. Once the current version is completed and the system is stable, the project can later be refactored or upgraded to a framework-based frontend if needed. For the present version, however, the best approach is to complete the system successfully using the architecture that has already been established.

So the focus should be on **stabilizing the current architecture**, improving code organization, and completing the remaining proposal features instead of introducing a late frontend migration.

---

## 5. Development Philosophy

MedConnect should be completed using these principles:

1. **Finish the main workflow before adding advanced features.**
2. **Build on the existing project base instead of introducing unnecessary rewrites.**
3. **Keep frontend and backend responsibilities clearly separated.**
4. **Convert static/demo pages into data-driven pages one by one.**
5. **Focus on must-have proposal features first.**
6. **Keep role-based permissions simple and strict.**
7. **Treat medical data carefully with proper validation and protection.**
8. **Prefer a clean final submission over too many incomplete advanced modules.**
9. **Leave framework upgrades such as React or Next.js for a later, more stable version.**

---

## 6. Current Project Status

MedConnect is already in an active development stage and a significant portion of the project has been built. The current system includes a working backend foundation using Node.js, Express.js, MongoDB Atlas, and Mongoose, along with a multi-page frontend built with HTML, CSS, and JavaScript. The project currently covers major parts of the Patient and Doctor workflows, while Assistant and Admin features are still planned for completion.

On the frontend side, multiple patient-facing pages have already been developed, including dashboard, doctor search, appointment, and payment-related pages. A separate doctor-facing section has also been built, including doctor dashboard, patient management, assistant management, appointment handling, and profile pages. On the backend side, authentication and database connectivity have already been introduced, and the general structure for role-based system expansion is in place.

However, the project is not yet fully aligned with the complete proposal scope. Some features are still partially implemented, some frontend modules still rely on temporary JavaScript-based data instead of full backend integration, and certain workflows such as Assistant control, Admin monitoring, complete appointment lifecycle handling, and final medical record integration still require further development. This plan therefore treats the current codebase as the working foundation and the proposal as the completion target.

---

## 7. Primary User Roles

The proposal defines four main roles, and the final system should support them clearly.

### 1. Patient
Can:
- register and log in,
- search and filter doctors,
- view doctor profiles,
- book appointments,
- complete payment confirmation,
- view appointment status,
- access prescription history and medical records,
- manage personal profile.

### 2. Doctor
Can:
- manage appointments,
- define availability,
- view patients,
- create e-prescriptions,
- review patient history,
- view consultation earnings.

### 3. Assistant
Can:
- support a doctor’s chamber workflow,
- approve or manage appointment requests,
- update scheduling and appointment statuses,
- handle serial and scheduling tasks.

### 4. Admin
Can:
- approve doctor registration,
- manage users,
- activate or deactivate accounts,
- monitor appointments and revenue,
- oversee overall system integrity.

---

## 8. MVP Scope

The proposal contains a large target scope, but the MVP for final submission should focus on the complete core healthcare workflow.

### Must-have MVP features
- user registration and login,
- patient and doctor role support,
- profile management,
- doctor search and filtering,
- doctor profile page,
- appointment booking,
- appointment status handling,
- payment confirmation or payment simulation,
- patient dashboard,
- doctor dashboard,
- e-prescription creation,
- medical record history,
- admin approval and user management.

### Should-have features
- doctor availability management,
- assistant workflow,
- earnings overview,
- responsive refinement,
- stronger validation and session handling.

### Optional after MVP
- medicine reminders,
- analytics dashboard,
- support/complaint system,
- password recovery,
- theme switching,
- advanced notifications.

---

## 9. Phase-wise Delivery Plan

The phase order below is based on the project proposal **and** the actual development progression visible in the git history.

### Phase 1 — Project Setup and Base Frontend
**What already happened:** initial upload, login/register start, dashboard file additions, homepage setup.  
**Goal:** establish the base structure and shared UI.  
**Key work:** landing page, register page, shared styling, dashboard skeletons, page routing through static links.  
**Expected result:** basic project shell for multiple roles.

### Phase 2 — Doctor Discovery and Role Pages
**What already happened:** doctor dashboard pages, doctor profile page, find doctors page, doctor my patients page.  
**Goal:** create the public/patient-side discovery flow and doctor-side working views.  
**Key work:** doctor profile, doctor listing/filtering UI, doctor dashboard UI, patients list UI.  
**Expected result:** strong interface foundation for patient–doctor interaction.

### Phase 3 — Appointment and Payment Flow
**What already happened:** appointment page files, payment page files.  
**Goal:** establish the booking journey.  
**Key work:** appointment request form, appointment details, payment page, serial/confirmation logic.  
**Expected result:** visible booking pipeline from profile to payment.

### Phase 4 — Backend Connection and Authentication
**What already happened:** backend and database connection, register/login backend, patient dashboard backend, patient profile backend, doctor dashboard backend. 
**Goal:** replace isolated frontend behavior with database-backed APIs.  
**Key work:** Express routes, MongoDB models, auth controller, patient controller, doctor controller, dashboard data loading.  
**Expected result:** working backend-backed login, patient dashboard, profile update, and doctor dashboard statistics.

### Phase 5 — Core Workflow Completion
**Goal:** complete the missing proposal features required for final submission.  
**Key tasks:**
- connect doctor search to database,
- persist appointment creation into MongoDB,
- implement appointment status updates,
- generate payment confirmation + serial number,
- create prescription model and prescription APIs,
- save prescriptions into patient records,
- build medical history view.

**Expected result:** complete end-to-end chamber workflow.

### Phase 6 — Assistant and Admin Modules
**Goal:** complete multi-role control as promised in the proposal.  
**Key tasks:**
- add assistant role to user model and permissions,
- build assistant dashboard and appointment management screens,
- add admin authentication,
- doctor approval flow,
- user activation/deactivation,
- platform monitoring views.

**Expected result:** all four proposal roles become meaningful.

### Phase 7 — Quality, Security, and Deployment
**Goal:** prepare the system for final demonstration and submission.  
**Key tasks:**
- improve validation,
- secure routes,
- remove hard-coded localhost assumptions,
- centralize API config,
- improve responsiveness,
- clean file structure,
- deploy frontend and backend,
- test major workflows.

**Expected result:** stable final project build.

---

## 10. Recommended Folder Structure

The current structure is functional but messy. For the future clean version of the project, the structure should be reorganized like this:

```txt
Med-Connect/
├── med_connect/
│   ├── frontend/
│   │   ├── index.html
│   │   ├── assets/
│   │   │   ├── css/
│   │   │   │   ├── common/
│   │   │   │   ├── patient/
│   │   │   │   ├── doctor/
│   │   │   │   ├── assistant/
│   │   │   │   └── admin/
│   │   │   ├── js/
│   │   │   │   ├── common/
│   │   │   │   ├── patient/
│   │   │   │   ├── doctor/
│   │   │   │   ├── assistant/
│   │   │   │   └── admin/
│   │   │   └── images/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── login.html
│   │   │   │   └── register.html
│   │   │   ├── patient/
│   │   │   │   ├── dashboard.html
│   │   │   │   ├── profile.html
│   │   │   │   ├── find-doctors.html
│   │   │   │   ├── appointment.html
│   │   │   │   ├── payment.html
│   │   │   │   └── medical-history.html
│   │   │   ├── doctor/
│   │   │   │   ├── dashboard.html
│   │   │   │   ├── profile.html
│   │   │   │   ├── my-patients.html
│   │   │   │   ├── availability.html
│   │   │   │   ├── prescriptions.html
│   │   │   │   └── earnings.html
│   │   │   ├── assistant/
│   │   │   │   ├── dashboard.html
│   │   │   │   └── appointments.html
│   │   │   └── admin/
│   │   │       ├── dashboard.html
│   │   │       ├── users.html
│   │   │       ├── doctors.html
│   │   │       └── reports.html
│   │   └── shared/
│   │       ├── components/
│   │       └── config/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── config/
│   │   │   │   └── db.js
│   │   │   ├── controllers/
│   │   │   │   ├── authController.js
│   │   │   │   ├── patientController.js
│   │   │   │   ├── doctorController.js
│   │   │   │   ├── assistantController.js
│   │   │   │   ├── adminController.js
│   │   │   │   ├── appointmentController.js
│   │   │   │   ├── prescriptionController.js
│   │   │   │   └── paymentController.js
│   │   │   ├── middleware/
│   │   │   │   ├── authMiddleware.js
│   │   │   │   ├── roleMiddleware.js
│   │   │   │   ├── errorMiddleware.js
│   │   │   │   └── validateMiddleware.js
│   │   │   ├── models/
│   │   │   │   ├── User.js
│   │   │   │   ├── Appointment.js
│   │   │   │   ├── Prescription.js
│   │   │   │   ├── MedicalRecord.js
│   │   │   │   ├── Payment.js
│   │   │   │   └── Availability.js
│   │   │   ├── routes/
│   │   │   │   ├── authRoutes.js
│   │   │   │   ├── patientRoutes.js
│   │   │   │   ├── doctorRoutes.js
│   │   │   │   ├── assistantRoutes.js
│   │   │   │   ├── adminRoutes.js
│   │   │   │   ├── appointmentRoutes.js
│   │   │   │   ├── prescriptionRoutes.js
│   │   │   │   └── paymentRoutes.js
│   │   │   ├── services/
│   │   │   ├── utils/
│   │   │   ├── app.js
│   │   │   └── server.js
│   │   ├── package.json
│   │   └── .env.example
│   └── README.md
└── docs/
    ├── plan.md
    └── api-notes.md
```

This structure keeps the current stack but makes the project easier to maintain and explain.

---

## 11. Core Data Models

### User
```js
{
  firstName,
  lastName,
  fullName,
  email,
  phone,
  passwordHash,
  role, // patient | doctor | assistant | admin
  gender,
  dateOfBirth,
  bloodGroup,
  address,
  city,
  country,
  emergencyContactName,
  emergencyContactPhone,
  doctorInfo: {
    specialty,
    degree,
    bmdc,
    experience,
    consultationFee,
    chamberName,
    chamberAddress,
    about
  },
  linkedDoctor, // for assistant role if needed
  isActive,
  createdAt,
  updatedAt
}
```

### Appointment
```js
{
  patient,
  doctor,
  assistant,
  patientName,
  doctorName,
  specialty,
  appointmentDate,
  appointmentTime,
  status, // pending | accepted | confirmed | completed | cancelled | no-show
  paymentStatus, // unpaid | paid | failed
  serialNumber,
  notes,
  createdAt,
  updatedAt
}
```

### Prescription
```js
{
  appointment,
  patient,
  doctor,
  diagnosis,
  medicines: [],
  tests: [],
  advice,
  followUpDate,
  createdAt,
  updatedAt
}
```

### MedicalRecord
```js
{
  patient,
  prescriptions: [],
  appointmentHistory: [],
  allergies,
  medicalConditions,
  updatedAt
}
```

### Payment
```js
{
  appointment,
  patient,
  doctor,
  amount,
  method,
  transactionId,
  status,
  paidAt
}
```

### Availability
```js
{
  doctor,
  day,
  startTime,
  endTime,
  slotDuration,
  isActive
}
```

---

## 12. Minimum API Plan

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`

### Patient APIs
- `GET /api/patient/dashboard/:userId`
- `GET /api/patient/profile/:userId`
- `PUT /api/patient/profile/:userId`
- `GET /api/patient/medical-history/:userId`

### Doctor APIs
- `GET /api/doctor/dashboard/:userId`
- `GET /api/doctor/profile/:userId`
- `PUT /api/doctor/profile/:userId`
- `GET /api/doctor/patients/:userId`
- `POST /api/doctor/prescriptions`
- `GET /api/doctor/appointments/:userId`

### Appointment APIs
- `POST /api/appointments`
- `GET /api/appointments/:id`
- `PATCH /api/appointments/:id/status`
- `PATCH /api/appointments/:id/confirm-payment`

### Search APIs
- `GET /api/doctors`
- `GET /api/doctors/:id`
- `GET /api/doctors/search`

### Assistant APIs
- `GET /api/assistant/dashboard/:userId`
- `GET /api/assistant/appointments/:userId`
- `PATCH /api/assistant/appointments/:id`

### Admin APIs
- `GET /api/admin/dashboard`
- `GET /api/admin/users`
- `PATCH /api/admin/users/:id/status`
- `GET /api/admin/doctors/pending`
- `PATCH /api/admin/doctors/:id/approve`
- `GET /api/admin/reports`

---

## 13. Key Pages to Build

### Public / Entry
1. Home page
2. Login & Register page

### Patient
4. Patient dashboard
5. Patient profile
6. Find doctors page
7. Doctor profile page
8. Appointment booking page
9. Payment / confirmation page
10. Medical history page

### Doctor
11. Doctor dashboard
12. Doctor profile/settings page
13. My patients page
14. Appointments management page
15. Prescription creation page
16. Availability management page
17. Earnings page

### Assistant
18. Assistant dashboard
19. Appointment handling page
20. Schedule support page

### Admin
21. Admin dashboard
22. Doctor approval page
23. User management page
24. Revenue / report page

---

## 14. Security Rules

MedConnect handles sensitive personal and medical data, so the following rules are mandatory:

- hash passwords using bcrypt,
- never expose raw passwords in responses,
- protect role-specific routes with authentication middleware,
- enforce role-based access control for patient, doctor, assistant, and admin,
- validate all incoming form and API data,
- sanitize text fields,
- restrict medical record access to authorized users only,
- avoid storing secrets in committed `.env` files,
- centralize API base URLs and environment configuration,
- use HTTPS in deployment,
- handle session or token expiration safely,
- return safe error messages without leaking internal system details.

---

## 15. Risks and Challenges

The project involves several practical challenges that need careful handling during the remaining development phases. One major challenge is maintaining secure and correct role-based access control across four different user roles: Patient, Doctor, Assistant, and Admin. Since each role has different permissions, route protection and dashboard control must be implemented carefully.

Another challenge is completing the appointment workflow in a consistent way across frontend and backend, especially where approval, payment confirmation, serial generation, and status updates must work together. Database relationship design is also important, because users, doctors, assistants, appointments, prescriptions, and payments depend on one another. In addition, handling sensitive healthcare-related data requires proper validation, secure authentication, and controlled access. Deployment configuration and final integration testing are also key challenges, especially when ensuring that the full system works reliably in a submission-ready environment.

---

## 16. Scope Boundary / Out of Scope

To keep the project realistic and aligned with the academic timeline, MedConnect should remain focused on its core healthcare management and appointment workflow. The current version is intended to deliver a functional web platform for doctor discovery, appointment handling, prescription management, medical record access, and administrative control.

The project will not attempt to implement features that fall outside the original intended academic scope. These include online video consultation, AI-based diagnosis, native Android or iOS applications, direct third-party laboratory integration, and real-time chat. Although some advanced ideas such as analytics, notifications, reminders, and enhanced filtering may be considered later, they should not take priority over completing the core platform successfully.

---

## 17. Testing and Deployment Plan

Before final submission, MedConnect should go through a structured testing and deployment phase to ensure that all major workflows operate correctly. Testing should cover registration and login, role-based dashboard access, doctor search, appointment booking, appointment approval flow, payment confirmation flow, prescription creation, and medical record retrieval. Input validation, error handling, and responsive behavior across desktop and mobile views should also be checked carefully.

On the backend side, API routes should be tested to confirm correct request handling, secure access, and proper database updates. On the frontend side, pages should be reviewed to ensure that user flows remain clear and connected, especially in areas where temporary local data must be replaced with actual backend responses. Deployment should be prepared with proper environment variable setup, stable MongoDB Atlas connection, and final verification of frontend-backend communication. The final deployed version should be functional enough to demonstrate the complete core system in an academic presentation environment.

---

## 18. Summary

MedConnect has already made meaningful progress. The repository and commit history show that the project evolved in a practical order: initial setup, registration, dashboards, doctor-related interfaces, search, appointments, payment, backend/database connection, and dashboard/profile backend work. This is a strong base.

The next step is not a major architectural change. The next step is **completion**.

The final implementation should focus on turning the current partial UI and backend into a fully connected healthcare workflow that satisfies the original proposal:
- full appointment lifecycle,
- assistant support,
- admin control,
- prescription generation,
- medical record storage,
- secure role-based access,
- and stable deployment.

If development continues with the current architecture, a clean folder structure, and the git-history-based phase order above, MedConnect can become a realistic, polished, and presentation-ready academic project. After that, future improvements such as a React or Next.js migration can be considered from a stronger base.
