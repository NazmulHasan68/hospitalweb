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
    // If files uploaded via multer
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

// GET doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
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

    // Delete old files if new uploaded
    if (req.files) {
      if (req.files.photo && doctor.photo) deleteFileIfExists(doctor.photo);
      if (req.files.cv && doctor.cv) deleteFileIfExists(doctor.cv);
      if (req.files.govtLicense && doctor.govtLicense?.length) {
        doctor.govtLicense.forEach(file => deleteFileIfExists(file));
      }
    }

    const data = req.body;

    // Replace with new filenames if uploaded
    if (req.files) {
      if (req.files.photo) data.photo = req.files.photo[0].filename;
      if (req.files.cv) data.cv = req.files.cv[0].filename;
      if (req.files.govtLicense) {
        data.govtLicense = req.files.govtLicense.map(f => f.filename);
      }
    }

    // Parse arrays if JSON strings
    if (typeof data.degree === 'string') data.degree = JSON.parse(data.degree);
    if (typeof data.govtLicense === 'string') data.govtLicense = JSON.parse(data.govtLicense);
    if (typeof data.checkupDate === 'string') data.checkupDate = JSON.parse(data.checkupDate);

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
