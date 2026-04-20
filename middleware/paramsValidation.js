const Joi = require('joi');

const validateParams = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.number().integer().min(1).messages({
            'number.base': 'ID must be a valid number (e.g., 1, 10, 20)',
            'number.integer': 'ID must be a whole number (e.g., 1, 10, 20)',
            'number.min': 'ID must be a minimum of 1 (e.g., 1, 10, 20)'
        }),
        student_id: Joi.number().integer().min(1).messages({
            'number.base': 'The student ID must be a valid number (e.g., 1, 10, 20)',
            'number.integer': 'The student ID must be a whole number (e.g., 1, 10, 20)',
            'number.min':  'The student ID must be a minimum of 1 (e.g., 1, 10, 20)'
        }),
        course_id: Joi.number().integer().min(1).messages({
            'number.base': 'The course ID must be a valid number (e.g., 1, 10, 20)',
            'number.integer': 'The course ID must be a whole number (e.g., 1, 10, 20)',
            'number.min':  'The course ID must be a minimum of 1 (e.g., 1, 10, 20)'
        })
    });

    const { error } = schema.validate(req.params)

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
            field: error.details[0].path[0]
        });
    }

    next();
}

module.exports = { validateParams }