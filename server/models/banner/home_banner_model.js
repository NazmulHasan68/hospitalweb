import mongoose from 'mongoose';

const homeSectionSchema = new mongoose.Schema({
  banner: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
}, {
  timestamps: true,
});

const HomeSection = mongoose.model('HomeSection', homeSectionSchema);
export default HomeSection;