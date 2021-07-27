import asyncHandler from 'express-async-handler';
import tokenGenerate from '../utilities/tokenGen.js';
import User from '../models/userModel.js';

// auth user and receive token
// POST/db/users/login route
// public

const userAuth = asyncHandler(async(req, res) => {
// we obtain values from form in the lgoin page, then pass the password to match and authenticate. if the input password and stored hashed password match then user is authenitcated and user info is available as well as token. 

  const { email, password } = req.body;

  const user = await User.findOne({email})

  if(user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: tokenGenerate(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Incorrect user password or email. Please try again');
  }
})


// Get user profile
// GET/db/users/profile route
// private

const userProfile = asyncHandler(async(req, res) => {
  // if user is authenticated and authorized with jwt token. the route will return selected user info. 

  const user = await User.findById(req.user._id)

  if(user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
})

// register new user
// Post/db/users
// public

const userRegister = asyncHandler(async(req, res) => {
  
    const { name, password, email} = req.body;
  
    const userExists = await User.findOne({email})
  
    if(userExists) {
      res.status(400)
      throw new Error(`Account with that email already exists. Please login or create a new account`)
    } 

    // password will be hashed and salted before save as instructed in userModel.js
    const user = await User.create({
      name,
      email,
      password
    })

    if(user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: tokenGenerate(user._id)
      })
    } else {
      res.status(400)
      throw new Error("Invalid User data. Please try again!")
    }
  })


export {
  userAuth,
  userProfile,
  userRegister
}