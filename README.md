# 🏥 Healthcare Management Backend

A **Node.js + Express + MongoDB** backend for managing users, patients, doctors, and patient-doctor mappings.  
This project demonstrates authentication, role-based access control (Admin/Doctor/Patient), CRUD operations, and relationships between entities.

---

## 🚀 Features

- **User Authentication** (JWT, bcrypt password hashing)
- **Role-based access** (`admin`, `patient`, `doctor`)
- **Patient Management** (create, update, delete, fetch)
- **Doctor Management** (create, update, delete, fetch)
- **Patient–Doctor Mappings** (assign/remove doctor for a patient, fetch mappings)
- **Error Handling & Validation** with proper status codes
- **MongoDB with Mongoose** for schema and relationships

---

## 📂 Project Structure

```bash
├── models/
│ ├── userModel.js
│ ├── patientModel.js
│ ├── doctorModel.js
│ └── mappingModel.js
├── routes/
│ ├── userRoutes.js
│ ├── patientRoutes.js
│ ├── doctorRoutes.js
│ └── mappingRoutes.js
├── controllers/
│ ├── userControllers.js
│ ├── patientControllers.js
│ ├── doctorControllers.js
│ └── mappingControllers.js
├── middleware/
│ ├── authMiddleware.js
│ └── errorHandler.js
├── config/
│ └── db.js
├── .gitignore
├── package.json
└── index.js

```

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT, bcrypt
- **Other**: dotenv for environment variables

---

## 🔑 User Roles

- **Admin** → can create/manage patients and doctors
- **Doctor** → can view assigned patients
- **Patient** → can view assigned doctors

---

## 📌 API Endpoints

### 👤 User Authentication

- `POST /api/auth/register` → Register user
- `POST /api/auth/login` → Login user
- `POST /api/auth/logout` → logout user
- `GET /api/auth/users` → fetch all users

---

### 🧑‍⚕️ Doctor APIs

- `POST /api/doctors/` → Create doctor (**Admin only**)
- `GET /api/doctors/` → Get all doctors
- `PUT /api/doctors/:id` → Update doctor
- `DELETE /api/doctors/:id` → Delete doctor (removes from both `User` & `Patient`) (**Admin only**)

---

### 🏥 Patient APIs

- `POST /api/patients/` → Create patient (**Admin only**)
- `GET /api/patients/` → Get all patients
- `PUT /api/patients/:id` → Update patient
- `DELETE /api/patients/:id` → Delete patient (removes from both `User` & `Patient`) (**Admin only**)

---

### 🔗 Patient–Doctor Mappings

- `POST /api/mappings/` → Assign a doctor to a patient
- `GET /api/mappings/` → Get all mappings
- `GET /api/mappings/:patient_id` → Get doctors assigned to a patient
- `DELETE /api/mappings/:id` → Remove doctor from patient

---

## ⚙️ Setup Instructions

1. Clone the repo

   ```bash
   git clone https://github.com/ChasangBhutia/HealthCarebackend.git
   cd HealthCareBackend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a .env file

   ```bash
    PORT = 3000
   MONGODB_URI = "your mongoDB URI"
   JWT_SECRET_KEY = "your jwt secret key"
   ```

4. Run the server
   ```bash
   node index.js
   ```

✨ Example Mapping Response

```bash
    {
    "success": true,
    "message": "Mappings found",
    "mappings": [
        {
            "_id": "68bb42d2b94f6ccf96cfacbd",
            "patient": {
                "_id": "68bb29683999282a52a5da62",
                "user": {
                    "_id": "68bb29683999282a52a5da60",
                    "fullname": "Finzo Bhutia",
                    "email": "finzo@gmail.com",
                    "password": "$2b$10$zg1.M/DrefY/5eCTUkhqz.vdYS8Sz7hW6e5TV75wN1lWwjz6oVm36",
                    "role": "patient",
                    "createdAt": "2025-09-05T18:18:16.856Z",
                    "updatedAt": "2025-09-05T18:18:16.856Z",
                    "__v": 0
                },
                "gender": "male",
                "age": 20,
                "condition": "Fever",
                "address": "jalandhar, Punjab",
                "phone": "9339197277",
                "createdAt": "2025-09-05T18:18:16.894Z",
                "updatedAt": "2025-09-05T19:46:28.380Z",
                "__v": 0
            },
            "doctor": {
                "_id": "68bb42b6b94f6ccf96cfacb4",
                "user": {
                    "_id": "68bb42b6b94f6ccf96cfacb2",
                    "fullname": "Dr. Chasang Bhutia",
                    "email": "chasangdr@dr.com",
                    "password": "$2b$10$1tddqImC6vZ6L/9WR5VNJOKrHb8PI8SUnRSSA4PQtiorKAtZeB4D6",
                    "role": "doctor",
                    "createdAt": "2025-09-05T20:06:14.789Z",
                    "updatedAt": "2025-09-05T20:06:14.789Z",
                    "__v": 0
                },
                "specialty": "neurosuergion",
                "experience": 4,
                "phone": "9339197277",
                "hospital": "UNI hospital",
                "createdAt": "2025-09-05T20:06:14.844Z",
                "updatedAt": "2025-09-05T20:06:14.844Z",
                "__v": 0
            },
            "createdAt": "2025-09-05T20:06:42.988Z",
            "updatedAt": "2025-09-05T20:06:42.988Z",
            "__v": 0
        }
    ]
}
```
