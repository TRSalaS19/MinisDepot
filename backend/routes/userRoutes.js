import express from 'express';
const router = express.Router();
import {
  userAuth, 
  userProfile, 
  userRegister, 
  updateProfile,
  getAdminUserList, 
  adminDeleteUser,
  adminUpdateUser,
  adminGetUserDetailsId
} from '../controllerMethods/userControllers.js';
import {
  adminAccess,
  protect
} from '../middleware/authMiddleware.js';

router
  .route('/')
  .post(userRegister)
  .get(protect, adminAccess, getAdminUserList)

router.post('/login', userAuth)

router
  .route('/profile')
  .get(protect, userProfile)
  .put(protect, updateProfile)

router
  .route('/:id')
  .delete(protect, adminAccess, adminDeleteUser)
  .get(protect, adminAccess, adminGetUserDetailsId)
  .put(protect, adminAccess, adminUpdateUser)

export default router