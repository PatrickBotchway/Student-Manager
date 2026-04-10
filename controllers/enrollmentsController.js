const studentsServices = require('../services/studentsService');
const coursesServices = require('../services/coursesService');
const enrollmentService = require('../services/enrollmentsService');

const enrollStudent = async (req, res) => {
    try {
            const student = await studentsServices.getStudentById(req.params.student_id);

            const course = await coursesServices.getCourseById(req.params.course_id);

            await enrollmentService.enrollStudent(req.params.student_id, req.params.course_id);
            res.status(201).json({
                student: student,
                course: course,
                Message: 'Enrollment was successful!'
            })
            
        }
        
        catch (err) {
            console.error(err);

            if (err.message === 'This student is already enrolled in this course!') {
                return res.status(409).json(err.message)
            }
            res.status(500).json('Error enrolling student.');
        }
};






module.exports = { enrollStudent };