const patientModel = require("../models/patientModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

module.exports.addPatient = async (req, res) => {
  try {
    const { role } = req.user;
    const {
      fullname,
      email,
      password,
      age,
      gender,
      condition,
      address,
      phone,
    } = req.body;

    if (role !== "admin") {
      return res
        .status(403)
        .json({ success: false, error: "Only admins can add patients" });
    }

    // 2. Create a user account for the patient
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists with this email" });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      fullname,
      email,
      password: hash,
      role: "patient",
    });

    // 3. Create patient profile
    const newPatient = await patientModel.create({
      user: newUser._id,
      age,
      gender,
      condition,
      address,
      phone,
    });

    return res.status(201).json({
      success: true,
      message: "Patient created successfully",
      patient: newPatient,
    });
  } catch (err) {
    console.error(`Error adding patient: ${err.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
};

module.exports.getAllPatients = async (req, res) => {
  try {
    let patients = await patientModel.find().populate("user");

    return res
      .status(200)
      .json({ success: true, message: "Patients found", patients });
  } catch (err) {
    console.error(`Error getting patients: ${err.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
};

module.exports.getPatient = async (req, res) => {
  const { patientId } = req.params;
  if (!patientId) {
    return res
      .status(400)
      .json({ success: false, error: "patientId is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid patientId format" });
  }
  try {
    let patient = await patientModel.findById(patientId).populate("user");
    if (!patient) {
      return res
        .status(404)
        .json({ success: false, error: "Patient not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Patient found", patient });
  } catch (err) {
    console.error(`Error fetchig patient: ${err.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
};

module.exports.updatePatient = async (req, res) => {
  const { patientId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid patient ID" });
  }

  try {
    const updatedPatient = await patientModel.findByIdAndUpdate(
      patientId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPatient) {
      return res
        .status(404)
        .json({ success: false, error: "Patient not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      patient: updatedPatient,
    });
  } catch (err) {
    console.error(`Error updating patient: ${err.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
};

module.exports.deletePatient = async (req, res) => {
  const { patientId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid patient ID" });
  }
  try {
    const patient = await patientModel.findByIdAndDelete(patientId);
    if (patient.user) await userModel.findByIdAndDelete(patient.user);

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, error: "Patient not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Patient deleted successfully" });
  } catch (err) {
    console.error(`Error deleting patient: ${err.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
};
