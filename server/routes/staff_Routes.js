import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createStaff,
  getAllStaff,
  getOneStaff,
  updateStaff,
  searchStaff,
  getByDepartment,
  deleteStaff,
} from "../controllers/staff_controller.js";

// 1. Ensure upload folder exists
const uploadDir = "./public/photo";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 2. Setup Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  },
});

// 3. Optional: File type validation
const fileFilter = (req, file, cb) => {
  const allowedImageExts = [".jpg", ".jpeg", ".png", ".webp"];
  const allowedPdfExts = [".pdf"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (
    (file.fieldname === "photo" && allowedImageExts.includes(ext)) ||
    (file.fieldname === "cv" && allowedPdfExts.includes(ext))
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({ storage, fileFilter });



// 4. Express router
const router = express.Router();

router.post("/", upload.fields([{ name: "photo" }, { name: "cv" }]), createStaff);
router.get("/all", getAllStaff);
router.get("/search", searchStaff);
router.get("/department/:department", getByDepartment);
router.get("/:id", getOneStaff);
router.put("/:id", upload.fields([{ name: "photo" }, { name: "cv" }]), updateStaff);
router.delete("/:id", deleteStaff);


export default router;
