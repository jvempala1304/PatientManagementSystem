const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clinic: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  visitDate: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);