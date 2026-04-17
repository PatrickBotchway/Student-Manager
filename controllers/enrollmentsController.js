const studentsServices = require('../services/studentsService');
const coursesServices = require('../services/coursesService');
const enrollmentService = require('../services/enrollmentsService');

const enrollStudent = async (req, res) => {
    try {
        const student = await studentsServices.getStudentById(req.params.student_id);

        const course = await coursesServices.getCourseById(req.params.course_id);

        await enrollmentService.enrollStudent(req.params.student_id, req.params.course_id);

        res.status(201).json({
            success: true,
            data: {
                student: student,
                course: course,
            },
            message: `${student.name} has been enrolled in ${course.title}`
        });
    }
        
    catch (err) {
        if (err.message === 'The student with the given ID was not found!') {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }

        else if (err.message === 'The course with the given ID was not found') {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }

        else if (err.message === 'This student is already enrolled in this course!') {
            return res.status(409).json({
                success: false,
                message: err.message
            })
        }

        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Error enrolling student.'
        });
    }
};

const removeEnrollment = async (req, res) =>  {
    try {
        const student = await studentsServices.getStudentById(req.params.student_id);

        const course = await coursesServices.getCourseById(req.params.course_id);

        await enrollmentService.deleteEnrollment(req.params.student_id, req.params.course_id);

        res.status(201).json({
            success: true,
            data: {
                student: student,
                course: course,
            },
            message: `${student.name} has been disenrolled from ${course.title}`
        });
    }
    
    catch (err) {
        if (err.message === 'The student with the given ID was not found!') {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }

        else if (err.message === 'The course with the given ID was not found') {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }

        else if (err.message === 'This enrollment does not exist') {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }

        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Error deleting enrollment.'
        });
    }

}






module.exports = { enrollStudent, removeEnrollment };