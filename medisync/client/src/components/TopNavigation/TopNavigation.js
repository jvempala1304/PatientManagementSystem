import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/global.css';
const TopNavigation = () => {
  const location = useLocation();
  return (
    <nav style={styles.navbar}>
      <div className="logo">
        <p>Pharmacy</p>
      </div>
      <div style={styles.menu}>
        <ul style={styles.ul}>
          <li
            style={
              location.pathname === '/'
                ? { ...styles.li, ...styles.active }
                : styles.li
            }
          >
            <Link to="/" style={styles.link}>
              Home
            </Link>
            {location.pathname === '/' && <div style={styles.underline} />}
          </li>
          <li
            style={
              location.pathname === '/login'
                ? { ...styles.li, ...styles.active }
                : styles.li
            }
          >
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            {location.pathname === '/login' && <div style={styles.underline} />}
          </li>
        </ul>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    width: '100%',
    height: '70px',
    background: 'var(--color-background)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '0 5%',
    display: 'flex',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ul: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  li: {
    position: 'relative',
    padding: '0 45px',
    fontWeight: 500,
    fontSize: '19px',
    cursor: 'pointer',
    color: 'var(--color-top-background)',
    transition: 'color 0.3s ease',
  },
  active: {
    color: 'var(--color-active-background)',
    fontWeight: 'bold',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  underline: {
    position: 'absolute',
    bottom: '-7px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '40px',
    height: '3px',
    borderRadius: '1.5px',
    backgroundColor: 'var(--color-active-background)',
    transition: 'opacity 0.3s ease',
  },
};

export default TopNavigation;
