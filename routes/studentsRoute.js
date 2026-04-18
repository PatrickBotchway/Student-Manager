const express = require('express');
const router = express.Router();


const studentsController  = require('../controllers/studentsController');
const { validateStudent, validateQuery } = require('../middleware/studentValidation')
const { validateParams } = require('../middleware/paramsValidation');

router.get('/', validateQuery, studentsController.getStudents);

router.get('/:id', validateParams, studentsController.getStudent);

router.post('/', validateStudent, studentsController.addStudent);

router.put('/:id', validateParams, validateStudent, studentsController.editStudent);

router.delete('/:id', validateParams, studentsController.removeStudent);

router.get('/:id/courses', validateParams, studentsController.getStudentCourses);

module.exports = router;