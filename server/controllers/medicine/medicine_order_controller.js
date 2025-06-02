import Order from '../models/Order.js';
import Medicine from '../models/Medicine.js';

// @desc Create a new order
export const createOrder = async (req, res) => {
  try {
    const { user, medicines, shippingAddress } = req.body;

    // Calculate total amount from medicine prices and quantities
    let totalAmount = 0;
    for (const item of medicines) {
      const medicine = await Medicine.findById(item.medicine);
      if (!medicine) throw new Error(`Medicine not found: ${item.medicine}`);
      totalAmount += medicine.price * item.quantity;
    }

    const newOrder = new Order({
      user,
      medicines,
      shippingAddress,
      totalAmount,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc Get all orders (admin use)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('medicines.medicine', 'name price');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('medicines.medicine', 'name price');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Get orders by user ID
export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate('medicines.medicine', 'name price');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Update order status (payment/delivery)
export const updateOrderStatus = async (req, res) => {
  try {
    const { paymentStatus, deliveryStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        ...(paymentStatus && { paymentStatus }),
        ...(deliveryStatus && { deliveryStatus })
      },
      { new: true, runValidators: true }
    );

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc Delete order by ID
export const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
