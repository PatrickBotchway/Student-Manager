const studentsService = require('../services/studentsService');

const getStudents = async (req, res) => {
    try {
        const page = req.pagination.page || 1;
        const limit = req.pagination.limit || 10;

        const students = await studentsService.getAllStudents(page, limit)
        res.json({
            success: true,
            data: students
        });
    }
    
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Error fetching students'
        });
    };

}

const getStudent = async (req, res) => {
    try {
        const student = await studentsService.getStudentById(req.params.id);

        res.json({
            success: true,
            data: student
        });
       
    }
    
    catch (err) {
        console.error(err)

        if (err.message === 'The student with the given ID was not found!') {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }
        
        res.status(500).json({
            success: false,
            message: 'Error fetching student.'
        })
    }
    
    
}

const addStudent = async (req, res) => {
    try {
        const result = await studentsService.addNewStudent(req.body.name);
        res.status(201).json({
            success: true,
            data: {
                student_id: result.insertId,
                name: req.body.name
            }
        });
    }

    catch (err) {
        console.error(err)
        res.status(500).json({
            success: false,
            message: 'Error adding student.'
        })
    }
}

const editStudent = async (req, res) => {
    try {
        await studentsService.getStudentById(req.params.id);

        await studentsService.updateStudent(req.params.id, req.body.name)
        res.json({
            success: true,
            data: {
                student_id: req.params.id,
                name: req.body.name
            }
        });
    }

    catch (err) {
        console.error(err)

        if (err.message === 'The student with the given ID was not found!') {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }

        res.status(500).json({
            success: false,
            message: 'Error updating student.'
        })
    }
}

const removeStudent = async (req, res) => {
    try {
       const student = await studentsService.getStudentById(req.params.id);

        await studentsService.deleteStudent(req.params.id);
        res.json({
            success: true,
            data: student
        });
    }

    catch (err) {
        console.error(err);

        if (err.message === 'The student with the given ID was not found!') {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }

        else if (err.message === 'Cannot delete enrolled student!') {
            return res.status(409).json({
                success: false,
                message: err.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error deleting student'
        });
    }
}

// This gets all the courses the student with the given ID has enrolled in.
const getStudentCourses = async (req, res) => {
    try {
        await studentsService.getStudentById(req.params.id);
        
        const enrolledCourses = await studentsService.getStudentCourses(req.params.id);
        res.status(200).json({
            success: true,
            data: {
                student_id: req.params.id,
                enrolledCourses
            }
            
        });
    }
    
    catch (err) {
        console.error(err);

        if (err.message === 'The student with the given ID was not found!') {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }
        
        res.status(500).json({
            success: false,
            message: 'Error querying students for given course.'
        });
    }
}



module.exports = { getStudents, getStudent, addStudent, editStudent, removeStudent, getStudentCourses };