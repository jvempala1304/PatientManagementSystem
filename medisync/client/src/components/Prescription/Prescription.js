import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPrescriptions, createPrescription } from '../../services/api';

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const location = useLocation();
  const data = location.state || {};
  const patientData = data.patientData || {};
  const patient = patientData.patientId || {};
  const clinic = patientData.clinicId || {};
  const doctorId = patientData.doctorId || '';
  const startTime = patientData.start || '';
  const endTime = patientData.end || '';

  const fetchPrescriptions = async () => {
    const prescriptions = await getPrescriptions();
    setPrescriptions(prescriptions);
  };

  const handleCreatePrescription = async () => {
    setIsLoading(true);
    const prescriptionData = {
      medications: [
        {
          name: formData.name,
          dosage: formData.dosage,
          frequency: formData.frequency,
          duration: formData.duration,
        },
      ],
      patientId: patient._id,
      clinicId: clinic._id,
      doctorId: doctorId._id,
      startTime,
      endTime,
      instructions: formData.instructions,
    };

    try {
      await createPrescription(prescriptionData);
      setFormData({
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
      }); // 清空输入框
      setSuccessMessage('Prescription submitted successfully!'); // 显示成功消息
      setTimeout(() => setSuccessMessage(''), 3000); // 3秒后隐藏成功消息
      fetchPrescriptions(); // 重新加载处方列表
    } catch (error) {
      console.error('Error creating prescription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  return (
    <div style={styles.container}>
      {isLoading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingBox}>Submitting...</div>
        </div>
      )}
      <div style={styles.content}>
        {successMessage && (
          <div style={styles.successMessage}>{successMessage}</div>
        )}

        <div style={styles.top}>
          <h2 style={styles.sectionTitle}>📋 Patient Information</h2>
          <div style={styles.patientInfo}>
            <div>
              <span style={styles.text}>Name:</span>
              <span style={styles.underline}>
                {`${patient.firstname || 'N/A'} ${patient.lastname || ''}`}
              </span>
            </div>
            <div>
              <span style={styles.text}>Age:</span>
              <span style={styles.underline}>{patientData.age || 'N/A'}</span>
            </div>
            <div>
              <span style={styles.text}>Gender:</span>
              <span style={styles.underline}>
                {patientData.gender || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <div style={styles.bottom}>
          <h2 style={styles.sectionTitle}>📋 Medication Information</h2>
          <div style={styles.patientInfo}>
            <div>
              <span style={styles.text}>Medication Name:</span>
              <span>
                <input
                  type="text"
                  style={styles.input}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </span>
            </div>
          </div>
          <div style={styles.patientInfo}>
            <div>
              <span style={styles.text}>Dosage:</span>
              <span>
                <input
                  type="text"
                  style={styles.input}
                  value={formData.dosage}
                  onChange={(e) => handleInputChange('dosage', e.target.value)}
                />
              </span>
            </div>
            <div style={styles.left}>
              <span style={styles.text}>Frequency:</span>
              <span>
                <input
                  type="text"
                  style={styles.input}
                  value={formData.frequency}
                  onChange={(e) =>
                    handleInputChange('frequency', e.target.value)
                  }
                />
              </span>
            </div>
          </div>
          <div style={styles.patientInfo}>
            <div>
              <span style={styles.text}>Duration:</span>
              <span>
                <input
                  type="text"
                  style={styles.input}
                  value={formData.duration}
                  onChange={(e) =>
                    handleInputChange('duration', e.target.value)
                  }
                />
              </span>
            </div>
          </div>
          <div style={styles.patientInfo}>
            <div>
              <span style={styles.text}>Medication Notes:</span>
              <span>
                <input
                  type="text"
                  style={styles.inputs}
                  value={formData.instructions}
                  onChange={(e) =>
                    handleInputChange('instructions', e.target.value)
                  }
                />
              </span>
            </div>
          </div>
        </div>

        <div style={styles.bts}>
          <div style={styles.buttonGroup}>
            <button
              type="button"
              style={styles.button}
              onClick={handleCreatePrescription}
              disabled={isLoading}
            >
              Submit Prescription
            </button>
            <button type="button" style={styles.button}>
              Cancel
            </button>
          </div>
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
  top: {
    width: '50%',
  },
  bottom: { width: '50%' },
  left: {
    width: '60%',
  },
  patientInfo: {
    padding: '15px 0 0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: 'rgb(56, 147, 227)',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  text: {
    color: '#666',
    fontSize: '19px',
  },
  underline: {
    display: 'inline-block',
    borderBottom: '1px solid #ccc',
    paddingBottom: '2px',
    width: '200px',
    color: '#7a7a7a',
    fontSize: '18px',
    textAlign: 'center',
  },
  textunderline: {
    textDecoration: 'underline',
    color: '#7a7a7a',
    fontSize: '18px',
    margin: '0 15px',
    textAlign: 'center',
    textDecorationColor: '#ccc',
  },
  bts: {
    width: '50%',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  button: {
    width: '40%',
    height: '40px',
    color: 'rgb(56, 147, 227)',
    backgroundColor: '#e4f0fe',
    marginTop: '10px',
    textAlign: 'center',
    fontSize: '18px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
  },
  input: {
    border: 'none',
    borderBottom: '1px solid #ccc',
    width: '200px',
    otherStyles: 'padding: 7px 0',
    padding: '2px 15px',
    color: '#7a7a7a',
    fontSize: '18px',
    backgroundColor: 'transparent',
  },
  inputs: {
    border: 'none',
    borderBottom: '1px solid #ccc',
    width: '600px',
    otherStyles: 'padding: 5px 0',
    padding: '2px 15px',
    color: '#7a7a7a',
    fontSize: '18px',
    backgroundColor: 'transparent',
  },
};

export default Prescription;
