// controllers/sectionControllers.js
import fs from 'fs';
import path from 'path';
import MediaNews from '../models/banner/mediaNews_model.js';
import AboutUsPhotos from '../models/banner/aboutUsPhotos_model.js';
import DoctorBanner from '../models/banner/DoctorBanner_model.js';
import TravelBanner from '../models/banner/TravelBanner_model.js';
import HelpLine from '../models/banner/HelpLine_model.js';
import HomeBanner from '../models/banner/home_banner_model.js';
import MedicalPartners from '../models/banner/MedicalPartners_mode.js';

const generateController = (Model) => ({
  create: async (req, res) => {
    try {
      const newItem = new Model(req.body);
      await newItem.save();
      res.status(201).json({ success: true, message: 'Created successfully', data: newItem });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Creation failed', error });
    }
  },

  getAll: async (req, res) => {
    try {
      const items = await Model.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: items });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Fetch failed', error });
    }
  },

  getById: async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ success: false, message: 'Not found' });
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Fetch failed', error });
    }
  },

  update: async (req, res) => {
    try {
      const updated = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Not found' });
      res.status(200).json({ success: true, message: 'Updated', data: updated });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Update failed', error });
    }
  },

   remove: async (req, res) => {
    try {
      // Find the document first to get the filename
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ success: false, message: 'Not found' });

      // Determine the file field (banner or video)
      // Adjust if your models use different field names
      const fileName = item.banner || item.video;

      if (fileName) {
        const filePath = path.join(process.cwd(), 'public', 'banner', fileName);

        // Check if file exists before deleting
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      // Now delete the document from DB
      await Model.findByIdAndDelete(req.params.id);

      res.status(200).json({ success: true, message: 'Deleted', data: item });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Delete failed', error });
    }
  },
});

export const mediaNewsController = generateController(MediaNews);
export const aboutUsPhotosController = generateController(AboutUsPhotos);
export const doctorBannerController = generateController(DoctorBanner);
export const travelBannerController = generateController(TravelBanner);
export const helpLineController = generateController(HelpLine);
export const homeBannerController = generateController(HomeBanner);
export const medicalPartnersController = generateController(MedicalPartners);


