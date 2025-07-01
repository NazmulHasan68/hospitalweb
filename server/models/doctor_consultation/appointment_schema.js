import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    weight: {
      type: String, // You may use Number if strictly numeric
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    messages: [
      {
        sender: { type: String, enum: ['patient', 'doctor'] },
        subject: String,
        message: String,
        timestamp: { type: Date, default: Date.now }
      }
    ],
    appointmentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['wating', 'cancelled', 'meeting', 'completed'],
      default: 'wating',
    },
    notes: {
      type: String,
    },
    reports: [
      {
        type: String, 
      },
    ],
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
