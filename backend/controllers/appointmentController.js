const Appointment = require("../models/Appointment");

const bookAppointment = async (req, res) => {
  const appointment = await Appointment.create({
    ...req.body,
    patientId: req.user.id,
  });

  res.json({ message: "Appointment Booked", appointment });
};

const getAppointments = async (req, res) => {
  let appointments;

  if (req.user.role === "patient") {
    appointments = await Appointment.find({ patientId: req.user.id });
  } else {
    appointments = await Appointment.find();
  }

  res.json(appointments);
};

const updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;

  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json({ message: "Status Updated", appointment });
};

const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  bookAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
};
