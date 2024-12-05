import React, { useState } from 'react';
const Search = () => {
  const [medicationInfo] = useState({
    name: 'Tylenol',
    dosage: '1 tablet',
    frequency: 'Three times a day',
    duration: 'One week',
  });
  return (
    <div style={styles.container}>
      <div style={styles.layout}>
        <div style={styles.contentWrapper}>
          <main style={styles.mainContent}>
            <div style={styles.profileCard}>
              <form style={styles.infoContainer}>
                <h3 style={styles.title}>🔍 Prescription Search</h3>
                <div style={styles.row}>
                  <div style={styles.field}>
                    <label style={styles.label}>Enter Patient's Name:</label>
                    <input
                      type="text"
                      name="search"
                      placeholder="Enter patient's name"
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.field}>
                    <button style={styles.searchButton}>Search</button>
                  </div>
                </div>

                <h3 style={styles.title}>📋 Medication Information</h3>
                <div style={styles.row}>
                  <div style={styles.field}>
                    <label style={styles.label}>Medication Name:</label>
                    <input
                      type="text"
                      name="name"
                      style={styles.input}
                      defaultValue={medicationInfo.name}
                      disabled
                    />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Duration:</label>
                    <input
                      type="text"
                      name="duration"
                      style={styles.input}
                      defaultValue={medicationInfo.duration}
                      disabled
                    />
                  </div>
                </div>
                <div style={styles.row}>
                  <div style={styles.field}>
                    <label style={styles.label}>Dosage:</label>
                    <input
                      type="text"
                      name="dosage"
                      style={styles.input}
                      defaultValue={medicationInfo.dosage}
                      disabled
                    />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Frequency:</label>
                    <input
                      type="text"
                      name="frequency"
                      style={styles.input}
                      defaultValue={medicationInfo.frequency}
                      disabled
                    />
                  </div>
                </div>
              </form>
            </div>
          </main>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  layout: {
    width: '65%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  contentWrapper: {
    display: 'flex',
    flex: 1,
    padding: '20px',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    backgroundColor: 'rgb(234, 244, 254)',
    overflowY: 'auto',
  },
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    padding: '40px',
    maxWidth: '800px',
    height: '400px',
    margin: '0 auto',
  },
  title: {
    fontSize: '20px',
    color: 'rgb(56, 147, 227)',
    marginBottom: '10px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  field: {
    width: '45%',
  },
  label: {
    color: 'rgb(112, 112, 112)',
    fontSize: '14px',
    marginBottom: '5px',
    display: 'block',
  },
  input: {
    width: '95%',
    padding: '9px 12px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  searchButton: {
    backgroundColor: 'rgb(56, 147, 228)',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    marginTop: '25px',
  },
};

export default Search;
