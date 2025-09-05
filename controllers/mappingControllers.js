const mapingModel = require("../models/mappingModel");
const patientModel = require("../models/patientModel");
const doctorModel = require("../models/doctorModel");
const mappingModel = require("../models/mappingModel");
const mongoose = require("mongoose");

module.exports.assignDoctorToPatient = async (req, res) => {
  const { patientId, doctorId } = req.body;

  if (!patientId || !doctorId) {
    return res
      .status(400)
      .json({ success: false, error: "patientId and doctorId are required" });
  }

  try {
    const patient = await patientModel.findById(patientId);
    if (!patient) {
      return res
        .status(404)
        .json({ success: false, error: "Patient not found" });
    }

    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, error: "Doctor not found" });
    }

    const existingMapping = await mapingModel.findOne({
      patient: patientId,
      doctor: doctorId,
    });
    if (existingMapping) {
      return res.status(409).json({
        success: false,
        error: "Doctor already assigned to this patient",
      });
    }

    const mapping = await mappingModel.create({
      patient: patientId,
      doctor: doctorId,
    });

    return res.status(201).json({
      success: true,
      message: "Doctor assigned to patient successfully",
      mapping,
    });
  } catch (err) {
    console.error(`Error assigning doctor: ${err.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
};

module.exports.getMappings = async (req, res) => {
  try {
    const mappings = await mappingModel
      .find()
      .populate("patient")
      .populate("doctor");

    return res
      .status(200)
      .json({ success: true, message: "Mappings found", mappings });
  } catch (err) {
    console.error(`Error fetching mappings: ${err.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
};

module.exports.getAllDoctorsToPatients = async (req, res) => {
  const { patientId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid patient ID" });
  }
  try {
    const doctorsToPatient = await mappingModel
      .find({ patient: patientId })
      .populate({
        path: "patient",
        populate: { path: "user" },
      })
      .populate({
        path: "doctor",
        populate: { path: "user" },
      });
    return res.status(200).json({
      success: true,
      message: "Doctors for patient found",
      doctorsToPatient,
    });
  } catch (err) {
    console.error(`Error fetching doctors: ${err.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
};

module.exports.deleteMapping = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid Mapping ID" });
  }
  try {
    const mapping = await mappingModel.findByIdAndDelete(id);
    if (!mapping) {
      return res
        .status(404)
        .json({ success: false, error: "Mapping not found" });
    }
    return res.status(200).json({ success: true, message: "Mapping Deleted" });
  } catch (err) {
    console.error(`Error deleting mapping: ${err.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Somwthing went wrng" });
  }
};
