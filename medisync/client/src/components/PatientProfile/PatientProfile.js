import React from 'react';

const PatientProfile = ({ patient }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.sectionTitle}>Patient Profile 👤</h2>
      <div style={styles.profileCard}>
        <div style={styles.imageContainer}>
          <img 
            src={patient.imageUrl || '/images/Patient.jpg'} 
            alt={`${patient.firstname} ${patient.lastname}`} 
            style={styles.profileImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/Patient.jpg';
            }}
          />
        </div>
        <div style={styles.infoContainer}>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>First Name:</label>
              <p style={styles.value}>{patient.firstname}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Last Name:</label>
              <p style={styles.value}>{patient.lastname}</p>
            </div>
          </div>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Email:</label>
              <p style={styles.value}>{patient.email}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Phone:</label>
              <p style={styles.value}>{patient.phone}</p>
            </div>
          </div>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Age:</label>
              <p style={styles.value}>{patient.age}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Sex:</label>
              <p style={styles.value}>{patient.sex}</p>
            </div>
          </div>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Address:</label>
              <p style={styles.value}>{patient.address}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Street Name:</label>
              <p style={styles.value}>{patient.streetName}</p>
            </div>
          </div>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>City:</label>
              <p style={styles.value}>{patient.city}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Postal Code:</label>
              <p style={styles.value}>{patient.postalCode}</p>
            </div>
          </div>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Province:</label>
              <p style={styles.value}>{patient.province}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Insurance Number:</label>
              <p style={styles.value}>{patient.insuranceNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: 'rgb(234, 244, 254)',
    minHeight: 'calc(100vh - 160px)',
  },
  sectionTitle: {
    color: 'rgb(56, 147, 227)',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
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
    width: '100%',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  field: {
    width: '48%',
  },
  label: {
    color: 'rgb(112, 112, 112)',
    fontSize: '14px',
    marginBottom: '5px',
    display: 'block',
  },
  value: {
    color: 'rgb(56, 147, 227)',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: 'rgba(234, 244, 254, 0.8)',
    padding: '10px',
    borderRadius: '5px',
    margin: '0',
  },
};

export default PatientProfile;