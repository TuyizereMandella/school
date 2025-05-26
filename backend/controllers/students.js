const Student = require('../models/Student');

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('classId', 'className');
    res.status(200).json({success: true,count: students.length,data: students});
  } catch (err) {
    res.status(400).json({success: false,error: err.message});
  }
};

exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('classId', 'className');
    if (!student) {
      return res.status(404).json({success: false,error: 'Student not found'});
    }
    res.status(200).json({success: true,data: student});
  } catch (err) {
    res.status(400).json({success: false,error: err.message});
  }
};


exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({success: true,data: student});
  } catch (err) {
    res.status(400).json({success: false,error: err.message});
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id,req.body,
      {new: true,runValidators: true}
    );
    if (!student) {
      return res.status(404).json({success: false,error: 'Student not found'});
    }
    res.status(200).json({success: true,data: student});
  } catch (err) {
    res.status(400).json({success: false,error: err.message});
  }
};


exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({success: false,error: 'Student not found'});
    }
    res.status(200).json({success: true,data: {}});
  } catch (err) {
    res.status(400).json({success: false,error: err.message});
  }
}; 