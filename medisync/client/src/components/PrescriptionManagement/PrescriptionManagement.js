import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    // Define a function to fetch prescriptions
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/prescriptions/patient/670354b793f416224daa6321');
        setPrescriptions(response.data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    // Call the function to fetch prescriptions
    fetchPrescriptions();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <main style={styles.main}>
      <div style={styles.mainRight}>
        <p style={styles.text}>Prescriptions</p>
        <div style={styles.prescriptionList}>
          {prescriptions.map(prescription => (
            <div key={prescription._id} style={styles.prescriptionItem}>
              <h3>{prescription.medications[0].name}</h3>
              <p>Dosage: {prescription.medications[0].dosage}</p>
              <p>Frequency: {prescription.medications[0].frequency}</p>
              <p>Instructions: {prescription.instructions}</p>
              <p>Date: {new Date(prescription.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

const styles = {
  main: {
    boxSizing: "border-box",
    minHeight: "calc(100vh - 120px)",
    width: "100%",
    padding: "3% 8%",
    background: "rgb(234, 244, 254)",
    display: "flex",
    justifyContent: "center",
  },
  text: {
    color: "rgb(112, 112, 112)",
    textAlign: "center",
    fontSize: "23px",
    fontWeight: 600,
    padding: "0 8px",
    marginBottom: "20px",
  },
  mainRight: {
    width: "750px",
    background: "rgba(255, 255, 255, 0.3)",
    borderRadius: "15px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    border: "1px solid rgba(255, 255, 255, 0.5)",
  },
  prescriptionList: {
    marginBottom: "30px",
  },
  prescriptionItem: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "15px",
  },
};

export default Prescriptions;