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
            message: `${student.name} is enrolled in ${course.title}`
        });
    }
        
    catch (err) {
        console.error(err);

        if (err.message === 'This student is already enrolled in this course!') {
            return res.status(409).json({
                success: false,
                message: err.message
            })
        }

        res.status(500).json({
            success: false,
            message: 'Error enrolling student.'
        });
    }
};






module.exports = { enrollStudent };