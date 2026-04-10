const studentsService = require('../services/studentsService');

const getStudents = async (req, res) => {
    try {
        const students = await studentsService.getAllStudents()
        res.json(students);
    }
    
    catch (err) {
        console.error(err);
        res.status(500).json('Error fetching students');
    };

}

const getStudent = async (req, res) => {
    try {
        const student = await studentsService.getStudentById(req.params.id);

        res.json(student);
       
    }
    
    catch (err) {
        console.error(err)

        if (err.message === 'The student with the given ID was not found!') {
            return res.status(404).json(err.message)
        }
        
        res.status(500).json('Error fetching data.')
    }
    
    
}

const addStudent = async (req, res) => {
    try {
        const result = await studentsService.addNewStudent(req.body.name);
        res.status(201).json({
            student_id: result.insertId,
            name: req.body.name
        });
    }

    catch (err) {
        console.error(err)
        res.status(500).json('Error Adding Student.')
    }
}

const editStudent = async (req, res) => {
    try {
        await studentsService.getStudentById(req.params.id);

        await studentsService.updateStudent(req.params.id, req.body.name)
        res.json({
            student_id: req.params.id,
            name: req.body.name
        });
    }

    catch (err) {
        console.error(err)

        if (err.message === 'The student with the given ID was not found!') {
            return res.status(404).json(err.message)
        }

        res.status(500).json('Error Updating Student.')
    }
}

const removeStudent = async (req, res) => {
    try {
       const student = await studentsService.getStudentById(req.params.id);

        await studentsService.deleteStudent(req.params.id);
        res.json(student);
    }

    catch (err) {
        console.error(err);

        if (err.message === 'The student with the given ID was not found!') {
            return res.status(404).json(err.message)
        }

        else if (err.message === 'Cannot delete enrolled student!') {
            return res.status(409).json(err.message);
        }

        res.status(500).json('Error Deleting Student');
    }
}

// This gets all the courses the student with the given ID has enrolled in.
const getStudentCourses = async (req, res) => {
    try {
        await studentsService.getStudentById(req.params.id);
        
        const enrolledCourses = await studentsService.getStudentCourses(req.params.id);
        res.status(200).json({
            student_id: req.params.id,
            enrolledCourses
        });
    }
    
    catch (err) {
        console.error(err);

        if (err.message === 'The student with the given ID was not found!') {
            return res.status(404).json(err.message)
        }
        
        res.status(500).json('Error querying students for given course.');
    }
}



module.exports = { getStudents, getStudent, addStudent, editStudent, removeStudent, getStudentCourses };