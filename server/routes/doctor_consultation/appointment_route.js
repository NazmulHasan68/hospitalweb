import express from 'express';
import multer from 'multer';
import {
  getAllAppointments,
  getAppointmentsByUserId,
  getAppointmentsByDoctorPhone,
  searchAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  addAppointmentMessage,
  appointmentOrder,
  AppointmentpaymentSuccess,
  AppointmentpaymentFail,
  AppointmentpaymentCancel,
} from '../../controllers/doctore_consultation/appointment_controller.js';
import isAuthenticated from '../../middlewares/isAuthenticated.js';

const router = express.Router();

// 📁 Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/appointment');
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + file.originalname;
    cb(null, unique);
  },
});

const upload = multer({ storage });

// Routes
router.post('/payment', upload.array('reports'), isAuthenticated, appointmentOrder)
router.post(`/payment/success/:transactionId`, AppointmentpaymentSuccess);
router.post(`/payment/fail/:transactionId`, AppointmentpaymentFail);
router.post(`/payment/cancel/:transactionId`, AppointmentpaymentCancel);




router.get('/', getAllAppointments);
router.get('/user/:userId', getAppointmentsByUserId);
router.get('/doctor/:phone', getAppointmentsByDoctorPhone);
router.get('/search', searchAppointments);
router.patch('/status/:id', updateAppointmentStatus);
router.delete('/:id', deleteAppointment);
router.post('/:appointmentId/message', upload.array('photo'), addAppointmentMessage)

export default router;
