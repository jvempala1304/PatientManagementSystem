import React, { useEffect, useState } from "react";
import axios from "axios";

const Feedback = () => {
  const [appointments, setAppointments] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedback");
        setAppointments(response.data);
      } catch (err) {
        setError("Error fetching feedback data");
      }
    };

    fetchFeedback();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/feedback", {
        comment: feedback,
        rating: 5,
        patientId: "patient-id",
        clinicId: "clinic-id",
        doctorId: "doctor-id",
        visitDate: new Date(),
      });
      setFeedback("");
      setError(null);
      alert("Feedback submitted successfully!");
    } catch (err) {
      setError("Error submitting feedback");
    }
  };

  return (
    <main style={styles.main}>
      <div style={styles.appointmentList}>
        <h2 style={styles.sectionTitle}>Appointment History 🕒</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.headerCell}>No.</th>
              <th style={styles.headerCell}>Appointment</th>
              <th style={styles.headerCell}>Doctor</th>
              <th style={styles.headerCell}>Rating</th>
              <th style={styles.headerCell}>Comment</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr
                key={appointment._id}
                style={{
                  ...styles.row,
                  backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#f7faff",
                }}
              >
                <td style={styles.cell}>{index + 1}</td>
                <td style={styles.cell}>{appointment.clinic?.name}</td>
                <td style={styles.cell}>
                  {appointment.patient?.firstname}{" "}
                  {appointment.patient?.lastname}
                </td>
                <td style={styles.cell}>{appointment.rating}</td>
                <td style={styles.cell}>{appointment.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.patientInfo}>
        <h2 style={styles.sectionTitle}>Feedback 🗣</h2>
        <form
          style={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <textarea
            placeholder="Enter feedback here..."
            style={styles.textarea}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <div style={styles.buttonGroup}>
            <button type="button" style={styles.button} onClick={handleSubmit}>
              Submit feedback
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

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
