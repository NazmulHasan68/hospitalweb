import mongoose from "mongoose";

const MedicineSchema = new mongoose.Schema(
  {
    // Basic information
    name: { type: String, required: true },
    brand: { type: String },
    description: { type: String },
    images: [{ type: String }], // <-- multiple image URLs

    // Classification
    category: { type: String, required: true },
    country: { type: String },
    company: { type: String },

    // Pricing and stock
    price: { type: Number, required: true },
    discount: { type: Number },
    stock: { type: Number, required: true },

    // Expiry & warnings
    expiryDate: { type: Date },
    warning: { type: String }, // renamed from "worring"

    // Regulatory
    prescriptionRequired: { type: Boolean, default: false },

    // Metadata
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Medicine = mongoose.model("Medicine", MedicineSchema);

export default Medicine;
