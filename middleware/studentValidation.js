const Joi = require('joi');

const validateStudent = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required()
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

module.exports = { validateStudent, validateQuery };