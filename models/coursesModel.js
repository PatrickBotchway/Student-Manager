const db = require('../config/db');

const findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM courses')
    return (rows);
}

const findById = async (id) => {
    const [ rows ] = await db. execute('SELECT * FROM courses WHERE course_id = ?', [id]);
    return rows[0];
}

const create = async (title, code, capacity) => {
    return await db.execute('INSERT INTO courses (title, code, capacity) VALUES(?, ?, ?)', [title, code, capacity])
}

const updateTitle = async (id, title) => {
    await db.execute('UPDATE courses SET title = ? WHERE course_id = ?', [ title, id ])
}

const updateCode = async (id, code) => {
    await db.execute('UPDATE courses SET code = ? WHERE course_id = ?', [ code, id ])
}

// Counts the number of enrollments for the course with the given ID.
const enrollmentCount = async (id) => {
    const [ rows ] = await db.execute('SELECT COUNT(*) AS count FROM enrollments WHERE course_id = ?', [id]);
    return rows[0];
}

const updateCapacity = async (id, capacity) => {
    await db.execute('UPDATE courses SET capacity = ? WHERE course_id = ?', [ capacity, id ])
}

const remove = async (id) => {
    await db.execute('DELETE FROM courses WHERE course_id = ?', [id])
}

// This finds all the students who have enrolled in the course with the given ID.
const findCourseStudents = async (id) => {
    const [ rows ] = await db.execute('SELECT e.student_id, s.name FROM enrollments e JOIN students s USING (student_id) WHERE e.course_id = ? ORDER BY s.name', [id]);
    return rows;
}

module.exports = { findAll, findById, create, updateTitle, updateCode, remove, findCourseStudents, updateCapacity, enrollmentCount };