import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }, 
}, {
  timestamps: true
});

// this allows us to be able to compare givin password and password on file when logging in and decrypt password to compare if the password is correct or not for login using bcryptjs methods.

userSchema.methods.matchPassword = async function(passwordGiven) {
  return await bcrypt.compare(passwordGiven, this.password)
}

userSchema.pre('save', async function (next) {
  // checks to see if password has been modified if not it just moves on
  if(!this.isModified('password')) {
    next()
  }

  // this will take the inputted password hash and salt the inputed password by user. 
  const salt = await bcrypt.genSalt(10)

  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema);

export default User;