import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  createHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital
} from '../../controllers/travel/travel_hospital_controller.js';
import isAuthenticated from '../../middlewares/isAuthenticated.js';



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/hospitals'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });



const router = express.Router();

// Public routes
router.get('/all', getAllHospitals);
router.get('/:id', getHospitalById);

// Protected routes - require authentication
router.post('/create', isAuthenticated,  upload.single('banner'), createHospital);
router.put('/:id', isAuthenticated,  upload.single('banner'), updateHospital);
router.delete('/:id', isAuthenticated, deleteHospital);

export default router;
