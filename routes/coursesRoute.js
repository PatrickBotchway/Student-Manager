const express = require('express');
const router = express.Router();

const { getCourses, getCourse, addCourse, editCourseTitle, editCourseCode, editCourseCapacity, removeCourse, getCourseStudents } = require('../controllers/coursesController');
const { validateCourse, validateCourseTitle, validateCourseCode, validateCourseCapacity, validateQuery } = require('../middleware/validation/courseValidation');
const { validateParams } = require('../middleware/validation/paramsValidation');
const { authToken } = require('../middleware/authentication/authTokens');

router.get('/', authToken, validateQuery, getCourses);

router.get('/:id', authToken, validateParams, getCourse);

router.post('/', authToken, validateCourse, addCourse);

router.put('/title/:id', authToken, validateParams, validateCourseTitle, editCourseTitle);

router.put('/code/:id', authToken, validateParams, validateCourseCode, editCourseCode);

router.put('/capacity/:id', authToken, validateParams, validateCourseCapacity, editCourseCapacity);

router.delete('/:id', authToken, validateParams, removeCourse);

router.get('/:id/students', authToken, validateParams, validateQuery, getCourseStudents);

module.exports = router;