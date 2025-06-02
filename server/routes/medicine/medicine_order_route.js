import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  updateOrderStatus,
  deleteOrder
} from '../../controllers/medicine/medicine_order_controller';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/user/:userId', getOrdersByUser);
router.get('/:id', getOrderById);
router.put('/:id', updateOrderStatus);
router.delete('/:id', deleteOrder);

export default router;
