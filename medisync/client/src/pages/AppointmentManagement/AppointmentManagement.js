import React from 'react';
import { Navigation, Footer } from '../../components';
import AppointmentManagement from '../../components/AppointmentManagement/AppointmentManagement';

const AppointmentManagementPage = () => {
  return (
    <div>
      <Navigation />
      <AppointmentManagement />
      <Footer />
    </div>
  );
};

export default AppointmentManagementPage;