const express = require("express");
const dotenv = require("dotenv");
const patientRoutes = require("./routes/patients");
const appointmentRoutes = require("./routes/appointments");
const clinicRoutes = require("./routes/clinics");
const prescriptionRoutes = require("./routes/prescriptions");
const doctorRoutes = require("./routes/doctors");
const feedbackRoutes = require("./routes/feedback");
const scheduleNotifications = require("./config/scheduleNotifications");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/clinics", clinicRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/feedback", feedbackRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
