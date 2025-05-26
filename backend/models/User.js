const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: {type: String,required: [true, 'username required'],unique: true,trim: true,
      minlength: [3, 'at least 3 characters']},
  email: {type: String,required: [true, 'Please provide an email'],unique: true,
  },
  password: {type: String,required: [true, 'password required'],
    minlength: [6, 'at least 6 characters'],
    select: false
  },
  createdAt: {type: Date,default: Date.now}
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getSignedJwtToken = function() {
  const secret = process.env.JWT_SECRET || 'mysupersecretkey123456789';
  const expiresIn = process.env.JWT_EXPIRE || '30d';
  return jwt.sign({ id: this._id },secret,{ expiresIn });
};


UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema); 