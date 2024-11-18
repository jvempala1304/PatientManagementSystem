import React, { useEffect } from 'react';
// import { generateToken } from "./firebase/firebase";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Home,
  Login,
  MedicationSearch,
  Index,
  PrescriptionInfo,
} from './pages';
function App() {
  useEffect(() => {
    // generateToken();
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/medication-search" element={<MedicationSearch />} />
          <Route path="/patient-list" element={<Home />} />
          <Route
            path="/prescription-management"
            element={<PrescriptionInfo />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
