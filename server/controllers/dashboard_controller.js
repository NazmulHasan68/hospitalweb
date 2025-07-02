import User from "../models/user.model.js";
import Staff from "../models/staff_mode.js";
import MedicineOrder from "../models/medicine/order_schema.js";
import Medicine from "../models/medicine/medicine_schema.js";
import Hospital from "../models/medical_travel/Hospital.js";
import Travel from "../models/medical_travel/medical_travel.js";
import Doctor from "../models/doctor_consultation/doctor_schema.js";
import Appointment from "../models/doctor_consultation/appointment_schema.js";
import Prescription from "../models/doctor_consultation/prescription_schema.js";

// ✅ Admin Dashboard
export const Admindashbaord = async (req, res) => {
  try {
    const totalUsers = await User.find();
    const totalStaff = await Staff.find();
    const totalmediOrders = await MedicineOrder.find();
    const medicine = await Medicine.find();
    const totalAppointments = await Appointment.find().populate("patientId doctorId");
    const totalHospitals = await Hospital.find();
    const totalTravels = await Travel.find();
    const totalDoctors = await Doctor.find();

    res.json({
      totalUsers,
      totalStaff,
      medicine,
      totalmediOrders,
      totalAppointments,
      totalHospitals,
      totalTravels,
      totalDoctors,
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Travel Manager Dashboard
export const travelmanagerdashboard = async (req, res) => {
  try {
    const totalTravels = await Travel.countDocuments();
    const totalHospitals = await Hospital.countDocuments();

    res.json({
      totalTravels,
      totalHospitals,
    });
  } catch (error) {
    console.error('Travel manager dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Consultation Manager Dashboard
export const consultationmanagerdashboard = async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const totalPrescriptions = await Prescription.countDocuments();

    res.json({
      totalDoctors,
      totalAppointments,
      totalPrescriptions,
    });
  } catch (error) {
    console.error('Consultation manager dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Medicine Manager Dashboard
export const medicinemanagerdashboard = async (req, res) => {
  try {
    const totalMedicines = await Medicine.countDocuments();
    const totalOrders = await MedicineOrder.countDocuments();

    res.json({
      totalMedicines,
      totalOrders,
    });
  } catch (error) {
    console.error('Medicine manager dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Doctor Dashboard
export const doctorDhasboard = async (req, res) => {
  try {
    const doctorId = req.id; // Assuming authentication middleware sets req.id

    const totalAppointments = await Appointment.countDocuments({ doctorId });
    const totalPrescriptions = await Prescription.countDocuments({ doctorId });

    res.json({
      totalAppointments,
      totalPrescriptions,
    });
  } catch (error) {
    console.error('Doctor dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
