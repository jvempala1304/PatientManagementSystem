import React, { useEffect } from "react";
// import { generateToken } from "./firebase/firebase";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Home,
  LoginPage,
  SignupPage,
  FeedbackPage,
  Profile,
  PrescriptionInfo,
} from './pages';
import PrescriptionManagementPage from './pages/PrescriptionManagement/PrescriptionManagement';
import AppointmentManagementPage from './pages/AppointmentManagement/AppointmentManagement';

function App() {
  useEffect(() => {
    // generateToken();
  }, []);

  // This is mock data. In a real application, you'd probably fetch this from an API or pass it from a parent component.

  const patientData = {
    _id: '670337ca49fe1c0964e974f3',
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    age: 30,
    sex: 'Male',
    address: '123 Main St',
    streetName: 'Main St',
    city: 'Waterloo',
    postalCode: 'N2L 0K5',
    province: 'Ontario',
    insuranceNumber: 'ABC123456',
    imageUrl:
      'https://www.pexels.com/photo/well-dressed-businessman-sitting-on-sofa-3771839/', // Add this line
    __v: 0,
    createdAt: '2024-10-28T21:05:30.350Z',
    updatedAt: '2024-10-28T21:05:30.350Z',
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route
            path="/patient-profile"
            element={<Profile patient={patientData} />}
          />

          <Route
            path="/prescriptions"
            element={<PrescriptionManagementPage />}
          />
          <Route
            path="/prescription-management"
            element={<PrescriptionInfo />}
          />
          <Route path="/appointments" element={<AppointmentManagementPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
