const Joi = require('joi');

const validateParams = async (req, res, next) => {
    const schema = Joi.object({
        id: Joi.number().min(1),
        student_id: Joi.number().min(1),
        course_id: Joi.number().min(1)
    });

    const { error } = schema.validate(req.params)

    if (error) {
        return res.status(400).json(error.details[0].message);
    }

    next();
}

module.exports = { validateParams }