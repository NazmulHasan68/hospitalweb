import express from 'express';
import {
  Admindashbaord,
  travelmanagerdashboard,
  consultationmanagerdashboard,
  medicinemanagerdashboard,
  doctorDhasboard,
} from '../controllers/dashboard_controller.js';

const router = express.Router();

router.get('/admin', Admindashbaord);
router.get('/travel-manager', travelmanagerdashboard);
router.get('/consultation-manager', consultationmanagerdashboard);
router.get('/medicine-manager', medicinemanagerdashboard);
router.get('/doctor', doctorDhasboard);

export default router;
