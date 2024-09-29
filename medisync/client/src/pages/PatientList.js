import React, { useEffect, useState } from 'react';
import { getPatients } from '../services/api';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await getPatients();
      setPatients(data);
    };

    fetchPatients();
  }, []);

  return (
    <div>
      <h2>Patients List</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient._id}>
            {patient.firstName} {patient.lastName} - {patient.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
