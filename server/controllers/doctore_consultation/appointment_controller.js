import Appointment from '../../models/doctor_consultation/appointment_schema.js';
import Doctor from '../../models/doctor_consultation/doctor_schema.js'
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

// 📁 Helper to delete a file from public/appointment
const deleteFile = (filename) => {
  const filePath = path.join('public', 'appointment', filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Failed to delete file:', filePath);
    } else {
      console.log('Deleted file:', filePath);
    }
  });
};

// ✅ Create Appointment
export const createAppointment = async (req, res) => {
  try {
    const {
      patientName,
      age,
      weight,
      address,
      patientId,
      doctorId,
      appointmentDate,
      notes,
    } = req.body;

    console.log("called!");

    const doctor = await Doctor.findById({_id:doctorId})
    if(!doctor) {
        return res.status(404).json("Doctor not found!")
    }
    

    const files = req.files || []; // Assuming multer is used

    const reports = files.map((file) => file.filename);

    const newAppointment = new Appointment({
      patientName,
      age,
      weight,
      address,
      patientId,
      doctorId,
      appointmentDate,
      notes,
      reports,
    });

    
    await newAppointment.save();

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get All Appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId')
      .populate('doctorId')
      .sort({ createdAt: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get Appointments by User ID
export const getAppointmentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const appointments = await Appointment.find({ patientId: userId })
      .populate('doctorId')
      .sort({ createdAt: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get Appointments by Doctor ID
export const getAppointmentsByDoctorPhone = async (req, res) => {
  try {
    const { phone } = req.params;

    // Find doctor by phone
    const doctor = await Doctor.findOne({ phone });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found!' });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(doctor._id)) {
      return res.status(400).json({ message: 'Invalid doctor ID' });
    }

    // Find appointments for doctor
    const appointments = await Appointment.find({ doctorId: doctor._id })
      .populate('patientId')
      .populate('doctorId')
      .sort({ createdAt: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




// ✅ Search Appointments by Patient Name
export const searchAppointments = async (req, res) => {
  try {
    const { keyword } = req.query;

    const regex = new RegExp(keyword, 'i');
    const results = await Appointment.find({ patientName: regex })
      .populate('doctorId')
      .populate('patientId');

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Search failed' });
  }
};

// ✅ Update Appointment Status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Update failed' });
  }
};

// ✅ Delete Appointment & Reports
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Delete attached report files
    appointment.reports.forEach((filename) => {
      deleteFile(filename);
    });

    await appointment.deleteOne();
    res.status(200).json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed' });
  }
};
