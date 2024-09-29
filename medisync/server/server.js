const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// API to insert a user profile
app.post('/api/users', async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      age,
      sex,
      address,
      streetName,
      city,
      postalCode,
      province,
      insuranceNumber
    } = req.body;

    const newUser = new User({
      firstname,
      lastname,
      email,
      phone,
      age,
      sex,
      address,
      streetName,
      city,
      postalCode,
      province,
      insuranceNumber
    });

    await newUser.save();
    res.status(201).json({ message: 'User profile created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user profile:', error);
    res.status(400).json({ message: 'Error creating user profile', error: error.message });
  }
});

// API to view a user profile by email or phone
app.get('/api/users', async (req, res) => {
  try {
    const { email, phone } = req.query;
    const query = email ? { email } : phone ? { phone } : {};
    
    const user = await User.findOne(query);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
