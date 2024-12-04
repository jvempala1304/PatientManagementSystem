import React from 'react';

const OpenModal = ({
  isOpen,
  onClose,
  currentAppointmentTimes,
  newAppointmentStartTime,
  newAppointmentEndTime,
  onChangeStartTime,
  onChangeEndTime,
  onSave,
}) => {
  if (!isOpen) return null;
  const { start, end } = currentAppointmentTimes;
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={styles.modalBody}>
          <p style={styles.modalTitle}>Change Appointment Times</p>
          <p>
            <strong style={styles.Time}>Current Start Time:</strong> {start}
          </p>
          <p>
            <strong style={styles.Time}>Current &nbsp;End&nbsp; Time:</strong>{' '}
            {end}
          </p>
          <label style={styles.label}>
            New Start Time:
            <input
              type="datetime-local"
              value={newAppointmentStartTime}
              onChange={(e) => onChangeStartTime(e.target.value)}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            New End Time:
            <input
              type="datetime-local"
              value={newAppointmentEndTime}
              onChange={(e) => onChangeEndTime(e.target.value)}
              style={styles.input}
            />
          </label>
        </div>

        <div style={styles.buttonGroup}>
          <button onClick={onSave} style={styles.saveButton}>
            Save
          </button>
          <button onClick={onClose} style={styles.closeButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    background: 'white',
    padding: '15px 20px',
    borderRadius: '2px',
    width: '450px',
  },
  modalTitle: {
    fontSize: '18px',
    color: '#303133',
  },
  modalBody: {
    marginTop: '20px',
    marBottom: '20px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  label: {
    display: 'block',
    margin: '10px 0',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  input: {
    marginTop: '5px',
    padding: '10px',
    width: '90%',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  buttonGroup: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  saveButton: {
    padding: '10px 20px',
    color: 'rgb(56, 147, 227)',
    backgroundColor: '#e4f0fe',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  closeButton: {
    padding: '10px 20px',
    color: 'rgb(56, 147, 227)',
    backgroundColor: '#e4f0fe',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  Time: {
    display: 'inline-block',
    width: '145px',
  },
};

export default OpenModal;
