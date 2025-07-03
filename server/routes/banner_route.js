import express from 'express';
import multer from 'multer';
import path from 'path';

// Controller imports
import {
  mediaNewsController,
  aboutUsPhotosController,
  doctorBannerController,
  travelBannerController,
  helpLineController,
  homeBannerController,
  medicalPartnersController,
} from '../controllers/banner_controller.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/banner'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// Helper to wrap controller routes
const generateRoutes = (basePath, controller, fileField = 'banner') => {
  router.post(`/${basePath}`, upload.single(fileField), async (req, res) => {
    const data = { ...req.body };
    if (req.file) {
      data[fileField] = req.file.filename;
    }
    req.body = data;
    return controller.create(req, res);
  });

  router.get(`/${basePath}`, controller.getAll);
  router.get(`/${basePath}/:id`, controller.getById);
  router.patch(`/${basePath}/:id`, upload.single(fileField), async (req, res) => {
    const data = { ...req.body };
    if (req.file) {
      data[fileField] = req.file.filename;
    }
    req.body = data;
    return controller.update(req, res);
  });

  router.delete(`/${basePath}/:id`, controller.remove);
};

// Define all section routes
generateRoutes('media-news', mediaNewsController, 'video');
generateRoutes('about-us-photos', aboutUsPhotosController);
generateRoutes('doctor-banner', doctorBannerController);
generateRoutes('travel-banner', travelBannerController);
generateRoutes('help-line', helpLineController);
generateRoutes('home-banner', homeBannerController);
generateRoutes('medical-partners', medicalPartnersController);

export default router;
