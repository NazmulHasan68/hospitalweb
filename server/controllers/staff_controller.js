import fs from "fs";
import path from "path";
import Staff from "../models/staff_mode.js";

// Helper to delete a file if exists
const deleteFile = (filename) => {
  if (filename) {
    const filePath = path.join("public/staff_uploads", filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

// Create new staff
export const createStaff = async (req, res) => {
  try {
    const photo = req.files?.photo?.[0]?.filename || null;
    const cv = req.files?.cv?.[0]?.filename || null;

    const staff = await Staff.create({ ...req.body, photo, cv });
    res.status(201).json(staff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all staff
export const getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find().sort({ createdAt: -1 });
    res.status(200).json(staffList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single staff
export const getOneStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update staff (and delete old image/CV if replaced)
export const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    // Replace photo
    if (req.files?.photo) {
      deleteFile(staff.photo);
      req.body.photo = req.files.photo[0].filename;
    }

    // Replace CV
    if (req.files?.cv) {
      deleteFile(staff.cv);
      req.body.cv = req.files.cv[0].filename;
    }

    const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete staff (and delete image/CV from disk)
export const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    deleteFile(staff.photo);
    deleteFile(staff.cv);

    await staff.deleteOne();
    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search staff
export const searchStaff = async (req, res) => {
  const { query } = req.query;
  try {
    const result = await Staff.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get staff by department
export const getByDepartment = async (req, res) => {
  const { department } = req.params;
  try {
    const staffList = await Staff.find({ department });
    res.status(200).json(staffList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
