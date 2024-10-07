const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  phone: String,
  age: Number,
  sex: String,
  address: String,
  streetName: String,
  city: String,
  postalCode: String,
  province: String,
  insuranceNumber: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', patientSchema);