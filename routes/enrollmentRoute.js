const express = require('express');
const router = express.Router();

const { enrollStudent, removeEnrollment } = require('../controllers/enrollmentsController');

router.post('/:student_id/:course_id', enrollStudent);
router.delete('/:student_id/:course_id', removeEnrollment)


module.exports = router;