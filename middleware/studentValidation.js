const joi = require('joi');

const validateStudent = async (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(2).required()
    });

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json(error.details[0].message);
    }

    next();
}

module.exports = { validateStudent };