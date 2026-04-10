const studentsModel = require('../models/studentsModel');

const getAllStudents = async () => {
        return await studentsModel.findAll();
}

const getStudentById = async (id) => {
        const student = await studentsModel.findById(id);

        if (!student) {
        throw new Error('The student with the given ID was not found!');
        }

        return student;
}

const addNewStudent = async (name) => {
        return await studentsModel.create(name);
}

const updateStudent = async (id, name) => {
        return await studentsModel.update(id, name)
}

const deleteStudent = async (id) => {
        const enrollments = await studentsModel.countCourses(id);
        
        if (enrollments.count > 0) {
                throw new Error('Cannot delete enrolled student!');
        }

        return await studentsModel.remove(id)
}

const getStudentCourses = async (id) => {
        return await studentsModel.findStudentCourses(id);
}




module.exports = { getAllStudents, getStudentById, addNewStudent, updateStudent, deleteStudent, getStudentCourses }