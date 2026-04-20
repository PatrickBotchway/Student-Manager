const studentsService = require('../services/studentsService');

const getStudents = async (req, res) => {
    try {
        const page = req.pagination.page || 1;
        const limit = req.pagination.limit || 10;



        const { students, total } = await studentsService.getAllStudents(page, limit)
        res.status(200).json({
            success: true,
            data: students,
            message: 'Students fetched successfully',
            meta: {
                page: page,
                limit: limit,
                total: total,
                totalPages: Math.ceil(total/limit),
                hasPreviousPage: page > 1,
                hasNextPage: page < Math.ceil(total/limit)
            }
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

        res.status(200).json({
            success: true,
            data: student,
            message: 'Student fetched successfully'
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
            },
            message: 'Student was created successfully'
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
        const student = await studentsService.getStudentById(req.params.id);

        await studentsService.updateStudent(req.params.id, req.body.name)
        res.status(200).json({
            success: true,
            data: {
                student_id: req.params.id,
                name: req.body.name
            },
            message: `Student ${student.name} has been changed to ${req.body.name} successfully`
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
        res.status(200).json({
            success: true,
            data: student,
            message: `${student.name} has been deleted successfully`
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
        const student = await studentsService.getStudentById(req.params.id);
        
        const enrolledCourses = await studentsService.getStudentCourses(req.params.id);
        res.status(200).json({
            success: true,
            data: {
                student_id: req.params.id,
                enrolledCourses
            },
            message: `Courses ${student.name} has enrolled in has been fetched successfully`
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