const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  dateOfBirth: Date,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  insuranceNumber: String,
  medicalHistory: [
    {
      date: Date,
      condition: String,
      notes: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Patient', patientSchema);
