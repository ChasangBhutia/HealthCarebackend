const mongoose = require("mongoose");

const mappingSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("mapping", mappingSchema);
