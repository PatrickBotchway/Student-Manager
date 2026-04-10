const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/coursesController');
const { validateCourse, validateCourseTitle, validateCourseCode, validateCourseCapacity } = require('../middleware/courseValidation')

router.get('/', coursesController.getCourses);

router.get('/:id', coursesController.getCourse);

router.post('/', validateCourse, coursesController.addCourse);

router.put('/title/:id', validateCourseTitle, coursesController.editCourseTitle);

router.put('/code/:id', validateCourseCode, coursesController.editCourseCode);

router.put('/capacity/:id', validateCourseCapacity, coursesController.editCourseCapacity);

router.delete('/:id', coursesController.removeCourse);

router.get('/:id/students', coursesController.getCourseStudents);

module.exports = router;