import React from 'react';
const patients = [
  { id: '001', name: 'Kevin' },
  { id: '002', name: 'Sophia' },
  { id: '003', name: 'Ethan' },
  { id: '004', name: 'Jordan' },
  { id: '005', name: 'Liam' },
  { id: '006', name: 'Grace' },
];
const Dashboard = () => (
  <main style={styles.main}>
    <div style={styles.appointmentList}>
      <h2 style={styles.sectionTitle}>Patient Appointment List 📋</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>No.</th>
            <th style={styles.headerCell}>Name</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr
              key={index}
              style={{
                ...styles.row,
                backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#f7faff',
              }}
            >
              <td style={styles.cell}>{patient.id}</td>
              <td style={styles.cell}>{patient.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div style={styles.patientInfo}>
      <h2 style={styles.sectionTitle}>Patient Information 🩺</h2>
      <form style={styles.form}>
        <input type="text" placeholder="patient's name" style={styles.input} />
        <input type="text" placeholder="patient's age" style={styles.input} />
        <input
          type="text"
          placeholder="patient's gender"
          style={styles.input}
        />
        <textarea
          placeholder="Description of the condition"
          style={styles.textarea}
        ></textarea>
        <div style={styles.buttonGroup}>
          <button type="button" style={styles.button}>
            Generate prescription
          </button>
          <button type="button" style={styles.button}>
            Change appointment time
          </button>
        </div>
      </form>
    </div>
  </main>
);

const styles = {
  main: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px',
    backgroundColor: 'rgb(234, 244, 254)',
    minHeight: 'calc(100vh - 160px)',
  },
  appointmentList: {
    width: '45%',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(10px)',
  },
  patientInfo: {
    width: '45%',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(10px)',
  },
  sectionTitle: {
    color: 'rgb(56, 147, 227)',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  headerCell: {
    padding: '8px',
    height: '45px',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'rgb(0,0,0)',
    backgroundColor: 'rgba(234, 244, 254, 0.8)',
  },
  row: {
    backgroundColor: '#fff',
  },
  cell: {
    padding: '10px',
    height: '45px',
    color: 'rgb(112, 112, 112)',
    textAlign: 'center',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '10px',
  },
  input: {
    height: '40px',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '16px',
    border: 'none',
  },
  textarea: {
    padding: '10px',
    borderRadius: '5px',
    fontSize: '16px',
    resize: 'none',
    border: 'none',
    height: '160px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  button: {
    width: '80%',
    height: '50px',
    color: 'rgb(56, 147, 227)',
    backgroundColor: '#e4f0fe',
    marginTop: '10px',
    textAlign: 'center',
    fontSize: '18px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Dashboard;
