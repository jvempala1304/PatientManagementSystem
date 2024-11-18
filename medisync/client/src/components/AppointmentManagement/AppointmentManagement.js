import React, { useState } from 'react';

// Hardcoded data
const patients = [
  { id: '1', name: 'Thomas Binze' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Robert Johnson' },
];

const doctors = [
  { id: '1', name: 'Dr. John Doe' },
  { id: '2', name: 'Dr. Emily Johnson' },
  { id: '3', name: 'Dr. Michael Brown' },
];

const clinics = [
  { id: '1', name: 'Waterloo Clinic' },
  { id: '2', name: 'Downtown Clinic' },
  { id: '3', name: 'Central Hospital' },
];

// Hardcoded appointments data
const mockAppointments = [
  {
    _id: "1",
    patientId: '1',
    doctorId: '1',
    clinicId: '1',
    start: { dateTime: "2024-10-15T14:15:00Z", timeZone: "UTC" },
    end: { dateTime: "2024-10-15T14:45:00Z", timeZone: "UTC" },
    duration: 30,
    status: "scheduled",
    reason: "Follow-up appointment",
    notes: "Review test results",
  },
  {
    _id: "2",
    patientId: '2',
    doctorId: '2',
    clinicId: '2',
    start: { dateTime: "2024-11-01T09:00:00Z", timeZone: "UTC" },
    end: { dateTime: "2024-11-01T09:30:00Z", timeZone: "UTC" },
    duration: 30,
    status: "scheduled",
    reason: "Annual check-up",
    notes: "",
  }
];

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    clinicId: '',
    start: { dateTime: '', timeZone: 'UTC' },
    end: { dateTime: '', timeZone: 'UTC' },
    duration: 30,
    status: 'scheduled',
    reason: '',
    notes: '',
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateTimeChange = (field, value) => {
    setFormData({ ...formData, [field]: { ...formData[field], dateTime: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedAppointment) {
      // Update existing appointment
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === selectedAppointment ? { ...formData, _id: selectedAppointment } : appointment
        )
      );
      alert("Appointment updated");
    } else {
      // Create new appointment
      const newAppointment = { ...formData, _id: `${appointments.length + 1}` };
      setAppointments((prev) => [...prev, newAppointment]);
      alert("Appointment created");
    }

    resetForm();
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments((prev) => prev.filter((appointment) => appointment._id !== id));
      alert("Appointment deleted");
    }
  };

  const resetForm = () => {
    setSelectedAppointment(null);
    setFormData({
      patientId: '',
      doctorId: '',
      clinicId: '',
      start: { dateTime: '', timeZone: 'UTC' },
      end: { dateTime: '', timeZone: 'UTC' },
      duration: 30,
      status: 'scheduled',
      reason: '',
      notes: '',
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.sectionTitle}>Appointment Management</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <select
          name="patientId"
          value={formData.patientId}
          onChange={handleInputChange}
          style={styles.input}
        >
          <option value="">Select Patient</option>
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>{patient.name}</option>
          ))}
        </select>
        <select
          name="doctorId"
          value={formData.doctorId}
          onChange={handleInputChange}
          style={styles.input}
        >
          <option value="">Select Doctor</option>
          {doctors.map(doctor => (
            <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
          ))}
        </select>
        <select
          name="clinicId"
          value={formData.clinicId}
          onChange={handleInputChange}
          style={styles.input}
        >
          <option value="">Select Clinic</option>
          {clinics.map(clinic => (
            <option key={clinic.id} value={clinic.id}>{clinic.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Start Date & Time (YYYY-MM-DDTHH:mm)"
          value={formData.start.dateTime}
          onChange={(e) => handleDateTimeChange('start', e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="End Date & Time (YYYY-MM-DDTHH:mm)"
          value={formData.end.dateTime}
          onChange={(e) => handleDateTimeChange('end', e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Duration (min)"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Reason for Appointment"
          name="reason"
          value={formData.reason}
          onChange={handleInputChange}
          style={styles.input}
        />
        <textarea
          placeholder="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          style={{ ...styles.textarea }}
        />
        
        <button type="submit" style={styles.button}>
            {selectedAppointment ? 'Update Appointment' : 'Create Appointment'}
        </button>
      </form>

      <h2 style={styles.sectionTitle}>Appointments List</h2>
      
      <table style={styles.table}>
        <thead>
            <tr>
                <th>Patient Name</th>
                <th>Doctor Name</th>
                <th>Clinic Name</th>
                <th>Start</th>
                <th>End</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {appointments.map((appointment) => (
                <tr key={appointment._id}>
                    <td>{patients.find(p => p.id === appointment.patientId)?.name}</td>
                    <td>{doctors.find(d => d.id === appointment.doctorId)?.name}</td>
                    <td>{clinics.find(c => c.id === appointment.clinicId)?.name}</td>
                    <td>{new Date(appointment.start.dateTime).toLocaleString()}</td>
                    <td>{new Date(appointment.end.dateTime).toLocaleString()}</td>
                    <td>
                        <button onClick={() => {
                            setSelectedAppointment(appointment._id);
                            setFormData({
                                ...appointment,
                                start: { dateTime: appointment.start.dateTime },
                                end: { dateTime: appointment.end.dateTime }
                            });
                        }} style={styles.actionButton}>Edit</button>
                        <button onClick={() => handleDelete(appointment._id)} style={styles.actionButton}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
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
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    height: '40px',
    paddingLeft: '10px',
    borderRadius: '5px',
    fontSize: '16px',
    border: 'none'
  },
  textarea: {
    padding: '10px',
    borderRadius: '5px',
    fontSize: '16px',
    resize: 'none',
    border: 'none',
    height: '100px'
  },
  button: {
    height: '50px',
    color: 'rgb(56, 147, 227)',
    backgroundColor: '#e4f0fe',
    fontSize: '18px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  actionButton: {
    margin: '0 5px'
  },
};

export default AppointmentManagement;