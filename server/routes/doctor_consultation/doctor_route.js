import express from 'express';
import {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctorController.js';

const router = express.Router();

// Create a new doctor
router.post('/', createDoctor);

// Get all doctors
router.get('/', getAllDoctors);

// Get doctor by ID
router.get('/:id', getDoctorById);

// Update doctor by ID
router.put('/:id', updateDoctor);

// Delete doctor by ID
router.delete('/:id', deleteDoctor);

export default router;
