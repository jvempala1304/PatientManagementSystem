import React, { useState } from 'react';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      medicationName: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      startDate: '2023-11-01',
      endDate: '2024-05-01',
      prescribedBy: 'Dr. Smith',
      notes: 'Take with food'
    },
  ]);

  const [newPrescription, setNewPrescription] = useState({
    medicationName: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: '',
    prescribedBy: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPrescription(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPrescriptions(prev => [...prev, { ...newPrescription, id: Date.now() }]);
    setNewPrescription({
      medicationName: '',
      dosage: '',
      frequency: '',
      startDate: '',
      endDate: '',
      prescribedBy: '',
      notes: ''
    });
  };

  return (
    <main style={styles.main}>
      <div style={styles.mainRight}>
        <p style={styles.text}>Prescriptions</p>
        <div style={styles.prescriptionList}>
          {prescriptions.map(prescription => (
            <div key={prescription.id} style={styles.prescriptionItem}>
              <h3>{prescription.medicationName}</h3>
              <p>Dosage: {prescription.dosage}</p>
              <p>Frequency: {prescription.frequency}</p>
              <p>Start Date: {prescription.startDate}</p>
              <p>End Date: {prescription.endDate}</p>
              <p>Prescribed By: {prescription.prescribedBy}</p>
              <p>Notes: {prescription.notes}</p>
            </div>
          ))}
        </div>
        <p style={styles.text}>Add New Prescription</p>
        <form onSubmit={handleSubmit}>
          <div style={styles.one}>
            <input
              style={styles.inputs}
              type="text"
              name="medicationName"
              value={newPrescription.medicationName}
              onChange={handleInputChange}
              placeholder="Medication Name"
              required
            />
          </div>
          <div style={styles.one}>
            <input
              style={styles.inputs}
              type="text"
              name="dosage"
              value={newPrescription.dosage}
              onChange={handleInputChange}
              placeholder="Dosage"
              required
            />
          </div>
          <div style={styles.one}>
            <input
              style={styles.inputs}
              type="text"
              name="frequency"
              value={newPrescription.frequency}
              onChange={handleInputChange}
              placeholder="Frequency"
              required
            />
          </div>
          <div style={styles.one}>
            <input
              style={styles.inputs}
              type="date"
              name="startDate"
              value={newPrescription.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div style={styles.one}>
            <input
              style={styles.inputs}
              type="date"
              name="endDate"
              value={newPrescription.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div style={styles.one}>
            <input
              style={styles.inputs}
              type="text"
              name="prescribedBy"
              value={newPrescription.prescribedBy}
              onChange={handleInputChange}
              placeholder="Prescribed By"
              required
            />
          </div>
          <div style={styles.one}>
            <textarea
              style={styles.inputs}
              name="notes"
              value={newPrescription.notes}
              onChange={handleInputChange}
              placeholder="Notes"
            ></textarea>
          </div>
          <div style={styles.btns}>
            <button type="submit" style={styles.btn}>Add Prescription</button>
          </div>
        </form>
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
    width: "450px",
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
  one: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "15px 0",
    position: "relative",
  },
  btns: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  inputs: {
    border: "none",
    width: "85%",
    height: "48px",
    borderRadius: "5px",
    paddingLeft: "10px",
    fontSize: "16px",
  },
  btn: {
    width: "80%",
    height: "50px",
    color: "rgb(56, 147, 227)",
    backgroundColor: "#e4f0fe",
    marginTop: "10px",
    textAlign: "center",
    fontSize: "20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },
};

export default Prescriptions;