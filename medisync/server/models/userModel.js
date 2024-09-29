// server/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  sex: { type: String, required: true }, // 'Male', 'Female', 'Other'
  address: { type: String, required: true },
  streetName: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  province: { type: String, required: true },
  insuranceNumber: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;