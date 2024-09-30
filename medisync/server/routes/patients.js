const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const User = require("../models/userModel");
const db = require("../config/db");
// API to insert a user profile
router.post("/", async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      age,
      sex,
      address,
      streetName,
      city,
      postalCode,
      province,
      insuranceNumber,
    } = req.body;

    const newUser = new User({
      firstname,
      lastname,
      email,
      phone,
      age,
      sex,
      address,
      streetName,
      city,
      postalCode,
      province,
      insuranceNumber,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User profile created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user profile:", error);
    res
      .status(400)
      .json({ message: "Error creating user profile", error: error.message });
  }
});

// API to view a user profile by email or phone
router.get("/", async (req, res) => {
  try {
    const { email, phone } = req.query;
    const query = email ? { email } : phone ? { phone } : {};

    const user = await User.findOne(query);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res
      .status(500)
      .json({ message: "Error fetching user profile", error: error.message });
  }
});

// Update a patient by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedPatient = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(updatedPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a patient by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPatient = await User.findByIdAndDelete(req.params.id);

    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
