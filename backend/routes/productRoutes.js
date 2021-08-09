import express from 'express';
const router = express.Router();
import { 
  getAllProducts, 
  getProductById,
  createNewProductReview, 
  getTopRatedProducts,
  adminDeleteProduct, 
  adminCreateProduct,
  adminUpdateProduct
} from '../controllerMethods/productControllers.js';
import { adminAccess, protect } from '../middleware/authMiddleware.js';


router.route('/').get(getAllProducts).post(protect, adminAccess, adminCreateProduct);
router.route('/toprated').get(getTopRatedProducts);
router.
  route('/:id')
  .get(getProductById)
  .delete(protect, adminAccess, adminDeleteProduct)
  .put(protect, adminAccess, adminUpdateProduct);
router.route('/:id/reviews').post(protect, createNewProductReview);
  

export default router