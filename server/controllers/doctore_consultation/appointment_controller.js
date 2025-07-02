import Appointment from '../../models/doctor_consultation/appointment_schema.js';
import Doctor from '../../models/doctor_consultation/doctor_schema.js'
import User from '../../models/user.model.js'
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import SSLCommerzPayment from "sslcommerz-lts";
import { v4 as uuidv4 } from "uuid";



// ==========================================
// 1️⃣ Create Order (SSLCommerz Payment)
// ==========================================
export const appointmentOrder = async (req, res) => {
  const store_id = process.env.STORE_ID;
  const store_passwd = process.env.STORE_PASSWORD;
  const is_live = false;

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
      totalAmount,
    } = req.body;

    
    const doctor = await Doctor.findById({_id:doctorId})
    if(!doctor) {
        return res.status(404).json("Doctor not found!")
    }
    
    const files = req.files || []; 
    const reports = files.map((file) => file.filename);

    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json("User not found");

    const transactionId = uuidv4();

    // Step 1: Save pending appointment
    await Appointment.create({
      patientName,
      age,
      weight,
      address,
      patientId,
      doctorId,
      appointmentDate,
      notes,
      totalAmount,
      reports,
      transactionId,
      paymentStatus: "pending",
    });

    // Step 2: Create payment
    const payload = {
      total_amount: totalAmount,
      currency: 'BDT',
      tran_id: transactionId,
      success_url: `${process.env.BASE_URL}/api/appointment/payment/success/${transactionId}`,
      fail_url: `${process.env.BASE_URL}/api/appointment/payment/fail/${transactionId}`,
      cancel_url: `${process.env.BASE_URL}/api/appointment/payment/cancel/${transactionId}`,
      ipn_url: `${process.env.BASE_URL}/api/appointment/payment/ipn/${transactionId}`,
      shipping_method: 'Courier',
      product_name: 'Doctor Appointment',
      product_category: 'Healthcare',
      product_profile: 'general',
      cus_name: user.name || 'Customer',
      cus_email: user.email || 'test@test.com',
      cus_add1: address || 'Dhaka',
      cus_phone: user.phone || '018********',
      ship_name: 'Appointment',
      ship_city: 'Dhaka',
      ship_postcode: '1207',
      ship_add1: address || 'Dhaka',
      ship_country: 'Bangladesh',
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(payload);

    if (!apiResponse?.GatewayPageURL) {
      return res.status(500).json({ message: "Payment gateway error", details: apiResponse });
    }

    return res.json({ success: true, redirectUrl: apiResponse.GatewayPageURL });

  } catch (error) {
    console.error('🔴 SSLCommerz order error:', error);
    res.status(500).json({ message: 'Failed to initiate payment' });
  }
};



// ✅ Appointment success
export const AppointmentpaymentSuccess = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const appointment = await Appointment.findOne({ transactionId });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found!" });
    }
    appointment.paymentStatus = 'paid';
    await appointment.save();
    res.redirect(`${process.env.FRONTENDURL}/doctor/payment-success/${transactionId}`);

  } catch (error) {
    console.error("Payment success error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




export const AppointmentpaymentFail = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const appointment = await Appointment.findOne({ transactionId });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found!" });
    }

    appointment.paymentStatus = 'failed';
    await appointment.save();

    res.redirect(`${process.env.FRONTENDURL}/doctor/payment-failed/${transactionId}`);
  } catch (error) {
    console.error("Payment fail error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const AppointmentpaymentCancel = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const appointment = await Appointment.findOne({ transactionId });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found!" });
    }

    appointment.paymentStatus = 'cancelled';
    await appointment.save();

    res.redirect(`${process.env.FRONTENDURL}/doctor/payment-cancelled/${transactionId}`);
  } catch (error) {
    console.error("Payment cancel error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};










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









export const addAppointmentMessage = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { subject, message, sender } = req.body;

    if (!sender || !message) {
      return res.status(400).json({ error: 'Sender and message are required' });
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // 🖼 Collect photo paths (relative)
    let uploadedPhotos = [];
    if (req.files && req.files.length > 0) {
      uploadedPhotos = req.files.map((file) =>
        path.join('/public/appointment/', file.filename)
      );
    }

    // 📨 Create message
    const newMessage = {
      sender,
      subject,
      message,
      photo: uploadedPhotos, 
      timestamp: new Date(),
    };

    appointment.messages.push(newMessage);
    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Message added successfully',
      data: newMessage,
    });
  } catch (err) {
    console.error('Error adding message:', err);
    res.status(500).json({ error: 'Server error' });
  }
}