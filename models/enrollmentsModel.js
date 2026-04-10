const db = require('../config/db');

// Helps to check if the requested enrollment already exists.
const findEnrollment  = async (student_id, course_id) => {
    const [ rows ] = await db.execute('SELECT * FROM enrollments WHERE student_id = ? AND course_id = ?', [student_id, course_id]);
    return rows[0];
};


const addEnrollment = async (student_id, course_id) => {
    const [ result ] = await db.execute('INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)', [student_id, course_id]);
    return result;
}








module.exports = { findEnrollment, addEnrollment }