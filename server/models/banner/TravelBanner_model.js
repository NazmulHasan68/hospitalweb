// models/TravelBanner.js
import mongoose from 'mongoose';

const travelBannerSchema = new mongoose.Schema({
  banner: { type: String, required: true },
  title: { type: String },
  subtitle: { type: String },
}, {
  timestamps: true,
});

const TravelBanner = mongoose.model('TravelBanner', travelBannerSchema);
export default TravelBanner;