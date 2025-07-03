// models/DoctorBanner.js
import mongoose from 'mongoose';

const doctorBannerSchema = new mongoose.Schema({
  banner: { type: String, required: true },
  title: { type: String },
  subtitle: { type: String },
}, {
  timestamps: true,
});

const DoctorBanner = mongoose.model('DoctorBanner', doctorBannerSchema);
export default DoctorBanner;