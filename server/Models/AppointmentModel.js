const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  AppointmentID: {
    type: String,
    required: [true, "Appointment ID is required"],
    unique: true,
  },
  AppointmentDate: {
    type: String,
    required: [true, "Appointment name is required"],
  },
  AppointmentGuardian: {
    type: String,
    required: [false],
  },
  AppointmentChildren: {
    type: String,
    required: [true, "Appointment Type is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);