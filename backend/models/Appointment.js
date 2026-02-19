const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    department: { type: String, required: true },

    doctorName: { type: String, required: true },

    patientName: { type: String, required: true },

    date: { type: String, required: true },

    timeSlot: { type: String, required: true },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
