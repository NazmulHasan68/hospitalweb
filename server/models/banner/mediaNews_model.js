// models/MediaNews.js
import mongoose from 'mongoose';

const mediaNewsSchema = new mongoose.Schema({
  video: { type: String, required: true },
  title: { type: String, required: true },
  link: { type: String },
}, {
  timestamps: true,
});

const MediaNews = mongoose.model('MediaNews', mediaNewsSchema);
export default MediaNews;