import React from "react";
const appointments = [
  { id: "001", name: "Dr. Mathew" },
  { id: "002", name: "Dr. John" },
  { id: "003", name: "Dr. Luke" },
];
const Feedback = () => (
  <main style={styles.main}>
    <div style={styles.appointmentList}>
      <h2 style={styles.sectionTitle}>Appointment History 🕒</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>No.</th>
            <th style={styles.headerCell}>Appointment</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr
              key={index}
              style={{
                ...styles.row,
                backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#f7faff",
              }}
            >
              <td style={styles.cell}>{appointment.id}</td>
              <td style={styles.cell}>{appointment.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div style={styles.patientInfo}>
      <h2 style={styles.sectionTitle}>Feedback 🗣</h2>
      <form style={styles.form}>
        <textarea
          placeholder="Enter feedback here..."
          style={styles.textarea}
        ></textarea>
        <div style={styles.buttonGroup}>
          <button type="button" style={styles.button}>
            Submit feedback
          </button>
        </div>
      </form>
    </div>
  </main>
);

const styles = {
  main: {
    display: "flex",
    justifyContent: "space-around",
    padding: "20px",
    backgroundColor: "rgb(234, 244, 254)",
    minHeight: "calc(100vh - 160px)",
  },
  appointmentList: {
    width: "45%",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(10px)",
  },
  patientInfo: {
    width: "45%",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(10px)",
  },
  sectionTitle: {
    color: "rgb(56, 147, 227)",
    fontSize: "20px",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  headerCell: {
    padding: "8px",
    height: "45px",
    textAlign: "center",
    fontWeight: "bold",
    color: "rgb(0,0,0)",
    backgroundColor: "rgba(234, 244, 254, 0.8)",
  },
  row: {
    backgroundColor: "#fff",
  },
  cell: {
    padding: "10px",
    height: "45px",
    color: "rgb(112, 112, 112)",
    textAlign: "center",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "10px",
  },
  input: {
    height: "40px",
    padding: "10px",
    borderRadius: "5px",
    fontSize: "16px",
    border: "none",
  },
  textarea: {
    padding: "10px",
    borderRadius: "5px",
    fontSize: "16px",
    resize: "none",
    border: "none",
    height: "160px",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  button: {
    width: "100%",
    height: "50px",
    color: "rgb(56, 147, 227)",
    backgroundColor: "#e4f0fe",
    marginTop: "10px",
    textAlign: "center",
    fontSize: "18px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },
};

export default Feedback;
