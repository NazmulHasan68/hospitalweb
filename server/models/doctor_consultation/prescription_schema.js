import mongoose from 'mongoose';

// Medication schema
const medicationSchema = new mongoose.Schema({
  name: { type: String},
  dosage: { type: String },
  duration: { type: String},
  note: String,
});

// Medical test schema
const testSchema = new mongoose.Schema({
  testName: { type: String},
  note: String,
});

// Main prescription schema
const prescriptionSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Snapshot of doctor info at prescription time (optional but useful)
    prescribedBy: {
      name: String,
      designation: String,
    },

    diagnosis: { type: String },
    advice: { type: String },
    followUpDate: { type: Date },

    test: [testSchema],
    medications: [medicationSchema],

    // Optional file attachments (PDF, images)
    attachments: [{ type: String }],

    // Digital signature status
    isSigned: { type: Boolean, default: false },
    signatureUrl: { type: String }, 

    // Draft or Final prescription
    status: {
      type: String,
      enum: ['draft', 'final'],
      default: 'final',
    },
  },
  { timestamps: true }
);

const Prescription = mongoose.model('Prescription', prescriptionSchema);

export default Prescription;
