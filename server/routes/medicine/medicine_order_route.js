import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  createOrder,
  createMedicineOrder,
  getMedicineById,
  getAllorders,
  updateOrderStatus,
  deleteOrder,
  paymentSuccess,
  paymentFail,
  paymentCancel
} from '../../controllers/medicine/medicine_order_controller.js';
import isAuthenticated from '../../middlewares/isAuthenticated.js';

// ✅ Define prescription upload folder
const folderPath = path.join(process.cwd(), 'public', 'prescriptions');

// ✅ Multer Storage Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    const timestamp = Date.now();
    cb(null, `${name}-${timestamp}${ext}`);
  }
});

const upload = multer({ storage });

const router = express.Router();

// ✅ Routes
router.post('/ssl_order', isAuthenticated, upload.array('files', 5), createMedicineOrder);
router.post('/order', isAuthenticated, upload.array('files', 5), createOrder);
router.post('/payment/success/:transactionId', paymentSuccess);
router.post('/payment/fail/:transactionId', paymentFail);
router.post('/payment/cancel/:transactionId', paymentCancel);

router.get('/medicines/orders', getAllorders);
router.get('/medicine/:id', getMedicineById);
// router.get('')
router.put('/:orderId/status', updateOrderStatus);
router.delete('/:orderId', deleteOrder);

export default router;
