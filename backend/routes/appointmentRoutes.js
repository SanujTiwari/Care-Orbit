const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  bookAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} = require("../controllers/appointmentController");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("patient"), bookAppointment);

router.get("/", authMiddleware, getAppointments);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("doctor"),
  updateAppointmentStatus
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("doctor"),
  deleteAppointment
);

module.exports = router;
