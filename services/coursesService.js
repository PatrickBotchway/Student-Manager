const coursesModel = require('../models/coursesModel');

const getAllCourses = async () => {
    return await coursesModel.findAll();
}

const getCourseById = async (id) => {
    const course = await coursesModel.findById(id);

    if (!course){
        throw new Error('The course with the given ID was not found');
    }

    return course;
}

const addNewCourse = async (title, code, capacity) => {
    const [ result ] = await coursesModel.create(title, code, capacity);
    return result;
}

const updateCourseTitle = async (id, title) => {
    return await coursesModel.updateTitle(id, title);
}

const updateCourseCode = async (id, code) => {
    return await coursesModel.updateCode(id, code);
}

const updateCourseCapacity = async (id, capacity) => {
    const enrollments = await coursesModel.enrollmentCount(id)

    if (enrollments.count > capacity) {
        throw new Error('The current enrollments exceed the desired course capacity!')
    }

    return await coursesModel.updateCapacity(id, capacity);
}

const deleteCourse = async (id) => {
    const enrollments = await coursesModel.enrollmentCount(id);

    if (enrollments.count > 0) {
        throw new Error('Cannot delete a course with students enrolled in it!')
    }

    return await coursesModel.remove(id)
}

const getCourseStudents = async (id) => {
    return await coursesModel.findCourseStudents(id);
}


module.exports = { getAllCourses, getCourseById, addNewCourse, updateCourseTitle, updateCourseCode, updateCourseCapacity, deleteCourse, getCourseStudents }