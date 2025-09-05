const express = require("express");
const { isLoggedIn, isAdmin } = require("../middleware/authMiddleware");
const {
  assignDoctorToPatient,
  getMappings,
  getAllDoctorsToPatients,
  deleteMapping,
} = require("../controllers/mappingControllers");
const router = express.Router();

// POST /api/mappings/ - Assign a doctor to a patient.
router.post("/", isLoggedIn, isAdmin, assignDoctorToPatient);

// GET /api/mappings/ - Retrieve all patient-doctor mappings.
router.get("/", isLoggedIn, getMappings);

// GET /api/mappings/<patient_id>/ - Get all doctors assigned to a specific patient.
router.get("/:patientId", isLoggedIn, getAllDoctorsToPatients);

// DELETE /api/mappings/<id>/ - Remove a doctor from a patient.
router.delete("/:id", isLoggedIn, deleteMapping);

module.exports = router;
