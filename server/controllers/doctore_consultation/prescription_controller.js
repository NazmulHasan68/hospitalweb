import Prescription from '../models/Prescription.js';

// @desc    Create a new prescription
// @route   POST /api/prescriptions
export const createPrescription = async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    const savedPrescription = await prescription.save();
    res.status(201).json(savedPrescription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Get all prescriptions
// @route   GET /api/prescriptions
export const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate('appointmentId doctorId patientId', 'name');
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get prescription by ID
// @route   GET /api/prescriptions/:id
export const getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate('appointmentId doctorId patientId', 'name');
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update prescription by ID
// @route   PUT /api/prescriptions/:id
export const updatePrescription = async (req, res) => {
  try {
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPrescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    res.json(updatedPrescription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Delete prescription by ID
// @route   DELETE /api/prescriptions/:id
export const deletePrescription = async (req, res) => {
  try {
    const deletedPrescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!deletedPrescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    res.json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
