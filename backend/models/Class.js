const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  className: {
    type: String,
    required: [true, 'Please provide a class name'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Class', ClassSchema); 