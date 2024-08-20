const {createAppointment, viewAppointment, deleteAppointment, updateAppointment, getAllAppointments } = require('../Controllers/AppointmentController');

const router = require("express").Router();

router.post("/create", createAppointment);
router.get("/:AppointmentID", viewAppointment);
router.get("/", getAllAppointments);
router.delete("/delete/:AppointmentID", deleteAppointment);
router.put("/update/:AppointmentID", updateAppointment);


module.exports = router;