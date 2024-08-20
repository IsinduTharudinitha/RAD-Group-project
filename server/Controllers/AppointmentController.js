const Appointment = require("../Models/AppointmentModel");

module.exports.createAppointment = async (req, res, next) => {
  try {
    const {AppointmentID, AppointmentDate, AppointmentGuardian, AppointmentChildren,createdAt } = req.body;
    const appointment = await Appointment.findOne({ AppointmentID });
    if (appointment) {
      return res.status(400).json({ message: "Appointment already exists" });
    }
    const CreatedAppointment = await Appointment.create({ AppointmentID, AppointmentDate, AppointmentGuardian, AppointmentChildren,createdAt });
    res
      .status(201)
      .json({ message: "Created the Appointment log successfully", success: true, CreatedAppointment });
  } catch (error) {
    console.error(error);
  }
};

module.exports.getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.viewAppointment = async (req, res, next) => {
    try {
      const {AppointmentID} = req.params;
  
      const appointment = await Appointment.findOne({ AppointmentID });
      if (!appointment) {
        return res.status(400).json({ message: "Appointment not found" });
      }
      res
        .status(201)
        .json({ message: "Appointment Found", success: true, appointment });
    } catch (error) {
      console.error(error);
    }
  };
  
  
  module.exports.deleteAppointment = async (req, res, next) => {
      try {
        const { AppointmentID} = req.params;
    
        const appointment = await Appointment.findOne({ AppointmentID });
        if (!appointment) {
          return res.status(400).json({ message: "Appointment not found" });
        }
        deletedAppointment = await Appointment.findOneAndDelete({AppointmentID} );
        res
          .status(201)
          .json({ message: "Appointment Record Deleted", success: true, deletedAppointment });
      } catch (error) {
        console.error(error);
      }
    };

module.exports.updateAppointment = async (req, res) => {
  try {
    const { AppointmentID } = req.params;
    const { AppointmentDate, AppointmentGuardian, AppointmentChildren, createdAt } = req.body;

    const appointment = await Appointment.findOne({ AppointmentID });

    if (!appointment) {
      return res.status(400).json({ message: "Appointment not found" });
    }

    appointment.AppointmentDate = AppointmentDate;
    appointment.AppointmentGuardian = AppointmentGuardian;
    appointment.AppointmentChildren = AppointmentChildren;
    appointment.createdAt = createdAt;

    await appointment.save();

    res.status(200).json({ message: "Appointment updated successfully", success: true, updatedAppointment: appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
