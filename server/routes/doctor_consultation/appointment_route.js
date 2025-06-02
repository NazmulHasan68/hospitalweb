import express from 'express';
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByPatient,
  getAppointmentsByDoctor,
  updateAppointment,
  deleteAppointment
} from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/', createAppointment);
router.get('/', getAllAppointments);
router.get('/:id', getAppointmentById);
router.get('/patient/:patientId', getAppointmentsByPatient);
router.get('/doctor/:doctorId', getAppointmentsByDoctor);
router.patch('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export default router;
