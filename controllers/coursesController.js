const coursesModel = require('../models/coursesModel');
const coursesService = require('../services/coursesService');

const getCourses = async (req, res) => {
    try {
        const page = req.pagination.page || 1;
        const limit = req.pagination.limit || 10;

        const { courses, total } = await coursesService.getAllCourses(page, limit);
        res.status(200).json({
            success: true,
            data: courses,
            message: 'Courses fetched successfully',
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
            message: 'Error fetching courses'
        });
    };

}

const getCourse = async (req, res) => {
    try {
        const course = await coursesService.getCourseById(req.params.id);

        res.status(200).json({
            success: true,
            data: course,
            message: 'Course fetched successfully'
        });
    }

    catch (err) {
        console.error(err)

        if (err.message === 'The course with the given ID was not found') {
            return res.status(404).json({
                success: false,
                message: err.message
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Error fetching data.'
        });
    }


}

const addCourse = async (req, res) => {
    try {
        const result = await coursesService.addNewCourse(req.body.title, req.body.code, req.body.capacity);
        res.status(201).json({
            success: true,
            data: {
                course_id: result.insertId,
                title: req.body.title,
                code: req.body.code,
                capacity: req.params.capacity
            },
            message: 'Course was created successfully'
        });
    }

    catch (err) {
        console.error(err)
        res.status(500).json({
            success: false,
            message: 'Error Adding Course'
        })
    }
}

const editCourseTitle = async (req, res) => {
    try {
        const  course  = await coursesService.getCourseById(req.params.id);

        await coursesService.updateCourseTitle(req.params.id, req.body.title);
        res.status(200).json({
            success: true,
            data: {
                course_id: req.params.id,
                title: req.body.title,
                code: course.code,
                capacity: course.capacity
            },
            message: `Title ${course.title} has been changed to ${req.body.title} successfully`
        });
    }

    catch (err) {
        console.error(err)

        if (err.message === 'The course with the given ID was not found') {
            return res.status(404).json({
                success: false,
                message: err.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error Updating Course Title.'
        })
    }
}

const editCourseCode = async (req, res) => {
    try {
        const course = await coursesService.getCourseById(req.params.id);

        await coursesService.updateCourseCode(req.params.id, req.body.code)
        res.status(200).json({
            success: true,
            data: {
                course_id: req.params.id,
                title: course.title,
                code: req.body.code,
                capacity: course.capacity
            },
            message: `Code ${course.code} has been changed to ${req.body.code} successfully`
        });
    }

    catch (err) {
        console.error(err)

        if (err.message === 'The course with the given ID was not found') {
            return res.status(404).json({
                success: false,
                message: err.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error Updating Course Code.'
        })
    }
}

const editCourseCapacity = async (req, res) => {
    try {
        const course = await coursesService.getCourseById(req.params.id)

        await coursesService.updateCourseCapacity(req.params.id, req.body.capacity);

        res.status(200).json({
            success: true,
            data: {
                course_id: req.params.id,
                title: course.title,
                code: course.code,
                capacity: req.body.capacity
            },
            message: `Capacity {course.capacity} has been changed to ${req.body.capacity} successfully`
        });
    }

    catch (err) {
        console.error(err)

        if (err.message === 'The course with the given ID was not found') {
            return res.status(404).json({
                success: false,
                message: err.message
            });
        }

        else if (err.message === 'The current enrollments exceed the desired course capacity!') {
            return res.status(409).json({
                success: false,
                message: err.message
            })
        }
        
        res.status(500).json({
            success: false,
            message: 'Error Updating Course Capacity.'
        })
    }
}

const removeCourse = async (req, res) => {
    try {
        const course = await coursesService.getCourseById(req.params.id);

        await coursesService.deleteCourse(req.params.id);
        res.status(200).json({
            success: true,
            data: course,
            message: `${course.title} has been deleted successfully`
        });
    }
    catch (err) {
        console.error(err);

        if (err.message === 'The course with the given ID was not found') {
            return res.status(404).json({
                success: false,
                message: err.message
            });
        }

        else if (err.message === 'Cannot delete a course with students enrolled in it!') {
            return res.status(409).json({
                success: false,
                message: err.message
            })
        }

        res.status(500).json({
            success: false,
            message: 'Error Deleting Course'
        })
    }
}

// This gets all the students who have enrolled in the course with the given ID.
const getCourseStudents = async (req, res) => {
    try {
        const course = await coursesService.getCourseById(req.params.id);

        const page = req.pagination.page;
        const limit = req.pagination.limit;

        const { students, total } = await coursesService.getCourseStudents(req.params.id, page, limit);

        res.status(200).json({
            success: true,
            data: {
                course_id: req.params.id,
                students
            },
            message: `Students enrolled in ${course.title} have been fetched successfully`,
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

        if (err.message === 'The course with the given ID was not found') {
            return res.status(404).json({
                success: false,
                message: err.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error querying students for the given course.'
        });
    }
}

module.exports = { getCourses, getCourse, addCourse, editCourseTitle, editCourseCode, editCourseCapacity, removeCourse, getCourseStudents };