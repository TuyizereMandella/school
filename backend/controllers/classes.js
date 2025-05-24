const Class = require('../models/Class');

// @desc    Get all classes
// @route   GET /api/classes
// @access  Private
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    
    res.status(200).json({
      success: true,
      count: classes.length,
      data: classes
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get single class
// @route   GET /api/classes/:id
// @access  Private
exports.getClass = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id);

    if (!classData) {
      return res.status(404).json({
        success: false,
        error: 'Class not found'
      });
    }

    res.status(200).json({
      success: true,
      data: classData
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Create new class
// @route   POST /api/classes
// @access  Private
exports.createClass = async (req, res) => {
  try {
    const classData = await Class.create(req.body);

    res.status(201).json({
      success: true,
      data: classData
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Update class
// @route   PUT /api/classes/:id
// @access  Private
exports.updateClass = async (req, res) => {
  try {
    const classData = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!classData) {
      return res.status(404).json({
        success: false,
        error: 'Class not found'
      });
    }

    res.status(200).json({
      success: true,
      data: classData
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Delete class
// @route   DELETE /api/classes/:id
// @access  Private
exports.deleteClass = async (req, res) => {
  try {
    const classData = await Class.findByIdAndDelete(req.params.id);

    if (!classData) {
      return res.status(404).json({
        success: false,
        error: 'Class not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
}; 