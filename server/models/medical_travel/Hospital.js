import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  expertise: { type: String, required: true },
  experience: { type: String, required: true },
  age: { type: Number, required: true },
}, { _id: false });

const hospitalSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },

  hospitalName: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  address : {
    type: String,
    required: true,
  },

  established: {
    type: Number,
    required: true,
  },

 type: {
  type: String,
  enum: ['private', 'government'],  // optional, restricts allowed values
  required: true,
},

  beds: {
    type: Number,
    required: true,
  },

  speciality: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  map: {
    type: String, 
    required: false,
  },

  banner: {
    type: String, 
    required: true,
  },

  doctorList: {
    type: [doctorSchema],
    default: [],
  }
}, {
  timestamps: true,
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

export default Hospital;



