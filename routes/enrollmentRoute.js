const express = require('express');
const router = express.Router();

const { enrollStudent, removeEnrollment } = require('../controllers/enrollmentsController');
const { validateParams } = require('../middleware/paramsValidation');

router.post('/:student_id/:course_id', validateParams, enrollStudent);
router.delete('/:student_id/:course_id', validateParams, removeEnrollment)


module.exports = router;