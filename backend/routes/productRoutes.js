import express from 'express';
const router = express.Router();
import { getAllProducts, getProductById} from '../controllerMethods/productControllers.js';


router.route('/').get(getAllProducts);
router.route('/:id').get(getProductById);


export default router