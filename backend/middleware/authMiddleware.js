import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async(req,res, next) => {
  let token 

  // checks to see if there is a auth in headers that starts with bearer if it exists it decodes it with jwt verify method passing in the token and jwt secrete... it the searches users by the decoded users id without password. if token, jwt secrete or bearer does not match then user is not authorized. 
  if(
    req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRETE)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not Authorized, token')
    }
  }

  if(!token) {
    res.status(401)
    throw new Error('You Are not Authorized to view this page')
  }
})

const adminAccess = (req, res, next) => {
  if(req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401)
    throw new Error("You are not authorized to view this page")
  }
}

export { 
  protect,
  adminAccess
}