const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  specialization: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  licenseNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  clinicId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Clinic', 
    required: true 
  },
  availableHours: [{
    day: { 
      type: String, 
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true
    },
    startTime: { 
      type: String, 
      required: true 
    },
    endTime: { 
      type: String, 
      required: true 
    }
  }],
  education: [{
    degree: String,
    institution: String,
    year: Number
  }],
  experience: [{
    position: String,
    hospital: String,
    startYear: Number,
    endYear: Number
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Create a compound index on first name and last name for efficient searching
doctorSchema.index({ firstName: 1, lastName: 1 });

// Create a text index on specialization for text search capabilities
doctorSchema.index({ specialization: 'text' });

module.exports = mongoose.model('Doctor', doctorSchema);