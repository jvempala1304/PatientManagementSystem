import React from 'react';
import banner from '../../assets/banner.png';
import medal from '../../assets/medal.png';

const Banner = () => {
  return (
    <div style={styles.banner}>
      <div style={styles.bannerLeft}>
        <div>
          <img style={styles.bannerMedal} src={medal} alt="" />
        </div>
        <h1 style={styles.bannerLeftH1}>Best Quality</h1>
        <h2 style={styles.bannerLeftH2}>Medical Appointments</h2>
        <p style={styles.bannerLeftP}>
         Book appointments with trusted doctors and receive prescriptions online. Welcome to our healthcare platform.
        </p>
      </div>
      <div style={styles.bannerRight}>
        <img style={styles.bannerRightImg} src={banner} alt="banner" />
      </div>
    </div>
  );
};

const styles = {
  banner: {
    boxSizing: 'border-box',
    width: '100%',
    height: '90vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#333',
    padding: '0 5%',
  },
  bannerLeft: {
    width: '40%',
    height: '50%',
    margin: '0 5% 0 0',
  },
  bannerMedal: {
    width: '100px',
    height: '100px',
    margin: '15% 0 0 4%',
  },

  bannerLeftH1: {
    fontSize: '1.5rem',
    margin: '0 0 0 5%',
    color: 'rgba(55, 65, 81,0.9)',
  },
  bannerLeftH2: {
    fontSize: '2.8rem',
    margin: '0 0 0 5%',
    color: 'rgba(55, 65, 81,0.9)',
  },
  bannerLeftP: {
    fontSize: '1.2rem',
    margin: '0 0 0 5%',
    color: 'rgba(55, 65, 81,0.9)',
  },
  bannerRight: {
    width: '50%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%',
    margin: '0 5%',
  },
  bannerRightImg: {
    width: '95%',
    height: '85%',
  },
};
export default Banner;
