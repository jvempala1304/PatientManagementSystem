import React from 'react';
import { Navigation, Footer } from '../../components';
import Prescriptions from '../../components/PrescriptionManagement/PrescriptionManagement';

const PrescriptionManagementPage = () => {
  return (
    <div>
      <Navigation />
      <Prescriptions />
      <Footer />
    </div>
  );
};

export default PrescriptionManagementPage;