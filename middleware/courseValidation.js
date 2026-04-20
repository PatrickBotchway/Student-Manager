const Joi = require('joi');

const validateCourse = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(2).required().messages({
            'string.base': 'Title must be a valid string (e.g., Maths, Science)',
            'string.min': 'Title must have at least 2 characters (e.g., Maths, Science)',
            'any.required': 'A title is required (e.g., Maths, Science)'
        }),
        code: Joi.string().min(4).max(8).required().messages({
            'string.base': 'Code must be a valid string (e.g., CS333, BE201)',
            'string.min': 'Code must have at least 4 characters (e.g., CS333, BE201)',
            'string.max': 'Code must not be more than 8 characters (e.g., CS333, BE201)',
            'any.required': 'A code is required (e.g., CS333, BE201)'
        }),
        capacity: Joi.number().min(2).required().messages({
            'number.base': 'Capacity must be a valid number (e.g., 20, 50, 100)',
            'number.min': 'Capacity should be a minimum of 2 (e.g., 20, 50, 100)',
            'any.required': 'A capacity is required (e.g., 20, 50, 100)'
        })
    });

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(422).json({
            success: false,
            message: error.details[0].message,
            field: error.details[0].path[0]
        });
    }

    next();
}

const validateCourseTitle = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(2).required().messages({
            'string.base': 'Title must be a valid string (e.g., Maths, Science)',
            'string.min': 'Title must have at least 2 characters (e.g., Maths, Science)',
            'any.required': 'A title is required (e.g., Maths, Science)'
        })
    });

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(422).json({
            success: false,
            message: error.details[0].message,
            field: error.details[0].path[0]
        });
    }

    next();
}

const validateCourseCode = (req, res, next) => {
    const schema = Joi.object({
        code: Joi.string().min(4).max(8).required().messages({
            'string.base': 'Code must be a valid string (e.g., CS333, BE201)',
            'string.min': 'Code must have at least 4 characters (e.g., CS333, BE201)',
            'string.max': 'Code must not be more than 8 characters (e.g., CS333, BE201)',
            'any.required': 'A code is required (e.g., CS333, BE201)'
        })
    });

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(422).json({
            success: false,
            message: error.details[0].message,
            field: error.details[0].path[0]
        });
    }

    next();
}

const validateCourseCapacity = (req, res, next) => {
    const schema = Joi.object({
        capacity: Joi.number().integer().min(2).required().messages({
            'number.base': 'Capacity must be a valid number (e.g., 20, 50, 100)',
            'number.integer': 'Capacity must be a whole number (e.g., 20, 50, 100)',
            'number.min': 'Capacity must be a minimum of 2 (e.g., 20, 50, 100)',
            'any.required': 'A capacity is required (e.g., 20, 50, 100)'
        })
    });

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(422).json({
            success: false,
            message: error.details[0].message,
            field: error.details[0].path[0]
        });
    }

    next();
}

const validateQuery = (req, res, next) => {
    const schema = Joi.object({
        page: Joi.number().integer().min(1).default(1).messages({
            'number.base': 'Page must be a valid number (e.g., 1, 2, 3)',
            'number.integer': 'Page must be a whole number (e.g., 1, 2, 3)',
            'number.min': 'Page must be a minimum of 1 (e.g., 1, 2, 3)'
        }),
        limit: Joi.number().integer().min(1).max(100).default(10).messages({
            'number.base': 'Limit must be a valid number (e.g., 10, 50, 100)',
            'number.integer': 'Limit must be a whole number (e.g., 10, 50, 100)',
            'number.min': 'Limit must be a minimum of 1 (e.g., 1, 50, 100)',
            'number.max': 'Limit must not be more than 100 (e.g., 10, 50, 100)'
        })
    });

    const { error, value } = schema.validate(req.query)
    if (error) {
        return res.status(422).json({
            success: false,
            message: error.details[0].message,
            field: error.details[0].path[0]
        });
    }

    req.pagination = value;

    next();
}

module.exports = { validateCourse, validateCourseTitle, validateCourseCode, validateCourseCapacity, validateQuery };