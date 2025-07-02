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
      type: String, 
      required: true,
    },
    address: {
      type: String,
      required: true,
      default : "Dhaka, Bangladesh",
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
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'cancelled'],
      default: 'pending',
    },
    messages: [
      {
        sender: { type: String, enum: ['patient', 'doctor'], required: true },
        subject: { type: String },
        message: { type: String, required: true },
        photo: [{ type: String }],
        timestamp: { type: Date, default: Date.now },
      }
    ],
    appointmentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['wating', 'cancelled','shedule', 'meeting', 'completed'],
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
    transactionId : {
      type : String
    }
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
