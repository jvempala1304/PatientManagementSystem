import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { createPrescription } from '../../services/api';
const Prescription = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const appointment = location.state || {};
  const patientId = appointment.patientData.patientId._id;
  const doctorId = appointment.patientData.doctorId._id;
  const [prescription] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientId) return;
    const newPrescription = {
      patientId: patientId,
      doctorId: doctorId,
      medications: [
        {
          name: e.target.name.value,
          dosage: e.target.dosage.value,
          frequency: e.target.frequency.value,
          duration: e.target.duration.value,
        },
      ],
      instructions: e.target.instructions.value,
      date: new Date().toISOString(),
    };
    createPrescription(newPrescription).then(() => {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
      navigate('/medication-search');
    });
  };
  const firstName = appointment.patientData.patientId?.firstname;
  const lastName = appointment.patientData.patientId?.lastname;
  const startTime = appointment.patientData.start.dateTime;
  const endTime = appointment.patientData.end.dateTime;
  const age = appointment.patientData.age;
  const gender = appointment.patientData.gender;
  const reason = appointment.patientData.reason;

  return (
    <div style={styles.container}>
      {showPopup && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingBox}>
            Prescription submitted successfully!
          </div>
        </div>
      )}
      <div style={styles.layout}>
        <div style={styles.contentWrapper}>
          <main style={styles.mainContent}>
            <div style={styles.profileCard}>
              <form style={styles.infoContainer} onSubmit={handleSubmit}>
                <h3 style={styles.title}>📋 Patient Information</h3>
                <div style={styles.row}>
                  <div style={styles.field}>
                    <label style={styles.label}>First Name:</label>
                    <input
                      type="text"
                      name="firstname"
                      style={styles.input}
                      defaultValue={firstName}
                      disabled
                    />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Last Name:</label>
                    <input
                      type="text"
                      name="lastname"
                      style={styles.input}
                      defaultValue={lastName}
                      disabled
                    />
                  </div>
                </div>
                <div style={styles.row}>
                  <div style={styles.field}>
                    <label style={styles.label}>Start Time:</label>
                    <input
                      type="text"
                      name="start"
                      style={styles.input}
                      defaultValue={startTime || ''}
                      disabled
                    />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>End Time:</label>
                    <input
                      type="text"
                      name="end"
                      style={styles.input}
                      defaultValue={endTime || ''}
                      disabled
                    />
                  </div>
                </div>
                <div style={styles.row}>
                  <div style={styles.field}>
                    <label style={styles.label}>Age:</label>
                    <input
                      type="number"
                      name="age"
                      style={styles.input}
                      defaultValue={age}
                      disabled
                    />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Gender:</label>
                    <select
                      name="sex"
                      style={styles.input}
                      defaultValue={gender}
                      disabled
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <div style={styles.row}>
                  <div style={styles.field}>
                    <label style={styles.label}>Reason:</label>
                    <input
                      type="text"
                      name="reason"
                      style={styles.input}
                      defaultValue={reason}
                      disabled
                    />
                  </div>
                </div>

                <h3 style={styles.title}>📋 Medication Information</h3>
                <div style={styles.row}>
                  <div style={styles.field}>
                    <label style={styles.label}>Medication Name:</label>
                    <input
                      type="text"
                      name="name"
                      style={styles.input}
                      defaultValue={prescription?.name || ''}
                      disabled={!isEditing}
                    />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Dosage:</label>
                    <input
                      type="text"
                      name="dosage"
                      style={styles.input}
                      defaultValue={prescription?.dosage || ''}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div style={styles.row}>
                  <div style={styles.field}>
                    <label style={styles.label}>Frequency:</label>
                    <input
                      type="text"
                      name="frequency"
                      style={styles.input}
                      defaultValue={prescription?.frequency || ''}
                      disabled={!isEditing}
                    />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Duration:</label>
                    <input
                      type="text"
                      name="duration"
                      style={styles.input}
                      defaultValue={prescription?.duration || ''}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div style={styles.row}>
                  <div style={styles.field}>
                    <label style={styles.label}>Medication Instructions:</label>
                    <input
                      type="text"
                      name="instructions"
                      style={styles.input}
                      defaultValue={prescription?.instructions || ''}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div style={styles.buttonContainer}>
                  <button
                    type="submit"
                    style={{ ...styles.button, marginTop: '20px' }}
                    disabled={!isEditing}
                  >
                    Submit Prescription
                  </button>
                  <button
                    type="button"
                    style={{ ...styles.button, marginTop: '20px' }}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    padding: '20px',
    backgroundColor: 'rgb(234, 244, 254)',
    minHeight: 'calc(100vh - 160px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingBox: {
    backgroundColor: '#fff',
    padding: '20px 40px',
    borderRadius: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'rgb(56, 147, 227)',
  },
  successMessage: {
    backgroundColor: '#dff0d8',
    color: '#3c763d',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    textAlign: 'center',
    width: '100%',
  },
  content: {
    backgroundColor: '#F6F9FE',
    width: '98%',
    height: '95%',
    boxSizing: 'border-box',
    minHeight: 'calc(100vh - 160px)',
    padding: '40px 40px',
    borderRadius: '15px',
  },
  title: {
    fontSize: '20px',
    color: 'rgb(56, 147, 227)',
    marginBottom: '10px',
  },
  layout: {
    width: '65%',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  contentWrapper: {
    display: 'flex',
    flex: 1,
    padding: '20px',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    backgroundColor: 'rgb(234, 244, 254)',
    overflowY: 'auto',
  },
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  profileImage: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid rgb(56, 147, 227)',
  },
  infoContainer: {
    width: '90%',
    padding: '0 20px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  field: {
    width: '48%',
  },
  fields: {
    width: '100%',
  },
  label: {
    color: 'rgb(112, 112, 112)',
    fontSize: '14px',
    marginBottom: '5px',
    display: 'block',
  },
  input: {
    width: '95%',
    padding: '9px 12px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    padding: '0 20px',
    paddingRight: '40px',
  },
  button: {
    width: '40%',
    height: '50px',
    color: 'rgb(56, 147, 227)',
    backgroundColor: '#e4f0fe',
    borderRadius: '5px',
    textAlign: 'center',
    fontSize: '18px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Prescription;
