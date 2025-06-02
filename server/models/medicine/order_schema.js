import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  medicines: [
    {
      medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalAmount: { 
    type: Number, 
    required: true 
  },
  shippingAddress: { 
    type: String, 
    required: true 
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
  deliveryStatus: {
    type: String,
    enum: ['processing', 'shipped', 'delivered'],
    default: 'processing'
  }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

export default Order;

