const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const patientRoutes = require('./routes/patients');
const appointmentRoutes = require('./routes/appointments');
const clinicRoutes = require('./routes/clinics');
const prescriptionRoutes = require('./routes/prescriptions');
const doctorRoutes = require('./routes/doctors');
const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/feedback', feedbackRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
