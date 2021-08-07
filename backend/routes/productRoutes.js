import express from 'express';
const router = express.Router();
import { 
  getAllProducts, 
  getProductById,
  createNewProductReview, 
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
router.route('/:id/reviews').post(protect, createNewProductReview)


export default router