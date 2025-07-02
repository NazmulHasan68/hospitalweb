import express from 'express';
import multer from 'multer';
import path from 'path';

import {
  createPrescription,
  updatePrescription,
  deletePrescription,
  getAllPrescriptions,
  getPrescriptionsByPatient,
  getPrescriptionsByDoctorId,
  searchPrescription,
  getPrescriptionsByAppointmentId,
} from '../../controllers/doctore_consultation/prescription_controller.js';

const router = express.Router();

// 🔧 Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/prescription');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// ✅ Routes
router.post('/', upload.array('attachments'), createPrescription);
router.put('/update/:appointmentId', upload.array('attachments'), updatePrescription);
router.delete('/:id', deletePrescription);
router.get('/', getAllPrescriptions);
router.get('/patient/:patientId', getPrescriptionsByPatient);
router.get('/doctor/:doctorId', getPrescriptionsByDoctorId);
router.get('/appointment/:appointmentId', getPrescriptionsByAppointmentId);
router.get('/search', searchPrescription);

export default router;
