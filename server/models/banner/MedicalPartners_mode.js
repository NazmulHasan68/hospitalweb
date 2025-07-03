import mongoose from 'mongoose';

const medicalPartnersSchema = new mongoose.Schema({
  banner: { type: String, required: true },
  title: { type: String, required: true },
  link: { type: String },
}, {
  timestamps: true,
});

const MedicalPartners = mongoose.model('MedicalPartners', medicalPartnersSchema);
export default MedicalPartners;
