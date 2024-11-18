import React from 'react';
import { Navigation, Footer } from '../../components';
import PrescriptionManagementComponent from '../../components/PrescriptionManagement/PrescriptionManagement';

const PrescriptionManagementPage = () => {
  return (
    <div>
      <Navigation />
      <PrescriptionManagementComponent />
      <Footer />
    </div>
  );
};

export default PrescriptionManagementPage;