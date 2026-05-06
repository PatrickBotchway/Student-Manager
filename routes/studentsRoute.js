const express = require('express');
const router = express.Router();


const { getStudents, getStudent, addStudent, editStudent, removeStudent, getStudentCourses }  = require('../controllers/studentsController');
const { validateStudent, validateQuery } = require('../middleware/validation/studentValidation')
const { validateParams } = require('../middleware/validation/paramsValidation');
const { authToken } = require('../middleware/authentication/authTokens');

router.get('/', authToken, validateQuery, getStudents);

router.get('/:id', authToken, validateParams, getStudent);

router.post('/', authToken, validateStudent, addStudent);

router.put('/:id', authToken, validateParams, validateStudent, editStudent);

router.delete('/:id', authToken, validateParams, removeStudent);

router.get('/:id/courses', authToken, validateParams, getStudentCourses);

module.exports = router;