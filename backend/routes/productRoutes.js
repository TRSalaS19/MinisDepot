import express from 'express';
const router = express.Router();
import { getAllProducts, getProductById, adminDeleteProduct} from '../controllerMethods/productControllers.js';
import { adminAccess, protect } from '../middleware/authMiddleware.js';


router.route('/').get(getAllProducts);
router.
  route('/:id')
  .get(getProductById)
  .delete(protect, adminAccess, adminDeleteProduct);


export default router