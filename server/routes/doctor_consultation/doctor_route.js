import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  searchDoctors,
} from '../../controllers/doctore_consultation/doctoer_controller.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'public', 'doctor'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, baseName + '-' + Date.now() + ext);
  },
});

const upload = multer({ storage });

router.post('/create', upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'cv', maxCount: 1 },
    { name: 'govtLicense', maxCount: 1 },
  ]),
  createDoctor
);

router.get('/all', getDoctors);
router.get('/findbyid/:id', getDoctorById);

router.put( 'update/:id',  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'cv', maxCount: 1 },
    { name: 'govtLicense', maxCount: 1 },
  ]),
  updateDoctor
);

router.delete('/delete/:id', deleteDoctor);
router.get('/search', searchDoctors);

export default router;

