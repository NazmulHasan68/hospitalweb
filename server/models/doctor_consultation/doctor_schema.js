import mongoose from 'mongoose';

// Schema for a single work experience entry
const experienceSchema = new mongoose.Schema({
  hospitalName: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date }, // optional, for current jobs endDate can be null
  yearsOfExperience: { type: Number, required: true },
}, { _id: false }); // disable _id for subdocuments if not needed

// Main Doctor schema
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  degree: { type: String, required: true },
  bio: { type: String, default: '' },
  photo: { type: String, default: '' }, // URL or filepath to photo
  cv: { type: String, default: '' }, // URL or filepath to CV/document (PDF etc)
  experiences: {
    type: [experienceSchema],
    default: [],
  }
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;

