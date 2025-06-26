import express from "express";
import {
  createTravelHelp,
  getAllTravelHelps,
  getTravelHelpById,
  updateTravelHelp,
  deleteTravelHelp,
} from "../controllers/travelHelpController.js";

import multer from "multer";
import path from "path";

// Multer config: store files in 'public/apply' folder
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

router.post("/", upload.array("documents", 10), createTravelHelp);

router.get("/", getAllTravelHelps);


router.get("/:id", getTravelHelpById);

router.patch("/:id", updateTravelHelp);

router.delete("/:id", deleteTravelHelp);

export default router;
