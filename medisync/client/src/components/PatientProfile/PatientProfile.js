import React, { useState } from 'react';

const PatientProfile = ({ patient }) => {
  const [formData, setFormData] = useState({ ...patient });
  const [isEditable, setIsEditable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    setIsEditable(false);
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div style={styles.layout}>
      <div style={styles.contentWrapper}>
        <main style={styles.mainContent}>
          <div style={styles.profileCard}>
            <div style={styles.imageContainer}>
              <img 
                src={formData.imageUrl || '/images/Patient.jpg'} 
                alt={`${formData.firstname} ${formData.lastname}`} 
                style={styles.profileImage}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/Patient.jpg';
                }}
              />
            </div>
            <form onSubmit={handleSubmit} style={styles.infoContainer}>
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>First Name:</label>
                  <input 
                    type="text" 
                    name="firstname" 
                    value={formData.firstname} 
                    onChange={handleChange} 
                    disabled={!isEditable} 
                    style={styles.input}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Last Name:</label>
                  <input 
                    type="text" 
                    name="lastname" 
                    value={formData.lastname} 
                    onChange={handleChange} 
                    disabled={!isEditable} 
                    style={styles.input}
                  />
                </div>
              </div>
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Email:</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    disabled={!isEditable} 
                    style={styles.input}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Phone:</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    disabled={!isEditable} 
                    style={styles.input}
                  />
                </div>
              </div>
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Age:</label>
                  <input 
                    type="number" 
                    name="age" 
                    value={formData.age} 
                    onChange={handleChange} 
                    disabled={!isEditable} 
                    style={styles.input}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Sex:</label>
                  <select 
                    name="sex" 
                    value={formData.sex} 
                    onChange={handleChange} 
                    disabled={!isEditable} 
                    style={{...styles.input, cursor: isEditable ? 'pointer' : 'not-allowed'}}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Address:</label>
                  <input 
                    type="text" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange}  
                    disabled={!isEditable}  
                    style={styles.input}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Street Name:</label>
                  <input 
                    type="text" 
                    name="streetName" 
                    value={formData.streetName}  
                    onChange={handleChange}  
                    disabled={!isEditable}
                     style={styles.input}
                  />
                </div>
              </div>
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>City:</label>
                  <input
                     type="text"
                     name="city"
                     value= {formData.city}
                     onChange= {handleChange}
                     disabled={!isEditable}
                     styles= { styles.input }
                   />
                </div>
                <div style={{... styles.field}}>
                   <label>Postal Code:</label>
                   <input
                       type="text"
                       name="postalCode"
                       value= {formData.postalCode}
                       onChange= {handleChange}
                       styles= { styles.input }
                       disabled={!isEditable}
                   />
               </div>  
              </div>  
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Province:</label>
                  <input
                      type="text"
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      disabled={!isEditable}
                      style={styles.input}
                   />
                </div>
                <div style={{... styles.field}}>
                   <label>Insurance Number:</label>
                   <input
                       type="text"
                       name="insuranceNumber"
                       value= {formData.insuranceNumber}
                       onChange= {handleChange}
                       styles= { styles.input }
                       disabled={!isEditable}
                   />
               </div>  
              </div>  
              <button type="submit" style={{... styles.button, marginTop: '20px'}}>
                 Submit
              </button>  
            </form>  
            {!isEditable && (
              <button onClick={toggleEdit} style={{... styles.button, marginTop: '20px'}}>
                 Update
              </button>  
            )}
          </div>  
        </main>  
      </div>  
    </div>  
  );
};

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  contentWrapper: {
    display: 'flex',
    flex: 1,
    padding: '20px',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    backgroundColor: 'rgb(234, 244, 254)',
    overflowY: 'auto',
  },
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  profileImage: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid rgb(56, 147, 227)',
  },
  infoContainer: {
    width: '100%',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  field: {
    width: '48%',
  },
  label: {
    color: 'rgb(112, 112, 112)',
    fontSize: '14px',
    marginBottom: '5px',
    display: 'block',
  },
  input: {
     width:'100%',
     padding:'10px',  
     borderRadius:'5px',  
     border:'1px solid #ccc',  
     fontSize:'16px',  
   },   
   button:{
     width:'100%',  
     height:'50px',  
     color:'white',  
     backgroundColor:'#4CAF50',  
     borderRadius:'5px',  
     border:'none',  
     cursor:'pointer',  
   },    
};

export default PatientProfile;