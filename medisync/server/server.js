const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors'); // Import cors for handling CORS
const patientRoutes = require("./routes/patients");
const appointmentRoutes = require("./routes/appointments");
const clinicRoutes = require("./routes/clinics");
const prescriptionRoutes = require("./routes/prescriptions");
const doctorRoutes = require("./routes/doctors");
const feedbackRoutes = require("./routes/feedback");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// API Routes
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/clinics", clinicRoutes); 
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/feedback", feedbackRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});