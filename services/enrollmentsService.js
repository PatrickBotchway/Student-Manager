const enrollmentModel = require('../models/enrollmentsModel');

const enrollStudent = async (student_id, course_id) => {
    const existingEnrollment = await enrollmentModel.findEnrollment(student_id, course_id);

    if (existingEnrollment) {
        throw new Error('This student is already enrolled in this course!');
    }

    return await enrollmentModel.addEnrollment(student_id, course_id);
}

module.exports = { enrollStudent }