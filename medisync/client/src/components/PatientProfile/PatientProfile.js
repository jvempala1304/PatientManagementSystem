import React, { useEffect, useState } from 'react';

const PatientProfile = ({ patientId }) => {
  const [formData, setFormData] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [errors, setErrors] = useState({});
  const [updateError, setUpdateError] = useState('');

  // Fetch patient data on component mount
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const patientId = '67329a2e79b02d4c94aa478a';
        const response = await fetch(`http://localhost:5000/api/patients?id=${patientId}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, [patientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validation logic
    if (!formData.firstname?.trim()) {
      newErrors.firstname = 'First name is required';
      isValid = false;
    }
    if (!formData.lastname?.trim()) {
      newErrors.lastname = 'Last name is required';
      isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email?.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
      isValid = false;
    }
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone?.trim() || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Valid 10-digit phone number is required';
      isValid = false;
    }
    if (!formData.age || formData.age < 0 || formData.age > 120) {
      newErrors.age = 'Valid age between 0 and 120 is required';
      isValid = false;
    }
    if (!formData.sex) {
      newErrors.sex = 'Sex is required';
      isValid = false;
    }
    if (!formData.address?.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }
    if (!formData.city?.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }
    if (!formData.province?.trim()) {
      newErrors.province = 'Province is required';
      isValid = false;
    }
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
    if (!formData.postalCode?.trim() || !postalCodeRegex.test(formData.postalCode)) {
      newErrors.postalCode = 'Valid postal code (e.g., A1A 1A1) is required';
      isValid = false;
    }
    if (!formData.insuranceNumber?.trim()) {
      newErrors.insuranceNumber = 'Insurance number is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(`http://localhost:5000/api/patients/${formData._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const updatedPatient = await response.json();
          setFormData(updatedPatient);
          setIsEditable(false);
          setUpdateError('');
        } else {
          throw new Error('Failed to update profile');
        }
      } catch (error) {
        console.error('Error updating patient data:', error);
        setUpdateError('Failed to update profile. Please try again.');
      }
    } else {
      console.log('Form has errors');
    }
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
    setErrors({});
  };

  return (
    <main style={styles.main}>
      <div style={styles.profileCard}>
        <p style={styles.text}>Patient Profile</p>
        {updateError && <span style={styles.error}>{updateError}</span>}
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <input 
              type="text" 
              name="firstname" 
              value={formData.firstname || ''} 
              onChange={handleChange} 
              disabled={!isEditable} 
              style={styles.input}
              placeholder="First Name"
            />
            {errors.firstname && <span style={styles.error}>{errors.firstname}</span>}
          </div>
          <div style={styles.formGroup}>
            <input 
              type="text" 
              name="lastname" 
              value={formData.lastname || ''} 
              onChange={handleChange} 
              disabled={!isEditable} 
              style={styles.input}
              placeholder="Last Name"
            />
            {errors.lastname && <span style={styles.error}>{errors.lastname}</span>}
          </div>
          <div style={styles.formGroup}>
            <input 
              type="email" 
              name="email" 
              value={formData.email || ''} 
              onChange={handleChange} 
              disabled={!isEditable} 
              style={styles.input}
              placeholder="Email"
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>
          <div style={styles.formGroup}>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone || ''} 
              onChange={handleChange} 
              disabled={!isEditable} 
              style={styles.input}
              placeholder="Phone"
            />
            {errors.phone && <span style={styles.error}>{errors.phone}</span>}
          </div>
          <div style={styles.formGroup}>
            <input 
              type="number" 
              name="age" 
              value={formData.age || ''} 
              onChange={handleChange} 
              disabled={!isEditable} 
              style={styles.input}
              placeholder="Age"
            />
            {errors.age && <span style={styles.error}>{errors.age}</span>}
          </div>
          <div style={styles.formGroup}>
            <select 
              name="sex" 
              value={formData.sex || ''} 
              onChange={handleChange} 
              disabled={!isEditable} 
              style={{...styles.input, cursor: isEditable ? 'pointer' : 'not-allowed'}}
            >
              <option value="">Select Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.sex && <span style={styles.error}>{errors.sex}</span>}
          </div>
          <div style={styles.formGroup}>
            <input 
              type="text" 
              name="address" 
              value={formData.address || ''} 
              onChange={handleChange}  
              disabled={!isEditable}  
              style={styles.input}
              placeholder="Address"
            />
            {errors.address && <span style={styles.error}>{errors.address}</span>}
          </div>
          <div style={styles.formGroup}>
            <input 
              type="text" 
              name="city" 
              value={formData.city || ''} 
              onChange={handleChange} 
              disabled={!isEditable} 
              style={styles.input}
              placeholder="City"
            />
            {errors.city && <span style={styles.error}>{errors.city}</span>}
          </div>
          <div style={styles.formGroup}>
            <input 
              type="text" 
              name="province" 
              value={formData.province || ''} 
              onChange={handleChange} 
              disabled={!isEditable} 
              style={styles.input}
              placeholder="Province"
            />
            {errors.province && <span style={styles.error}>{errors.province}</span>}
          </div>
          <div style={styles.formGroup}>
            <input 
              type="text" 
              name="postalCode" 
              value={formData.postalCode || ''} 
              onChange={handleChange} 
              disabled={!isEditable} 
              style={styles.input}
              placeholder="Postal Code"
            />
            {errors.postalCode && <span style={styles.error}>{errors.postalCode}</span>}
          </div>
          <div style={styles.formGroup}>
            <input 
              type="text" 
              name="insuranceNumber" 
              value={formData.insuranceNumber || ''}  
               onChange={handleChange}  
               disabled={!isEditable}  
               style={styles.input}
               placeholder="Insurance Number"
             />
             {errors.insuranceNumber && <span style={styles.error}>{errors.insuranceNumber}</span>}
           </div>
           {isEditable && (
             <div style={styles.btns}>
               <button type="submit" style={styles.btn}>
                 Save Changes
               </button>
             </div>
           )}
         </form>
         {!isEditable && (
           <div style={styles.btns}>
             <button onClick={toggleEdit} style={styles.btn}>
               Update Profile
             </button>
           </div>
         )}
       </div>
     </main>
   );
};

