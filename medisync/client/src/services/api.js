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
