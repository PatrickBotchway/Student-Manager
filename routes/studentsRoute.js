const express = require('express');
const router = express.Router();


const studentsController  = require('../controllers/studentsController');
const { validateStudent } = require('../middleware/studentValidation')

router.get('/', studentsController.getStudents);

router.get('/:id', studentsController.getStudent);

router.post('/', validateStudent, studentsController.addStudent);

router.put('/:id', validateStudent, studentsController.editStudent);

router.delete('/:id', studentsController.removeStudent);

router.get('/:id/courses', studentsController.getStudentCourses);

module.exports = router;