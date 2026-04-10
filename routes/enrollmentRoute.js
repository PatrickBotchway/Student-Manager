const express = require('express');
const router = express.Router();

const enrollment = require('../controllers/enrollmentsController');

router.post('/:student_id/:course_id', enrollment.enrollStudent);


module.exports = router;