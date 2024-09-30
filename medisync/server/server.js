const express = require("express");
const dotenv = require("dotenv");
const patientRoutes = require("./routes/patients");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/patients", patientRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
