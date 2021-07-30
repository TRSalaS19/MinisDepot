import express from 'express';
const router = express.Router();
import {
  orderDetails, 
  getOrderDetailsId 
} from '../controllerMethods/orderControllers.js';
import {protect} from '../middleware/authMiddleware.js';

router.route('/').post(protect, orderDetails);
router.route('/:id').get(protect, getOrderDetailsId);

export default router;