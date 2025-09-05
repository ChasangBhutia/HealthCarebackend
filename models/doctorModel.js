const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    specialty: { type: String, required: true },
    experience: { type: Number, required: true },
    phone: { type: String },
    hospital: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("doctor", doctorSchema);
