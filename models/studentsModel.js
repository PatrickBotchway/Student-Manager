const db = require('../config/db');

const findAll = async (limit, offset) => {
    const [ students ] = await db.execute('SELECT * FROM students LIMIT ? OFFSET ?', [String(limit), String(offset)])
    const [ total ] = await db.execute('SELECT COUNT(*) AS total FROM students')
    return { students: students, total: total[0].total };
}


const findById = async (id) => {
    const [ row ] = await db. execute('SELECT * FROM students WHERE student_id = ?', [id]);
    return row[0];
}

const create = async (name) => {
    const [ result ] = await db.execute('INSERT INTO students (name) VALUES(?)', [name]);
    return result
}

const update = async (id, name) => {
    await db.execute('UPDATE students SET name = ? WHERE student_id = ?', [name, id])
}

// Counts the number of enrollments for the student with the given ID.
const countCourses = async (id) => {
    const [ rows ] = await db.execute('SELECT COUNT(*) AS count FROM enrollments WHERE student_id = ?', [id]);
    return rows[0];
}

const remove = async (id) => {
    await db.execute('DELETE FROM students WHERE student_id = ?', [id])
}

// This finds all the courses the student with the given ID has enrolled in.
const findStudentCourses = async (id) => {
    const [ rows ] = await db.execute('SELECT e.course_id, c.title, c.code FROM enrollments e JOIN courses c USING (course_id) WHERE student_id = ? ORDER BY e.course_id', [id]);
    return rows;
}

module.exports = { findAll, findById, create, update, remove, findStudentCourses, countCourses };