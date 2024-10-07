const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true },
  start: {
    dateTime: { type: Date, required: true },
    timeZone: { type: String, default: 'UTC' }
  },
  end: {
    dateTime: { type: Date, required: true },
    timeZone: { type: String, default: 'UTC' }
  },
  duration: { type: Number, required: true }, // in minutes
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  reason: { type: String, required: true },
  notes: { type: String },
  type: { type: String, enum: ['in-person', 'virtual'], required: true },
  customerTimeZone: { type: String },
  smsNotificationsEnabled: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);