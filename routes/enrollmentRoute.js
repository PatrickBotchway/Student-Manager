const express = require('express');
const router = express.Router();

const { enrollStudent, removeEnrollment } = require('../controllers/enrollmentsController');
const { validateParams } = require('../middleware/validation/paramsValidation');
const { authToken } = require('../middleware/authentication/authTokens');

router.post('/:student_id/:course_id', authToken, validateParams, enrollStudent);
router.delete('/:student_id/:course_id', authToken, validateParams, removeEnrollment)


module.exports = router;