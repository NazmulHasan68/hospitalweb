import mongoose from "mongoose";

const helpMessageSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  messages: [
    {
      type: String,
      required: true,
    }
  ]
}, {
  timestamps: true 
});

const HelpMessage = mongoose.model('HelpMessage', helpMessageSchema);
export default HelpMessage


