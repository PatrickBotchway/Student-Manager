const coursesModel = require('../models/coursesModel');
const coursesService = require('../services/coursesService');

const getCourses = async (req, res) => {
    try {
        const courses = await coursesService.getAllCourses();
        res.json(courses);
    }
    
    catch (err) {
        console.error(err);
        res.status(500).json('Error fetching courses');
    };

}

const getCourse = async (req, res) => {
    try {
        const course = await coursesService.getCourseById(req.params.id);

        res.json(course);
    }

    catch (err) {
        console.error(err)

        if (err.message === 'The course with the given ID was not found') {
            return res.status(404).json(err.message);
        }
        
        res.status(500).json('Error fetching data.')
    }


}

const addCourse = async (req, res) => {
    try {
        const result = await coursesService.addNewCourse(req.body.title, req.body.code, req.body.capacity);
        res.json({
            course_id: result.insertId,
            title: req.body.title,
            code: req.body.code,
            capacity: req.params.capacity
        });
    }

    catch (err) {
        console.error(err)
        res.status(500).json('Error Adding Course.')
    }
}

const editCourseTitle = async (req, res) => {
    try {
        const  course  = await coursesService.getCourseById(req.params.id);

        await coursesService.updateCourseTitle(req.params.id, req.body.title);
        res.json({
            course_id: req.params.id,
            title: req.body.title,
            code: course.code
        });
    }

    catch (err) {
        console.error(err)

        if (err.message === 'The course with the given ID was not found') {
            return res.status(404).json(err.message);
        }

        res.status(500).json('Error Updating Course Title.')
    }
}

const editCourseCode = async (req, res) => {
    try {
        const course = await coursesService.getCourseById(req.params.id);

        await coursesService.updateCourseCode(req.params.id, req.body.code)
        res.json({
            course_id: req.params.id,
            title: course.title,
            code: req.body.code
        });
    }

    catch (err) {
        console.error(err)

        if (err.message === 'The course with the given ID was not found') {
            return res.status(404).json(err.message);
        }

        res.status(500).json('Error Updating Course Code.')
    }
}

const editCourseCapacity = async (req, res) => {
    try {
        const course = await coursesService.getCourseById(req.params.id)

        await coursesService.updateCourseCapacity(req.params.id, req.body.capacity);

        res.json({
            course_id: req.params.id,
            title: course.title,
            code: course.code,
            capacity: req.body.capacity
        });
    }

    catch (err) {
        console.error(err)

        if (err.message === 'The course with the given ID was not found') {
            return res.status(404).json(err.message);
        }

        else if (err.message === 'The current enrollments exceed the desired course capacity!') {
            return res.status(409).json(err.message)
        }
        
        res.status(500).json('Error Updating Course Capacity.')
    }
}

const removeCourse = async (req, res) => {
    try {
        const course = await coursesService.getCourseById(req.params.id);

        await coursesService.deleteCourse(req.params.id);
        res.json(course);
    }
    catch (err) {
        console.error(err);

        if (err.message === 'The course with the given ID was not found') {
            return res.status(404).json(err.message);
        }

        else if (err.message === 'Cannot delete a course with students enrolled in it!') {
            return res.status(409).json(err.message)
        }

        res.status(500).json('Error Deleting Course')
    }
}

// This gets all the students who have enrolled in the course with the given ID.
const getCourseStudents = async (req, res) => {
    try {
        await coursesService.getCourseById(req.params.id);

        const enrolledStudents = await coursesService.getCourseStudents(req.params.id);

        res.status(200).json({
            course_id: req.params.id,
            enrolledStudents
        });
    }

    catch (err) {
        console.error(err);

        if (err.message === 'The course with the given ID was not found') {
            return res.status(404).json(err.message);
        }

        res.status(500).json('Error querying students for the given course.');
    }
}

module.exports = { getCourses, getCourse, addCourse, editCourseTitle, editCourseCode, editCourseCapacity, removeCourse, getCourseStudents };