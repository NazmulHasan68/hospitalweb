import mongoose from "mongoose";

// Sub-schema for a single work experience
const experienceSchema = new mongoose.Schema(
  {
    hospitalName: { type: String, },
    position: { type: String,},
    startDate: { type: Date,},
    endDate: { type: Date },
    yearsOfExperience: { type: Number,  },
  },
  { _id: false }
);

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    hospital : { type: String, required:true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    fees: { type: Number, required: true },
    recheckFees: { type: Number, default: 0 },

    age: { type: Number },
    experience: { type: Number }, // total years

    isActive: { type: Boolean, default: true },
    isFree: { type: Boolean, default: false },
    category: { type: String }, // example: 'general', 'cardiologist' etc.
    isAvailableToday: { type: Boolean, default: false },

    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalCheckupPatients: { type: Number, default: 0 },

    // Instead of single checkupDate, store array of days like ['sun', 'mon']
    checkupDate: [{ type: String, enum: ['sun','mon','tue','wed','thu','fri','sat'] }],
    checkupType: { type: String, enum: ['online', 'in-person', 'both'] },
    checkupStartTime: { type: String }, // "HH:mm" format
    checkupEndTime: { type: String },   // "HH:mm" format

    homeCheckup: { type: String },
    homeCheckupfess: { type: Number },

    popular: { type: Boolean, default: false },
    suggested: { type: Boolean, default: false },

    degree: [{ type: String, required: true }],
    govtLicense: [{ type: String }], 

    bio: { type: String, default: "" },
    photo: { type: String, default: "" }, 
    cv: { type: String, default: "" },    

    experiences: {
      type: [experienceSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
