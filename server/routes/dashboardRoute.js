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
  updateHelpMessageRepliedStatus,
} from '../controllers/dashboard_controller.js';

const router = express.Router();

router.get('/admin', Admindashbaord);
router.get('/travel-manager', travelmanagerdashboard);
router.get('/consultation-manager', consultationmanagerdashboard);
router.get('/medicine-manager', medicinemanagerdashboard);
router.get('/doctor', doctorDhasboard);


router.post('/sendmessage', sendHelpMessage); // ✅ should be POST
router.get('/getallmessage', getAllHelpMessages);
router.patch('/updatereplied/:id', updateHelpMessageRepliedStatus);
router.delete('/deletemessage/:id', deleteHelpMessage); // ✅ should use :id param


export default router;
