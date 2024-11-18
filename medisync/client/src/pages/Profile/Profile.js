import React from 'react';
import { Navigation, Footer, PatientProfile } from '../../components';

const Profile = ({ patient }) => { 
  return (
    <div>
      <Navigation />
      <PatientProfile patient={patient} /> 
      <Footer />
    </div>
  );
};

export default Profile;