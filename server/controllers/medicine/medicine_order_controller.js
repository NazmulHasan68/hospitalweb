
import mongoose from 'mongoose';
import User from '../../models/user.model.js'
import Order from '../../models/medicine/order_schema.js';
import Medicine from '../../models/medicine/medicine_schema.js';
import SSLCommerzPayment from "sslcommerz-lts";
import { v4 as uuidv4 } from "uuid";



// ==========================================
// 1️⃣ Create Order (SSLCommerz Payment)
// ==========================================
export const createMedicineOrder = async (req, res) => {
  const store_id = process.env.STORE_ID;
  const store_passwd = process.env.STORE_PASSWORD;
  const is_live = false;

  try {
    const { medicines, totalAmount, shippingAddress } = req.body;
    const userId = req.id;
    const user = await User.findById(userId);
    const transactionId = uuidv4();

    const payload = {
      total_amount: totalAmount,
      currency: 'BDT',
      tran_id: transactionId,
      success_url: `${process.env.BASE_URL}/api/mediorders/payment/success/${transactionId}`,
      fail_url: `${process.env.BASE_URL}/api/mediorders/payment/fail/${transactionId}`,
      cancel_url: `${process.env.BASE_URL}/api/mediorders/payment/cancel/${transactionId}`,
      ipn_url: `${process.env.BASE_URL}/api/mediorders/payment/ipn/${transactionId}`,
      shipping_method: 'Courier',
      product_name: 'Medicine Order',
      product_category: 'Pharmacy',
      product_profile: 'general',
      cus_name: req.user?.name || 'Customer',
      cus_email: req.user?.email || 'test@test.com',
      cus_add1: shippingAddress || 'Dhaka, Bangladesh 2',
      cus_phone: req.user?.phone || '0180********',
      ship_name: 'Medicine Delivery',
      ship_city: 'Dhaka', 
      ship_postcode: '1207',
      ship_add1: shippingAddress || 'Dhaka, Bangladesh 2',
      ship_country: 'Bangladesh',
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(payload);

    if (!apiResponse?.GatewayPageURL) {
      return res.status(500).json({
        message: "Payment gateway error",
        details: apiResponse,
      });
    }

    const orderData = {
      user: userId,
      medicines: typeof medicines === 'string' ? JSON.parse(medicines) : medicines,
      totalAmount,
      shippingAddress,
      paymentMethod: 'online',
      paymentStatus: 'pending',
      deliveryStatus: 'processing',
      prescription: req.files?.map((file) => file.filename) || [],
      transactionId,
    };

    const order = await Order.create(orderData);
    return res.json({ success: true, redirectUrl: apiResponse.GatewayPageURL });

  } catch (error) {
    console.error('🔴 SSLCommerz order error:', error);
    return res.status(500).json({ message: 'Failed to initiate payment' });
  }
};






// ==========================================
// 2️⃣ Create Order (Manual / COD / Offline)
// ==========================================
export const createOrder = async (req, res) => {
  try {
    const { userId, medicines, totalAmount, shippingAddress, paymentMethod } = req.body;

    if (!userId || !medicines || !shippingAddress || !paymentMethod) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const parsedMedicines = typeof medicines === 'string' ? JSON.parse(medicines) : medicines;
    const prescription = req.files?.map((file) => file.filename) || [];

    const newOrder = new Order({
      user: userId,
      medicines: parsedMedicines,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'cash' ? 'pending' : 'paid',
      deliveryStatus: 'processing',
      prescription,
    });

    await newOrder.save();

    // ✅ Don't redirect from backend
    res.status(201).json({
      message: 'Order created successfully',
      redirectUrl: `${process.env.FRONTENDURL}/medicine/payment-success/${userId}`,
    });

  } catch (error) {
    console.error('❌ Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// ==========================================
// 3️⃣ SSLCommerz Payment Handlers
// ==========================================
export const paymentSuccess = async (req, res) => {
  try {
    const { transactionId } = req.params;
    await Order.findOneAndUpdate({ transactionId }, { paymentStatus: 'paid' });
    res.redirect(`${process.env.FRONTENDURL}/medicine/payment-success/${transactionId}`);
  } catch (err) {
    console.error('Payment success error:', err);
    res.status(500).send('Error processing success.');
  }
};

export const paymentFail = async (req, res) => {
  try {
    const { transactionId } = req.params;
    await Order.findOneAndUpdate({ transactionId }, { paymentStatus: 'failed' });
    res.redirect(`${process.env.FRONTENDURL}/medicine/payment-failed/${transactionId}`);
  } catch (err) {
    console.error('Payment fail error:', err);
    res.status(500).send('Error processing failure.');
  }
};

export const paymentCancel = async (req, res) => {
  try {
    const { transactionId } = req.params;
    await Order.findOneAndUpdate({ transactionId }, { paymentStatus: 'cancelled' });
    res.redirect(`${process.env.FRONTENDURL}/medicine/payment-cancel/${transactionId}`);
  } catch (err) {
    console.error('Payment cancel error:', err);
    res.status(500).send('Error processing cancel.');
  }
};









// ==========================================
// 4️⃣ Get Single Medicine by ID
// ==========================================
export const getMedicineById = async (req, res) => {
  try {
    const userId = req.id;

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('user')
      .populate('medicines.medicine');

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }

    res.status(200).json(orders);

  } catch (error) {
    console.error('Error getting orders by user ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};









// ==========================================
// 5️⃣ Get All Medicines
// ==========================================
export const getAllorders = async (req, res) => {
  try {
    const Orders = await Order.find().sort({ _id: -1 }).populate('medicines.medicine').populate('user');
    res.status(200).json(Orders);
  } catch (error) {
    console.error('Error fetching Orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};






// ==========================================
// 6️⃣ Update Order Status (payment + delivery)
// ==========================================
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log(orderId);
    
    const { paymentStatus, deliveryStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus, deliveryStatus },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ message: 'Order status updated', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};





// ==========================================
// 7️⃣ Delete Order
// ==========================================
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const deleted = await Order.findByIdAndDelete(orderId);

    if (!deleted) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ message: '🗑️ Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
