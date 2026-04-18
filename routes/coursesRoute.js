const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/coursesController');
const { validateCourse, validateCourseTitle, validateCourseCode, validateCourseCapacity, validateQuery } = require('../middleware/courseValidation')
const { validateParams } = require('../middleware/paramsValidation')

router.get('/', validateQuery, coursesController.getCourses);

router.get('/:id', validateParams, coursesController.getCourse);

router.post('/', validateCourse, coursesController.addCourse);

router.put('/title/:id', validateParams, validateCourseTitle, coursesController.editCourseTitle);

router.put('/code/:id', validateParams, validateCourseCode, coursesController.editCourseCode);

router.put('/capacity/:id', validateParams, validateCourseCapacity, coursesController.editCourseCapacity);

router.delete('/:id', validateParams, coursesController.removeCourse);

router.get('/:id/students', validateParams, validateQuery, coursesController.getCourseStudents);

module.exports = router;