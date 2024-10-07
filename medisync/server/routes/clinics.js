const express = require('express');
const router = express.Router();
const Clinic = require('../models/Clinic');

// Create a new clinic
router.post('/', async (req, res) => {
  try {
    const newClinic = new Clinic(req.body);
    await newClinic.save();
    res.status(201).json(newClinic);
  } catch (error) {
    res.status(400).json({ message: "Error creating clinic", error: error.message });
  }
});

// Get all clinics
router.get('/', async (req, res) => {
  try {
    const clinics = await Clinic.find();
    res.json(clinics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific clinic
router.get('/:id', async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Clinic not found' });
    res.json(clinic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a clinic
router.put('/:id', async (req, res) => {
  try {
    const updatedClinic = await Clinic.findByIdAndUpdate(req.params.id, 
      { 
        ...req.body, 
        updatedAt: Date.now() 
      }, 
      { new: true, runValidators: true }
    );
    if (!updatedClinic) return res.status(404).json({ message: 'Clinic not found' });
    res.json(updatedClinic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a clinic
router.delete('/:id', async (req, res) => {
  try {
    const deletedClinic = await Clinic.findByIdAndDelete(req.params.id);
    if (!deletedClinic) return res.status(404).json({ message: 'Clinic not found' });
    res.json({ message: 'Clinic deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;