import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    patientId: '670354b793f416224daa6321', // Hardcoded patient ID
    doctorId: '',
    clinicId: '',
    start: null,
    reason: '',
    notes: '',
    type: 'in-person',
    customerTimeZone: 'America/New_York',
    smsNotificationsEnabled: true
  });
  const [patientDetails, setPatientDetails] = useState({});
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchPatientDetails();
    fetchClinics();
    fetchAppointments();
  }, []);

  const fetchPatientDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/patients?id=${formData.patientId}`);
      setPatientDetails(response.data);
    } catch (error) {
      console.error('Error fetching patient details:', error);
      setMessage('Error fetching patient details');
    }
  };

  const fetchClinics = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clinics');
      setClinics(response.data);
    } catch (error) {
      console.error('Error fetching clinics:', error);
      setMessage('Error fetching clinics');
    }
  };

  const fetchDoctors = async (clinicId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/doctors?clinicId=${clinicId}`);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setMessage('Error fetching doctors');
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setMessage('Error fetching appointments');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });

    if (name === 'clinicId') {
      fetchDoctors(value);
    }
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, start: date });
    setErrors({ ...errors, start: '' });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.doctorId) newErrors.doctorId = 'Please select a doctor';
    if (!formData.clinicId) newErrors.clinicId = 'Please select a clinic';
    if (!formData.start) newErrors.start = 'Please select a start date and time';
    if (!formData.reason.trim()) newErrors.reason = 'Please enter a reason for the appointment';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const appointmentData = {
        ...formData,
        start: { dateTime: formData.start.toISOString(), timeZone: 'UTC' },
      };
      const response = await axios.post('http://localhost:5000/api/appointments', appointmentData);
      setAppointments([...appointments, response.data]);
      setMessage('Appointment created successfully');
      resetForm();
    } catch (error) {
      console.error('Error submitting appointment:', error);
      setMessage(error.response?.data?.message || 'Error submitting appointment');
    }
  };

  const resetForm = () => {
    setFormData({
      patientId: '670354b793f416224daa6321',
      doctorId: '',
      clinicId: '',
      start: null,
      reason: '',
      notes: '',
      type: 'in-person',
      customerTimeZone: 'America/New_York',
      smsNotificationsEnabled: true
    });
    setErrors({});
  };

  const generateTimeSlots = () => {
    let slots = [];
    for (let hour = 9; hour < 17; hour++) {
      for (let minute of ['00', '30']) {
        slots.push(new Date(0, 0, 0, hour, parseInt(minute)));
      }
    }
    return slots;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.sectionTitle}>Appointment Management</h2>
      
      {message && <p style={styles.message}>{message}</p>}

      <div>
        <label>First Name:</label>
        <span>{patientDetails.firstname}</span>
        <label>Last Name:</label>
        <span>{patientDetails.lastname}</span>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <select
          name="clinicId"
          value={formData.clinicId}
          onChange={handleInputChange}
          style={styles.input}
        >
          <option value="">Select Clinic</option>
          {clinics.map(clinic => (
            <option key={clinic._id} value={clinic._id}>{clinic.name}</option>
          ))}
        </select>
        {errors.clinicId && <span style={styles.error}>{errors.clinicId}</span>}

        <select
          name="doctorId"
          value={formData.doctorId}
          onChange={handleInputChange}
          style={styles.input}
        >
          <option value="">Select Doctor</option>
          {doctors.map(doctor => (
            <option key={doctor._id} value={doctor._id}>{`${doctor.firstName} ${doctor.lastName}`}</option>
          ))}
        </select>
        {errors.doctorId && <span style={styles.error}>{errors.doctorId}</span>}

        <DatePicker
          selected={formData.start}
          onChange={handleDateChange}
          showTimeSelect
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          minTime={new Date(0, 0, 0, 9, 0)}
          maxTime={new Date(0, 0, 0, 17, 0)}
          includeTimes={generateTimeSlots()}
          placeholderText="Select Start Date and Time"
          style={styles.input}
        />
        {errors.start && <span style={styles.error}>{errors.start}</span>}

        <input
          type="text"
          placeholder="Reason for Appointment"
          name="reason"
          value={formData.reason}
          onChange={handleInputChange}
          style={styles.input}
        />
        {errors.reason && <span style={styles.error}>{errors.reason}</span>}
        
        <textarea
          placeholder="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          style={{ ...styles.textarea }}
        />
        
        <button type="submit" style={styles.button}>
          Create Appointment
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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{`${appointment.patientId.firstname} ${appointment.patientId.lastname}`}</td>
              <td>{`${appointment.doctorId.firstName} ${appointment.doctorId.lastName}`}</td>
              <td>{appointment.clinicId.name}</td>
              <td>{new Date(appointment.start.dateTime).toLocaleString()}</td>
              <td>{appointment.status}</td>
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
  error: {
    color: 'red',
    fontSize: '14px',
  },
  message: {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#e4f0fe',
    borderRadius: '5px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
};

export default AppointmentManagement;