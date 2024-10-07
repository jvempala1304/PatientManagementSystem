const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');
const User = require('../models/Patient'); // Assuming this is your Patient model
const Doctor = require('../models/Doctor');

// Create a new prescription
router.post('/', async (req, res) => {
  try {
    const { patientId, doctorId, medications, instructions, date } = req.body;

    // Check if the patient exists
    const patientExists = await User.findById(patientId);
    if (!patientExists) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Check if the doctor exists
    const doctorExists = await Doctor.findById(doctorId);
    if (!doctorExists) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const newPrescription = new Prescription({
      patient: patientId,
      doctor: doctorId,
      medications,
      instructions,
      date
    });

    await newPrescription.save();
    res.status(201).json(newPrescription);
  } catch (error) {
    console.error("Error creating prescription:", error);
    res.status(500).json({ message: "Error creating prescription", error: error.message });
  }
});

// Get all prescriptions
router.get('/', async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate('patient', 'firstname lastname')
      .populate('doctor', 'firstname lastname');
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific prescription
router.get('/:id', async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate('patient', 'firstname lastname')
      .populate('doctor', 'firstname lastname');
    if (!prescription) return res.status(404).json({ message: 'Prescription not found' });
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a prescription
router.put('/:id', async (req, res) => {
  try {
    const { patientId, doctorId, medications, instructions, date } = req.body;

    // Check if the patient exists (if being updated)
    if (patientId) {
      const patientExists = await User.findById(patientId);
      if (!patientExists) {
        return res.status(404).json({ message: "Patient not found" });
      }
    }

    // Check if the doctor exists (if being updated)
    if (doctorId) {
      const doctorExists = await Doctor.findById(doctorId);
      if (!doctorExists) {
        return res.status(404).json({ message: "Doctor not found" });
      }
    }

    const updatedPrescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { 
        patient: patientId,
        doctor: doctorId,
        medications,
        instructions,
        date,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!updatedPrescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    res.json(updatedPrescription);
  } catch (error) {
    console.error("Error updating prescription:", error);
    res.status(400).json({ message: "Error updating prescription", error: error.message });
  }
});

// Delete a prescription
router.delete('/:id', async (req, res) => {
  try {
    const deletedPrescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!deletedPrescription) return res.status(404).json({ message: 'Prescription not found' });
    res.json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get prescriptions for a specific patient
router.get('/patient/:patientId', async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patient: req.params.patientId })
      .populate('doctor', 'firstname lastname');
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get prescriptions by a specific doctor
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ doctor: req.params.doctorId })
      .populate('patient', 'firstname lastname');
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;