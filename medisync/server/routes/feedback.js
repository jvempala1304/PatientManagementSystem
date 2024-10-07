const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const User = require('../models/Patient'); // Using User model for patients
const Clinic = require('../models/Clinic');
const Doctor = require('../models/Doctor');

// Create a new feedback
router.post('/', async (req, res) => {
  try {
    const { patientId, clinicId, doctorId, ...feedbackData } = req.body;

    // Check if the patient exists
    const patientExists = await User.findById(patientId);
    if (!patientExists) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Check if clinic exists (if provided)
    if (clinicId) {
      const clinicExists = await Clinic.exists({ _id: clinicId });
      if (!clinicExists) {
        return res.status(404).json({ message: "Clinic not found" });
      }
    }

    // Check if doctor exists (if provided)
    if (doctorId) {
      const doctorExists = await Doctor.exists({ _id: doctorId });
      if (!doctorExists) {
        return res.status(404).json({ message: "Doctor not found" });
      }
    }

    const newFeedback = new Feedback({
      patient: patientId,
      clinic: clinicId,
      doctor: doctorId,
      ...feedbackData
    });
    await newFeedback.save();

    res.status(201).json(newFeedback);
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({ message: "Error creating feedback", error: error.message });
  }
});

// Get all feedback
router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate('patient', 'firstname lastname')
      .populate('clinic', 'name')
      .populate('doctor', 'firstname lastname');
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific feedback
router.get('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate('patient', 'firstname lastname')
      .populate('clinic', 'name')
      .populate('doctor', 'firstname lastname');
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a feedback
router.put('/:id', async (req, res) => {
  try {
    const { patientId, clinicId, doctorId, ...updateData } = req.body;

    // Check if patient exists (if being updated)
    if (patientId) {
      const patientExists = await User.exists({ _id: patientId });
      if (!patientExists) {
        return res.status(404).json({ message: "Patient not found" });
      }
    }

    // Check if clinic exists (if being updated)
    if (clinicId) {
      const clinicExists = await Clinic.exists({ _id: clinicId });
      if (!clinicExists) {
        return res.status(404).json({ message: "Clinic not found" });
      }
    }

    // Check if doctor exists (if being updated)
    if (doctorId) {
      const doctorExists = await Doctor.exists({ _id: doctorId });
      if (!doctorExists) {
        return res.status(404).json({ message: "Doctor not found" });
      }
    }

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { 
        patient: patientId,
        clinic: clinicId,
        doctor: doctorId,
        ...updateData,
        updatedAt: Date.now() 
      },
      { new: true, runValidators: true }
    );

    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.json(updatedFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a feedback
router.delete('/:id', async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) return res.status(404).json({ message: 'Feedback not found' });
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get feedback for a specific clinic
router.get('/clinic/:clinicId', async (req, res) => {
  try {
    const feedback = await Feedback.find({ clinic: req.params.clinicId })
      .populate('patient', 'firstname lastname')
      .populate('doctor', 'firstname lastname');
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get feedback for a specific doctor
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const feedback = await Feedback.find({ doctor: req.params.doctorId })
      .populate('patient', 'firstname lastname')
      .populate('clinic', 'name');
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;