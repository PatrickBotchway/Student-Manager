const Joi = require('joi');

const validateCourse = async (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(2).required(),
        code: Joi.string().min(4).max(8).required(),
        capacity: Joi.number().min(2).required()
    });

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json(error.details[0].message);
    }

    next();
}

const validateCourseTitle = async (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(2).required()
    });

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json(error.details[0].message);
    }

    next();
}

const validateCourseCode = async (req, res, next) => {
    const schema = Joi.object({
        code: Joi.string().min(4).max(8).required()
    });

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json(error.details[0].message);
    }

    next();
}

const validateCourseCapacity = async (req, res, next) => {
    const schema = Joi.object({
        capacity: Joi.number().min(2).required()
    });
    
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json(error.details[0].message);
    }

    next();
}

const validateQuery = async(req, res, next) => {
    const schema = Joi.object({
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(10)
    });

    const { error, value } = schema.validate(req.query)
    if (error) {
        return res.status(400).json(error.details[0].message);
    }

    req.pagination = value;

    next();
}

module.exports = { validateCourse, validateCourseTitle, validateCourseCode, validateCourseCapacity, validateQuery };