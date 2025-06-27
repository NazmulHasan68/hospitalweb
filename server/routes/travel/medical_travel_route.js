import express from "express";
import {
  createTravelHelp,
  getAllTravelHelps,
  getTravelHelpById,
  updateTravelHelp,
  deleteTravelHelp,
  getTravelById,
} from "../../controllers/travel/medical_travel_controller.js";

import multer from "multer";
import path from "path";
import isAuthenticated from "../../middlewares/isAuthenticated.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/apply");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/create", isAuthenticated, upload.array("documents", 10), createTravelHelp);
router.get("/all", getAllTravelHelps);
router.get("/travel/:id", getTravelHelpById);
router.get("/help/:id", getTravelById);
router.patch("/travel/:id", isAuthenticated, updateTravelHelp);
router.delete("/travel/:id", isAuthenticated, deleteTravelHelp);

export default router;
