const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../middleware/authMiddleware");
const {
  addPatient,
  getAllPatients,
  getPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patientControllers");

// POST /api/patients/ - Add a new patient (Authenticated users only).
router.post("/", isLoggedIn, isAdmin, addPatient);

//GET /api/patients/ - Retrieve all patients created by the authenticated user.
router.get("/", isLoggedIn, getAllPatients);

// GET /api/patients/<id>/ - Get details of a specific patient.
router.get("/:patientId", isLoggedIn, getPatient);

//PUT /api/patients/<id>/ - Update patient details.
router.put("/:patientId", isLoggedIn, updatePatient);

// DELETE /api/patients/<id>/ - Delete a patient record
router.delete("/:patientId", isLoggedIn, isAdmin, deletePatient);

module.exports = router;
