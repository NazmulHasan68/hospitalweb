import mongoose from 'mongoose';

const travelHelpSchema = new mongoose.Schema({
  // Reference to the user who submitted the request
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },

  // Patient information
  patientName: { 
    type: String, 
    required: true 
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  age: { 
    type: Number, 
    required: true 
  },
  medicalCondition: { 
    type: String, 
    required: true 
  },

  // Preferences for treatment location
  preferredCountry: { 
    type: String, 
    required: true 
  },
  preferredCity: {
    type: String
  },
  preferredHospital: {
    type: String
  },

  // Uploaded medical or travel documents (e.g., prescriptions, passport scans)
  documents: [{
    type: String // This should store file URLs or Cloudinary paths
  }],

  // Status tracking for the admin/consultation team
  status: {
    type: String,
    enum: ['pending', 'in-review', 'approved', 'rejected'],
    default: 'pending'
  },

  // Optional notes added by doctors or admins during consultation
  consultationNotes: {
    type: String
  },

  // Timestamp when the request was submitted
  submittedAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const MedicalTravelHelp = mongoose.model('MedicalTravelHelp', travelHelpSchema);

export default MedicalTravelHelp;


