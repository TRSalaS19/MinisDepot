import express from 'express';
const router = express.Router();
import {
  orderDetails, 
  getOrderDetailsId,
  orderPaidUpdate,
  getUserOrders,
  adminOrdersList
} from '../controllerMethods/orderControllers.js';
import {adminAccess, protect} from '../middleware/authMiddleware.js';

router.
  route('/')
  .post(protect, orderDetails)
  .get(protect, adminAccess, adminOrdersList);
router.route('/userorders').get(protect, getUserOrders);
router.route('/:id').get(protect, getOrderDetailsId);
router.route('/:id/pay').put(protect, orderPaidUpdate);

export default router;