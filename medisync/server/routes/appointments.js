const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const Clinic = require("../models/Clinic");
const User = require("../models/Patient"); // Assuming this is your Patient model
const Doctor = require("../models/Doctor");

// Helper function to check appointment availability
async function isAppointmentAvailable(doctorId, start, end, appointmentId = null) {
  const overlappingAppointment = await Appointment.findOne({
    doctorId: doctorId,
    $or: [
      { 'start.dateTime': { $lt: end.dateTime }, 'end.dateTime': { $gt: start.dateTime } },
      { 'start.dateTime': { $gte: start.dateTime, $lt: end.dateTime } },
      { 'end.dateTime': { $gt: start.dateTime, $lte: end.dateTime } }
    ],
    _id: { $ne: appointmentId } // Exclude the current appointment when updating
  });

  return !overlappingAppointment;
}

// Create a new appointment
router.post("/", async (req, res) => {
  try {
    const { 
      patientId, 
      doctorId, 
      clinicId, 
      start, 
      end, 
      duration, 
      status, 
      reason, 
      notes, 
      type, 
      customerTimeZone, 
      smsNotificationsEnabled 
    } = req.body;

    // Check if the patient exists
    const patient = await User.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Check if the doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check if the clinic exists
    const clinic = await Clinic.findById(clinicId);
    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    // Check if the appointment time is available
    const isAvailable = await isAppointmentAvailable(doctorId, start, end);
    if (!isAvailable) {
      return res.status(409).json({ message: "The requested appointment time is not available" });
    }

    const newAppointment = new Appointment({ 
      patientId, 
      doctorId, 
      clinicId, 
      start, 
      end, 
      duration, 
      status, 
      reason, 
      notes, 
      type, 
      customerTimeZone, 
      smsNotificationsEnabled 
    });

    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId', 'firstname lastname')
      .populate('doctorId', 'firstname lastname')
      .populate('clinicId', 'name');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get appointments for a specific clinic
router.get("/clinic/:clinicId", async (req, res) => {
  try {
    const appointments = await Appointment.find({ clinicId: req.params.clinicId })
      .populate('patientId', 'firstname lastname')
      .populate('doctorId', 'firstname lastname')
      .populate('clinicId', 'name');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific appointment
router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patientId', 'firstname lastname')
      .populate('doctorId', 'firstname lastname')
      .populate('clinicId', 'name');
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an appointment
router.put("/:id", async (req, res) => {
  try {
    const { patientId, doctorId, clinicId, start, end } = req.body;

    if (patientId) {
      const patient = await User.findById(patientId);
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
    }

    if (doctorId) {
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
    }

    if (clinicId) {
      const clinic = await Clinic.findById(clinicId);
      if (!clinic) {
        return res.status(404).json({ message: "Clinic not found" });
      }
    }

    // Check if the new appointment time is available
    if (start && end) {
      const isAvailable = await isAppointmentAvailable(doctorId || req.body.doctorId, start, end, req.params.id);
      if (!isAvailable) {
        return res.status(409).json({ message: "The requested appointment time is not available" });
      }
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id, 
      { ...req.body, updatedAt: Date.now() }, 
      { new: true }
    );
    if (!updatedAppointment) return res.status(404).json({ message: "Appointment not found" });
    res.json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an appointment
router.delete("/:id", async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) return res.status(404).json({ message: "Appointment not found" });
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;