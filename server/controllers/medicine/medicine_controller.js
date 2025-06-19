import Medicine from '../../models/medicine/medicine_schema.js';
import fs from 'fs';
import path from 'path';


// @desc Create a new medicine
export const createMedicine = async (req, res) => {
  const user = req.user;
  try {
    const imagePaths = req.files?.map(file => `/medicine_photo/${file.filename}`) || [];

    const medicineData = {
      ...req.body,
      images: imagePaths,
      createdBy : user._id
    };

    const medicine = new Medicine(medicineData);
    const saved = await medicine.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// @desc Get all medicines
export const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().sort({ createdAt: -1 }).populate("createdBy", "name phone role");
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
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });

    // ✅ Safely extract fields from req.body
    const {
      name, brand, description, category, country, company,
      price, discount, stock, productionDate, expiryDate,
      warning, prescriptionRequired
    } = req.body;

    // ✅ Update fields if they exist
    if (name) medicine.name = name;
    if (brand) medicine.brand = brand;
    if (description) medicine.description = description;
    if (category) medicine.category = category;
    if (country) medicine.country = country;
    if (company) medicine.company = company;
    if (price) medicine.price = price;
    if (discount) medicine.discount = discount;
    if (stock) medicine.stock = stock;
    if (productionDate) medicine.productionDate = productionDate;
    if (expiryDate) medicine.expiryDate = expiryDate;
    if (warning) medicine.warning = warning;
    medicine.prescriptionRequired = prescriptionRequired === "true" || prescriptionRequired === true;

    // ✅ Handle images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `medicine_photo/${file.filename}`);
      medicine.images = [...(medicine.images || []), ...newImages];
    }

    await medicine.save();
    res.status(200).json(medicine);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};




// @desc Delete a medicine by ID
export const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });

    // Delete each image file
    if (medicine.images && medicine.images.length > 0) {
      medicine.images.forEach((imgPath) => {
        const fullPath = path.join(process.cwd(), 'public', imgPath); 
        if (fs.existsSync(fullPath)) {
          fs.unlink(fullPath, (err) => {
            if (err) console.error('Failed to delete image:', fullPath, err);
          });
        }
      });
    }

    // Delete the medicine document
    await Medicine.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Medicine and images deleted successfully' });
  } catch (err) {
    console.error(err);
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
