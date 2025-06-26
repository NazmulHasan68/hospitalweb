import fs from 'fs';
import path from 'path';
import Hospital from '../../models/medical_travel/Hospital.js';
import User from '../../models/user.model.js';

const isAllowedRole = (role) => ['admin', 'manager', 'travel'].includes(role);

// Helper to delete images from public folder
const deleteImages = (imagePaths) => {
  imagePaths.forEach((imgPath) => {
    const fullPath = path.join(process.cwd(), 'public', imgPath);
    fs.unlink(fullPath, (err) => {
      if (err) console.error('Failed to delete image:', fullPath, err.message);
      else console.log('Deleted image:', fullPath);
    });
  });
};



export const createHospital = async (req, res) => {
  try {
    const userId = req.id; // From auth middleware

    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ message: 'User not authenticated' });
    if (!isAllowedRole(user.role)) return res.status(403).json({ message: 'Access denied' });

    const {
      hospitalName,
      country,
      city,
      address,
      established,
      beds,
      speciality,
      description,
      map,
      doctorList,
      type
    } = req.body;

    let parsedDoctorList = [];
    if (doctorList) {
      parsedDoctorList = typeof doctorList === 'string' ? JSON.parse(doctorList) : doctorList;
    }

    const banner = req.file;
    if (!banner) {
      return res.status(400).json({ message: 'Banner image is required' });
    }

    const newHospital = new Hospital({
      userId: user._id,
      hospitalName,
      country,
      city,
      address,
      established,
      beds,
      speciality,
      description,
      map,
      type,
      banner: banner.filename, // ✅ Only filename, as required by schema
      doctorList: parsedDoctorList,
    });

    const savedHospital = await newHospital.save();
    res.status(201).json(savedHospital);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create hospital', error: error.message });
  }
};




// Get all hospitals (with optional search by hospitalName or city)
export const getAllHospitals = async (req, res) => {
  try {
    const { search } = req.query;

    let filter = {};
    if (search) {
      const regex = new RegExp(search, 'i');
      filter = { $or: [{ hospitalName: regex }, { city: regex }] };
    }

    const hospitals = await Hospital.find(filter).populate('userId', 'name email photoUrl');
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch hospitals', error: error.message });
  }
};



// Get hospital by ID
export const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id).populate('userId', 'name email photoUrl');
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });

    res.status(200).json(hospital);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch hospital', error: error.message });
  }
};



// Update hospital
export const updateHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });

    const userId = req.id;
    const user = await User.findById(userId);
    if (!user || !isAllowedRole(user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const {
      hospitalName,
      country,
      city,
      address,
      established,
      beds,
      speciality,
      description,
      map,
      type,
      doctorList,
    } = req.body;

    // Parse doctorList if it's a string
    let parsedDoctorList = [];
    if (doctorList) {
      parsedDoctorList = typeof doctorList === 'string' ? JSON.parse(doctorList) : doctorList;
    }

    // Handle new banner upload
    if (req.file?.path) {
      // Optional: delete old image from storage
      if (hospital.banner) {
        deleteImages([hospital.banner]); // assuming deleteImages accepts an array
      }
      hospital.banner = req.file.path;
    }

    // Update other fields
    hospital.hospitalName = hospitalName || hospital.hospitalName;
    hospital.country = country || hospital.country;
    hospital.city = city || hospital.city;
    hospital.address = address || hospital.address;
    hospital.established = established || hospital.established;
    hospital.beds = beds || hospital.beds;
    hospital.speciality = speciality || hospital.speciality;
    hospital.description = description || hospital.description;
    hospital.map = map || hospital.map;
    hospital.type = type || hospital.type;
    hospital.doctorList = parsedDoctorList.length ? parsedDoctorList : hospital.doctorList;

    const updatedHospital = await hospital.save();
    res.status(200).json(updatedHospital);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update hospital', error: error.message });
  }
};




// Delete hospital
export const deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });

    const userId = req.id;
    const user = await User.findById(userId);
    if (!user || !isAllowedRole(user.role)) return res.status(403).json({ message: 'Access denied' });

    if (hospital.banner && hospital.banner.length > 0) {
      deleteImages(hospital.banner);
    }

    await hospital.remove();
    res.status(200).json({ message: 'Hospital deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete hospital', error: error.message });
  }
};
