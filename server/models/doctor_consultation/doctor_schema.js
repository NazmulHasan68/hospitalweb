import mongoose from "mongoose";

// Sub-schema for a single work experience
const experienceSchema = new mongoose.Schema(
  {
    hospitalName: { type: String },
    position: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    yearsOfExperience: { type: Number },
  },
  { _id: false }
);

// Helper function to check if current time is within 2 hours before checkup start time on any valid checkup day
function isWithinNext2HoursUntilEnd(checkupDateArray, checkupStartTime, checkupEndTime) {
  if (!checkupDateArray?.length || !checkupStartTime || !checkupEndTime) return false;

  const now = new Date();
  const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const today = dayNames[now.getDay()];

  if (!checkupDateArray.includes(today)) return false;

  // Parse times "HH:mm"
  const [startHour, startMinute] = checkupStartTime.split(':').map(Number);
  const [endHour, endMinute] = checkupEndTime.split(':').map(Number);

  // Create Date objects for start and end times today
  const startDateTime = new Date(now);
  startDateTime.setHours(startHour, startMinute, 0, 0);

  const endDateTime = new Date(now);
  endDateTime.setHours(endHour, endMinute, 0, 0);

  // Calculate 2 hours before start time
  const twoHoursBeforeStart = new Date(startDateTime.getTime() - 2 * 60 * 60 * 1000);

  // Check if now is between twoHoursBeforeStart and endDateTime (inclusive)
  return now >= twoHoursBeforeStart && now <= endDateTime;
}


// Main doctor schema
const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String },
    hospital: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true },

    fees: { type: Number },
    recheckFees: { type: Number, default: 0 },

    age: { type: Number },
    experience: { type: Number }, // total years

    // Array of allowed day strings, e.g. ['mon', 'wed']
    checkupDate: [{ type: String, enum: ['sun','mon','tue','wed','thu','fri','sat'] }],
    checkupType: { type: String, enum: ['online', 'in-person', 'both'] },
    checkupStartTime: { type: String }, // Format "HH:mm"
    checkupEndTime: { type: String },

    isActive: { type: Boolean, default: false },
    isFree: { type: Boolean, default: false },
    category: { type: String },
    isAvailableToday: { type: Boolean, default: false },
    next2hr: { type: Boolean, default: false },

    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalCheckupPatients: { type: Number, default: 0 },

    homeCheckup: { type: String },
    homeCheckupfess: { type: Number },

    popular: { type: Boolean, default: false },
    suggested: { type: Boolean, default: false },

    degree: [{ type: String }],
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

// Pre-save hook: update next2hr automatically before saving
doctorSchema.pre('save', function(next) {
  this.next2hr = isWithinNext2HoursUntilEnd(this.checkupDate, this.checkupStartTime, this.checkupEndTime);
  next();
});

// Compile model
const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
