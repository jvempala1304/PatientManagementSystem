const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const Clinic = require('../models/Clinic');

// Create a new doctor
router.post('/', async (req, res) => {
  try {
    const { clinicId, ...doctorData } = req.body;

    // Check if the clinic exists
    const clinicExists = await Clinic.exists({ _id: clinicId });
    if (!clinicExists) {
      return res.status(404).json({ message: "Clinic not found. Please provide a valid clinic ID." });
    }

    // If clinic exists, proceed with doctor creation
    const newDoctor = new Doctor({ ...doctorData, clinicId });
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific doctor
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a doctor
router.put('/:id', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      specialization,
      email,
      phone,
      licenseNumber,
      clinicId,
      availableHours
    } = req.body;

    // Check if the clinic exists
    if (clinicId) {
      const clinicExists = await Clinic.exists({ _id: clinicId });
      if (!clinicExists) {
        return res.status(404).json({ message: "Clinic not found. Please provide a valid clinic ID." });
      }
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        lastName,
        specialization,
        email,
        phone,
        licenseNumber,
        clinicId,
        availableHours,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(updatedDoctor);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'An error occurred while updating the doctor' });
  }
});

// Delete a doctor
router.delete('/:id', async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;