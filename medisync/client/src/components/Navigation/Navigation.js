import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.png';
import '../../styles/global.css';
const Navigation = () => (
  <nav style={styles.navbar}>
    <div className="logo">Pharmacy</div>
    <ul style={styles.navLinks}>
      <li>
        <Link to="/" style={styles.link}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/patient-list" style={styles.link}>
          Patient List
        </Link>
      </li>
      <li>
        <Link to="/" style={styles.link}>
          Appointment Management
        </Link>
      </li>
      <li>
        <Link to="/login" style={styles.link}>
          Logout
        </Link>
      </li>
    </ul>
    <div style={styles.userIcon}>
      <img src={avatar} alt="avater" />
    </div>
  </nav>
);

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '70px',
    background: 'var(--color-background)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '0 5%',
    boxSizing: 'border-box',
  },
  navLinks: {
    display: 'flex',
    gap: '15px',
    listStyle: 'none',
  },
  link: {
    textDecoration: 'none',
    color: 'var(--color-active-background)',
    fontSize: '19px',
    padding: '0 45px',
    fontWeight: 500,
  },
  userIcon: {
    fontSize: '20px',
  },
};

export default Navigation;
