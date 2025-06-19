import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  religion: {
    type: String,
    enum: ['Islam', 'Hindu', 'Others'],
  },
  district: {
    type: String,
  },
  permanentAddress: {
    type: String,
  },
  presentAddress: {
    type: String,
  },
  familyNumber: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  cv: {
    type: String, // file path or URL
  },
  photo: {
    type: String, // file path or URL
  },
  department: {
    type: String,
    enum: ['medicine', 'travel', 'consultation', 'homio', 'others'],
  },
  position: {
    type: String,
    enum: ['manager', 'senior', 'junior', 'assistant', 'intern', 'executive'],
  },
  salary: {
    type: String,
  },
  joiningDate: {
    type: Date,
  },
  leavingDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
