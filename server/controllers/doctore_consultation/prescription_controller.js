// controllers/prescription_controller.js
import fs from 'fs';
import path from 'path';
import Prescription from '../../models/doctor_consultation/prescription_schema.js';

// 🔧 Helper to delete files
const deleteFiles = (filePaths) => {
  filePaths.forEach(filePath => {
    const fullPath = path.join(process.cwd(), 'public', filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  });
};

// ✅ Create Prescription
export const createPrescription = async (req, res) => {
  try {
    const {
      diagnosis,
      advice,
      followUpDate,
      doctorId,
      patientId,
      appointmentId,
      prescribedBy,
      status = 'final',
    } = req.body;

    // Safe JSON parse for medications and test arrays
    const medications = typeof req.body.medications === 'string'
      ? JSON.parse(req.body.medications)
      : req.body.medications || [];

    const test = typeof req.body.test === 'string'
      ? JSON.parse(req.body.test)
      : req.body.test || [];

    // Attachments from multer files
    const attachments = req.files?.map(file => `/uploads/prescription/${file.filename}`) || [];

    const newPrescription = await Prescription.create({
      diagnosis,
      advice,
      followUpDate,
      doctorId,
      patientId,
      appointmentId,
      prescribedBy,
      status,
      medications,
      test,
      attachments,
    });

    res.status(201).json(newPrescription);
  } catch (err) {
    console.error('Create Error:', err);
    res.status(500).json({ error: 'Failed to create prescription' });
  }
};



// ✅ Improved: Update Prescription Controller
export const updatePrescription = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    if (!appointmentId) {
      return res.status(400).json({ error: 'Appointment ID is required' });
    }

    // 🔍 Find existing prescription
    const existing = await Prescription.findOne({ appointmentId });
    if (!existing) {
      return res.status(404).json({ error: 'Prescription not found for this appointment' });
    }

    const updatedData = {};

    // ✅ Basic fields
    const { diagnosis, advice, followUpDate, medications, test } = req.body;
    updatedData.diagnosis = diagnosis ?? '';
    updatedData.advice = advice ?? '';
    updatedData.followUpDate = followUpDate ?? '';

    // ✅ Parse medications safely
    if (medications) {
      try {
        updatedData.medications = typeof medications === 'string' ? JSON.parse(medications) : medications;
      } catch {
        return res.status(400).json({ error: 'Invalid medications format' });
      }
    }

    // ✅ Parse test list safely
    if (test) {
      try {
        updatedData.test = typeof test === 'string' ? JSON.parse(test) : test;
      } catch {
        return res.status(400).json({ error: 'Invalid test format' });
      }
    }

    // ✅ Handle new attachments
    if (req.files?.length > 0) {
      try {
        // Delete old files (you should ensure deleteFiles is safe)
        deleteFiles(existing.attachments);

        // Store new file paths
        updatedData.attachments = req.files.map(file => `/public/prescription/${file.filename}`);
      } catch (fileErr) {
        console.error('Attachment handling failed:', fileErr);
        return res.status(500).json({ error: 'Failed to handle attachments' });
      }
    }

    // ✅ Update in DB
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      existing._id,
      updatedData,
      { new: true }
    )
      .populate('doctorId')
      .populate('patientId')
      .populate({
        path: 'appointmentId',
        populate: { path: 'patientId' }
      });

    return res.status(200).json(updatedPrescription);
  } catch (err) {
    console.error('❌ Update Error:', err);
    return res.status(500).json({ error: 'Server error while updating prescription' });
  }
};




// ✅ Delete Prescription
export const deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) return res.status(404).json({ error: 'Prescription not found' });

    // Delete attached files from storage
    deleteFiles(prescription.attachments);

    await Prescription.findByIdAndDelete(req.params.id);

    res.json({ message: 'Prescription deleted and files removed' });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ error: 'Failed to delete prescription' });
  }
};

// ✅ Get all prescriptions
export const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find().populate('doctorId patientId appointmentId');
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch prescriptions' });
  }
};

// ✅ Get prescriptions by patient
export const getPrescriptionsByPatient = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patientId: req.params.patientId })
      .populate('doctorId appointmentId');
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch prescriptions' });
  }
};

// ✅ Get prescriptions by doctor ID
export const getPrescriptionsByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const data = await Prescription.find({ doctorId }).populate('patientId appointmentId');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching doctor prescriptions' });
  }
};



// ✅ Get prescriptions by appointment ID
export const getPrescriptionsByAppointmentId = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    if (!appointmentId) {
      return res.status(400).json({ error: 'Appointment ID is required' });
    }

    const prescriptions = await Prescription.find({ appointmentId })
      .populate('doctorId')
      .populate('patientId')
      .populate({
        path: 'appointmentId',
        populate: { path: 'patientId' } 
      });

    if (!prescriptions.length) {
      return res.status(404).json({ message: 'No prescriptions found for this appointment.' });
    }

    res.status(200).json(prescriptions);
  } catch (err) {
    console.error('Error fetching prescriptions:', err.message);
    res.status(500).json({ error: 'Error fetching appointment prescriptions' });
  }
};
;


// ✅ Search prescription
export const searchPrescription = async (req, res) => {
  try {
    const { keyword } = req.query;
    const query = {
      $or: [
        { diagnosis: { $regex: keyword, $options: 'i' } },
        { advice: { $regex: keyword, $options: 'i' } },
        { 'medications.name': { $regex: keyword, $options: 'i' } },
      ],
    };
    const data = await Prescription.find(query).populate('doctorId patientId appointmentId');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
};
