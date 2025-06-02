import Medicine from '../../models/medicine/medicine_schema.js';

// @desc Create a new medicine
export const createMedicine = async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    const saved = await medicine.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc Get all medicines
export const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().sort({ createdAt: -1 });
    res.status(200).json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Get a single medicine by ID
export const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
    res.status(200).json(medicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Update a medicine by ID
export const updateMedicine = async (req, res) => {
  try {
    const updated = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Medicine not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc Delete a medicine by ID
export const deleteMedicine = async (req, res) => {
  try {
    const deleted = await Medicine.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Medicine not found' });
    res.status(200).json({ message: 'Medicine deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Search medicines by name, category, or brand
export const searchMedicines = async (req, res) => {
  try {
    const { query } = req.query;
    const medicines = await Medicine.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } }
      ]
    });
    res.status(200).json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