const styles = {
   main: {
     boxSizing: "border-box",
     minHeight: "calc(100vh - 120px)",
     width: "100%",
     padding: "3% 8%",
     background: "rgb(234, 244, 254)",
     display: "flex",
     justifyContent: "center",
     alignItems: "center",
   },
   profileCard: {
     width: "750px",
     background: "rgba(255, 255, 255, 0.3)",
     borderRadius: "15px",
     backdropFilter: "blur(10px)",
     boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
     padding: "20px",
     border: "1px solid rgba(255, 255, 255, 0.5)",
   },
   text: {
     color: "rgb(112, 112, 112)",
     textAlign: "center",
     fontSize: "23px",
     fontWeight: 600,
     padding: "0 8px",
     marginBottom: "20px",
   },
   formGroup: {
     width: "95%",
     margin: "15px 0",
   },
   input: {
     border: "none",
     width: "100%",
     height: "48px",
     borderRadius: "5px",
     padding: "0 15px",
     fontSize: "16px",
     backgroundColor: "rgba(255, 255, 255, 0.8)",
   },
   btns: {
     width: "100%",
     display: "flex",
     justifyContent: "center",
     marginTop: "20px",
   },
   btn: {
     width: "80%",
     height: "50px",
     color: "rgb(56, 147, 227)",
     backgroundColor: "#e4f0fe",
     textAlign: "center",
     fontSize: "20px",
     borderRadius: "10px",
     border: "none",
     cursor: "pointer",
   },
   error: {
     color: 'red',
     fontSize: '12px',
     marginTop: '5px',
   },
};

export default PatientProfile;