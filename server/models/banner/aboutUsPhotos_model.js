// models/AboutUsPhotos.js
import mongoose from 'mongoose';

const aboutUsPhotosSchema = new mongoose.Schema({
  banner: { type: String, required: true },
  title: { type: String },
  subtitle: { type: String },
}, {
  timestamps: true,
});

const AboutUsPhotos = mongoose.model('AboutUsPhotos', aboutUsPhotosSchema);
export default AboutUsPhotos;