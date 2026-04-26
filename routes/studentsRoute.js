const express = require('express');
const router = express.Router();


const studentsController  = require('../controllers/studentsController');
const { validateStudent, validateQuery } = require('../middleware/validation/studentValidation')
const { validateParams } = require('../middleware/validation/paramsValidation');
const { authToken } = require('../middleware/authentication/authTokens');

router.get('/', authToken, validateQuery, studentsController.getStudents);

router.get('/:id', authToken, validateParams, studentsController.getStudent);

router.post('/', authToken, validateStudent, studentsController.addStudent);

router.put('/:id', authToken, validateParams, validateStudent, studentsController.editStudent);

router.delete('/:id', authToken, validateParams, studentsController.removeStudent);

router.get('/:id/courses', authToken, validateParams, studentsController.getStudentCourses);

module.exports = router;