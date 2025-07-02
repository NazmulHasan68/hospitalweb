import express from 'express';
import {
  Admindashbaord,
  travelmanagerdashboard,
  consultationmanagerdashboard,
  medicinemanagerdashboard,
  doctorDhasboard,
  sendHelpMessage,
  getAllHelpMessages,
  deleteHelpMessage,
} from '../controllers/dashboard_controller.js';

const router = express.Router();

router.get('/admin', Admindashbaord);
router.get('/travel-manager', travelmanagerdashboard);
router.get('/consultation-manager', consultationmanagerdashboard);
router.get('/medicine-manager', medicinemanagerdashboard);
router.get('/doctor', doctorDhasboard);


router.post('/sendmessage', sendHelpMessage); // ✅ should be POST
router.get('/getallmessage', getAllHelpMessages);
router.delete('/deletemessage/:id', deleteHelpMessage); // ✅ should use :id param


export default router;
