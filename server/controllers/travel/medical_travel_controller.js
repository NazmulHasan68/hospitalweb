import fs from "fs";
import path from "path";
import MedicalTravelHelp from "../../models/medical_travel/medical_travel.js";

// Helper: Delete files from disk
const deleteFiles = (filePaths) => {
  filePaths.forEach((filePath) => {
    const fullPath = path.resolve(filePath);
    fs.unlink(fullPath, (err) => {
      if (err) console.error(`Failed to delete file ${fullPath}:`, err.message);
    });
  });
};

// Create new travel help request
export const createTravelHelp = async (req, res) => {
  try {
    const {
      patientName,
      phone,
      email,
      age,
      medicalCondition,
      preferredCountry,
      preferredCity,
      preferredHospital,
      userId,
    } = req.body;

    // Handle files
    let documents = [];
    if (req.files && req.files.length > 0) {
      documents = req.files.map((file) => file.path); // store file paths
    }

    const newRequest = new MedicalTravelHelp({
      userId,
      patientName,
      phone,
      email,
      age,
      medicalCondition,
      preferredCountry,
      preferredCity,
      preferredHospital,
      documents,
    });

    const saved = await newRequest.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all travel help requests
export const getAllTravelHelps = async (req, res) => {
  try {
    const helps = await MedicalTravelHelp.find().populate("userId", "name email");
    res.status(200).json(helps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one travel help by ID
export const getTravelHelpById = async (req, res) => {
  try {
    const help = await MedicalTravelHelp.findById(req.params.id).populate("userId", "name email");
    if (!help) return res.status(404).json({ message: "Request not found" });
    res.status(200).json(help);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a travel help request (admin)
export const updateTravelHelp = async (req, res) => {
  try {
    // Optional: if updating documents, handle files here (not implemented)
    // You can add logic to delete old files if replaced

    const updated = await MedicalTravelHelp.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Request not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a travel help request + delete all related documents
export const deleteTravelHelp = async (req, res) => {
  try {
    const help = await MedicalTravelHelp.findById(req.params.id);
    if (!help) return res.status(404).json({ message: "Request not found" });

    // Delete files from filesystem
    if (help.documents && help.documents.length > 0) {
      deleteFiles(help.documents);
    }

    // Delete DB record
    await MedicalTravelHelp.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Request and associated documents deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
