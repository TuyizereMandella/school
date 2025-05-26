const Class = require('../models/Class');

exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json({success: true,count: classes.length,data: classes});
  } catch (err) {
    res.status(400).json({success: false,error: err.message});
  }
};

exports.getClass = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id);
    if (!classData) {
      return res.status(404).json({success: false,error: 'Class not found'});
    }
    res.status(200).json({success: true,data: classData});
  } catch (err) {
    res.status(400).json({success: false,error: err.message});
  }
};

exports.createClass = async (req, res) => {
  try {
    const classData = await Class.create(req.body);
    res.status(201).json({success: true,data: classData});
  } catch (err) {
    res.status(400).json({success: false,error: err.message});
  }
};

exports.updateClass = async (req, res) => {
  try {
    const classData = await Class.findByIdAndUpdate(req.params.id,req.body,
      {new: true,runValidators: true}
    );
    if (!classData) {
      return res.status(404).json({success: false,error: 'Class not found'});
    }
    res.status(200).json({success: true,data: classData});
  } catch (err) {
    res.status(400).json({success: false,error: err.message});
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const classData = await Class.findByIdAndDelete(req.params.id);
    if (!classData) {
      return res.status(404).json({success: false,error: 'Class not found'});
    }
    res.status(200).json({success: true,data: {}});
  } catch (err) {
    res.status(400).json({success: false,error: err.message});
  }
}; 