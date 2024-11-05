import React from 'react';
import advil from '../../assets/advil.webp';
const Search = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.searchBar}>
          <input type="text" placeholder="Advil" style={styles.searchInput} />
          <button style={styles.searchButton}>Search</button>
        </div>

        <div style={styles.card}>
          <img src={advil} alt="Medication" style={styles.medicationImage} />
          <div style={styles.medicationInfo}>
            <p>
              <span style={styles.text}>Medication Name:</span>{' '}
              <span style={styles.underline}>Tylenol</span>
            </p>
            <p>
              <span style={styles.text}>Dosage:</span>{' '}
              <span style={styles.underline}>1 tablet</span>
            </p>
            <p>
              <span style={styles.text}>Frequency:</span>{' '}
              <span style={styles.underline}>Three times a day</span>
            </p>
            <p>
              <span style={styles.text}>Duration:</span>{' '}
              <span style={styles.underline}>One week</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
const styles = {
  container: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgb(234, 244, 254)',
    Height: 'calc(100vh - 120px)',
    minHeight: 'calc(100vh - 160px)',
    fontFamily: 'Arial, sans-serif',
  },
  content: {
    backgroundColor: '#F6F9FE',
    width: '98%',
    height: '95%',
    boxSizing: 'border-box',
    minHeight: 'calc(100vh - 160px)',
    padding: '40px 150px',
    borderRadius: '15px',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    overflow: 'hidden',
    width: '63%',
  },
  searchInput: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    border: 'none',
    outline: 'none',
  },
  searchButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: 'rgb(56,147,228)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
  },
  card: {
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    width: '60%',
  },
  medicationImage: {
    width: '25%',
    height: '25%',
    borderRadius: '8px',
    marginRight: '30px',
    paddingLeft: '20px',
  },
  medicationInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginLeft: '40px',
  },
  text: {
    color: '#666',
    fontSize: '19px',
  },
  underline: {
    display: 'inline-block',
    borderBottom: '1px solid #ccc',
    paddingBottom: '2px',
    width: '150px',
    color: '#7a7a7a',
    fontSize: '18px',
    textAlign: 'center',
  },
};
export default Search;
