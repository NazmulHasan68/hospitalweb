import express from 'express';
import {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
  updatePrescription,
  deletePrescription
} from '../controllers/prescriptionController.js';

const router = express.Router();

// Create a new prescription
router.post('/', createPrescription);

// Get all prescriptions
router.get('/', getAllPrescriptions);

// Get a prescription by ID
router.get('/:id', getPrescriptionById);

// Update a prescription by ID
router.put('/:id', updatePrescription);

// Delete a prescription by ID
router.delete('/:id', deletePrescription);

export default router;
