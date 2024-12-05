import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getPatients = async () => {
  const response = await axios.get(`${API_URL}/patients`);
  return response.data;
};

export const createPatient = async (patientData) => {
  const response = await axios.post(`${API_URL}/patients`, patientData);
  return response.data;
};
export const fetchUserProfile = async (email) => {
  const response = await axios.get(`${API_URL}/patients`, {
    params: { email },
  });
  return response.data;
};

// Get all appointments
export const getAppointments = async () => {
  const response = await axios.get(`${API_URL}/appointments`);
  return response.data;
};

// Create an appointment
export const createAppointment = async (appointmentData) => {
  const response = await axios.post(`${API_URL}/appointments`, appointmentData);
  return response.data;
};

// Get a single user's appointment
export const getAppointment = async (id) => {
  const response = await axios.get(`${API_URL}/appointments/${id}`);
  return response.data;
};

export const getPrescriptions = async () => {
  const response = await axios.get(`${API_URL}/prescriptions`);
  return response.data;
};

export const createPrescription = async (data) => {
  const response = await axios.post(`${API_URL}/prescriptions`, data);
  return response.data;
};

export const getPrescriptionsByPatient = async (patientId) => {
  const response = await axios.get(
    `${API_URL}/prescriptions/patient/${patientId}`
  );
  return response.data;
};

// Update an existing appointment
export const updateAppointment = async (id, appointmentData) => {
  const response = await axios.put(
    `${API_URL}/appointments/${id}`,
    appointmentData
  );
  return response.data;
};
