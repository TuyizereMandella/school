const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({username,email,password});
    sendTokenResponse(user, 201, res);
  } catch (err) {
    res.status(400).json({success: false,error: err.message});
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({success: false,error: 'Please provide an email and password'});
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({success: false,error: 'Invalid credentials'});
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({success: false,error: 'Invalid credentials'});
    }
    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({success: false,error: err.message});
  }
};


exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({success: true,data: user});
  } catch (err) {
    res.status(400).json({success: false,error: err.message});
  }
};

exports.logout = async (req, res) => {
  res.status(200).json({success: true,data: {}});
};
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({success: true,token});
}; 