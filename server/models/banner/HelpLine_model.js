// models/HelpLine.js
import mongoose from 'mongoose';

const helpLineSchema = new mongoose.Schema({
  banner: { type: String, required: true },
  title: { type: String },
  subtitle: { type: String },
}, {
  timestamps: true,
});

const HelpLine = mongoose.model('HelpLine', helpLineSchema);
export default HelpLine;