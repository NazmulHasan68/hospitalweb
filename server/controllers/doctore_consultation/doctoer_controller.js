import Doctor from '../../models/doctor_consultation/doctor_schema.js';
import fs from 'fs';
import path from 'path';

// Helper: delete old file if exists
function deleteFileIfExists(filePath) {
  if (!filePath) return;
  const fullPath = path.join(process.cwd(), 'public', 'doctor', filePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
}

// CREATE Doctor
export const createDoctor = async (req, res) => {
  try {
    const data = req.body;


    if (req.files) {
      if (req.files.photo) data.photo = req.files.photo[0].filename;
      if (req.files.cv) data.cv = req.files.cv[0].filename;
      if (req.files.govtLicense) {
        // assume multiple govtLicense files
        data.govtLicense = req.files.govtLicense.map(f => f.filename);
      }
    }

    // Parse degrees and other arrays if sent as JSON strings
    if (typeof data.degree === 'string') data.degree = JSON.parse(data.degree);
    if (typeof data.govtLicense === 'string') data.govtLicense = JSON.parse(data.govtLicense);
    if (typeof data.checkupDate === 'string') data.checkupDate = JSON.parse(data.checkupDate);

    const doctor = new Doctor(data);
    await doctor.save();
    res.status(201).json({ message: 'Doctor created', doctor });
  } catch (error) {
    console.error('Create doctor error:', error);
    res.status(500).json({ error: 'Server error creating doctor' });
  }
};

// GET all doctors
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ error: 'Server error fetching doctors' });
  }
};



export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).lean();

    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    doctor.photo = doctor.photo || null;
    doctor.cv = doctor.cv || null;
    doctor.govtLicense = Array.isArray(doctor.govtLicense)
      ? doctor.govtLicense.map(file => file)
      : [];

    res.json(doctor);
  } catch (error) {
    console.error('Get doctor by ID error:', error);
    res.status(500).json({ error: 'Server error fetching doctor' });
  }
};







// UPDATE doctor by ID
export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    const data = req.body;

    // Helper: safely parse JSON fields with fallback
    const parseField = (field, fallback = []) => {
      try {
        return typeof field === 'string' ? JSON.parse(field) : field;
      } catch {
        return fallback;
      }
    };

    // Parse fields that are arrays or objects
    data.degree = parseField(data.degree, doctor.degree);
    data.govtLicense = parseField(data.govtLicense, doctor.govtLicense);
    data.checkupDate = parseField(data.checkupDate, doctor.checkupDate);
    data.experiences = parseField(data.experiences, doctor.experiences);

    // Clean degree array (remove empty or invalid strings)
    if (!Array.isArray(data.degree)) {
      data.degree = doctor.degree || [];
    } else {
      data.degree = data.degree.filter(d => typeof d === 'string' && d.trim() !== '');
      if (data.degree.length === 0) data.degree = doctor.degree || [];
    }

    // Convert fields to numbers safely, fallback to old values if invalid
    const toNumberOrFallback = (val, fallback) => {
      const num = Number(val);
      return !isNaN(num) ? num : fallback;
    };

    data.age = toNumberOrFallback(data.age, doctor.age);
    data.experience = toNumberOrFallback(data.experience, doctor.experience);
    data.fees = toNumberOrFallback(data.fees, doctor.fees);
    data.recheckFees = toNumberOrFallback(data.recheckFees, doctor.recheckFees);
    data.homeCheckupfess = toNumberOrFallback(data.homeCheckupfess, doctor.homeCheckupfess);

    // Booleans - ensure correct boolean conversion
    data.isFree = (data.isFree === 'true' || data.isFree === true) ?? doctor.isFree;
    data.isAvailableToday = (data.isAvailableToday === 'true' || data.isAvailableToday === true) ?? doctor.isAvailableToday;

    // Strings - fallback to existing doctor data if missing
    data.name = data.name ?? doctor.name;
    data.email = data.email ?? doctor.email;
    data.phone = data.phone ?? doctor.phone;
    data.specialization = data.specialization ?? doctor.specialization;
    data.hospital = data.hospital ?? doctor.hospital;
    data.homeCheckup = data.homeCheckup ?? doctor.homeCheckup;
    data.category = data.category ?? doctor.category;
    data.checkupType = data.checkupType ?? doctor.checkupType;
    data.checkupStartTime = data.checkupStartTime ?? doctor.checkupStartTime;
    data.checkupEndTime = data.checkupEndTime ?? doctor.checkupEndTime;
    data.bio = data.bio ?? doctor.bio;

    // Handle file uploads - delete old files and assign new filenames
    if (req.files) {
      if (req.files.photo && req.files.photo.length) {
        if (doctor.photo) await deleteFileIfExists(doctor.photo);
        data.photo = req.files.photo[0].filename;
      }

      if (req.files.cv && req.files.cv.length) {
        if (doctor.cv) await deleteFileIfExists(doctor.cv);
        data.cv = req.files.cv[0].filename;
      }

      if (req.files.govtLicense && req.files.govtLicense.length) {
        if (doctor.govtLicense && doctor.govtLicense.length) {
          for (const file of doctor.govtLicense) {
            await deleteFileIfExists(file);
          }
        }
        data.govtLicense = req.files.govtLicense.map(f => f.filename);
      }
    }

    // Assign updated data to doctor document
    Object.assign(doctor, data);

    await doctor.save();

    res.json({ message: 'Doctor updated', doctor });
  } catch (error) {
    console.error('Update doctor error:', error);
    res.status(500).json({ error: 'Server error updating doctor' });
  }
};









// DELETE doctor by ID
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    // Delete associated files
    if (doctor.photo) deleteFileIfExists(doctor.photo);
    if (doctor.cv) deleteFileIfExists(doctor.cv);
    if (doctor.govtLicense?.length) {
      doctor.govtLicense.forEach(file => deleteFileIfExists(file));
    }

    await doctor.deleteOne();
    res.json({ message: 'Doctor deleted' });
  } catch (error) {
    console.error('Delete doctor error:', error);
    res.status(500).json({ error: 'Server error deleting doctor' });
  }
};







// SEARCH doctors by name or specialization
export const searchDoctors = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Search query required' });

    const regex = new RegExp(q, 'i'); // case insensitive
    const doctors = await Doctor.find({
      $or: [{ name: regex }, { specialization: regex }],
    }).limit(20);

    res.json(doctors);
  } catch (error) {
    console.error('Search doctors error:', error);
    res.status(500).json({ error: 'Server error searching doctors' });
  }
};
