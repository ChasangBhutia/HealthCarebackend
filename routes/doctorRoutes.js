const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../middleware/authMiddleware");
const {
  addDoctor,
  getAllDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorControllers");

// POST /api/doctors/ - Add a new doctor (Authenticated users only).
router.post("/", isLoggedIn, isAdmin, addDoctor);

// GET /api/doctors/ - Retrieve all doctors.
router.get("/", isLoggedIn, isAdmin, getAllDoctors);

// GET /api/doctors/<id>/ - Get details of a specific doctor.
router.get("/:doctorId", isLoggedIn, getDoctor);

// PUT /api/doctors/<id>/ - Update doctor details.
router.put("/:doctorId", isLoggedIn, isAdmin, updateDoctor);

// DELETE /api/doctors/<id>/ - Delete a doctor record.
router.delete("/:doctorId", isLoggedIn, isAdmin, deleteDoctor);

module.exports = router;
