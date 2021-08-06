import express from 'express';
const router = express.Router();
import { 
  getAllProducts, 
  getProductById, 
  adminDeleteProduct, 
  adminCreateProduct,
  adminUpdateProduct
} from '../controllerMethods/productControllers.js';
import { adminAccess, protect } from '../middleware/authMiddleware.js';


router.route('/').get(getAllProducts).post(protect, adminAccess, adminCreateProduct);
router.
  route('/:id')
  .get(getProductById)
  .delete(protect, adminAccess, adminDeleteProduct)
  .put(protect, adminAccess, adminUpdateProduct);


export default router