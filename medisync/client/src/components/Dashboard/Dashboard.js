import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OpenModal from '../OpenModal/OpenModal';
import {
  getAppointments,
  getAppointment,
  updateAppointment,
} from '../../services/api';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAppointmentStartTime, setNewAppointmentStartTime] = useState('');
  const [newAppointmentEndTime, setNewAppointmentEndTime] = useState('');
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (selectedPatient) {
      navigate('/prescription-management', {
        state: { patientData: selectedPatient },
      });
    } else {
      alert('Please select a patient first.');
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      const data = await getAppointments();
      const updatedPatients = data.map((patient) => ({
        ...patient,
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        age: Math.floor(Math.random() * 8) + 18,
      }));

      // console.log(updatedPatients);
      setPatients(updatedPatients);
    };

    fetchAppointments();
  }, []);

  const handlePatientClick = async (patientId) => {
    const patientData = await getAppointment(patientId);
    const updatedPatientData = {
      ...patientData,
      gender: patientData.gender || (Math.random() > 0.5 ? 'Male' : 'Female'),
      age: patientData.age || Math.floor(Math.random() * 8) + 18,
    };
    setSelectedPatient(updatedPatientData);
    console.log(updatedPatientData);
  };

  const openModal = () => {
    if (!selectedPatient) {
      alert('Please select an appointment first.');
      return;
    }
    setNewAppointmentStartTime(selectedPatient.start.dateTime || '');
    setNewAppointmentEndTime(selectedPatient.end.dateTime || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewAppointmentStartTime('');
    setNewAppointmentEndTime('');
  };

  const handleSave = async () => {
    if (!newAppointmentStartTime || !newAppointmentEndTime) {
      alert('Please select both start and end times.');
      return;
    }
    if (newAppointmentStartTime > newAppointmentEndTime) {
      alert('Start time cannot be greater than end time.');
      return;
    }
    await updateAppointment(selectedPatient._id, {
      start: { dateTime: newAppointmentStartTime, timeZone: 'UTC' },
      end: { dateTime: newAppointmentEndTime, timeZone: 'UTC' },
    });
    alert('Appointment updated successfully.');
    closeModal();
    const updatedAppointments = await getAppointments();
    setPatients(updatedAppointments);
  };
  return (
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
                onClick={() => handlePatientClick(patient._id)}
              >
                <td style={styles.cell}>
                  {String(index + 1).padStart(3, '0')}
                </td>
                <td style={styles.cell}>
                  {patient.patientId.lastname} {patient.patientId.firstname}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.patientInfo}>
        <h2 style={styles.sectionTitle}>Patient Information 🩺</h2>
        <form style={styles.form}>
          <input
            type="text"
            placeholder="patient's name"
            style={styles.input}
            value={
              selectedPatient
                ? `${selectedPatient.patientId.lastname} ${selectedPatient.patientId.firstname}`
                : ''
            }
            readOnly
          />
          <input
            type="text"
            placeholder="patient's age"
            style={styles.input}
            value={selectedPatient?.age || ''}
            readOnly
          />
          <input
            type="text"
            placeholder="patient's gender"
            style={styles.input}
            value={selectedPatient?.gender || ''}
            readOnly
          />
          <input
            type="text"
            placeholder="Appointment Start Time"
            style={styles.input}
            value={
              new Date(selectedPatient?.start?.dateTime).toLocaleString() || ''
            }
            readOnly
          />
          <input
            type="text"
            placeholder="Appointment End Time"
            style={styles.input}
            value={
              new Date(selectedPatient?.end?.dateTime).toLocaleString() || ''
            }
            readOnly
          />

          <textarea
            placeholder="Description of the condition"
            style={styles.textarea}
            value={selectedPatient?.reason || ''}
            readOnly
          ></textarea>
          <div style={styles.buttonGroup}>
            <button
              type="button"
              style={styles.button}
              onClick={handleButtonClick}
            >
              Generate prescription
            </button>
            <button type="button" style={styles.button} onClick={openModal}>
              Change appointment time
            </button>
          </div>
        </form>
      </div>
      <OpenModal
        isOpen={isModalOpen}
        onClose={closeModal}
        currentAppointmentTimes={{
          start: new Date(selectedPatient?.start?.dateTime).toLocaleString(),
          end: new Date(selectedPatient?.end?.dateTime).toLocaleString(),
        }}
        newAppointmentStartTime={newAppointmentStartTime}
        newAppointmentEndTime={newAppointmentEndTime}
        onChangeStartTime={setNewAppointmentStartTime}
        onChangeEndTime={setNewAppointmentEndTime}
        onSave={handleSave}
      />
    </main>
  );
};

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
    cursor: 'pointer',
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
