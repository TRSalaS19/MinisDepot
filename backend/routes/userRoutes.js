import express from 'express';
const router = express.Router();
import {userAuth, userProfile, userRegister} from '../controllerMethods/userControllers.js';
import {protect} from '../middleware/authMiddleware.js';

router.route('/').post(userRegister)
router.post('/login', userAuth)
router.route('/profile').get(protect, userProfile)

export default router