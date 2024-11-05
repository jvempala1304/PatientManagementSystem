import React, { useState, useEffect } from 'react';

// Mock API URL
const API_URL = "http://localhost:5000/api/appointments";

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    patientId: '670354b793f416224daa6321', // Hardcoded for demonstration
    doctorId: '67034b93e26661f60426362a',
    clinicId: '67033ffbbbbe34f20c2f2f19',
    start: {
      dateTime: '',
      timeZone: 'UTC'
    },
    end: {
      dateTime: '',
      timeZone: 'UTC'
    },
    duration: 30,
    status: 'scheduled',
    reason: '',
    notes: '',
    type: 'in-person',
    customerTimeZone: 'America/New_York',
    smsNotificationsEnabled: true
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setAppointments(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateTimeChange = (field, value) => {
    setFormData({ ...formData, [field]: { ...formData[field], dateTime: value } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedAppointment) {
      // Update existing appointment
      await fetch(`${API_URL}/${selectedAppointment}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      alert("Appointment updated");
    } else {
      // Create new appointment
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      alert("Appointment created");
    }
    
    resetForm();
    fetchAppointments();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    alert("Appointment deleted");
    fetchAppointments();
  };

  const resetForm = () => {
    setSelectedAppointment(null);
    setFormData({
      patientId: '670354b793f416224daa6321',
      doctorId: '67034b93e26661f60426362a',
      clinicId: '67033ffbbbbe34f20c2f2f19',
      start: { dateTime: '', timeZone: 'UTC' },
      end: { dateTime: '', timeZone: 'UTC' },
      duration: 30,
      status: 'scheduled',
      reason: '',
      notes: '',
      type: 'in-person',
      customerTimeZone: 'America/New_York',
      smsNotificationsEnabled: true
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.sectionTitle}>Appointment Management 🗓️</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Patient ID"
          name="patientId"
          value={formData.patientId}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Doctor ID"
          name="doctorId"
          value={formData.doctorId}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Clinic ID"
          name="clinicId"
          value={formData.clinicId}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="datetime-local"
          placeholder="Start Date & Time"
          value={formData.start.dateTime.split('T')[0] + "T" + formData.start.dateTime.split('T')[1]}
          onChange={(e) => handleDateTimeChange('start', e.target.value)}
          style={styles.input}
        />
        <input
          type="datetime-local"
          placeholder="End Date & Time"
          value={formData.end.dateTime.split('T')[0] + "T" + formData.end.dateTime.split('T')[1]}
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

      <h2 style={styles.sectionTitle}>Appointments List 📋</h2>
      
      <table style={styles.table}>
        <thead>
            <tr>
                <th>Patient Name</th>
                <th>Doctor ID</th>
                <th>Clinic Name</th>
                <th>Start</th>
                <th>End</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {appointments.map((appointment) => (
                <tr key={appointment._id}>
                    <td>{appointment.patientId.firstname} {appointment.patientId.lastname}</td>
                    <td>{appointment.doctorId._id}</td>
                    <td>{appointment.clinicId.name}</td>
                    <td>{new Date(appointment.start.dateTime).toLocaleString()}</td>
                    <td>{new Date(appointment.end.dateTime).toLocaleString()}</td>
                    <td>
                        <button onClick={() => {
                            setSelectedAppointment(appointment._id);
                            setFormData({
                                ...appointment,
                                start: { dateTime: appointment.start.dateTime, timeZone: appointment.start.timeZone },
                                end: { dateTime: appointment.end.dateTime, timeZone: appointment.end.timeZone }
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
    paddingLeft:'10px',
    borderRadius:'5px',
    fontSize:'16px', 
   border:'none'
   },
   textarea:{
     padding:'10px', 
     borderRadius:'5px', 
     fontSize:'16px', 
     resize:'none', 
     border:'none', 
     height:'100px'
   },
   button:{
     height:'50px', 
     color:'rgb(56,147,227)', 
     backgroundColor:'#e4f0fe', 
     fontSize:'18px', 
     borderRadius:'10px', 
     border:'none', 
     cursor:'pointer'
   },
   table:{
     width:'100%', 
     borderCollapse:'collapse'
   },
   actionButton:{
     margin:'0 5px'
   }
};

export default AppointmentManagement;