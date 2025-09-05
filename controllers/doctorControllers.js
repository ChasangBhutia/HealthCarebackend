const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

module.exports.addDoctor = async (req, res) => {
  try {
    const { role } = req.user;
    const {
      fullname,
      email,
      password,
      specialty,
      experience,
      phone,
      hospital,
    } = req.body;

    if (role !== "admin") {
      return res
        .status(403)
        .json({ success: false, error: "Only admins can add Doctors" });
    }

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
      role: "doctor",
    });

    const newDoctor = await doctorModel.create({
      user: newUser._id,
      specialty,
      experience,
      hospital,
      phone,
    });

    return res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      doctor: newDoctor,
    });
  } catch (err) {
    console.error(`Error adding doctor: ${err.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
};

module.exports.getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorModel.find().populate("user");

    return res
      .status(200)
      .json({ success: true, message: "Doctors found", doctors });
  } catch (err) {
    console.error(`Error getting doctors: ${err.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
};

module.exports.getDoctor = async (req, res) => {
  const { doctorId } = req.params;
  if (!doctorId) {
    return res
      .status(400)
      .json({ success: false, error: "doctorId is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid doctorId format" });
  }
  try {
    let doctor = await doctorModel.findById(doctorId).populate("user");
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, error: "Doctor not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Doctor found", doctor });
  } catch (err) {
    console.error(`Error fetchig doctor: ${err.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
};

module.exports.updateDoctor = async (req, res) => {
  const { doctorId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    return res.status(400).json({ success: false, error: "Invalid doctor ID" });
  }

  try {
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      doctorId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedDoctor) {
      return res
        .status(404)
        .json({ success: false, error: "Doctor not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      doctor: updatedDoctor,
    });
  } catch (err) {
    console.error(`Error updating doctor: ${err.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
};

module.exports.deleteDoctor = async (req, res) => {
  const { doctorId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    return res.status(400).json({ success: false, error: "Invalid doctor ID" });
  }
  try {
    const doctor = await doctorModel.findByIdAndDelete(doctorId);
    if (doctor.user) await userModel.findByIdAndDelete(doctor.user);

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, error: "Doctor not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Doctor deleted successfully" });
  } catch (err) {
    console.error(`Error deleting dcoctor: ${err.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
};
