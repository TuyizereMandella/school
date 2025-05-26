const express = require('express');
const {getStudents,getStudent,createStudent,updateStudent,deleteStudent} = require('../controllers/students');
const router = express.Router();
const { protect } = require('../middleware/auth');
router.use(protect);

router
  .route('/')
  .get(getStudents)
  .post(createStudent);

router
  .route('/:id')
  .get(getStudent)
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router; 