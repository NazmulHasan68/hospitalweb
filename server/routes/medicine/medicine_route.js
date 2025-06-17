import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
const folderPath = path.join(process.cwd(), 'public', 'medicine_photo');

import {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
  searchMedicines
} from '../../controllers/medicine/medicine_controller.js';
import { isAuthenticateFormedicine } from '../../middlewares/isAuthenticateFormedicine.js';


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
     if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    cb(null, folderPath); 
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

const upload = multer({ storage });

const router = express.Router();


router.post('/create', isAuthenticateFormedicine, upload.array('images', 5), createMedicine);
router.put('/update/:id', isAuthenticateFormedicine, updateMedicine);
router.delete('/delete/:id', isAuthenticateFormedicine, deleteMedicine);

// Public routes
router.get('/', getAllMedicines);
router.get('/search', searchMedicines);
router.get('/:id', getMedicineById);

export default router;
